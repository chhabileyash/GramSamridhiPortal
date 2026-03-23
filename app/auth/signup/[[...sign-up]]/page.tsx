"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import {
  Landmark,
  User,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Fingerprint,
  MapPin,
  Lock,
  Phone,
} from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import locationData from "@/output.json";
import { useSignUp, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { numberToAlphabet } from "@/utils/numbertoalphbate";

// Memoize Header to prevent re-renders
const MemoizedHeader = memo(Header);

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    aadhar: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const [isSubmittingSignup, setIsSubmittingSignup] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { signUp, fetchStatus } = useSignUp() as any;
  const { setActive } = useClerk();
  const router = useRouter();
  const isSignUpReady = Boolean(signUp) && fetchStatus !== "fetching";

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown]);

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setOtpValues((prev) => {
      const newOtpValues = [...prev];
      newOtpValues[index] = value;
      return newOtpValues;
    });
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleOtpKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && otpValues[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otpValues],
  );

  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [village, setVillage] = useState("");

  const locationDataset = useMemo(
    () =>
      locationData as Array<{
        id: string;
        state: string;
        district: string;
        subDistrict: string;
        village: string;
      }>,
    [],
  );

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const withTimeout = useCallback(
    async <T,>(promise: Promise<T>, ms = 15000): Promise<T> => {
      const timeoutPromise = new Promise<T>((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out. Please try again."));
        }, ms);
      });

      const data: any = await Promise.race([promise, timeoutPromise]);
      if (data.error) {
        throw data.error;
      }
      return data;
    },
    [],
  );

  const getClerkErrorMessage = useCallback((err: any): string => {
    console.error("Clerk API Error:", err);

    const errorMessage = err?.errors?.[0]?.message || err?.message;

    if (errorMessage) {
      return errorMessage;
    }

    const longMessage = err?.errors?.[0]?.longMessage;
    if (longMessage) {
      return longMessage;
    }

    return "Something went wrong. Please try again.";
  }, []);

  const handleSignupSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isSignUpReady) {
        toast.error(
          "Authentication is still loading. Please try again in a moment.",
        );
        return;
      }

      if (
        !formData.fullName ||
        !formData.email ||
        !formData.aadhar ||
        !formData.mobile ||
        !formData.password ||
        !formData.confirmPassword ||
        !district ||
        !taluka ||
        !village
      ) {
        toast.error("Please fill all required fields.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and Confirm Password do not match.");
        return;
      }

      if (!acceptedTerms) {
        toast.error("Please accept Terms of Service and Privacy Policy.");
        return;
      }

      setIsSubmittingSignup(true);
      const phoneDigits = formData.mobile.replace(/\D/g, "");
      const normalizedPhone = phoneDigits.startsWith("91")
        ? `+${phoneDigits}`
        : `+91${phoneDigits}`;

      try {
        const payload: any = {
          email_address: formData.email,
          password: formData.password,
          firstName: formData.fullName.split(" ")[0],
          lastName: formData.fullName.split(" ").slice(1).join(" "),
          username: numberToAlphabet(formData.aadhar),
          unsafeMetadata: {
            phoneNumber: normalizedPhone,
            district,
            taluka,
            village,
            village_id: locationDataset.find((item) => item.village === village)
              ?.id,
            legalAccepted: acceptedTerms,
            role: "user",
          },
        };

        // Reset any existing sign-up state
        await signUp.reset();

        // Start a fresh sign-up
        await withTimeout(signUp.create(payload));

        // Send verification email code
        await withTimeout(signUp.verifications.sendEmailCode());

        toast.success("Account created! Check your email for the OTP.");
        setIsOtpSent(true);
        setCountdown(30);
      } catch (err) {
        toast.error(getClerkErrorMessage(err));
      } finally {
        setIsSubmittingSignup(false);
      }
    },
    [
      isSignUpReady,
      formData,
      district,
      taluka,
      village,
      acceptedTerms,
      signUp,
      withTimeout,
      getClerkErrorMessage,
    ],
  );

  const handleVerifySubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isSignUpReady) {
        toast.error(
          "Authentication is still loading. Please try again in a moment.",
        );
        return;
      }
      const otp = otpValues.join("");

      if (otp.length !== 6) {
        toast.error("Please enter the complete 6-digit OTP.");
        return;
      }

      setVerifying(true);

      try {
        const { error } = await signUp.verifications.verifyEmailCode({
          code: otp,
        });

        if (error) {
          toast.error(
            error.message ||
              "OTP is invalid or expired. Please enter the latest OTP sent to your email.",
          );
          setVerifying(false);
          return;
        }

        if (signUp.status !== "complete") {
          toast.error(
            "Verification is not complete. Please check the OTP and try again.",
          );
          setVerifying(false);
          return;
        }

        // Extract sessionId
        const sessionId = signUp.createdSessionId;

        if (!sessionId) {
          toast.error(
            "Verification succeeded but session creation is pending. Please try again in a moment.",
          );
          setVerifying(false);
          return;
        }

        toast.success("Account verified successfully! Redirecting...");
        await setActive({ session: sessionId });
        router.replace("/home");
      } catch (err) {
        toast.error(getClerkErrorMessage(err));
      } finally {
        setVerifying(false);
      }
    },
    [isSignUpReady, otpValues, signUp, setActive, router, getClerkErrorMessage],
  );

  const handleResendOtp = useCallback(async () => {
    if (!isSignUpReady) {
      toast.error(
        "Authentication is still loading. Please try again in a moment.",
      );
      return;
    }
    if (countdown > 0) return;

    try {
      await withTimeout(signUp.verifications.sendEmailCode());
      toast.success("OTP resent successfully!");
      setCountdown(30);
    } catch (err) {
      toast.error(getClerkErrorMessage(err));
    }
  }, [isSignUpReady, countdown, signUp, withTimeout, getClerkErrorMessage]);

  const handleEditDetails = useCallback(() => {
    setIsOtpSent(false);
    setOtpValues(["", "", "", "", "", ""]);
    setCountdown(30);
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const toggleAcceptedTerms = useCallback(() => {
    setAcceptedTerms((prev) => !prev);
  }, []);

  const handleDistrictChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDistrict(e.target.value);
      setTaluka("");
      setVillage("");
    },
    [],
  );

  const handleTalukaChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTaluka(e.target.value);
      setVillage("");
    },
    [],
  );

  const handleVillageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setVillage(e.target.value);
    },
    [],
  );

  // Memoize location data calculations
  const districts = useMemo(() => {
    const uniqueDistricts = new Set<string>();
    locationDataset.forEach((item) => {
      if (item.district) uniqueDistricts.add(item.district);
    });
    return Array.from(uniqueDistricts).sort();
  }, [locationDataset]);

  const talukas = useMemo(() => {
    if (!district) return [];
    const uniqueTalukas = new Set<string>();
    locationDataset.forEach((item) => {
      if (item.district === district && item.subDistrict)
        uniqueTalukas.add(item.subDistrict);
    });
    return Array.from(uniqueTalukas).sort();
  }, [locationDataset, district]);

  const villages = useMemo(() => {
    if (!district || !taluka) return [];
    const uniqueVillages = new Set<string>();
    locationDataset.forEach((item) => {
      if (
        item.district === district &&
        item.subDistrict === taluka &&
        item.village
      ) {
        uniqueVillages.add(item.village);
      }
    });
    return Array.from(uniqueVillages).sort();
  }, [locationDataset, district, taluka]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 lg:bg-white text-gray-900">
      {/* <MemoizedHeader /> */}

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 w-full">
        {/* Left Side - Hero/Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-[#1F4E79] relative overflow-hidden text-white p-12">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url('https://plus.unsplash.com/premium_photo-1730035378599-b3000f711b77?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
              }}
            />
            {/* Dark Overlay for Readability (No Blue) */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-start p-12">
            <div className="space-y-10">
              <div className="flex items-center gap-4 text-left">
                <div>
                  <Landmark
                    className="size-10 sm:size-12 md:size-14"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 className="text-[28px] font-semibold leading-[1.2] tracking-wide uppercase">
                    Gram Samridhi <br /> Portal
                  </h3>
                  <p className="text-xs text-[#F28C28] font-bold tracking-[0.2em] uppercase mt-0.5">
                    Govt. of Maharashtra
                  </p>
                </div>
              </div>

              <div className="space-y-8 max-w-3xl">
                <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight uppercase drop-shadow-lg">
                  Empowering <br />
                  <span className="text-[#F28C28] inline-block mt-2">
                    Local Governance
                  </span>{" "}
                  <br />
                  Digitally.
                </h1>
                <div className="h-1.5 w-24 bg-[#F28C28] rounded-[999px] mx-auto shadow-lg shadow-stone-400/20"></div>
                <p className="text-white/90 text-xl leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-[0px_4px_12px_rgba(0,0,0,0.12)]">
                  The single unified platform for tax payments, certificates,
                  and transparent administration for 28,000+ Gram Panchayats
                  across the state.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col bg-gray-50 lg:bg-white relative">
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            <div className="w-full max-w-lg bg-white p-6 sm:p-10 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none border border-gray-100 lg:border-none space-y-6 sm:space-y-8 text-center transition-all">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E79]">
                  {isOtpSent ? "Verify OTP" : "Create Account"}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {isOtpSent
                    ? "Enter the 6-digit OTP sent to your mobile number."
                    : "Enter your details to register for the Maharashtra Digital Portal."}
                </p>
              </div>

              {!isOtpSent ? (
                <form
                  className="space-y-5 text-left"
                  onSubmit={handleSignupSubmit}
                >
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[14px] font-bold text-[#1F4E79]">
                      <User className="w-4 h-4 text-[#F28C28]" />
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors" />
                      <input
                        name="fullName"
                        type="text"
                        placeholder="E.g. Rajesh Kumar"
                        value={formData.fullName}
                        onChange={handleFieldChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[14px] font-bold text-[#1F4E79]">
                      <Mail className="w-4 h-4 text-[#F28C28]" />
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors" />
                      <input
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleFieldChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Aadhar No & Mobile Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Aadhar No */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[14px] font-bold text-[#1F4E79]">
                        <Fingerprint className="w-4 h-4 text-[#F28C28]" />
                        Aadhar No
                      </label>
                      <div className="relative group">
                        <Fingerprint className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors" />
                        <input
                          name="aadhar"
                          type="text"
                          placeholder="1234 5678 9012"
                          maxLength={12}
                          value={formData.aadhar}
                          onChange={handleFieldChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[14px] font-bold text-[#1F4E79]">
                        <Phone className="w-4 h-4 text-[#F28C28]" />
                        Mobile Number
                      </label>
                      <div className="flex shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
                        <span className="inline-flex items-center px-4 rounded-l-sm border border-r-0 border-gray-200 bg-gray-50 text-gray-600 text-[14px] font-bold">
                          +91
                        </span>
                        <input
                          name="mobile"
                          type="tel"
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={handleFieldChange}
                          className="flex-1 min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-sm border border-gray-200 text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Panchayat Selection */}
                  <div className="space-y-4 pt-2 pb-2">
                    <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#1F4E79] border-b border-gray-200 pb-2">
                      <MapPin className="text-[#F28C28] w-4 h-4" />
                      Panchayat Selection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-[#1F4E79] uppercase">
                          District
                        </label>
                        <select
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all bg-white"
                          value={district}
                          onChange={handleDistrictChange}
                        >
                          <option value="" disabled className="text-gray-400">
                            Select District
                          </option>
                          {districts.map((d: string) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-[#1F4E79] uppercase">
                          Taluka
                        </label>
                        <select
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all bg-white disabled:opacity-50 disabled:bg-gray-50"
                          value={taluka}
                          onChange={handleTalukaChange}
                          disabled={!district}
                        >
                          <option value="" disabled className="text-gray-400">
                            Select Taluka
                          </option>
                          {talukas.map((t: string) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-[#1F4E79] uppercase">
                          Village
                        </label>
                        <select
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all bg-white disabled:opacity-50 disabled:bg-gray-50"
                          value={village}
                          onChange={handleVillageChange}
                          disabled={!taluka}
                        >
                          <option value="" disabled className="text-gray-400">
                            Select Village
                          </option>
                          {villages.map((v: string) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Passwords Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[14px] font-bold text-[#1F4E79]">
                        <Lock className="w-4 h-4 text-[#F28C28]" />
                        Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors" />
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleFieldChange}
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[14px] font-bold text-[#1F4E79]">
                        <Lock className="w-4 h-4 text-[#F28C28]" />
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors" />
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleFieldChange}
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                        />
                        <button
                          type="button"
                          onClick={toggleShowConfirmPassword}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={toggleAcceptedTerms}
                        className="h-4 w-4 text-[#F28C28] focus:ring-[#F28C28] border-gray-200 rounded-sm cursor-pointer accent-[#F28C28]"
                      />
                    </div>
                    <div className="ml-3 text-[14px]">
                      <label
                        htmlFor="terms"
                        className="font-semibold text-gray-600"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-[#F28C28] hover:text-[#F28C28] hover:underline font-bold"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-[#F28C28] hover:text-[#F28C28] hover:underline font-bold"
                        >
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>
                  </div>

                  <div id="clerk-captcha"></div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmittingSignup}
                    className="w-full flex items-center cursor-pointer justify-center gap-2 bg-[#F28C28] hover:bg-[#F28C28] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10"
                  >
                    {isSubmittingSignup ? "Creating..." : "Create Account"}
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                </form>
              ) : (
                <form
                  className="space-y-8 text-left"
                  onSubmit={handleVerifySubmit}
                >
                  <div className="space-y-3">
                    <label className="text-[14px] font-bold text-[#1F4E79] block text-center uppercase tracking-wider">
                      Enter 6-Digit Code
                    </label>
                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otpValues.map((value, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={value}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black text-[#1F4E79] border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all bg-gray-50/50 shadow-inner"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={verifying}
                    className="w-full flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#F28C28] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10 mt-6"
                  >
                    {verifying ? "Verifying..." : "Verify & Register"}
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleEditDetails}
                      className="text-[13px] font-bold text-gray-500 hover:text-[#F28C28] transition-colors"
                    >
                      Edit Details
                    </button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={countdown > 0}
                      className={`text-[13px] font-bold transition-colors ${
                        countdown > 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-500 hover:text-[#F28C28]"
                      }`}
                    >
                      Resend OTP {countdown > 0 && `(${countdown}s)`}
                    </button>
                  </div>
                </form>
              )}

              <div className="text-center">
                <p className="text-gray-600 text-[14px] font-semibold">
                  Already have an account?{" "}
                  <Link
                    href="/auth/sign-in"
                    className="text-[#F28C28] font-black hover:underline uppercase tracking-wide"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
            borderRadius: "8px",
            maxWidth: "90vw",
          },
        }}
      />
    </div>
  );
}

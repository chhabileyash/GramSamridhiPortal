"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Landmark,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import Header from "../../../components/Header";

export default function LoginPage() {
  const { signIn, fetchStatus } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(30);

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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && otpValues[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 lg:bg-white text-gray-900">
      <Header />

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 w-full">
        {/* Left Side - Hero/Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-[#1F4E79] relative overflow-hidden text-white p-12">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1730035378599-b3000f711b77?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
                    Gram Samruthi <br /> Portal
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
                  Welcome Back
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Enter your credentials to access your account.
                </p>
                {errorMsg && (
                  <p className="text-sm text-red-500 font-semibold">
                    {errorMsg}
                  </p>
                )}
              </div>

              <form
                className="space-y-5 text-left"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setErrorMsg("");
                  if (fetchStatus === "fetching") return;

                  // Input validation
                  const trimmedIdentifier = identifier.trim();
                  const trimmedPassword = password.trim();

                  if (!trimmedIdentifier) {
                    setErrorMsg("Please enter your email or Aadhar number");
                    return;
                  }

                  if (isOtpLogin && !isOtpSent) {
                    setErrorMsg("Please use email/password for now");
                    // Implement OTP request here if possible,
                    // user's reference doesn't define first-factor OTP login yet
                  } else if (isOtpLogin && isOtpSent) {
                    try {
                      const code = otpValues.join("");
                      if (!code || code.length !== 6) {
                        setErrorMsg("Please enter the complete 6-digit code");
                        return;
                      }
                      const { error } = await signIn.mfa.verifyEmailCode({
                        code,
                      });
                      if (error) {
                        const err = error as any;
                        setErrorMsg(
                          err.errors?.[0]?.longMessage ||
                            err.longMessage ||
                            "Invalid OTP",
                        );
                        return;
                      }
                      if (signIn.status === "complete") {
                        await signIn.finalize({
                          navigate: ({ session, decorateUrl }) => {
                            if (session?.currentTask) return;
                            const url = decorateUrl("/home");
                            router.push(url);
                          },
                        });
                      }
                    } catch (err: any) {
                      console.error("OTP verification error:", err);
                      setErrorMsg(
                        err?.errors?.[0]?.longMessage ||
                          err?.message ||
                          "An error occurred during OTP verification",
                      );
                    }
                  } else {
                    // Password Login
                    if (!trimmedPassword) {
                      setErrorMsg("Please enter your password");
                      return;
                    }

                    try {
                      const response = await signIn.password({
                        emailAddress: trimmedIdentifier,
                        password: trimmedPassword,
                      });

                      if (response.error) {
                        const err = response.error as any;
                        // Support for identifier not found fallbacks etc as per reference
                        if (
                          err.errors?.[0]?.code === "form_identifier_not_found"
                        ) {
                          setErrorMsg(
                            "User not found, please create an account",
                          );
                          return;
                        }
                        setErrorMsg(
                          err.errors?.[0]?.longMessage ||
                            err.longMessage ||
                            "Invalid credentials",
                        );
                        return;
                      }

                      if (response.status === "complete") {
                        await signIn.finalize({
                          navigate: ({ session, decorateUrl }) => {
                            if (session?.currentTask) return;
                            const url = decorateUrl("/home");
                            router.push(url);
                          },
                        });
                      } else if (response.status === "needs_first_factor") {
                        setErrorMsg(
                          "Authentication started. Please complete the login process.",
                        );
                      } else if (response.status === "needs_second_factor") {
                        const emailCodeFactor =
                          response.supportedSecondFactors?.find(
                            (factor) => factor.strategy === "email_code",
                          );
                        if (emailCodeFactor) {
                          await signIn.mfa.sendEmailCode();
                          setIsOtpLogin(true);
                          setIsOtpSent(true);
                          setCountdown(30);
                        } else {
                          setErrorMsg(
                            "Two-factor authentication is required but not supported",
                          );
                        }
                      } else {
                        setErrorMsg(
                          "Login process incomplete. Please try again.",
                        );
                      }
                    } catch (err: any) {
                      console.error("Login error:", err);
                      if (
                        err?.errors?.[0]?.code === "form_identifier_not_found"
                      ) {
                        setErrorMsg("User not found or invalid identifier.");
                      } else {
                        setErrorMsg(
                          err.errors?.[0]?.longMessage ||
                            err?.message ||
                            "An error occurred during login. Please try again.",
                        );
                      }
                    }
                  }
                }}
              >
                {/* Email / Aadhar */}
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-[#1F4E79]">
                    Email or Aadhar No
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors pointer-events-none" />
                    <input
                      type="text"
                      autoComplete="email"
                      inputMode="email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Enter email or 12-digit Aadhar No"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400 text-base"
                    />
                  </div>
                </div>

                {/* Password */}
                {!isOtpLogin && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[14px] font-bold text-[#1F4E79]">
                        Password
                      </label>
                      <Link
                        href="#"
                        className="text-[13px] font-bold text-[#F28C28] hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400 text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none active:text-[#F28C28]"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* OTP Input Section */}
                {isOtpLogin && isOtpSent && (
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[14px] font-bold text-[#1F4E79] tracking-wider uppercase">
                        Enter 6-Digit Code
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (countdown === 0) {
                            setCountdown(30);
                            // Could add logic to resend OTP here
                          }
                        }}
                        className={`text-[13px] font-bold ${
                          countdown > 0
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-[#F28C28] hover:underline"
                        }`}
                        disabled={countdown > 0}
                      >
                        {countdown > 0
                          ? `Resend in ${countdown}s`
                          : "Resend OTP"}
                      </button>
                    </div>
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
                          autoComplete={`off`}
                          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black text-[#1F4E79] border-2 border-gray-200 rounded-sm focus:outline-none focus:border-[#F28C28] transition-all bg-gray-50/50 shadow-inner text-base"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={fetchStatus === "fetching" || !identifier.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#E67D1A] active:bg-[#D97016] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10 disabled:opacity-75 disabled:cursor-not-allowed min-h-[48px] text-base"
                >
                  {fetchStatus === "fetching" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      {isOtpLogin && !isOtpSent ? "Send OTP" : "Login"}
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-2">
                  <div className="grow border-t border-gray-200"></div>
                  <span className="shrink-0 mx-4 text-gray-400 text-sm font-semibold uppercase">
                    Or
                  </span>
                  <div className="grow border-t border-gray-200"></div>
                </div>

                {/* OTP Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOtpLogin(!isOtpLogin);
                    setIsOtpSent(false); // Reset OTP state when toggling
                    setOtpValues(["", "", "", "", "", ""]); // Clear OTP values
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#1F4E79] text-[#1F4E79] hover:bg-gray-50 active:bg-gray-100 py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-sm min-h-[48px] text-base"
                >
                  {isOtpLogin ? "Login with Password" : "Login with OTP"}
                </button>
              </form>

              <div className="text-center pt-4">
                <p className="text-gray-600 text-[14px] font-semibold">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-[#F28C28] font-black hover:underline uppercase tracking-wide"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

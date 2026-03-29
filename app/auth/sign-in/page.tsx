"use client";

import React, { FormEvent, useRef, useState } from "react";
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
import { useSignIn } from "@clerk/nextjs";
import posthog from "posthog-js";

type MfaStrategy = "email_code" | "phone_code" | null;

export default function LoginPage() {
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** After password succeeds, Clerk may require a second factor (e.g. email OTP). */
  const [awaitingSecondFactor, setAwaitingSecondFactor] = useState(false);
  const [mfaStrategy, setMfaStrategy] = useState<MfaStrategy>(null);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [infoMsg, setInfoMsg] = useState("");

  const extractClerkError = (err: any) => {
    const code = err?.errors?.[0]?.code || err?.code || "";
    const message =
      err?.errors?.[0]?.longMessage ||
      err?.longMessage ||
      err?.message ||
      "An error occurred during login.";
    return { code, message };
  };

  const handleKnownAuthErrors = (code: string, message: string) => {
    const normalized = (message || "").toLowerCase();

    if (code === "session_exists") {
      router.push("/");
      return true;
    }
    if (code === "form_identifier_not_found") {
      setErrorMsg("User not found.");
      return true;
    }
    if (
      code === "form_password_incorrect" ||
      normalized.includes("password is incorrect")
    ) {
      setErrorMsg("Invalid password. Please try again.");
      return true;
    }
    setErrorMsg(message);
    return true;
  };

  const finalizeSignIn = async () => {
    if (!signIn) return;
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) return;
        const userId = session?.user?.id;
        if (userId) {
          posthog.identify(userId, {
            email: session?.user?.primaryEmailAddress?.emailAddress,
          });
          posthog.capture("user_signed_in");
        }
        const url = decorateUrl("/");
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });
  };

  const sendSecondFactorCode = async (): Promise<MfaStrategy> => {
    if (!signIn) return null;

    const factors = signIn.supportedSecondFactors ?? [];
    const emailFactor = factors.find(
      (f: { strategy: string }) => f.strategy === "email_code",
    );
    const phoneFactor = factors.find(
      (f: { strategy: string }) => f.strategy === "phone_code",
    );

    if (emailFactor) {
      const { error } = await signIn.mfa.sendEmailCode();
      if (error) {
        const { code, message } = extractClerkError(error);
        handleKnownAuthErrors(code, message);
        return null;
      }
      setMfaStrategy("email_code");
      return "email_code";
    }

    if (phoneFactor) {
      const { error } = await signIn.mfa.sendPhoneCode();
      if (error) {
        const { code, message } = extractClerkError(error);
        handleKnownAuthErrors(code, message);
        return null;
      }
      setMfaStrategy("phone_code");
      return "phone_code";
    }

    setErrorMsg(
      "Two-factor authentication is required, but no supported method (email or SMS) is available.",
    );
    return null;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otpValues];
    next[index] = value.slice(-1);
    setOtpValues(next);
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const resetLoginFlow = () => {
    setAwaitingSecondFactor(false);
    setMfaStrategy(null);
    setOtpValues(["", "", "", "", "", ""]);
    setErrorMsg("");
    setInfoMsg("");
    router.refresh();
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (!signIn || isSubmitting || fetchStatus === "fetching") return;

    // Step 2: verify email/SMS OTP after password step
    if (awaitingSecondFactor) {
      const code = otpValues.join("");
      if (code.length !== 6) {
        setErrorMsg("Please enter the complete 6-digit code.");
        return;
      }

      setIsSubmitting(true);
      try {
        let verifyResult: { error: unknown } | undefined;
        if (mfaStrategy === "email_code") {
          verifyResult = await signIn.mfa.verifyEmailCode({ code });
        } else if (mfaStrategy === "phone_code") {
          verifyResult = await signIn.mfa.verifyPhoneCode({ code });
        } else {
          setErrorMsg("Missing second-factor method. Please start over.");
          return;
        }

        if (verifyResult?.error) {
          const { code: errCode, message } = extractClerkError(
            verifyResult.error,
          );
          handleKnownAuthErrors(errCode, message);
          return;
        }

        if (signIn.status === "complete") {
          await finalizeSignIn();
          return;
        }

        setErrorMsg("Verification incomplete. Please try again.");
      } catch (err: any) {
        const { code: errCode, message } = extractClerkError(err);
        handleKnownAuthErrors(errCode, message);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Step 1: email + password
    const trimmedIdentifier = identifier.trim();
    const trimmedPassword = password;

    if (!trimmedIdentifier) {
      setErrorMsg("Please enter your email or Aadhar number");
      return;
    }

    if (!trimmedPassword) {
      setErrorMsg("Please enter your password");
      return;
    }

    const looksLikeEmail = /\S+@\S+\.\S+/.test(trimmedIdentifier);
    if (!looksLikeEmail) {
      setErrorMsg(
        "Please enter a valid email address. Aadhar login is not enabled in this form.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn.password({
        emailAddress: trimmedIdentifier,
        password: trimmedPassword,
      });

      if (error) {
        const { code, message } = extractClerkError(error);
        handleKnownAuthErrors(code, message);
        return;
      }

      if (signIn.status === "complete") {
        await finalizeSignIn();
        return;
      }

      if (signIn.status === "needs_second_factor") {
        const strategyUsed = await sendSecondFactorCode();
        if (strategyUsed) {
          setAwaitingSecondFactor(true);
          setOtpValues(["", "", "", "", "", ""]);
          setInfoMsg(
            strategyUsed === "phone_code"
              ? "We sent a code to your phone. Enter it below."
              : "We sent a code to your email. Enter it below.",
          );
        }
        return;
      }

      setErrorMsg("Login could not be completed. Please try again.");
    } catch (err: any) {
      const { code, message } = extractClerkError(err);
      handleKnownAuthErrors(code, message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendOtp() {
    setErrorMsg("");
    setInfoMsg("");
    if (!signIn || isSubmitting || fetchStatus === "fetching") return;
    setIsSubmitting(true);
    try {
      const strategyUsed = await sendSecondFactorCode();
      if (strategyUsed) {
        setInfoMsg(
          strategyUsed === "phone_code"
            ? "A new code was sent to your phone."
            : "A new code was sent to your email.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 lg:bg-white text-gray-900">
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
                {infoMsg && (
                  <p className="text-sm text-green-700 font-semibold">
                    {infoMsg}
                  </p>
                )}
              </div>

              <form className="space-y-5 text-left" onSubmit={handleSubmit}>
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
                      placeholder="Enter email"
                      disabled={awaitingSecondFactor}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400 text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Password — hidden while entering OTP */}
                {!awaitingSecondFactor && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[14px] font-bold text-[#1F4E79]">
                        Password
                      </label>
                      <Link
                        href="/auth/forgot-password"
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

                {/* OTP (second factor) */}
                {awaitingSecondFactor && (
                  <div className="space-y-3 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[14px] font-bold text-[#1F4E79] uppercase tracking-wide">
                        Verification code
                      </label>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isSubmitting || fetchStatus === "fetching"}
                        className="text-[13px] font-bold text-[#F28C28] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Resend code
                      </button>
                    </div>
                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otpValues.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpInputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          autoComplete="one-time-code"
                          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black text-[#1F4E79] border-2 border-gray-200 rounded-sm focus:outline-none focus:border-[#F28C28] bg-gray-50/50"
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={resetLoginFlow}
                      className="text-sm font-semibold text-gray-600 hover:text-[#1F4E79] underline"
                    >
                      Use a different account
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    fetchStatus === "fetching" ||
                    !identifier.trim() ||
                    (!awaitingSecondFactor && !password)
                  }
                  className="w-full flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#E67D1A] active:bg-[#D97016] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10 disabled:opacity-75 disabled:cursor-not-allowed min-h-[48px] text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      {awaitingSecondFactor ? "Verify & sign in" : "Login"}
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

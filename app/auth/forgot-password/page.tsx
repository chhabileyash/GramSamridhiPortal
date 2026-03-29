"use client";

import React, { useState, useRef } from "react";
import {
  Landmark,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Loader2,
  KeyRound,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck } from
"lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

type Step = "email" | "code" | "password" | "done";

export default function ForgotPasswordPage() {
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");


  const [emailAddress, setEmailAddress] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);


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
  e: React.KeyboardEvent<HTMLInputElement>) =>
  {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const extractError = (err: unknown): string => {
    const e = err as {
      errors?: {longMessage?: string;message?: string;}[];
      longMessage?: string;
      message?: string;
    };
    return (
      e?.errors?.[0]?.longMessage ||
      e?.errors?.[0]?.message ||
      e?.longMessage ||
      e?.message ||
      "An unexpected error occurred.");

  };


  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!signIn || fetchStatus === 'fetching') return;

    if (!emailAddress.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: signinerror } = await signIn.create({ identifier: emailAddress });

      if (signinerror) {
        setErrorMsg(extractError(signinerror));
        console.error(JSON.stringify(signinerror, null, 2));
        return;
      }

      const { error: sendCodeError } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendCodeError) {
        setErrorMsg(extractError(sendCodeError));
        console.error(JSON.stringify(sendCodeError, null, 2));
        return;
      }


      setStep("code");
      setSuccessMsg(`A 6-digit code was sent to ${emailAddress}`);
    } catch (err) {
      setErrorMsg(extractError(err));
    } finally {
      setIsSubmitting(false);
    }
  }


  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!signIn || fetchStatus === 'fetching') return;

    const code = otpValues.join("");
    if (code.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit code.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn.resetPasswordEmailCode.verifyCode({
        code
      });
      if (error) {
        setErrorMsg(extractError(error));
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (signIn.status === "needs_new_password") {
        setStep("password");
        setSuccessMsg("");
        setErrorMsg("");
      } else if (signIn.status === "complete") {
        setStep("done");
      } else if (signIn.status === "needs_second_factor") {
        setErrorMsg(
          "Two-factor authentication is required. Please sign in normally."
        );
      } else {
        setErrorMsg("Could not reset password. Please try again.");
      }


    } catch (err) {
      setErrorMsg(extractError(err));
    } finally {
      setIsSubmitting(false);
    }
  }


  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!signIn || fetchStatus === 'fetching') return;

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn.resetPasswordEmailCode.submitPassword({ password });

      if (error) {
        setErrorMsg(extractError(error));
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (signIn.status === "complete") {
        setStep("done");
      } else if (signIn.status === "needs_second_factor") {
        setErrorMsg(
          "Two-factor authentication is required. Please sign in normally."
        );
      } else {
        setErrorMsg("Could not reset password. Please try again.");
      }
    } catch (err) {
      setErrorMsg(extractError(err));
    } finally {
      setIsSubmitting(false);
    }
  }


  async function handleResendCode() {
    setErrorMsg("");
    setSuccessMsg("");
    if (!signIn || isSubmitting || fetchStatus === 'fetching') return;

    setIsSubmitting(true);
    try {
      await signIn.resetPasswordEmailCode.sendCode();
      setSuccessMsg("A new code was sent to your email.");
      setOtpValues(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    } catch (err) {
      setErrorMsg(extractError(err));
    } finally {
      setIsSubmitting(false);
    }
  }


  const steps: {key: Step;label: string;}[] = [
  { key: "email", label: "Email" },
  { key: "code", label: "Verify" },
  { key: "password", label: "Reset" },
  { key: "done", label: "Done" }];

  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 lg:bg-white text-gray-900">
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 w-full">

        {}
        <div className="hidden lg:flex flex-col justify-between bg-[#1F4E79] relative overflow-hidden text-white p-12">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1730035378599-b3000f711b77?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0')"
              }} />
            
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-start p-12">
            <div className="space-y-10">
              {}
              <div className="flex items-center gap-4 text-left">
                <Landmark className="size-12" strokeWidth={2} />
                <div>
                  <h3 className="text-[28px] font-semibold leading-[1.2] tracking-wide uppercase">
                    Gram Samridhi <br /> Portal
                  </h3>
                  <p className="text-xs text-[#F28C28] font-bold tracking-[0.2em] uppercase mt-0.5">
                    Govt. of Maharashtra
                  </p>
                </div>
              </div>

              {}
              <div className="space-y-8 max-w-3xl">
                <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight uppercase drop-shadow-lg">
                  Recover <br />
                  <span className="text-[#F28C28] inline-block mt-2">
                    Your Account
                  </span>{" "}
                  <br />
                  Securely.
                </h1>
                <div className="h-1.5 w-24 bg-[#F28C28] rounded-[999px] mx-auto shadow-lg shadow-stone-400/20" />
                <p className="text-white/90 text-xl leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-[0px_4px_12px_rgba(0,0,0,0.12)]">
                  Reset your password in seconds. Your data and services remain
                  protected throughout the process.
                </p>
              </div>

              {}
              <div className="flex flex-wrap gap-3">
                {["Secure OTP", "Encrypted Reset", "Instant Access"].map(
                  (item) =>
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold text-white">
                    
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F28C28]" />
                      {item}
                    </span>

                )}
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="flex-1 flex flex-col bg-gray-50 lg:bg-white relative">
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            <div className="w-full max-w-lg bg-white p-6 sm:p-10 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none border border-gray-100 lg:border-none space-y-6 sm:space-y-8 transition-all">

              {}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {steps.map((s, i) =>
                  <React.Fragment key={s.key}>
                      <div className="flex flex-col items-center gap-1">
                        <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${i < stepIndex ?
                        "bg-[#F28C28] text-white" :
                        i === stepIndex ?
                        "bg-[#1F4E79] text-white ring-4 ring-[#1F4E79]/20" :
                        "bg-gray-100 text-gray-400"}`
                        }>
                        
                          {i < stepIndex ?
                        <CheckCircle2 className="w-4 h-4" /> :

                        i + 1
                        }
                        </div>
                        <span
                        className={`text-[10px] font-bold uppercase tracking-wide ${i <= stepIndex ? "text-[#1F4E79]" : "text-gray-400"}`
                        }>
                        
                          {s.label}
                        </span>
                      </div>
                      {i < steps.length - 1 &&
                    <div
                      className={`flex-1 h-0.5 mx-1 rounded-full transition-all duration-500 ${i < stepIndex ? "bg-[#F28C28]" : "bg-gray-200"}`
                      } />

                    }
                    </React.Fragment>
                  )}
                </div>
              </div>

              {}
              {errorMsg &&
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-sm px-4 py-3 text-sm font-semibold">
                  <span className="mt-0.5">⚠</span>
                  {errorMsg}
                </div>
              }
              {successMsg &&
              <div className="flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 rounded-sm px-4 py-3 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  {successMsg}
                </div>
              }

              {

              }
              {step === "email" &&
              <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto w-14 h-14 bg-[#1F4E79]/10 rounded-full flex items-center justify-center mb-3">
                      <KeyRound className="w-7 h-7 text-[#1F4E79]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E79]">
                      Forgot Password?
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">
                      Enter your registered email address and we'll send you a
                      6-digit reset code.
                    </p>
                  </div>

                  <form onSubmit={handleSendCode} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-[#1F4E79]">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors pointer-events-none" />
                        <input
                        id="forgot-email"
                        type="email"
                        autoComplete="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400 text-base" />
                      
                      </div>
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting || !emailAddress.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#E67D1A] active:bg-[#D97016] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px] text-base">
                    
                      {isSubmitting ?
                    <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Code...
                        </> :

                    <>
                          Send Reset Code
                          <ArrowRight className="w-5 h-5 ml-1" />
                        </>
                    }
                    </button>
                  </form>

                  <div className="text-center pt-2">
                    <Link
                    href="/auth/sign-in"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-500 hover:text-[#1F4E79] transition-colors">
                    
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Link>
                  </div>
                </div>
              }

              {

              }
              {step === "code" &&
              <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto w-14 h-14 bg-[#F28C28]/10 rounded-full flex items-center justify-center mb-3">
                      <ShieldCheck className="w-7 h-7 text-[#F28C28]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E79]">
                      Enter the Code
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">
                      We sent a 6-digit code to{" "}
                      <span className="font-bold text-[#1F4E79]">
                        {emailAddress}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyCode} className="space-y-5">
                    <div className="space-y-3">
                      <div className="flex justify-center gap-2 sm:gap-3">
                        {otpValues.map((digit, index) =>
                      <input
                        key={index}
                        ref={(el) => {
                          otpInputRefs.current[index] = el;
                        }}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                        handleOtpChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        autoComplete="one-time-code"
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black text-[#1F4E79] border-2 border-gray-200 rounded-sm focus:outline-none focus:border-[#F28C28] bg-gray-50/50 transition-all" />

                      )}
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                        type="button"
                        onClick={() => {
                          setStep("email");
                          setErrorMsg("");
                          setSuccessMsg("");
                          setOtpValues(["", "", "", "", "", ""]);
                        }}
                        className="text-sm font-semibold text-gray-500 hover:text-[#1F4E79] underline transition-colors">
                        
                          Change email
                        </button>
                        <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={isSubmitting}
                        className="text-[13px] font-bold text-[#F28C28] hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        
                          Resend code
                        </button>
                      </div>
                    </div>

                    <button
                    type="submit"
                    disabled={
                    isSubmitting || otpValues.join("").length !== 6
                    }
                    className="w-full flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#E67D1A] active:bg-[#D97016] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px] text-base">
                    
                      {isSubmitting ?
                    <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Verifying...
                        </> :

                    <>
                          Verify Code
                          <ArrowRight className="w-5 h-5 ml-1" />
                        </>
                    }
                    </button>
                  </form>
                </div>
              }

              {

              }
              {step === "password" &&
              <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto w-14 h-14 bg-[#1F4E79]/10 rounded-full flex items-center justify-center mb-3">
                      <Lock className="w-7 h-7 text-[#1F4E79]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E79]">
                      Set New Password
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">
                      Choose a strong password with at least 8 characters.
                    </p>
                  </div>

                  <form onSubmit={handleSetPassword} className="space-y-4">
                    {}
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-[#1F4E79]">
                        New Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors pointer-events-none" />
                        <input
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400 text-base" />
                      
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none">
                        
                          {showPassword ?
                        <EyeOff className="h-5 w-5" /> :

                        <Eye className="h-5 w-5" />
                        }
                        </button>
                      </div>
                      {}
                      {password.length > 0 &&
                    <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4].map((lvl) =>
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${password.length >= lvl * 3 ?
                        lvl <= 1 ?
                        "bg-red-400" :
                        lvl <= 2 ?
                        "bg-yellow-400" :
                        lvl <= 3 ?
                        "bg-blue-400" :
                        "bg-green-500" :
                        "bg-gray-200"}`
                        } />

                      )}
                          <span className="text-xs text-gray-400 ml-1">
                            {password.length < 4 ?
                        "Weak" :
                        password.length < 7 ?
                        "Fair" :
                        password.length < 10 ?
                        "Good" :
                        "Strong"}
                          </span>
                        </div>
                    }
                    </div>

                    {}
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-[#1F4E79]">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors pointer-events-none" />
                        <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className={`w-full pl-10 pr-10 py-2.5 border rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400 text-base ${confirmPassword &&
                        confirmPassword !== password ?
                        "border-red-300 focus:ring-red-300 focus:border-red-300" :
                        confirmPassword &&
                        confirmPassword === password ?
                        "border-green-300 focus:ring-green-400 focus:border-green-400" :
                        "border-gray-200 focus:ring-[#F28C28] focus:border-[#F28C28]"}`
                        } />
                      
                        <button
                        type="button"
                        onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none">
                        
                          {showConfirmPassword ?
                        <EyeOff className="h-5 w-5" /> :

                        <Eye className="h-5 w-5" />
                        }
                        </button>
                      </div>
                      {confirmPassword && confirmPassword !== password &&
                    <p className="text-xs text-red-500 font-semibold">
                          Passwords do not match.
                        </p>
                    }
                      {confirmPassword && confirmPassword === password &&
                    <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Passwords match!
                        </p>
                    }
                    </div>

                    <button
                    type="submit"
                    disabled={
                    isSubmitting ||
                    password.length < 8 ||
                    password !== confirmPassword
                    }
                    className="w-full flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#E67D1A] active:bg-[#D97016] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px] text-base">
                    
                      {isSubmitting ?
                    <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Updating Password...
                        </> :

                    <>
                          Reset Password
                          <ArrowRight className="w-5 h-5 ml-1" />
                        </>
                    }
                    </button>
                  </form>
                </div>
              }

              {

              }
              {step === "done" &&
              <div className="space-y-8 text-center py-4">
                  <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center ring-8 ring-green-100 animate-[growIn_0.4s_ease-out]">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E79]">
                      Password Reset!
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 max-w-xs mx-auto">
                      Your password has been successfully updated. You can now
                      sign in with your new credentials.
                    </p>
                  </div>
                  <button
                  onClick={() => router.push("/auth/sign-in")}
                  className="w-full flex items-center justify-center gap-2 bg-[#1F4E79] hover:bg-[#163a5e] active:bg-[#0f2a44] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10 min-h-[48px] text-base">
                  
                    Go to Sign In
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>);

}
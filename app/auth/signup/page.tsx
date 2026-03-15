"use client";

import React, { useState, useEffect } from "react";
import {
  Landmark,
  User,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Fingerprint,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

const VILLAGE_IMAGES = [
  "https://images.unsplash.com/photo-1625246333195-58197bdc046d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459196324263-149669528652?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536679545597-c2e5e1946495?q=80&w=2069&auto=format&fit=crop",
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      {/* Left Side - Hero/Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-[#1F4E79] relative overflow-hidden text-white p-12">
        {/* Home Button for Desktop */}
        <Link
          href="/"
          className="absolute top-[24px] left-8 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-[999px] backdrop-blur-sm text-[14px] font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>

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
            <div className="flex items-center gap-[16px] text-left">
              <div>
                <Landmark
                  className="size-10 sm:size-12 md:size-14"
                  strokeWidth={2}
                />
              </div>
              <div>
                <h3 className="text-[28px] font-[600] leading-[1.2] tracking-wide uppercase">
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
                The single unified platform for tax payments, certificates, and
                transparent administration for 28,000+ Gram Panchayats across
                the state.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col bg-white h-full relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-[#1F4E79] rounded-[6px]">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-[#1F4E79] text-[14px] uppercase tracking-wide">
              Gram Samridhi
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-[14px] font-bold text-[#1F4E79] hover:text-[#F28C28] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-[16px] overflow-y-auto">
          <div className="w-full max-w-lg space-y-8 py-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-[#1F4E79]">
                Create Account
              </h2>
              <p className="text-gray-600">
                Enter your details to register for the Maharashtra Digital
                Portal.
              </p>
            </div>

            <form className="space-y-5 text-left">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-[#1F4E79]">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors" />
                  <input
                    type="text"
                    placeholder="E.g. Rajesh Kumar"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-[#1F4E79]">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#1F4E79] transition-colors" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-[#1F4E79]">
                  Mobile Number
                </label>
                <div className="flex shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
                  <span className="inline-flex items-center px-4 rounded-l-sm border border-r-0 border-gray-200 bg-gray-50 text-gray-600 text-[14px] font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    className="flex-1 min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-sm border border-gray-200 text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Passwords Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-[#1F4E79]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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
                  <label className="text-[14px] font-bold text-[#1F4E79]">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-[#1F4E79] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F28C28] focus:border-[#F28C28] transition-all placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#F28C28] text-white py-3 px-4 rounded-sm font-black uppercase tracking-wider transition-colors shadow-lg shadow-stone-700/10"
              >
                Create Account
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-[14px]">
                <span className="px-4 bg-white text-gray-600 font-medium tracking-wide text-xs uppercase">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-sm hover:bg-gray-50 hover:border-[#1F4E79] transition-all group bg-white shadow-sm text-gray-700">
                <div className="w-6 h-6 rounded-[999px] bg-[#fcead8] flex items-center justify-center text-[#F28C28] font-black text-xs group-hover:scale-110 transition-transform border border-[#F28C28]/20">
                  M
                </div>
                <span className="font-bold text-[#1F4E79] uppercase text-[14px] tracking-wide">
                  Maha-ID
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-sm hover:bg-gray-50 hover:border-[#1F4E79] transition-all group bg-white shadow-sm text-gray-700">
                <Fingerprint className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[#1F4E79]" />
                <span className="font-bold text-[#1F4E79] uppercase text-[14px] tracking-wide">
                  Aadhaar
                </span>
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-[14px] font-semibold">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#F28C28] font-black hover:underline uppercase tracking-wide"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <footer className="w-full py-4 bg-[#2F5E3D] text-center">
          <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Government of Maharashtra. All
            rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

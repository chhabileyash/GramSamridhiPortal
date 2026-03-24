"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function ChangePasswordPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password criteria checks
  const hasLength = newPassword.length >= 12;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const hasUpperAndLower = /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword);

  const email = user?.primaryEmailAddress?.emailAddress || "";
  const currentPassword = (user?.unsafeMetadata as any)?.temppass as string || "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (!hasLength || !hasSymbol || !hasUpperAndLower) {
      setError("Please ensure all security standards are met.");
      return;
    }

    if (!currentPassword) {
      setError("No temporary password found. Please contact your administrator.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await user!.updatePassword({
        currentPassword,
        newPassword,
      });
      // Clear temppass from metadata after successful change
      await user!.update({
        unsafeMetadata: {
          ...user!.unsafeMetadata,
          temppass: undefined,
          mustChangePassword: false,
        },
      });
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");

      // Wait a moment so the user sees the success message
      setTimeout(() => {
        signOut({ redirectUrl: "/sign-in" });
      }, 1000);
    } catch (err: any) {
      console.error("error", err);
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Failed to update password.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <section className="bg-white p-8 border-l-4 border-[#FF9933] shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Update Password
          </h1>
          <p className="text-gray-700 text-sm">
            Enter your current password and choose a new one
          </p>
        </div>
       
      </section>

      <section className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm mt-6">
        {success ? (
          <div className="flex items-start gap-3 rounded-sm bg-green-50 p-4 text-sm text-green-800 border border-green-100">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Password updated successfully! Redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            {error && (
              <div className="flex items-start gap-3 rounded-sm bg-red-50 p-4 text-sm text-red-800 border border-red-100">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            {/* Email Display */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-2 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] focus:outline-none text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
            {/* New Password Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] focus:outline-none text-sm pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {/* Security hint optional */}
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide font-bold">
                  Min 12 chars, 1 uppercase, 1 symbol
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] focus:outline-none text-sm pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2c5577] text-white px-8 py-3 rounded font-bold hover:bg-[#138808] transition shadow text-sm border-b-4 border-[#138808] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
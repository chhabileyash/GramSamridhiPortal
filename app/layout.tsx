import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gram Samridhi Portal - Government of Maharashtra",
  description:
    "Gram Samridhi Portal for Panchayat services, schemes, grievances, and village information in Maharashtra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <ClerkProvider
          signInForceRedirectUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
          }
          signInFallbackRedirectUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
          }
          signUpForceRedirectUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
          }
          signUpFallbackRedirectUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
          }
          afterSignOutUrl="/"
          publishableKey="pk_test_Y29vbC1jYW1lbC01MC5jbGVyay5hY2NvdW50cy5kZXYk"
          key="sk_test_gbHfcd9jfeQmr3qZ6JLHrfpWxSUSmZfCyv2p02Jay3"
        >
          <Header />
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </ClerkProvider>
        <Analytics /> 
      </body>
    </html>
  );
}

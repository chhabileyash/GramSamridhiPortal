"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import dynamic from "next/dynamic";

const CustomUserButton = dynamic(() => import("./CustomUserButton"), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-10 animate-pulse bg-white/20 rounded-full"></div>
  ),
});
import Marquee from "react-fast-marquee";


// Constants

const COLORS = {
  primary: "#1F4E79",
  accent: "#F28C28",
  light: "#f8fafc",
} as const;

const GOOGLE_TRANSLATE_CONFIG = {
  MAX_RETRIES: 20,
  RETRY_DELAY: 300,
  INITIAL_DELAY: 100,
  PAGE_LANGUAGE: "en",
  ELEMENT_ID: "google_translate_element",
  ELEMENT_DESKTOP_ID: "google_translate_desktop_display",
  ELEMENT_MOBILE_ID: "google_translate_element_mobile",
} as const;

const ZOOM_CONFIG = {
  MIN: 0.8,
  MAX: 1.2,
  STEP: 0.1,
  DEFAULT: 1,
} as const; 

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          elementId: string,
        ) => void;
      };
    };
  }
}

/** Compact user profile card shown in the mobile sidebar drawer. */
const MobileUserCard = memo(function MobileUserCard({
  onSignOut,
}: {
  onSignOut?: () => void;
}) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const displayName =
    user?.fullName || user?.firstName || user?.username || "User";
  const displayInitials =
    (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");
  const displayEmail = user?.primaryEmailAddress?.emailAddress || "";

  const handleSignOut = async () => {
    await signOut();
    onSignOut?.();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Profile section */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#1F4E79]/5 to-[#F28C28]/5 border-b border-gray-100">
        {/* Avatar */}
        <div
          className="shrink-0 w-11 h-11 rounded-full overflow-hidden flex items-center justify-center font-semibold text-white text-base"
          style={{ background: "linear-gradient(135deg, #1F4E79, #F28C28)" }}
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{displayInitials || "U"}</span>
          )}
        </div>
        {/* Name + email */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1F4E79] truncate leading-tight">
            {displayName}
          </p>
          {displayEmail && (
            <p className="text-xs text-gray-500 truncate mt-0.5">{displayEmail}</p>
          )}
        </div>
      </div>
      {/* Sign-out */}
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.6 2.604A2.045 2.045 0 0 1 4.052 2h3.417c.544 0 1.066.217 1.45.604.385.387.601.911.601 1.458v.69c0 .413-.334.75-.746.75a.748.748 0 0 1-.745-.75v-.69a.564.564 0 0 0-.56-.562H4.051a.558.558 0 0 0-.56.563v7.875a.564.564 0 0 0 .56.562h3.417a.558.558 0 0 0 .56-.563v-.671c0-.415.333-.75.745-.75s.746.335.746.75v.671c0 .548-.216 1.072-.6 1.459a2.045 2.045 0 0 1-1.45.604H4.05a2.045 2.045 0 0 1-1.45-.604A2.068 2.068 0 0 1 2 11.937V4.064c0-.548.216-1.072.6-1.459Zm8.386 3.116a.743.743 0 0 1 1.055 0l1.74 1.75a.753.753 0 0 1 0 1.06l-1.74 1.75a.743.743 0 0 1-1.055 0 .753.753 0 0 1 0-1.06l.467-.47H5.858A.748.748 0 0 1 5.112 8c0-.414.334-.75.746-.75h5.595l-.467-.47a.753.753 0 0 1 0-1.06Z"/>
        </svg>
        Sign out
      </button>
    </div>
  );
});

const HeaderContent = memo(function HeaderContent({
  zoomLevel,
  setZoomLevel,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  pathname,
  isSignedIn,
  isLoaded,
}: {
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  pathname: string;
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
}) {
  const isRoot = pathname === "/";
  const { user } = useUser();
  const isAdmin = user?.unsafeMetadata?.role === "admin";

  const zoomOut = useCallback(
    () =>
      setZoomLevel((prev) =>
        Math.max(ZOOM_CONFIG.MIN, prev - ZOOM_CONFIG.STEP),
      ),
    [setZoomLevel],
  );
  const zoomIn = useCallback(
    () =>
      setZoomLevel((prev) =>
        Math.min(ZOOM_CONFIG.MAX, prev + ZOOM_CONFIG.STEP),
      ),
    [setZoomLevel],
  );
  const zoomReset = useCallback(
    () => setZoomLevel(ZOOM_CONFIG.DEFAULT),
    [setZoomLevel],
  );

  const navLinks = useMemo(() => {
    if (isAdmin) {
      return [
        { path: "/admin/home", label: "Dashboard" },
        { path: "/admin/schemes", label: "Schemes" },
        { path: "/admin/complaints", label: "Complaints" },
      ];
    }
    return [
      { path: isSignedIn ? "/home" : "/", label: "Home" },
      { path: "/about", label: "About Us" },
      { path: "/schemes", label: "Schemes" },
      { path: "/services", label: "Services" },
      { path: "/gallery", label: "Gallery" },
      { path: "/contact", label: "Contact Us" },
    ];
  }, [isSignedIn, isAdmin]);

  const isAuthPage = useMemo(() => pathname?.includes("/auth"), [pathname]);

  const renderNavLink = useCallback(
    (link: { path: string; label: string }, isDesktop = false) => {
      const isActive =
        pathname === link.path ||
        (link.path !== "/" && pathname?.startsWith(link.path));

      const baseClass = `transition-colors cursor-pointer ${
        isActive
          ? "bg-[#1F4E79] text-white font-semibold"
          : "hover:bg-gray-50 text-[#1F4E79] font-medium"
      }`;

      const linkClass = `block flex items-center gap-1 ${
        isDesktop ? "px-5 py-3" : "px-6 py-4"
      } ${isActive ? "hover:bg-[#153a5c]" : ""}`;

      return (
        <li key={link.path} className={baseClass}>
          <Link
            href={link.path}
            className={linkClass}
            onClick={() => !isDesktop && setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        </li>
      );
    },
    [pathname, setIsMobileMenuOpen],
  );

  // Apply zoom to document body
  useEffect(() => {
    document.body.style.zoom = zoomLevel.toString();
  }, [zoomLevel]);

  // Memoized components for zoom and auth controls to avoid duplication
  const ZoomControls = useCallback(
    ({ isMobile = false }: { isMobile?: boolean }) => (
      <div
        className={`flex items-center ${
          isMobile
            ? "justify-between bg-gray-200 rounded-md px-3 py-1.5 h-10 w-full text-[#1F4E79]"
            : "space-x-3 bg-black/20 rounded-md px-3 py-1.5 h-10 border border-white/10"
        }`}
      >
        <span className={`${isMobile ? "font-medium text-sm mr-auto" : ""}`}>
          {isMobile && "Font Size"}
        </span>
        <span className={`flex items-center gap-3 font-medium`}>
          <span
            className={`cursor-pointer ${
              isMobile
                ? "hover:font-bold"
                : "hover:text-white text-blue-100 transition-colors"
            }`}
            onClick={zoomOut}
          >
            A-
          </span>
          <span className={isMobile ? "text-gray-400" : "text-white/30"}>
            |
          </span>
          <span
            className={`cursor-pointer font-bold ${
              isMobile
                ? "bg-white text-[#1F4E79] px-2 py-0.5 rounded shadow-sm"
                : "bg-white text-[#1F4E79] px-2 py-0.5 rounded shadow-sm"
            }`}
            onClick={zoomReset}
          >
            A
          </span>
          <span className={isMobile ? "text-gray-400" : "text-white/30"}>
            |
          </span>
          <span
            className={`cursor-pointer ${
              isMobile
                ? "hover:font-bold"
                : "hover:text-white text-blue-100 transition-colors"
            }`}
            onClick={zoomIn}
          >
            A+
          </span>
        </span>
      </div>
    ),
    [zoomOut, zoomReset, zoomIn],
  );

  const AuthButton = useCallback(
    ({ isMobile = false }: { isMobile?: boolean }) => {
      if (isAuthPage) return null;
      if (!isLoaded)
        return (
          <div
            className={`${isMobile ? "h-16 w-full" : "h-10 w-32"} animate-pulse ${isMobile ? "bg-gray-200" : "bg-white/20"} rounded-md`}
          ></div>
        );
      if (!isSignedIn)
        return (
          <Link
            href="/auth/sign-in"
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className={`bg-[#F28C28] text-white px-6 py-2 h-10 flex items-center justify-center rounded-md font-bold shadow-sm ${
              isMobile ? "w-full" : ""
            } ${isMobile ? "" : "hover:bg-[#e07b1e] hover:shadow-md transition-all"}`}
          >
            Login / Register
          </Link>
        );
      if (isMobile) {
        return (
          <MobileUserCard onSignOut={() => setIsMobileMenuOpen(false)} />
        );
      }
      return (
        <div className="min-h-[40px] flex items-center">
          <CustomUserButton
            isMobile={false}
            onSignOut={() => setIsMobileMenuOpen(false)}
          />
        </div>
      );
    },
    [isSignedIn, isLoaded, isAuthPage, setIsMobileMenuOpen],
  );

  return (
    <>
      {/*
        Master Google Translate init element.
        Must NOT be inside a display:none container — positioned off-screen
        so the API can inject a real <select> with all language options.
      */}
      <div
        id={GOOGLE_TRANSLATE_CONFIG.ELEMENT_ID}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "1px",
          height: "1px",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto flex flex-col shadow-2xl`}
      >
        <div className="bg-[#1F4E79] p-4 flex justify-between items-center text-white">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white focus:outline-none p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Tools (Translate, Zoom, Register) */}
        <div className="p-4 flex flex-col gap-3 border-b border-gray-100 bg-[#f8fafc]">
          {/* Language Selector */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Language</span>
            <div className="flex items-center bg-gray-200 rounded-md px-3 py-1.5 min-h-[40px] w-full overflow-visible">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1F4E79] opacity-70 mr-2 shrink-0">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
              <div
                id={GOOGLE_TRANSLATE_CONFIG.ELEMENT_MOBILE_ID}
                className="flex-1 overflow-visible"
              ></div>
            </div>
          </div>
          <ZoomControls isMobile={true} />
          <AuthButton isMobile={true} />
        </div>

        {/* Mobile Nav Links */}
        <ul className="flex flex-col m-0 p-0 list-none divide-y divide-gray-100">
          {navLinks.map((link) => renderNavLink(link, false))}
        </ul>
      </div>

      <div className="sticky top-0 z-50 w-full flex flex-col">
        {/* BEGIN: Top Header */}
        <header
          className={`bg-[#1F4E79] text-white shadow-md relative z-40 transition-all duration-300 ${
            isRoot ? "py-4" : "py-2"
          }`}
          data-purpose="main-header"
        >
          <div
            className={`${
              isRoot ? "max-w-[1200px]" : "w-full max-w-full lg:px-8"
            } mx-auto flex flex-row justify-between items-center px-4 gap-4 md:gap-6 transition-all duration-300`}
          >
            <Link
              href={isSignedIn ? "/home" : "/"}
              className="flex flex-row items-center space-x-3 w-auto hover:opacity-90 transition-opacity"
            >
              <div
                className={`${
                  isRoot ? "w-12 h-12 p-2" : "w-10 h-10 p-1"
                } flex items-center justify-center shrink-0 bg-white/10 rounded-full transition-all duration-300`}
                data-purpose="logo-placeholder"
              >
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2
                  className={`${
                    isRoot ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                  } font-extrabold leading-tight text-white mb-1 tracking-wide transition-all duration-300`}
                >
                  Gram Samridhi Portal
                </h2>
                <p
                  className={`${
                    isRoot ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"
                  } font-medium text-blue-100 mb-0 transition-all duration-300`}
                >
                  Empowering Rural India
                </p>
              </div>
            </Link>

            {/* Desktop Tools hidden on mobile */}
            <div className="hidden lg:flex flex-wrap justify-end items-center gap-3 sm:gap-5 w-auto text-sm">
              <div className="flex items-center bg-black/20 rounded-md border border-white/10 px-3 py-1.5 h-10 hover:bg-black/30 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white opacity-90 mr-2 shrink-0"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <path d="M2 12h20"></path>
                </svg>
                {/* Desktop display: populated by cloning the master select */}
                <div
                  id={GOOGLE_TRANSLATE_CONFIG.ELEMENT_DESKTOP_ID}
                  className="min-w-[120px]"
                ></div>
              </div>
              <ZoomControls isMobile={false} />
              <AuthButton isMobile={false} />
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex lg:hidden justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-white focus:outline-none p-2 bg-black/20 rounded-md hover:bg-black/30 transition-colors"
                aria-label="Open Navigation Directory"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* BEGIN: Desktop Navigation Bar */}
        <nav
          className="hidden lg:block bg-white border-b border-gray-200 shadow-sm transition-all duration-300 relative z-30"
          data-purpose="primary-navigation"
        >
          <div
            className={`${
              isRoot ? "max-w-[1200px]" : "w-full max-w-full lg:px-8"
            } mx-auto flex items-center justify-between px-4 py-0 w-full relative transition-all duration-300`}
          >
            <ul className="flex items-center m-0 p-0 list-none divide-x divide-gray-200 w-auto">
              {navLinks.map((link) => renderNavLink(link, true))}
            </ul>
            <form
              action="https://www.google.com/search"
              method="GET"
              target="_blank"
              className="relative w-64 max-w-sm mb-0 mt-0"
            >
              <input
                className="w-full border border-gray-200 bg-gray-50 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                placeholder="Search with Google..."
                name="q"
                type="text"
                suppressHydrationWarning
              />
              <button
                type="submit"
                className="absolute right-4 top-2 text-gray-400 font-bold hover:text-blue-500 transition-colors"
                suppressHydrationWarning
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          </div>
        </nav>
      </div>

      {/* BEGIN: Alert Bar */}
      {!isAuthPage && (
        <div
          className="bg-[#FFF8F0] border-b border-orange-100 py-2 relative z-20 "
          data-purpose="alert-information"
        >
          <div
            className={`${
              isRoot ? "max-w-300" : "w-full max-w-full lg:px-8"
            } mx-auto px-4 flex flex-col sm:flex-row justify-center sm:justify-start items-center space-y-2 sm:space-y-0 sm:space-x-3 text-sm text-center sm:text-left transition-all duration-300`}
          >
            <span className="text-[#F28C28] text-lg"></span>
            <Marquee className="m-0 text-gray-700">
              <strong>Covid-19 Information:</strong> Latest guidelines and
              vaccination details here.{" "}
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-[#F28C28] font-semibold cursor-pointer hover:underline">
                Read More
              </span>
            </Marquee>
          </div>
        </div>
      )}
    </>
  );
});

export default memo(function Header() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const retryCountRef = useRef(0);
  const initCompletedRef = useRef(false);
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  // Initialize Google Translate — SINGLE instance in the off-screen master div.
  // After the API injects options into the master <select>, we clone it into
  // BOTH the desktop display container and the mobile drawer container.
  useEffect(() => {
    retryCountRef.current = 0;
    initCompletedRef.current = false;

    /**
     * Restore the page to its original English content.
     * Google Translate sets a cookie and adds the `translated-ltr` class on
     * <html>. Clicking the "restore" element inside the banner is the official
     * way; we replicate that here so we can call it programmatically.
     */
    const restoreToEnglish = () => {
      // Try the official Google Translate restore element first
      const banner = document.querySelector<HTMLElement>(".goog-te-banner-frame");
      if (banner) {
        try {
          const bannerDoc =
            (banner as HTMLIFrameElement).contentDocument ||
            (banner as HTMLIFrameElement).contentWindow?.document;
          const restoreBtn = bannerDoc?.querySelector<HTMLElement>(
            ".goog-te-banner-restore, [id*='restore']",
          );
          restoreBtn?.click();
          return;
        } catch {/* cross-origin – fall through */}
      }
      // Fallback: reset via cookie + reload
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
        location.hostname + ";";
      window.location.reload();
    };

    /** Build a styled <select> clone from the master and append it to targetId. */
    const makeSelectClone = (
      master: HTMLSelectElement,
      targetId: string,
      colorStyle: string,
    ) => {
      const container = document.getElementById(targetId);
      if (!container || container.querySelector("select")) return; // already cloned

      const clone = document.createElement("select");
      clone.style.cssText =
        `background:transparent;border:none;font-size:13px;font-weight:500;` +
        `cursor:pointer;outline:none;width:100%;padding:0 4px;color:${colorStyle};`;

      // ── Inject English as the first option (Google hides it since it's pageLanguage)
      const englishOpt = document.createElement("option");
      englishOpt.value = "en";
      englishOpt.text = "English";
      clone.appendChild(englishOpt);

      Array.from(master.options).forEach((opt) => {
        // Skip any English option Google may have left in to avoid duplicates
        if (opt.value === "en" || opt.value === "") return;
        const o = document.createElement("option");
        o.value = opt.value;
        o.text = opt.text;
        clone.appendChild(o);
      });

      // Default to English (page is currently in English)
      clone.value = master.value || "en";

      // clone → master (drives the actual translation)
      clone.addEventListener("change", () => {
        if (clone.value === "en") {
          restoreToEnglish();
          return;
        }
        master.value = clone.value;
        master.dispatchEvent(new Event("change"));
      });
      // master → clone (keeps in sync when changed elsewhere)
      master.addEventListener("change", () => {
        if (clone.value !== master.value) clone.value = master.value;
      });

      container.appendChild(clone);
    };

    const initTranslate = () => {
      if (initCompletedRef.current) return;

      const masterDiv = document.getElementById(GOOGLE_TRANSLATE_CONFIG.ELEMENT_ID);
      if (!masterDiv) {
        if (retryCountRef.current < GOOGLE_TRANSLATE_CONFIG.MAX_RETRIES) {
          retryCountRef.current++;
          setTimeout(initTranslate, GOOGLE_TRANSLATE_CONFIG.RETRY_DELAY);
        }
        return;
      }

      if (
        window.google?.translate?.TranslateElement &&
        typeof window.google.translate.TranslateElement === "function"
      ) {
        try {
          if (masterDiv.innerHTML.trim() === "") {
            new window.google.translate.TranslateElement(
              { pageLanguage: GOOGLE_TRANSLATE_CONFIG.PAGE_LANGUAGE, autoDisplay: false },
              GOOGLE_TRANSLATE_CONFIG.ELEMENT_ID,
            );
          }
          // Poll until the master <select> has options, then distribute clones
          const waitForSelect = (attempts = 0) => {
            const masterSel = masterDiv.querySelector<HTMLSelectElement>("select.goog-te-combo");
            if (masterSel && masterSel.options.length > 1) {
              makeSelectClone(masterSel, GOOGLE_TRANSLATE_CONFIG.ELEMENT_DESKTOP_ID, "white");
              makeSelectClone(masterSel, GOOGLE_TRANSLATE_CONFIG.ELEMENT_MOBILE_ID, "#1F4E79");
              initCompletedRef.current = true;
            } else if (attempts < 40) {
              setTimeout(() => waitForSelect(attempts + 1), 250);
            }
          };
          waitForSelect();
        } catch (error) {
          console.error("[Google Translate] Initialization error:", error);
          if (retryCountRef.current < GOOGLE_TRANSLATE_CONFIG.MAX_RETRIES) {
            retryCountRef.current++;
            setTimeout(initTranslate, GOOGLE_TRANSLATE_CONFIG.RETRY_DELAY);
          }
        }
      } else if (retryCountRef.current < GOOGLE_TRANSLATE_CONFIG.MAX_RETRIES) {
        retryCountRef.current++;
        setTimeout(initTranslate, GOOGLE_TRANSLATE_CONFIG.RETRY_DELAY);
      }
    };

    window.googleTranslateElementInit = initTranslate;
    setTimeout(initTranslate, GOOGLE_TRANSLATE_CONFIG.INITIAL_DELAY);

    return () => {
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);

  // Re-populate display containers when the mobile drawer opens,
  // in case they were empty at init time (e.g. drawer not yet mounted).
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const t = setTimeout(() => {
      const masterDiv = document.getElementById(GOOGLE_TRANSLATE_CONFIG.ELEMENT_ID);
      if (!masterDiv) return;
      const masterSel = masterDiv.querySelector<HTMLSelectElement>("select.goog-te-combo");
      if (!masterSel || masterSel.options.length <= 1) return;

      const mobileContainer = document.getElementById(GOOGLE_TRANSLATE_CONFIG.ELEMENT_MOBILE_ID);
      if (mobileContainer && !mobileContainer.querySelector("select")) {
        const mobileClone = document.createElement("select");
        mobileClone.style.cssText =
          "background:transparent;border:none;font-size:13px;font-weight:500;" +
          "cursor:pointer;outline:none;width:100%;padding:0 4px;color:#1F4E79;";

        // ── Inject English as the first option
        const engOpt = document.createElement("option");
        engOpt.value = "en";
        engOpt.text = "English";
        mobileClone.appendChild(engOpt);

        Array.from(masterSel.options).forEach((opt) => {
          if (opt.value === "en" || opt.value === "") return;
          const o = document.createElement("option");
          o.value = opt.value;
          o.text = opt.text;
          mobileClone.appendChild(o);
        });
        mobileClone.value = masterSel.value || "en";
        mobileClone.addEventListener("change", () => {
          if (mobileClone.value === "en") {
            // Restore to English: clear cookie and reload
            document.cookie =
              "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
              location.hostname + ";";
            window.location.reload();
            return;
          }
          masterSel.value = mobileClone.value;
          masterSel.dispatchEvent(new Event("change"));
        });
        masterSel.addEventListener("change", () => {
          if (mobileClone.value !== masterSel.value) mobileClone.value = masterSel.value;
        });
        mobileContainer.appendChild(mobileClone);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [isMobileMenuOpen]);

  return (
    <HeaderContent
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
      pathname={pathname}
      isSignedIn={isSignedIn}
      isLoaded={isLoaded}
    />
  );
});

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
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Marquee from "react-fast-marquee";

const CustomUserButton = dynamic(
  () => import("@/shared/components/ui/custom-user-button"),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-10 animate-pulse bg-white/20 rounded-full" />
    ),
  },
);

const COLORS = {
  primary: "#1F4E79",
  accent: "#F28C28",
  light: "#f8fafc",
} as const;

const GT = {
  MAX_RETRIES: 20,
  RETRY_DELAY: 300,
  INITIAL_DELAY: 100,
  PAGE_LANGUAGE: "en",
  ELEMENT_ID: "google_translate_element",
  ELEMENT_DESKTOP_ID: "google_translate_desktop_display",
  ELEMENT_MOBILE_ID: "google_translate_element_mobile",
} as const;

const ZOOM = { MIN: 0.8, MAX: 1.2, STEP: 0.1, DEFAULT: 1 } as const;

const ADMIN_NAV = [
  { path: "/admin/home", label: "Dashboard" },
  { path: "/admin/schemes", label: "Schemes" },
  { path: "/admin/complaints", label: "Complaints" },
] as const;

const MOBILE_ADMIN_NAV = [
  { path: "/admin/home", label: "Dashboard" },
  { path: "/admin/village-info", label: "Village Info" },
  { path: "/admin/panchayat-members", label: "Panchayat Members" },
  { path: "/admin/schemes", label: "Manage Schemes" },
  { path: "/admin/property-tax", label: "Property Tax Approvals" },
  { path: "/admin/water-tax", label: "Water Tax Approvals" },
  { path: "/admin/electricity-bill", label: "Electricity Bill Admin" },
  { path: "/admin/complaints", label: "Complaints Management" },
  { path: "/admin/certificates", label: "Certificate Approvals" },
  { path: "/admin/notifications", label: "Notifications / Alerts" },
  { path: "/admin/development-works", label: "Development Works" },
  { path: "/admin/suggestions", label: "Suggestions" },
] as const;

const USER_NAV_SIGNED_IN = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/schemes", label: "Schemes" },
  { path: "/services", label: "Services" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact Us" },
] as const;

const MOBILE_USER_NAV_SIGNED_IN = [
  { path: "/home", label: "Home" },
  { path: "/profile", label: "Profile" },
  { path: "/about", label: "About Us" },
  { path: "/schemes", label: "Schemes" },
  { path: "/services", label: "Services" },
  { path: "/property-tax-filling", label: "Property Tax" },
  { path: "/water-tax", label: "Water Tax" },
  { path: "/electricity-bill", label: "Electricity Bill" },
  { path: "/raise-complaint", label: "Raise Complaint" },
  { path: "/my-complaints", label: "My Complaints" },
  { path: "/certificates", label: "Apply for Certificate" },
  { path: "/my-certificates", label: "My Certificates" },
  { path: "/notifications", label: "Notifications" },
  { path: "/suggestions", label: "Suggestions" },
  { path: "/panchayat-members", label: "Panchayat Members" },
  { path: "/development-works", label: "Development Works" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact Us" },
] as const;

const USER_NAV_SIGNED_OUT = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/schemes", label: "Schemes" },
  { path: "/services", label: "Services" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact Us" },
] as const;

const GlobeIcon = () => (
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
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

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
    (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");
  const displayEmail = user?.primaryEmailAddress?.emailAddress ?? "";

  const handleSignOut = useCallback(async () => {
    await signOut();
    onSignOut?.();
  }, [signOut, onSignOut]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#1F4E79]/5 to-[#F28C28]/5 border-b border-gray-100">
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
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1F4E79] truncate leading-tight">
            {displayName}
          </p>
          {displayEmail && (
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {displayEmail}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.6 2.604A2.045 2.045 0 0 1 4.052 2h3.417c.544 0 1.066.217 1.45.604.385.387.601.911.601 1.458v.69c0 .413-.334.75-.746.75a.748.748 0 0 1-.745-.75v-.69a.564.564 0 0 0-.56-.562H4.051a.558.558 0 0 0-.56.563v7.875a.564.564 0 0 0 .56.562h3.417a.558.558 0 0 0 .56-.563v-.671c0-.415.333-.75.745-.75s.746.335.746.75v.671c0 .548-.216 1.072-.6 1.459a2.045 2.045 0 0 1-1.45.604H4.05a2.045 2.045 0 0 1-1.45-.604A2.068 2.068 0 0 1 2 11.937V4.064c0-.548.216-1.072.6-1.459Zm8.386 3.116a.743.743 0 0 1 1.055 0l1.74 1.75a.753.753 0 0 1 0 1.06l-1.74 1.75a.743.743 0 0 1-1.055 0 .753.753 0 0 1 0-1.06l.467-.47H5.858A.748.748 0 0 1 5.112 8c0-.414.334-.75.746-.75h5.595l-.467-.47a.753.753 0 0 1 0-1.06Z"
          />
        </svg>
        Sign out
      </button>
    </div>
  );
});

const ZoomControls = memo(function ZoomControls({
  isMobile,
  onZoomOut,
  onZoomReset,
  onZoomIn,
}: {
  isMobile: boolean;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onZoomIn: () => void;
}) {
  if (isMobile) {
    return (
      <div className="flex items-center justify-between bg-gray-200 rounded-md px-3 py-1.5 h-10 w-full text-[#1F4E79]">
        <span className="font-medium text-sm mr-auto">Font Size</span>
        <span className="flex items-center gap-3 font-medium">
          <span className="cursor-pointer hover:font-bold" onClick={onZoomOut}>
            A-
          </span>
          <span className="text-gray-400">|</span>
          <span
            className="cursor-pointer font-bold bg-white text-[#1F4E79] px-2 py-0.5 rounded shadow-sm"
            onClick={onZoomReset}
          >
            A
          </span>
          <span className="text-gray-400">|</span>
          <span className="cursor-pointer hover:font-bold" onClick={onZoomIn}>
            A+
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 bg-black/20 rounded-md px-3 py-1.5 h-10 border border-white/10">
      <span className="flex items-center gap-3 font-medium">
        <span
          className="cursor-pointer hover:text-white text-blue-100 transition-colors"
          onClick={onZoomOut}
        >
          A-
        </span>
        <span className="text-white/30">|</span>
        <span
          className="cursor-pointer font-bold bg-white text-[#1F4E79] px-2 py-0.5 rounded shadow-sm"
          onClick={onZoomReset}
        >
          A
        </span>
        <span className="text-white/30">|</span>
        <span
          className="cursor-pointer hover:text-white text-blue-100 transition-colors"
          onClick={onZoomIn}
        >
          A+
        </span>
      </span>
    </div>
  );
});

const AuthButton = memo(function AuthButton({
  isMobile,
  isSignedIn,
  isLoaded,
  isAuthPage,
  onMobileClose,
}: {
  isMobile: boolean;
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  isAuthPage: boolean;
  onMobileClose: () => void;
}) {
  if (isAuthPage) return null;

  if (!isLoaded) {
    return (
      <div
        className={`${isMobile ? "h-16 w-full bg-gray-200" : "h-10 w-32 bg-white/20"} animate-pulse rounded-md`}
      />
    );
  }

  if (!isSignedIn) {
    return (
      <Link
        href="/auth/sign-in"
        onClick={isMobile ? onMobileClose : undefined}
        className={`bg-[#F28C28] text-white px-6 py-2 h-10 flex items-center justify-center rounded-md font-bold shadow-sm${isMobile ? " w-full" : " hover:bg-[#e07b1e] hover:shadow-md transition-all"}`}
      >
        Login / Register
      </Link>
    );
  }

  if (isMobile) {
    return <MobileUserCard onSignOut={onMobileClose} />;
  }

  return (
    <div className="min-h-[40px] flex items-center">
      <CustomUserButton isMobile={false} onSignOut={onMobileClose} />
    </div>
  );
});

const HeaderContent = memo(function HeaderContent({
  zoomLevel,
  onZoomOut,
  onZoomReset,
  onZoomIn,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  pathname,
  isSignedIn,
  isLoaded,
  restoreToEnglish,
}: {
  zoomLevel: number;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onZoomIn: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  pathname: string;
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  restoreToEnglish: () => void;
}) {
  const isRoot = pathname === "/";
  const { user } = useUser();
  const isAdmin = user?.unsafeMetadata?.role === "admin";
  const isAuthPage = pathname?.includes("/auth");

  const closeMobileMenu = useCallback(
    () => setIsMobileMenuOpen(false),
    [setIsMobileMenuOpen],
  );

  const desktopNavLinks = isAdmin
    ? ADMIN_NAV
    : isSignedIn
      ? USER_NAV_SIGNED_IN
      : USER_NAV_SIGNED_OUT;

  const mobileNavLinks = isAdmin
    ? MOBILE_ADMIN_NAV
    : isSignedIn
      ? MOBILE_USER_NAV_SIGNED_IN
      : USER_NAV_SIGNED_OUT;

  useEffect(() => {
    document.body.style.zoom = zoomLevel.toString();
  }, [zoomLevel]);

  const renderNavLink = (
    link: { path: string; label: string },
    isDesktop: boolean,
  ) => {
    const isActive =
      pathname === link.path ||
      (link.path !== "/" && pathname?.startsWith(link.path));

    return (
      <li
        key={link.path}
        className={`transition-colors cursor-pointer ${
          isActive
            ? "bg-[#1F4E79] text-white font-semibold"
            : "hover:bg-gray-50 text-[#1F4E79] font-medium"
        }`}
      >
        <Link
          href={link.path}
          className={`block flex items-center gap-1 ${isDesktop ? "px-5 py-3" : "px-6 py-4"} ${isActive ? "hover:bg-[#153a5c]" : ""}`}
          onClick={isDesktop ? undefined : closeMobileMenu}
        >
          {link.label}
        </Link>
      </li>
    );
  };

  const containerClass = `${isRoot ? "max-w-[1200px]" : "w-full max-w-full lg:px-8"} mx-auto transition-all duration-300`;

  return (
    <>
      {}
      <div
        id={GT.ELEMENT_ID}
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

      {}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMobileMenu}
      />

      {}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} overflow-y-auto flex flex-col shadow-2xl`}
      >
        {}
        <div className="bg-[#1F4E79] p-4 flex justify-between items-center text-white">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={closeMobileMenu}
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

        {}
        <div className="p-4 flex flex-col gap-3 border-b border-gray-100 bg-[#f8fafc]">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">
              Language
            </span>
            <div className="flex items-center bg-gray-200 rounded-md px-3 py-1.5 min-h-[40px] w-full overflow-visible">
              <span className="text-[#1F4E79] opacity-70 mr-2 shrink-0">
                <GlobeIcon />
              </span>
              <div
                id={GT.ELEMENT_MOBILE_ID}
                className="flex-1 overflow-visible min-w-0"
              />
              <button
                onClick={restoreToEnglish}
                className="ml-2 bg-[#1F4E79] text-white text-xs px-2.5 py-1 rounded shadow-sm hover:bg-[#153a5c] transition-colors shrink-0 whitespace-nowrap"
              >
                Reset EN
              </button>
            </div>
          </div>
          <ZoomControls
            isMobile={true}
            onZoomOut={onZoomOut}
            onZoomReset={onZoomReset}
            onZoomIn={onZoomIn}
          />
          <AuthButton
            isMobile={true}
            isSignedIn={isSignedIn}
            isLoaded={isLoaded}
            isAuthPage={isAuthPage}
            onMobileClose={closeMobileMenu}
          />
        </div>

        {}
        <ul className="flex flex-col m-0 p-0 list-none divide-y divide-gray-100">
          {mobileNavLinks.map((link) => renderNavLink(link, false))}
        </ul>
      </div>

      {}
      <div className="sticky top-0 z-50 w-full flex flex-col">
        {}
        <header
          className={`bg-[#1F4E79] text-white shadow-md relative z-40 transition-all duration-300 ${isRoot ? "py-4" : "py-2"}`}
          data-purpose="main-header"
        >
          <div
            className={`${containerClass} flex flex-row justify-between items-center px-4 gap-4 md:gap-6`}
          >
            <Link
              href={isSignedIn ? "/home" : "/"}
              className="flex flex-row items-center space-x-3 w-auto hover:opacity-90 transition-opacity"
            >
              <div
                className={`${isRoot ? "w-12 h-12 p-2" : "w-10 h-10 p-1"} flex items-center justify-center shrink-0 bg-white/10 rounded-full transition-all duration-300`}
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
                  className={`${isRoot ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} font-extrabold leading-tight text-white mb-1 tracking-wide transition-all duration-300`}
                >
                  Gram Samridhi Portal
                </h2>
                <p
                  className={`${isRoot ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"} font-medium text-blue-100 mb-0 transition-all duration-300`}
                >
                  Empowering Rural India
                </p>
              </div>
            </Link>

            {}
            <div className="hidden lg:flex flex-wrap justify-end items-center gap-3 sm:gap-5 w-auto text-sm">
              <div className="flex items-center bg-black/20 rounded-md border border-white/10 px-3 py-1.5 h-10 hover:bg-black/30 transition-colors">
                <span className="text-white opacity-90 mr-2 shrink-0">
                  <GlobeIcon />
                </span>
                <div id={GT.ELEMENT_DESKTOP_ID} className="min-w-[100px]" />
                <button
                  onClick={restoreToEnglish}
                  className="ml-1 bg-white/10 hover:bg-white/20 text-white text-xs px-2 py-1 rounded transition-colors whitespace-nowrap"
                  title="Reset to English"
                >
                  Reset EN
                </button>
              </div>
              <ZoomControls
                isMobile={false}
                onZoomOut={onZoomOut}
                onZoomReset={onZoomReset}
                onZoomIn={onZoomIn}
              />
              <AuthButton
                isMobile={false}
                isSignedIn={isSignedIn}
                isLoaded={isLoaded}
                isAuthPage={isAuthPage}
                onMobileClose={closeMobileMenu}
              />
            </div>

            {}
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

        {}
        <nav
          className="hidden lg:block bg-white border-b border-gray-200 shadow-sm transition-all duration-300 relative z-30"
          data-purpose="primary-navigation"
        >
          <div
            className={`${containerClass} flex items-center justify-between px-4 py-0 w-full relative`}
          >
            <ul className="flex items-center m-0 p-0 list-none divide-x divide-gray-200 w-auto">
              {desktopNavLinks.map((link) => renderNavLink(link, true))}
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
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
});

const Header = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(ZOOM.DEFAULT);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const retryCountRef = useRef(0);
  const initCompletedRef = useRef(false);
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  const onZoomOut = useCallback(
    () =>
      setZoomLevel((p) =>
        Math.max(ZOOM.MIN, Number((p - ZOOM.STEP).toFixed(1))),
      ),
    [setZoomLevel],
  );
  const onZoomIn = useCallback(
    () =>
      setZoomLevel((p) =>
        Math.min(ZOOM.MAX, Number((p + ZOOM.STEP).toFixed(1))),
      ),
    [setZoomLevel],
  );

  const onZoomReset = useCallback(
    () => setZoomLevel(ZOOM.DEFAULT),
    [setZoomLevel],
  );

  const restoreToEnglish = useCallback(() => {
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;

    window.location.reload();
  }, []);

  const makeSelectClone = useCallback(
    (master: HTMLSelectElement, targetId: string, colorStyle: string) => {
      const container = document.getElementById(targetId);
      if (!container) return;

      const existing = container.querySelector("select");
      if (existing) container.removeChild(existing);

      const clone = document.createElement("select");
      clone.setAttribute("data-cloned", "true");
      clone.style.cssText = `background:transparent;border:none;font-size:13px;font-weight:500;cursor:pointer;outline:none;width:100%;padding:0 4px;color:${colorStyle};`;

      const englishOpt = document.createElement("option");
      englishOpt.value = "en";
      englishOpt.text = "English";
      clone.appendChild(englishOpt);

      Array.from(master.options).forEach((opt) => {
        if (!opt.value || opt.value === "en") return;
        const o = document.createElement("option");
        o.value = opt.value;
        o.text = opt.text;
        clone.appendChild(o);
      });

      clone.value = master.value || "en";

      clone.addEventListener("change", () => {
        if (clone.value === "en") {
          restoreToEnglish();
          return;
        }
        master.value = clone.value;
        master.dispatchEvent(new Event("change", { bubbles: true }));
      });

      master.addEventListener("change", () => {
        if (clone.value !== (master.value || "en"))
          clone.value = master.value || "en";
      });

      container.appendChild(clone);
    },
    [restoreToEnglish],
  );

  const refreshClones = useCallback(() => {
    const masterDiv = document.getElementById(GT.ELEMENT_ID);
    if (!masterDiv) return;
    const masterSel = masterDiv.querySelector<HTMLSelectElement>(
      "select.goog-te-combo",
    );
    if (!masterSel || masterSel.options.length <= 1) return;
    makeSelectClone(masterSel, GT.ELEMENT_DESKTOP_ID, "white");
    makeSelectClone(masterSel, GT.ELEMENT_MOBILE_ID, "#1F4E79");
  }, [makeSelectClone]);

  useEffect(() => {
    retryCountRef.current = 0;
    initCompletedRef.current = false;

    const initTranslate = () => {
      if (initCompletedRef.current) return;
      const masterDiv = document.getElementById(GT.ELEMENT_ID);
      if (!masterDiv) {
        if (retryCountRef.current < GT.MAX_RETRIES) {
          retryCountRef.current++;
          setTimeout(initTranslate, GT.RETRY_DELAY);
        }
        return;
      }

      if (window.google?.translate?.TranslateElement) {
        try {
          if (!masterDiv.innerHTML.trim()) {
            new window.google.translate.TranslateElement(
              { pageLanguage: GT.PAGE_LANGUAGE, autoDisplay: false },
              GT.ELEMENT_ID,
            );
          }
          const waitForSelect = (attempts = 0) => {
            const masterSel = masterDiv.querySelector<HTMLSelectElement>(
              "select.goog-te-combo",
            );
            if (masterSel && masterSel.options.length > 1) {
              refreshClones();
              initCompletedRef.current = true;
            } else if (attempts < 80) {
              setTimeout(() => waitForSelect(attempts + 1), 250);
            }
          };
          waitForSelect();
        } catch (err) {
          console.error("[Google Translate] Initialization error:", err);
        }
      } else if (retryCountRef.current < GT.MAX_RETRIES) {
        retryCountRef.current++;
        setTimeout(initTranslate, GT.RETRY_DELAY);
      }
    };

    window.googleTranslateElementInit = initTranslate;
    setTimeout(initTranslate, GT.INITIAL_DELAY);

    return () => {
      delete (window as any).googleTranslateElementInit;
    };
  }, [refreshClones]);

  useEffect(() => {
    const timer = setTimeout(refreshClones, 600);
    return () => clearTimeout(timer);
  }, [pathname, isMobileMenuOpen, refreshClones]);

  return (
    <HeaderContent
      zoomLevel={zoomLevel}
      onZoomOut={onZoomOut}
      onZoomReset={onZoomReset}
      onZoomIn={onZoomIn}
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
      pathname={pathname}
      isSignedIn={isSignedIn}
      isLoaded={isLoaded}
      restoreToEnglish={restoreToEnglish}
    />
  );
};

export default memo(Header);

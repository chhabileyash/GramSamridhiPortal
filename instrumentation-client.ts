"use client";

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        defaults: "2026-01-30",
        capture_exceptions: true,
        debug: process.env.NODE_ENV === "development",
        disable_session_recording: true, // disable heavy recorder
      });
    });
  });
}

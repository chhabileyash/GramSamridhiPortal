import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth/sign-in(.*)",
  "/auth/signup(.*)",
  "/about",
  "/api/webhooks(.*)",
]);

const isApiRoute = createRouteMatcher(["/api/(.*)", "/trpc/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  const role = (sessionClaims?.unsafe_metadata as any)?.role;
  const mustChangePassword = (sessionClaims?.unsafe_metadata as any)
    ?.mustChangePassword;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isChangePasswordRoute =
    req.nextUrl.pathname === "/admin/change-password";
  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/auth/sign-in") ||
    req.nextUrl.pathname.startsWith("/auth/signup");

  const homePage = role === "admin" ? "/admin/home" : "/home";

  if (
    userId &&
    role === "admin" &&
    mustChangePassword &&
    !isChangePasswordRoute
  ) {
    return NextResponse.redirect(new URL("/admin/change-password", req.url));
  }

  if (
    userId &&
    role === "admin" &&
    isChangePasswordRoute &&
    !mustChangePassword
  ) {
    return NextResponse.redirect(new URL("/admin/home", req.url));
  }

  if (userId && isAuthRoute) {
    return NextResponse.redirect(new URL(homePage, req.url));
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!userId) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (
    userId &&
    role === "admin" &&
    !isAdminRoute &&
    !isPublicRoute(req) &&
    !isApiRoute(req)
  ) {
    return NextResponse.redirect(new URL("/admin/home", req.url));
  }

  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

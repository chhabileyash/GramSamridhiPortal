import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth/sign-in(.*)",
  "/auth/signup(.*)",
  "/about",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect signed-in users away from auth pages
  if (
    userId &&
    (req.nextUrl.pathname.startsWith("/auth/sign-in") ||
      req.nextUrl.pathname.startsWith("/auth/signup"))
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

import "@clerk/nextjs/server";

declare module "@clerk/nextjs/server" {
  interface SessionClaims {
    unsafeMetadata?: {
      role?: "admin" | "user";
      mustChangePassword?: boolean;
    };
  }
}
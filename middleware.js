import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/privacy-policy", "/contact-us", "/not-found"];
const DEFAULT_LOGIN_REDIRECT = "/workscout/dashboard";
const ONBOARDING_ROUTE = "/workscout/onboarding";

// Simulated DB call for onboarding status
async function getUserOnboardingStatus(email) {
  // Replace this with your actual DB check
  // e.g., const user = await db.user.findUnique({ where: { email } });
  return false; // For testing purposes, assume not onboarded
}

export async function middleware(req) {
  const { nextUrl, auth } = req;
  const authenticated = !!req.auth;

  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAPI = nextUrl.pathname.startsWith("/api");
  const isOnboardingRoute = nextUrl.pathname.startsWith(ONBOARDING_ROUTE);

  if (isPublic || isAPI) {
    return null; // Allow access
  }



  // Authenticated
  const email = req.auth?.user?.email;
  const isOnboarded = await getUserOnboardingStatus(email);

  // console.log(isOnboarded)
  // Not onboarded → redirect to onboarding
  if (!isOnboarded && !isOnboardingRoute) {
    return NextResponse.redirect(new URL(ONBOARDING_ROUTE, req.url));
  }

  // Already onboarded but trying to access onboarding
  if (isOnboarded && isOnboardingRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  // Not authenticated and not a public route
  if (!authenticated) {
    return withAuth(req, {
      isReturnToCurrentPage: true
    });
  }


  // return null; // Allow access
}

export const config = {
  matcher: [
    "/(api|trpc)(.*)",
    "/",
    "/privacy-policy",
    "/contact-us",
    "/workscout/:path*"
  ],
};

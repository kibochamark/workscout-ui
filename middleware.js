import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import { getUserOnboardingStatus } from "./app/data-access/actions/onboardingstatus.service"

const publicRoutes = ["/", "/privacy-policy", "/contact-us", "/terms-of-use", "/not-found"];
const DEFAULT_LOGIN_REDIRECT = "/workscout/redirected-route";
const ONBOARDING_ROUTE = "/workscout/onboarding";

// Simulated DB call for onboarding status

export async function middleware(req) {
  const { nextUrl, auth } = req;
  const authenticated = !!req.auth;

  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAPI = nextUrl.pathname.startsWith("/api");
  const isOnboardingRoute = nextUrl.pathname.startsWith(ONBOARDING_ROUTE);

  if (isPublic || isAPI) {
    return null; // Allow access
  }



  const Onboarded = await getUserOnboardingStatus();
  const isOnboarded = Onboarded.status == 500 ? false : Onboarded.data.data ? true :false

  console.log(Onboarded)
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
    "/terms-of-use",
    "/contact-us",
    "/workscout/:path*"
  ],
};

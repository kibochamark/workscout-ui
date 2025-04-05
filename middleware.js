// import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";


const publicRoutes = ["/", "/privacy-policy", "/contact-us", "/not-found"]
const authroutes = ["/api/auth/login", "/api/auth/signup", "/api/auth/kinde_callback"]
const DEFAULT_LOGIN_REDIRECT = "/workscout/dashboard"




// export default function middleware(req) {

//     const authenticated = !!req.auth
//     const { nextUrl } = req;

//     const isPublic = publicRoutes.includes(nextUrl.pathname)
//     const isAuthRoute = authroutes.includes(nextUrl.pathname);

//     if (isAuthRoute) {
//         return
//     }


//     if (isAuthRoute) {
//         if (authenticated) {
//             return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//         }
//         return null;
//     }

//     if (!authenticated && !isPublic) {
//         return withAuth(req, {
//             isReturnToCurrentPage: true
//         });
//     }
// }


// export const config = {
//     matcher: [
//         "/(api|trpc)(.*)",
//         "/",
//         "/privacy-policy",
//         "/contact-us",
//         "/workscout/:path*"
//     ],
// };

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

async function middleware(req) {

  const authenticated = !!req.auth
  const { nextUrl } = req;

  

  const isPublic = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = nextUrl.pathname.startsWith("/api");
  const isOnboardingRoute = nextUrl.pathname.includes("/workscout/onboarding")


  console.log("look at me", nextUrl, isPublic, isAuthRoute, isOnboardingRoute);



  // if (isAuthRoute) {
  //   if (authenticated) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return null;
  // }

  if (isPublic) {
    return null
  }

  // user is already authenticated

  if (authenticated) {
    const isonboarded=false
    console.log(isonboarded, "me")
    if (!isonboarded) {
      return Response.redirect(new URL("/workscout/onboarding", nextUrl))
    }

    if (nextUrl.pathname.includes("/workscout/onboarding") && isonboarded) {
      return null
    }
  }


  if (!authenticated && !isPublic) {
    return withAuth(req, {
      isReturnToCurrentPage: true
    });
  }



  return null
}
// {
//   isReturnToCurrentPage: true,
//   // loginPage: "/login",
//   publicPaths: ["/", "/privacy-policy", "/terms-of-use", "/contact-us", "/not-found"],
//   // isAuthorized: ({token}) => {
//   //   // The user will be considered authorized if they have the permission 'eat:chips'
//   //   return token.permissions.includes("eat:chips");
//   // }
// }


export const config = {
  matcher: [
    "/(api|trpc)(.*)",
    "/",
    "/privacy-policy",
    "/contact-us",
    "/workscout/:path*"
  ],
};


export default middleware
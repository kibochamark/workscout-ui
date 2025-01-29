// import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";


// const publicRoutes = ["/", "/privacy-policy", "/contact-us", "/not-found"]
// const authroutes = ["/api/auth/login", "/api/auth/signup"]
// const DEFAULT_LOGIN_REDIRECT = "/"




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

import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";
export default withAuth(
  async function middleware(req) {
    console.log("look at me", req.kindeAuth);
  },
  {
    isReturnToCurrentPage: true,
    // loginPage: "/login",
    publicPaths:  ["/", "/privacy-policy", "/contact-us", "/not-found"],
    // isAuthorized: ({token}) => {
    //   // The user will be considered authorized if they have the permission 'eat:chips'
    //   return token.permissions.includes("eat:chips");
    // }
  }
);

export const config = {
    matcher: [
        "/(api|trpc)(.*)",
        "/",
        "/privacy-policy",
        "/contact-us",
        "/workscout/:path*"
    ],
};
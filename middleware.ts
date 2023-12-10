import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (
        req.nextUrl.pathname.startsWith("/") &&
        token === null &&
        !(
          req.nextUrl.pathname.startsWith("/auth/login") ||
          req.nextUrl.pathname.startsWith("/auth.jpg") ||
          req.nextUrl.pathname.startsWith("/auth/signup")
        )
      ) {
        return false;
      }
      return true;
    },
  },
});

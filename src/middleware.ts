import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "@/lib/auth.config";
import { API_AUTH_PREFIX, AUTH_ROUTES, isProtectedRoute } from "@/routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  const isAuth = req.auth;

  const isAccessingApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isAccessingAuthRoute = AUTH_ROUTES.some(
    (route) => typeof route === "string" && pathname.startsWith(route)
  );
  const isAccessingProtectedRoute = isProtectedRoute(pathname);

  if (isAccessingApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAccessingAuthRoute) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (!isAuth && isAccessingProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

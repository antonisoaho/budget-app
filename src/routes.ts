export const API_AUTH_PREFIX = "/api/auth";
export const AUTH_ROUTES = ["/login"];

export const PROTECTED_ROUTES = ["/me", "/me/:path*"];

export const isProtectedRoute = (path: string) => {
  return PROTECTED_ROUTES.some((route) => {
    return path.startsWith(route);
  });
};

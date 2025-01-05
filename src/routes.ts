export const API_AUTH_PREFIX = "/api/auth";
export const AUTH_ROUTES = ["/login"];

export const PROTECTED_ROUTES = [
  "/budget",
  "/profile",
  "/settings",
  "/budget",
  /^\/budget\/[a-zA-Z0-9_-]+$/,
  /^\/[a-zA-Z0-9_-]+$/,
];

export const isProtectedRoute = (path: string) => {
  return PROTECTED_ROUTES.some((route) => {
    if (typeof route === "string") {
      return path.startsWith(route);
    } else if (route instanceof RegExp) {
      return route.test(path);
    }
    return false;
  });
};

const BREADCRUMB_MAPPING: Record<string, string> = {
  me: "Dashboard",
  budgets: "Budgets",
  templates: "Templates",
  contributions: "Contributions",
  // Add more mappings as needed
};

export interface BreadcrumbItem {
  label: string;
  href: string;
  current: boolean;
}

export const getBreadcrumbs = (path: string): BreadcrumbItem[] => {
  const paths = path.split("/").filter(Boolean);

  return paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    const label =
      BREADCRUMB_MAPPING[path] || path.charAt(0).toUpperCase() + path.slice(1);

    return {
      label,
      href,
      current: index === paths.length - 1,
    };
  });
};

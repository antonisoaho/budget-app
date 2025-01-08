const BREADCRUMB_MAPPING: Record<string, string> = {
  contributions: "Contributions",
  budgets: "Budget",
  templates: "Template",
};

export interface BreadcrumbItem {
  label: string;
  href: string;
  current: boolean;
}

const MONGO_ID_REGEX = /^[a-f0-9]{24}$/;

export const getBreadcrumbs = (path: string): BreadcrumbItem[] => {
  const paths = path.split("/").filter(Boolean);

  return paths.map((path, index) => {
    let label;
    if (MONGO_ID_REGEX.test(path)) {
      const previousPath = paths[index - 1] || "Unknown";
      label = BREADCRUMB_MAPPING[previousPath] || "Details";
    } else {
      label = path.charAt(0).toUpperCase() + path.slice(1);
    }

    const href = `/${paths.slice(0, index + 1).join("/")}`;

    return {
      label,
      href,
      current: index === paths.length - 1,
    };
  });
};

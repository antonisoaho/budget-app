"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { getBreadcrumbs } from "@/lib/breadcrumb.config";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumbs = () => {
  const path = usePathname();
  const breadcrumbs = getBreadcrumbs(path);

  console.log("breadcrumbs", breadcrumbs);
  console.log("path", path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem className="hidden md:block">
              {breadcrumb.current ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!breadcrumb.current && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;

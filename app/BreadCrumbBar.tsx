"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import React from "react";

export function BreadcrumbBar() {
  const pathName = usePathname().replace(/^\//, "");
  const formattedPath = pathName
    .split("/")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" / ");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Text className="text-sm font-medium">
            {formattedPath === "" ? "Overview" : formattedPath}
          </Text>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

import { Priority } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const priorityMap: Record<
  Priority,
  { label: string; color: "blue" | "yellow" | "orange" | "red" }
> = {
  LOW: { label: "Low", color: "blue" },
  MEDIUM: { label: "Medium", color: "yellow" },
  HIGH: { label: "High", color: "orange" },
  CRITICAL: { label: "Critical", color: "red" },
};

interface Props {
  priority: Priority | undefined;
}

const IssueStatusBadge = ({ priority }: Props) => {
  return (
    <Badge color={priorityMap[priority!]?.color}>
      {priorityMap[priority!]?.label}
    </Badge>
  );
};

export default IssueStatusBadge;

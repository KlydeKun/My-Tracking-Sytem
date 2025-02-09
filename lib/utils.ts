import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const DateFormatter = (issue: { createdAt: Date | string; }) => {
  const date = typeof issue.createdAt === 'string' ? new Date(issue.createdAt) : issue.createdAt;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

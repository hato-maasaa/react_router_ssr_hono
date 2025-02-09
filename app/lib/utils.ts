import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * classNames utility function that merges Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTextSize(size: number, text: string) {
  if (text.length > size) {
    return `${text.slice(0, size)}...`
  } else {
    return text
  }
}
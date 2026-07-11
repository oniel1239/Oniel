import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the correct asset path accounting for the Vite base path.
 * Use this for any assets in the /public directory.
 * Example: asset('/profile.jpg') → '/OnielRobinSamuel/profile.jpg' in production
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(iso: string | null): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

export function readingTime(mdx: string): number {
  const text = mdx ?? ''
  const words = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*`~\-\]()!]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0).length
  return Math.max(1, Math.round(words / 200))
}

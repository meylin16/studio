
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalizes a phrase by converting to lowercase, removing accents,
 * and keeping only letters (a-z, ñ) and spaces.
 * @param phrase The input phrase string.
 * @returns The normalized phrase.
 */
export function cleanPhrase(phrase: string): string {
  return phrase
    .toLowerCase()
    // Normalize to NFD (Normalization Form Decomposition) to separate base characters and diacritics
    .normalize("NFD")
    // Remove diacritics (accents)
    .replace(/[\u0300-\u036f]/g, "")
    // Keep only letters (a-z), ñ, and spaces. Remove all other characters.
    .replace(/[^a-zñ\s]/g, "")
    // Optional: Collapse multiple spaces into one, although current game logic handles multiple spaces between words.
    // .replace(/\s+/g, ' ')
    .trim(); // Remove leading/trailing whitespace
}

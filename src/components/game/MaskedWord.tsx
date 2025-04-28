
import * as React from "react";
import { cleanPhrase } from "@/lib/utils";

interface MaskedWordProps {
  phrase: string;
  guessedLetters: Set<string>;
}

export function MaskedWord({ phrase, guessedLetters }: MaskedWordProps) {
  const normalizedPhrase = cleanPhrase(phrase);

  const displayWord = normalizedPhrase
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((letter) =>
          guessedLetters.has(letter) || letter === " " ? letter : "_"
        )
        .join(" ") // Space between letters within a word
    )
    .join("  "); // Double space between words

  return (
    <div
      // Adjusted text size and tracking for responsiveness
      className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono tracking-wider sm:tracking-widest p-3 sm:p-4 rounded-md bg-secondary text-secondary-foreground min-h-[2.5em] sm:min-h-[3em] flex items-center justify-center w-full"
      aria-label={`Palabra oculta: ${displayWord.replace(/_/g, "letra oculta")}`}
    >
       {/* Ensure text breaks nicely */}
       <span className="break-all">{displayWord || "..."}</span>
    </div>
  );
}

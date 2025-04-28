
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
      className="text-center text-2xl sm:text-3xl md:text-4xl font-mono tracking-widest p-4 rounded-md bg-secondary text-secondary-foreground min-h-[3em] flex items-center justify-center"
      aria-label={`Palabra oculta: ${displayWord.replace(/_/g, "letra oculta")}`}
    >
      {displayWord || "..."}
    </div>
  );
}

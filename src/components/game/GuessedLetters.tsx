
import * as React from "react";
import { Badge } from "@/components/ui/badge";

interface GuessedLettersProps {
  incorrectGuesses: Set<string>;
}

export function GuessedLetters({ incorrectGuesses }: GuessedLettersProps) {
  const sortedGuesses = Array.from(incorrectGuesses).sort();

  if (sortedGuesses.length === 0) {
    return null; // Don't render if no incorrect guesses
  }

  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-muted-foreground mb-2">Letras Incorrectas:</p>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {sortedGuesses.map((letter) => (
          <Badge key={letter} variant="destructive" className="text-base sm:text-lg p-1.5 sm:p-2">
            {letter.toUpperCase()}
          </Badge>
        ))}
      </div>
    </div>
  );
}

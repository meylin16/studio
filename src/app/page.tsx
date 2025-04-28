
"use client";

import * as React from "react";
import { PhraseInput } from "@/components/game/PhraseInput";
import { MaskedWord } from "@/components/game/MaskedWord";
import { LetterInput } from "@/components/game/LetterInput";
import { HangmanDrawing } from "@/components/game/HangmanDrawing";
import { GuessedLetters } from "@/components/game/GuessedLetters";
import { GameStatusAlert } from "@/components/game/GameStatusAlert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cleanPhrase } from "@/lib/utils";

type GameState = "INPUT_PHRASE" | "PLAYING" | "WON" | "LOST";

const MAX_INCORRECT_GUESSES = 10; // Base, PostV, PostH, Rope, Head, Torso, ArmL, ArmR, LegL, LegR

export default function Home() {
  const [gameState, setGameState] = React.useState<GameState>("INPUT_PHRASE");
  const [secretPhrase, setSecretPhrase] = React.useState<string>("");
  const [guessedLetters, setGuessedLetters] = React.useState<Set<string>>(
    new Set()
  );
  const [incorrectGuesses, setIncorrectGuesses] = React.useState<Set<string>>(
    new Set()
  );

  const normalizedPhrase = React.useMemo(
    () => cleanPhrase(secretPhrase),
    [secretPhrase]
  );

  const incorrectGuessCount = incorrectGuesses.size;

  const isGameWon = React.useMemo(() => {
    if (!normalizedPhrase) return false;
    return normalizedPhrase
      .split("")
      .every((letter) => letter === " " || guessedLetters.has(letter));
  }, [normalizedPhrase, guessedLetters]);

  const isGameLost = incorrectGuessCount >= MAX_INCORRECT_GUESSES;

  React.useEffect(() => {
    if (isGameWon) {
      setGameState("WON");
    }
    if (isGameLost) {
      setGameState("LOST");
    }
  }, [isGameWon, isGameLost]);

  const handlePhraseSubmit = (phrase: string) => {
    const cleaned = phrase.trim();
    if (cleaned) {
      setSecretPhrase(cleaned);
      setGameState("PLAYING");
      setGuessedLetters(new Set());
      setIncorrectGuesses(new Set());
    }
  };

  const handleGuess = (letter: string) => {
    if (
      !letter ||
      letter.length !== 1 ||
      guessedLetters.has(letter) ||
      incorrectGuesses.has(letter) ||
      gameState !== "PLAYING"
    ) {
      return;
    }

    const normalizedLetter = cleanPhrase(letter); // Use cleanPhrase for consistency
    if (!normalizedLetter) return; // Ignore if it becomes empty (e.g., accents removed)

    if (normalizedPhrase.includes(normalizedLetter)) {
      setGuessedLetters((prev) => new Set(prev).add(normalizedLetter));
    } else {
      setIncorrectGuesses((prev) => new Set(prev).add(normalizedLetter));
    }
  };

  const handleReset = () => {
    setGameState("INPUT_PHRASE");
    setSecretPhrase("");
    setGuessedLetters(new Set());
    setIncorrectGuesses(new Set());
  };

  return (
    // Adjusted padding for responsiveness
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center px-4 pt-6 pb-4 sm:px-6 sm:pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            El Ahorcado Elegante
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 sm:space-y-6 p-4 sm:p-6">
          {gameState === "INPUT_PHRASE" && (
            <PhraseInput onSubmit={handlePhraseSubmit} />
          )}

          {gameState !== "INPUT_PHRASE" && (
            <>
              <HangmanDrawing numberOfGuesses={incorrectGuessCount} />
              <MaskedWord
                phrase={secretPhrase}
                guessedLetters={guessedLetters}
              />
              {gameState === "PLAYING" && (
                 <div className="w-full max-w-xs space-y-3 sm:space-y-4">
                  <LetterInput onGuess={handleGuess} disabled={isGameWon || isGameLost} />
                  <GuessedLetters incorrectGuesses={incorrectGuesses} />
                </div>
              )}
              {(gameState === "WON" || gameState === "LOST") && (
                <GameStatusAlert
                  status={gameState}
                  secretPhrase={secretPhrase}
                  onReset={handleReset}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

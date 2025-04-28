
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cleanPhrase } from "@/lib/utils"; // Import cleanPhrase

const guessSchema = z.object({
  letter: z.string()
    .min(1, "Ingresa una letra.")
    .max(1, "Ingresa solo una letra.")
    .regex(/^[a-zA-ZñÑ]$/, "Ingresa una letra válida (A-Z, Ñ)."), // Allow Ñ/ñ
});

type GuessFormValues = z.infer<typeof guessSchema>;

interface LetterInputProps {
  onGuess: (letter: string) => void;
  disabled?: boolean;
}

export function LetterInput({ onGuess, disabled = false }: LetterInputProps) {
  const form = useForm<GuessFormValues>({
    resolver: zodResolver(guessSchema),
    defaultValues: {
      letter: "",
    },
  });
  const inputRef = React.useRef<HTMLInputElement>(null); // Ref for the input

  const processSubmit: SubmitHandler<GuessFormValues> = (data) => {
    const cleanedLetter = cleanPhrase(data.letter); // Normalize the letter
    if(cleanedLetter) { // Only proceed if the cleaned letter is not empty
        onGuess(cleanedLetter);
    }
    form.reset(); // Reset the form field
    // Refocus the input after submission for better UX
    inputRef.current?.focus();
  };

  // Function to handle input change and auto-submit
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    form.setValue("letter", value); // Update form value

    // Basic validation before trying to submit automatically
    if (value.length === 1 && /^[a-zA-ZñÑ]$/.test(value)) {
      form.handleSubmit(processSubmit)();
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processSubmit)} className="flex items-end space-x-2 w-full">
        <FormField
          control={form.control}
          name="letter"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel className="sr-only">Adivina una letra</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  ref={inputRef} // Assign ref
                  maxLength={1}
                  placeholder="Letra"
                  className="text-center text-lg uppercase" // Center text and make uppercase visually
                  disabled={disabled}
                  aria-label="Adivina una letra"
                  onChange={handleInputChange} // Use custom handler
                  autoComplete="off"
                  autoFocus // Focus on mount
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         {/* Hidden submit button for accessibility and Enter key submission */}
         <button type="submit" disabled={disabled} className="hidden">
            Adivinar
          </button>
      </form>
    </Form>
  );
}

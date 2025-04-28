
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Ensure Label is imported if used explicitly
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const phraseSchema = z.object({
  phrase: z.string().min(1, "La frase no puede estar vacía.").max(100, "La frase es demasiado larga."),
});

type PhraseFormValues = z.infer<typeof phraseSchema>;

interface PhraseInputProps {
  onSubmit: (phrase: string) => void;
}

export function PhraseInput({ onSubmit }: PhraseInputProps) {
  const form = useForm<PhraseFormValues>({
    resolver: zodResolver(phraseSchema),
    defaultValues: {
      phrase: "",
    },
  });

  const processSubmit: SubmitHandler<PhraseFormValues> = (data) => {
    onSubmit(data.phrase);
  };

  return (
    <Card className="w-full max-w-md">
        {/* Adjusted padding and text sizes in header */}
        <CardHeader className="px-4 pt-5 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Comenzar Juego</CardTitle>
            <CardDescription className="text-sm sm:text-base">Ingresa una palabra o frase para que alguien la adivine.</CardDescription>
        </CardHeader>
        <Form {...form}>
            {/* Adjusted spacing */}
            <form onSubmit={form.handleSubmit(processSubmit)} className="space-y-3 sm:space-y-4">
                {/* Adjusted padding */}
                <CardContent className="px-4 pb-0 pt-2 sm:px-6">
                    <FormField
                        control={form.control}
                        name="phrase"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm sm:text-base">Palabra o Frase Secreta</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Escribe aquí..."
                                        {...field}
                                        aria-label="Palabra o Frase Secreta"
                                        className="text-base" // Ensure consistent text size
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                {/* Adjusted padding */}
                <CardFooter className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-sm sm:text-base">
                        Iniciar Juego
                    </Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
  );
}

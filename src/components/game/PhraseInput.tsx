
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <CardHeader>
            <CardTitle>Comenzar Juego</CardTitle>
            <CardDescription>Ingresa una palabra o frase para que alguien la adivine.</CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(processSubmit)} className="space-y-4">
                <CardContent>
                    <FormField
                        control={form.control}
                        name="phrase"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Palabra o Frase Secreta</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Escribe aquí..."
                                        {...field}
                                        aria-label="Palabra o Frase Secreta"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                        Iniciar Juego
                    </Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
  );
}

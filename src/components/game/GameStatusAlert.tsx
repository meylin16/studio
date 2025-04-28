
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Import Button for the trigger

interface GameStatusAlertProps {
  status: "WON" | "LOST";
  secretPhrase: string;
  onReset: () => void;
}

export function GameStatusAlert({ status, secretPhrase, onReset }: GameStatusAlertProps) {
    const [isOpen, setIsOpen] = React.useState(true); // Control dialog visibility

    React.useEffect(() => {
      setIsOpen(true); // Ensure dialog opens when status changes to WON or LOST
    }, [status]);


    const title = status === "WON" ? "¡Felicidades! 🎉" : "¡Has Perdido! 💀";
    const description =
        status === "WON"
        ? "¡Has adivinado la palabra correctamente!"
        : `Lo siento, no has adivinado. La palabra era: "${secretPhrase}".`;

    // Prevent closing by clicking outside or pressing Escape
    const handleInteractOutside = (event: Event) => {
        event.preventDefault();
    };

    const handleEscapeKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
    };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onReset()}>
      {/* Removed AlertDialogTrigger as we control it with `open` state */}
      <AlertDialogContent
        // Adjusted padding for smaller screens
        className="fade-in p-4 sm:p-6"
        onInteractOutside={handleInteractOutside}
        onEscapeKeyDown={handleEscapeKeyDown}
        >
        <AlertDialogHeader>
          {/* Adjusted text size */}
          <AlertDialogTitle className="text-center text-xl sm:text-2xl">{title}</AlertDialogTitle>
          {/* Adjusted text size */}
          <AlertDialogDescription className="text-center text-base sm:text-lg">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center pt-2 sm:pt-4">
          {/* Adjusted button text size */}
          <AlertDialogAction onClick={onReset} className="bg-accent hover:bg-accent/90 text-sm sm:text-base">
            Jugar de Nuevo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

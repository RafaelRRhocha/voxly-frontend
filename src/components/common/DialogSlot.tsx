import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogSlotProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonDisabled?: boolean;
  cancelButtonDisabled?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  asChild?: boolean;
}

export function DialogSlot({
  trigger,
  title,
  description,
  children,
  showCancelButton = true,
  showConfirmButton = true,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  confirmButtonDisabled = false,
  cancelButtonDisabled = false,
  onConfirm,
  onCancel,
  asChild = true,
}: DialogSlotProps) {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        {(showCancelButton || showConfirmButton) && (
          <DialogFooter className="gap-2">
            {showCancelButton && (
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={cancelButtonDisabled}
                >
                  {cancelButtonText}
                </Button>
              </DialogClose>
            )}
            {showConfirmButton && (
              <DialogClose asChild>
                <Button
                  type="submit"
                  onClick={onConfirm}
                  disabled={confirmButtonDisabled}
                >
                  {confirmButtonText}
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

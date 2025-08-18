"use client";

import { useState } from "react";
import { AlertTriangleIcon, TrashIcon } from "lucide-react";

import { DialogSlot } from "@/components/common/DialogSlot";
import { User } from "@/types";

interface DeleteUserDialogProps {
  user: User;
  trigger: React.ReactNode;
  onDelete: (userId: number) => Promise<void>;
}

export const DeleteUserDialog = ({
  user,
  trigger,
  onDelete,
}: DeleteUserDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await onDelete(user.id);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DialogSlot
      trigger={trigger}
      title="Excluir Usuário"
      description="Esta ação não pode ser desfeita. O usuário será permanentemente removido do sistema."
      confirmButtonText={isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
      cancelButtonText="Cancelar"
      onConfirm={handleDelete}
    >
      <div className="flex items-start space-x-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangleIcon className="h-5 w-5 text-destructive" />
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="font-semibold text-destructive">Atenção!</h4>
          <p className="text-sm text-muted-foreground">
            Você está prestes a excluir o usuário:
          </p>

          <div className="rounded-md bg-background p-3 border">
            <div className="flex items-center space-x-3">
              <TrashIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Esta ação é irreversível e todos os dados associados a este usuário
            serão perdidos.
          </p>
        </div>
      </div>
    </DialogSlot>
  );
};

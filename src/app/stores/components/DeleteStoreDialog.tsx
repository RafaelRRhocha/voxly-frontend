"use client";

import { useState } from "react";
import { AlertTriangleIcon, StoreIcon } from "lucide-react";

import { DialogSlot } from "@/components/common/DialogSlot";
import { Store } from "@/types/stores";

interface DeleteStoreDialogProps {
  store: Store;
  trigger: React.ReactNode;
  onDelete: (storeId: number) => Promise<void>;
}

export const DeleteStoreDialog = ({
  store,
  trigger,
  onDelete,
}: DeleteStoreDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await onDelete(store.id);
    } catch (error) {
      console.error("Erro ao excluir loja:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DialogSlot
      trigger={trigger}
      title="Excluir Loja"
      description="Esta ação não pode ser desfeita. A loja será permanentemente removida do sistema."
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
            Você está prestes a excluir a loja:
          </p>

          <div className="rounded-md bg-background p-3 border">
            <div className="flex items-center space-x-3">
              <StoreIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{store.name}</p>
                <p className="text-sm text-muted-foreground">ID: {store.id}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Esta ação é irreversível e todos os dados associados a esta loja
            serão perdidos.
          </p>
        </div>
      </div>
    </DialogSlot>
  );
};

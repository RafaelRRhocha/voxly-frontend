"use client";

import { useState } from "react";

import { DialogSlot } from "@/components/common/DialogSlot";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store } from "@/types/stores";

interface CreateStoreDialogProps {
  trigger: React.ReactNode;
  onCreate: (
    storeData: Omit<Store, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  entityId: number;
}

export const CreateStoreDialog = ({
  trigger,
  onCreate,
  entityId,
}: CreateStoreDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const isFormValid = formData.name.trim();

    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const storeData = {
        name: formData.name.trim(),
        entityId,
      };

      await onCreate(storeData);

      setFormData({
        name: "",
      });
    } catch (error) {
      console.error("Erro ao criar loja:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogSlot
      trigger={trigger}
      title="Criar Nova Loja"
      description="Preencha os dados para criar uma nova loja no sistema."
      confirmButtonText={isSubmitting ? "Criando..." : "Criar Loja"}
      cancelButtonText="Cancelar"
      onConfirm={handleSubmit}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da loja</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome da loja"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <p className="text-sm font-medium">Informações da Conta</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            A loja será criada para a entidade ID: <strong>{entityId}</strong>
          </p>
        </div>
      </div>
    </DialogSlot>
  );
};

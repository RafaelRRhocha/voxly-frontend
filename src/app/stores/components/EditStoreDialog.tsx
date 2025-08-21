"use client";

import { useState } from "react";

import { DialogSlot } from "@/components/common/DialogSlot";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store } from "@/types/stores";

interface EditStoreDialogProps {
  store: Store;
  trigger: React.ReactNode;
  onUpdate: (storeId: number, storeData: Partial<Store>) => Promise<void>;
}

export const EditStoreDialog = ({
  store,
  trigger,
  onUpdate,
}: EditStoreDialogProps) => {
  const [formData, setFormData] = useState({
    name: store.name || "",
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
      const updateData = {
        name: formData.name.trim(),
      };

      await onUpdate(store.id, updateData);

      setFormData({ name: "" });
    } catch (error) {
      console.error("Erro ao atualizar loja:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogSlot
      trigger={trigger}
      title="Editar Loja"
      description="Atualize as informações da loja abaixo"
      confirmButtonText={isSubmitting ? "Salvando..." : "Salvar"}
      onConfirm={handleSubmit}
      onCancel={() => {
        setFormData({
          name: store.name || "",
        });
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-name">Nome da loja</Label>
          <Input
            id="edit-name"
            type="text"
            placeholder="Digite o nome da loja"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </DialogSlot>
  );
};

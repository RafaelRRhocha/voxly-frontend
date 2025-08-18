"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { DialogSlot } from "@/components/common/DialogSlot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";

interface EditUserDialogProps {
  user: User;
  trigger: React.ReactNode;
  onUpdate: (userId: number, userData: Partial<User>) => Promise<void>;
}

export const EditUserDialog = ({
  user,
  trigger,
  onUpdate,
}: EditUserDialogProps) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      if (formData.password.trim()) {
        updateData.password = formData.password;
      }

      await onUpdate(user.id, updateData);

      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogSlot
      trigger={trigger}
      title="Editar Usuário"
      description="Atualize as informações do usuário abaixo"
      confirmButtonText={isSubmitting ? "Salvando..." : "Salvar"}
      onConfirm={handleSubmit}
      onCancel={() => {
        setFormData({
          name: user.name || "",
          email: user.email || "",
          password: "",
        });
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-name">Nome</Label>
          <Input
            id="edit-name"
            type="text"
            placeholder="Digite o nome do usuário"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-email">Email</Label>
          <Input
            id="edit-email"
            type="email"
            placeholder="Digite o email do usuário"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-password">Nova Senha (opcional)</Label>
          <div className="relative">
            <Input
              id="edit-password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite a nova senha ou deixe em branco"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              disabled={isSubmitting}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Deixe em branco para manter a senha atual
          </p>
        </div>
      </div>
    </DialogSlot>
  );
};

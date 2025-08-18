"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { DialogSlot } from "@/components/common/DialogSlot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EUserRole } from "@/enums/user";
import { User } from "@/types";

interface CreateUserDialogProps {
  trigger: React.ReactNode;
  onCreate: (
    userData: Omit<User, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  entityId: number;
  entityName: string;
}

export const CreateUserDialog = ({
  trigger,
  onCreate,
  entityId,
  entityName,
}: CreateUserDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: EUserRole.SELLER,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | EUserRole) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const isFormValid = formData.name && formData.email && formData.password;

    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        entityId,
        entityName,
        password_hash: "",
      };

      await onCreate(userData);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: EUserRole.SELLER,
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogSlot
      trigger={trigger}
      title="Criar Novo Usuário"
      description="Preencha os dados para criar um novo usuário no sistema."
      confirmButtonText={isSubmitting ? "Criando..." : "Criar Usuário"}
      cancelButtonText="Cancelar"
      onConfirm={handleSubmit}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome completo"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite o email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite a senha"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Função</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                handleInputChange("role", value as EUserRole)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EUserRole.SELLER}>Vendedor</SelectItem>
                <SelectItem value={EUserRole.MANAGER}>Gerente</SelectItem>
                <SelectItem value={EUserRole.ADMIN}>Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <p className="text-sm font-medium">Informações da Conta</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            O usuário será criado na conta: <strong>{entityName}</strong>
          </p>
        </div>
      </div>
    </DialogSlot>
  );
};

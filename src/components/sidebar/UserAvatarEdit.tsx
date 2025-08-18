"use client";

import { PencilIcon } from "lucide-react";

import { EditUserDialog } from "@/app/users/components/EditUserDialog";
import { useAuth } from "@/hooks";
import { User } from "@/types";

import { Avatar, AvatarFallback } from "../ui/avatar";

export const UserAvatarEdit = () => {
  const { user, updateProfile } = useAuth();

  if (!user) {
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleProfileUpdate = async (
    userId: number,
    userData: Partial<User>,
  ) => {
    try {
      const updateData = {
        name: userData.name,
        email: userData.email,
      };

      await updateProfile(updateData);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 mb-4">
      <div className="relative">
        <EditUserDialog
          user={user}
          onUpdate={handleProfileUpdate}
          trigger={
            <div className="relative cursor-pointer group">
              <Avatar className="h-8 w-8 transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/50">
                <AvatarFallback className="text-xs transition-all duration-200 group-hover:bg-primary/10">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {/* Overlay com ícone de editar */}
              <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                <PencilIcon className="h-3 w-3 text-white" />
              </div>
            </div>
          }
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{user.name}</div>
        <div className="text-xs text-muted-foreground truncate">
          {user.email}
        </div>
      </div>
    </div>
  );
};

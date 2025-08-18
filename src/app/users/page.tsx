"use client";

import { Plus } from "lucide-react";

import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import { useAuth, useUsers } from "@/hooks";

import { CreateUserDialog } from "./components/CreateUserDialog";
import { UsersTable } from "./components/UsersTable";

const UsersPage = () => {
  const { user } = useAuth();
  const { users, isLoadingUsers, createUser } = useUsers();

  return (
    <section className="space-y-6">
      <PageTitle
        title="Usuários"
        subtitle="Gerencie os usuários da sua conta"
        slot={
          <CreateUserDialog
            trigger={
              <Button>
                <Plus />
                Novo usuário
              </Button>
            }
            onCreate={createUser}
            entityId={user?.entityId || 0}
            entityName={user?.entityName || ""}
          />
        }
      />

      <UsersTable users={users} isLoading={isLoadingUsers} />
    </section>
  );
};

export default UsersPage;

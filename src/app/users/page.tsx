"use client";

import { useMemo } from "react";
import { Plus } from "lucide-react";

import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import { useAuth, useUsers } from "@/hooks";

import { CreateUserDialog } from "./components/CreateUserDialog";
import { UsersTable } from "./components/UsersTable";

const UsersPage = () => {
  const { user } = useAuth();
  const { users, isLoadingUsers, createUser, updateUser, deleteUser } =
    useUsers();

  const memoizedSlot = useMemo(
    () => (
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
    ),
    [createUser, user?.entityId, user?.entityName],
  );

  return (
    <section className="space-y-6">
      <PageTitle
        title="Usuários"
        subtitle="Gerencie os usuários da sua conta"
        slot={memoizedSlot}
      />

      <UsersTable
        users={users}
        isLoading={isLoadingUsers}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
      />
    </section>
  );
};

export default UsersPage;

"use client";

import PageTitle from "@/components/common/PageTitle";
import { useUsers } from "@/hooks";

import { UsersTable } from "./components/UsersTable";

const UsersPage = () => {
  const { users, isLoadingUsers } = useUsers();

  return (
    <section className="space-y-6">
      <PageTitle
        title="Usuários"
        subtitle="Gerencie os usuários da sua conta"
      />

      <UsersTable users={users} isLoading={isLoadingUsers} />
    </section>
  );
};

export default UsersPage;

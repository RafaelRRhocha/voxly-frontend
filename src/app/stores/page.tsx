"use client";

import { useMemo } from "react";
import { Plus } from "lucide-react";

import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { useStores } from "@/hooks/useStores";

import { CreateStoreDialog } from "./components/CreateStoreDialog";
import { StoresTable } from "./components/StoresTable";

const StoresPage = () => {
  const { user } = useAuth();
  const { stores, isLoadingStores, createStore, updateStore, deleteStore } =
    useStores();

  const memoizedSlot = useMemo(
    () => (
      <CreateStoreDialog
        trigger={
          <Button>
            <Plus />
            Nova loja
          </Button>
        }
        onCreate={createStore}
        entityId={user?.entityId || 0}
      />
    ),
    [createStore, user?.entityId],
  );

  return (
    <section className="space-y-6">
      <PageTitle
        title="Lojas"
        subtitle="Gerencie as lojas da sua conta"
        slot={memoizedSlot}
      />

      <StoresTable
        stores={stores}
        isLoading={isLoadingStores}
        onUpdateStore={updateStore}
        onDeleteStore={deleteStore}
      />
    </section>
  );
};

export default StoresPage;

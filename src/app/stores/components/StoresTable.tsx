import {
  CalendarIcon,
  EyeIcon,
  HashIcon,
  PencilIcon,
  StoreIcon,
  TrashIcon,
} from "lucide-react";

import { DialogSlot } from "@/components/common/DialogSlot";
import { TableLoading } from "@/components/common/TableLoading";
import { TooltipSlot } from "@/components/common/TooltipSlot";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Store } from "@/types/stores";

import { DeleteStoreDialog } from "./DeleteStoreDialog";
import { EditStoreDialog } from "./EditStoreDialog";

interface StoresTableProps {
  stores: Array<Store>;
  isLoading?: boolean;
  onUpdateStore: (storeId: number, storeData: Partial<Store>) => Promise<void>;
  onDeleteStore: (storeId: number) => Promise<void>;
}

const StoreDetailsCard = ({ store }: { store: Store }) => {
  const storeFields = [
    {
      label: "ID",
      value: store.id?.toString() || "N/A",
      icon: HashIcon,
      isEmpty: !store.id,
    },
    {
      label: "Nome",
      value: store.name || "N/A",
      icon: StoreIcon,
      isEmpty: !store.name,
    },
    {
      label: "Entity ID",
      value: store.entityId?.toString() || "N/A",
      icon: HashIcon,
      isEmpty: !store.entityId,
    },
    {
      label: "Criado em",
      value: store.created_at ? formatDate(store.created_at) : "N/A",
      icon: CalendarIcon,
      isEmpty: !store.created_at,
    },
    {
      label: "Atualizado em",
      value: store.updated_at ? formatDate(store.updated_at) : "N/A",
      icon: CalendarIcon,
      isEmpty: !store.updated_at,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <StoreIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{store.name || "Loja"}</h3>
          <p className="text-sm text-muted-foreground">ID: {store.id}</p>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="grid grid-cols-2 gap-4">
        {storeFields.map((field, index) => (
          <Card
            key={index}
            className={`transition-colors ${
              field.isEmpty
                ? "bg-muted/30 border-dashed"
                : "bg-background hover:bg-muted/50"
            }`}
          >
            <CardContent className="flex items-center space-x-3 p-3">
              <field.icon
                className={`h-4 w-4 ${
                  field.isEmpty ? "text-muted-foreground/50" : "text-primary"
                }`}
              />
              <div className="flex-1 space-y-1">
                <p className="text-xs font-medium leading-none">
                  {field.label}
                </p>
                <p
                  className={`text-sm ${
                    field.isEmpty
                      ? "text-muted-foreground italic"
                      : "text-muted-foreground"
                  }`}
                >
                  {field.value}
                </p>
              </div>
              {field.isEmpty && (
                <div className="text-xs text-muted-foreground/50 bg-muted/50 px-1.5 py-0.5 rounded">
                  Vazio
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const StoresTable = ({
  stores,
  isLoading,
  onUpdateStore,
  onDeleteStore,
}: StoresTableProps) => {
  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">Criado em</TableHead>
            <TableHead className="font-semibold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{store.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(store.created_at)}
              </TableCell>
              <TableCell className="flex items-center gap-x-2">
                <TooltipSlot
                  trigger={
                    <DialogSlot
                      trigger={
                        <Button variant="outline" size="icon">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      }
                      title="Detalhes da Loja"
                      showCancelButton={false}
                      showConfirmButton={false}
                    >
                      <StoreDetailsCard store={store} />
                    </DialogSlot>
                  }
                  content="Ver Detalhes"
                />

                <TooltipSlot
                  trigger={
                    <EditStoreDialog
                      store={store}
                      onUpdate={onUpdateStore}
                      trigger={
                        <Button variant="outline" size="icon">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      }
                    />
                  }
                  content="Editar"
                />

                <TooltipSlot
                  trigger={
                    <DeleteStoreDialog
                      store={store}
                      onDelete={onDeleteStore}
                      trigger={
                        <Button variant="outline" size="icon">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      }
                    />
                  }
                  content="Excluir"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

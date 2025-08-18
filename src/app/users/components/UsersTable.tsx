import {
  CalendarIcon,
  EyeIcon,
  HashIcon,
  MailIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";

import { DialogSlot } from "@/components/common/DialogSlot";
import { RoleBadge } from "@/components/common/RoleBadge";
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
import { useUsers } from "@/hooks";
import { formatDate } from "@/lib/utils";
import { User } from "@/types";

import { DeleteUserDialog } from "./DeleteUserDialog";
import { EditUserDialog } from "./EditUserDialog";

interface UsersTableProps {
  users: Array<User>;
  isLoading?: boolean;
}

const UserDetailsCard = ({ user }: { user: User }) => {
  const userFields = [
    {
      label: "ID",
      value: user.id?.toString() || "N/A",
      icon: HashIcon,
      isEmpty: !user.id,
    },
    {
      label: "Nome",
      value: user.name || "N/A",
      icon: UserIcon,
      isEmpty: !user.name,
    },
    {
      label: "Email",
      value: user.email || "N/A",
      icon: MailIcon,
      isEmpty: !user.email,
    },
    {
      label: "Entity Name",
      value: user.entityName || "N/A",
      icon: HashIcon,
      isEmpty: !user.entityName,
    },
    {
      label: "Criado em",
      value: user.created_at ? formatDate(user.created_at) : "N/A",
      icon: CalendarIcon,
      isEmpty: !user.created_at,
    },
    {
      label: "Atualizado em",
      value: user.updated_at ? formatDate(user.updated_at) : "N/A",
      icon: CalendarIcon,
      isEmpty: !user.updated_at,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <UserIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{user.name || "Usuário"}</h3>
          <RoleBadge role={user.role} />
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="grid grid-cols-2 gap-4">
        {userFields.map((field, index) => (
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

export const UsersTable = ({ users, isLoading }: UsersTableProps) => {
  const { updateUser, deleteUser } = useUsers();

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Criado em</TableHead>
            <TableHead className="font-semibold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {user.email}
              </TableCell>
              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(user.created_at)}
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
                      title="Detalhes do Usuário"
                      showCancelButton={false}
                      showConfirmButton={false}
                    >
                      <UserDetailsCard user={user} />
                    </DialogSlot>
                  }
                  content="Ver Detalhes"
                  asChild={true}
                />

                <TooltipSlot
                  trigger={
                    <EditUserDialog
                      user={user}
                      onUpdate={updateUser}
                      trigger={
                        <Button variant="outline" size="icon">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      }
                    />
                  }
                  content="Editar"
                  asChild={true}
                />

                <TooltipSlot
                  trigger={
                    <DeleteUserDialog
                      user={user}
                      onDelete={deleteUser}
                      trigger={
                        <Button variant="outline" size="icon">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      }
                    />
                  }
                  content="Excluir"
                  asChild={true}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

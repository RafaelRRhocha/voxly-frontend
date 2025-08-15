import { Badge } from "@/components/ui/badge";
import { EUserRole } from "@/enums/user";

interface RoleBadgeProps {
  role: EUserRole;
}

const roleConfig = {
  [EUserRole.ADMIN]: {
    label: "Administrador",
    variant: "destructive" as const,
  },
  [EUserRole.MANAGER]: {
    label: "Gerente",
    variant: "default" as const,
  },
  [EUserRole.SELLER]: {
    label: "Vendedor",
    variant: "secondary" as const,
  },
};

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const config = roleConfig[role];

  return (
    <Badge variant={config.variant} className="font-medium">
      {config.label}
    </Badge>
  );
};

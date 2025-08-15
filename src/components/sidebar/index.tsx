"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  Home,
  LogOut,
  ShieldUser,
  Store,
  Users,
  Vote,
  X,
} from "lucide-react";

import { EUserRole } from "@/enums/user";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores";

import { TooltipSlot } from "../common/TooltipSlot";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

interface NavigationLink {
  icon: React.ElementType;
  label: string;
  href: string;
  hide?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logoutAndRedirect } = useAuth();
  const { isOpen, isCollapsed, close, expand } = useSidebarStore();

  const navigationLinks: Array<NavigationLink> = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Vote,
      label: "Enquetes",
      href: "/surveys",
    },
    {
      icon: Store,
      label: "Lojas",
      href: "/stores",
    },
    {
      icon: Users,
      label: "Vendedores",
      href: "/sellers",
    },
    {
      icon: ShieldUser,
      label: "Usuários",
      href: "/users",
      hide: user?.role !== EUserRole.ADMIN,
    },
  ];

  const isLinkActive = (href: string) => pathname === href;

  const handleNavigation = (href: string) => {
    router.push(href);
    // if (isOpen) {
    //   close();
    // }
  };

  if (!user) {
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await logoutAndRedirect("/login");
  };

  if (isCollapsed && !isOpen) {
    return (
      <aside className="inset-y-0 left-0 z-50 w-16 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <TooltipSlot
            trigger={
              <Button
                variant="ghost"
                size="icon"
                onClick={expand}
                className="w-8 h-8"
              >
                <ChevronRight className="size-4" />
              </Button>
            }
            content="Expandir sidebar"
            side="right"
          />
        </div>

        <nav className="flex flex-col gap-2 p-4 flex-1">
          {navigationLinks
            .filter((link) => !link.hide)
            .map((link) => (
              <TooltipSlot
                key={link.label}
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigation(link.href)}
                    className={cn(
                      "w-8 h-8",
                      isLinkActive(link.href)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    <link.icon className="size-4" />
                  </Button>
                }
                content={link.label}
                side="right"
              />
            ))}
        </nav>
        <div className="p-4 border-t">
          <TooltipSlot
            trigger={
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="w-8 h-8"
              >
                <LogOut className="size-4" />
              </Button>
            }
            content="Sair"
            side="right"
          />
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "w-64 border-r bg-background flex flex-col transition-all duration-300 ease-in-out",
        "md:relative md:translate-x-0",
        "fixed inset-y-0 left-0 z-50 transform",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className="flex size-8 bg-primary rounded-full items-center justify-center text-primary-foreground">
              <Image
                src="/voxly_logo_branca.png"
                alt="Voxly"
                width={24}
                height={24}
              />
            </div>
            <span className="font-semibold text-lg">Voxly</span>
          </div>
          <Button variant="ghost" size="icon" onClick={close}>
            <X className="size-4" />
          </Button>
        </div>

        <nav className="flex-1 flex flex-col gap-2 p-6">
          {navigationLinks
            .filter((link) => !link.hide)
            .map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                onClick={() => handleNavigation(link.href)}
                className={cn(
                  "justify-start gap-3 px-3 py-2 h-auto text-sm font-medium",
                  isLinkActive(link.href)
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Button>
            ))}
        </nav>

        <div className="border-t p-6">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {user.email}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-4" />
            Sair
          </Button>
        </div>
      </div>
    </aside>
  );
}

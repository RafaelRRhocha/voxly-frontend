import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, Package, Settings2, ShoppingBag, Users2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function Sidebar() {
  const navigationLinks = [
    {
      icon: Home,
      label: 'Início',
      href: '/home'
    },
    {
      icon: ShoppingBag,
      label: 'Pedidos',
      href: '/shopping'
    },
    {
      icon: Users2,
      label: 'Clientes',
      href: '/users'
    },
    {
      icon: Settings2,
      label: 'Configurações',
      href: '/settings'
    },
  ]

  return (
    <div className="flex w-full flex-col bg-muted/40">
      {/* desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-14 border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">

          <TooltipProvider>
            <Link href="/" className="flex size-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2" prefetch={false}>
              <Package className="size-5 transition-all" />
              <span className="sr-only">Logo do Projeto</span>
            </Link>


            {navigationLinks.map((navigationLink) => (
              <Tooltip key={navigationLink.label}>
                <TooltipTrigger asChild>
                  <Link href={navigationLink.href} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                    <navigationLink.icon className="size-5 transition-all" />
                    <span className="sr-only">{navigationLink.label}</span>
                  </Link>

                </TooltipTrigger>
                <TooltipContent side="right">{navigationLink.label}</TooltipContent>
              </Tooltip>
            ))}

          </TooltipProvider>
        </nav>
      </aside>

      {/* mobile */}
      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Abrir ou fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-x">
              <SheetTitle className="sr-only">
                Menu de navegação
              </SheetTitle>

              <nav className="grid gap-6 text-lg font-medium p-2.5">
                <Link href="/" className="flex size-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2" prefetch={false}>
                  <Package className="size-5 transition-all" />
                  <span className="sr-only">Logo do Projeto</span>
                </Link>

                {navigationLinks.map((navigationLink) => (
                  <Link key={navigationLink.label} href={navigationLink.href} className="flex items-center gap-4 text-muted-foreground hover:text-foreground" prefetch={false}>
                    <navigationLink.icon className="size-5 transition-all" />
                    <span>{navigationLink.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  )
}

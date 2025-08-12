import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileQuestion className="size-5 text-muted-foreground" />
            <CardTitle className="text-xl">Página não encontrada</CardTitle>
          </div>
          <CardDescription>
            A página que você está procurando não existe ou foi removida.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <div className="text-8xl font-bold text-muted">404</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/dashboard">
              <Home className="mr-2 size-4" />
              Voltar para a página inicial
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

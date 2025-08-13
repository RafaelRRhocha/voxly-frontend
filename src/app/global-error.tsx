"use client";

import { useRouter } from "next/router";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const router = useRouter();

  return (
    <html lang="pt-BR">
      <body className="bg-background">
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-destructive" />
                <CardTitle className="text-xl">Erro crítico</CardTitle>
              </div>
              <CardDescription>
                Ocorreu um erro grave na aplicação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                {error.message || "Erro desconhecido"}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="flex-1"
              >
                <Home className="mr-2 size-4" />
                Página Inicial
              </Button>
              <Button onClick={() => reset()} className="flex-1">
                <RotateCcw className="mr-2 size-4" />
                Tentar Novamente
              </Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
}

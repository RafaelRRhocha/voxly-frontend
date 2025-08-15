import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function isFirefox() {
  return (
    typeof navigator !== "undefined" &&
    navigator.userAgent.toLowerCase().includes("firefox")
  );
}

export function formatDateDistanceToNow(dateString: string) {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR,
    });
  } catch {
    return "Data inválida";
  }
}

export function formatCurrency(
  value?: number,
  currency: string = "BRL",
  numberOnly: boolean = false,
  decimals: number = 2,
): string {
  if (value) {
    const v = (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      currencyDisplay: numberOnly ? "code" : undefined,
    });
    if (numberOnly) {
      return v.replace(/[a-z]{3}/i, "").trim();
    }
    return v;
  }

  return "R$ 0,00";
}

export function formatDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export function formatSimpleDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}

export function formatNumber(
  value?: number,
  forceDecimals: boolean = false,
  round: boolean = false,
): string {
  if (value) {
    let v = value;
    if (round) {
      v = Math.round(v);
    }
    return v.toLocaleString("pt-BR", {
      style: "decimal",
      minimumFractionDigits: forceDecimals ? 2 : undefined,
      maximumFractionDigits: forceDecimals ? 2 : undefined,
    });
  }

  return "0";
}

export function formatPercentage(
  value: number | undefined,
  digits?: number,
): string {
  if (value) {
    return value.toLocaleString("pt-BR", {
      style: "percent",
      minimumFractionDigits: digits != null ? digits : undefined,
    });
  }

  return "0%";
}

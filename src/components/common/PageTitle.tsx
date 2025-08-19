import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

import { TooltipSlot } from "./TooltipSlot";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  slot?: ReactNode;
  className?: string;
  canBack?: boolean;
  disableBack?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  slot,
  className,
  canBack = false,
  disableBack = false,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (disableBack) return;
    router.back();
  };

  return (
    <div
      className={cn("flex flex-col pb-4", {
        className,
      })}
    >
      <div className="flex w-full items-center justify-between">
        <div className="items-left flex w-full flex-col">
          <div className="flex items-center space-x-3">
            {canBack && (
              <TooltipSlot
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    disabled={disableBack}
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                }
                content="Voltar"
              />
            )}

            <span className="text-xl font-bold text-gray-800 lg:text-3xl">
              {title}
            </span>
          </div>

          {subtitle && (
            <span
              className={cn("hidden md:block text-sm text-gray-500", {
                "ml-11": canBack,
              })}
            >
              {subtitle}
            </span>
          )}
        </div>

        {slot && <>{slot}</>}
      </div>
    </div>
  );
};

export default PageTitle;

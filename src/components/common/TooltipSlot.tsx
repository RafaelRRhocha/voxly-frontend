import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipSlotProps {
  trigger: React.ReactNode;
  content: string;
  asChild?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  sideOffset?: number;
}

export function TooltipSlot({
  trigger,
  content,
  asChild = true,
  side = "top",
  className,
  sideOffset = 4,
}: TooltipSlotProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{trigger}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={sideOffset} className={className}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

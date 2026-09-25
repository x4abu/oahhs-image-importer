import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-xl bg-paper/85 px-3.5 text-sm text-ink outline-none",
        "ring-1 ring-dusty/40 placeholder:text-ink-mute",
        "focus:ring-2 focus:ring-primary/35",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full resize-none rounded-xl bg-paper/85 px-3.5 py-3 text-sm leading-relaxed text-ink outline-none",
        "ring-1 ring-dusty/40 placeholder:text-ink-mute",
        "focus:ring-2 focus:ring-primary/35",
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea };

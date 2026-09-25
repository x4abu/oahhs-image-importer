import type { ReactNode } from "react";
import { Battery, ChevronLeft, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { STEP_LABELS, STEP_ORDER, useTikyaa, type Step } from "@/lib/tikyaa/store";

const MASCOTS = {
  welcome: "/mascots/welcome.jpg",
  sitting: "/mascots/sitting.jpg",
  waiting: "/mascots/waiting.jpg",
  happy: "/mascots/happy.jpg",
  scroll: "/mascots/scroll.jpg",
  writing: "/mascots/writing.jpg",
  clapping: "/mascots/clapping.jpg",
  pen: "/mascots/pen.jpg",
  proud: "/mascots/proud.jpg",
  celebrate: "/mascots/celebrate.jpg",
} as const;

export type MascotPose = keyof typeof MASCOTS;

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-stage sm:p-4 lg:p-6">
      <div className="flex w-full max-w-[430px] flex-col sm:max-w-[480px] lg:max-w-[520px]">
        <div className="relative flex h-dvh min-h-0 flex-col overflow-hidden sm:h-[min(900px,calc(100dvh-32px))] sm:rounded-[40px] sm:shadow-[var(--shadow-phone)] lg:h-[min(900px,calc(100dvh-48px))]">
          <div className="tikyaa-scene absolute inset-0" />
          <Clouds />
          <div className="relative z-10 flex h-full min-h-0 flex-col">
            <StatusBar />
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
            <HomeIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="safe-top flex shrink-0 items-center justify-between px-6 pt-3 pb-1 text-ink">
      <span className="text-xs font-semibold tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="size-3.5" strokeWidth={2.4} />
        <Wifi className="size-3.5" strokeWidth={2.4} />
        <Battery className="size-4" strokeWidth={2.2} />
      </div>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="safe-bottom flex shrink-0 justify-center pb-2 pt-1">
      <span className="h-1.5 w-28 rounded-full bg-ink/20" />
    </div>
  );
}

function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <span className="cloud top-16 -left-6 h-10 w-28" />
      <span className="cloud top-28 right-[-18px] h-8 w-24" style={{ animationDelay: "-8s" }} />
      <span className="cloud top-[46%] left-[-22px] h-9 w-32 opacity-50" style={{ animationDelay: "-14s" }} />
      <span className="cloud bottom-24 right-[-10px] h-7 w-20 opacity-45" style={{ animationDelay: "-4s" }} />
    </div>
  );
}

export function GeometricCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn("text-dusty/45", className)} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <polygon points="40,6 48,28 72,28 53,42 60,64 40,50 20,64 27,42 8,28 32,28" />
        <rect x="22" y="22" width="36" height="36" transform="rotate(45 40 40)" />
        <circle cx="40" cy="40" r="9" />
      </g>
    </svg>
  );
}

export function CrescentMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("text-primary", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M28.5 8.2c-7.8 1.4-13.6 8.2-13.6 16.3 0 9.1 7.4 16.5 16.5 16.5 3.4 0 6.5-1 9.1-2.8C36.6 42.4 30.6 45 24 45 12.4 45 3 35.6 3 24S12.4 3 24 3c2.4 0 4.7.4 6.8 1.1-1 .9-1.8 2-2.3 4.1Z"
      />
      <path
        fill="currentColor"
        d="M36.2 14.2c0 2.2-1.5 3.6-2.8 4.8-.4.4-.8.4-1.1 0-1.3-1.2-2.8-2.6-2.8-4.8 0-2.4 1.9-4.2 4.2-4.2s2.5 1.8 2.5 4.2Z"
      />
    </svg>
  );
}

export function Mascot({
  pose,
  className,
  size = "md",
  caption,
}: {
  pose: MascotPose;
  className?: string;
  size?: "sm" | "md" | "lg";
  caption?: string;
}) {
  const dim =
    size === "lg" ? "h-48 w-56" : size === "sm" ? "h-24 w-28" : "h-36 w-44";
  return (
    <figure className={cn("flex flex-col items-center", className)}>
      <img
        src={MASCOTS[pose]}
        alt=""
        crossOrigin="anonymous"
        className={cn("mascot-cut float-soft object-contain object-center", dim)}
      />
      {caption ? (
        <figcaption className="mt-0.5 max-w-[16rem] text-center text-xs font-medium text-ink-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function GlassCard({
  className,
  children,
  strong = false,
}: {
  className?: string;
  children: ReactNode;
  strong?: boolean;
}) {
  return (
    <div className={cn(strong ? "glass-strong" : "glass", "rounded-3xl p-4", className)}>
      {children}
    </div>
  );
}

export function FlowHeader({
  step,
  hideBack = false,
}: {
  step: Step;
  hideBack?: boolean;
}) {
  const back = useTikyaa((s) => s.back);
  const idx = Math.max(0, STEP_ORDER.indexOf(step) - 1);
  const total = STEP_ORDER.length - 2;
  return (
    <header className="sticky top-0 z-20 -mx-5 mb-2 bg-blush/80 px-5 pb-3 pt-1 backdrop-blur-md">
      <div className="mb-3 flex items-center gap-2">
        {hideBack ? (
          <span className="size-11" />
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/40 ring-1 ring-white/70"
            onClick={back}
            aria-label="Go back"
          >
            <ChevronLeft className="size-5" />
          </Button>
        )}
        <div className="min-w-0 flex-1 text-center">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-ink-mute uppercase">
            Tikyaa
          </p>
          <p className="truncate font-display text-lg font-semibold leading-tight text-ink">
            {STEP_LABELS[step]}
          </p>
        </div>
        <span className="size-11" />
      </div>
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full",
              i <= idx ? "bg-primary" : "bg-dusty/35",
            )}
          />
        ))}
      </div>
    </header>
  );
}

export function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("mx-auto flex min-h-full w-full max-w-[520px] flex-col px-5 pb-5 sm:px-6", className)}>{children}</div>
  );
}

export function PrimaryCta({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: (() => void) | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}) {
  return (
    <Button
      size="pill"
      disabled={disabled}
      onClick={onClick}
      className={cn("mt-4 h-12 w-full text-[15px] font-semibold tracking-wide", className)}
    >
      {children}
    </Button>
  );
}

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-center text-[11px] leading-relaxed text-ink-mute">
        Private fun keepsake only · Not a real Nikah
      </p>
    );
  }
  return (
    <p className="text-center text-[11px] leading-relaxed text-ink-soft">
      This is a private digital keepsake only.
      <br />
      It has no legal or religious validity.
      <br />
      Not an official Nikah certificate.
    </p>
  );
}

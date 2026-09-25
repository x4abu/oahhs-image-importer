import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  onChange: (dataUrl: string | null) => void;
  className?: string;
  label: string;
};

export function SignaturePad({ onChange, className, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#5c3342";
      ctx.lineWidth = 2.2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    return () => ro.disconnect();
  }, []);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    drawing.current = true;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setEmpty(false);
    onChange(canvas.toDataURL("image/png"));
  }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setEmpty(true);
    onChange(null);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="relative h-36 overflow-hidden rounded-2xl bg-paper ring-1 ring-dusty/35 sm:h-44">
        <span className="pointer-events-none absolute left-4 top-3 text-[11px] font-semibold tracking-wide text-ink-mute uppercase">
          {label}
        </span>
        <span className="pointer-events-none absolute inset-x-8 bottom-8 h-px bg-dusty/50" />
        {empty ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-12 text-center text-xs text-ink-mute">
            Sign here
          </span>
        ) : null}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          aria-label={label}
        />
      </div>
      <button
        type="button"
        onClick={clear}
        className="self-end text-xs font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline"
      >
        Clear / Redraw
      </button>
    </div>
  );
}

export function AairaSignature({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 220 90" className="h-24 w-full text-ink" aria-hidden>
      <path
        d="M18 58 C 28 18, 52 16, 62 44 C 68 62, 48 70, 42 52 C 58 22, 96 20, 118 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        pathLength={1}
        style={
          animate
            ? {
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: "dash-draw 1.4s ease forwards",
              }
            : undefined
        }
      />
      <path
        d="M78 36 C 92 64, 124 68, 148 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        pathLength={1}
        style={
          animate
            ? {
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: "dash-draw 1.1s ease 0.35s forwards",
              }
            : undefined
        }
      />
      <path
        d="M150 50 C 164 28, 188 30, 206 52 M168 24 v36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        pathLength={1}
        style={
          animate
            ? {
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: "dash-draw 0.9s ease 0.7s forwards",
              }
            : undefined
        }
      />
    </svg>
  );
}

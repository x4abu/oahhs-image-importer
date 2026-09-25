import { useEffect, useState } from "react";
import { Check, Download, Maximize2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { BRIDE, GROOM } from "@/lib/tikyaa/data";
import { useTikyaa } from "@/lib/tikyaa/store";
import { cn } from "@/lib/utils";
import {
  Disclaimer,
  FlowHeader,
  GlassCard,
  Mascot,
  PrimaryCta,
  Screen,
} from "./chrome";
import { KeepsakeCard } from "./keepsake-card";
import { AairaSignature, SignaturePad } from "./signature-pad";

export function AcceptScreen() {
  const s = useTikyaa();

  useEffect(() => {
    if (!s.zayanAccepted || s.aairaAccepted) return;
    const t = window.setTimeout(() => s.acceptAsAaira(), 1600);
    return () => window.clearTimeout(t);
  }, [s.zayanAccepted, s.aairaAccepted, s.acceptAsAaira]);

  const both = s.zayanAccepted && s.aairaAccepted;

  return (
    <Screen>
      <FlowHeader step="accept" />
      <Mascot
        pose={both ? "clapping" : "happy"}
        size="md"
        caption={both ? "Hearts in both hands" : "A quiet yes, when you are ready"}
      />
      <p className="mb-3 text-center font-display text-2xl font-semibold text-ink">
        I Accept / Qubool
      </p>
      <p className="mb-3 text-center text-sm text-ink-soft">
        A symbolic yes for this keepsake only — not a legal or religious contract.
      </p>
      <AcceptCard
        name={GROOM}
        accepted={s.zayanAccepted}
        onAccept={s.acceptAsZayan}
        you
      />
      <AcceptCard
        name={BRIDE}
        accepted={s.aairaAccepted}
        waiting={s.zayanAccepted && !s.aairaAccepted}
        className="mt-2.5"
      />
      <PrimaryCta onClick={s.next} disabled={!both}>
        Continue to signatures
      </PrimaryCta>
    </Screen>
  );
}

function AcceptCard({
  name,
  accepted,
  onAccept,
  you,
  waiting,
  className,
}: {
  name: string;
  accepted: boolean;
  onAccept?: () => void;
  you?: boolean;
  waiting?: boolean;
  className?: string;
}) {
  return (
    <GlassCard
      className={cn(
        "rounded-3xl transition-transform duration-300",
        accepted && "ring-2 ring-sage/40",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-xl font-semibold text-ink">{name}</p>
          <p className="text-xs text-ink-mute">{you ? "Signing as you" : "Your partner"}</p>
        </div>
        {accepted ? (
          <span className="fade-up flex items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1.5 text-xs font-semibold text-sage">
            <Check className="size-3.5" strokeWidth={3} /> Qubool
          </span>
        ) : waiting ? (
          <span className="text-xs font-medium text-ink-mute">Waiting…</span>
        ) : onAccept ? (
          <Button size="sm" className="rounded-full px-4" onClick={onAccept}>
            I Accept
          </Button>
        ) : (
          <span className="text-xs font-medium text-ink-mute">Waiting for Zayan</span>
        )}
      </div>
    </GlassCard>
  );
}

export function SignatureScreen() {
  const s = useTikyaa();
  const [drawing, setDrawing] = useState<string | null>(s.zayanSignature);
  const zayanDone = Boolean(s.zayanSignedAt);

  useEffect(() => {
    if (!zayanDone || s.aairaSigned) return;
    const t = window.setTimeout(() => s.confirmAairaSignature(), 1800);
    return () => window.clearTimeout(t);
  }, [zayanDone, s.aairaSigned, s.confirmAairaSignature]);

  function confirm() {
    if (!drawing) {
      toast.error("Please sign first");
      return;
    }
    s.setZayanSignature(drawing);
    s.confirmZayanSignature();
    toast.success("Zayan has signed");
  }

  const both = zayanDone && s.aairaSigned;

  return (
    <Screen>
      <FlowHeader step="signature" />
      <Mascot pose="pen" size="md" caption="A tiny pen, a lasting mark" />
      <div className="mb-3 space-y-1.5 text-sm">
        <StatusLine ok={zayanDone} waitLabel="Waiting for Zayan" okLabel={`${GROOM} has signed ✓`} />
        <StatusLine ok={s.aairaSigned} waitLabel={`Waiting for ${BRIDE}`} okLabel={`${BRIDE} has signed ✓`} />
      </div>
      {!zayanDone ? (
        <>
          <SignaturePad label="Zayan Malik" onChange={setDrawing} />
          <div className="mt-2 flex gap-2">
            <PrimaryCta className="mt-0" onClick={confirm} disabled={!drawing}>
              Confirm signature
            </PrimaryCta>
          </div>
        </>
      ) : (
        <GlassCard className="mt-1">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-ink-mute uppercase">
            {BRIDE}
          </p>
          {s.aairaSigned ? (
            <div className="fade-up">
              <AairaSignature animate />
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-ink-mute">Aaira is signing…</p>
          )}
        </GlassCard>
      )}
      <PrimaryCta onClick={s.next} disabled={!both} className={zayanDone ? undefined : "hidden"}>
        View our keepsake
      </PrimaryCta>
    </Screen>
  );
}

function StatusLine({
  ok,
  waitLabel,
  okLabel,
}: {
  ok: boolean;
  waitLabel: string;
  okLabel: string;
}) {
  return (
    <p className={cn("rounded-full px-3 py-1.5 text-center text-xs font-semibold", ok ? "bg-sage-soft text-sage" : "bg-white/50 text-ink-mute")}>
      {ok ? okLabel : waitLabel}
    </p>
  );
}

export function KeepsakeScreen() {
  const next = useTikyaa((s) => s.next);
  const [full, setFull] = useState(false);

  return (
    <Screen>
      <FlowHeader step="keepsake" />
      <KeepsakeCard />
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button variant="secondary" className="rounded-full" onClick={() => void saveCard()}>
          <Download className="size-4" /> Save
        </Button>
        <Button variant="secondary" className="rounded-full" onClick={() => void shareCard()}>
          <Share2 className="size-4" /> Share
        </Button>
        <Button variant="secondary" className="rounded-full" onClick={() => setFull(true)}>
          <Maximize2 className="size-4" /> View
        </Button>
      </div>
      <PrimaryCta onClick={next}>Finish</PrimaryCta>
      {full ? <FullSizeOverlay onClose={() => setFull(false)} /> : null}
    </Screen>
  );
}

function FullSizeOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 p-3 backdrop-blur-sm">
      <div className="mx-auto max-w-[390px]">
        <KeepsakeCard />
        <Button className="mt-3 w-full rounded-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

async function cardNode() {
  return document.getElementById("keepsake-card") as HTMLElement | null;
}

export async function saveCard() {
  const node = await cardNode();
  if (!node) {
    toast.error("Could not find the card");
    return;
  }
  try {
    const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "tikyaa-keepsake.png";
    a.click();
    toast.success("Keepsake saved");
  } catch {
    toast.error("Saving needs a moment — try again");
  }
}

export async function shareCard() {
  const node = await cardNode();
  const shareData: ShareData = {
    title: "Tikyaa — Our Little Nikah Keepsake",
    text: "A private digital keepsake only. Not a real Nikah.",
    url: window.location.href,
  };
  try {
    if (node && navigator.share) {
      const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "tikyaa-keepsake.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ ...shareData, files: [file] });
        return;
      }
    }
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  } catch {
    toast.message("Share whenever you are ready");
  }
}

export function SuccessScreen() {
  const reset = useTikyaa((s) => s.reset);
  const go = useTikyaa((s) => s.go);
  return (
    <Screen className="relative overflow-hidden">
      <Petals />
      <div className="flex flex-1 flex-col items-center pt-6">
        <Mascot pose="celebrate" size="lg" />
        <h1 className="mt-2 font-display text-[34px] font-semibold leading-tight text-ink">
          Your keepsake is complete
        </h1>
        <p className="mt-2 max-w-[16rem] text-center text-sm leading-relaxed text-ink-soft">
          A private memory for Zayan and Aaira — gentle, ours, and unofficial.
        </p>
        <div className="mt-6 grid w-full grid-cols-2 gap-2">
          <Button variant="secondary" className="rounded-full" onClick={() => void saveCard()}>
            <Download className="size-4" /> Save
          </Button>
          <Button variant="secondary" className="rounded-full" onClick={() => void shareCard()}>
            <Share2 className="size-4" /> Share
          </Button>
        </div>
        <PrimaryCta onClick={() => go("keepsake")}>See the card again</PrimaryCta>
        <Button
          variant="ghost"
          className="mt-2"
          onClick={() => {
            reset();
            go("home");
          }}
        >
          Begin a new keepsake
        </Button>
      </div>
      <Disclaimer compact />
    </Screen>
  );
}

function Petals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${6 + i * 8}%`,
            animationDelay: `${i * 0.45}s`,
            animationDuration: `${6.5 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

import { Check, Heart } from "lucide-react";
import {
  BRIDE,
  GROOM,
  KHUTBAH,
  MAHR_OPTIONS,
  PROMISES,
  formatDisplayDate,
  formatTimestamp,
} from "@/lib/tikyaa/data";
import { useTikyaa } from "@/lib/tikyaa/store";
import { AairaSignature } from "./signature-pad";
import { CrescentMark, GeometricCorner, Mascot } from "./chrome";
import { cn } from "@/lib/utils";

export function KeepsakeCard({
  className,
  compactMascot = false,
}: {
  className?: string;
  compactMascot?: boolean;
}) {
  const s = useTikyaa();
  const mahr = MAHR_OPTIONS.find((m) => m.id === s.mahrId);
  const selected = PROMISES.filter(
    (p) => s.myPromises.includes(p.id) || s.partnerPromises.includes(p.id),
  );
  const both = selected.filter(
    (p) => s.myPromises.includes(p.id) && s.partnerPromises.includes(p.id),
  );

  return (
    <article
      id="keepsake-card"
      className={cn("paper-card relative overflow-hidden rounded-[28px] px-5 py-6", className)}
    >
      <GeometricCorner className="pointer-events-none absolute -left-2 -top-2 h-16 w-16 opacity-70" />
      <GeometricCorner className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 rotate-90 opacity-70" />
      <GeometricCorner className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16 -rotate-90 opacity-70" />
      <GeometricCorner className="pointer-events-none absolute -bottom-2 -right-2 h-16 w-16 rotate-180 opacity-70" />

      <header className="relative text-center">
        <CrescentMark className="mx-auto mb-2 h-8 w-8" />
        <p className="font-display text-[15px] italic text-ink-soft">
          Bismillahir Rahmanir Rahim
        </p>
        <h2 className="mt-1 font-display text-[28px] font-semibold leading-tight text-ink">
          Our Little Nikah Keepsake
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="font-display text-xl font-semibold text-ink">{GROOM}</span>
          <Heart className="size-4 fill-primary text-primary" />
          <span className="font-display text-xl font-semibold text-ink">{BRIDE}</span>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          {formatDisplayDate(s.date)}
          <span className="mx-1.5 text-dusty">·</span>
          {s.place || "—"}
        </p>
      </header>

      <Divider />

      <section>
        <Label>Symbolic Mahr</Label>
        {mahr ? (
          <>
            <p className="font-medium text-ink">{mahr.title}</p>
            <p className="mt-0.5 text-sm text-ink-soft">{mahr.description}</p>
          </>
        ) : (
          <p className="text-sm text-ink-mute">A gift of the heart, unnamed.</p>
        )}
        {s.witnesses.length > 0 ? (
          <p className="mt-3 text-sm text-ink-soft">
            <span className="font-medium text-ink">Witnesses · </span>
            {s.witnesses.map((w) => w.name).join(" · ")}
          </p>
        ) : null}
      </section>

      <Divider />

      <section>
        <Label>A reminder we keep</Label>
        <p className="font-display text-[15px] italic leading-relaxed text-ink-soft">{KHUTBAH}</p>
      </section>

      <Divider />

      <section>
        <Label>
          Promises
          <span className="ml-1 font-sans text-[10px] font-medium tracking-normal text-ink-mute">
            {both.length} shared
          </span>
        </Label>
        <ul className="space-y-2">
          {selected.length === 0 ? (
            <li className="text-sm text-ink-mute">No promises selected.</li>
          ) : (
            selected.map((p) => {
              const shared = s.myPromises.includes(p.id) && s.partnerPromises.includes(p.id);
              return (
                <li key={p.id} className="flex gap-2">
                  <Check
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      shared ? "text-sage" : "text-primary",
                    )}
                    strokeWidth={2.6}
                  />
                  <div>
                    <p className="text-sm font-medium text-ink">{p.title}</p>
                    <p className="text-xs leading-relaxed text-ink-soft">{p.description}</p>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>

      <Divider />

      <section className="grid gap-3">
        <div>
          <Label>Zayan wrote</Label>
          <NoteBlock
            remember={s.myNoteRemember}
            forever={s.myNoteForever}
            empty="A quiet page, waiting."
          />
        </div>
        <div>
          <Label>Aaira wrote</Label>
          <NoteBlock
            remember={s.partnerNoteRemember}
            forever={s.partnerNoteForever}
            empty="Aaira has not written yet."
          />
        </div>
      </section>

      <Divider />

      <section>
        <Label>Signatures</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/60 p-2 ring-1 ring-dusty/25">
            <p className="text-[10px] font-semibold tracking-wide text-ink-mute uppercase">
              {GROOM}
            </p>
            {s.zayanSignature ? (
              <img src={s.zayanSignature} alt="" className="mt-1 h-16 w-full object-contain" />
            ) : (
              <p className="mt-6 text-center text-xs text-ink-mute">Unsigned</p>
            )}
            <p className="mt-1 text-[10px] text-ink-mute">{formatTimestamp(s.zayanSignedAt)}</p>
          </div>
          <div className="rounded-2xl bg-white/60 p-2 ring-1 ring-dusty/25">
            <p className="text-[10px] font-semibold tracking-wide text-ink-mute uppercase">
              {BRIDE}
            </p>
            {s.aairaSigned ? (
              <AairaSignature animate={false} />
            ) : (
              <p className="mt-6 text-center text-xs text-ink-mute">Unsigned</p>
            )}
            <p className="mt-1 text-[10px] text-ink-mute">{formatTimestamp(s.aairaSignedAt)}</p>
          </div>
        </div>
      </section>

      <p className="mt-5 text-center font-sans text-[11px] font-semibold tracking-[0.16em] text-ink-mute">
        AGREEMENT ID · {s.agreementId}
      </p>

      <div className="mt-4 rounded-2xl bg-blush/70 px-3 py-3 ring-1 ring-dusty/30">
        <p className="text-center text-[11px] font-medium leading-relaxed text-ink">
          This is a private digital keepsake only.
          <br />
          It has no legal or religious validity.
          <br />
          Not an official Nikah certificate.
        </p>
      </div>

      <Mascot
        pose="proud"
        size={compactMascot ? "sm" : "md"}
        className="mt-2"
        caption="Noor & Luma, keeping watch"
      />
    </article>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[10px] font-semibold tracking-[0.16em] text-ink-mute uppercase">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="my-4 h-px bg-gradient-to-r from-transparent via-dusty/55 to-transparent" />;
}

function NoteBlock({
  remember,
  forever,
  empty,
}: {
  remember: string;
  forever: string;
  empty: string;
}) {
  if (!remember && !forever) {
    return <p className="text-sm italic text-ink-mute">{empty}</p>;
  }
  return (
    <div className="space-y-2 text-sm leading-relaxed text-ink">
      {remember ? (
        <p>
          <span className="text-ink-mute">Remember · </span>
          {remember}
        </p>
      ) : null}
      {forever ? (
        <p>
          <span className="text-ink-mute">Forever · </span>
          {forever}
        </p>
      ) : null}
    </div>
  );
}

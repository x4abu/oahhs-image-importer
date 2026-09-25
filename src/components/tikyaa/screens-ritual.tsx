import { useEffect, useState } from "react";
import { Check, Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import {
  DUMMY_WITNESSES,
  KHUTBAH,
  MAHR_OPTIONS,
  PARTNER_NOTE_FOREVER,
  PARTNER_NOTE_REMEMBER,
  PARTNER_PROMISE_PICKS,
  PROMISES,
  formatDisplayDate,
} from "@/lib/tikyaa/data";
import { useTikyaa } from "@/lib/tikyaa/store";
import { cn } from "@/lib/utils";
import {
  FlowHeader,
  GlassCard,
  Mascot,
  PrimaryCta,
  Screen,
} from "./chrome";

export function ElementsScreen() {
  const mahrId = useTikyaa((s) => s.mahrId);
  const witnesses = useTikyaa((s) => s.witnesses);
  const setMahr = useTikyaa((s) => s.setMahr);
  const setWitnesses = useTikyaa((s) => s.setWitnesses);
  const next = useTikyaa((s) => s.next);
  const [draft, setDraft] = useState("");

  function addWitness() {
    const name = draft.trim();
    if (!name) {
      toast.error("Add a dummy name first");
      return;
    }
    if (witnesses.length >= 2) {
      toast.message("Two witnesses is plenty for this keepsake");
      return;
    }
    setWitnesses([...witnesses, { id: `w-${Date.now()}`, name }]);
    setDraft("");
  }

  return (
    <Screen>
      <FlowHeader step="elements" />
      <Mascot pose="scroll" size="md" caption="A little scroll of kindness" />
      <GlassCard className="mt-1">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-ink-mute uppercase">
          A reminder
        </p>
        <p className="mt-1.5 font-display text-base italic leading-relaxed text-ink">
          {KHUTBAH}
        </p>
      </GlassCard>
      <h3 className="mt-4 mb-2 text-sm font-semibold text-ink">Symbolic Mahr</h3>
      <p className="mb-2 text-xs leading-relaxed text-ink-soft">
        Fun romantic gift ideas — choose one as a token, not a contract.
      </p>
      <div className="grid gap-2">
        {MAHR_OPTIONS.map((m) => {
          const on = mahrId === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMahr(m.id)}
              className={cn(
                "glass rounded-2xl p-3 text-left press",
                on && "ring-2 ring-primary/50 bg-white/70",
              )}
            >
              <div className="flex items-start gap-2">
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ring-1",
                    on ? "bg-primary text-primary-fg ring-primary" : "ring-dusty/50",
                  )}
                >
                  {on ? <Check className="size-3" strokeWidth={3} /> : null}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{m.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{m.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <h3 className="mt-5 mb-2 text-sm font-semibold text-ink">Optional witnesses</h3>
      <p className="mb-2 text-xs text-ink-soft">Dummy names only. You can skip this.</p>
      <GlassCard className="space-y-2 rounded-2xl">
        {witnesses.map((w) => (
          <div key={w.id} className="flex items-center justify-between text-sm text-ink">
            <span>{w.name}</span>
            <button
              type="button"
              className="text-xs text-ink-mute hover:text-ink"
              onClick={() => setWitnesses(witnesses.filter((x) => x.id !== w.id))}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a dummy name"
            maxLength={32}
          />
          <Button type="button" variant="secondary" size="icon" onClick={addWitness} aria-label="Add witness">
            <Plus className="size-4" />
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="w-full text-xs"
          onClick={() => setWitnesses(DUMMY_WITNESSES.map((w) => ({ ...w })))}
        >
          Add Imran Yusuf & Hana Rahman
        </Button>
      </GlassCard>
      <PrimaryCta onClick={next} disabled={!mahrId}>
        Continue
      </PrimaryCta>
    </Screen>
  );
}

export function PromisesScreen() {
  const my = useTikyaa((s) => s.myPromises);
  const partner = useTikyaa((s) => s.partnerPromises);
  const toggle = useTikyaa((s) => s.toggleMyPromise);
  const addPartner = useTikyaa((s) => s.addPartnerPromise);
  const next = useTikyaa((s) => s.next);
  const shared = my.filter((id) => partner.includes(id));

  useEffect(() => {
    const timers = PARTNER_PROMISE_PICKS.map((id, i) =>
      window.setTimeout(() => addPartner(id), 900 + i * 850),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [addPartner]);

  return (
    <Screen>
      <FlowHeader step="promises" />
      <Mascot
        pose={shared.length > 0 ? "happy" : "welcome"}
        size="md"
        caption={
          shared.length > 0
            ? `Noor & Luma are delighted — ${shared.length} shared`
            : "Tap a card. Aaira is choosing in real time."
        }
      />
      <div className="mb-3 flex items-center justify-between rounded-full bg-white/55 px-4 py-2 text-xs font-semibold text-ink">
        <span className="tabular-nums">{my.length} you selected</span>
        <span className="tabular-nums">{partner.length} partner</span>
        <span className="flex items-center gap-1 text-primary tabular-nums">
          <Heart className="size-3 fill-current" /> {shared.length} both
        </span>
      </div>
      <div className="grid gap-2">
        {PROMISES.map((p) => {
          const you = my.includes(p.id);
          const them = partner.includes(p.id);
          const both = you && them;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggle(p.id)}
              className={cn(
                "glass rounded-2xl p-3 text-left press",
                both && "ring-2 ring-sage/50 bg-sage-soft/60",
                you && !both && "ring-2 ring-primary/40 bg-white/70",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">{p.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{p.description}</p>
                </div>
                {both ? <Heart className="size-4 shrink-0 fill-sage text-sage" /> : null}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {you ? <Chip tone="you">You selected</Chip> : null}
                {them ? <Chip tone="partner">Partner selected</Chip> : null}
                {both ? <Chip tone="both">Both selected</Chip> : null}
              </div>
            </button>
          );
        })}
      </div>
      <PrimaryCta onClick={next} disabled={my.length === 0}>
        Continue
      </PrimaryCta>
    </Screen>
  );
}

function Chip({
  children,
  tone,
}: {
  children: string;
  tone: "you" | "partner" | "both";
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
        tone === "you" && "bg-rose text-ink",
        tone === "partner" && "bg-white/80 text-ink-soft ring-1 ring-dusty/40",
        tone === "both" && "bg-sage text-paper",
      )}
    >
      {children}
    </span>
  );
}

export function NotesScreen() {
  const myNoteRemember = useTikyaa((s) => s.myNoteRemember);
  const myNoteForever = useTikyaa((s) => s.myNoteForever);
  const partnerNotesReady = useTikyaa((s) => s.partnerNotesReady);
  const partnerNoteRemember = useTikyaa((s) => s.partnerNoteRemember);
  const partnerNoteForever = useTikyaa((s) => s.partnerNoteForever);
  const setMyNoteRemember = useTikyaa((s) => s.setMyNoteRemember);
  const setMyNoteForever = useTikyaa((s) => s.setMyNoteForever);
  const setPartnerNotes = useTikyaa((s) => s.setPartnerNotes);
  const next = useTikyaa((s) => s.next);

  useEffect(() => {
    if (partnerNotesReady) return;
    const t = window.setTimeout(() => {
      setPartnerNotes(PARTNER_NOTE_REMEMBER, PARTNER_NOTE_FOREVER);
      toast.message("Aaira saved her notes");
    }, 2400);
    return () => window.clearTimeout(t);
  }, [partnerNotesReady, setPartnerNotes]);

  return (
    <Screen>
      <FlowHeader step="notes" />
      <Mascot pose="writing" size="md" caption="A tiny notebook, two voices" />
      <GlassCard className="mt-1 space-y-2">
        <p className="text-sm font-semibold text-ink">Something I want you to remember…</p>
        <Textarea
          value={myNoteRemember}
          onChange={(e) => setMyNoteRemember(e.target.value)}
          placeholder="A small thing that already feels like home…"
          maxLength={240}
        />
        <p className="text-right text-[10px] text-ink-mute tabular-nums">
          {myNoteRemember.length}/240
        </p>
      </GlassCard>
      <GlassCard className="mt-2.5 space-y-2">
        <p className="text-sm font-semibold text-ink">One thing I promise forever…</p>
        <Textarea
          value={myNoteForever}
          onChange={(e) => setMyNoteForever(e.target.value)}
          placeholder="A promise you can keep on ordinary days…"
          maxLength={240}
        />
        <p className="text-right text-[10px] text-ink-mute tabular-nums">
          {myNoteForever.length}/240
        </p>
      </GlassCard>
      <div className="mt-3">
        <p className="mb-1.5 text-[10px] font-semibold tracking-[0.14em] text-ink-mute uppercase">
          Aaira’s notes
        </p>
        <GlassCard className="rounded-2xl">
          {partnerNotesReady ? (
            <div className="space-y-2 text-sm leading-relaxed text-ink fade-up">
              <p>
                <span className="text-ink-mute">Remember · </span>
                {partnerNoteRemember}
              </p>
              <p>
                <span className="text-ink-mute">Forever · </span>
                {partnerNoteForever}
              </p>
            </div>
          ) : (
            <p className="text-sm text-ink-mute">Aaira is writing…</p>
          )}
        </GlassCard>
      </div>
      <PrimaryCta onClick={next}>Continue</PrimaryCta>
    </Screen>
  );
}

export function ReviewScreen() {
  const s = useTikyaa();
  const mahr = MAHR_OPTIONS.find((m) => m.id === s.mahrId);
  const selected = PROMISES.filter(
    (p) => s.myPromises.includes(p.id) || s.partnerPromises.includes(p.id),
  );
  return (
    <Screen>
      <FlowHeader step="review" />
      <Mascot pose="proud" size="sm" caption="A quiet look, before the seal" />
      <GlassCard className="mt-1 space-y-3">
        <Row label="The two of you" value="Zayan Malik  ·  Aaira Khan" />
        <Row label="When & where" value={`${formatDisplayDate(s.date)}  ·  ${s.place}`} />
        <Row label="Symbolic mahr" value={mahr?.title ?? "—"} />
        <Row
          label="Witnesses"
          value={s.witnesses.length ? s.witnesses.map((w) => w.name).join(", ") : "None added"}
        />
      </GlassCard>
      <GlassCard className="mt-2.5">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-ink-mute uppercase">
          Promises · {selected.length}
        </p>
        <ul className="mt-2 space-y-1.5">
          {selected.map((p) => (
            <li key={p.id} className="flex gap-2 text-sm text-ink">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
              {p.title}
            </li>
          ))}
        </ul>
      </GlassCard>
      <GlassCard className="mt-2.5 space-y-2 text-sm leading-relaxed">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-ink-mute uppercase">
          Notes
        </p>
        <p>
          <span className="text-ink-mute">Zayan remember · </span>
          {s.myNoteRemember || "—"}
        </p>
        <p>
          <span className="text-ink-mute">Zayan forever · </span>
          {s.myNoteForever || "—"}
        </p>
        <p>
          <span className="text-ink-mute">Aaira remember · </span>
          {s.partnerNoteRemember || "Waiting"}
        </p>
      </GlassCard>
      <PrimaryCta onClick={s.next}>Looks perfect</PrimaryCta>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-ink-mute uppercase">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

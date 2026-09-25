import { useEffect, useState } from "react";
import { Calendar, Check, Copy, Heart, Link2, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BRIDE,
  CREATE_INTRO,
  GROOM,
  SHARE_LINK,
  formatDisplayDate,
} from "@/lib/tikyaa/data";
import { beginKeepsake, useTikyaa } from "@/lib/tikyaa/store";
import {
  CrescentMark,
  Disclaimer,
  FlowHeader,
  GlassCard,
  Mascot,
  PrimaryCta,
  Screen,
} from "./chrome";

export function HomeScreen() {
  const go = useTikyaa((s) => s.go);
  return (
    <Screen className="items-center justify-between pt-4">
      <div className="flex w-full flex-1 flex-col items-center">
        <CrescentMark className="mb-1 h-9 w-9" />
        <Mascot pose="welcome" size="lg" className="mt-1" />
        <h1 className="mt-1 font-display text-5xl font-semibold leading-none tracking-tight text-ink sm:text-6xl">
          Tikyaa
        </h1>
        <p className="mt-2 text-center text-[15px] font-medium text-ink-soft">
          Our Little Nikah Keepsake
        </p>
        <p className="mt-3 max-w-[17rem] text-center text-sm leading-relaxed text-ink-mute">
          A private garden of promises, written by two.
        </p>
        <PrimaryCta className="mt-8 max-w-xs" onClick={() => go("create")}>
          Start Our Keepsake
        </PrimaryCta>
      </div>
      <Disclaimer compact />
    </Screen>
  );
}

export function CreateScreen() {
  const next = useTikyaa((s) => s.next);
  return (
    <Screen>
      <FlowHeader step="create" />
      <Mascot pose="sitting" size="md" caption="Bismillah, a gentle start" />
      <GlassCard strong className="mt-2">
        <p className="text-center font-display text-xl italic leading-snug text-ink">
          Bismillahir Rahmanir Rahim
        </p>
        <p className="mt-3 text-center text-sm leading-relaxed text-ink-soft">{CREATE_INTRO}</p>
      </GlassCard>
      <PrimaryCta
        onClick={() => {
          beginKeepsake();
          next();
        }}
      >
        Create Keepsake
      </PrimaryCta>
      <p className="mt-3 text-center text-[11px] text-ink-mute">
        Private fun keepsake only · Not a real Nikah
      </p>
    </Screen>
  );
}

export function DetailsScreen() {
  const date = useTikyaa((s) => s.date);
  const place = useTikyaa((s) => s.place);
  const setDate = useTikyaa((s) => s.setDate);
  const setPlace = useTikyaa((s) => s.setPlace);
  const next = useTikyaa((s) => s.next);
  return (
    <Screen>
      <FlowHeader step="details" />
      <Mascot pose="sitting" size="md" caption="Already written, just for you two" />
      <p className="mb-3 text-center text-sm text-ink-soft">
        Names are already here. Date and place are yours to set.
      </p>
      <div className="space-y-2.5">
        <GlassCard className="rounded-2xl p-3.5">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-ink-mute uppercase">
            Groom
          </p>
          <p className="mt-0.5 font-display text-xl font-semibold text-ink">{GROOM}</p>
        </GlassCard>
        <GlassCard className="rounded-2xl p-3.5">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-ink-mute uppercase">
            Bride
          </p>
          <p className="mt-0.5 font-display text-xl font-semibold text-ink">{BRIDE}</p>
        </GlassCard>
      </div>
      <GlassCard className="mt-2.5 space-y-3 rounded-2xl">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">
            <Calendar className="size-3.5" /> Date
          </span>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <span className="mt-1 block text-xs text-ink-mute">{formatDisplayDate(date)}</span>
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">
            <MapPin className="size-3.5" /> Place
          </span>
          <Input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="A courtyard, a garden, a home…"
            maxLength={60}
          />
        </label>
      </GlassCard>
      <PrimaryCta onClick={next}>Continue</PrimaryCta>
    </Screen>
  );
}

export function InviteScreen() {
  const {
    inviteEmail,
    partnerStatus,
    startInvite,
    setInviteEmail,
    markPartnerJoined,
    next,
  } = useTikyaa();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (partnerStatus !== "waiting") return;
    const t = window.setTimeout(() => {
      markPartnerJoined();
      toast.message("Aaira is here", { description: "Your partner joined the keepsake." });
    }, 2600);
    return () => window.clearTimeout(t);
  }, [partnerStatus, markPartnerJoined]);

  async function copyLink() {
    startInvite("link");
    try {
      await navigator.clipboard.writeText(SHARE_LINK);
      setCopied(true);
      toast.success("Link copied");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.message("Share this link", { description: SHARE_LINK });
    }
  }

  function sendEmail() {
    if (!inviteEmail.trim()) {
      toast.error("Add a dummy email to send");
      return;
    }
    startInvite("email");
    toast.success("Invite sent", { description: `A note is on its way to ${inviteEmail}.` });
  }

  const joined = partnerStatus === "joined";
  const waiting = partnerStatus === "waiting";

  return (
    <Screen>
      <FlowHeader step="invite" />
      <Mascot
        pose={joined ? "happy" : "waiting"}
        size="md"
        caption={joined ? "She’s here." : waiting ? "Waiting by the little hourglass…" : "Invite Aaira to write with you"}
      />
      <GlassCard className="mt-1 space-y-3">
        <p className="text-sm font-medium text-ink">Generate a unique shareable link</p>
        <div className="flex gap-2">
          <div className="flex h-11 min-w-0 flex-1 items-center truncate rounded-xl bg-paper/85 px-3 text-xs text-ink-soft ring-1 ring-dusty/35">
            {SHARE_LINK.replace("https://", "")}
          </div>
          <Button type="button" size="icon" variant="secondary" onClick={copyLink} aria-label="Copy link">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>
        <Button type="button" variant="outline" className="w-full rounded-full" onClick={copyLink}>
          <Link2 className="size-4" />
          Generate unique link
        </Button>
      </GlassCard>
      <GlassCard className="mt-2.5 space-y-3">
        <p className="text-sm font-medium text-ink">Send invite via email</p>
        <Input
          type="email"
          placeholder="aaira.khan@mail.test"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
        />
        <Button type="button" variant="outline" className="w-full rounded-full" onClick={sendEmail}>
          <Mail className="size-4" />
          Send invite
        </Button>
      </GlassCard>
      <div
        className={`mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium ${
          joined
            ? "bg-sage-soft text-sage"
            : waiting
              ? "waiting-pulse bg-white/55 text-ink-soft"
              : "bg-white/40 text-ink-mute"
        }`}
      >
        {joined ? <Heart className="size-4 fill-current" /> : null}
        {joined ? "Partner joined" : waiting ? "Waiting for partner…" : "Invite to begin together"}
      </div>
      <PrimaryCta onClick={next} disabled={!joined}>
        Continue together
      </PrimaryCta>
    </Screen>
  );
}

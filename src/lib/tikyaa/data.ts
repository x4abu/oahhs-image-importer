export const GROOM = "Zayan Malik";
export const BRIDE = "Aaira Khan";

export const DEFAULT_PLACE = "Al Noor Courtyard";
export const DEFAULT_DATE = "2026-09-24";

export const SHARE_LINK = "https://tikyaa.app/join/tky-8f21-zaaira";

export const KHUTBAH =
  "Mercy is the beginning of every gentle home. Speak to one another with the softness you hope to receive. Forgive quickly. Keep a light on for each other in the quiet hours. This little keepsake holds your words — may your days hold them even more faithfully.";

export const CREATE_INTRO =
  "A quiet beginning, just for the two of you. Tikyaa is a private garden of promises — a little memory of the day you chose each other with gentleness. It is not a Nikah, not a contract, and not a certificate. It is only a beautiful keepsake you make together.";

export type MahrOption = {
  id: string;
  title: string;
  description: string;
};

export const MAHR_OPTIONS: MahrOption[] = [
  {
    id: "letters",
    title: "A letter every anniversary",
    description: "Handwritten words, once a year, for as long as you live.",
  },
  {
    id: "sunrise-tea",
    title: "Weekly sunrise tea",
    description: "One slow cup together before the world wakes up.",
  },
  {
    id: "playlist",
    title: "A playlist of our story",
    description: "Songs for the days you met, waited, and chose each other.",
  },
  {
    id: "garden",
    title: "A garden we plant together",
    description: "Something living that grows as you do.",
  },
  {
    id: "night-sky",
    title: "A night under the stars",
    description: "One trip to sit beneath a wide, quiet sky.",
  },
  {
    id: "friday-meal",
    title: "Her favorite meal every Friday",
    description: "A small feast, cooked with patience, week after week.",
  },
  {
    id: "first-walk",
    title: "A sketch of our first walk",
    description: "The path you took, framed softly in the home you make.",
  },
  {
    id: "named-star",
    title: "A star named after us",
    description: "A faraway light with both of your names on it.",
  },
];

export type PromiseItem = {
  id: string;
  title: string;
  description: string;
};

export const PROMISES: PromiseItem[] = [
  {
    id: "kindness",
    title: "Kindness first",
    description: "I will speak to you with gentleness, even on hard days.",
  },
  {
    id: "dua",
    title: "Evening dua",
    description: "We will make time to pray for each other before sleep.",
  },
  {
    id: "tea",
    title: "Sunday tea",
    description: "One unhurried cup together, every week, no phones.",
  },
  {
    id: "honest",
    title: "Honest words",
    description: "I will tell you the truth, and I will tell it softly.",
  },
  {
    id: "peace",
    title: "A home of peace",
    description: "Our rooms will be a place of rest, not of noise.",
  },
  {
    id: "surprises",
    title: "Little surprises",
    description: "Tiny notes, favorite snacks, unexpected smiles.",
  },
  {
    id: "patience",
    title: "Patience in delay",
    description: "I will wait for you without rushing your heart.",
  },
  {
    id: "laughter",
    title: "Shared laughter",
    description: "I will keep finding reasons to make you laugh.",
  },
  {
    id: "family",
    title: "Family warmth",
    description: "I will honor the people you love, as my own.",
  },
  {
    id: "reminders",
    title: "Gentle reminders",
    description: "I will remind you of your strength when you forget.",
  },
  {
    id: "walks",
    title: "Walks at dusk",
    description: "We will walk together, even when we have nothing to say.",
  },
  {
    id: "forgive",
    title: "Forgiveness ready",
    description: "I will choose repair over pride, again and again.",
  },
  {
    id: "gratitude",
    title: "Gratitude daily",
    description: "I will notice and thank you for the quiet things.",
  },
  {
    id: "dreams",
    title: "Future dreams",
    description: "I will keep dreaming with you, not past you.",
  },
  {
    id: "goodnight",
    title: "Soft goodnights",
    description: "No day ends without a kind word between us.",
  },
];

export const PARTNER_PROMISE_PICKS = [
  "kindness",
  "tea",
  "peace",
  "patience",
  "family",
  "walks",
  "gratitude",
  "goodnight",
] as const;

export const PARTNER_NOTE_REMEMBER =
  "The way you laugh when the tea is too hot. I never want to forget that sound.";

export const PARTNER_NOTE_FOREVER =
  "I will always leave a light on for you — in the house, and in my heart.";

export const DUMMY_WITNESSES = [
  { id: "w1", name: "Imran Yusuf" },
  { id: "w2", name: "Hana Rahman" },
];

export function formatDisplayDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTimestamp(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function makeAgreementId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `TKY-ZA-${n}`;
}

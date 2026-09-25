import { create } from "zustand";
import { DEFAULT_DATE, DEFAULT_PLACE, makeAgreementId } from "./data";

export type Step =
  | "home"
  | "create"
  | "details"
  | "invite"
  | "elements"
  | "promises"
  | "notes"
  | "review"
  | "accept"
  | "signature"
  | "keepsake"
  | "success";

export const STEP_ORDER: Step[] = [
  "home",
  "create",
  "details",
  "invite",
  "elements",
  "promises",
  "notes",
  "review",
  "accept",
  "signature",
  "keepsake",
  "success",
];

export const STEP_LABELS: Record<Step, string> = {
  home: "Welcome",
  create: "Begin",
  details: "The two of you",
  invite: "Invite",
  elements: "Keepsake details",
  promises: "Promises",
  notes: "Notes",
  review: "Review",
  accept: "Qubool",
  signature: "Signatures",
  keepsake: "Keepsake",
  success: "Complete",
};

export type PartnerStatus = "idle" | "waiting" | "joined";
export type InviteChannel = "link" | "email" | null;

export type Witness = { id: string; name: string };

type TikyaaState = {
  step: Step;
  date: string;
  place: string;
  inviteChannel: InviteChannel;
  inviteEmail: string;
  partnerStatus: PartnerStatus;
  mahrId: string | null;
  witnesses: Witness[];
  myPromises: string[];
  partnerPromises: string[];
  myNoteRemember: string;
  myNoteForever: string;
  partnerNoteRemember: string;
  partnerNoteForever: string;
  partnerNotesReady: boolean;
  zayanAccepted: boolean;
  aairaAccepted: boolean;
  zayanSignature: string | null;
  aairaSigned: boolean;
  zayanSignedAt: string | null;
  aairaSignedAt: string | null;
  agreementId: string;
  createdAt: string | null;
  go: (step: Step) => void;
  next: () => void;
  back: () => void;
  setDate: (date: string) => void;
  setPlace: (place: string) => void;
  startInvite: (channel: Exclude<InviteChannel, null>) => void;
  setInviteEmail: (email: string) => void;
  markPartnerJoined: () => void;
  setMahr: (id: string) => void;
  setWitnesses: (list: Witness[]) => void;
  toggleMyPromise: (id: string) => void;
  addPartnerPromise: (id: string) => void;
  setMyNoteRemember: (v: string) => void;
  setMyNoteForever: (v: string) => void;
  setPartnerNotes: (remember: string, forever: string) => void;
  acceptAsZayan: () => void;
  acceptAsAaira: () => void;
  setZayanSignature: (dataUrl: string | null) => void;
  confirmZayanSignature: () => void;
  confirmAairaSignature: () => void;
  reset: () => void;
};

function indexOf(step: Step) {
  return STEP_ORDER.indexOf(step);
}

const initial = {
  step: "home" as Step,
  date: DEFAULT_DATE,
  place: DEFAULT_PLACE,
  inviteChannel: null as InviteChannel,
  inviteEmail: "",
  partnerStatus: "idle" as PartnerStatus,
  mahrId: null as string | null,
  witnesses: [] as Witness[],
  myPromises: [] as string[],
  partnerPromises: [] as string[],
  myNoteRemember: "",
  myNoteForever: "",
  partnerNoteRemember: "",
  partnerNoteForever: "",
  partnerNotesReady: false,
  zayanAccepted: false,
  aairaAccepted: false,
  zayanSignature: null as string | null,
  aairaSigned: false,
  zayanSignedAt: null as string | null,
  aairaSignedAt: null as string | null,
  agreementId: "TKY-ZA-0000",
  createdAt: null as string | null,
};

export const useTikyaa = create<TikyaaState>((set, get) => ({
  ...initial,
  go: (step) => set({ step }),
  next: () => {
    const i = indexOf(get().step);
    const n = STEP_ORDER[i + 1];
    if (n) set({ step: n });
  },
  back: () => {
    const i = indexOf(get().step);
    const n = STEP_ORDER[i - 1];
    if (n) set({ step: n });
  },
  setDate: (date) => set({ date }),
  setPlace: (place) => set({ place }),
  startInvite: (channel) =>
    set({
      inviteChannel: channel,
      partnerStatus: "waiting",
    }),
  setInviteEmail: (inviteEmail) => set({ inviteEmail }),
  markPartnerJoined: () => set({ partnerStatus: "joined" }),
  setMahr: (id) => set({ mahrId: id }),
  setWitnesses: (witnesses) => set({ witnesses }),
  toggleMyPromise: (id) =>
    set((s) => ({
      myPromises: s.myPromises.includes(id)
        ? s.myPromises.filter((x) => x !== id)
        : [...s.myPromises, id],
    })),
  addPartnerPromise: (id) =>
    set((s) =>
      s.partnerPromises.includes(id)
        ? s
        : { partnerPromises: [...s.partnerPromises, id] },
    ),
  setMyNoteRemember: (myNoteRemember) => set({ myNoteRemember }),
  setMyNoteForever: (myNoteForever) => set({ myNoteForever }),
  setPartnerNotes: (remember, forever) =>
    set({
      partnerNoteRemember: remember,
      partnerNoteForever: forever,
      partnerNotesReady: true,
    }),
  acceptAsZayan: () => set({ zayanAccepted: true }),
  acceptAsAaira: () => set({ aairaAccepted: true }),
  setZayanSignature: (zayanSignature) => set({ zayanSignature }),
  confirmZayanSignature: () =>
    set({ zayanSignedAt: new Date().toISOString() }),
  confirmAairaSignature: () =>
    set({ aairaSigned: true, aairaSignedAt: new Date().toISOString() }),
  reset: () =>
    set({
      ...initial,
      agreementId: makeAgreementId(),
      createdAt: new Date().toISOString(),
    }),
}));

export function beginKeepsake() {
  useTikyaa.setState({
    agreementId: makeAgreementId(),
    createdAt: new Date().toISOString(),
  });
}

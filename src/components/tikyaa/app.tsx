import { Toaster } from "sonner";
import { useTikyaa } from "@/lib/tikyaa/store";
import { PhoneShell } from "./chrome";
import {
  CreateScreen,
  DetailsScreen,
  HomeScreen,
  InviteScreen,
} from "./screens-entry";
import {
  ElementsScreen,
  NotesScreen,
  PromisesScreen,
  ReviewScreen,
} from "./screens-ritual";
import {
  AcceptScreen,
  KeepsakeScreen,
  SignatureScreen,
  SuccessScreen,
} from "./screens-end";

export function TikyaaApp() {
  const step = useTikyaa((s) => s.step);
  return (
    <PhoneShell>
      {step === "home" ? <HomeScreen /> : null}
      {step === "create" ? <CreateScreen /> : null}
      {step === "details" ? <DetailsScreen /> : null}
      {step === "invite" ? <InviteScreen /> : null}
      {step === "elements" ? <ElementsScreen /> : null}
      {step === "promises" ? <PromisesScreen /> : null}
      {step === "notes" ? <NotesScreen /> : null}
      {step === "review" ? <ReviewScreen /> : null}
      {step === "accept" ? <AcceptScreen /> : null}
      {step === "signature" ? <SignatureScreen /> : null}
      {step === "keepsake" ? <KeepsakeScreen /> : null}
      {step === "success" ? <SuccessScreen /> : null}
      <Toaster
        position="top-center"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "var(--color-paper)",
            color: "var(--color-ink)",
            border: "1px solid color-mix(in oklab, var(--color-dusty) 55%, white)",
          },
        }}
      />
    </PhoneShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { TikyaaApp } from "@/components/tikyaa/app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tikyaa — A Keepsake Nikah Ritual for Two" },
      {
        name: "description",
        content:
          "Tikyaa is a private little Nikah keepsake for two: write your promises, sign together, and keep the card. Fun and romantic, not a real certificate.",
      },
      { property: "og:title", content: "Tikyaa — A Keepsake Nikah Ritual for Two" },
      {
        property: "og:description",
        content:
          "Write your promises, sign together, and keep a beautiful card. A playful keepsake, not a real certificate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return <TikyaaApp />;
}

import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/inspirations")({
  head: () => ({
    meta: [
      { title: "Inspirations — MELIYA" },
      { name: "description", content: "Découvrez les inspirations et réalisations de MELIYA." },
    ],
  }),
  component: Inspirations,
});

function Inspirations() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center max-w-xl">
        <span className="tag-pill mb-6 inline-flex">
          <Sparkles size={10} style={{ color: "#D4B896" }} />
          Bientôt disponible
        </span>
        <h1
          className="display mt-4"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#6B4A7E", letterSpacing: "-0.02em" }}
        >
          Inspirations
        </h1>
        <p
          className="serif italic mt-6"
          style={{ fontSize: "18px", color: "#6B4A7E", opacity: 0.7 }}
        >
          Cette page est en cours de création.<br />
          Revenez bientôt pour découvrir les réalisations.
        </p>
      </div>
    </section>
  );
}

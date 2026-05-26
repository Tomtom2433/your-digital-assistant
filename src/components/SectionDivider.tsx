export function SectionDivider({
  className,
}: {
  variant?: "sparkle" | "dot" | "ornament";
  className?: string;
}) {
  return (
    <div
      role="presentation"
      aria-hidden
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(2rem, 4vw, 3rem) 0",
        margin: 0,
      }}
    >
      <span
        style={{
          width: "min(260px, 38vw)",
          height: "0.5px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(200,132,124,0.35) 30%, rgba(200,132,124,0.55) 50%, rgba(200,132,124,0.35) 70%, transparent 100%)",
        }}
      />
    </div>
  );
}

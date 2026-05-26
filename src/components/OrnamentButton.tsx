import React from "react";

interface OrnamentButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function OrnamentWrap({ children, style }: OrnamentButtonProps) {
  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }}>
      {/* ✦ star + flanking lines — centré sur la bordure haute */}
      <span style={{
        position: "absolute", top: "0", left: 0, right: 0,
        transform: "translateY(-50%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "5px", pointerEvents: "none", zIndex: 6,
      }}>
        <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #D4A843)", opacity: 0.9 }} />
        <span style={{ color: "#D4A843", fontSize: "10px", lineHeight: 1, textShadow: "0 0 4px rgba(212,168,67,0.55)", flexShrink: 0 }}>✦</span>
        <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #D4A843, transparent)", opacity: 0.9 }} />
      </span>
      {children}
    </span>
  );
}

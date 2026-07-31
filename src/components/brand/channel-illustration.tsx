export type ChannelKind = "center" | "school" | "screen";

/**
 * Lightweight branded SVG illustrations for learning channels.
 * Token-driven, shared abacus visual language. Decorative (aria-hidden).
 */
export function ChannelIllustration({ kind }: { kind: ChannelKind }) {
  if (kind === "center") {
    // Center / classroom: building with abacus-bead windows
    return (
      <svg width="96" height="80" viewBox="0 0 96 80" fill="none" aria-hidden>
        <rect x="20" y="28" width="56" height="44" rx="3" fill="none" stroke="var(--brand-teal-pale)" strokeWidth="2.5" />
        <path d="M16 28 L48 8 L80 28" fill="none" stroke="var(--brand-teal-pale)" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="30" y="40" width="10" height="10" rx="1" fill="var(--brand-orange)" />
        <rect x="56" y="40" width="10" height="10" rx="1" fill="var(--brand-teal-pale)" />
        <rect x="43" y="52" width="10" height="20" rx="1" fill="var(--brand-teal-pale)" opacity="0.7" />
      </svg>
    );
  }
  if (kind === "school") {
    // Partner school: open book + bead
    return (
      <svg width="96" height="80" viewBox="0 0 96 80" fill="none" aria-hidden>
        <path d="M12 24 Q48 16 84 24 L84 64 Q48 56 12 64 Z" fill="none" stroke="var(--brand-white)" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="48" y1="20" x2="48" y2="60" stroke="var(--brand-white)" strokeWidth="2" />
        <circle cx="48" cy="44" r="5" fill="var(--brand-orange)" />
        <line x1="20" y1="34" x2="40" y2="30" stroke="var(--brand-white)" strokeWidth="1.2" opacity="0.6" />
        <line x1="56" y1="30" x2="76" y2="34" stroke="var(--brand-white)" strokeWidth="1.2" opacity="0.6" />
        <line x1="20" y1="42" x2="40" y2="38" stroke="var(--brand-white)" strokeWidth="1.2" opacity="0.6" />
        <line x1="56" y1="38" x2="76" y2="42" stroke="var(--brand-white)" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }
  // Virtual platform: screen with abacus beads
  return (
    <svg width="96" height="80" viewBox="0 0 96 80" fill="none" aria-hidden>
      <rect x="14" y="16" width="68" height="48" rx="4" fill="none" stroke="var(--brand-navy)" strokeWidth="2.5" />
      <rect x="18" y="20" width="60" height="36" rx="2" fill="var(--brand-navy)" opacity="0.1" />
      <line x1="28" y1="30" x2="28" y2="48" stroke="var(--brand-navy)" strokeWidth="1.5" opacity="0.5" />
      <line x1="40" y1="30" x2="40" y2="48" stroke="var(--brand-navy)" strokeWidth="1.5" opacity="0.5" />
      <line x1="52" y1="30" x2="52" y2="48" stroke="var(--brand-navy)" strokeWidth="1.5" opacity="0.5" />
      <line x1="64" y1="30" x2="64" y2="48" stroke="var(--brand-navy)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="28" cy="34" r="3" fill="var(--brand-orange)" />
      <circle cx="40" cy="44" r="3" fill="var(--brand-teal)" />
      <circle cx="52" cy="36" r="3" fill="var(--brand-orange)" />
      <circle cx="64" cy="42" r="3" fill="var(--brand-teal)" />
      <line x1="38" y1="64" x2="58" y2="64" stroke="var(--brand-navy)" strokeWidth="2.5" />
    </svg>
  );
}

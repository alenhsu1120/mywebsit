<template>
  <div class="rune-card">
    <!-- Hex corner decorations -->
    <span class="corner corner-tl" />
    <span class="corner corner-tr" />
    <span class="corner corner-bl" />
    <span class="corner corner-br" />

    <!-- Icon circle -->
    <div class="rune-icon-wrap">
      <div class="rune-icon-bg">
        <slot name="icon" />
      </div>
    </div>

    <!-- Text content -->
    <div class="rune-body">
      <h3 class="rune-heading">
        <slot name="heading" />
      </h3>
      <div class="rune-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Card Shell ── */
.rune-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.4rem 1.6rem;
  background:
    linear-gradient(135deg, rgba(13,34,56,0.88) 0%, rgba(6,15,28,0.92) 100%);
  border: 1px solid var(--botw-cyan-dim);
  border-radius: 4px;

  box-shadow:
    0 0 12px var(--botw-cyan-ghost),
    inset 0 0 20px rgba(74, 249, 249, 0.04);

  transition:
    border-color 0.35s ease,
    box-shadow   0.35s ease,
    transform    0.35s ease;

  animation: card-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  overflow: hidden;
  cursor: default;
}

/* Subtle scan-line on hover */
.rune-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(74, 249, 249, 0.015) 3px,
    rgba(74, 249, 249, 0.015) 4px
  );
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}

.rune-card:hover {
  border-color: var(--botw-cyan);
  box-shadow:
    0 0 24px var(--botw-cyan-glow),
    0 0 60px var(--botw-cyan-ghost),
    inset 0 0 24px var(--botw-cyan-ghost);
  transform: translateY(-3px);
}
.rune-card:hover::after { opacity: 1; }

/* ── Corner Decorations ── */
.corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--botw-gold-dim);
  border-style: solid;
  transition: border-color 0.35s;
}
.rune-card:hover .corner { border-color: var(--botw-gold); }

.corner-tl { top: 5px;    left: 5px;    border-width: 1.5px 0 0 1.5px; }
.corner-tr { top: 5px;    right: 5px;   border-width: 1.5px 1.5px 0 0; }
.corner-bl { bottom: 5px; left: 5px;    border-width: 0 0 1.5px 1.5px; }
.corner-br { bottom: 5px; right: 5px;   border-width: 0 1.5px 1.5px 0; }

/* ── Icon ── */
.rune-icon-wrap {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
}
.rune-icon-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid var(--botw-cyan-dim);
  background:
    radial-gradient(circle at 38% 32%, rgba(74,249,249,0.14) 0%, rgba(10,24,40,0.96) 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.35s, box-shadow 0.35s;
  box-shadow: 0 0 8px var(--botw-cyan-ghost);
}
.rune-card:hover .rune-icon-bg {
  border-color: var(--botw-cyan);
  box-shadow:
    0 0 16px var(--botw-cyan-glow),
    inset 0 0 12px var(--botw-cyan-ghost);
}

/* ── Heading ── */
.rune-body { flex: 1; min-width: 0; }

.rune-heading {
  font-family: 'Cinzel', serif;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--botw-gold);
  margin-bottom: 0.5rem;
  transition: color 0.3s, text-shadow 0.3s;
  text-shadow: 0 0 8px var(--botw-gold-ghost);
}
.rune-card:hover .rune-heading {
  color: var(--botw-gold-bright);
  text-shadow: 0 0 14px var(--botw-gold-glow);
}

/* ── Content ── */
.rune-content {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--botw-parchment-dim);
}
.rune-content :deep(a) {
  color: var(--botw-cyan);
  border-bottom: 1px solid var(--botw-cyan-dark);
  padding-bottom: 1px;
  transition: color 0.3s, border-color 0.3s, text-shadow 0.3s;
}
.rune-content :deep(a:hover) {
  color: var(--botw-cyan-bright);
  border-color: var(--botw-cyan);
  text-shadow: 0 0 10px var(--botw-cyan-pulse);
}
</style>

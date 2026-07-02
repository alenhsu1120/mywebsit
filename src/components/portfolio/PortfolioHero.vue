<template>
  <section id="top" class="hero">
    <div class="hero-inner">

      <div class="hero-text">
        <p class="eyebrow">HELLO, I'M</p>
        <h1 class="headline">Pei-Hsuan Hsu</h1>
        <p class="subtitle">
          <span>Backend Engineer</span>
          <span class="dot" />
          <span>Quant Developer</span>
        </p>
        <p class="intro">
          I build the quiet architecture behind fast systems — backend services,
          trading infrastructure, and the data pipelines that keep them honest.
          My work sits where careful engineering meets the discipline of markets.
        </p>
        <div class="cta-row">
          <a href="#projects" class="btn btn-primary" @click.prevent="scrollTo('projects')">View Projects</a>
          <a href="#contact" class="btn btn-secondary" @click.prevent="scrollTo('contact')">Contact Me</a>
        </div>
      </div>

      <div class="hero-visual">
        <svg class="blob" viewBox="0 0 520 560" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M256 24C356 8 452 72 468 172C484 272 440 388 344 440C248 492 116 484 60 396C4 308 24 176 100 100C148 52 196 36 256 24Z" fill="#DCE7D5"/>
          <path d="M300 96C368 92 424 148 428 216C432 284 388 356 320 384C252 412 168 396 132 340C96 284 108 200 156 152C196 112 244 100 300 96Z" fill="#AFC3A2" opacity=".55"/>
        </svg>

        <svg class="sprig" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 152C8 108 24 60 60 8" stroke="#5F7F64" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".7"/>
          <path d="M20 120C32 108 48 104 60 110" stroke="#5F7F64" stroke-width="1" fill="none" stroke-linecap="round" opacity=".55"/>
          <path d="M30 92C42 82 56 80 66 88" stroke="#5F7F64" stroke-width="1" fill="none" stroke-linecap="round" opacity=".55"/>
          <path d="M42 60C52 50 64 48 74 54" stroke="#5F7F64" stroke-width="1" fill="none" stroke-linecap="round" opacity=".55"/>
        </svg>

        <figure class="frame">
          <div class="frame-plate">
            <div class="frame-grain" />
            <div class="frame-lines">
              <span v-for="n in 5" :key="n" />
            </div>
          </div>
          <figcaption>— a quiet corner for building things —</figcaption>
        </figure>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.hero {
  position: relative;
  padding: 168px 2.5rem 96px;
  max-width: 1180px;
  margin: 0 auto;
  scroll-margin-top: 78px;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 4rem;
  align-items: center;
}

.hero-text { animation: rise .8s cubic-bezier(.16,1,.3,1) both; }

.eyebrow {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .22em;
  color: var(--mg-green-main);
  margin-bottom: 1.1rem;
  animation: rise .7s cubic-bezier(.16,1,.3,1) .05s both;
}

.headline {
  font-family: var(--mg-font-heading);
  font-weight: 500;
  font-size: clamp(3rem, 6vw, 5.2rem);
  line-height: 1.04;
  color: var(--mg-green-deep);
  margin-bottom: 1.3rem;
  animation: rise .8s cubic-bezier(.16,1,.3,1) .12s both;
}

.subtitle {
  display: flex;
  align-items: center;
  gap: .7rem;
  font-family: var(--mg-font-body);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--mg-green-dark);
  letter-spacing: .02em;
  margin-bottom: 1.6rem;
  animation: rise .8s cubic-bezier(.16,1,.3,1) .2s both;
}
.dot { width: 5px; height: 5px; border-radius: 50%; background: var(--mg-brown); flex-shrink: 0; }

.intro {
  font-family: var(--mg-font-body);
  font-size: 1.02rem;
  line-height: 1.85;
  color: var(--mg-text-body);
  max-width: 480px;
  margin-bottom: 2.4rem;
  animation: rise .8s cubic-bezier(.16,1,.3,1) .28s both;
}

.cta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: rise .8s cubic-bezier(.16,1,.3,1) .36s both;
}

.btn {
  font-family: var(--mg-font-body);
  font-size: .88rem;
  font-weight: 500;
  letter-spacing: .02em;
  padding: .9rem 1.8rem;
  border-radius: 999px;
  text-decoration: none;
  transition: transform .25s, box-shadow .25s, background .25s, border-color .25s, color .25s;
  display: inline-block;
}
.btn-primary {
  background: var(--mg-green-main);
  color: #fff;
  box-shadow: 0 8px 22px rgba(95,127,100,0.28);
}
.btn-primary:hover { background: #4F6D55; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(95,127,100,0.34); }
.btn-secondary {
  background: transparent;
  color: var(--mg-green-dark);
  border: 1px solid var(--mg-green-main);
}
.btn-secondary:hover { background: var(--mg-green-pale); transform: translateY(-2px); }

/* ── Visual ── */
.hero-visual {
  position: relative;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.blob {
  position: absolute;
  width: 130%;
  max-width: 620px;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  animation: blob-breathe 12s ease-in-out infinite;
}
@keyframes blob-breathe {
  0%,100% { transform: translate(-50%,-50%) scale(1) rotate(0deg); }
  50%     { transform: translate(-50%,-50%) scale(1.035) rotate(2.5deg); }
}

.sprig {
  position: absolute;
  width: 90px;
  bottom: 6%;
  left: -6%;
  z-index: 3;
}

.frame {
  position: relative;
  width: 78%;
  max-width: 340px;
  z-index: 2;
}
.frame-plate {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 6px;
  background: linear-gradient(150deg, #EAE6DA 0%, #DCE3D2 55%, #C9D6C2 100%);
  border: 1px solid rgba(255,255,255,.6);
  box-shadow: 0 26px 60px rgba(36,49,38,0.16), 0 6px 18px rgba(36,49,38,0.08);
  overflow: hidden;
}
.frame-grain {
  position: absolute; inset: 0;
  opacity: .35;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}
.frame-lines {
  position: absolute;
  bottom: 14%; left: 12%; right: 12%;
  display: flex; flex-direction: column; gap: .55rem;
}
.frame-lines span { display: block; height: 1px; background: rgba(36,49,38,.22); }
.frame-lines span:nth-child(1) { width: 70%; }
.frame-lines span:nth-child(2) { width: 92%; }
.frame-lines span:nth-child(3) { width: 55%; }
.frame-lines span:nth-child(4) { width: 80%; }
.frame-lines span:nth-child(5) { width: 40%; }

.frame figcaption {
  margin-top: 1rem;
  text-align: center;
  font-family: var(--mg-font-heading);
  font-style: italic;
  font-size: .92rem;
  color: var(--mg-text-muted);
  letter-spacing: .01em;
}

@keyframes rise {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .hero { padding: 132px 1.6rem 72px; }
  .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
  .hero-visual { height: 420px; order: -1; }
  .intro { max-width: none; }
}
</style>

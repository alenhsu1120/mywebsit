<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/" back-label="‹ Home" />
    <div class="roadmap-wrap">

      <!-- Page title -->
      <div class="page-title">
        <p class="label">Learning Map</p>
        <h2>Quant Developer Roadmap</h2>
        <p class="sub">我對於 Quant Dev 的學習地圖 · 從入門框架到 C++ HFT 核心</p>
      </div>

      <!-- Tiered sections -->
      <div class="tiers">
        <section v-for="tier in tiers" :key="tier.title" class="tier" :class="tier.level">
          <div class="tier-head">
            <span class="tier-dot" />
            <h3>{{ tier.title }}</h3>
          </div>

          <div class="repo-list">
            <a
              v-for="repo in tier.repos"
              :key="repo.name"
              :href="repo.url"
              target="_blank"
              rel="noopener"
              class="repo-card"
            >
              <div class="repo-top">
                <span class="repo-star">⭐</span>
                <span class="repo-name">{{ repo.name }}</span>
                <span class="repo-arrow">↗</span>
              </div>
              <p class="repo-url">{{ repo.url.replace('https://github.com/', 'github.com/') }}</p>
              <ul class="repo-learn">
                <li v-for="point in repo.learn" :key="point">{{ point }}</li>
              </ul>
              <p v-if="repo.note" class="repo-note">👉 {{ repo.note }}</p>
            </a>
          </div>
        </section>
      </div>

      <!-- Suggested learning order -->
      <section class="order-section">
        <div class="tier-head">
          <span class="tier-dot brain" />
          <h3>🧠 建議學習順序</h3>
        </div>
        <p class="order-intro">照這個順序看 GitHub，不會亂：</p>

        <div class="timeline">
          <div v-for="(step, i) in steps" :key="step.title" class="step" :style="{ transitionDelay: (i*0.08)+'s' }">
            <div class="marker"><span class="dot" /></div>
            <div class="content">
              <span class="step-title">{{ step.title }}</span>
              <p class="step-repos">{{ step.repos }}</p>
              <p class="step-goal">目標：{{ step.goal }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Fast-track project -->
      <section class="fast-track">
        <div class="tier-head">
          <span class="tier-dot rocket" />
          <h3>🚀 如果你想快速變強</h3>
        </div>
        <div class="fast-card">
          <p class="fast-lead">
            你現在已經有優勢（在做 trading system + C++），建議直接做這個：
          </p>
          <h4 class="fast-title">⭐「自己寫一個 mini Quant Engine」</h4>
          <ul class="fast-features">
            <li v-for="f in miniEngineFeatures" :key="f">{{ f }}</li>
          </ul>
          <p class="fast-note">👉 這個作品 = 面試神器</p>
        </div>
      </section>

    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'

const tiers = [
  {
    title: '🟢 入門必看（Quant 基礎框架）',
    level: 'green',
    repos: [
      {
        name: 'awesome-quant（總整理）',
        url: 'https://github.com/wilsonfreitas/awesome-quant',
        learn: ['策略', '回測', 'Python / C++ 框架', '資料來源', '論文'],
        note: '用法：先不用全部看，只要當「索引地圖」',
      },
      {
        name: 'backtrader（最經典回測框架）',
        url: 'https://github.com/mementum/backtrader',
        learn: ['如何設計策略回測架構', 'data feed 怎麼設計', 'indicator 怎麼接'],
        note: '很適合 Python 入門 Quant Dev',
      },
      {
        name: 'zipline（Quantopian 開源回測）',
        url: 'https://github.com/quantopian/zipline',
        learn: ['event-driven backtesting', 'factor strategy', 'portfolio simulation'],
      },
    ],
  },
  {
    title: '🟡 進階（偏實務交易系統）',
    level: 'yellow',
    repos: [
      {
        name: 'vn.py（中國量化交易系統）',
        url: 'https://github.com/vnpy/vnpy',
        learn: ['完整交易系統架構', 'gateway（券商接口）', 'event engine', 'order / trade flow'],
        note: '很接近「實盤系統」',
      },
      {
        name: 'QuantConnect Lean（專業級）',
        url: 'https://github.com/QuantConnect/Lean',
        learn: ['真正 production-level trading engine', 'multi-asset system', 'portfolio / execution / risk model'],
        note: '如果你想進 hedge fund，這個一定要看',
      },
    ],
  },
  {
    title: '🔴 C++ Quant / HFT 核心（最重要）',
    level: 'red',
    repos: [
      {
        name: 'order book / matching engine 範例',
        url: 'https://github.com/dmcneill/orderbook',
        learn: ['limit order book', 'price-time priority', 'matching logic'],
      },
      {
        name: 'exchange simulator（HFT 模擬）',
        url: 'https://github.com/abdes/market-data-simulator',
        learn: ['market data feed', 'latency simulation', 'order flow'],
      },
      {
        name: 'HFT architecture（概念型）',
        url: 'https://github.com/bloomberg/hft',
        learn: ['HFT 系統設計概念'],
        note: '如果打不開，可以用 keyword 找：HFT order book C++',
      },
    ],
  },
]

const steps = [
  { title: 'Step 1（Python）', repos: 'backtrader ・ zipline', goal: '看懂策略怎麼跑、回測怎麼設計' },
  { title: 'Step 2（系統概念）', repos: 'vn.py', goal: 'trading system 架構、event-driven design' },
  { title: 'Step 3（核心 C++）', repos: 'order book ・ exchange simulator', goal: 'matching engine、latency thinking、concurrency' },
  { title: 'Step 4（進階）', repos: 'QuantConnect Lean', goal: 'production system、institutional level design' },
]

const miniEngineFeatures = [
  'C++ Order Book',
  'Matching Engine',
  'Market Data Feed（socket）',
  'simple strategy (momentum / mean reversion)',
  'PnL calculation',
]
</script>

<style scoped>
.roadmap-wrap {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 4.5rem 2rem 6rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}
@keyframes card-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Title */
.page-title { margin-bottom: 2.4rem; }
.label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .22em;
  color: var(--mg-green-main);
  margin-bottom: .8rem;
}
.page-title h2 {
  font-family: var(--mg-font-heading);
  font-weight: 500;
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: var(--mg-green-deep);
  margin-bottom: .4rem;
}
.page-title .sub {
  font-family: var(--mg-font-body);
  font-style: italic;
  font-size: .95rem;
  color: var(--mg-text-muted);
}

/* Tier sections */
.tiers { display: flex; flex-direction: column; gap: 2.8rem; }
.tier-head { display: flex; align-items: center; gap: .7rem; margin-bottom: 1.2rem; }
.tier-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--mg-green-main); flex-shrink: 0; }
.tier.green .tier-dot { background: #5da038; }
.tier.yellow .tier-dot { background: #c9a227; }
.tier.red .tier-dot { background: #c14b3a; }
.tier-dot.brain { background: var(--mg-brown); }
.tier-dot.rocket { background: var(--mg-clay); }
.tier-head h3 {
  font-family: var(--mg-font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--mg-green-deep);
}

.repo-list { display: flex; flex-direction: column; gap: 1rem; }

.repo-card {
  display: block;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 18px;
  padding: 1.3rem 1.5rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 26px rgba(36,49,38,0.05);
  transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
}
.repo-card:hover {
  transform: translateY(-3px);
  border-color: var(--mg-border-hover);
  box-shadow: 0 16px 36px rgba(36,49,38,0.09);
}

.repo-top { display: flex; align-items: center; gap: .5rem; margin-bottom: .3rem; }
.repo-star { font-size: .9rem; }
.repo-name {
  flex: 1;
  font-family: var(--mg-font-heading);
  font-size: 1.08rem;
  font-weight: 600;
  color: var(--mg-green-deep);
}
.repo-arrow { color: var(--mg-green-main); transition: transform .25s; }
.repo-card:hover .repo-arrow { transform: translate(2px, -2px); }

.repo-url {
  font-family: 'Courier New', monospace;
  font-size: .78rem;
  color: var(--mg-text-muted);
  margin-bottom: .8rem;
  word-break: break-all;
}

.repo-learn {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: .35rem;
  margin-bottom: .4rem;
}
.repo-learn li {
  font-family: var(--mg-font-body);
  font-size: .9rem;
  color: var(--mg-text-body);
  padding-left: 1rem;
  position: relative;
}
.repo-learn li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--mg-green-main);
}

.repo-note {
  font-family: var(--mg-font-body);
  font-size: .84rem;
  font-style: italic;
  color: var(--mg-text-muted);
  margin-top: .5rem;
}

/* Order timeline */
.order-section { margin-top: 3.6rem; }
.order-intro {
  font-family: var(--mg-font-body);
  font-size: .92rem;
  color: var(--mg-text-body);
  margin-bottom: 1.6rem;
}
.timeline { position: relative; padding-left: 2.4rem; }
.timeline::before {
  content: '';
  position: absolute;
  left: 6px; top: 6px; bottom: 6px;
  width: 1px;
  background: var(--mg-divider);
}
.step { position: relative; padding-bottom: 2.2rem; }
.step:last-child { padding-bottom: 0; }
.marker { position: absolute; left: -2.4rem; top: 4px; width: 13px; height: 13px; display: flex; align-items: center; justify-content: center; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--mg-green-main); box-shadow: 0 0 0 4px var(--mg-bg-page); }
.step-title {
  display: block;
  font-family: var(--mg-font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--mg-green-deep);
  margin-bottom: .3rem;
}
.step-repos {
  font-family: var(--mg-font-body);
  font-size: .88rem;
  color: var(--mg-brown);
  margin-bottom: .3rem;
}
.step-goal {
  font-family: var(--mg-font-body);
  font-size: .9rem;
  color: var(--mg-text-body);
}

/* Fast-track */
.fast-track { margin-top: 3.6rem; }
.fast-card {
  background: linear-gradient(145deg, var(--mg-bg-green-soft) 0%, var(--mg-bg-card) 100%);
  border: 1.5px solid var(--mg-border-soft);
  border-radius: 20px;
  padding: 1.8rem 2rem;
  box-shadow: 0 8px 26px rgba(36,49,38,0.06);
}
.fast-lead {
  font-family: var(--mg-font-body);
  font-size: .95rem;
  color: var(--mg-text-body);
  margin-bottom: 1rem;
}
.fast-title {
  font-family: var(--mg-font-heading);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--mg-green-deep);
  margin-bottom: 1rem;
}
.fast-features {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-bottom: 1.2rem;
}
.fast-features li {
  font-family: var(--mg-font-body);
  font-size: .92rem;
  color: var(--mg-text-body);
  padding-left: 1.1rem;
  position: relative;
}
.fast-features li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--mg-green-main);
}
.fast-note {
  font-family: var(--mg-font-body);
  font-weight: 600;
  font-size: .95rem;
  color: var(--mg-clay);
}

@media (max-width: 640px) {
  .roadmap-wrap { padding: 3.5rem 1.4rem 4.5rem; }
  .repo-card { padding: 1.1rem 1.2rem; }
}
</style>

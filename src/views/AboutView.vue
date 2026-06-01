<template>
  <div class="about-wrap">

    <RouterLink to="/" class="back-link">‹ Back</RouterLink>

    <!-- ══ Hero ══ -->
    <div class="hero-card">
      <div class="hero-cover">
        <img :src="avatarUrl" alt="cuteHsu" class="hero-photo" />
        <div class="hero-cover-fade" />
      </div>
      <div class="hero-text">
        <h2 class="hero-name">Pei-Hsuan Hsu</h2>
        <p class="hero-title">M.S. in Computer Science, NCU</p>
        <p class="hero-title">B.A. in Japanese Literature, NTU</p>
        <div class="hero-rule" />
        <p class="hero-bio">
          Backend software engineer with hands-on experience in C++, C#, and Python.
          Skilled in Linux environments, database operations, and financial trading system development.
          Built systems involving smart orders, conditional orders, FIX Protocol, and Socket Servers.
          Graduate research focused on multi-robot path planning and scheduling algorithms.
        </p>
        <a href="mailto:wonderful102662@gmail.com" class="contact-link">
          ✉ wonderful102662@gmail.com
        </a>
      </div>
    </div>

    <!-- ══ Experience & Education ══ -->
    <section class="section">
      <div class="section-head">
        <span class="sh-line" /><span class="sh-icon">📋</span>
        <span class="sh-title">Experience &amp; Education</span>
        <span class="sh-icon">📋</span><span class="sh-line right" />
      </div>

      <div class="card-block combined-card">

        <div class="combined-label"><span class="combined-icon">💼</span> Work Experience</div>

        <!-- KGI Securities -->
        <div class="entry-block">
          <div class="card-main-title entry-line">Concord Securities Co. Ltd.</div>
          <div class="card-subtitle entry-line">Software Engineer</div>
          <div class="card-year entry-year-line">2025 / 4 — Present</div>
          <div class="entry-divider-light" />
          <ul class="card-list">
            <li>Smart order &amp; conditional order system development (Stop-Loss, Trailing Stop)</li>
            <li>FIX Protocol message parsing and FIX Message Parser development</li>
            <li>Socket Server / TCP communication architecture (C# / C++)</li>
            <li>Real-time quote matching and order state management</li>
          </ul>
        </div>

        <div class="entry-separator" />

        <!-- Delta Electronics -->
        <div class="entry-block">
          <div class="card-main-title entry-line">Delta Electronics</div>
          <div class="card-subtitle entry-line">Software Engineer</div>
          <div class="card-year entry-year-line">2024 / 10 — 2025 / 2</div>
          <div class="entry-divider-light" />
          <ul class="card-list">
            <li>Automotive ASPICE process implementation</li>
          </ul>
        </div>

        <div class="block-separator" />

        <div class="combined-label"><span class="combined-icon">📜</span> Education</div>

        <!-- NCU -->
        <div class="entry-block">
          <div class="card-main-title entry-line">National Central University</div>
          <div class="card-subtitle entry-line">M.S. in Computer Science</div>
          <div class="card-year entry-year-line">2022 / 9 — 2024 / 6</div>
          <div class="entry-divider-light" />
          <ul class="card-list">
            <li>Thesis: Multi-Robot Patrol Scheduling with Min-Max Latency on Trees</li>
            <li>2023 The League of Robot Runners Competition</li>
          </ul>
        </div>

        <div class="entry-separator" />

        <!-- NTU -->
        <div class="entry-block">
          <div class="card-main-title entry-line">National Taiwan University</div>
          <div class="card-subtitle entry-line">B.A. in Japanese Literature</div>
          <div class="card-year entry-year-line">2017 / 9 — 2022 / 1</div>
          <div class="entry-divider-light" />
          <ul class="card-list">
            <li>Sophomore: Started self-studying Python</li>
            <li>Junior: Self-studied data analysis &amp; C/C++</li>
            <li>Senior: Self-studied CS fundamentals (OS, algorithms, data structures)</li>
            <li>Gap Year: Prepared for CS graduate school entrance exam</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- ══ Tech Skills ══ -->
    <section class="section">
      <div class="section-head">
        <span class="sh-line" /><span class="sh-icon">⚔️</span>
        <span class="sh-title">Tech Skills</span>
        <span class="sh-icon">⚔️</span><span class="sh-line right" />
      </div>

      <div class="cards-col">

        <div class="card-block">
          <div class="card-category">Programming Languages</div>
          <div class="card-divider" />
          <ul class="card-list">
            <li>C / C++</li>
            <li>C#</li>
            <li>Python</li>
            <li>SQL</li>
            <li>Java</li>
            <li>JavaScript (basics)</li>
          </ul>
        </div>

        <div class="card-block">
          <div class="card-category">Backend &amp; System Development</div>
          <div class="card-divider" />
          <ul class="card-list">
            <li>RESTful API Development</li>
            <li>FastAPI</li>
            <li>Socket Server Development</li>
            <li>TCP/IP Communication</li>
            <li>FIX Protocol Message Parsing</li>
            <li>Multithreading</li>
            <li>Scheduling &amp; Background Service Development</li>
            <li>MSMQ Message Queue</li>
          </ul>
        </div>

        <div class="card-block">
          <div class="card-category">Database</div>
          <div class="card-divider" />
          <ul class="card-list">
            <li>MariaDB</li>
            <li>SQL Server</li>
            <li>Redis</li>
            <li>SQL Query &amp; Performance Tuning</li>
            <li>Stored Procedure Development</li>
            <li>Database Transaction Control</li>
          </ul>
        </div>

        <div class="card-block">
          <div class="card-category">Dev Environment &amp; Tools</div>
          <div class="card-divider" />
          <ul class="card-list">
            <li>Rocky Linux</li>
            <li>Git / GitLab</li>
            <li>Shell Script</li>
            <li>systemd Service Management</li>
            <li>Docker</li>
            <li>VM / Virtualization</li>
            <li>Google Test (GTest)</li>
            <li>SOCI Database Library</li>
          </ul>
        </div>

        <div class="card-block">
          <div class="card-category">Financial Trading System</div>
          <div class="card-divider" />
          <ul class="card-list">
            <li>Smart Order (Wisdom Order) System Development</li>
            <li>Conditional Order / Stop-Loss / Trailing Stop Logic</li>
            <li>FIX Message Parser Development</li>
            <li>Real-time Quote &amp; Matching Engine Logic</li>
            <li>Securities &amp; Futures Order Flow</li>
            <li>Order State Management</li>
          </ul>
        </div>

        <div class="card-block">
          <div class="card-category">Algorithms &amp; Research</div>
          <div class="card-divider" />
          <ul class="card-list">
            <li>Multi-Agent Path Finding (MAPF)</li>
            <li>Multi-Robot Path Planning</li>
            <li>Tree Structure Path Planning</li>
            <li>Graph Algorithms</li>
            <li>Machine Learning / Neural Network</li>
            <li>Big Data Analysis Fundamentals</li>
          </ul>
        </div>


      </div>
    </section>

    <!-- ══ Projects & Contests ══ -->
    <section class="section">
      <div class="section-head">
        <span class="sh-line" /><span class="sh-icon">🏆</span>
        <span class="sh-title">Projects &amp; Contests</span>
        <span class="sh-icon">🏆</span><span class="sh-line right" />
      </div>

      <div class="cards-col">

        <div class="card-block">
          <div class="card-top-row">
            <span class="card-year">2023</span>
            <span class="card-main-title">The League of Robot Runners</span>
          </div>
          <div class="card-subtitle">MAPF Competition · C++ · Python</div>
          <div class="card-divider" />
          <ul class="card-list">
            <li>Multi-robot path scheduling and robot delivery problem</li>
            <li>Planned collision-free paths for multiple robots across various maps and scales</li>
            <li>Challenges: real-time, high capacity, no collisions, lifelong scheduling</li>
          </ul>
        </div>

        <div class="card-block combined-card">
          <div class="entry-block">
            <div class="card-main-title entry-line">Handcrafted Neural Network — Autonomous Vehicle</div>
            <div class="card-subtitle entry-line">Python · Neural Network · GUI</div>
            <div class="card-year entry-year-line">Graduate Course</div>
            <div class="entry-divider-light" />
            <ul class="card-list">
              <li>Built a neural network from scratch using pure math (no frameworks)</li>
              <li>Used sensors to detect vehicle-wall distance and predict driving paths</li>
              <li>Designed a GUI to visualize experiment results</li>
            </ul>
          </div>

          <div class="entry-separator" />

          <div class="entry-block">
            <div class="card-main-title entry-line">Fingertip Pulse Oximeter</div>
            <div class="card-subtitle entry-line">Arduino · ESP32 · IoT</div>
            <div class="card-year entry-year-line">Embedded Systems Course</div>
            <div class="entry-divider-light" />
            <ul class="card-list">
              <li>Built a fingertip pulse oximeter using Arduino and ESP32</li>
              <li>Automatic alert when blood oxygen level drops below threshold</li>
            </ul>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const avatarUrl = import.meta.env.BASE_URL + 'avatar.jpg'
</script>

<style scoped>
.about-wrap {
  width: 100%;
  max-width: 720px;
  padding: 0 2rem 3rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}

/* ── Back ── */
.back-link {
  display: inline-block;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .75rem; letter-spacing: .15em;
  color: #4a3010; text-decoration: none; padding: .3rem 0; margin-bottom: 1.4rem;
  opacity: .8; transition: opacity .2s, color .2s;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}
.back-link:hover { opacity: 1; color: #1a0e00; }

/* ══ Hero ══ */
.hero-card {
  display: flex; flex-direction: column;
  background: linear-gradient(150deg, #fdf8ec, #f5ead0);
  border: 2px solid #c9a227; border-radius: 2px;
  box-shadow: 4px 4px 0 #6a5010, inset 0 1px 0 rgba(255,255,255,.85);
  margin-bottom: 2rem; position: relative; overflow: hidden;
}

/* 全寬照片容器 */
.hero-cover {
  position: relative; width: 100%;
}
.hero-photo {
  width: 100%; height: auto;
  display: block;
}
/* 底部漸層淡出，讓文字區塊自然銜接 */
.hero-cover-fade {
  position: absolute; bottom: 0; left: 0; right: 0; height: 60px;
  background: linear-gradient(to bottom, transparent, #fdf8ec);
  pointer-events: none;
}

.hero-text { padding: 1.2rem 1.8rem 1.8rem; }

.hero-name {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: clamp(1.2rem, 3.5vw, 1.7rem);
  color: #1a0e00; font-weight: 400;
  text-shadow: 0 1px 0 rgba(255,255,255,.9); margin-bottom: .2rem;
}
.hero-alias {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .8em; color: #6a4e10; font-weight: 400;
}
.hero-title {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .95rem; font-weight: 400; color: #3a2810; margin-bottom: .65rem;
}
.hero-rule {
  height: 1px; background: linear-gradient(90deg, #c9a227, transparent);
  margin-bottom: .65rem;
}
.hero-bio {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 1rem; font-weight: 400; line-height: 1.85;
  color: #1a1008; margin-bottom: .7rem;
}
.contact-link {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .7rem; font-weight: 400;
  letter-spacing: .08em; color: #4a3010; text-decoration: none;
  border-bottom: 1px solid #c9a227;
  transition: color .2s, border-color .2s;
}
.contact-link:hover { color: #8a6010; }

/* ══ Section ══ */
.section { margin-bottom: 2rem; }
.section-head {
  display: flex; align-items: center; gap: .6rem;
  margin-bottom: 1rem; justify-content: center;
}
.sh-line { flex: 1; max-width: 60px; height: 1px; background: linear-gradient(90deg, transparent, #c9a227); }
.sh-line.right { background: linear-gradient(90deg, #c9a227, transparent); }
.sh-icon { font-size: .85rem; }
.sh-title {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .68rem; font-weight: 400;
  letter-spacing: .3em; color: #4a3010; white-space: nowrap;
}

/* ══ Universal yellow pixel card ══ */
.cards-col { display: flex; flex-direction: column; gap: .75rem; }

.card-block {
  background: linear-gradient(145deg, #fdf8ec 0%, #f0e4c0 100%);
  border: 2px solid #c9a227;
  border-radius: 2px;
  box-shadow: 3px 3px 0 #6a5010, inset 0 1px 0 rgba(255,255,255,.85);
  padding: 1rem 1.25rem;
  transition: transform .2s, box-shadow .2s;
}
.card-block:hover {
  transform: translate(-1px,-1px);
  box-shadow: 4px 4px 0 #6a5010;
}

/* ── Card header rows ── */
.card-top-row {
  display: flex; align-items: baseline; gap: .7rem; margin-bottom: .3rem; flex-wrap: wrap;
}
.card-year {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .68rem; font-weight: 400;
  letter-spacing: .08em; color: #7a5010; white-space: nowrap;
  background: rgba(201,162,39,.18); border: 1px solid #c9a227;
  padding: .15rem .55rem; border-radius: 2px;
}
.card-main-title {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 1rem; font-weight: 400;
  letter-spacing: .04em; color: #1a0e00;
}
.card-subtitle {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .95rem;
  font-weight: 400; color: #1a0e00; margin-bottom: .4rem;
}
.card-category {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .85rem; font-weight: 400;
  letter-spacing: .1em; color: #1a0e00; margin-bottom: .4rem;
}
.card-divider {
  height: 1px;
  background: linear-gradient(90deg, #c9a227, transparent);
  margin-bottom: .65rem;
}

/* ── Card list ── */
.card-list {
  margin: 0; padding: 0;
  list-style: none;
  display: flex; flex-direction: column; gap: .3rem;
}
.card-list li {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 1rem; font-weight: 400;
  color: #1a1008; line-height: 1.5;
  padding-left: 1.1rem; position: relative;
}
.card-list li::before {
  content: '✦';
  position: absolute; left: 0; top: .05rem;
  font-size: .55rem; color: #c9a227;
}

/* ══ Combined card internals ══ */
.combined-card { padding: 1.25rem 1.4rem; }

.combined-label {
  display: flex; align-items: center; gap: .4rem;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .75rem; font-weight: 400;
  letter-spacing: .2em; color: #5a3808;
  margin-bottom: .9rem;
}
.combined-icon { font-size: 1rem; }

.entry-block { padding-left: .5rem; }

/* 每行獨立顯示 */
.entry-line {
  display: block;
  margin-bottom: .15rem;
}
.entry-year-line {
  display: inline-block;
  margin-top: .1rem;
  margin-bottom: .45rem;
}

.entry-divider-light {
  height: 1px;
  background: linear-gradient(90deg, rgba(201,162,39,.35), transparent);
  margin: .4rem 0 .6rem;
}

/* dotted line between two entries in the same sub-section */
.entry-separator {
  border-top: 1px dashed rgba(201,162,39,.4);
  margin: .9rem 0;
}

/* solid line between Work and Education blocks */
.block-separator {
  border-top: 2px solid rgba(201,162,39,.5);
  margin: 1.1rem 0;
}

/* ══ Languages ══ */
.lang-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.lang-name {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .9rem; font-weight: 400;
  color: #1a0e00; min-width: 36px;
}
.lang-level {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .95rem;
  font-weight: 400; color: #1a0e00; flex: 1;
}
.lang-bar {
  width: 140px; height: 7px; flex-shrink: 0;
  background: rgba(180,140,60,.18); border-radius: 2px; overflow: hidden;
}
.lang-fill { height: 100%; background: linear-gradient(90deg, #c9a227, #e8d060); border-radius: 2px; }

/* ══ Interests ══ */
.interest-inline {
  display: flex; align-items: flex-start; gap: 1rem;
}
.interest-icon { font-size: 1.6rem; flex-shrink: 0; }
.interest-name {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .85rem; font-weight: 400;
  letter-spacing: .06em; color: #1a0e00; margin-bottom: .2rem;
}
.interest-desc {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .97rem;
  font-weight: 400; color: #1a0e00; line-height: 1.5;
}

@media (max-width: 520px) {
  .about-wrap { padding: 0 1rem 3rem; }
  .hero-cover { width: 100%; }
  .hero-text { padding: 1rem 1.2rem 1.4rem; }
  .hero-rule { background: linear-gradient(90deg, transparent, #c9a227, transparent); }
}
</style>

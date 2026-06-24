<template>
  <div class="research-wrap">

    <!-- Back -->
    <RouterLink to="/programming" class="back-link">‹ Programming</RouterLink>

    <!-- Page title -->
    <div class="page-title">
      <h2>碩士研究</h2>
      <p>多智體路徑規劃 · Multi-Agent Path Finding (MAPF)</p>
    </div>

    <!-- Research context -->
    <div class="context-card">
      <p>
        研究方向為<strong>多智體路徑規劃（MAPF）</strong>，解決多個機器人在同一空間內，
        如何同時找到各自的最佳路徑而不互相碰撞的問題。
        參與 <a href="https://www.leagueofrobotrunners.org/" target="_blank" rel="noopener">League of Robot Runners</a> 國際競賽，
        開發高效的 MAPF 演算法。
      </p>
    </div>

    <!-- Projects -->
    <div class="projects">

      <!-- ── Start-Kit ── -->
      <div class="project-card">
        <div class="project-header">
          <div class="project-icon">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="28" height="28" rx="4"
                    fill="rgba(74,138,88,.15)" stroke="#4a8a58" stroke-width="1.5"/>
              <path d="M11 14 L16 18 L11 22" stroke="#4a8a58" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="18" y1="22" x2="26" y2="22" stroke="#4a8a58" stroke-width="2"
                    stroke-linecap="round"/>
            </svg>
          </div>
          <div class="project-title-wrap">
            <h3 class="project-title">Start-Kit</h3>
            <span class="project-sub">競賽啟動包 · MAPF Planner Framework</span>
          </div>
          <a href="https://github.com/alenhsu1120/Start-Kit"
             target="_blank" rel="noopener" class="github-btn">
            <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </a>
        </div>

        <p class="project-desc">
          提供完整的 C++ / Python 框架，讓參賽者專注於實作 MAPF 路徑規劃演算法。
          只需修改 <code>MAPFPlanner.cpp</code> 即可完成參賽準備。
        </p>

        <div class="features">
          <h4>核心功能</h4>
          <ul>
            <li>🧩 <span>C++ 框架 + Python 介面（pybind11），支援雙語言開發</span></li>
            <li>🐳 <span>Docker 容器化測試環境，確保跨平台一致性</span></li>
            <li>🔄 <span>版本升級機制，自動保留參賽者程式碼不被覆蓋</span></li>
            <li>🗺️ <span>支援自訂地圖與多種範例問題集</span></li>
            <li>💻 <span>跨平台支援：Linux / macOS / Windows (WSL)</span></li>
          </ul>
        </div>

        <div class="tech-stack">
          <span class="badge cpp">C++</span>
          <span class="badge python">Python</span>
          <span class="badge">pybind11</span>
          <span class="badge">CMake</span>
          <span class="badge">Docker</span>
          <span class="badge">Boost</span>
        </div>
      </div>

      <!-- ── PlanViz ── -->
      <div class="project-card">
        <div class="project-header">
          <div class="project-icon">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="30" height="30" rx="4"
                    fill="rgba(74,138,88,.15)" stroke="#4a8a58" stroke-width="1.5"/>
              <!-- Grid -->
              <line x1="3" y1="12" x2="33" y2="12" stroke="#4a8a58" stroke-width=".8" opacity=".4"/>
              <line x1="3" y1="21" x2="33" y2="21" stroke="#4a8a58" stroke-width=".8" opacity=".4"/>
              <line x1="12" y1="3" x2="12" y2="33" stroke="#4a8a58" stroke-width=".8" opacity=".4"/>
              <line x1="21" y1="3" x2="21" y2="33" stroke="#4a8a58" stroke-width=".8" opacity=".4"/>
              <!-- Agent paths -->
              <circle cx="7.5"  cy="7.5"  r="2.5" fill="#5da038"/>
              <path d="M7.5 7.5 L7.5 16.5 L16.5 16.5" stroke="#5da038" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="25.5" cy="7.5"  r="2.5" fill="#4a8a58"/>
              <path d="M25.5 7.5 L25.5 16.5 L16.5 16.5" stroke="#4a8a58" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="16.5" cy="16.5" r="3" fill="rgba(220,100,100,.8)" stroke="#cc4444" stroke-width="1"/>
            </svg>
          </div>
          <div class="project-title-wrap">
            <h3 class="project-title">PlanViz</h3>
            <span class="project-sub">路徑視覺化工具 · Multi-Robot Path Visualizer</span>
          </div>
          <a href="https://github.com/alenhsu1120/PlanViz"
             target="_blank" rel="noopener" class="github-btn">
            <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </a>
        </div>

        <p class="project-desc">
          以 Python tkinter 實作的離線互動式 GUI，用於視覺化分析多機器人協調路徑方案。
          可載入 JSON 格式的規劃結果，逐步回放機器人移動過程。
        </p>

        <div class="features">
          <h4>核心功能</h4>
          <ul>
            <li>🗺️ <span>格網式機器人移動視覺化，支援任意地圖</span></li>
            <li>📋 <span>任務分配顯示，清楚呈現每個機器人的目標</span></li>
            <li>⚠️ <span>碰撞 / 逾時高亮標記，快速定位問題點</span></li>
            <li>▶️ <span>播放控制（播放 / 暫停 / 逐步 / 跳躍）</span></li>
            <li>🔍 <span>互動式錯誤檢查，點選個別機器人查看詳情</span></li>
          </ul>
        </div>

        <div class="tech-stack">
          <span class="badge python">Python 3.10+</span>
          <span class="badge">tkinter</span>
          <span class="badge">JSON</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.research-wrap {
  width: 100%;
  max-width: 860px;
  padding: 0 2rem 2rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}

/* Back */
.back-link {
  display: inline-block;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .75rem; letter-spacing: .15em;
  color: #3d5440; text-decoration: none;
  padding: .3rem 0; margin-bottom: 1.4rem;
  opacity: .75; transition: opacity .2s, color .2s;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}
.back-link:hover { opacity: 1; color: #1b3a28; }

/* Title */
.page-title { margin-bottom: 1.2rem; }
.page-title h2 {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  color: #162a1e;
  text-shadow: 0 1px 0 rgba(255,255,255,.9), 0 2px 10px rgba(255,255,255,.5);
  margin-bottom: .3rem;
}
.page-title p {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-style: italic; font-size: .95rem; color: #6a8870;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}

/* Context box */
.context-card {
  padding: .9rem 1.2rem;
  background: rgba(250,253,250,.75);
  border-left: 3px solid #4a8a58;
  border-radius: 0 4px 4px 0;
  margin-bottom: 1.6rem;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .95rem; line-height: 1.7; color: #3d5440;
  backdrop-filter: blur(2px);
}
.context-card strong { color: #162a1e; }
.context-card a { color: #4a8a58; border-bottom: 1px solid #b8d8be; }
.context-card a:hover { color: #4a8a58; border-color: #4a8a58; }

/* Projects */
.projects { display: flex; flex-direction: column; gap: 1.2rem; }

/* Project card */
.project-card {
  background: linear-gradient(145deg, #ffffff 0%, #f6fbf6 100%);
  border: 1.5px solid #b8d8be;
  border-radius: 14px;
  padding: 1.4rem 1.6rem;
  box-shadow: 0 2px 12px rgba(27,58,40,0.08), 0 1px 3px rgba(27,58,40,0.04);
  position: relative;
  overflow: hidden;
}
.project-card::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 28px,
    rgba(74,138,88,.04) 28px, rgba(74,138,88,.04) 29px);
  border-radius: 14px; pointer-events: none;
}

/* Project header row */
.project-header {
  display: flex; align-items: center; gap: 1rem;
  margin-bottom: 1rem; flex-wrap: wrap;
}
.project-icon {
  flex-shrink: 0; width: 46px; height: 46px;
  border-radius: 10px;
  border: 1.5px solid #b8d8be;
  background: radial-gradient(circle at 38% 32%,
    rgba(200,235,210,.55) 0%, rgba(150,200,165,.2) 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 6px rgba(27,58,40,.1), inset 0 1px 2px rgba(255,255,255,.6);
}
.project-icon svg { width: 26px; height: 26px; }

.project-title-wrap { flex: 1; min-width: 0; }
.project-title {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 1.1rem; font-weight: 400;
  color: #162a1e; margin-bottom: .15rem;
}
.project-sub {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-style: italic; font-size: .85rem; color: #6a8870;
}

/* GitHub button */
.github-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .35rem .85rem;
  background: linear-gradient(135deg, #4a8a58, #2d6040); color: #ffffff;
  border-radius: 4px; text-decoration: none;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .7rem; letter-spacing: .08em;
  transition: background .2s, transform .2s;
  flex-shrink: 0;
}
.github-btn svg { width: 14px; height: 14px; }
.github-btn:hover { background: linear-gradient(135deg, #3d7a4c, #2d6040); transform: translateY(-1px); }

/* Description */
.project-desc {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .96rem; line-height: 1.7; color: #3d5440;
  margin-bottom: 1rem;
}
.project-desc code {
  background: rgba(74,138,88,.15);
  padding: .1rem .4rem; border-radius: 3px;
  font-size: .88em; color: #2d6040;
  font-family: 'Courier New', monospace;
}

/* Features */
.features { margin-bottom: 1rem; }
.features h4 {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .72rem; letter-spacing: .2em;
  color: #2d6040; margin-bottom: .6rem;
  text-transform: uppercase;
}
.features ul {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: .45rem;
}
.features li {
  display: flex; align-items: baseline; gap: .5rem;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .93rem; color: #3d5440; line-height: 1.5;
}
.features li span { flex: 1; }

/* Tech badges */
.tech-stack {
  display: flex; flex-wrap: wrap; gap: .4rem;
  margin-top: .2rem;
}
.badge {
  padding: .2rem .65rem;
  border-radius: 20px;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .65rem; letter-spacing: .06em;
  background: rgba(74,138,88,.15);
  border: 1px solid rgba(74,138,88,.35);
  color: #2d6040;
}
.badge.cpp    { background: rgba(0,89,156,.1);  border-color: rgba(0,89,156,.3);  color: #005b9c; }
.badge.python { background: rgba(55,118,171,.1); border-color: rgba(55,118,171,.3); color: #3776ab; }

@media (max-width:580px) {
  .project-header { flex-direction: column; align-items: flex-start; }
  .github-btn { align-self: flex-start; }
}
</style>

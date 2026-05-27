# 🗡️ 薩爾達：曠野之息 網站改版作業流程

> 記錄 Claude 將 Vue 3 個人網站改造成 BotW 風格的完整過程

---

## 📋 改版目標

將原本預設的 Vue 3 + Vite 網站，改造成**薩爾達傳說：曠野之息**的 Sheikah Slate 風格。

---

## 🔍 第一步：分析現有程式碼

### 1-1 確認分支狀態
```
gh-pages  ← 目前部署版本（已編譯的靜態檔）
main      ← 原始碼（需在這裡改）
```

### 1-2 讀取所有來源檔案
從 `origin/main` 讀取以下檔案，了解現有結構：

| 檔案 | 內容 |
|------|------|
| `src/App.vue` | 主版面：header + HelloWorld + TheWelcome |
| `src/components/HelloWorld.vue` | 顯示標題 "hello this is cuteHsu!" |
| `src/components/TheWelcome.vue` | 4 個導覽卡片（Life Journal 等） |
| `src/components/WelcomeItem.vue` | 單張卡片元件（icon + 標題 + 內容）|
| `src/assets/base.css` | 顏色變數 |
| `src/assets/main.css` | 全域樣式 |
| `index.html` | 頁面入口 |

---

## 🌿 第二步：切換到 main 分支

```bash
git stash -u                    # 暫存未追蹤的檔案
git checkout -b main origin/main  # 建立本地 main 分支
```

---

## 🎨 第三步：設計主題規劃

### 色彩系統
| 變數 | 色碼 | 用途 |
|------|------|------|
| `--botw-cyan` | `#4af9f9` | Sheikah 青色（邊框、發光）|
| `--botw-gold` | `#c9a227` | 海拉魯金（標題、三角神力）|
| `--botw-parchment` | `#f5e6c8` | 古卷皮紙色（內文）|
| `--botw-void` | `#030810` | 深宇宙黑（背景）|

### 字型
- **標題：** Cinzel Decorative（Google Fonts，古代銘文感）
- **內文：** Cormorant Garamond（Google Fonts，優雅手寫體）

### 動畫
| 動畫名稱 | 效果 |
|----------|------|
| `sheikah-pulse` | 邊框藍光脈動 |
| `wisp-float` | 精靈光點漂浮 |
| `twinkle` | 星星閃爍 |
| `eye-rotate` | Sheikah Eye 外圈旋轉 |
| `triforce-shimmer` | 三角神力閃光 |
| `title-reveal` | 標題淡入展開 |
| `card-rise` | 卡片向上浮現 |

---

## ✏️ 第四步：逐一修改檔案

### 4-1 `index.html`
- 修改 `<title>` 為「cuteHsu — 海拉魯傳送門」
- 加入 Google Fonts：Cinzel Decorative + Cormorant Garamond

### 4-2 `src/assets/base.css`
- 完全重寫色彩變數系統
- 移除原本的 light/dark mode 自動切換
- 改為永遠是深色的 BotW 主題

### 4-3 `src/assets/main.css`
- 定義全部 `@keyframes` 動畫
- 設定全域背景、捲軸樣式

### 4-4 `src/App.vue`（最大改動）
**新增元素：**
- JavaScript 生成 90 顆隨機星星（位置、大小、閃爍速度）
- JavaScript 生成 18 個漂浮精靈光點
- SVG 海拉魯山脈剪影（兩層遠近山）
- Sheikah Eye SVG（旋轉外圈 + 杏眼 + 瞳孔 + 淚滴 + 翼刃）
- 三角神力 SVG
- 古代符文裝飾分隔線

### 4-5 `src/components/HelloWorld.vue`
- h1 改用 Cinzel Decorative，金色發光
- h3 改為斜體 Cormorant Garamond

### 4-6 `src/components/WelcomeItem.vue`
- 完全重寫為「符文卡片」樣式
- 四角金色裝飾邊框
- 懸停時青色光暈動畫
- 圓形 icon 背景，帶徑向漸層

### 4-7 `src/components/TheWelcome.vue`
- 移除舊的圖示元件 import
- 改用 inline SVG 手繪圖示：
  - 📖 Life Journal → 羊皮卷 + 羽毛筆
  - ⚔️ Game Log → 盾牌 + 劍
  - 💻 Programming → 終端機視窗
  - 👁️ Psychology → Sheikah Eye 小圖
- 2 欄響應式 Grid 佈局
- 卡片依序延遲進場動畫

---

## 🔨 第五步：編譯與部署

### 遇到的問題
```
Error: crypto.hash is not a function
原因：系統預設 Node.js v18，但 Vite 7 需要 v20+
```

### 解決方式
```bash
# 使用 nvm 切換到 Node v22
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 22
```

### 執行部署
```bash
pnpm run deploy
# 等同於：pnpm run build && gh-pages -d dist
```

**輸出：**
```
✓ 21 modules transformed.
dist/index.html         0.85 kB
dist/assets/*.css      11.77 kB
dist/assets/*.js       71.59 kB
✓ built in 2.21s
Published              ← 部署成功
```

---

## 📤 第六步：提交原始碼

```bash
git add -A
git commit -m "redesign: Zelda Breath of the Wild Sheikah Slate theme"
git push origin main
```

---

## ✅ 最終結果

| 項目 | 狀態 |
|------|------|
| 網站網址 | https://alenhsu1120.github.io/mywebsit/ |
| main branch | ✅ 原始碼已推送 |
| gh-pages branch | ✅ 靜態檔已推送 |
| GitHub Actions | ✅ `pages build and deployment` 完成 |

---

## 📁 修改的檔案清單

```
mywebsit/
├── index.html                          ← 改標題 + 加 Google Fonts
├── src/
│   ├── App.vue                         ← 全新 BotW 主版面
│   ├── assets/
│   │   ├── base.css                    ← BotW 色彩變數系統
│   │   └── main.css                    ← 動畫 + 全域樣式
│   └── components/
│       ├── HelloWorld.vue              ← 金色發光標題
│       ├── TheWelcome.vue              ← 符文卡片網格
│       └── WelcomeItem.vue             ← 單張符文卡片元件
└── docs/
    ├── redesign-process.md             ← 本文件
    └──操作手冊.md                      ← 使用者操作說明
```

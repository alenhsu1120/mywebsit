# 網站圖片資料夾

網頁上用到的所有照片、插圖都放在這裡（`public/images/`），依用途分子資料夾：

| 資料夾 | 用途 |
| --- | --- |
| `profile/` | 個人頭像（About 頁） |
| `portfolio/` | 作品集首頁（Hero 照片等） |
| `runner/` | Runner 頁照片 |
| `travel/food/` | 旅遊頁美食照片 |
| `journal/` | 日記 / 感情紀錄的插畫與照片 |
| `misc/` | 其他、暫時沒用到的圖 |

## 在程式裡怎麼引用

網站有設定 `base: '/mywebsit/'`，所以路徑一律用 `BASE_URL` 開頭，不要寫死 `/images/...`：

```ts
const photo = import.meta.env.BASE_URL + 'images/profile/avatar.jpg'
```

## 命名建議

- 檔名用小寫英文、數字、`-`，例如 `tokyo-tower-night.jpg`
- 副檔名用小寫（`.jpg` 而不是 `.JPG`）
- 大張照片上傳前先壓縮（寬 2000px 以內通常就夠）

# LINE 官方帳號整合指南

## 概述

本指南將協助你將 BBingV 跨平台互惠接案系統整合到 LINE 官方帳號的多圖選單中。

---

## 前置準備

### 1. 建立 LINE 官方帳號

1. 進入 [LINE Official Account Manager](https://manager.line.biz/)
2. 登入或建立帳號
3. 點擊「建立新帳號」
4. 填寫帳號資訊並完成設置

### 2. 取得 Channel ID 和 Channel Secret

1. 在 Official Account Manager 中，進入「設定」
2. 在「Messaging API" 部分找到：
   - **Channel ID** - 用於識別你的官方帳號
   - **Channel Secret** - 用於安全驗證
3. 複製這些值到 `.env` 檔案

---

## 設定多圖選單

### 1. 設計選單圖片

**推薦規格**:
- 尺寸: 2500 x 1686 px
- 格式: PNG 或 JPG
- 檔案大小: 不超過 1MB

**設計內容**: 包含以下四個區域
- 左上: 帳號登記 (1️⃣)
- 右上: 報名案件 (2️⃣)
- 左下: 篇數統計 (3️⃣)
- 右下: 合約簽署 (4️⃣)

### 2. 上傳多圖選單

在 Official Account Manager 中:

1. 進入「功能" → "多圖選單"
2. 點擊「新建"  
3. 上傳你的設計圖片
4. 設定各區域連結

---

## 選單區域設定

### 區域 1: 帳號登記 (1️⃣)

**類型**: Postback

```
Action Data: action=register
Display Text: 帳號登記
Website URL: https://your-domain.com/register.html
```

---

### 區域 2: 報名案件 (2️⃣)

**類型**: Postback

```
Action Data: action=browse_cases
Display Text: 報名案件
Website URL: https://your-domain.com/cases.html
```

---

### 區域 3: 篇數統計 (3️⃣)

**類型**: Postback

```
Action Data: action=view_stats
Display Text: 篇數統計
Website URL: https://your-domain.com/stats.html
```

---

### 區域 4: 合約簽署 (4️⃣)

**類型**: Postback

```
Action Data: action=sign_contract
Display Text: 合約簽署
Website URL: https://your-domain.com/contract.html
```

---

## 設定 Webhook

### 1. 在官方帳號管理器中

1. 進入「設定" → "Webhook"
2. 輸入你的 Webhook URL:
   ```
   https://your-domain.com/api/line/webhook
   ```
3. 點擊「驗證" 進行連線測試
4. 啟用 Webhook

### 2. Webhook 驗證

LINE 會發送驗證請求。確保你的伺服器能處理:

```javascript
// backend/routes/line.js
router.post('/webhook', (req, res) => {
  const events = req.body.events;
  
  events.forEach(event => {
    if (event.type === 'postback') {
      console.log('Action:', event.postback.data);
      // 根據 action 進行相應操作
    }
  });
  
  res.json({ success: true });
});
```

---

## 部署步驟

### 1. 準備伺服器

```bash
# 安裝依賴
npm install

# 設定環境變數
cp .env.example .env
# 編輯 .env 填入真實值

# 啟動伺服器
npm start
```

### 2. 設定 HTTPS

LINE Webhook 需要 HTTPS。推薦選項:

- **Vercel** (推薦)
  ```bash
  npm install -g vercel
  vercel --prod
  ```

- **Heroku**
  ```bash
  heroku login
  heroku create your-app-name
  git push heroku main
  ```

- **自有伺服器** (使用 Nginx + SSL)

### 3. 更新環境變數

更新 `.env` 檔案中的:

```
LINE_CHANNEL_ID=your_channel_id
LINE_CHANNEL_SECRET=your_channel_secret
```

---

## 測試多圖選單

1. 在 Official Account Manager 中預覽多圖選單
2. 在手機上加入官方帳號
3. 測試點擊各個區域是否導向正確的頁面
4. 驗證 Postback 事件是否被正確接收

---

## 常見問題

### Q: 多圖選單無法顯示?
A: 檢查圖片尺寸和檔案大小。確保圖片符合規格 (2500x1686 px, <1MB)

### Q: 連結無法打開?
A: 確保你的域名有效且可公開訪問。如在開發環境，使用 ngrok 進行本地測試。

### Q: Webhook 未收到事件?
A: 檢查 Webhook URL 是否正確，並確保伺服器正在運行。

---

## 本地測試 (使用 ngrok)

```bash
# 安裝 ngrok
brew install ngrok  # macOS
# 或從 https://ngrok.com/download 下載

# 啟動 ngrok
ngrok http 3000

# 複製生成的 URL (例如: https://xxxx-xx-xxx-xxx.ngrok.io)

# 在 Official Account Manager 中設定 Webhook URL
# https://xxxx-xx-xxx-xxx.ngrok.io/api/line/webhook
```

---

## 下一步

1. ✅ 完成多圖選單設定
2. ✅ 測試所有功能
3. ✅ 監控 Webhook 日誌
4. ✅ 收集用戶反饋
5. ✅ 持續優化和改進

---

## 更多資源

- [LINE Official Account Manager](https://manager.line.biz/)
- [LINE Messaging API 文檔](https://developers.line.biz/en/docs/messaging-api/)
- [Rich Menu 文檔](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/)

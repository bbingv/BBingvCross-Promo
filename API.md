# BBingV 跨平台互惠接案系統 - API 文檔

## 基本信息

**基礎 URL**: `http://localhost:3000/api`

**認證**: JWT Token (header: `Authorization: Bearer <token>`)

---

## 認證 API

### 1. 使用者註冊

**端點**: `POST /auth/register`

**請求**:
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "使用者名稱"
}
```

**回應**:
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "使用者名稱"
  }
}
```

---

### 2. 使用者登入

**端點**: `POST /auth/login`

**請求**:
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**回應**: 同上

---

### 3. 驗證 Token

**端點**: `GET /auth/verify`

**認證**: 需要

**回應**:
```json
{
  "valid": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

---

## 創作者 API

### 1. 登記創作者帳號

**端點**: `POST /creators/register-accounts`

**認證**: 需要

**請求**:
```json
{
  "creatorId": "creator_123",
  "name": "創作者名稱",
  "email": "creator@example.com",
  "accounts": [
    {
      "platform": "threads",
      "username": "@username",
      "url": "https://threads.net/@username"
    },
    {
      "platform": "instagram",
      "username": "@username",
      "url": "https://instagram.com/username"
    },
    {
      "platform": "dcard",
      "username": "username",
      "url": "https://dcard.tw/profiles/username"
    }
  ]
}
```

**回應**:
```json
{
  "success": true,
  "message": "Creator accounts registered successfully",
  "creator": { ... }
}
```

---

### 2. 取得創作者檔案

**端點**: `GET /creators/:creatorId`

**回應**:
```json
{
  "success": true,
  "creator": {
    "creatorId": "creator_123",
    "name": "創作者名稱",
    "email": "creator@example.com",
    "accounts": [ ... ],
    "completedCases": 5
  }
}
```

---

### 3. 更新創作者帳號

**端點**: `PUT /creators/:creatorId/accounts`

**認證**: 需要

**請求**:
```json
{
  "accounts": [ ... ]
}
```

---

## 案件 API

### 1. 建立案件

**端點**: `POST /cases`

**認證**: 需要 (管理員)

**請求**:
```json
{
  "title": "案件名稱",
  "description": "案件描述",
  "platforms": ["threads", "instagram"],
  "deadline": "2024-12-31",
  "compensation": "5000-10000元"
}
```

---

### 2. 取得所有案件

**端點**: `GET /cases`

**查詢參數**:
- `status`: open, completed, all

**回應**:
```json
{
  "success": true,
  "count": 10,
  "cases": [ ... ]
}
```

---

### 3. 取得單一案件

**端點**: `GET /cases/:caseId`

---

### 4. 報名案件

**端點**: `POST /cases/:caseId/apply`

**認證**: 需要

**請求**:
```json
{
  "creatorId": "creator_123",
  "creatorName": "創作者名稱",
  "email": "creator@example.com"
}
```

---

### 5. 接受報名申請

**端點**: `POST /cases/:caseId/accept/:applicantIndex`

**認證**: 需要 (管理員)

---

### 6. 完成案件

**端點**: `POST /cases/:caseId/complete`

**認證**: 需要 (管理員)

---

## 合約 API

### 1. 上傳合約

**端點**: `POST /contracts/upload`

**認證**: 需要 (管理員)

**請求**:
```json
{
  "title": "合約標題",
  "content": "合約內容...",
  "caseId": "case_123"
}
```

---

### 2. 取得合約

**端點**: `GET /contracts/:contractId`

---

### 3. 簽署合約

**端點**: `POST /contracts/:contractId/sign`

**認證**: 需要

**請求**:
```json
{
  "creatorId": "creator_123",
  "creatorName": "創作者名稱",
  "signatureData": "base64_encoded_signature"
}
```

---

### 4. 取得簽署狀態

**端點**: `GET /contracts/:contractId/signings`

---

## 統計 API

### 1. 取得創作者統計

**端點**: `GET /stats/creator/:creatorId`

**回應**:
```json
{
  "success": true,
  "stats": {
    "totalCasesCompleted": 5,
    "totalCasesInProgress": 2,
    "totalCasesApplied": 8,
    "totalCompensation": 50000,
    "accounts": { ... }
  }
}
```

---

### 2. 取得平台統計

**端點**: `GET /stats/platform`

---

### 3. 取得儀表板概覽

**端點**: `GET /stats/dashboard/overview`

---

## 錯誤代碼

| 代碼 | 說明 |
|------|------|
| 200 | 成功 |
| 201 | 已建立 |
| 400 | 請求錯誤 |
| 401 | 未授權 |
| 404 | 未找到 |
| 409 | 衝突 |
| 500 | 伺服器錯誤 |

---

## 範例

### 完整工作流程

1. **註冊並登入**
   ```bash
   POST /auth/register
   ```

2. **登記帳號**
   ```bash
   POST /creators/register-accounts
   ```

3. **瀏覽案件**
   ```bash
   GET /cases
   ```

4. **報名案件**
   ```bash
   POST /cases/{caseId}/apply
   ```

5. **簽署合約**
   ```bash
   POST /contracts/{contractId}/sign
   ```

6. **查看統計**
   ```bash
   GET /stats/creator/{creatorId}
   ```

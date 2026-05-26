# 完整部署指南 🚀

給團隊負責人（你）的詳細部署說明。

---

## 📋 前置準備

確保你有以下帳號：
- ✅ GitHub 帳號 https://github.com
- ✅ Cloudflare 帳號 https://dash.cloudflare.com
- ✅ Vercel 帳號 https://vercel.com
- ✅ Anthropic API Key https://console.anthropic.com/account/keys

---

## 🎯 部署流程（共 5 個步驟，15-20 分鐘）

### **Step 1：建立 GitHub Repository**

1. 登入 GitHub
2. 點右上角「+」→「New repository」
3. 填入：
   - **Repository name**：`wechat-message-manager`
   - **Description**：微信訊息管理系統
   - **Public / Private**：選 Public（方便同事存取）
   - 勾選「Add a README file」
4. 點「Create repository」

### **Step 2：上傳程式碼到 GitHub**

#### 方式 A：用 GitHub Web 介面（推薦新手）

1. 進入你新建的 repo
2. 點「Add file」→「Upload files」
3. 選擇這些檔案拖進去：
   - `wechat-manager.html`
   - `worker.js`
   - `vercel.json`
   - `.gitignore`
4. 下方「Commit changes」→「Commit changes」

#### 方式 B：用 Git 命令（推薦開發者）

```bash
# 在本地資料夾
git init
git add .
git commit -m "初始化微信訊息管理系統"
git branch -M main
git remote add origin https://github.com/your-username/wechat-message-manager.git
git push -u origin main
```

### **Step 3：部署 Cloudflare Worker**

1. 登入 https://dash.cloudflare.com
2. 左側選「Workers & Pages」
3. 點「Create Application」→「Create Worker」
4. 點「Start with Hello World!」
5. 在編輯器裡：
   - 清空所有程式碼（Ctrl+A）
   - 複製 GitHub 上的 `worker.js` 全部內容
   - 貼進編輯器（Ctrl+V）
6. 右上角點「Save and Deploy」
7. 進「Settings」→「Variables」：
   - 新增 `CLAUDE_API_KEY`
   - 值填：你的 Anthropic API Key（`sk-ant-...`）
   - 點「Save」
8. 複製你的 **Worker URL**，格式像：
   ```
   https://wechat-manager-xxx.your-account.workers.dev
   ```
   **儲存這個 URL，待會會用到！**

### **Step 4：部署 Vercel（自動部署 HTML）**

1. 登入 https://vercel.com
2. 點「Add New...」→「Project」
3. 選「Import Git Repository」
4. 搜尋你的 repo：`wechat-message-manager`
5. 點「Import」
6. Vercel 設定頁面：
   - **Framework Preset**：Other
   - 其他保持預設
   - 點「Deploy」
7. 等待部署完成（通常 1-2 分鐘）
8. 複製你的 **Vercel URL**，格式像：
   ```
   https://wechat-manager.vercel.app
   ```

### **Step 5：連接 Worker 和 HTML**

1. 打開你的 Vercel 網址：`https://wechat-manager.vercel.app`
2. 點「匯入訊息」按鈕
3. 看到藍色「設定 Cloudflare Worker」提示框
4. 在輸入框貼入你的 **Worker URL**（Step 3 複製的）
5. 點「儲存」
6. ✅ 完成！現在你可以開始測試了

---

## ✅ 部署檢查清單

- [ ] GitHub repo 已建立並上傳程式碼
- [ ] Cloudflare Worker 已部署，API Key 已設定
- [ ] Worker URL 複製並儲存
- [ ] Vercel 已部署，得到線上網址
- [ ] HTML 頁面已填入 Worker URL
- [ ] 測試貼入一段微信訊息，AI 解析成功

---

## 🔗 分享給同事

部署完成後，只需給同事這個網址：
```
https://wechat-manager.vercel.app
```

他們打開即可使用，無需額外設定！

---

## 🆘 常見問題排查

### 問題 1：Worker 部署後 API Key 未設定

**症狀**：點「AI 解析並儲存」時出現「CLAUDE_API_KEY not set」

**解決**：
1. 回到 Cloudflare Worker 頁面
2. 進「Settings」→「Variables」
3. 確認已正確填入 `CLAUDE_API_KEY`
4. 刷新頁面重試

### 問題 2：HTML 頁面無法連接到 Worker

**症狀**：解析失敗，提示「Failed to fetch」

**解決**：
1. 確認 Worker URL 正確（無多餘空格）
2. 確認 Worker 已 Deploy（Cloudflare 頁面看得到 URL）
3. 在匯入視窗重新輸入 Worker URL 並儲存
4. 清除瀏覽器快取（Ctrl+Shift+Delete）後重試

### 問題 3：Vercel 無法自動部署

**症狀**：Vercel 顯示部署失敗

**解決**：
1. 檢查 GitHub repo 是否已上傳 `vercel.json`
2. 在 Vercel 頁面重新點「Redeploy」
3. 若仍失敗，檢查 Deployment Logs

### 問題 4：同事打開網址看不到內容

**症狀**：頁面空白或無法載入

**解決**：
1. 清除瀏覽器快取
2. 用無痕模式（隱私模式）開啟
3. 等待 5 分鐘後重試（Vercel 部署可能還在進行）

---

## 📞 技術支持

遇到問題？

1. 檢查上方「常見問題排查」
2. 查看 Cloudflare / Vercel 的 Logs
3. 聯絡 Claude 或團隊技術人員

---

## 🎉 成功標誌

當你看到這些，表示一切就緒：

✅ 打開 https://wechat-manager.vercel.app  
✅ 貼入測試微信訊息  
✅ 點「AI 解析並儲存」  
✅ 成功新增一筆紀錄  
✅ 搜尋功能正常運作  

恭喜！系統已可供團隊使用！ 🎊


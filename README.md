# LINE 模擬對話產生器 (FakeDetail)

這是一個基於 **React 19** 和 **Vite** 開發的開源工具，旨在幫助使用者快速生成高品質的 LINE 聊天介面模擬截圖。

## 🚀 核心架構與技術棧

本專案採用現代化的前端技術棧，確保開發效率與執行效能：

- **框架**: [React 19](https://react.dev/) - 使用最新版本的 React 提供流暢的 UI 互動。
- **構建工具**: [Vite 8](https://vitejs.dev/) - 極速的開發環境與高效的打包流程。
- **語言**: [TypeScript](https://www.typescriptlang.org/) - 確保程式碼的型別安全與可維護性。
- **樣式**: **Vanilla CSS (CSS Variables)** - 使用原生 CSS 變數精準控製品項樣式，模擬 LINE 的視覺細節。
- **圖標**: [Lucide React](https://lucide.dev/) - 提供美觀且一致的 UI 圖標。
- **日期處理**: [date-fns](https://date-fns.org/) - 處理聊天日期的格式化。
- **圖片導出**: [html2canvas](https://html2canvas.hertzen.com/) - 將網頁元件轉換為高品質圖片。
- **打包策略**: [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) - 將所有資源（HTML/JS/CSS）打包進單個 `.html` 檔案，方便隨處運行。

## 🛠️ 開發流程

1.  **介面設計**: 參考 LINE 行動端的 UI/UX，採用 **響應式佈局**。左側為「控制面板 (ControlPanel)」，右側為「即時預覽 (PhonePreview)」。
2.  **狀態同步**: 利用 React 的狀態管理，實現控制面板修改內容（如：姓名、訊息、時間）與預覽介面的零延遲同步。
3.  **動態渲染**: 針對對話框的長短不一與發送方切換，實現了靈活的元件陣列渲染。
4.  **單檔案打包**: 透過 Vite 外掛實現所有資源內嵌，使最終產出的 HTML 檔案不依賴外部伺服器即可正常顯示圖標與樣式。

## ⚠️ 遇到的問題與解決方案

### 1. 截圖捕獲不全 (Scroll Issue)
- **問題**: 最初使用 `html-to-image` 函式庫時，發現若聊天內容超出預覽框（出現滾動條），導出的圖片僅能顯示當前可見的可視區域。
- **解決**: 最終切換至 `html2canvas`。我們優化了渲染邏輯，在截圖時動態計算 DOM 的完整高度，成功實現了「完整對話長截圖」，即便是滾動條以外的隱藏資訊也能完整呈現。

### 2. 環境隔絕 (CSS Isolation)
- **問題**: 預覽區域需要模擬手機端的視覺，但全域 CSS 容易互相干擾。
- **解決**: 使用 CSS Variables 與明確的 BEM 命名規範，並自定義 CSS Reset 以確保在不同系統瀏覽器（如 Windows vs Mac）下都能保持高度一致的字體感官。

## ✨ 功能特色

- **完全自定義**: 可動態修改對方名稱、頭像、未讀訊息狀態、對話內容與時間。
- **多樣對話**: 支援左側「接收」、右側「發送」、訊息撤回樣式以及日期分隔線。
- **高品質導出**: 支援將生成的模擬對話下載為高品質 PNG 圖片。
- **部署簡便**: 支援 GitHub Pages 一鍵部署，或直接分發單一 HTML 檔案。

## 📦 如何使用

1. 安裝依賴:
   ```bash
   pnpm install
   ```

2. 開啟開發伺服器:
   ```bash
   pnpm run dev
   ```

3. 構建單檔案版本:
   ```bash
   pnpm run build
   ```

4. 部署至 GitHub Pages:
   ```bash
   pnpm run deploy
   ```

---
*本專案僅供開發測試與 UI 設計參考使用。*

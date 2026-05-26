// ╔══════════════════════════════════════════════════════════════╗
// ║  微信訊息管理系統 — Cloudflare Worker (Claude API Proxy)    ║
// ║  部署說明：                                                  ║
// ║  1. 登入 https://dash.cloudflare.com                        ║
// ║  2. 左側選 Workers & Pages → Create Worker                  ║
// ║  3. 把這整份內容貼進去，點 Deploy                           ║
// ║  4. 進 Settings → Variables → 新增 CLAUDE_API_KEY           ║
// ║     填入你的 Anthropic API Key (sk-ant-...)                  ║
// ║  5. 複製你的 Worker 網址，填入 HTML 的 WORKER_URL           ║
// ╚══════════════════════════════════════════════════════════════╝

export default {
  async fetch(request, env) {

    // ── CORS preflight ──────────────────────────────────────────
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // ── 只接受 POST ─────────────────────────────────────────────
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders(),
      });
    }

    // ── 取得 API Key（從 Worker 環境變數）──────────────────────
    const apiKey = env.CLAUDE_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'CLAUDE_API_KEY not set in Worker environment variables' }), {
        status: 500,
        headers: corsHeaders(),
      });
    }

    // ── 解析前端送來的 body ──────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    // ── 轉發給 Claude API ────────────────────────────────────────
    try {
      const claudeResp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      const data = await claudeResp.json();

      return new Response(JSON.stringify(data), {
        status: claudeResp.status,
        headers: corsHeaders(),
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: 'Claude API call failed: ' + e.message }), {
        status: 500,
        headers: corsHeaders(),
      });
    }
  },
};

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

/* Backend test: asli Gemini ki jagah ek nakli (mock) AI server use hota hai, is liye key ya internet ki zaroorat nahi.
   Chalane ke liye:  node tests/api-test.js            */
const http = require('http'), { spawn } = require('child_process'), path = require('path');
const SERVER = path.join(__dirname, '..', 'server.js');
let passed = 0, failed = 0;
const ok = (cond, name) => { if (cond) { passed++; console.log('  PASS', name); } else { failed++; console.log('  FAIL', name); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

function startMock(port) {
  const seen = [];
  const srv = http.createServer((req, res) => {
    let b = ''; req.on('data', c => b += c); req.on('end', () => {
      const body = b ? JSON.parse(b) : {}; seen.push({ url: req.url, key: req.headers['x-goog-api-key'], body });
      const text = body.contents[0].parts[0].text;
      if (text.includes('FORCE_429')) { res.writeHead(429); return res.end('{"error":{"message":"quota"}}'); }
      if (text.includes('FORCE_500')) { res.writeHead(500); return res.end('{"error":{"message":"boom SECRET_DETAIL"}}'); }
      if (text.includes('FORCE_403')) { res.writeHead(403); return res.end('{"error":{"message":"API key invalid"}}'); }
      if (text.includes('FORCE_EMPTY')) { res.writeHead(200); return res.end('{"candidates":[{"finishReason":"SAFETY"}]}'); }
      if (text.includes('FORCE_HANG')) return;   // jawab hi nahi deta
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'MOCK_REPLY: ' + text.slice(0, 20) }] } }] }));
    });
  });
  return new Promise(r => srv.listen(port, () => r({ srv, seen })));
}
function startServer(port, env) {
  const p = spawn(process.execPath, [SERVER], { env: { ...process.env, PORT: port, ...env }, stdio: 'ignore' });
  return sleep(500).then(() => p);
}
async function post(port, body, raw) {
  const r = await fetch(`http://localhost:${port}/api/write`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw ? body : JSON.stringify(body) });
  const t = await r.text(); let j = {}; try { j = JSON.parse(t); } catch {} return { status: r.status, json: j, text: t };
}
const get = async (port, p) => { const r = await fetch(`http://localhost:${port}${p}`); return { status: r.status, text: await r.text() }; };

(async () => {
  const mock = await startMock(4510);
  const KEY = 'TEST_SECRET_KEY_123';
  const noKey = await startServer(4501, { GEMINI_API_KEY: '' });
  const main = await startServer(4502, { GEMINI_API_KEY: KEY, GEMINI_BASE_URL: 'http://localhost:4510', GEMINI_MODEL: 'test-model', RATE_LIMIT_PER_MINUTE: '1000', REQUEST_TIMEOUT_MS: '800' });
  const limited = await startServer(4503, { GEMINI_API_KEY: KEY, GEMINI_BASE_URL: 'http://localhost:4510', RATE_LIMIT_PER_MINUTE: '3' });
  const daily = await startServer(4504, { GEMINI_API_KEY: KEY, GEMINI_BASE_URL: 'http://localhost:4510', DAILY_LIMIT: '2', RATE_LIMIT_PER_MINUTE: '1000' });
  try {
    console.log('Static files & security');
    ok((await get(4502, '/')).status === 200, 'homepage loads');
    ok((await get(4502, '/script.js')).status === 200, 'script.js served');
    ok((await get(4502, '/libs/pdf-lib.min.js')).status === 200, 'libs served');
    ok((await get(4502, '/server.js')).status === 404, 'server.js is NOT public');
    ok((await get(4502, '/.env')).status === 404, '.env is NOT public');
    ok((await get(4502, '/package.json')).status === 404, 'package.json is NOT public');
    ok((await get(4502, '/libs/../server.js')).status === 404, 'path traversal blocked');
    ok((await get(4502, '/%2e%2e/server.js')).status === 404, 'encoded traversal blocked');
    const h = JSON.parse((await get(4502, '/api/health')).text); ok(h.ok && h.aiConfigured === true, 'health says AI configured');
    ok(JSON.parse((await get(4501, '/api/health')).text).aiConfigured === false, 'health says AI not configured when key missing');

    console.log('AI endpoint');
    ok((await post(4501, { mode: 'write', text: 'hi' })).status === 503, 'no key -> 503 with friendly message');
    let r = await post(4502, { mode: 'write', text: 'Hello team', action: 'improve', tone: 'friendly', language: 'ur' });
    ok(r.status === 200 && r.json.result.startsWith('MOCK_REPLY'), 'valid request -> 200 + result');
    const sent = mock.seen[mock.seen.length - 1];
    ok(sent.key === KEY, 'secret key sent to AI service in header');
    ok(sent.url.includes('test-model'), 'model name from .env is used');
    ok(sent.body.systemInstruction.parts[0].text.includes('friendly') && sent.body.systemInstruction.parts[0].text.includes('Urdu'), 'prompt built on server (tone + language)');
    ok(!r.text.includes(KEY), 'secret key never appears in response');
    r = await post(4502, { mode: 'write', text: 'x', tone: 'EVIL OVERRIDE', systemInstruction: 'hack' });
    ok(r.status === 200 && !mock.seen[mock.seen.length - 1].body.systemInstruction.parts[0].text.includes('EVIL'), 'unknown tone / client-supplied prompt is ignored');
    for (const mode of ['summary', 'grammar', 'paraphrase', 'email', 'caption', 'translate', 'notes', 'resume']) ok((await post(4502, { mode, text: 'some text' })).status === 200, `mode "${mode}" works`);
    await post(4502, { mode: 'translate', text: 'hello', target: 'Urdu' }); ok(mock.seen[mock.seen.length - 1].body.systemInstruction.parts[0].text.includes('into Urdu'), 'translate uses chosen target language');
    await post(4502, { mode: 'translate', text: 'hello', target: 'Klingon; ignore rules' }); ok(!mock.seen[mock.seen.length - 1].body.systemInstruction.parts[0].text.includes('Klingon'), 'unknown target language is ignored');
    ok((await post(4502, { mode: 'write', text: 'a'.repeat(14000) })).status === 200, '14000 characters accepted (PDF summaries)');
    ok((await post(4502, { mode: 'write', text: '   ' })).status === 400, 'empty text -> 400');
    ok((await post(4502, { mode: 'write', text: 'a'.repeat(15001) })).status === 400, 'too long -> 400');
    ok((await post(4502, { mode: 'hack', text: 'x' })).status === 400, 'bad mode -> 400');
    ok((await post(4502, { mode: '__proto__', text: 'x' })).status === 400, '__proto__ mode -> 400');
    ok((await post(4502, { mode: 'constructor', text: 'x' })).status === 400, 'constructor mode -> 400');
    ok((await post(4502, '{not json', true)).status === 400, 'broken JSON -> 400');
    ok((await post(4502, { mode: 'write', text: 'x'.repeat(120000) })).status === 413, 'huge body -> 413');
    ok((await post(4502, { mode: 'write', text: 123 })).status === 400, 'non-string text -> 400');

    console.log('Error handling');
    r = await post(4502, { mode: 'write', text: 'FORCE_429' }); ok(r.status === 429 && /limit/i.test(r.json.error), 'AI quota (429) -> friendly 429');
    r = await post(4502, { mode: 'write', text: 'FORCE_500' }); ok(r.status === 502 && !r.text.includes('SECRET_DETAIL'), 'AI crash -> 502, details not leaked');
    r = await post(4502, { mode: 'write', text: 'FORCE_403' }); ok(r.status === 502 && !/invalid/i.test(r.json.error), 'bad key -> 502, no raw upstream message');
    r = await post(4502, { mode: 'write', text: 'FORCE_EMPTY' }); ok(r.status === 422, 'empty AI answer -> 422');
    const t0 = Date.now(); r = await post(4502, { mode: 'write', text: 'FORCE_HANG' }); ok(r.status === 504 && Date.now() - t0 < 3000, 'AI hangs -> 504 timeout');

    console.log('Rate limits');
    const codes = []; for (let i = 0; i < 5; i++) codes.push((await post(4503, { mode: 'write', text: 'hi' })).status);
    ok(codes.join() === '200,200,200,429,429', 'per-minute limit blocks 4th request (' + codes.join() + ')');
    const d = []; for (let i = 0; i < 3; i++) d.push((await post(4504, { mode: 'write', text: 'hi' })).status);
    ok(d.join() === '200,200,429', 'daily cap blocks 3rd request (' + d.join() + ')');
    const bad = (await fetch('http://localhost:4502/api/write', { method: 'GET' })); ok(bad.status === 404, 'GET /api/write is not allowed');
  } finally { [noKey, main, limited, daily].forEach(p => p.kill()); mock.srv.close(); }
  console.log(`\n${passed} passed, ${failed} failed`); process.exit(failed ? 1 : 0);
})();

/* ToolNest — script.js
   Sections:  1) Tool list   2) Small helpers   3) Search + filters   4) Popup (modal)
              5) Tool screens   6) Image/PDF/Audio helpers   7) AI helper   8) Start-up      */
'use strict';

/* ======================================================================
   1) TOOL LIST
   type = which screen opens.  If type is 'soon' the tool is NOT ready yet (honest label).
   ai = true means it belongs to the "AI" filter.
   ====================================================================== */
const T = (id, name, category, icon, desc, type = 'soon', ai = false) => ({ id, name, category, icon, desc, type, ai });

const tools = [
  // ---- IMAGE ----
  T('image-convert', 'Image Format Converter', 'image', '▧', 'Convert an image to PNG, JPG or WebP in your browser.', 'imageConvert'),
  T('image-compress', 'Image Compressor', 'image', '◈', 'Make an image file smaller by lowering its quality.', 'imageCompress'),
  T('image-resize', 'Image Resizer', 'image', '⤢', 'Change image width and height, with optional aspect-ratio lock.', 'imageResize'),
  T('image-crop', 'Image Cropper', 'image', '▣', 'Crop to a ratio (1:1, 16:9 …) or to exact pixel values.', 'imageCrop'),
  T('passport-photo', 'Passport Photo Maker', 'image', '▦', 'Crop a portrait to passport size and get a ready-to-print sheet.', 'passport'),
  T('webp-convert', 'WebP Converter', 'image', '◩', 'Convert any image to the light WebP format.', 'imageWebp'),
  // ---- PDF ----
  T('pdf-merge', 'Merge PDF', 'pdf', '▤', 'Combine several PDF files into one.', 'pdfMerge'),
  T('pdf-split', 'Split PDF', 'pdf', '▥', 'Extract page ranges, or save every page as its own PDF.', 'pdfSplit'),
  T('jpg-pdf', 'JPG to PDF', 'pdf', '▤', 'Put one or more images into a single PDF.', 'jpgPdf'),
  T('pdf-text', 'Extract PDF Text', 'pdf', 'T', 'Copy the selectable text out of a PDF.', 'pdfText'),
  T('pdf-jpg', 'PDF to JPG', 'pdf', '▧', 'Turn PDF pages into JPG pictures.', 'pdfJpg'),
  T('pdf-summary', 'AI PDF Summarizer', 'pdf', '✧', 'Upload a PDF and get a short summary written by AI.', 'ai-pdfsummary', true),
  // ---- AUDIO ----
  T('voice-enhance', 'Voice Enhancer', 'audio', '〰', 'Clean up a voice recording: less rumble, clearer speech, balanced volume.', 'voiceEnhance'),
  T('noise-remove', 'Background Noise Reducer', 'audio', '⌁', 'Quiet the hiss and background noise between words (noise gate).', 'noiseRemove'),
  T('audio-trim', 'Audio Trimmer', 'audio', '✂', 'Cut an audio file to the part you want.', 'audioTrim'),
  T('audio-merge', 'Audio Merger', 'audio', '＋', 'Join several audio files into one.', 'audioMerge'),
  T('audio-convert', 'Audio to WAV Converter', 'audio', '⇄', 'Convert MP3, M4A, OGG and more to WAV.', 'audioWav'),
  T('silence-remove', 'Silence Remover', 'audio', '▮', 'Cut out long silent gaps from a recording.', 'silenceRemove'),
  T('voice-change', 'Voice Changer', 'audio', '☊', 'Make a voice deeper, higher, robotic or add an echo.', 'voiceChange'),
  T('text-speech', 'Text to Speech', 'audio', '♫', 'Read text aloud using your device voices.', 'textSpeech'),
  T('speech-text', 'Speech to Text', 'audio', '🎙', 'Turn your speech into text (browser dependent).', 'speechText'),
  // ---- TEXT ----
  T('ai-writer', 'AI Writing Assistant', 'text', '✦', 'Write, rewrite or improve any text with AI.', 'ai-write', true),
  T('text-summary', 'AI Text Summarizer', 'text', '✧', 'Turn long text into a short summary.', 'ai-summary', true),
  T('grammar', 'Grammar Checker', 'text', '✓', 'Fix grammar, spelling and punctuation with AI.', 'ai-grammar', true),
  T('paraphrase', 'Paraphrasing Tool', 'text', '↻', 'Say the same thing in different words.', 'ai-paraphrase', true),
  T('email-writer', 'AI Email Writer', 'text', '✉', 'Describe what you need and get a ready email.', 'ai-email', true),
  T('translator', 'AI Translator', 'text', '文', 'Translate text into English, Urdu, Roman Urdu, Arabic and more.', 'ai-translate', true),
  T('meeting-notes', 'AI Meeting Notes', 'text', '☷', 'Turn a meeting transcript into summary, decisions and action items.', 'ai-notes', true),
  T('resume', 'AI Resume Writer', 'text', '▤', 'Write a clean resume from your details.', 'ai-resume', true),
  T('word-counter', 'Word & Character Counter', 'text', '123', 'Count words, characters, sentences and paragraphs.', 'wordCounter'),
  T('case-convert', 'Text Case Converter', 'text', 'Aa', 'UPPERCASE, lowercase, Title Case or Sentence case.', 'caseConvert'),
  T('remove-spaces', 'Remove Extra Spaces', 'text', '↔', 'Clean repeated spaces and blank lines.', 'removeSpaces'),
  T('duplicate-lines', 'Duplicate Line Remover', 'text', '☷', 'Remove repeated lines, keep the first one.', 'duplicateLines'),
  T('text-compare', 'Text Compare', 'text', '⇆', 'See exactly which lines were added or removed.', 'textCompare'),
  T('bullet-points', 'Text to Bullet Points', 'text', '•', 'Turn sentences into a bullet list.', 'bulletPoints'),
  T('keyword', 'Keyword Extractor', 'text', '#', 'Find the most used words in a text.', 'keyword'),
  // ---- VIDEO ----
  T('video-audio', 'Video to Audio (WAV)', 'video', '♫', 'Pull the sound out of a video as a WAV file.', 'videoAudio'),
  T('thumbnail', 'Video Thumbnail Maker', 'video', '▧', 'Pick any frame of a video and save it as a picture.', 'thumbnail'),
  // ---- UTILITIES ----
  T('qr', 'QR Code Generator', 'utility', '▦', 'Create a downloadable QR code from text or a link.', 'qr'),
  T('color-picker', 'Color Picker (HEX / RGB)', 'utility', '◉', 'Pick a color and copy its HEX and RGB values.', 'colorPicker'),
  T('password', 'Password Generator', 'utility', '⚿', 'Create a strong random password.', 'password'),
  T('unit-convert', 'Unit Converter', 'utility', '⇄', 'Length, weight, area, volume and temperature.', 'unitConvert'),
  T('url-code', 'URL Encoder / Decoder', 'utility', '↔', 'Encode or decode text for web addresses.', 'urlCode'),
  T('base64', 'Base64 Encoder / Decoder', 'utility', '01', 'Convert text to Base64 and back.', 'base64'),
  T('percentage', 'Percentage Calculator', 'utility', '%', 'Find a percentage of any number.', 'percentage'),
  T('favicon', 'Favicon Generator', 'utility', '✦', 'Make a simple website icon from a letter and a color.', 'favicon'),
  T('meta-preview', 'Meta Title Preview', 'utility', '⌕', 'See how your page looks in Google results.', 'metaPreview'),
  T('caption', 'AI Caption Generator', 'utility', '#', 'Get social media captions and hashtags.', 'ai-caption', true),
];

const categoryNames = { image: 'Image tools', pdf: 'PDF tools', audio: 'Audio tools', text: 'Text tools', video: 'Video tools', utility: 'Utilities', ai: 'AI tools' };
const isSoon = t => t.type === 'soon';
const isAiServer = t => t.type.startsWith('ai-');
const statusOf = t => (isSoon(t) ? 'soon' : isAiServer(t) ? 'ai' : 'ready');

/* ======================================================================
   2) SMALL HELPERS
   ====================================================================== */
const $ = id => document.getElementById(id);
const grid = $('toolGrid'), searchInput = $('searchInput'), resultLabel = $('resultLabel'), emptyState = $('emptyState');
const modal = $('toolModal'), workspace = $('toolWorkspace'), message = $('toolMessage');
let activeFilter = 'all', activeTool = null, objectUrls = [], lastFocus = null;

function escapeHTML(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function field(label, inner) { return `<div><label class="field-label">${label}</label>${inner}</div>`; }
function textArea(id, placeholder = 'Type or paste your text here…') { return `<textarea id="${id}" placeholder="${escapeHTML(placeholder)}"></textarea>`; }
function fileInput(id, { multiple = false, accept = '*/*', label } = {}) { return `<div><label class="field-label" for="${id}">${label || (multiple ? 'Choose files' : 'Choose a file')}</label><input id="${id}" type="file" ${multiple ? 'multiple' : ''} accept="${accept}"></div>`; }
function selectBox(id, options, selected) { return `<select id="${id}">${options.map(([v, l]) => `<option value="${escapeHTML(v)}" ${v === selected ? 'selected' : ''}>${escapeHTML(l)}</option>`).join('')}</select>`; }
function runButton(label) { return `<button class="btn btn-primary" id="runTool" type="button">${label}</button>`; }
function setMessage(text, type = '') { message.textContent = text; message.className = 'tool-message ' + type; }
function clearResult() { const b = $('resultBox'); if (b) b.remove(); }
function setResult(html) {
  let box = $('resultBox');
  if (!box) { box = document.createElement('div'); box.id = 'resultBox'; box.className = 'result'; workspace.appendChild(box); }
  box.innerHTML = html;
}
function trackUrl(url) { objectUrls.push(url); return url; }
function blobUrl(blob) { return trackUrl(URL.createObjectURL(blob)); }
function downloadLink(url, name, label = 'Download') { return `<a class="btn btn-primary" href="${url}" download="${escapeHTML(name)}">${label}</a>`; }
function copyBox(id, value) { return `<textarea id="${id}">${escapeHTML(value)}</textarea><div class="btn-row"><button class="btn btn-light" type="button" data-copy="${id}">Copy result</button></div>`; }
function showTextResult(value) { setResult(copyBox('textResult', value)); }
function formatBytes(n) { return n < 1024 * 1024 ? (n / 1024).toFixed(1) + ' KB' : (n / 1024 / 1024).toFixed(2) + ' MB'; }
function baseName(file) { return file.name.replace(/\.[^.]+$/, '') || 'file'; }
function onFiles(id, fn) { const el = $(id); if (el) el.addEventListener('change', () => fn(Array.from(el.files))); }
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); showToast('Copied to clipboard'); }
  catch (e) { showToast('Copy is not available here. Select the text and copy it by hand.'); }
}
let toastTimer;
function showToast(s) { const t = $('toast'); t.textContent = s; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2400); }
function withBusy(btn, label, fn) {   // button ko "Working…" dikhata hai jab tak kaam chal raha hai
  return async () => {
    const old = btn.textContent; btn.disabled = true; btn.textContent = label;
    try { await fn(); } catch (e) { setMessage(e.message || 'Something went wrong. Please try again.', 'error'); }
    finally { btn.disabled = false; btn.textContent = old; }
  };
}

/* ======================================================================
   3) SEARCH + FILTERS
   ====================================================================== */
function matches(t, query) {
  const hay = `${t.name} ${t.desc} ${categoryNames[t.category]} ${t.category} ${t.ai ? 'ai artificial intelligence' : ''} ${isSoon(t) ? 'coming soon' : 'ready'}`.toLowerCase();
  return query.split(/\s+/).filter(Boolean).every(w => hay.includes(w));
}
function renderTools() {
  const query = searchInput.value.trim().toLowerCase();
  const rank = t => (isSoon(t) ? 1 : 0);   // working tools pehle, "coming soon" baad mein
  const list = tools
    .filter(t => (activeFilter === 'all' || (activeFilter === 'ai' ? t.ai : t.category === activeFilter)) && matches(t, query))
    .sort((a, b) => rank(a) - rank(b));
  grid.innerHTML = list.map(t => {
    const st = statusOf(t);
    const tag = st === 'soon' ? 'Coming soon' : st === 'ai' ? 'AI · needs server' : 'Works now';
    return `<button class="tool ${st === 'soon' ? 'is-soon' : ''}" type="button" data-id="${t.id}">
      <span class="tool-icon">${escapeHTML(t.icon)}</span>
      <span class="tool-body"><span class="tool-name">${escapeHTML(t.name)}</span><span class="tool-desc">${escapeHTML(t.desc)}</span><span class="tool-tag ${st === 'ai' ? 'ai' : st === 'soon' ? 'soon' : ''}">${tag}</span></span>
    </button>`;
  }).join('');
  emptyState.classList.toggle('hidden', list.length > 0);
  const ready = list.filter(t => !isSoon(t)).length;
  resultLabel.textContent = `${list.length} tools · ${ready} working now`;
}
function setFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  renderTools();
}
function goToTools(filter) { if (filter) setFilter(filter); $('tools').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

/* ======================================================================
   4) POPUP (MODAL)
   ====================================================================== */
const renderers = {};   // type -> function(tool). Har tool screen neeche section 5 mein hai.

function openTool(id) {
  activeTool = tools.find(t => t.id === id); if (!activeTool) return;
  lastFocus = document.activeElement;
  $('modalTitle').textContent = activeTool.name;
  $('modalCategory').textContent = (categoryNames[activeTool.category] || '').toUpperCase();
  $('modalDescription').textContent = activeTool.desc;
  $('privacyNote').textContent = isAiServer(activeTool) ? 'ⓘ Your text is sent to our server and an AI service.' : isSoon(activeTool) ? '' : 'ⓘ Your files stay in your browser.';
  workspace.innerHTML = ''; setMessage('');
  (renderers[activeTool.type] || renderers.soon)(activeTool);
  modal.classList.remove('hidden'); document.body.style.overflow = 'hidden';
  const first = workspace.querySelector('input,textarea,select,button'); (first || $('closeModal')).focus({ preventScroll: true });
}
function closeTool() {
  modal.classList.add('hidden'); document.body.style.overflow = '';
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  objectUrls.forEach(u => URL.revokeObjectURL(u)); objectUrls = [];
  workspace.innerHTML = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}

/* ======================================================================
   5) TOOL SCREENS
   ====================================================================== */
renderers.soon = t => {
  workspace.innerHTML = `<div class="result"><p><b>This tool is not ready yet.</b></p><p>${t.ai ? 'It needs an AI service connected through the secure server. It is planned for a future update.' : 'It is planned for a future update.'}</p></div>`;
};

// ---------- IMAGE ----------
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not open this image. Please choose a JPG, PNG, WebP or GIF file.')); };
    img.src = url;
  });
}
function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error('This browser could not create that file type. Try PNG or JPG.'))), type, quality));
}
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
function newCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

renderers.imageConvert = renderers.imageCompress = renderers.imageResize = renderers.imageWebp = t => {
  const type = t.type;
  workspace.innerHTML = fileInput('imageFile', { accept: 'image/*', label: 'Choose an image' }) +
    (type === 'imageResize' ? `<div class="cols">${field('Width (px)', '<input id="imgWidth" type="number" min="1" max="10000" value="800">')}${field('Height (px)', '<input id="imgHeight" type="number" min="1" max="10000" value="600">')}</div><label class="check"><input type="checkbox" id="imgLock" checked> Keep the same shape (aspect ratio)</label>` : '') +
    (type === 'imageCompress' ? field('Quality (10 = smallest file, 100 = best look)', '<input id="imgQuality" type="number" min="10" max="100" value="70">') + field('Save as', selectBox('imgFormat', [['image/jpeg', 'JPG (best for photos)'], ['image/webp', 'WebP (smallest)']])) : '') +
    (type === 'imageConvert' ? field('Convert to', selectBox('imgFormat', [['image/png', 'PNG'], ['image/jpeg', 'JPG'], ['image/webp', 'WebP']])) : '') +
    runButton('Process image');
  let ratio = 1;
  onFiles('imageFile', async ([f]) => {
    if (!f || type !== 'imageResize') return;
    try { const img = await loadImage(f); ratio = img.naturalWidth / img.naturalHeight; $('imgWidth').value = img.naturalWidth; $('imgHeight').value = img.naturalHeight; } catch (e) { setMessage(e.message, 'error'); }
  });
  if (type === 'imageResize') {
    $('imgWidth').addEventListener('input', () => { if ($('imgLock').checked) $('imgHeight').value = Math.max(1, Math.round($('imgWidth').value / ratio)); });
    $('imgHeight').addEventListener('input', () => { if ($('imgLock').checked) $('imgWidth').value = Math.max(1, Math.round($('imgHeight').value * ratio)); });
  }
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Working…', async () => {
    const file = $('imageFile').files[0]; if (!file) throw new Error('Please choose an image first.');
    clearResult(); setMessage('');
    const img = await loadImage(file);
    let w = img.naturalWidth, h = img.naturalHeight;
    if (type === 'imageResize') { w = Math.round(Number($('imgWidth').value)); h = Math.round(Number($('imgHeight').value)); if (!(w >= 1 && h >= 1 && w <= 10000 && h <= 10000)) throw new Error('Width and height must be between 1 and 10000.'); }
    const fmt = type === 'imageWebp' ? 'image/webp' : type === 'imageResize' ? (file.type === 'image/jpeg' || file.type === 'image/webp' ? file.type : 'image/png') : $('imgFormat').value;
    const quality = type === 'imageCompress' ? Math.min(1, Math.max(.1, (Number($('imgQuality').value) || 70) / 100)) : .92;
    const c = newCanvas(w, h), ctx = c.getContext('2d');
    if (fmt === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await canvasToBlob(c, fmt, quality);
    if (blob.type && blob.type !== fmt) throw new Error('Your browser cannot save this format. Please try PNG or JPG.');
    const url = blobUrl(blob);
    const diff = blob.size < file.size ? `<b>${Math.round((1 - blob.size / file.size) * 100)}% smaller</b>` : 'larger than the original';
    setResult(`<p><b>Before:</b> ${formatBytes(file.size)} · <b>After:</b> ${formatBytes(blob.size)} (${diff}) · ${w}×${h}px</p><img src="${url}" alt="Result preview"><div class="btn-row">${downloadLink(url, `${baseName(file)}-toolnest.${EXT[fmt]}`)}</div>`);
    setMessage('Done!', 'success');
  });
};

renderers.imageCrop = () => {
  workspace.innerHTML = fileInput('imageFile', { accept: 'image/*', label: 'Choose an image' }) +
    field('Crop shape', selectBox('cropRatio', [['custom', 'Custom (use the numbers below)'], ['1', 'Square 1:1'], ['1.3333', 'Photo 4:3'], ['1.5', 'Photo 3:2'], ['1.7778', 'Wide 16:9'], ['0.75', 'Portrait 3:4'], ['0.5625', 'Story 9:16']])) +
    `<p class="hint" id="cropInfo">Choose an image to see its size.</p>
     <div class="cols">${field('Start from left (px)', '<input id="cropX" type="number" min="0" value="0">')}${field('Start from top (px)', '<input id="cropY" type="number" min="0" value="0">')}</div>
     <div class="cols">${field('Width (px)', '<input id="cropW" type="number" min="1" value="500">')}${field('Height (px)', '<input id="cropH" type="number" min="1" value="500">')}</div>` + runButton('Crop image');
  let nat = null;
  onFiles('imageFile', async ([f]) => {
    if (!f) return;
    try { const img = await loadImage(f); nat = { w: img.naturalWidth, h: img.naturalHeight }; $('cropInfo').textContent = `Image size: ${nat.w} × ${nat.h} px`; $('cropW').value = nat.w; $('cropH').value = nat.h; $('cropX').value = 0; $('cropY').value = 0; } catch (e) { setMessage(e.message, 'error'); }
  });
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Cropping…', async () => {
    const file = $('imageFile').files[0]; if (!file) throw new Error('Please choose an image first.');
    clearResult(); const img = await loadImage(file); const W = img.naturalWidth, H = img.naturalHeight;
    let x, y, w, h; const r = $('cropRatio').value;
    if (r === 'custom') { x = Number($('cropX').value) || 0; y = Number($('cropY').value) || 0; w = Number($('cropW').value); h = Number($('cropH').value); }
    else { const ar = Number(r); w = Math.min(W, H * ar); h = w / ar; x = (W - w) / 2; y = (H - h) / 2; }   // beech se sab se bara crop
    x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
    if (!(w >= 1 && h >= 1) || x < 0 || y < 0 || x + w > W || y + h > H) throw new Error(`The crop area must stay inside the image (${W} × ${H} px).`);
    const c = newCanvas(w, h); c.getContext('2d').drawImage(img, x, y, w, h, 0, 0, w, h);
    const fmt = file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
    const blob = await canvasToBlob(c, fmt, .92), url = blobUrl(blob);
    setResult(`<p>Cropped to ${w} × ${h} px.</p><img src="${url}" alt="Cropped image">${downloadLink(url, `${baseName(file)}-cropped.${EXT[fmt]}`)}`);
    setMessage('Done!', 'success');
  });
};

renderers.passport = () => {
  workspace.innerHTML = fileInput('imageFile', { accept: 'image/*', label: 'Choose a portrait photo (face clearly visible)' }) +
    field('Photo size', selectBox('ppSize', [['413x531', '35 × 45 mm (most countries, incl. Pakistan/UK/EU)'], ['600x600', '2 × 2 inch (USA)'], ['390x567', '33 × 48 mm (Pakistan CNIC-style)']])) +
    '<p class="hint">The photo is cropped around the upper-middle of your picture. Use a plain background when taking the photo.</p>' + runButton('Make passport photo');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Working…', async () => {
    const file = $('imageFile').files[0]; if (!file) throw new Error('Please choose a photo first.');
    clearResult(); const img = await loadImage(file);
    const [pw, ph] = $('ppSize').value.split('x').map(Number), ar = pw / ph;
    let sw = img.naturalWidth, sh = sw / ar;
    if (sh > img.naturalHeight) { sh = img.naturalHeight; sw = sh * ar; }
    const sx = (img.naturalWidth - sw) / 2, sy = (img.naturalHeight - sh) * 0.3;    // thora upar se (chehra upar hota hai)
    const one = newCanvas(pw, ph), ctx = one.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, pw, ph); ctx.drawImage(img, sx, sy, sw, sh, 0, 0, pw, ph);
    // 6x4 inch sheet at 300 dpi = 1800 x 1200
    const sheet = newCanvas(1800, 1200), sc = sheet.getContext('2d'); sc.fillStyle = '#fff'; sc.fillRect(0, 0, 1800, 1200);
    const gap = 20, cols = Math.max(1, Math.floor((1800 - gap) / (pw + gap))), rows = Math.max(1, Math.floor((1200 - gap) / (ph + gap)));
    const ox = (1800 - (cols * pw + (cols - 1) * gap)) / 2, oy = (1200 - (rows * ph + (rows - 1) * gap)) / 2;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = ox + c * (pw + gap), y = oy + r * (ph + gap); sc.drawImage(one, x, y); sc.strokeStyle = '#ccc'; sc.strokeRect(x, y, pw, ph); }
    const b1 = await canvasToBlob(one, 'image/jpeg', .95), b2 = await canvasToBlob(sheet, 'image/jpeg', .95), u1 = blobUrl(b1), u2 = blobUrl(b2);
    setResult(`<p>Single photo: ${pw} × ${ph} px · Print sheet (6×4 in): ${cols * rows} photos</p><img src="${u1}" alt="Passport photo" style="max-width:200px"><div class="btn-row">${downloadLink(u1, 'passport-photo.jpg', 'Download photo')}${downloadLink(u2, 'passport-print-sheet.jpg', 'Download print sheet')}</div>`);
    setMessage('Done!', 'success');
  });
};

// ---------- PDF ----------
function needPdfLib() { if (!window.PDFLib) throw new Error('The PDF library did not load. Reload the page and try again.'); return window.PDFLib; }
function parseRanges(text, max) {   // "1-3, 5, 7-9" -> [0,1,2,4,6,7,8]
  const out = [];
  for (const part of text.split(',').map(s => s.trim()).filter(Boolean)) {
    const m = part.match(/^(\d+)(?:\s*-\s*(\d+))?$/); if (!m) throw new Error(`"${part}" is not a valid page or range. Example: 1-3, 5, 7-9`);
    const a = Number(m[1]), b = m[2] ? Number(m[2]) : a;
    if (a < 1 || b < a || b > max) throw new Error(`Pages must be between 1 and ${max}, and ranges must go upward (like 2-5).`);
    for (let p = a; p <= b; p++) out.push(p - 1);
  }
  if (!out.length) throw new Error('Please enter the pages you want.');
  return out;
}
renderers.pdfMerge = () => {
  workspace.innerHTML = fileInput('pdfFiles', { multiple: true, accept: '.pdf,application/pdf', label: 'Choose 2 or more PDF files (they are joined in this order)' }) + runButton('Merge PDFs');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Merging…', async () => {
    const files = Array.from($('pdfFiles').files); if (files.length < 2) throw new Error('Please select at least two PDF files.');
    const { PDFDocument } = needPdfLib(); clearResult();
    const merged = await PDFDocument.create();
    for (const f of files) {
      let pdf; try { pdf = await PDFDocument.load(await f.arrayBuffer()); } catch (e) { throw new Error(`"${f.name}" could not be read. It may be damaged or password-protected.`); }
      (await merged.copyPages(pdf, pdf.getPageIndices())).forEach(p => merged.addPage(p));
    }
    const blob = new Blob([await merged.save()], { type: 'application/pdf' }), url = blobUrl(blob);
    setResult(`<p>Merged ${files.length} files into ${merged.getPageCount()} pages (${formatBytes(blob.size)}).</p>${downloadLink(url, 'toolnest-merged.pdf')}`);
    setMessage('PDFs merged.', 'success');
  });
};
renderers.pdfSplit = () => {
  workspace.innerHTML = fileInput('pdfFile', { accept: '.pdf,application/pdf', label: 'Choose a PDF' }) +
    field('What do you want?', selectBox('splitMode', [['range', 'Keep only some pages (one new PDF)'], ['each', 'Save every page as its own PDF']])) +
    `<div id="rangeBox">${field('Pages to keep', '<input id="pageRange" type="text" placeholder="Example: 1-3, 5, 8-10">')}</div><p class="hint" id="pdfInfo"></p>` + runButton('Split PDF');
  $('splitMode').onchange = () => $('rangeBox').classList.toggle('hidden', $('splitMode').value === 'each');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Working…', async () => {
    const f = $('pdfFile').files[0]; if (!f) throw new Error('Please choose a PDF first.');
    const { PDFDocument } = needPdfLib(); clearResult();
    let src; try { src = await PDFDocument.load(await f.arrayBuffer()); } catch (e) { throw new Error('This PDF could not be read. It may be damaged or password-protected.'); }
    const total = src.getPageCount(); $('pdfInfo').textContent = `This PDF has ${total} pages.`;
    if ($('splitMode').value === 'range') {
      const idx = parseRanges($('pageRange').value, total), out = await PDFDocument.create();
      (await out.copyPages(src, idx)).forEach(p => out.addPage(p));
      const blob = new Blob([await out.save()], { type: 'application/pdf' }), url = blobUrl(blob);
      setResult(`<p>New PDF with ${idx.length} page(s).</p>${downloadLink(url, `${baseName(f)}-pages.pdf`)}`);
    } else {
      if (total > 50) throw new Error('This PDF has more than 50 pages. Use "Keep only some pages" for big files.');
      let links = '';
      for (let i = 0; i < total; i++) { const out = await PDFDocument.create(); out.addPage((await out.copyPages(src, [i]))[0]); links += `<p><a class="btn btn-light" href="${blobUrl(new Blob([await out.save()], { type: 'application/pdf' }))}" download="${escapeHTML(baseName(f))}-page-${i + 1}.pdf">Download page ${i + 1}</a></p>`; }
      setResult(links);
    }
    setMessage('Done!', 'success');
  });
};
renderers.jpgPdf = () => {
  workspace.innerHTML = fileInput('imgFiles', { multiple: true, accept: 'image/*', label: 'Choose one or more images (they keep this order)' }) +
    field('Page size', selectBox('pageMode', [['fit', 'Same size as each image'], ['a4', 'A4 page, image centered']])) + runButton('Create PDF');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Creating…', async () => {
    const files = Array.from($('imgFiles').files); if (!files.length) throw new Error('Please choose at least one image.');
    const { PDFDocument } = needPdfLib(); clearResult();
    const pdf = await PDFDocument.create();
    for (const f of files) {
      let emb;
      if (f.type === 'image/jpeg') emb = await pdf.embedJpg(await f.arrayBuffer());
      else if (f.type === 'image/png') emb = await pdf.embedPng(await f.arrayBuffer());
      else { const img = await loadImage(f), c = newCanvas(img.naturalWidth, img.naturalHeight); c.getContext('2d').drawImage(img, 0, 0); emb = await pdf.embedPng(await (await canvasToBlob(c, 'image/png')).arrayBuffer()); }
      if ($('pageMode').value === 'fit') pdf.addPage([emb.width, emb.height]).drawImage(emb, { x: 0, y: 0, width: emb.width, height: emb.height });
      else { const pw = 595.28, ph = 841.89, m = 28, s = Math.min((pw - 2 * m) / emb.width, (ph - 2 * m) / emb.height, 1), w = emb.width * s, h = emb.height * s; pdf.addPage([pw, ph]).drawImage(emb, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h }); }
    }
    const blob = new Blob([await pdf.save()], { type: 'application/pdf' }), url = blobUrl(blob);
    setResult(`<p>PDF with ${files.length} page(s) · ${formatBytes(blob.size)}</p>${downloadLink(url, 'toolnest-images.pdf')}`);
    setMessage('PDF created.', 'success');
  });
};

let pdfjsPromise = null;
function loadPdfJs() {   // pdf.js ko tabhi load karte hain jab zaroorat ho. Yeh website server (http) se chalne par hi kaam karta hai.
  if (!pdfjsPromise) pdfjsPromise = import(new URL('libs/pdf.min.mjs', location.href).href).then(m => { m.GlobalWorkerOptions.workerSrc = new URL('libs/pdf.worker.min.mjs', location.href).href; return m; });
  return pdfjsPromise.catch(e => { pdfjsPromise = null; throw new Error('The PDF reader could not load. Please open the site with "node server.js" (http://localhost:3000), not by double-clicking index.html.'); });
}
renderers.pdfText = () => {
  workspace.innerHTML = fileInput('pdfFile', { accept: '.pdf,application/pdf', label: 'Choose a PDF' }) + runButton('Extract text');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Reading…', async () => {
    const f = $('pdfFile').files[0]; if (!f) throw new Error('Please choose a PDF first.'); clearResult();
    const pdfjs = await loadPdfJs(); let doc;
    try { doc = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise; } catch (e) { throw new Error('This PDF could not be read. It may be damaged or password-protected.'); }
    let out = '';
    for (let p = 1; p <= doc.numPages; p++) { const tc = await (await doc.getPage(p)).getTextContent(); out += tc.items.map(i => i.str + (i.hasEOL ? '\n' : ' ')).join('').replace(/ +\n/g, '\n').trim() + '\n\n'; }
    out = out.trim();
    if (!out) { setMessage('No selectable text found. This PDF may be a scan (pictures of pages). OCR is not available yet.', 'error'); return; }
    showTextResult(out); setMessage(`Extracted text from ${doc.numPages} page(s).`, 'success');
  });
};
renderers.pdfJpg = () => {
  workspace.innerHTML = fileInput('pdfFile', { accept: '.pdf,application/pdf', label: 'Choose a PDF' }) + field('Quality', selectBox('pdfScale', [['1', 'Normal'], ['2', 'High (bigger files)']])) + runButton('Convert to JPG');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Rendering…', async () => {
    const f = $('pdfFile').files[0]; if (!f) throw new Error('Please choose a PDF first.'); clearResult();
    const pdfjs = await loadPdfJs(); let doc;
    try { doc = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise; } catch (e) { throw new Error('This PDF could not be read. It may be damaged or password-protected.'); }
    const n = Math.min(doc.numPages, 20), scale = Number($('pdfScale').value) * 1.5; let html = '<div class="thumbs">';
    for (let p = 1; p <= n; p++) {
      const page = await doc.getPage(p), vp = page.getViewport({ scale }), c = newCanvas(Math.floor(vp.width), Math.floor(vp.height));
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      const url = blobUrl(await canvasToBlob(c, 'image/jpeg', .9));
      html += `<figure><img src="${url}" alt="Page ${p}"><a href="${url}" download="${escapeHTML(baseName(f))}-page-${p}.jpg">Download page ${p}</a></figure>`;
    }
    setResult(html + '</div>' + (doc.numPages > n ? `<p class="hint">Only the first 20 of ${doc.numPages} pages were converted.</p>` : ''));
    setMessage('Done!', 'success');
  });
};

// ---------- AUDIO ----------
let _ac; const audioCtx = () => _ac || (_ac = new (window.AudioContext || window.webkitAudioContext)());
async function decodeFile(file) {
  if (file.size > 300 * 1024 * 1024) throw new Error('This file is very large (over 300 MB). Please use a smaller file.');
  try { return await audioCtx().decodeAudioData(await file.arrayBuffer()); }
  catch (e) { throw new Error(`"${file.name}" could not be read as audio. Try MP3, WAV, M4A or OGG.`); }
}
function writeStr(v, o, s) { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); }
function audioToWav(buf) {   // AudioBuffer -> 16-bit WAV file
  const ch = buf.numberOfChannels, len = buf.length, sr = buf.sampleRate, bytes = 44 + len * ch * 2, ab = new ArrayBuffer(bytes), v = new DataView(ab);
  writeStr(v, 0, 'RIFF'); v.setUint32(4, bytes - 8, true); writeStr(v, 8, 'WAVE'); writeStr(v, 12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, ch, true); v.setUint32(24, sr, true); v.setUint32(28, sr * ch * 2, true); v.setUint16(32, ch * 2, true); v.setUint16(34, 16, true); writeStr(v, 36, 'data'); v.setUint32(40, len * ch * 2, true);
  const data = []; for (let c = 0; c < ch; c++) data.push(buf.getChannelData(c));
  let o = 44; for (let i = 0; i < len; i++) for (let c = 0; c < ch; c++) { const s = Math.max(-1, Math.min(1, data[c][i])); v.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true); o += 2; }
  return new Blob([ab], { type: 'audio/wav' });
}
function bufferFrom(arrays, sr) {   // [Float32Array, ...] -> AudioBuffer
  const b = audioCtx().createBuffer(arrays.length, arrays[0].length, sr); arrays.forEach((a, c) => b.copyToChannel(a, c)); return b;
}
async function conform(buf, sr, ch) {   // sample-rate aur channels barabar karna
  if (buf.sampleRate === sr && buf.numberOfChannels === ch) return buf;
  const off = new OfflineAudioContext(ch, Math.ceil(buf.duration * sr), sr), src = off.createBufferSource(); src.buffer = buf; src.connect(off.destination); src.start(); return off.startRendering();
}
function applyGate(data, sr, offsetDb) {
  // Noise gate: recording ki apni awaz ke level (95th percentile) se offsetDb neeche wali awaz ko dabata hai.
  const win = Math.floor(sr * 0.01), n = data[0].length, levels = [];
  for (let w = 0; w * win < n; w++) {
    let s = 0, c = 0; for (const d of data) for (let i = w * win; i < Math.min(n, (w + 1) * win); i++) { s += d[i] * d[i]; c++; }
    levels.push(Math.sqrt(s / c));
  }
  const sorted = levels.slice().sort((a, b) => a - b), loud = sorted[Math.floor(sorted.length * 0.95)] || 0, th = loud * Math.pow(10, offsetDb / 20);
  const flags = []; let hold = 0;
  for (const lv of levels) { if (lv > th) hold = 15; else hold = Math.max(0, hold - 1); flags.push(hold > 0); }   // 150 ms hold: lafz kaat nahi jaate
  const att = 1 - Math.exp(-1 / (sr * 0.005)), rel = 1 - Math.exp(-1 / (sr * 0.08)); let g = 1;
  for (let i = 0; i < n; i++) { const target = flags[(i / win) | 0] ? 1 : 0.08; g += (target - g) * (target > g ? att : rel); for (const d of data) d[i] *= g; }
}
async function enhanceAudio(buf, { gate = 0, highpass = 80, presence = 0, normalize = true }) {
  const ch = buf.numberOfChannels, sr = buf.sampleRate, len = buf.length, data = [];
  for (let c = 0; c < ch; c++) data.push(Float32Array.from(buf.getChannelData(c)));
  if (gate) applyGate(data, sr, gate);
  const off = new OfflineAudioContext(ch, len, sr), src = off.createBufferSource(); src.buffer = bufferFrom(data, sr);
  const hp = off.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = highpass;
  const eq = off.createBiquadFilter(); eq.type = 'peaking'; eq.frequency.value = 3000; eq.Q.value = 1; eq.gain.value = presence;
  const comp = off.createDynamicsCompressor(); comp.threshold.value = -26; comp.knee.value = 20; comp.ratio.value = 3; comp.attack.value = .005; comp.release.value = .15;
  src.connect(hp); hp.connect(eq); eq.connect(comp); comp.connect(off.destination); src.start();
  const out = await off.startRendering();
  if (normalize) { let peak = 0; for (let c = 0; c < ch; c++) { const d = out.getChannelData(c); for (let i = 0; i < d.length; i++) peak = Math.max(peak, Math.abs(d[i])); } if (peak > 0) { const k = 0.89 / peak; for (let c = 0; c < ch; c++) { const d = out.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] *= k; } } }
  return out;
}
function audioResult(blob, name, extra = '') {
  const url = blobUrl(blob); setResult(`${extra}<audio controls src="${url}"></audio>${downloadLink(url, name)}`);
}
function enhanceScreen(mode) {
  const strengths = mode === 'noise' ? [['-38', 'Light'], ['-30', 'Medium'], ['-24', 'Strong']] : [['-40', 'Gentle'], ['-32', 'Medium'], ['-26', 'Strong']];
  workspace.innerHTML = fileInput('audioFile', { accept: 'audio/*,video/*', label: 'Choose a voice recording' }) +
    field(mode === 'noise' ? 'Noise reduction strength' : 'Cleaning strength', selectBox('strength', strengths, strengths[1][0])) +
    `<p class="hint">${mode === 'noise' ? 'Lowers sound in the quiet gaps between words.' : 'Removes low rumble, adds clarity to speech, evens out loud and soft parts, and sets a good volume.'} This is classic audio processing, not AI. Best for speech.</p>` + runButton(mode === 'noise' ? 'Reduce noise' : 'Enhance voice');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Processing…', async () => {
    const f = $('audioFile').files[0]; if (!f) throw new Error('Please choose an audio file first.'); clearResult();
    const buf = await decodeFile(f), gate = Number($('strength').value);
    const out = await enhanceAudio(buf, mode === 'noise' ? { gate, highpass: 100, presence: 0 } : { gate, highpass: 90, presence: 3 });
    audioResult(audioToWav(out), `${baseName(f)}-${mode === 'noise' ? 'quieter' : 'enhanced'}.wav`, `<p>Length: ${buf.duration.toFixed(1)} s · Output is a WAV file.</p>`);
    setMessage('Done! Listen to the result before downloading.', 'success');
  });
}
renderers.voiceEnhance = () => enhanceScreen('voice');
renderers.noiseRemove = () => enhanceScreen('noise');
renderers.voiceChange = () => {
  workspace.innerHTML = fileInput('audioFile', { accept: 'audio/*,video/*', label: 'Choose a voice recording' }) +
    field('Effect', selectBox('vcPreset', [['deep', 'Deep voice'], ['high', 'High voice (chipmunk)'], ['robot', 'Robot'], ['echo', 'Echo']])) +
    '<p class="hint">Deep and High change pitch and speed together (like slowing or speeding up a tape). Robot and Echo keep the same speed.</p>' + runButton('Change voice');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Processing…', async () => {
    const f = $('audioFile').files[0]; if (!f) throw new Error('Please choose an audio file first.'); clearResult();
    const buf = await decodeFile(f), preset = $('vcPreset').value, sr = buf.sampleRate, rate = preset === 'deep' ? 0.8 : preset === 'high' ? 1.3 : 1, tail = preset === 'echo' ? Math.ceil(sr * 0.9) : 0;
    const off = new OfflineAudioContext(buf.numberOfChannels, Math.ceil(buf.length / rate) + tail, sr), src = off.createBufferSource();
    src.buffer = buf; src.playbackRate.value = rate;
    if (preset === 'robot') {   // ring modulation: awaz ko 60 Hz oscillator se guna karna
      const g = off.createGain(); g.gain.value = 0; const osc = off.createOscillator(); osc.type = 'sine'; osc.frequency.value = 60; osc.connect(g.gain); src.connect(g); g.connect(off.destination); osc.start();
    } else if (preset === 'echo') {
      const delay = off.createDelay(1); delay.delayTime.value = 0.28; const fb = off.createGain(); fb.gain.value = 0.4;
      src.connect(off.destination); src.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(off.destination);
    } else src.connect(off.destination);
    src.start();
    const out = await off.startRendering();
    audioResult(audioToWav(out), `${baseName(f)}-${preset}.wav`, `<p>New length: ${out.duration.toFixed(1)} s</p>`); setMessage('Done! Listen before downloading.', 'success');
  });
};
renderers.audioTrim = () => {
  workspace.innerHTML = fileInput('audioFile', { accept: 'audio/*', label: 'Choose an audio file' }) + `<div class="cols">${field('Start (seconds)', '<input id="tStart" type="number" min="0" step="0.1" value="0">')}${field('End (seconds)', '<input id="tEnd" type="number" min="0" step="0.1" value="10">')}</div><p class="hint" id="audioInfo"></p>` + runButton('Trim audio');
  onFiles('audioFile', async ([f]) => { if (!f) return; try { const b = await decodeFile(f); $('audioInfo').textContent = `Length: ${b.duration.toFixed(1)} seconds`; $('tEnd').value = b.duration.toFixed(1); } catch (e) { setMessage(e.message, 'error'); } });
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Trimming…', async () => {
    const f = $('audioFile').files[0]; if (!f) throw new Error('Please choose an audio file first.'); clearResult();
    const buf = await decodeFile(f), s = Number($('tStart').value), e = Number($('tEnd').value);
    if (!(s >= 0 && e > s && s < buf.duration)) throw new Error(`Start must be smaller than End, and inside the audio (0 – ${buf.duration.toFixed(1)} s).`);
    const a = Math.floor(s * buf.sampleRate), b = Math.min(buf.length, Math.floor(e * buf.sampleRate)), arrays = [];
    for (let c = 0; c < buf.numberOfChannels; c++) arrays.push(buf.getChannelData(c).slice(a, b));
    audioResult(audioToWav(bufferFrom(arrays, buf.sampleRate)), `${baseName(f)}-trimmed.wav`, `<p>New length: ${((b - a) / buf.sampleRate).toFixed(1)} s</p>`);
    setMessage('Done!', 'success');
  });
};
renderers.audioMerge = () => {
  workspace.innerHTML = fileInput('audioFiles', { multiple: true, accept: 'audio/*', label: 'Choose 2 or more audio files (joined in this order)' }) + runButton('Merge audio');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Merging…', async () => {
    const files = Array.from($('audioFiles').files); if (files.length < 2) throw new Error('Please select at least two audio files.'); clearResult();
    const bufs = []; for (const f of files) bufs.push(await decodeFile(f));
    const sr = bufs[0].sampleRate, ch = Math.min(2, Math.max(...bufs.map(b => b.numberOfChannels))), parts = [];
    for (const b of bufs) parts.push(await conform(b, sr, ch));
    const total = parts.reduce((n, b) => n + b.length, 0), arrays = []; for (let c = 0; c < ch; c++) arrays.push(new Float32Array(total));
    let off = 0; for (const b of parts) { for (let c = 0; c < ch; c++) arrays[c].set(b.getChannelData(c), off); off += b.length; }
    audioResult(audioToWav(bufferFrom(arrays, sr)), 'toolnest-merged.wav', `<p>Merged ${files.length} files · ${(total / sr).toFixed(1)} s</p>`);
    setMessage('Done!', 'success');
  });
};
renderers.audioWav = () => {
  workspace.innerHTML = fileInput('audioFile', { accept: 'audio/*', label: 'Choose an audio file (MP3, M4A, OGG, WAV…)' }) + '<p class="hint">The result is a WAV file. WAV is big but works everywhere.</p>' + runButton('Convert to WAV');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Converting…', async () => {
    const f = $('audioFile').files[0]; if (!f) throw new Error('Please choose an audio file first.'); clearResult();
    const blob = audioToWav(await decodeFile(f)); audioResult(blob, `${baseName(f)}.wav`, `<p>Before: ${formatBytes(f.size)} · After: ${formatBytes(blob.size)}</p>`); setMessage('Done!', 'success');
  });
};
renderers.silenceRemove = () => {
  workspace.innerHTML = fileInput('audioFile', { accept: 'audio/*', label: 'Choose an audio file' }) + field('Treat sound quieter than this as silence', selectBox('silTh', [['-50', 'Very quiet (-50 dB)'], ['-40', 'Quiet (-40 dB)'], ['-30', 'Louder (-30 dB)']], '-40')) + field('Remove silences longer than', selectBox('silLen', [['0.3', '0.3 seconds'], ['0.5', '0.5 seconds'], ['1', '1 second']], '0.5')) + runButton('Remove silence');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Processing…', async () => {
    const f = $('audioFile').files[0]; if (!f) throw new Error('Please choose an audio file first.'); clearResult();
    const buf = await decodeFile(f), sr = buf.sampleRate, win = Math.floor(sr * 0.02), th = Math.pow(10, Number($('silTh').value) / 20), minWins = Math.ceil(Number($('silLen').value) / 0.02), n = buf.length, nWin = Math.ceil(n / win), silent = [];
    for (let w = 0; w < nWin; w++) { let s = 0, c = 0; for (let ch = 0; ch < buf.numberOfChannels; ch++) { const d = buf.getChannelData(ch); for (let i = w * win; i < Math.min(n, (w + 1) * win); i++) { s += d[i] * d[i]; c++; } } silent.push(Math.sqrt(s / c) < th); }
    const drop = new Array(nWin).fill(false);
    for (let w = 0; w < nWin;) { if (!silent[w]) { w++; continue; } let e = w; while (e < nWin && silent[e]) e++; if (e - w >= minWins) for (let k = w; k < e; k++) drop[k] = true; w = e; }
    const keepWins = drop.filter(d => !d).length; if (!keepWins) throw new Error('Everything counted as silence. Choose a "Louder" setting.');
    const arrays = []; for (let ch = 0; ch < buf.numberOfChannels; ch++) { const d = buf.getChannelData(ch), out = new Float32Array(keepWins * win); let o = 0; for (let w = 0; w < nWin; w++) if (!drop[w]) { out.set(d.subarray(w * win, Math.min(n, (w + 1) * win)), o); o += win; } arrays.push(out.subarray(0, Math.min(out.length, o))); }
    const removed = (drop.filter(Boolean).length * 0.02);
    audioResult(audioToWav(bufferFrom(arrays, sr)), `${baseName(f)}-no-silence.wav`, `<p>Removed about ${removed.toFixed(1)} s of silence.</p>`);
    setMessage(removed ? 'Done!' : 'No long silences were found with these settings.', removed ? 'success' : '');
  });
};
renderers.textSpeech = () => {
  workspace.innerHTML = field('Text to read aloud', textArea('textInput', 'Type or paste text to hear it spoken…')) + field('Speed', '<input id="speechRate" type="range" min="0.5" max="2" step="0.1" value="1">') + '<div class="btn-row"><button id="speakBtn" class="btn btn-primary" type="button">▶ Speak</button><button id="stopSpeak" class="btn btn-light" type="button">Stop</button></div><p class="hint">Uses the voices on your device, so they differ between phones and computers.</p>';
  $('speakBtn').onclick = () => {
    if (!('speechSynthesis' in window)) return setMessage('Speech is not supported in this browser.', 'error');
    const text = $('textInput').value.trim(); if (!text) return setMessage('Please type some text first.', 'error');
    const u = new SpeechSynthesisUtterance(text); u.rate = Number($('speechRate').value) || 1; speechSynthesis.cancel(); speechSynthesis.speak(u); setMessage('Speaking…', 'success');
  };
  $('stopSpeak').onclick = () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); setMessage('Stopped.'); };
};
renderers.speechText = () => {
  workspace.innerHTML = '<p class="hint">Works best in Chrome or Edge. Allow the microphone when asked.</p>' + field('Language', selectBox('speechLang', [['en-US', 'English (US)'], ['en-GB', 'English (UK)'], ['ur-PK', 'Urdu (Pakistan)']])) + '<div class="btn-row"><button id="startRec" class="btn btn-primary" type="button">🎙 Start listening</button><button id="stopRec" class="btn btn-light" type="button">Stop</button></div>' + field('Recognized text', textArea('speechResult', 'Your words will appear here…'));
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; let rec = null;
  $('startRec').onclick = () => {
    if (!SR) return setMessage('Speech recognition is not supported in this browser. Try Chrome or Edge.', 'error');
    rec = new SR(); rec.lang = $('speechLang').value; rec.continuous = true; rec.interimResults = true;
    rec.onresult = e => { let out = ''; for (let i = 0; i < e.results.length; i++) out += e.results[i][0].transcript + ' '; $('speechResult').value = out; };
    rec.onerror = e => setMessage('Microphone problem: ' + e.error, 'error'); rec.onend = () => setMessage('Stopped listening.');
    rec.start(); setMessage('Listening…', 'success');
  };
  $('stopRec').onclick = () => { if (rec) rec.stop(); };
};

// ---------- VIDEO ----------
renderers.videoAudio = () => {
  workspace.innerHTML = fileInput('videoFile', { accept: 'video/*', label: 'Choose a video' }) + '<p class="hint">The sound is saved as a WAV file. Very long videos can use a lot of memory.</p>' + runButton('Extract audio');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Extracting…', async () => {
    const f = $('videoFile').files[0]; if (!f) throw new Error('Please choose a video first.'); clearResult();
    audioResult(audioToWav(await decodeFile(f)), `${baseName(f)}.wav`); setMessage('Done!', 'success');
  });
};
renderers.thumbnail = () => {
  workspace.innerHTML = fileInput('videoFile', { accept: 'video/*', label: 'Choose a video' }) + '<div id="vidBox"></div><p class="hint">Play or drag the video to the frame you like, pause it, then press the button.</p><button class="btn btn-primary" id="runTool" type="button">Save this frame</button>';
  let video = null;
  onFiles('videoFile', ([f]) => { if (!f) return; $('vidBox').innerHTML = `<video id="vid" controls src="${blobUrl(f)}" style="width:100%;border-radius:14px"></video>`; video = $('vid'); video.onerror = () => setMessage('This video format cannot be played by your browser.', 'error'); });
  $('runTool').onclick = async () => {
    if (!video || !video.videoWidth) return setMessage('Please choose a video and wait until it loads.', 'error');
    const c = newCanvas(video.videoWidth, video.videoHeight); c.getContext('2d').drawImage(video, 0, 0);
    try { const url = blobUrl(await canvasToBlob(c, 'image/png')); setResult(`<p>Frame at ${video.currentTime.toFixed(1)} s · ${c.width}×${c.height}px</p><img src="${url}" alt="Thumbnail">${downloadLink(url, 'thumbnail.png')}`); setMessage('Saved!', 'success'); }
    catch (e) { setMessage(e.message, 'error'); }
  };
};

// ---------- TEXT ----------
renderers.wordCounter = () => {
  workspace.innerHTML = field('Your text', textArea('textInput')) + '<div id="counterResult" class="result">Words: 0 · Characters: 0 · Sentences: 0 · Paragraphs: 0 · Reading time: 0 min</div>';
  $('textInput').addEventListener('input', () => {
    const v = $('textInput').value, words = (v.trim().match(/\S+/g) || []).length, sentences = (v.match(/[.!?۔]+(?=\s|$)/g) || []).length, paragraphs = v.trim() ? v.trim().split(/\n\s*\n/).length : 0;
    $('counterResult').textContent = `Words: ${words} · Characters: ${v.length} · Sentences: ${sentences} · Paragraphs: ${paragraphs} · Reading time: ${words ? Math.max(1, Math.round(words / 200)) : 0} min`;
  });
};
renderers.caseConvert = () => {
  workspace.innerHTML = field('Your text', textArea('textInput')) + field('Convert to', selectBox('caseMode', [['upper', 'UPPERCASE'], ['lower', 'lowercase'], ['title', 'Title Case'], ['sentence', 'Sentence case']])) + runButton('Convert');
  $('runTool').onclick = () => {
    let v = $('textInput').value; const m = $('caseMode').value;
    if (m === 'upper') v = v.toUpperCase();
    if (m === 'lower') v = v.toLowerCase();
    if (m === 'title') v = v.toLowerCase().replace(/\b\p{L}/gu, c => c.toUpperCase());
    if (m === 'sentence') v = v.toLowerCase().replace(/(^\s*\p{L}|[.!?]\s+\p{L})/gu, c => c.toUpperCase());
    showTextResult(v);
  };
};
renderers.removeSpaces = () => {
  workspace.innerHTML = field('Your text', textArea('textInput')) + runButton('Clean text');
  $('runTool').onclick = () => showTextResult($('textInput').value.replace(/[ \t]+/g, ' ').replace(/ ?\n ?/g, '\n').replace(/\n{3,}/g, '\n\n').trim());
};
renderers.duplicateLines = () => {
  workspace.innerHTML = field('Your text (one item per line)', textArea('textInput')) + runButton('Remove duplicate lines');
  $('runTool').onclick = () => { const lines = $('textInput').value.split(/\r?\n/), out = [...new Set(lines)]; showTextResult(out.join('\n')); setMessage(`Removed ${lines.length - out.length} duplicate line(s).`, 'success'); };
};
function diffLines(a, b) {
  const x = a.split(/\r?\n/), y = b.split(/\r?\n/), m = x.length, n = y.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = x[i] === y[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = []; let i = 0, j = 0;
  while (i < m && j < n) { if (x[i] === y[j]) { out.push([' ', x[i]]); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) out.push(['-', x[i++]]); else out.push(['+', y[j++]]); }
  while (i < m) out.push(['-', x[i++]]); while (j < n) out.push(['+', y[j++]]);
  return out;
}
renderers.textCompare = () => {
  workspace.innerHTML = field('First text', textArea('textA', 'Paste the first text…')) + field('Second text', textArea('textB', 'Paste the second text…')) + runButton('Compare');
  $('runTool').onclick = () => {
    const a = $('textA').value, b = $('textB').value;
    if (a.split('\n').length > 2000 || b.split('\n').length > 2000) return setMessage('Please compare up to 2000 lines at a time.', 'error');
    if (a === b) return setResult('The two texts are identical.');
    const d = diffLines(a, b), added = d.filter(l => l[0] === '+').length, removed = d.filter(l => l[0] === '-').length;
    setResult(`<p><b>${added}</b> line(s) added · <b>${removed}</b> line(s) removed</p><div class="diff">${d.map(([k, s]) => `<div class="${k === '+' ? 'add' : k === '-' ? 'del' : ''}">${k === ' ' ? '&nbsp;' : k} ${escapeHTML(s)}</div>`).join('')}</div><p class="hint">Green = only in the second text. Red = only in the first text.</p>`);
  };
};
renderers.bulletPoints = () => {
  workspace.innerHTML = field('Your text', textArea('textInput')) + '<p class="hint">This simple version puts each sentence on its own bullet. For a smart summary use "AI Text Summarizer".</p>' + runButton('Make bullet points');
  $('runTool').onclick = () => showTextResult($('textInput').value.split(/(?<=[.!?۔])\s+|\n+/).map(s => s.trim()).filter(Boolean).map(s => '• ' + s).join('\n'));
};
renderers.keyword = () => {
  workspace.innerHTML = field('Your text', textArea('textInput')) + runButton('Find keywords');
  $('runTool').onclick = () => {
    const stop = new Set('the and for that with this from are was were you your have has had but not all can will into about then them they our out use using its his her she him who what when where which would could should there their been being than also just more most some such only over very any each other these those'.split(' '));
    const counts = {}; (($('textInput').value.toLowerCase().match(/[\p{L}\p{N}']{3,}/gu)) || []).filter(w => !stop.has(w)).forEach(w => counts[w] = (counts[w] || 0) + 1);
    const list = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20);
    if (!list.length) return setMessage('Please enter some text first.', 'error');
    setMessage(''); setResult(list.map(([w, n]) => `<b>${escapeHTML(w)}</b> (${n})`).join(' · '));
  };
};

// ---------- UTILITIES ----------
renderers.qr = () => {
  workspace.innerHTML = field('Text or link', '<input id="qrText" type="text" placeholder="https://example.com">') + field('Size', selectBox('qrSize', [['180', 'Small'], ['240', 'Medium'], ['320', 'Large'], ['400', 'Extra large']], '240')) + runButton('Generate QR code');
  $('runTool').onclick = () => {
    const val = $('qrText').value.trim(); if (!val) return setMessage('Please enter some text or a link.', 'error');
    if (!window.QRCode) return setMessage('The QR library did not load. It needs an internet connection — check it and reload the page.', 'error');
    const canvas = document.createElement('canvas');
    QRCode.toCanvas(canvas, val, { width: Number($('qrSize').value), margin: 2 }, err => {
      if (err) return setMessage('Could not create a QR code. The text may be too long.', 'error');
      const url = canvas.toDataURL('image/png'); setResult(`<img src="${url}" alt="QR code">${downloadLink(url, 'toolnest-qr.png')}`); setMessage('QR code ready.', 'success');
    });
  };
};
renderers.colorPicker = () => {
  workspace.innerHTML = field('Pick a color', '<input id="colorValue" type="color" value="#6c4df6">') + '<div id="colorResult" class="result"></div>';
  const update = () => { const h = $('colorValue').value, n = parseInt(h.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; $('colorResult').innerHTML = `HEX: <b>${h.toUpperCase()}</b> · RGB: <b>${r}, ${g}, ${b}</b> <button class="btn btn-light" type="button" id="copyColor">Copy HEX</button>`; $('copyColor').onclick = () => copyText(h.toUpperCase()); };
  $('colorValue').oninput = update; update();
};
renderers.password = () => {
  workspace.innerHTML = field('Length (8 – 64)', '<input id="passLength" type="number" min="8" max="64" value="16">') + '<label class="check"><input type="checkbox" id="passSymbols" checked> Include symbols</label>' + runButton('Generate password');
  $('runTool').onclick = () => {
    const len = Math.min(64, Math.max(8, Math.round(Number($('passLength').value)) || 16));
    let chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'; if ($('passSymbols').checked) chars += '!@#$%^*()-_=+?';
    const limit = Math.floor(4294967296 / chars.length) * chars.length, out = [];   // modulo-bias se bachne ke liye
    while (out.length < len) { const a = new Uint32Array(len); crypto.getRandomValues(a); for (const n of a) if (n < limit && out.length < len) out.push(chars[n % chars.length]); }
    showTextResult(out.join(''));
  };
};
const UNITS = {
  length: { m: 1, km: 1000, cm: .01, mm: .001, mile: 1609.344, yard: .9144, foot: .3048, inch: .0254 },
  weight: { kg: 1, g: .001, mg: 1e-6, tonne: 1000, lb: .45359237, oz: .028349523125 },
  area: { 'm²': 1, 'km²': 1e6, hectare: 1e4, acre: 4046.8564224, 'ft²': .09290304, 'marla (272.25 ft²)': 25.2928526, 'kanal (20 marla)': 505.857052 },
  volume: { liter: 1, mL: .001, 'm³': 1000, 'gallon (US)': 3.785411784, 'cup (US)': .2365882365 },
  temperature: { '°C': 1, '°F': 1, K: 1 }
};
function convertUnit(cat, from, to, v) {
  if (cat === 'temperature') { const c = from === '°C' ? v : from === '°F' ? (v - 32) * 5 / 9 : v - 273.15; return to === '°C' ? c : to === '°F' ? c * 9 / 5 + 32 : c + 273.15; }
  return v * UNITS[cat][from] / UNITS[cat][to];
}
renderers.unitConvert = () => {
  const cats = Object.keys(UNITS), opts = c => Object.keys(UNITS[c]).map(u => [u, u]);
  workspace.innerHTML = field('Type', selectBox('uCat', cats.map(c => [c, c[0].toUpperCase() + c.slice(1)]))) + field('Value', '<input id="uVal" type="number" value="1" step="any">') + `<div class="cols"><div><label class="field-label">From</label><select id="uFrom"></select></div><div><label class="field-label">To</label><select id="uTo"></select></div></div><div id="uOut" class="result"></div>`;
  const fill = () => { const o = opts($('uCat').value).map(([v]) => `<option>${escapeHTML(v)}</option>`).join(''); $('uFrom').innerHTML = o; $('uTo').innerHTML = o; $('uTo').selectedIndex = 1; calc(); };
  const calc = () => { const v = Number($('uVal').value); if ($('uVal').value === '' || !isFinite(v)) { $('uOut').textContent = 'Enter a number.'; return; } const r = convertUnit($('uCat').value, $('uFrom').value, $('uTo').value, v); $('uOut').innerHTML = `${v} ${escapeHTML($('uFrom').value)} = <b>${Number(r.toPrecision(10)).toLocaleString('en-US', { maximumFractionDigits: 8 })}</b> ${escapeHTML($('uTo').value)}`; };
  $('uCat').onchange = fill; ['uVal', 'uFrom', 'uTo'].forEach(i => $(i).addEventListener('input', calc)); fill();
};
renderers.urlCode = () => {
  workspace.innerHTML = field('Text or link', textArea('textInput')) + field('Action', selectBox('mode', [['encode', 'Encode'], ['decode', 'Decode']])) + runButton('Convert');
  $('runTool').onclick = () => { try { const v = $('textInput').value; showTextResult($('mode').value === 'encode' ? encodeURIComponent(v) : decodeURIComponent(v)); setMessage(''); } catch (e) { setMessage('This text cannot be decoded. Check it and try again.', 'error'); } };
};
renderers.base64 = () => {
  const enc = s => { const b = new TextEncoder().encode(s); let bin = ''; b.forEach(x => bin += String.fromCharCode(x)); return btoa(bin); };
  const dec = s => { const bin = atob(s.trim()), b = Uint8Array.from(bin, c => c.charCodeAt(0)); return new TextDecoder('utf-8', { fatal: true }).decode(b); };
  workspace.innerHTML = field('Text', textArea('textInput')) + field('Action', selectBox('mode', [['encode', 'Encode to Base64'], ['decode', 'Decode from Base64']])) + runButton('Convert');
  $('runTool').onclick = () => { try { const v = $('textInput').value; showTextResult($('mode').value === 'encode' ? enc(v) : dec(v)); setMessage(''); } catch (e) { setMessage('This is not valid Base64 text.', 'error'); } };
};
renderers.percentage = () => {
  workspace.innerHTML = `<div class="cols">${field('Percentage (%)', '<input id="pv" type="number" value="15" step="any">')}${field('Of this number', '<input id="nv" type="number" value="200" step="any">')}</div><div id="pOut" class="result"></div>`;
  const calc = () => { const p = Number($('pv').value), n = Number($('nv').value); $('pOut').innerHTML = ($('pv').value === '' || $('nv').value === '') ? 'Enter both numbers.' : `${p}% of ${n} = <b>${(p / 100 * n).toLocaleString('en-US', { maximumFractionDigits: 10 })}</b>`; };
  ['pv', 'nv'].forEach(i => $(i).addEventListener('input', calc)); calc();
};
renderers.favicon = () => {
  workspace.innerHTML = `<div class="cols">${field('Letter(s), max 2', '<input id="fvText" type="text" maxlength="2" value="T">')}${field('Shape', selectBox('fvShape', [['round', 'Rounded square'], ['circle', 'Circle'], ['square', 'Square']]))}</div><div class="cols">${field('Background color', '<input id="fvBg" type="color" value="#6c4df6">')}${field('Letter color', '<input id="fvFg" type="color" value="#ffffff">')}</div>` + runButton('Create favicon');
  const draw = size => {
    const c = newCanvas(size, size), x = c.getContext('2d'), shape = $('fvShape').value; x.fillStyle = $('fvBg').value; x.beginPath();
    if (shape === 'circle') x.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); else if (shape === "round" && x.roundRect) x.roundRect(0, 0, size, size, size * .22); else x.rect(0, 0, size, size); x.fill();
    x.fillStyle = $('fvFg').value; x.font = `800 ${size * ($('fvText').value.length > 1 ? .5 : .62)}px Manrope, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText($('fvText').value || '?', size / 2, size / 2 + size * .04); return c;
  };
  $('runTool').onclick = async () => {
    try { const sizes = [32, 180, 512]; let html = '<div class="btn-row">'; for (const s of sizes) { const url = blobUrl(await canvasToBlob(draw(s), 'image/png')); html += downloadLink(url, `favicon-${s}.png`, `Download ${s}×${s}`); } setResult(html + `</div><p class="hint">Add to your page: &lt;link rel="icon" type="image/png" href="favicon-32.png"&gt;</p><img src="${blobUrl(await canvasToBlob(draw(128), 'image/png'))}" alt="Preview" style="width:64px">`); setMessage('Done!', 'success'); }
    catch (e) { setMessage('Could not create the icon in this browser.', 'error'); }
  };
};
renderers.metaPreview = () => {
  workspace.innerHTML = field('Page title', '<input id="mpTitle" type="text" value="ToolNest — Your Everyday Digital Toolkit">') + field('Description', textArea('mpDesc', 'Write the page description…')) + field('Web address', '<input id="mpUrl" type="text" value="https://toolnest.example/">') + '<div id="mpOut"></div>';
  $('mpDesc').value = 'Image, PDF, audio, text and AI tools in one clean place.';
  const upd = () => {
    const t = $('mpTitle').value, d = $('mpDesc').value, u = $('mpUrl').value, tc = t.length <= 60 ? 'count-ok' : 'count-bad', dc = d.length <= 160 ? 'count-ok' : 'count-bad';
    $('mpOut').innerHTML = `<div class="serp"><div class="u">${escapeHTML(u)}</div><div class="t">${escapeHTML(t.length > 60 ? t.slice(0, 57) + '…' : t) || 'Title'}</div><div class="d">${escapeHTML(d.length > 160 ? d.slice(0, 157) + '…' : d)}</div></div><p class="hint"><span class="${tc}">Title: ${t.length}/60</span> · <span class="${dc}">Description: ${d.length}/160</span> (Google cuts longer text.)</p>`;
  };
  ['mpTitle', 'mpDesc', 'mpUrl'].forEach(i => $(i).addEventListener('input', upd)); upd();
};

/* ======================================================================
   7) AI TOOLS  (browser -> our server -> AI service)
   ====================================================================== */
async function callAI(payload) {
  if (location.protocol === 'file:') throw new Error('AI tools need the server. Run "node server.js" in the project folder, then open http://localhost:3000');
  const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), 45000); let res;
  try {
    res = await fetch('/api/write', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal });
  } catch (e) {
    throw new Error(e.name === 'AbortError' ? 'The AI took too long. Please try again.' : 'Cannot reach the server. Make sure "node server.js" is running.');
  } finally { clearTimeout(timer); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Something went wrong (code ${res.status}).`);
  return data.result;
}
const AI_MAX = 15000;   // server.js mein MAX_INPUT_CHARS se barabar rakhein
const TONE_OPTS = [['neutral', 'Neutral'], ['professional', 'Professional'], ['friendly', 'Friendly'], ['casual', 'Casual'], ['persuasive', 'Persuasive'], ['formal', 'Formal']];
const LANG_OPTS = [['auto', 'Same as my text'], ['en', 'English'], ['ur', 'Urdu'], ['roman-ur', 'Roman Urdu']];
const AI_SCREENS = {
  'ai-write': { mode: 'write', label: 'Your idea or text', ph: 'Example: Write a short message thanking my team for finishing the project early.', btn: 'Generate', opts: [['action', 'What should the AI do?', [['write', 'Write something new from my idea'], ['rewrite', 'Rewrite my text'], ['improve', 'Improve my text (fix and polish)'], ['shorter', 'Make my text shorter'], ['longer', 'Make my text longer']]], ['tone', 'Tone', TONE_OPTS], ['language', 'Language', LANG_OPTS]] },
  'ai-summary': { mode: 'summary', label: 'Text to summarize', ph: 'Paste a long text here…', btn: 'Summarize', opts: [['length', 'Summary style', [['short', 'Very short (2–3 sentences)'], ['medium', 'One paragraph'], ['bullets', 'Bullet points']]], ['language', 'Language', LANG_OPTS]] },
  'ai-grammar': { mode: 'grammar', label: 'Text to check', ph: 'Paste text with mistakes…', btn: 'Fix grammar', opts: [] },
  'ai-paraphrase': { mode: 'paraphrase', label: 'Text to rewrite', ph: 'Paste the text you want in different words…', btn: 'Paraphrase', opts: [['tone', 'Tone', TONE_OPTS], ['language', 'Language', LANG_OPTS]] },
  'ai-email': { mode: 'email', label: 'What should the email say?', ph: 'Example: Ask my manager for leave on Friday because of a family event.', btn: 'Write email', opts: [['tone', 'Tone', TONE_OPTS], ['language', 'Language', LANG_OPTS]] },
  'ai-translate': { mode: 'translate', label: 'Text to translate', ph: 'Paste or type the text…', btn: 'Translate', opts: [['target', 'Translate into', ['English', 'Urdu', 'Roman Urdu', 'Hindi', 'Arabic', 'French', 'German', 'Spanish', 'Turkish', 'Chinese'].map(x => [x, x])]] },
  'ai-notes': { mode: 'notes', label: 'Meeting transcript or rough notes', ph: 'Paste what was said in the meeting…', btn: 'Create meeting notes', opts: [['language', 'Language', LANG_OPTS]] },
  'ai-resume': { mode: 'resume', label: 'Your details', ph: 'Name, phone, email, education, jobs (with years), skills, languages…', btn: 'Write my resume', opts: [['tone', 'Tone', TONE_OPTS], ['language', 'Language', LANG_OPTS]] },
  'ai-caption': { mode: 'caption', label: 'Topic or short description', ph: 'Example: Launching our new coffee shop this Saturday.', btn: 'Create captions', opts: [['platform', 'Platform', ['Instagram', 'Facebook', 'LinkedIn', 'X (Twitter)', 'TikTok'].map(p => [p, p])], ['language', 'Language', LANG_OPTS]] }
};
Object.keys(AI_SCREENS).forEach(type => {
  renderers[type] = () => {
    const cfg = AI_SCREENS[type];
    workspace.innerHTML = field(cfg.label, textArea('aiText', cfg.ph)) + cfg.opts.map(([id, label, o]) => field(label, selectBox('ai_' + id, o))).join('') + `<p class="hint" id="aiCount">0 / ${AI_MAX} characters</p>` + runButton(cfg.btn);
    $('aiText').addEventListener('input', () => { const n = $('aiText').value.length; $('aiCount').textContent = `${n} / ${AI_MAX} characters`; $('aiCount').className = 'hint ' + (n > AI_MAX ? 'count-bad' : ''); });
    const btn = $('runTool');
    btn.onclick = withBusy(btn, 'Thinking…', async () => {
      const text = $('aiText').value.trim(); if (!text) throw new Error('Please enter some text first.');
      if (text.length > AI_MAX) throw new Error('Your text is too long. Please keep it under ' + AI_MAX + ' characters.');
      clearResult(); setMessage('');
      const payload = { mode: cfg.mode, text }; cfg.opts.forEach(([id]) => payload[id] = $('ai_' + id).value);
      const result = await callAI(payload); showTextResult(result); setMessage('Done! Please read the result before using it — AI can make mistakes.', 'success');
    });
  };
});

renderers['ai-pdfsummary'] = () => {
  workspace.innerHTML = fileInput('pdfFile', { accept: '.pdf,application/pdf', label: 'Choose a PDF (it must contain selectable text, not scanned pictures)' }) +
    field('Summary style', selectBox('ai_length', [['short', 'Very short (2–3 sentences)'], ['medium', 'One paragraph'], ['bullets', 'Bullet points']], 'bullets')) + field('Language', selectBox('ai_language', LANG_OPTS)) + runButton('Summarize PDF');
  const btn = $('runTool');
  btn.onclick = withBusy(btn, 'Reading PDF…', async () => {
    const f = $('pdfFile').files[0]; if (!f) throw new Error('Please choose a PDF first.'); clearResult(); setMessage('');
    const pdfjs = await loadPdfJs(); let doc;
    try { doc = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise; } catch (e) { throw new Error('This PDF could not be read. It may be damaged or password-protected.'); }
    let text = '', pagesUsed = 0;
    for (let p = 1; p <= doc.numPages && text.length < AI_MAX; p++) { const tc = await (await doc.getPage(p)).getTextContent(); text += tc.items.map(i => i.str + (i.hasEOL ? '\n' : ' ')).join('') + '\n'; pagesUsed = p; }
    text = text.replace(/[ \t]+/g, ' ').trim();
    if (!text) throw new Error('No selectable text found. This PDF may be a scan (pictures of pages).');
    const cut = text.length > AI_MAX; if (cut) text = text.slice(0, AI_MAX);
    btn.textContent = 'Thinking…';
    const result = await callAI({ mode: 'summary', text, length: $('ai_length').value, language: $('ai_language').value });
    showTextResult(result);
    setMessage(cut ? `Done. Only the first ${AI_MAX} characters (about ${pagesUsed} of ${doc.numPages} pages) were summarized.` : 'Done! Please read the result before using it — AI can make mistakes.', 'success');
  });
};

/* ======================================================================
   8) START-UP  (events)
   ====================================================================== */
$('year').textContent = new Date().getFullYear();
grid.addEventListener('click', e => { const card = e.target.closest('.tool'); if (card) openTool(card.dataset.id); });
workspace.addEventListener('click', e => { const b = e.target.closest('[data-copy]'); if (b) copyText($(b.dataset.copy).value); });
searchInput.addEventListener('input', renderTools);
$('searchForm').addEventListener('submit', e => { e.preventDefault(); renderTools(); goToTools(); });
document.querySelectorAll('.tab').forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter)));
document.querySelectorAll('.hero-cats [data-filter], .explore[data-filter], .top-nav [data-filter]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); searchInput.value = ''; goToTools(el.dataset.filter); }));
$('closeModal').addEventListener('click', closeTool); $('modalDone').addEventListener('click', closeTool);
modal.addEventListener('click', e => { if (e.target === modal) closeTool(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeTool();
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' && modal.classList.contains('hidden')) { e.preventDefault(); searchInput.focus(); }
});
renderTools();

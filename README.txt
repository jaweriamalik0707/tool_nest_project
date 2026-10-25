=====================================================
 ToolNest — Mukammal Guide (Roman Urdu, beginner ke liye)
=====================================================

PROJECT KI FILES
----------------
index.html        -> website ka dhancha (structure)
style.css         -> design (light + lavender, dark theme nahi)
script.js         -> saare tools aur search ka code
server.js         -> backend server (AI ke liye, aur website chalane ke liye)
.env.example      -> secret key ka template (copy karke .env banani hai)
libs/             -> PDF ki libraries (internet ke baghair bhi chalti hain)
tests/api-test.js -> backend ka test
package.json      -> project ki info (is mein kuch badalna nahi)


STEP 1: Node.js install karein (sirf ek baar)
---------------------------------------------
1. https://nodejs.org par jayein, "LTS" version download karke install karein.
2. Install ke baad Terminal / Command Prompt kholein aur likhein:   node --version
   Agar v18 ya us se bara number aaye (jaise v20.x.x) to sab theek hai.


STEP 2: Website chalayein
-------------------------
1. Terminal mein project folder mein jayein. Misaal:   cd Desktop/ToolNest
   (Windows mein folder ke andar address bar mein "cmd" likh kar Enter dabayein, wahin terminal khul jata hai.)
2. Likhein:   node server.js
3. Aap ko yeh nazar aayega:   ToolNest chal gaya:  http://localhost:3000
4. Browser mein http://localhost:3000 kholein.

IMPORTANT: index.html par double-click karke kholne se zyada tar tools chalte hain, lekin AI tools aur
"PDF to JPG / Extract PDF Text" sirf us waqt chalte hain jab aap http://localhost:3000 se kholein.
Server band karne ke liye terminal mein Ctrl + C dabayein.


STEP 3: AI Writing Assistant chalayein (free key)
-------------------------------------------------
1. https://aistudio.google.com/apikey par Google account se login karein aur "Create API key" dabayein.
   Key copy kar lein.
2. Project folder mein .env.example file ki copy banayein aur copy ka naam rakhein:   .env
   (sirf ".env", aage koi .example nahi.)
3. .env file ko Notepad se kholein aur yeh line badlein:
       GEMINI_API_KEY=yahan_apni_key_paste_karein
   ko apni asli key se, misaal:
       GEMINI_API_KEY=AIzaSy....
4. File save karein. Server ko Ctrl + C se band karke dobara "node server.js" chalayein.
   Ab terminal mein "AI ready" likha aana chahiye.
5. Website mein "AI Writing Assistant" kholein, kuch likhein aur "Generate" dabayein.

Free plan ke bare mein sach:
- Google ka free tier hai, lekin limits aur model ke naam bohat tezi se badalte hain. Aap ki apni limits
  https://aistudio.google.com/rate-limit par nazar aati hain.
- Free tier mein aap ka text Google apni products behtar karne ke liye istemal kar sakta hai. Is liye
  logon ka private/hassas data free tier par na bhejein.
- Agar "model not found" jaisa error aaye to AI Studio mein current Flash model ka naam dekh kar .env mein
  GEMINI_MODEL=... ki jagah likh dein. Code badalne ki zaroorat nahi.

SECURITY (aap ki key kaise mehfooz hai)
- Key sirf .env mein hai. Browser ko kabhi nahi milti. Browser sirf aap ke server se baat karta hai,
  aur server Google se.
- .env, server.js aur package.json internet par public nahi hote (test se confirm kiya gaya hai).
- Server har IP ko 1 minute mein 10 requests tak hi deta hai aur poori website ko 1 din mein 300 tak
  (.env mein badal sakte hain). Ek request mein max 15000 characters. Is se spam se free quota ya bill ko bachaya jata hai.
- .env ko kabhi GitHub par upload na karein ya kisi ko na bhejein. (.gitignore mein pehle se likha hai.)


KYA KAAM KARTA HAI (test kiya gaya) — kul 48 tools, sab chalte hain
-------------------------------------------------------------------
IMAGE (6) : Format Converter, Compressor, Resizer, Cropper, Passport Photo, WebP Converter
PDF   (6) : Merge, Split, JPG to PDF, Extract PDF Text, PDF to JPG, AI PDF Summarizer (AI)
AUDIO (9) : Voice Enhancer, Noise Reducer, Voice Changer, Trimmer, Merger, Audio to WAV, Silence Remover,
            Text to Speech, Speech to Text (yeh do browser/device par munhasir hain)
VIDEO (2) : Video to Audio (WAV), Thumbnail Maker
TEXT (15) : AI Writing Assistant, AI Summarizer, Grammar Checker, Paraphrasing, AI Email Writer,
            AI Translator, AI Meeting Notes, AI Resume Writer  (yeh 8 AI hain, server chahiye)
            Word Counter, Case Converter, Remove Spaces, Duplicate Lines, Text Compare, Bullet Points, Keywords
UTILS (10): QR Code, Color Picker, Password Generator, Unit Converter (Marla/Kanal samet), URL, Base64,
            Percentage, Favicon Generator, Meta Preview, AI Caption Generator (AI)

Website par ab koi "Coming soon" tool nahi hai. Jo cheezein naye server, nayi AI service ya bhari software
(FFmpeg, LibreOffice) mangti thin (Background Remover, Image Enhancer, OCR, Video Trimmer/Compressor,
PDF to Word wagera), woh list se hata di gayi hain. Jab aap in mein se koi chahein to hum ek ek karke add karenge.

Zaroori wazahat:
- 10 AI tools (Writer, Summarizer, Grammar, Paraphrase, Email, Translator, Meeting Notes, Resume, Caption,
  PDF Summarizer) sab ek hi route /api/write use karte hain, yani aap ko sirf ek Gemini key chahiye.
- AI PDF Summarizer sirf selectable text wale PDF par chalta hai (scan wali pictures par nahi). Bohat lambay
  PDF ke sirf pehle 15000 characters summarize hote hain, aur website yeh saaf likh deti hai.
- "Voice Enhancer" aur "Noise Reducer" aam audio processing hain (filter, compressor, noise gate), AI nahi.
- "Voice Changer" ke Deep/High effects awaz ka pitch aur speed dono badalte hain. Robot aur Echo speed nahi badalte.
- Audio ka output WAV hota hai (MP3 nahi). WAV bari file hoti hai lekin har jagah chalti hai.
- QR Code tool internet se ek chhoti library leta hai. Internet na ho to saaf message dikhata hai.


TEST KAISE CHALAYEIN
--------------------
Backend ka test (internet ya key ki zaroorat nahi, nakli AI use hota hai):
    node tests/api-test.js
Aakhir mein 0 failed likha aana chahiye.

Browser mein khud bhi test karein:
- Search bar mein "pdf" likhein -> sirf PDF wale tools aane chahiye.
- Image Compressor mein bari photo daalein, quality 40 karein -> file chhoti honi chahiye.
- Word Counter mein text likhein -> ginti foran badalni chahiye.


AGLA KAAM
---------
Pehle AI Writing Assistant ko apni asli key se chala kar dekhein. Agar woh theek chale to baqi AI tools
bhi chalenge, kyunke sab ek hi route use karte hain. Phir, agar aap chahein, hum naye tools ek ek karke
add kar sakte hain (har ek se pehle main current pricing aur free quota dobara check karunga):
  1. AI Background Remover   2. AI Image Enhancer   3. AI Voice Enhancer


WEBSITE ONLINE KARNI HO TO (deployment)
---------------------------------------
- GitHub Pages / Netlify ki sirf "static" hosting kaafi NAHI, kyunke AI ke liye server.js chalna zaroori hai.
  Aap ko aisi hosting chahiye jo Node.js chalaye (Render, Railway, ya koi VPS). Free/paid plans aur
  qeematein badalti rehti hain, is liye online karte waqt un ki current pricing dekh lein.
- Hosting ki settings mein "Environment Variables" ke andar GEMINI_API_KEY (aur GEMINI_MODEL) daalein.
  .env file upload nahi karni.
- Start command:   node server.js
- Website ko HTTPS par chalayein (zyada tar hosts khud dete hain).
- DAILY_LIMIT aur RATE_LIMIT_PER_MINUTE apne hisaab se rakhein, aur Google AI Studio mein apni usage dekhte rahein.
- Online jane se pehle privacy policy likhein: AI tools mein user ka text server aur Google tak jata hai.


AGAR KUCH GHALAT HO
-------------------
"node" is not recognized      -> Node.js install nahi hua ya terminal band karke dobara kholein.
Port 3000 is already in use   -> .env mein PORT=3001 likhein, phir http://localhost:3001 kholein.
AI is not set up yet          -> .env file nahi bani, ya key paste nahi ki, ya server restart nahi kiya.
The AI service rejected...    -> Key ghalat hai ya model ka naam purana hai (GEMINI_MODEL badlein).
Free AI limit reached         -> Thori der baad dobara try karein ya AI Studio mein limits dekhein.
PDF to JPG / PDF Text nahi    -> index.html double-click ki jagah http://localhost:3000 se kholein.

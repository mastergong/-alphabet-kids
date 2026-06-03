# 🎵 Alphabet Kids - Audio Setup Guide

This guide explains how to generate high-quality audio files for the Thai-English alphabet learning app using **Google Cloud Text-to-Speech API**.

---

## 📋 Prerequisites

- Node.js 14+ installed
- Google Cloud account (free tier available)
- Basic command line knowledge

---

## 🚀 Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **"New Project"** → Name it (e.g., "alphabet-kids")
3. Wait for project creation

### 3. Enable Text-to-Speech API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Cloud Text-to-Speech API"**
3. Click **"Enable"**

### 4. Create Service Account & Download Key

1. Go to **"IAM & Admin"** → **"Service Accounts"**
2. Click **"Create Service Account"**
   - Name: `tts-generator`
   - Role: **"Cloud Text-to-Speech User"**
3. Click **"Done"**
4. Click on the service account → **"Keys"** tab
5. **"Add Key"** → **"Create new key"** → **JSON**
6. Save the downloaded JSON file as `google-cloud-key.json` in this folder

### 5. Set Environment Variable

**Windows (PowerShell):**
```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="$PWD\google-cloud-key.json"
```

**Linux/Mac:**
```bash
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/google-cloud-key.json"
```

### 6. Generate Audio Files

```bash
npm run generate
```

This will create:
- `audio/thai/*.mp3` — 88 files (44 letters × 2 parts)
- `audio/english/*.mp3` — 78 files (26 letters × 3 parts)

**Total:** 166 audio files (~10-15 MB)

---

## 📁 File Structure

```
audio/
├── thai/
│   ├── e01_name.mp3  (ก - "กอ")
│   ├── e01_word.mp3  (ก - "ไก่")
│   ├── e02_name.mp3  (ข - "ขอ")
│   └── ...
└── english/
    ├── a_letter.mp3  (A)
    ├── a_word.mp3    ("Ant")
    ├── a_thai.mp3    ("มด")
    └── ...
```

---

## 💰 Cost Estimate

**Google Cloud TTS Pricing:**
- Free tier: **1 million characters/month** (WaveNet)
- This project: ~5,000 characters total (Thai + English)
- **Cost: $0** (within free tier)

After first generation, files are cached → no re-generation needed.

---

## 🎯 Testing

1. Open `alphabet-kids.html` in a browser
2. Select a mode (Thai/English/Both)
3. Click a letter → should play high-quality TTS audio
4. Check browser console for:
   ```
   🎵 Preloading audio files...
   ✅ Audio preloaded: 166 files
   ```

---

## 🔧 Troubleshooting

### "⚠️ Failed to load audio"
- Make sure audio files exist in `audio/` folder
- Run `npm run generate` again
- Check file paths in browser DevTools → Network tab

### "Error: Could not load the default credentials"
- `GOOGLE_APPLICATION_CREDENTIALS` not set correctly
- JSON key file path is wrong
- Re-download service account key

### "Permission denied" on API
- Service account role must be **"Cloud Text-to-Speech User"**
- Re-create service account with correct permissions

---

## 📝 Notes

- **Production deployment:** Upload `audio/` folder to GitHub Pages with HTML
- **Voice quality:** Uses `th-TH-Standard-A` (Thai) and `en-US-Neural2-C` (English)
- **Customization:** Edit `generate-audio.js` to change voice settings (rate, pitch)

---

## 🎓 Learn More

- [Google Cloud TTS Documentation](https://cloud.google.com/text-to-speech/docs)
- [Supported Voices & Languages](https://cloud.google.com/text-to-speech/docs/voices)
- [Pricing Calculator](https://cloud.google.com/text-to-speech/pricing)

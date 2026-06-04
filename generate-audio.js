/**
 * Google Cloud TTS Audio Generator
 * 
 * Setup:
 * 1. npm install @google-cloud/text-to-speech
 * 2. สร้าง Google Cloud Project: https://console.cloud.google.com
 * 3. Enable Text-to-Speech API
 * 4. สร้าง Service Account → ดาวน์โหลด JSON key
 * 5. ตั้ง env: set GOOGLE_APPLICATION_CREDENTIALS=path\to\key.json
 * 6. รัน: node generate-audio.js
 */

const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs').promises;
const path = require('path');

const client = new textToSpeech.TextToSpeechClient();

const THAI = [
  {letter:'ก', name:'กอ', word:'ไก่'},
  {letter:'ข', name:'ขอ', word:'ไข่'},
  {letter:'ฃ', name:'ขอ', word:'ขวด'},
  {letter:'ค', name:'คอ', word:'ควาย'},
  {letter:'ฅ', name:'คอ', word:'คน'},
  {letter:'ฆ', name:'คอ', word:'ระฆัง'},
  {letter:'ง', name:'งอ', word:'งู'},
  {letter:'จ', name:'จอ', word:'จาน'},
  {letter:'ฉ', name:'ฉอ', word:'ฉิ่ง'},
  {letter:'ช', name:'ชอ', word:'ช้าง ช้าง'},
  {letter:'ซ', name:'ซอ', word:'โซ่'},
  {letter:'ฌ', name:'ชอ', word:'เฌอ'},
  {letter:'ญ', name:'ยอ', word:'หญิง'},
  {letter:'ฎ', name:'ดอ', word:'ชฎา'},
  {letter:'ฏ', name:'ตอ', word:'ปฏัก'},
  {letter:'ฐ', name:'ถอ', word:'ฐาน'},
  {letter:'ฑ', name:'ทอ', word:'มณโฑ'},
  {letter:'ฒ', name:'ทอ', word:'ผู้เฒ่า'},
  {letter:'ณ', name:'นอ', word:'เณร'},
  {letter:'ด', name:'ดอ', word:'เด็ก'},
  {letter:'ต', name:'ตอ', word:'เต่า'},
  {letter:'ถ', name:'ถอ', word:'ถุง'},
  {letter:'ท', name:'ทอ', word:'ทหาร'},
  {letter:'ธ', name:'ทอ', word:'ธง'},
  {letter:'น', name:'นอ', word:'หนู'},
  {letter:'บ', name:'บอ', word:'ใบไม้'},
  {letter:'ป', name:'ปอ', word:'ปลา'},
  {letter:'ผ', name:'ผอ', word:'ผึ้ง'},
  {letter:'ฝ', name:'ฝอ', word:'ฝา'},
  {letter:'พ', name:'พอ', word:'พาน'},
  {letter:'ฟ', name:'ฟอ', word:'ฟัน'},
  {letter:'ภ', name:'พอ', word:'สำเภา'},
  {letter:'ม', name:'มอ', word:'ม้า'},
  {letter:'ย', name:'ยอ', word:'ยักษ์'},
  {letter:'ร', name:'รอ', word:'เรือ'},
  {letter:'ล', name:'ลอ', word:'ลิง'},
  {letter:'ว', name:'วอ', word:'แหวน'},
  {letter:'ศ', name:'สอ', word:'ศาลา'},
  {letter:'ษ', name:'สอ', word:'ฤาษี'},
  {letter:'ส', name:'สอ', word:'เสือ'},
  {letter:'ห', name:'หอ', word:'หีบ'},
  {letter:'ฬ', name:'ลอ', word:'จุฬา'},
  {letter:'อ', name:'ออ', word:'อ่าง'},
  {letter:'ฮ', name:'ฮอ', word:'นกฮูก'},
];

const ENG = [
  {letter:'A', word:'Ant',      thaiWord:'มด'},
  {letter:'B', word:'Bird',     thaiWord:'นก'},
  {letter:'C', word:'Cat',      thaiWord:'แมว'},
  {letter:'D', word:'Dog',      thaiWord:'สุนัข'},
  {letter:'E', word:'Egg',      thaiWord:'ไข่'},
  {letter:'F', word:'Flower',   thaiWord:'ดอกไม้'},
  {letter:'G', word:'Goat',     thaiWord:'แพะ'},
  {letter:'H', word:'House',    thaiWord:'บ้าน'},
  {letter:'I', word:'Ice Cream',thaiWord:'ไอศกรีม'},
  {letter:'J', word:'Jelly',    thaiWord:'เยลลี่'},
  {letter:'K', word:'King',     thaiWord:'พระราชา'},
  {letter:'L', word:'Lion',     thaiWord:'สิงโต'},
  {letter:'M', word:'Man',      thaiWord:'ผู้ชาย'},
  {letter:'N', word:'Nurse',    thaiWord:'พยาบาล'},
  {letter:'O', word:'Ox',       thaiWord:'วัวตัวผู้'},
  {letter:'P', word:'Pig',      thaiWord:'หมู'},
  {letter:'Q', word:'Queen',    thaiWord:'พระราชินี'},
  {letter:'R', word:'Rabbit',   thaiWord:'กระต่าย'},
  {letter:'S', word:'Snake',    thaiWord:'งู'},
  {letter:'T', word:'Tiger',    thaiWord:'เสือ'},
  {letter:'U', word:'Umbrella', thaiWord:'ร่ม'},
  {letter:'V', word:'Van',      thaiWord:'รถตู้'},
  {letter:'W', word:'Whale',    thaiWord:'วาฬ'},
  {letter:'X', word:'Xmas',     thaiWord:'คริสต์มาส'},
  {letter:'Y', word:'Yo-yo',    thaiWord:'โยโย่'},
  {letter:'Z', word:'Zebra',    thaiWord:'ม้าลาย'},
];

async function synthesize(text, lang, filename) {
  const request = {
    input: { text },
    voice: {
      languageCode: lang === 'th' ? 'th-TH' : 'en-US',
      name: lang === 'th' ? 'th-TH-Standard-A' : 'en-US-Standard-C',
      ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.85,
      pitch: 0.5,
    },
  };

  const [response] = await client.synthesizeSpeech(request);
  await fs.writeFile(filename, response.audioContent, 'binary');
  console.log(`✅ Generated: ${filename}`);
}

async function main() {
  // สร้าง folder
  await fs.mkdir('audio', { recursive: true });
  await fs.mkdir('audio/thai', { recursive: true });
  await fs.mkdir('audio/english', { recursive: true });

  console.log('🎙️ Generating Thai audio files...\n');
  
  // Generate Thai audio (name + word แยกกัน)
  for (const item of THAI) {
    const code = item.letter.charCodeAt(0).toString(16);
    // ไฟล์ที่ 1: ชื่อพยัญชนะ (เช่น "กอ")
    await synthesize(item.name, 'th', `audio/thai/${code}_name.mp3`);
    // ไฟล์ที่ 2: คำ (เช่น "ไก่")
    await synthesize(item.word, 'th', `audio/thai/${code}_word.mp3`);
  }

  console.log('\n🎙️ Generating English audio files...\n');

  // Generate English audio (letter + word + thaiWord แยกกัน)
  for (const item of ENG) {
    const code = item.letter.toLowerCase();
    // ไฟล์ที่ 1: ตัวอักษร (เช่น "A")
    await synthesize(item.letter, 'en', `audio/english/${code}_letter.mp3`);
    // ไฟล์ที่ 2: คำอังกฤษ (เช่น "Ant")
    await synthesize(item.word, 'en', `audio/english/${code}_word.mp3`);
    // ไฟล์ที่ 3: คำไทย (เช่น "มด")
    await synthesize(item.thaiWord, 'th', `audio/english/${code}_thai.mp3`);
  }

  console.log('\n✨ Done! Total files:', (THAI.length * 2) + (ENG.length * 3));
  console.log('📁 Audio files saved in: audio/');
}

main().catch(console.error);

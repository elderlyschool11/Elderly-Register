# Elderly Link - ระบบลงทะเบียนอายุ

แอปพลิเคชันลงทะเบียนข้อมูลผู้สูงอายุ รองรับการใช้งานผ่าน LINE LIFF พร้อมระบบจัดการข้อมูลที่ปลอดภัย เชื่อมต่อกับ Google Sheets ผ่าน Google Apps Script

## วิธีการติดตั้งและใช้งาน (Deployment Guide)

### 1. เตรียม Google Sheets และ GAS
- ดูไฟล์ `GAS_CODE.js` ในโปรเจกต์นี้
- คัดลอกโค้ดไปวางใน **Extensions > App Script** ของ Google Sheets ของคุณ
- กด **Deploy > New Deployment** เลือกเป็น **Web App**
- ตั้งค่า "Execute as" เป็น **Me** และ "Who has access" เป็น **Anyone**
- คัดลอก **Web App URL** ไว้

### 2. ตั้งค่า LINE LIFF
- ไปที่ [LINE Developers Console](https://developers.line.biz/)
- สร้าง Provider และ Create LIFF App
- คัดลอก **LIFF ID** ไว้

### 3. ตั้งค่า GitHub Repositories
- หลังจาก Export โค้ดมาที่ GitHub แล้ว ให้ไปที่ **Settings > Secrets and variables > Actions**
- เพิ่ม Secrets ดังนี้:
  - `VITE_LIFF_ID`: ไอดี LIFF ของคุณ
  - `VITE_GAS_URL`: URL ของ Google Apps Script ที่ได้จากข้อ 1

### 4. เปิดใช้งาน GitHub Pages
- ไปที่ **Settings > Pages**
- เลือก **Build and deployment > Source** เป็น **GitHub Actions**
- ระบบจะทำการ Build และ Deploy ให้อัตโนมัติเมื่อมีการ Push code (ดูสถานะได้ที่แถบ **Actions**)

### 5. วิธีการแก้ไขโค้ด
- **แก้ไขส่วนหน้าจอ (UI)**: อยู่ที่ `src/App.tsx` และ `src/components/RegistrationForm.tsx` (ใช้ Tailwind CSS)
- **แก้ไขฟอร์ม**: หากต้องการเพิ่มช่องกรอกข้อมูล ให้เพิ่มใน `RegistrationForm.tsx` โดยอิงตามตัวอย่างเดิม
- **แก้ไข GAS**: หากแก้ไขฟอร์ม อย่าลืมอัปเดตลำดับคอลัมน์ใน `GAS_CODE.js` ให้ตรงกัน

---
พัฒนาด้วย ❤️ โดย Elderly Link Team

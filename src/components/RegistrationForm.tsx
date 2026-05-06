import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Calendar, MapPin, Activity, Weight, Ruler, Send, CheckCircle2, Loader2, PlusCircle } from 'lucide-react';
import { initLiff, getProfile } from '../lib/liff';
import { cn } from '../lib/utils';

interface RegistrationData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  disease: string;
  address: string;
  lineId?: string;
  displayName?: string;
  [key: string]: any; // For dynamic fields
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    disease: '',
    address: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    initLiff().then(async (liff) => {
      if (liff && liff.isLoggedIn()) {
        const profile = await getProfile();
        setUserProfile(profile);
        setFormData(prev => ({
          ...prev,
          name: profile?.displayName || '',
          lineId: profile?.userId || '',
          displayName: profile?.displayName || '',
        }));
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const gasUrl = import.meta.env.VITE_GAS_URL;
    if (!gasUrl) {
      setStatus('error');
      setErrorMessage('กรุณาตั้งค่า VITE_GAS_URL ในไฟล์ .env');
      return;
    }

    try {
      // We use no-cors if the GAS script doesn't handle CORS, 
      // but standard Web App often needs 'cors' for JSON response
      const response = await fetch(gasUrl, {
        method: 'POST',
        mode: 'no-cors', // Standard Google Apps Script Web App behavior for Simple Triggers
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Note: with no-cors we can't see the response content, 
      // but usually if it doesn't throw, it's sent.
      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-100 min-h-[600px]"
      >
        <div className="w-full md:w-1/3 bg-emerald-600 p-12 text-white flex flex-col justify-center items-center text-center">
          <CheckCircle2 className="w-20 h-20 mb-6 text-emerald-100" />
          <h2 className="text-3xl font-bold mb-4">สำเร็จ!</h2>
          <p className="text-emerald-100 opacity-90 text-lg">ข้อมูลของคุณได้บันทึกลงในระบบเรียบร้อยแล้ว</p>
        </div>
        <div className="w-full md:w-2/3 p-12 flex flex-col justify-center items-center bg-slate-50">
          <div className="max-w-xs text-center space-y-8">
            <h3 className="text-2xl font-bold text-slate-800">ขอบคุณสำหรับการลงทะเบียน</h3>
            <p className="text-slate-500">คุณสามารถตรวจสอบข้อมูลเพิ่มเติมได้ที่ LINE OA ของเรา หรือลงทะเบียนสมาชิกใหม่เพิ่มเติม</p>
            <button
              onClick={() => setStatus('idle')}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition"
            >
              ลงทะเบียนเพิ่ม
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-100 min-h-[680px]"
    >
      {/* Sidebar Section */}
      <div className="w-full md:w-1/3 bg-emerald-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <motion.div 
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10"
          >
            <Activity className="h-10 w-10" />
          </motion.div>
          <h1 className="text-4xl font-bold leading-tight mb-4">ระบบลงทะเบียน<br/>ผู้สูงอายุ</h1>
          <p className="text-emerald-100 text-lg leading-relaxed opacity-90">
            ยินดีต้อนรับเข้าสู่ระบบ<br/>
            กรุณากรอกข้อมูลเพื่อบันทึกประวัติและสิทธิประโยชน์ต่างๆ
          </p>
        </div>

        <div className="mt-12 space-y-4 relative z-10 border-t border-white/10 pt-8">
          <div className="flex items-center space-x-3 text-sm font-medium">
            <span className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center text-xs">1</span>
            <span>ข้อมูลส่วนตัว</span>
          </div>
          <div className="flex items-center space-x-3 text-sm font-medium opacity-50">
            <span className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-xs">2</span>
            <span>ที่อยู่และการติดต่อ</span>
          </div>
          <div className="flex items-center space-x-3 text-sm font-medium opacity-50">
            <span className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-xs">3</span>
            <span>บันทึกสำเร็จ</span>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500 rounded-full opacity-30 blur-3xl invisible md:visible"></div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col bg-white">
        <div className="flex justify-between items-start md:items-center mb-8 border-b border-slate-100 pb-6">
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs uppercase tracking-[0.2em] font-bold mb-1">Registration Portal</span>
            <h2 className="text-2xl font-bold text-slate-800">ข้อมูลพื้นฐานผู้ใช้งาน</h2>
          </div>
          <div className="hidden sm:block">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
              สถานะ: LINE LIFF
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <input type="hidden" name="lineId" value={formData.lineId || ''} />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            {/* Name */}
            <div className="md:col-span-4 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">ชื่อ - นามสกุล</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="สมชาย ใจดี"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-800"
              />
            </div>

            {/* Age */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">อายุ (ปี)</label>
              <input
                required
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="60"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
              />
            </div>

            {/* Gender */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">เพศ</label>
              <select
                required
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none text-slate-800"
              >
                <option value="">ระบุเพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>

            {/* Weight */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">น้ำหนัก (กก.)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="65"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
              />
            </div>

            {/* Height */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">ส่วนสูง (ซม.)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="165"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
              />
            </div>

            {/* Disease */}
            <div className="md:col-span-6 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">โรคประจำตัว (ถ้ามี)</label>
              <input
                type="text"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                placeholder="เช่น เบาหวาน, ความดันสูง"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-6 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">ที่อยู่ปัจจุบัน</label>
              <textarea
                required
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                placeholder="บ้านเลขที่, ถนน, ตำบล, อำเภอ, จังหวัด"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none text-slate-800"
              />
            </div>
          </div>

          <div className="mt-auto flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
            <div className="text-slate-400 text-sm flex items-center font-medium">
               LINE Display: {formData.displayName || 'Guest'}
            </div>

            <button
              disabled={status === 'loading'}
              type="submit"
              className={cn(
                "w-full md:w-auto bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200/50 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]",
                status === 'loading' && "opacity-70 cursor-not-allowed"
              )}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  บันทึกข้อมูล
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-4 text-center text-red-500 text-sm font-bold">{errorMessage}</p>
          )}
        </form>
      </div>
    </motion.div>
  );
}

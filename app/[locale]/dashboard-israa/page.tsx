"use client";
import { useState } from "react";
import { Container } from "@/components/Container";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // دالة بسيطة لحماية اللوحة (سنطورها لاحقاً)
  const handleLogin = () => {
    if (password === "israa2026") { // يمكنك تغيير كلمة السر هنا
      setIsAuthorized(true);
    } else {
      alert("كلمة السر خاطئة يا بطل!");
    }
  };

  if (!isAuthorized) {
    return (
      <Container className="py-20 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">لوحة تحكم الأكاديمية</h1>
        <input 
          type="password" 
          placeholder="أدخل كلمة السر" 
          className="border p-3 rounded-xl mb-4 w-64"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-brand text-white px-8 py-3 rounded-2xl">دخول</button>
      </Container>
    );
  }

  return (
    <Container className="py-14">
      <h1 className="text-3xl font-bold mb-8">إدارة الأكاديمية 🚀</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* نموذج إضافة كورس جديد */}
        <div className="bg-white dark:bg-night-surface p-8 rounded-[2rem] border border-stroke shadow-soft">
          <h2 className="text-xl font-semibold mb-6">إنشاء كورس جديد</h2>
          <form className="space-y-4">
            <input type="text" placeholder="اسم الكورس" className="w-full p-3 rounded-xl border border-stroke dark:bg-night-bg" />
            <input type="number" placeholder="السعر (د.ع)" className="w-full p-3 rounded-xl border border-stroke dark:bg-night-bg" />
            <textarea placeholder="وصف الكورس" className="w-full p-3 rounded-xl border border-stroke dark:bg-night-bg h-32"></textarea>
            <input type="text" placeholder="رابط فيديو اليوتيوب أو Bunny.net" className="w-full p-3 rounded-xl border border-stroke dark:bg-night-bg" />
            <div className="border-2 border-dashed border-stroke p-6 rounded-xl text-center">
              <p className="text-sm text-muted mb-2">صورة الغلاف (Image)</p>
              <input type="file" className="text-xs" />
            </div>
            <button className="w-full bg-brand text-white py-4 rounded-2xl font-bold hover:opacity-90 transition">
              نشر الكورس في الأكاديمية
            </button>
          </form>
        </div>

        {/* نموذج تعديل نصوص الموقع */}
        <div className="bg-white dark:bg-night-surface p-8 rounded-[2rem] border border-stroke shadow-soft">
          <h2 className="text-xl font-semibold mb-6">تعديل نصوص الصفحة الرئيسية</h2>
          <form className="space-y-4">
            <div>
              <label className="text-xs font-bold mb-2 block">عنوان البطولة (Hero Title)</label>
              <input type="text" placeholder="العنوان الحالي" className="w-full p-3 rounded-xl border border-stroke dark:bg-night-bg" />
            </div>
            <div>
              <label className="text-xs font-bold mb-2 block">الوصف الفرعي (Subtitle)</label>
              <textarea className="w-full p-3 rounded-xl border border-stroke dark:bg-night-bg h-24"></textarea>
            </div>
            <button className="w-full bg-ink text-white py-4 rounded-2xl font-bold hover:opacity-90 transition">
              تحديث نصوص الموقع
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}

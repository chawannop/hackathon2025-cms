'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            ประเมินไอเดียธุรกิจของคุณ
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            ระบบช่วยประเมินและให้คำแนะนำสำหรับไอเดียธุรกิจของคุณ
            เพื่อเพิ่มโอกาสความสำเร็จในการเริ่มต้นธุรกิจ
          </p>
          <button
            onClick={() => router.push('/evaluate')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            เริ่มประเมินไอเดีย
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">ประเมินความเหมาะสม</h3>
            <p className="text-gray-600">วิเคราะห์ไอเดียธุรกิจของคุณจากหลายมุมมอง</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">รับคำแนะนำ</h3>
            <p className="text-gray-600">ได้ข้อเสนอแนะที่เป็นประโยชน์สำหรับการปรับปรุง</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">วางแผนธุรกิจ</h3>
            <p className="text-gray-600">ช่วยให้เห็นภาพรวมและวางแผนได้ดียิ่งขึ้น</p>
          </div>
        </div>
      </div>
    </main>
  );
} 
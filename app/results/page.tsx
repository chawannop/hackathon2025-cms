'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Results() {
  const router = useRouter();

  // ข้อมูลตัวอย่าง (ในอนาคตจะมาจาก API)
  const results = {
    score: 75,
    feedback: [
      "จุดแข็ง: มีความชัดเจนในกลุ่มลูกค้าเป้าหมาย",
      "ควรปรับปรุง: ควรเพิ่มช่องทางการตลาดให้หลากหลายขึ้น",
      "คำแนะนำ: ควรศึกษาคู่แข่งให้ละเอียดขึ้น",
    ],
    suggestions: [
      "ควรทำการสำรวจตลาดเพิ่มเติม",
      "ควรวางแผนการเงินให้ละเอียดขึ้น",
      "ควรเตรียมแผนสำรองกรณีเกิดปัญหา",
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            ผลการประเมินไอเดียธุรกิจ
          </h1>

          {/* Score Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-center mb-4">คะแนนความเหมาะสม</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${results.score}%` }}
                ></div>
              </div>
              <div className="text-4xl font-bold text-blue-600">{results.score}%</div>
            </div>
          </div>

          {/* Feedback Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ข้อเสนอแนะ
            </h2>
            <ul className="space-y-3">
              {results.feedback.map((item, index) => (
                <li key={index} className="flex items-start p-3 rounded-lg bg-gray-50">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              คำแนะนำเพิ่มเติม
            </h2>
            <ul className="space-y-3">
              {results.suggestions.map((item, index) => (
                <li key={index} className="flex items-start p-3 rounded-lg bg-gray-50">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              กลับหน้าหลัก
            </button>
            <button
              onClick={() => router.push('/evaluate')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              ประเมินไอเดียใหม่
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 
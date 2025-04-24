'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Evaluate() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    targetCustomers: '',
    investmentAmount: '',
    workingHours: '',
    sellingPrice: '',
    costPerUnit: '',
    expectedSales: '',
    competitors: '',
    marketingPlan: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    router.push('/results');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            ประเมินไอเดียธุรกิจของคุณ
          </h1>

          <div className="bg-white rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลพื้นฐาน</h2>
                  <div>
                    <label className="block text-gray-700 mb-2">ชื่อธุรกิจ</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">อธิบายธุรกิจของคุณ</label>
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">กลุ่มลูกค้าเป้าหมาย</label>
                    <input
                      type="text"
                      name="targetCustomers"
                      value={formData.targetCustomers}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลการลงทุน</h2>
                  <div>
                    <label className="block text-gray-700 mb-2">เงินลงทุนเริ่มต้น (บาท)</label>
                    <input
                      type="number"
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">เวลาที่สามารถทำงานได้ต่อวัน (ชั่วโมง)</label>
                    <input
                      type="number"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลการขาย</h2>
                  <div>
                    <label className="block text-gray-700 mb-2">ราคาขายต่อหน่วย (บาท)</label>
                    <input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">ต้นทุนต่อหน่วย (บาท)</label>
                    <input
                      type="number"
                      name="costPerUnit"
                      value={formData.costPerUnit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">คาดว่าจะขายได้ต่อวัน (หน่วย)</label>
                    <input
                      type="number"
                      name="expectedSales"
                      value={formData.expectedSales}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลการตลาด</h2>
                  <div>
                    <label className="block text-gray-700 mb-2">มีคู่แข่งในพื้นที่กี่ราย</label>
                    <input
                      type="number"
                      name="competitors"
                      value={formData.competitors}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">แผนการตลาด</label>
                    <textarea
                      name="marketingPlan"
                      value={formData.marketingPlan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
                  >
                    ย้อนกลับ
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    ถัดไป
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    ส่งแบบประเมิน
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 
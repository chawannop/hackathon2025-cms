'use client';

import { useRouter } from 'next/navigation';
import Banner from './components/Banner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <Banner />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-muted-foreground mb-8">
            ระบบช่วยประเมินและให้คำแนะนำสำหรับไอเดียธุรกิจของคุณ
            เพื่อเพิ่มโอกาสความสำเร็จในการเริ่มต้นธุรกิจ
          </p>
          <Button
            onClick={() => router.push('/evaluate')}
            size="lg"
            variant="default"
            className="text-lg font-semibold px-8 py-6 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            เริ่มประเมินไอเดีย
          </Button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-muted">
            <CardHeader>
              <CardTitle className="text-xl group-hover:text-blue-400 transition-colors">ประเมินความเหมาะสม</CardTitle>
              <CardDescription>วิเคราะห์ไอเดียธุรกิจของคุณจากหลายมุมมอง</CardDescription>
            </CardHeader>
          </Card>
          <Card className="group hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-muted">
            <CardHeader>
              <CardTitle className="text-xl group-hover:text-purple-400 transition-colors">รับคำแนะนำ</CardTitle>
              <CardDescription>ได้ข้อเสนอแนะที่เป็นประโยชน์สำหรับการปรับปรุง</CardDescription>
            </CardHeader>
          </Card>
          <Card className="group hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-muted">
            <CardHeader>
              <CardTitle className="text-xl group-hover:text-indigo-400 transition-colors">วางแผนธุรกิจ</CardTitle>
              <CardDescription>ช่วยให้เห็นภาพรวมและวางแผนได้ดียิ่งขึ้น</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
} 
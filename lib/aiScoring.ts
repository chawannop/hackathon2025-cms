import OpenAI from 'openai';
import { BusinessInputs } from './scoring';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true // Allow client-side usage
});

export interface AIAnalysisResult {
  adjustedScores: {
    marketScore: number;
    financialScore: number;
    operationalScore: number;
  };
  recommendations: string[];
  riskFactors: string[];
  opportunities: string[];
}

export async function analyzeBusinessWithAI(
  inputs: BusinessInputs,
  baseScores: { marketScore: number; financialScore: number; operationalScore: number }
): Promise<AIAnalysisResult> {
  try {
    const prompt = `
    ทำการวิเคราะห์ธุรกิจร้านกาแฟจากข้อมูลต่อไปนี้:

    ข้อมูลการตลาด:
    - ขนาดตลาด: ${inputs.marketSize} ล้านบาท/ปี
    - จำนวนคู่แข่ง: ${inputs.competitorCount} ราย
    - กลุ่มลูกค้าเป้าหมาย: ${inputs.targetCustomerCount} คน
    - คะแนนทำเล: ${inputs.locationScore}/10

    ข้อมูลการเงิน:
    - เงินลงทุน: ${inputs.initialInvestment} บาท
    - รายได้/เดือน: ${inputs.monthlyRevenue} บาท
    - ต้นทุน/เดือน: ${inputs.monthlyCost} บาท
    - ระยะเวลาคืนทุน: ${inputs.breakEvenMonths} เดือน

    ข้อมูลการดำเนินงาน:
    - พนักงาน: ${inputs.staffCount} คน
    - ชั่วโมงทำการ: ${inputs.openingHours} ชม./วัน
    - จำนวนเมนู: ${inputs.menuItems} รายการ
    - คะแนนอุปกรณ์: ${inputs.equipmentQuality}/10

    คะแนนพื้นฐาน:
    - คะแนนการตลาด: ${baseScores.marketScore}
    - คะแนนการเงิน: ${baseScores.financialScore}
    - คะแนนการดำเนินงาน: ${baseScores.operationalScore}

    กรุณาวิเคราะห์และให้:
    1. คะแนนที่ปรับแล้วโดยพิจารณาปัจจัยเชิงคุณภาพ
    2. คำแนะนำสำหรับการปรับปรุงธุรกิจ
    3. ปัจจัยเสี่ยงที่ต้องระวัง
    4. โอกาสในการเติบโต

    ตอบในรูปแบบ JSON ตามนี้:
    {
      "adjustedScores": {
        "marketScore": number,
        "financialScore": number,
        "operationalScore": number
      },
      "recommendations": string[],
      "riskFactors": string[],
      "opportunities": string[]
    }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "คุณเป็นผู้เชี่ยวชาญด้านการวิเคราะห์ธุรกิจร้านกาแฟ มีประสบการณ์ในการให้คำปรึกษาและประเมินความเป็นไปได้ของธุรกิจ"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message?.content || "{}");
    
    return {
      adjustedScores: {
        marketScore: Math.round(result.adjustedScores.marketScore),
        financialScore: Math.round(result.adjustedScores.financialScore),
        operationalScore: Math.round(result.adjustedScores.operationalScore)
      },
      recommendations: result.recommendations,
      riskFactors: result.riskFactors,
      opportunities: result.opportunities
    };
  } catch (error) {
    console.error('Error analyzing business with AI:', error);
    // Return original scores if AI analysis fails
    return {
      adjustedScores: baseScores,
      recommendations: ['ไม่สามารถวิเคราะห์เพิ่มเติมได้ในขณะนี้'],
      riskFactors: ['ไม่สามารถระบุความเสี่ยงได้ในขณะนี้'],
      opportunities: ['ไม่สามารถระบุโอกาสได้ในขณะนี้']
    };
  }
} 
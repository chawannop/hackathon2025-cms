import OpenAI from 'openai';
import type { BusinessInputs } from './scoring';

export interface AIAnalysisResult {
  recommendations: string[];
  riskFactors: string[];
  opportunities: string[];
  adjustedScores: {
    marketScore: number;
    financialScore: number;
    operationalScore: number;
  };
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeBusinessWithAI(
  inputs: BusinessInputs,
  scores: {
    marketScore: number;
    financialScore: number;
    operationalScore: number;
  }
): Promise<AIAnalysisResult> {
  try {
    const prompt = `ฉันต้องการวิเคราะห์ธุรกิจ ${inputs.businessName} โดยมีข้อมูลดังนี้:

ข้อมูลธุรกิจ:
- คำอธิบายธุรกิจ: ${inputs.description}
- รูปแบบรายได้: ${inputs.revenueModel}

กลุ่มเป้าหมายและปัญหา:
- กลุ่มเป้าหมาย: ${inputs.targetUsers}
- ปัญหาที่พบ: ${inputs.painPoint}
- วิธีแก้ปัญหา: ${inputs.solution}

กลยุทธ์ธุรกิจ:
- คู่แข่ง: ${inputs.competitors}
- จุดเด่นของธุรกิจ: ${inputs.usp}
- แผนการเข้าสู่ตลาด: ${inputs.goToMarket}

การเงินและการดำเนินงาน:
- โครงสร้างต้นทุน: ${inputs.costStructure}
- จุดคุ้มทุน: ${inputs.breakEvenPoint}
- ตัวชี้วัดสำคัญ: ${inputs.keyMetrics}
- ทรัพยากรที่ต้องการ: ${inputs.resourcesNeeded}

คะแนนการประเมินเบื้องต้น:
- ด้านการตลาด: ${scores.marketScore}/100
- ด้านการเงิน: ${scores.financialScore}/100
- ด้านการดำเนินงาน: ${scores.operationalScore}/100

กรุณาวิเคราะห์และให้:
1. คำแนะนำในการปรับปรุง 3 ข้อ
2. ปัจจัยเสี่ยงที่ต้องระวัง 3 ข้อ
3. โอกาสในการเติบโต 3 ข้อ
4. ปรับคะแนนการประเมินใหม่ตามความเหมาะสม

ตอบในรูปแบบ JSON ตามนี้:
{
  "recommendations": ["คำแนะนำ1", "คำแนะนำ2", "คำแนะนำ3"],
  "riskFactors": ["ความเสี่ยง1", "ความเสี่ยง2", "ความเสี่ยง3"],
  "opportunities": ["โอกาส1", "โอกาส2", "โอกาส3"],
  "adjustedScores": {
    "marketScore": 0,
    "financialScore": 0,
    "operationalScore": 0
  }
}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    if (!completion.choices[0].message.content) {
      throw new Error('No response from OpenAI');
    }

    const result = JSON.parse(completion.choices[0].message.content) as AIAnalysisResult;
    return result;
  } catch (error) {
    console.error('Error analyzing business with AI:', error);
    return {
      recommendations: ['ไม่สามารถวิเคราะห์ได้ กรุณาลองใหม่อีกครั้ง'],
      riskFactors: ['ไม่สามารถวิเคราะห์ได้ กรุณาลองใหม่อีกครั้ง'],
      opportunities: ['ไม่สามารถวิเคราะห์ได้ กรุณาลองใหม่อีกครั้ง'],
      adjustedScores: scores
    };
  }
} 
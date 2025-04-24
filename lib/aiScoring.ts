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

let openai: OpenAI | null = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }
} catch (error) {
  console.error('Error initializing OpenAI:', error);
}

export async function analyzeBusinessWithAI(
  inputs: BusinessInputs,
  scores: {
    marketScore: number;
    financialScore: number;
    operationalScore: number;
  }
): Promise<AIAnalysisResult> {
  // If OpenAI is not initialized, return default analysis
  if (!openai) {
    return {
      recommendations: [
        'ปรับปรุงกลยุทธ์การตลาดเพื่อเพิ่มยอดขาย',
        'พิจารณาการลดต้นทุนการดำเนินงาน',
        'พัฒนาคุณภาพการบริการ'
      ],
      riskFactors: [
        'การแข่งขันในตลาดที่สูง',
        'ต้นทุนการดำเนินงานที่อาจเพิ่มขึ้น',
        'การเปลี่ยนแปลงพฤติกรรมผู้บริโภค'
      ],
      opportunities: [
        'การขยายฐานลูกค้าผ่านช่องทางออนไลน์',
        'การพัฒนาผลิตภัณฑ์/บริการใหม่',
        'การสร้างพันธมิตรทางธุรกิจ'
      ],
      adjustedScores: scores
    };
  }

  try {
    const prompt = `ฉันต้องการวิเคราะห์ธุรกิจ ${inputs.businessName} (${inputs.businessType}) โดยมีข้อมูลดังนี้:

ข้อมูลการเงิน:
- เงินลงทุนเริ่มต้น: ${inputs.initialInvestment} บาท
- รายได้ต่อเดือน: ${inputs.monthlyRevenue} บาท
- ต้นทุนต่อเดือน: ${inputs.monthlyCost} บาท

ข้อมูลการดำเนินงาน:
- จำนวนพนักงาน: ${inputs.staffCount} คน
- ชั่วโมงทำงานต่อวัน: ${inputs.openingHours} ชั่วโมง
- จำนวนรายการสินค้า/เมนู: ${inputs.menuItems} รายการ

คะแนนการประเมินเบื้องต้น:
- ด้านการตลาด: ${scores.marketScore}/100
- ด้านการเงิน: ${scores.financialScore}/100
- ด้านการดำเนินงาน: ${scores.operationalScore}/100

กรุณาวิเคราะห์และให้:
1. คำแนะนำในการปรับปรุง 3 ข้อ
2. ปัจจัยเสี่ยงที่ต้องระวัง 3 ข้อ
3. โอกาสในการเติบโต 3 ข้อ
4. ปรับคะแนนการประเมินใหม่ตามความเหมาะสม`;

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
      recommendations: ['ระบบไม่สามารถวิเคราะห์ได้ในขณะนี้ กรุณาลองใหม่ภายหลัง'],
      riskFactors: ['ระบบไม่สามารถวิเคราะห์ได้ในขณะนี้ กรุณาลองใหม่ภายหลัง'],
      opportunities: ['ระบบไม่สามารถวิเคราะห์ได้ในขณะนี้ กรุณาลองใหม่ภายหลัง'],
      adjustedScores: scores
    };
  }
}

interface ScoringInput {
  businessName: string;
  businessType: string;
  initialInvestment: number;
  monthlyRevenue: number;
  monthlyCost: number;
  staffCount: number;
  openingHours: number;
  menuItems: number;
}

export async function calculateOverallScore(inputs: ScoringInput) {
  // Calculate base scores
  const financialScore = calculateFinancialScore(inputs);
  const operationalScore = calculateOperationalScore(inputs);
  const marketingScore = await calculateMarketingScore(inputs);

  // Calculate weighted average
  const overallScore = (financialScore * 0.4 + operationalScore * 0.3 + marketingScore * 0.3);

  return {
    overall: Math.round(overallScore * 10) / 10,
    financial: Math.round(financialScore * 10) / 10,
    operational: Math.round(operationalScore * 10) / 10,
    marketing: Math.round(marketingScore * 10) / 10
  };
}

function calculateFinancialScore(inputs: ScoringInput): number {
  const { initialInvestment, monthlyRevenue, monthlyCost } = inputs;
  
  // Calculate monthly profit
  const monthlyProfit = monthlyRevenue - monthlyCost;
  
  // Calculate ROI (Return on Investment)
  const annualProfit = monthlyProfit * 12;
  const roi = (annualProfit / initialInvestment) * 100;
  
  // Calculate profit margin
  const profitMargin = (monthlyProfit / monthlyRevenue) * 100;
  
  // Score based on ROI (0-10)
  let roiScore = 0;
  if (roi >= 50) roiScore = 10;
  else if (roi >= 40) roiScore = 8;
  else if (roi >= 30) roiScore = 6;
  else if (roi >= 20) roiScore = 4;
  else if (roi >= 10) roiScore = 2;
  
  // Score based on profit margin (0-10)
  let marginScore = 0;
  if (profitMargin >= 30) marginScore = 10;
  else if (profitMargin >= 25) marginScore = 8;
  else if (profitMargin >= 20) marginScore = 6;
  else if (profitMargin >= 15) marginScore = 4;
  else if (profitMargin >= 10) marginScore = 2;
  
  // Final financial score is average of ROI and margin scores
  return (roiScore + marginScore) / 2;
}

function calculateOperationalScore(inputs: ScoringInput): number {
  const { staffCount, openingHours, menuItems } = inputs;
  
  // Score for staff efficiency (0-10)
  let staffScore = 0;
  if (menuItems / staffCount <= 5) staffScore = 10;
  else if (menuItems / staffCount <= 7) staffScore = 8;
  else if (menuItems / staffCount <= 10) staffScore = 6;
  else if (menuItems / staffCount <= 15) staffScore = 4;
  else staffScore = 2;
  
  // Score for operating hours (0-10)
  let hoursScore = 0;
  if (openingHours >= 12) hoursScore = 10;
  else if (openingHours >= 10) hoursScore = 8;
  else if (openingHours >= 8) hoursScore = 6;
  else if (openingHours >= 6) hoursScore = 4;
  else hoursScore = 2;
  
  // Score for menu complexity (0-10)
  let menuScore = 0;
  if (menuItems <= 20) menuScore = 10;
  else if (menuItems <= 30) menuScore = 8;
  else if (menuItems <= 40) menuScore = 6;
  else if (menuItems <= 50) menuScore = 4;
  else menuScore = 2;
  
  // Final operational score is average of all scores
  return (staffScore + hoursScore + menuScore) / 3;
}

async function calculateMarketingScore(inputs: ScoringInput): Promise<number> {
  const { businessType, businessName } = inputs;
  
  // If OpenAI is not initialized, return a default score
  if (!openai) {
    return 7; // Default score when API is not available
  }
  
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a business analyst specialized in evaluating business names and types. Score the given business name and type on a scale of 0-10 based on marketability, memorability, and relevance to the business type. Respond with ONLY a number between 0 and 10."
        },
        {
          role: "user",
          content: `Business Name: ${businessName}\nBusiness Type: ${businessType}\n\nPlease evaluate and score this business name and type combination.`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const score = parseFloat(completion.choices[0]?.message?.content || "7");
    return isNaN(score) ? 7 : score;
  } catch (error) {
    console.error('Error calculating marketing score:', error);
    return 7; // Default score if API call fails
  }
} 
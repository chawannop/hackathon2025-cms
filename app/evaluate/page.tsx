'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Tooltip,
  alpha,
  useTheme,
  Modal,
  CircularProgress,
} from '@mui/material';
import { ThemeToggle } from '@/components/ThemeToggle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useRouter } from 'next/navigation';

const steps = ['ข้อมูลธุรกิจ', 'กลุ่มเป้าหมายและปัญหา', 'กลยุทธ์ธุรกิจ', 'การเงินและการดำเนินงาน'];

export default function Evaluate() {
  const theme = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    // Step 1: Business Information
    name: '',
    description: '',
    revenueModel: '',
    
    // Step 2: Target Users & Problems
    targetUsers: '',
    painPoint: '',
    solution: '',
    
    // Step 3: Business Strategy
    competitors: '',
    usp: '',
    goToMarket: '',
    
    // Step 4: Financial and Operations
    costStructure: '',
    breakEvenPoint: '',
    keyMetrics: '',
    resourcesNeeded: '',
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [generatingFields, setGeneratingFields] = React.useState<Set<string>>(new Set());
  const [fieldErrors, setFieldErrors] = React.useState<{ [key: string]: string }>({});
  const [isGeneratingAll, setIsGeneratingAll] = React.useState(false);

  // Load form data from localStorage on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('businessEvaluationForm');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        // Also restore the active step if it exists
        const savedStep = localStorage.getItem('businessEvaluationStep');
        if (savedStep) {
          setActiveStep(parseInt(savedStep));
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('businessEvaluationForm', JSON.stringify(formData));
    localStorage.setItem('businessEvaluationStep', activeStep.toString());
  }, [formData, activeStep]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Clear localStorage when form is submitted
      // localStorage.removeItem('businessEvaluationForm');
      localStorage.removeItem('businessEvaluationStep');
      // Submit form
      router.push('/results');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const textFieldStyles = {
    '& .MuiFilledInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiInputBase-input': {
      color: 'white',
      padding: '20px 16px',
    },
    '& .MuiInputAdornment-root': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  };

  const generateContent = async (field: string) => {
    setGeneratingFields(prev => new Set(prev).add(field));
    setFieldErrors(prev => ({ ...prev, [field]: '' }));
    try {
      const fieldTranslations: { [key: string]: string } = {
        description: "คำอธิบายธุรกิจ (business description)",
        targetUsers: "กลุ่มเป้าหมาย (target users)",
        painPoint: "ปัญหาที่พบ (pain point)",
        solution: "วิธีแก้ปัญหา (solution)",
        revenueModel: "โมเดลรายได้ (revenue model)",
        competitors: "คู่แข่งในตลาด (competitors)",
        usp: "จุดขายที่แตกต่าง (unique selling point)",
        goToMarket: "กลยุทธ์เข้าตลาด (go-to-market strategy)",
        costStructure: "โครงสร้างต้นทุน (cost structure)",
        breakEvenPoint: "จุดคุ้มทุน (break-even point)",
        keyMetrics: "ตัวชี้วัดสำคัญ (key metrics)",
        resourcesNeeded: "ทรัพยากรที่ต้องใช้หรือพาร์ตเนอร์ (required resources / partners)"
      };

      const getContext = (field: string) => {
        switch (field) {
          case 'description':
            return `ชื่อธุรกิจ: ${formData.name}\n\nกรุณาให้คำอธิบายธุรกิจที่ชัดเจนและครอบคลุม โดยอธิบายถึงลักษณะของธุรกิจ วิธีการทำงาน และจุดเด่นของธุรกิจนี้`;
          case 'targetUsers':
            return `ชื่อธุรกิจ: ${formData.name}\nคำอธิบายธุรกิจ: ${formData.description}\n\nกรุณาระบุกลุ่มเป้าหมายที่สอดคล้องกับคำอธิบายธุรกิจข้างต้น โดยระบุทั้งกลุ่มเป้าหมายหลักและรอง พร้อมลักษณะเฉพาะของแต่ละกลุ่ม`;
          case 'painPoint':
            return `ชื่อธุรกิจ: ${formData.name}\nกลุ่มเป้าหมาย: ${formData.targetUsers}\n\nกรุณาระบุปัญหาที่กลุ่มเป้าหมายกำลังเผชิญ โดยให้สอดคล้องกับลักษณะของกลุ่มเป้าหมายที่ระบุไว้ข้างต้น`;
          case 'solution':
            return `ชื่อธุรกิจ: ${formData.name}\nปัญหาที่พบ: ${formData.painPoint}\n\nกรุณาเสนอวิธีแก้ปัญหาที่ตรงกับปัญหาที่ระบุไว้ข้างต้น โดยอธิบายให้ชัดเจนว่าวิธีนี้จะแก้ปัญหาได้อย่างไร`;
          case 'revenueModel':
            return `ชื่อธุรกิจ: ${formData.name}\nวิธีแก้ปัญหา: ${formData.solution}\n\nกรุณาเสนอโมเดลรายได้ที่สอดคล้องกับวิธีแก้ปัญหาข้างต้น โดยระบุช่องทางและวิธีการสร้างรายได้ที่เหมาะสม`;
          case 'competitors':
            return `ชื่อธุรกิจ: ${formData.name}\nคำอธิบายธุรกิจ: ${formData.description}\nกลุ่มเป้าหมาย: ${formData.targetUsers}\n\nกรุณาระบุคู่แข่งในตลาดที่ให้บริการหรือสินค้าที่คล้ายคลึงกัน โดยวิเคราะห์จุดแข็งและจุดอ่อนของคู่แข่งแต่ละราย`;
          case 'usp':
            return `ชื่อธุรกิจ: ${formData.name}\nวิธีแก้ปัญหา: ${formData.solution}\nคู่แข่งในตลาด: ${formData.competitors}\n\nกรุณาระบุจุดขายที่แตกต่างจากคู่แข่ง โดยเน้นที่ความโดดเด่นของวิธีแก้ปัญหาที่เสนอ และความได้เปรียบเมื่อเทียบกับคู่แข่ง`;
          case 'goToMarket':
            return `ชื่อธุรกิจ: ${formData.name}\nกลุ่มเป้าหมาย: ${formData.targetUsers}\nจุดขายที่แตกต่าง: ${formData.usp}\n\nกรุณาเสนอกลยุทธ์เข้าตลาดที่เหมาะสมกับกลุ่มเป้าหมาย โดยใช้จุดขายที่แตกต่างเป็นข้อได้เปรียบในการเข้าถึงลูกค้า`;
          case 'costStructure':
            return `ชื่อธุรกิจ: ${formData.name}\nกลยุทธ์เข้าตลาด: ${formData.goToMarket}\nโมเดลรายได้: ${formData.revenueModel}\n\nกรุณาระบุโครงสร้างต้นทุนที่จำเป็นสำหรับการดำเนินธุรกิจ โดยคำนึงถึงกลยุทธ์เข้าตลาดและโมเดลรายได้ที่เสนอไว้`;
          case 'breakEvenPoint':
            return `ชื่อธุรกิจ: ${formData.name}\nโครงสร้างต้นทุน: ${formData.costStructure}\nโมเดลรายได้: ${formData.revenueModel}\n\nกรุณาคำนวณจุดคุ้มทุนโดยพิจารณาจากโครงสร้างต้นทุนและโมเดลรายได้ที่ระบุไว้ข้างต้น พร้อมอธิบายปัจจัยที่ส่งผลต่อการถึงจุดคุ้มทุน`;
          case 'keyMetrics':
            return `ชื่อธุรกิจ: ${formData.name}\nกลยุทธ์เข้าตลาด: ${formData.goToMarket}\nโมเดลรายได้: ${formData.revenueModel}\n\nกรุณาระบุตัวชี้วัดสำคัญที่ใช้ในการวัดความสำเร็จของธุรกิจ โดยให้สอดคล้องกับกลยุทธ์เข้าตลาดและโมเดลรายได้ที่เสนอไว้`;
          case 'resourcesNeeded':
            return `ชื่อธุรกิจ: ${formData.name}\nกลยุทธ์เข้าตลาด: ${formData.goToMarket}\nโครงสร้างต้นทุน: ${formData.costStructure}\n\nกรุณาระบุทรัพยากรที่จำเป็นสำหรับการดำเนินธุรกิจ โดยคำนึงถึงกลยุทธ์เข้าตลาดและโครงสร้างต้นทุนที่เสนอไว้`;
          default:
            return `ชื่อธุรกิจ: ${formData.name}`;
        }
      };

      const context = getContext(field);
      const prompt = `คุณเป็นที่ปรึกษาธุรกิจ กรุณาวิเคราะห์ข้อมูลต่อไปนี้และให้คำแนะนำที่เหมาะสม:\n${context}\n\nให้เขียนอย่างกระชับและเป็นประโยชน์ ${field === 'description' ? 'ให้เขียนเป็นย่อหน้าที่อ่านง่ายและเข้าใจได้' : 'ตอบเป็นหัวข้อ'}`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "คุณเป็นที่ปรึกษาธุรกิจที่เชี่ยวชาญในการให้คำแนะนำเกี่ยวกับการเริ่มต้นธุรกิจ" },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate content');
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      
      setFormData(prev => ({
        ...prev,
        [field]: generatedContent
      }));
    } catch (error) {
      console.error(`Error generating ${field}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setFieldErrors(prev => ({ ...prev, [field]: errorMessage }));
    } finally {
      setGeneratingFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(field);
        return newSet;
      });
    }
  };

  const generateAllFields = async () => {
    if (!formData.name) {
      setFieldErrors(prev => ({ ...prev, name: 'กรุณากรอกชื่อธุรกิจก่อน' }));
      return;
    }

    setIsGeneratingAll(true);
    setFieldErrors({});
    
    const currentStepFields = {
      0: ['description', 'revenueModel'],
      1: ['targetUsers', 'painPoint', 'solution'],
      2: ['competitors', 'usp', 'goToMarket'],
      3: ['costStructure', 'breakEvenPoint', 'keyMetrics', 'resourcesNeeded']
    }[activeStep] as string[];

    setGeneratingFields(new Set(currentStepFields));

    try {
      for (const field of currentStepFields) {
        await generateContent(field);
      }
    } catch (error) {
      console.error("Error generating all fields:", error);
    } finally {
      setIsGeneratingAll(false);
      setGeneratingFields(new Set());
    }
  };

  const isFieldGeneratable = (field: string) => {
    if (!formData.name) return false;
    
    switch (field) {
      // Step 1: Business Information
      case 'description':
        return true;
      case 'revenueModel':
        return !!formData.description;
      
      // Step 2: Target Users & Problems
      case 'targetUsers':
        return !!formData.description;
      case 'painPoint':
        return !!formData.targetUsers;
      case 'solution':
        return !!formData.painPoint;
      
      // Step 3: Business Strategy
      case 'competitors':
        return !!formData.description && !!formData.targetUsers;
      case 'usp':
        return !!formData.solution && !!formData.competitors;
      case 'goToMarket':
        return !!formData.targetUsers && !!formData.usp;
      
      // Step 4: Financial and Operations
      case 'costStructure':
        return !!formData.goToMarket && !!formData.revenueModel;
      case 'breakEvenPoint':
        return !!formData.costStructure && !!formData.revenueModel;
      case 'keyMetrics':
        return !!formData.goToMarket && !!formData.revenueModel;
      case 'resourcesNeeded':
        return !!formData.goToMarket && !!formData.costStructure;
      
      default:
        return false;
    }
  };

  const renderTextField = (field: string, label: string) => (
    <Grid item xs={12}>
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          label={label}
          value={formData[field as keyof typeof formData]}
          onChange={handleInputChange(field)}
          variant="filled"
          multiline
          rows={4}
          sx={textFieldStyles}
          error={!!fieldErrors[field]}
          helperText={fieldErrors[field]}
          disabled={generatingFields.has(field)}
          InputProps={{
            endAdornment: field !== 'name' && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => generateContent(field)}
                  disabled={!isFieldGeneratable(field) || generatingFields.has(field)}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <RefreshIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {generatingFields.has(field) && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(128, 128, 128, 0.3)',
              borderRadius: '12px',
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
    </Grid>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                กรุณากรอกข้อมูลเบื้องต้นของธุรกิจ
              </Typography>
            </Grid>
            {renderTextField('name', 'ชื่อธุรกิจ')}
            {renderTextField('description', 'คำอธิบายธุรกิจ')}
            {renderTextField('revenueModel', 'โมเดลรายได้')}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                ข้อมูลกลุ่มเป้าหมายและปัญหา
              </Typography>
            </Grid>
            {renderTextField('targetUsers', 'กลุ่มเป้าหมาย')}
            {renderTextField('painPoint', 'ปัญหาที่พบ')}
            {renderTextField('solution', 'วิธีแก้ปัญหา')}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                กลยุทธ์ธุรกิจ
              </Typography>
            </Grid>
            {renderTextField('competitors', 'คู่แข่งในตลาด')}
            {renderTextField('usp', 'จุดขายที่แตกต่าง')}
            {renderTextField('goToMarket', 'กลยุทธ์เข้าตลาด')}
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                การเงินและการดำเนินงาน
              </Typography>
            </Grid>
            {renderTextField('costStructure', 'โครงสร้างต้นทุน')}
            {renderTextField('breakEvenPoint', 'จุดคุ้มทุน')}
            {renderTextField('keyMetrics', 'ตัวชี้วัดสำคัญ')}
            {renderTextField('resourcesNeeded', 'ทรัพยากรที่ต้องใช้หรือพาร์ตเนอร์')}
          </Grid>
        );

      default:
        return null;
    }
  };

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <StorefrontIcon />;
      case 1:
        return <HelpOutlineIcon />;
      case 2:
        return <MonetizationOnIcon />;
      case 3:
        return <SettingsIcon />;
      default:
        return null;
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return formData.name !== '' && formData.description !== '' && formData.revenueModel !== '';
      case 1:
        return formData.targetUsers !== '' && formData.painPoint !== '' && formData.solution !== '';
      case 2:
        return formData.competitors !== '' && formData.usp !== '' && formData.goToMarket !== '';
      case 3:
        return formData.costStructure !== '' && formData.breakEvenPoint !== '' && 
               formData.keyMetrics !== '' && formData.resourcesNeeded !== '';
      default:
        return false;
    }
  };

  const handleNextClick = () => {
    if (isStepComplete(activeStep) && !isGeneratingAll) {
      handleNext();
    } else {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'black',
        background: `radial-gradient(circle at 50% 50%, ${alpha('#1a1a1a', 0.95)} 0%, ${alpha('#000000', 0.95)} 100%)`,
        position: 'relative',
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 12 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/grid.svg")',
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => router.push('/')}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(159, 122, 234, 0.3)',
              }}
            >
              ประเมินไอเดียธุรกิจ
            </Typography>
          </Box>
          <ThemeToggle />
        </Box>

        {/* Stepper */}
        <Box sx={{ mb: 6 }}>
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            sx={{
              '.MuiStepLabel-label': {
                color: 'rgba(255, 255, 255, 0.5)',
                '&.Mui-active': {
                  color: theme.palette.primary.main,
                },
                '&.Mui-completed': {
                  color: theme.palette.success.main,
                },
              },
              '.MuiStepIcon-root': {
                color: 'rgba(255, 255, 255, 0.1)',
                '&.Mui-active': {
                  color: theme.palette.primary.main,
                },
                '&.Mui-completed': {
                  color: theme.palette.success.main,
                },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Form Card */}
        <Card
          sx={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 2 }}>
              <Button
                variant="outlined"
                onClick={generateAllFields}
                disabled={isGeneratingAll || !formData.name}
                sx={{
                  px: 4,
                  py: 1.5,
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                {isGeneratingAll ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    กำลังสร้างข้อมูลทั้งหมด...
                  </>
                ) : (
                  'สร้างข้อมูลทั้งหมด'
                )}
              </Button>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep > 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={isGeneratingAll}
                    sx={{
                      px: 4,
                      py: 1.5,
                      color: isGeneratingAll ? 'rgba(255, 255, 255, 0.5)' : 'white',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    ย้อนกลับ
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNextClick}
                  disabled={!isStepComplete(activeStep) || isGeneratingAll}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: isStepComplete(activeStep) && !isGeneratingAll ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {activeStep === steps.length - 1 ? 'วิเคราะห์' : 'ถัดไป'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="incomplete-data-modal"
          aria-describedby="incomplete-data-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="incomplete-data-modal" variant="h6" component="h2">
              ข้อมูลไม่ครบถ้วน
            </Typography>
            <Typography id="incomplete-data-description" sx={{ mt: 2 }}>
              กรุณากรอกข้อมูลให้ครบถ้วนก่อนดำเนินการต่อ
            </Typography>
            <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
              ปิด
            </Button>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
} 
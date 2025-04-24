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
} from '@mui/material';
import { ThemeToggle } from '@/components/ThemeToggle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRouter } from 'next/navigation';

const steps = ['ข้อมูลธุรกิจ', 'การเงิน', 'การดำเนินงาน'];

export default function Evaluate() {
  const theme = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    // Business Information
    businessName: '',
    businessType: '',
    
    // Financial
    initialInvestment: '',
    monthlyRevenue: '',
    monthlyCost: '',
    
    // Operational
    staffCount: '',
    openingHours: '',
    menuItems: '',
  });
  const [modalOpen, setModalOpen] = React.useState(false);

  // Animation variants for framer-motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ชื่อธุรกิจ"
                value={formData.businessName}
                onChange={handleInputChange('businessName')}
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ประเภทธุรกิจ"
                value={formData.businessType}
                onChange={handleInputChange('businessType')}
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                ข้อมูลด้านการเงิน
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="เงินลงทุนเริ่มต้น (บาท)"
                value={formData.initialInvestment}
                onChange={handleInputChange('initialInvestment')}
                type="number"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="เงินทุนที่ต้องใช้ในการเริ่มต้นธุรกิจ">
                        <IconButton size="small">
                          <HelpOutlineIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="รายได้ต่อเดือน (บาท)"
                value={formData.monthlyRevenue}
                onChange={handleInputChange('monthlyRevenue')}
                type="number"
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ต้นทุนต่อเดือน (บาท)"
                value={formData.monthlyCost}
                onChange={handleInputChange('monthlyCost')}
                type="number"
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                ข้อมูลด้านการดำเนินงาน
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="จำนวนพนักงาน"
                value={formData.staffCount}
                onChange={handleInputChange('staffCount')}
                type="number"
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ชั่วโมงเปิดให้บริการต่อวัน"
                value={formData.openingHours}
                onChange={handleInputChange('openingHours')}
                type="number"
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="จำนวนรายการสินค้า/เมนู"
                value={formData.menuItems}
                onChange={handleInputChange('menuItems')}
                type="number"
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
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
        return <MonetizationOnIcon />;
      case 2:
        return <SettingsIcon />;
      default:
        return null;
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return formData.businessName !== '' && formData.businessType !== '';
      case 1:
        return formData.initialInvestment !== '' && formData.monthlyRevenue !== '' && formData.monthlyCost !== '';
      case 2:
        return formData.staffCount !== '' && formData.openingHours !== '' && formData.menuItems !== '';
      default:
        return false;
    }
  };

  const handleNextClick = () => {
    if (isStepComplete(activeStep)) {
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
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(159, 122, 234, 0.3)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60%',
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                borderRadius: 2,
              }
            }}
          >
            ประเมินไอเดียธุรกิจ
          </Typography>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
              {activeStep > 0 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
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
                  ย้อนกลับ
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNextClick}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: isStepComplete(activeStep) ? 'white' : 'rgba(255, 255, 255, 0.5)',
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
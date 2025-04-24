'use client';

import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CampaignIcon from '@mui/icons-material/Campaign';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';

const businessAdvice = {
  marketing: {
    title: 'กลยุทธ์การตลาด',
    icon: <CampaignIcon sx={{ fontSize: 40 }} />,
    tips: [
      'วิเคราะห์กลุ่มเป้าหมายให้ชัดเจน เพื่อสร้างคอนเทนต์ที่ตรงใจ',
      'ใช้สื่อโซเชียลมีเดียให้เหมาะสมกับกลุ่มเป้าหมาย',
      'สร้างแบรนด์ที่มีเอกลักษณ์และจดจำง่าย',
      'ทำการตลาดแบบปากต่อปากผ่านลูกค้าที่พึงพอใจ',
      'จัดโปรโมชั่นและแคมเปญที่น่าสนใจอย่างสม่ำเสมอ',
      'สร้างความสัมพันธ์กับลูกค้าผ่านการให้ข้อมูลที่มีคุณค่า',
    ]
  },
  finance: {
    title: 'การบริหารการเงิน',
    icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
    tips: [
      'วางแผนงบประมาณและการลงทุนอย่างรอบคอบ',
      'แยกบัญชีส่วนตัวและบัญชีธุรกิจให้ชัดเจน',
      'ติดตามรายรับรายจ่ายอย่างสม่ำเสมอ',
      'สำรองเงินทุนสำหรับกรณีฉุกเฉิน',
      'บริหารสภาพคล่องให้เหมาะสม',
      'พิจารณาต้นทุนและกำไรในทุกการตัดสินใจ',
    ]
  },
  customerService: {
    title: 'การบริการลูกค้า',
    icon: <GroupIcon sx={{ fontSize: 40 }} />,
    tips: [
      'ให้บริการด้วยความเป็นมิตรและจริงใจ',
      'รับฟังความคิดเห็นและข้อเสนอแนะจากลูกค้า',
      'แก้ไขปัญหาอย่างรวดเร็วและมีประสิทธิภาพ',
      'สร้างประสบการณ์ที่ดีให้กับลูกค้า',
      'ติดตามความพึงพอใจของลูกค้าอย่างสม่ำเสมอ',
      'พัฒนาการบริการอย่างต่อเนื่อง',
    ]
  },
  growth: {
    title: 'การเติบโตทางธุรกิจ',
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    tips: [
      'วางแผนการเติบโตทั้งระยะสั้นและระยะยาว',
      'ศึกษาคู่แข่งและโอกาสทางการตลาด',
      'พัฒนาผลิตภัณฑ์หรือบริการใหม่ๆ',
      'สร้างพันธมิตรทางธุรกิจ',
      'ลงทุนในเทคโนโลยีที่จำเป็น',
      'พัฒนาทีมงานอย่างต่อเนื่อง',
    ]
  },
  operations: {
    title: 'การดำเนินงาน',
    icon: <SettingsIcon sx={{ fontSize: 40 }} />,
    tips: [
      'จัดระบบการทำงานให้มีประสิทธิภาพ',
      'ใช้เทคโนโลยีช่วยในการบริหารจัดการ',
      'บริหารสต็อกสินค้าอย่างเหมาะสม',
      'สร้างมาตรฐานในการทำงาน',
      'ติดตามและประเมินผลการดำเนินงาน',
      'ปรับปรุงกระบวนการทำงานอย่างต่อเนื่อง',
    ]
  }
};

export default function BusinessAdvice() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'black',
        background: `linear-gradient(135deg, ${alpha('#000000', 0.95)} 0%, ${alpha('#1a1a1a', 0.95)} 50%, ${alpha('#000000', 0.95)} 100%)`,
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
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
              คำแนะนำสำหรับธุรกิจ
            </Typography>
          </Box>
          <ThemeToggle />
        </Box>

        <Grid container spacing={4}>
          {Object.entries(businessAdvice).map(([key, section]) => (
            <Grid item xs={12} md={6} key={key}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <CardHeader
                  avatar={
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.3)})`,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      {section.icon}
                    </Box>
                  }
                  title={
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {section.title}
                    </Typography>
                  }
                />
                <CardContent>
                  <List>
                    {section.tips.map((tip, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={tip} 
                          sx={{ 
                            '& .MuiListItemText-primary': { 
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontSize: '1rem',
                            } 
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 
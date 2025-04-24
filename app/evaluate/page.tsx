'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper
} from '@mui/material';

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
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'black',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
            ประเมินไอเดียธุรกิจของคุณ
          </Typography>

          <Paper 
            elevation={3}
            sx={{
              p: 4,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
            }}
          >
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>ข้อมูลพื้นฐาน</Typography>
                  <TextField
                    fullWidth
                    label="ชื่อธุรกิจ"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="อธิบายธุรกิจของคุณ"
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="กลุ่มลูกค้าเป้าหมาย"
                    name="targetCustomers"
                    value={formData.targetCustomers}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                </Box>
              )}

              {currentStep === 2 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>ข้อมูลการลงทุน</Typography>
                  <TextField
                    fullWidth
                    label="เงินลงทุนเริ่มต้น (บาท)"
                    name="investmentAmount"
                    type="number"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="เวลาที่สามารถทำงานได้ต่อวัน (ชั่วโมง)"
                    name="workingHours"
                    type="number"
                    value={formData.workingHours}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                </Box>
              )}

              {currentStep === 3 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>ข้อมูลการขาย</Typography>
                  <TextField
                    fullWidth
                    label="ราคาขายต่อหน่วย (บาท)"
                    name="sellingPrice"
                    type="number"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="ต้นทุนต่อหน่วย (บาท)"
                    name="costPerUnit"
                    type="number"
                    value={formData.costPerUnit}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="คาดว่าจะขายได้ต่อวัน (หน่วย)"
                    name="expectedSales"
                    type="number"
                    value={formData.expectedSales}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                </Box>
              )}

              {currentStep === 4 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>ข้อมูลการตลาด</Typography>
                  <TextField
                    fullWidth
                    label="มีคู่แข่งในพื้นที่กี่ราย"
                    name="competitors"
                    type="number"
                    value={formData.competitors}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="แผนการตลาด"
                    name="marketingPlan"
                    value={formData.marketingPlan}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                  />
                </Box>
              )}

              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {currentStep > 1 && (
                  <Button
                    variant="outlined"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    ย้อนกลับ
                  </Button>
                )}
                {currentStep < 4 ? (
                  <Button
                    variant="contained"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    ถัดไป
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: 'success.main',
                      '&:hover': {
                        bgcolor: 'success.dark',
                      },
                    }}
                  >
                    ส่งแบบประเมิน
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
} 
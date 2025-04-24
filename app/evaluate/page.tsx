'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  Modal
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

  const [openModal, setOpenModal] = useState(false);

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

  const handleCloseModal = () => setOpenModal(false);

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.businessDescription && formData.targetCustomers;
      case 2:
        return formData.investmentAmount && formData.workingHours;
      case 3:
        return formData.sellingPrice && formData.costPerUnit && formData.expectedSales;
      case 4:
        return formData.competitors && formData.marketingPlan;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (!isStepComplete()) {
      setOpenModal(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
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
                    onClick={handleNextStep}
                    sx={{
                      bgcolor: isStepComplete() ? 'primary.main' : 'gray',
                      color: isStepComplete() ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        bgcolor: isStepComplete() ? 'primary.dark' : 'gray',
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            ข้อผิดพลาด
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            กรุณากรอกข้อมูลให้ครบถ้วนก่อนดำเนินการต่อ
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            ปิด
          </Button>
        </Box>
      </Modal>
    </Box>
  );
} 
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { n } from 'framer-motion/dist/types.d-B50aGbjN';

export default function FinancialInfoCard() {
  const router = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    totalBudget: 50000, // Default value in USD
    needBasedAid: '',
    scholarships: {
      applying: '',
      count: 0
    },
    workStudy: {
      interested: '',
      hoursPerWeek: 0
    }
  });
  
  // State for errors
  const [errors, setErrors] = useState({});
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Load data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('financialInfoData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);
  
  // Handle budget change
  const handleBudgetChange = (value) => {
    setFormData({
      ...formData,
      totalBudget: value[0]
    });
    
    // Clear error when user changes value
    if (errors.totalBudget) {
      setErrors({ ...errors, totalBudget: '' });
    }
  };
  
  // Handle need-based aid selection
  const handleNeedBasedAidToggle = (value) => {
    setFormData({
      ...formData,
      needBasedAid: value
    });
    
    // Clear error when user selects
    if (errors.needBasedAid) {
      setErrors({ ...errors, needBasedAid: '' });
    }
  };
  
  // Handle scholarships applying selection
  const handleScholarshipsToggle = (value) => {
    setFormData({
      ...formData,
      scholarships: {
        ...formData.scholarships,
        applying: value
      }
    });
    
    // Clear error when user selects
    if (errors.scholarships) {
      setErrors({ ...errors, scholarships: '' });
    }
  };
  
  // Handle scholarship count change
  const handleScholarshipCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      scholarships: {
        ...formData.scholarships,
        count: count
      }
    });
  };
  
  // Handle work study interest selection
  const handleWorkStudyToggle = (value) => {
    setFormData({
      ...formData,
      workStudy: {
        ...formData.workStudy,
        interested: value
      }
    });
    
    // Clear error when user selects
    if (errors.workStudy) {
      setErrors({ ...errors, workStudy: '' });
    }
  };
  
  // Handle work hours change
  const handleWorkHoursChange = (value) => {
    setFormData({
      ...formData,
      workStudy: {
        ...formData.workStudy,
        hoursPerWeek: value[0]
      }
    });
  };
  
  // Validate form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    // Validate budget
    if (formData.totalBudget <= 0) {
      formErrors.totalBudget = 'Please enter a valid budget amount';
      isValid = false;
    }
    
    // Validate need-based aid selection
    if (!formData.needBasedAid) {
      formErrors.needBasedAid = 'Please select yes or no';
      isValid = false;
    }
    
    // Validate scholarships selection
    if (!formData.scholarships.applying) {
      formErrors.scholarships = 'Please select yes or no';
      isValid = false;
    }
    
    // Validate work study selection
    if (!formData.workStudy.interested) {
      formErrors.workStudy = 'Please select yes or no';
      isValid = false;
    }
    
    setErrors(formErrors);
    return isValid;
  };
  
  // Handle submit button click
  const handleSubmit = () => {
    if (validateForm()) {
      // Store in local storage
      localStorage.setItem('financialInfoData', JSON.stringify(formData));
      
     
      n
      
      // For demonstration purposes:
      alert("Financial information saved! Navigating to next page...");
    }
  };
  
  // Error message component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    
    return (
      <div className="text-red-400 text-sm mt-1 flex items-center">
        <AlertCircle className="h-3 w-3 mr-1" />
        {error}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-700 to-green-800">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Financial Information
      </h1>
      
      <Card className="bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl w-full rounded-3xl">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Your Financial Plan</h2>
          
          <div className="space-y-6">
            {/* Total Budget */}
            <div className="space-y-3">
              <Label className="text-white font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Total College Budget (4 years)
              </Label>
              <p className="text-white/80 text-sm">
                What's your estimated total budget for all 4 years of college?
              </p>
              
              <div className="pt-6 pb-2">
                <Slider
                  value={[formData.totalBudget]}
                  onValueChange={handleBudgetChange}
                  max={200000}
                  step={5000}
                  className="bg-white/10 py-4"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/80 text-sm">$0</span>
                  <span className="text-white text-xl font-bold">{formatCurrency(formData.totalBudget)}</span>
                  <span className="text-white/80 text-sm">$200,000+</span>
                </div>
              </div>
              <ErrorMessage error={errors.totalBudget} />
            </div>
            
            <Separator className="bg-white/30" />
            
            {/* Need-based Financial Aid */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Need-based Financial Aid</Label>
              <p className="text-white/80 text-sm">
                Do you plan to apply for need-based financial aid?
              </p>
              
              <RadioGroup 
                value={formData.needBasedAid}
                onValueChange={handleNeedBasedAidToggle}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="aid-yes" className="border-white text-white" />
                  <Label htmlFor="aid-yes" className="text-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="aid-no" className="border-white text-white" />
                  <Label htmlFor="aid-no" className="text-white">No</Label>
                </div>
              </RadioGroup>
              <ErrorMessage error={errors.needBasedAid} />
            </div>
            
            <Separator className="bg-white/30" />
            
            {/* Scholarships */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Scholarships</Label>
              <p className="text-white/80 text-sm">
                Are you planning to apply for scholarships?
              </p>
              
              <RadioGroup 
                value={formData.scholarships.applying}
                onValueChange={handleScholarshipsToggle}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="scholarships-yes" className="border-white text-white" />
                  <Label htmlFor="scholarships-yes" className="text-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="scholarships-no" className="border-white text-white" />
                  <Label htmlFor="scholarships-no" className="text-white">No</Label>
                </div>
              </RadioGroup>
              <ErrorMessage error={errors.scholarships} />
              
              {formData.scholarships.applying === 'yes' && (
                <div className="pt-2">
                  <Label htmlFor="scholarshipCount" className="text-white/80 text-sm mb-2 block">
                    How many scholarships do you plan to apply for?
                  </Label>
                  <Input 
                    id="scholarshipCount"
                    type="number"
                    min="0"
                    value={formData.scholarships.count}
                    onChange={handleScholarshipCountChange}
                    className="bg-white/30 text-white placeholder:text-white/90 border-white/30 w-32"
                    placeholder="Number"
                  />
                </div>
              )}
            </div>
            
            <Separator className="bg-white/30" />
            
            {/* Work Study */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Work Study</Label>
              <p className="text-white/80 text-sm">
                Are you interested in work-study opportunities during college?
              </p>
              
              <RadioGroup 
                value={formData.workStudy.interested}
                onValueChange={handleWorkStudyToggle}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="work-yes" className="border-white text-white" />
                  <Label htmlFor="work-yes" className="text-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="work-no" className="border-white text-white" />
                  <Label htmlFor="work-no" className="text-white">No</Label>
                </div>
              </RadioGroup>
              <ErrorMessage error={errors.workStudy} />
              
              {formData.workStudy.interested === 'yes' && (
                <div className="pt-2">
                  <Label className="text-white/80 text-sm mb-2 block">
                    How many hours per week would you be willing to work?
                  </Label>
                  <div className="pt-4 pb-2">
                    <Slider
                      value={[formData.workStudy.hoursPerWeek]}
                      onValueChange={handleWorkHoursChange}
                      max={30}
                      step={1}
                      className="bg-white/10 py-4"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white/80 text-sm">0 hrs</span>
                      <span className="text-white text-lg font-bold">{formData.workStudy.hoursPerWeek} hours/week</span>
                      <span className="text-white/80 text-sm">30 hrs</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end pt-2 pb-6">
          <Button 
            onClick={handleSubmit} 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
          >
            Submit and Continue <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
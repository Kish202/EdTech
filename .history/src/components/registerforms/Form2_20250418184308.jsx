import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';


export default function InfoCard() {
  // State for form data
  const [formData, setFormData] = useState({
    courses: [],
    gpa: "3.0",
    standardizedTests: []
  });
  
  // State for errors
  const [errors, setErrors] = useState({});
  
  // Available courses
  const availableCourses = [
    { id: "ap-calculus", label: "AP Calculus" },
    { id: "ap-biology", label: "AP Biology" },
    { id: "ap-chemistry", label: "AP Chemistry" },
    { id: "ap-physics", label: "AP Physics" },
    { id: "ap-literature", label: "AP Literature" },
    { id: "ap-history", label: "AP US History" },
    { id: "ib-math", label: "IB Mathematics" },
    { id: "ib-biology", label: "IB Biology" },
    { id: "ib-chemistry", label: "IB Chemistry" },
    { id: "honors-english", label: "Honors English" },
    { id: "honors-history", label: "Honors History" }
  ];
  
  // Available standardized tests
  const availableTests = [
    { value: "sat", label: "SAT" },
    { value: "act", label: "ACT" },
    { value: "psat", label: "PSAT" },
    { value: "ap", label: "AP Exams" },
    { value: "ib", label: "IB Exams" },
    { value: "none", label: "None" }
  ];
  
  // Handle course selection
  const handleCourseToggle = (courseId) => {
    const currentCourses = [...formData.courses];
    
    if (currentCourses.includes(courseId)) {
      // Remove course if already selected
      setFormData({
        ...formData,
        courses: currentCourses.filter(id => id !== courseId)
      });
    } else {
      // Add course if not selected
      setFormData({
        ...formData,
        courses: [...currentCourses, courseId]
      });
    }
    
    // Clear error when user selects
    if (errors.courses) {
      setErrors({ ...errors, courses: '' });
    }
  };
  
  // Handle GPA slider change
  const handleGPAChange = (value) => {
    setFormData({
      ...formData,
      gpa: value[0].toString()
    });
    
    // Clear error when user changes
    if (errors.gpa) {
      setErrors({ ...errors, gpa: '' });
    }
  };
  
  // Handle test selection
  const handleTestSelect = (value) => {
    setFormData({
      ...formData,
      standardizedTests: value === "none" ? [] : [value]
    });
    
    // Clear test score when changing test
    setFormData({
      ...formData,
      standardizedTests: value === "none" ? [] : [value],
      testScore: ""
    });
  };
  
  // Handle test score input
  const handleTestScoreChange = (e) => {
    setFormData({
      ...formData,
      testScore: e.target.value
    });
  };
  
  // Validate form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    // Validate courses (require at least one)
    if (formData.courses.length === 0) {
      formErrors.courses = 'Please select at least one course';
      isValid = false;
    }
    
    // Validate GPA
    if (!formData.gpa) {
      formErrors.gpa = 'GPA is required';
      isValid = false;
    } else if (parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 4.0) {
      formErrors.gpa = 'GPA must be between 0.0 and 4.0';
      isValid = false;
    }
    
    // Validate test score if test is selected (except "None")
    if (formData.standardizedTests.length > 0 && 
        formData.standardizedTests[0] !== "none" && 
        (!formData.testScore || formData.testScore.trim() === "")) {
      formErrors.testScore = 'Please enter your test score';
      isValid = false;
    }
    
    setErrors(formErrors);
    return isValid;
  };
  
  // Handle continue button click
  const handleContinue = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // In a real application, you would move to the next card or submit the data
      alert("Academic information submitted successfully!");
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6  bg-blue-700">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Academic Information
      </h1>
      
      <Card className="bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl w-full rounded-3xl">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Academic Background</h2>
          
          <div className="space-y-6">
            {/* AP, IB, or Honors Courses */}
            <div className="space-y-3">
              <Label className="text-white font-medium">AP, IB, or Honors Courses</Label>
              <p className="text-white/80 text-sm">
                Select the courses you've taken or are currently taking
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={course.id}
                      checked={formData.courses.includes(course.id)}
                      onCheckedChange={() => handleCourseToggle(course.id)}
                      className="border-white data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor={course.id} className="text-white">{course.label}</Label>
                  </div>
                ))}
              </div>
              <ErrorMessage error={errors.courses} />
            </div>
            
            {/* GPA Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-white font-medium">Expected or Current Unweighted GPA</Label>
                <span className="text-white font-bold bg-white/20 px-3 py-1 rounded-full">
                  {formData.gpa}
                </span>
              </div>
              
              <Slider 
                defaultValue={[3.0]} 
                max={4.0} 
                min={0} 
                step={0.1}
                value={[parseFloat(formData.gpa)]}
                onValueChange={handleGPAChange}
                className="py-4"
              />
              
              <div className="flex justify-between text-white/80 text-sm">
                <span>0.0</span>
                <span>4.0</span>
              </div>
              
              <ErrorMessage error={errors.gpa} />
            </div>
            
            {/* Standardized Tests */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Standardized Tests Taken (if any)</Label>
              
              <Select 
                value={formData.standardizedTests[0] || ""}
                onValueChange={handleTestSelect}
              >
                <SelectTrigger className="bg-white/30 text- border-white/30">
                  <SelectValue placeholder="Select test" />
                </SelectTrigger>
                <SelectContent>
                  {availableTests.map((test) => (
                    <SelectItem key={test.value} value={test.value}>{test.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Test Score input - only show if a test is selected and it's not "None" */}
              {formData.standardizedTests.length > 0 && formData.standardizedTests[0] !== "none" && (
                <div className="space-y-2">
                  <Label htmlFor="testScore" className="text-white font-medium">Test Score</Label>
                  <Input 
                    id="testScore" 
                    value={formData.testScore || ""} 
                    onChange={handleTestScoreChange} 
                    className="bg-white/30 text-white placeholder:text-white/70 border-white/30"
                    placeholder={`Enter your ${availableTests.find(t => t.value === formData.standardizedTests[0])?.label} score`}
                  />
                  <ErrorMessage error={errors.testScore} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end pt-2 pb-6">
          <Button 
            onClick={handleContinue} 
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
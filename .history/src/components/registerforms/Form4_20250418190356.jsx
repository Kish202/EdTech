import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ExperienceActivitiesCard() {
  // State for form data
  const [formData, setFormData] = useState({
    activities: [
      { name: '', description: '', role: '' },
      { name: '', description: '', role: '' },
      { name: '', description: '', role: '' }
    ],
    workExperience: {
      hasExperience: '',
      description: ''
    },
    researchExperience: {
      hasExperience: '',
      description: ''
    },
    awards: []
  });
  
  // State for new award input
  const [newAward, setNewAward] = useState('');
  
  // State for errors
  const [errors, setErrors] = useState({});
  
  // Load data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('experienceActivitiesData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);
  
  // Handle extracurricular activity input changes
  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = { 
      ...updatedActivities[index], 
      [field]: value 
    };
    
    setFormData({
      ...formData,
      activities: updatedActivities
    });
    
    // Clear error when user types
    if (errors.activities) {
      setErrors({ ...errors, activities: '' });
    }
  };
  
  // Handle work experience radio selection
  const handleWorkExperienceToggle = (value) => {
    setFormData({
      ...formData,
      workExperience: {
        ...formData.workExperience,
        hasExperience: value
      }
    });
    
    // Clear error when user selects
    if (errors.workExperience) {
      setErrors({ ...errors, workExperience: '' });
    }
  };
  
  // Handle work experience description
  const handleWorkDescriptionChange = (e) => {
    setFormData({
      ...formData,
      workExperience: {
        ...formData.workExperience,
        description: e.target.value
      }
    });
  };
  
  // Handle research experience radio selection
  const handleResearchExperienceToggle = (value) => {
    setFormData({
      ...formData,
      researchExperience: {
        ...formData.researchExperience,
        hasExperience: value
      }
    });
    
    // Clear error when user selects
    if (errors.researchExperience) {
      setErrors({ ...errors, researchExperience: '' });
    }
  };
  
  // Handle research experience description
  const handleResearchDescriptionChange = (e) => {
    setFormData({
      ...formData,
      researchExperience: {
        ...formData.researchExperience,
        description: e.target.value
      }
    });
  };
  
  // Handle new award input
  const handleNewAwardChange = (e) => {
    setNewAward(e.target.value);
  };
  
  // Add a new award
  const addAward = () => {
    if (newAward.trim() !== '') {
      const updatedAwards = [...formData.awards, newAward.trim()];
      setFormData({
        ...formData,
        awards: updatedAwards
      });
      setNewAward('');
      
      // Clear error when user adds an award
      if (errors.awards) {
        setErrors({ ...errors, awards: '' });
      }
    }
  };
  
  // Remove an award
  const removeAward = (index) => {
    const updatedAwards = formData.awards.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      awards: updatedAwards
    });
  };
  
  // Handle Enter key press on new award input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAward();
    }
  };
  
  // Validate form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    // Validate at least one activity
    if (!formData.activities[0].name.trim()) {
      formErrors.activities = 'Please enter at least one extracurricular activity';
      isValid = false;
    }
    
    // Validate work experience selection
    if (!formData.workExperience.hasExperience) {
      formErrors.workExperience = 'Please select yes or no';
      isValid = false;
    }
    
    // If yes to work experience, validate description
    if (formData.workExperience.hasExperience === 'yes' && 
        !formData.workExperience.description.trim()) {
      formErrors.workExperienceDescription = 'Please provide details about your work experience';
      isValid = false;
    }
    
    // Validate research experience selection
    if (!formData.researchExperience.hasExperience) {
      formErrors.researchExperience = 'Please select yes or no';
      isValid = false;
    }
    
    // If yes to research experience, validate description
    if (formData.researchExperience.hasExperience === 'yes' && 
        !formData.researchExperience.description.trim()) {
      formErrors.researchExperienceDescription = 'Please provide details about your research experience';
      isValid = false;
    }
    
    setErrors(formErrors);
    return isValid;
  };
  
  // Handle submit button click
  const handleSubmit = () => {
    if (validateForm()) {
      // Store in local storage
      localStorage.setItem('experienceActivitiesData', JSON.stringify(formData));
      
      // Simulate navigation to next page
      alert("Data saved! Ready to navigate to the next page.");
      // In a real application, you would use something like:
      // navigate('/next-page');
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-600 to-green-950">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Experience & Activities
      </h1>
      
      <Card className="bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl w-full rounded-3xl">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Your Experiences</h2>
          
          <div className="space-y-6">
            {/* Extracurricular Activities */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Top 3 Extracurricular Activities</Label>
              <p className="text-white/80 text-sm">
                Include clubs, sports, leadership roles, volunteering, etc.
              </p>
              
              {formData.activities.map((activity, index) => (
                <div key={index} className="space-y-2 bg-white/10 p-3 rounded-lg">
                  <div className="flex items-center  border">
                    <div className="flex  items-center justify-center bg-white/20 rounded-full w-8 h-8 mr-2 shrink-0">
                      <span className="text-white font-medium">{index + 1}</span>
                    </div>
                    <Input 
                      value={activity.name}
                      onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
                      className="bg-white/30 text-white placeholder:text-white/90 border-white/30"
                      placeholder={`Activity name`}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input 
                      value={activity.role}
                      onChange={(e) => handleActivityChange(index, 'role', e.target.value)}
                      className="bg-white/30 text-white placeholder:text-white/90 border-white/30 "
                      placeholder="Your role or position"
                    />
                    <Input 
                      value={activity.description}
                      onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                      className="bg-white/30 text-white placeholder:text-white/90 border-white/30"
                      placeholder="Brief description"
                    />
                  </div>
                </div>
              ))}
              
              {errors.activities && <ErrorMessage error={errors.activities} />}
            </div>
            
            <Separator className="bg-white/30" />
            
            {/* Work Experience */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Work Experience</Label>
              <p className="text-white/80 text-sm">
                Have you had any part-time jobs, internships, or paid/unpaid work experience?
              </p>
              
              <RadioGroup 
                value={formData.workExperience.hasExperience}
                onValueChange={handleWorkExperienceToggle}
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
              <ErrorMessage error={errors.workExperience} />
              
              {formData.workExperience.hasExperience === 'yes' && (
                <div className="space-y-2">
                  <Label htmlFor="workDescription" className="text-white/80 text-sm">
                    Please describe your work experience
                  </Label>
                  <Textarea 
                    id="workDescription"
                    value={formData.workExperience.description}
                    onChange={handleWorkDescriptionChange}
                    className={`bg-white/30 text-white placeholder:text-white/90 min-h-24 ${
                      errors.workExperienceDescription ? 'border-red-400' : 'border-white/30'
                    }`}
                    placeholder="Describe your roles, responsibilities, and what you learned"
                  />
                  <ErrorMessage error={errors.workExperienceDescription} />
                </div>
              )}
            </div>
            
            <Separator className="bg-white/30" />
            
            {/* Research Experience */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Research Projects & Academic Programs</Label>
              <p className="text-white/80 text-sm">
                Have you participated in any research projects or summer academic programs?
              </p>
              
              <RadioGroup 
                value={formData.researchExperience.hasExperience}
                onValueChange={handleResearchExperienceToggle}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="research-yes" className="border-white text-white" />
                  <Label htmlFor="research-yes" className="text-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="research-no" className="border-white text-white" />
                  <Label htmlFor="research-no" className="text-white">No</Label>
                </div>
              </RadioGroup>
              <ErrorMessage error={errors.researchExperience} />
              
              {formData.researchExperience.hasExperience === 'yes' && (
                <div className="space-y-2">
                  <Label htmlFor="researchDescription" className="text-white/80 text-sm">
                    Please describe your research experience
                  </Label>
                  <Textarea 
                    id="researchDescription"
                    value={formData.researchExperience.description}
                    onChange={handleResearchDescriptionChange}
                    className={`bg-white/30 text-white placeholder:text-white/90 min-h-24 ${
                      errors.researchExperienceDescription ? 'border-red-400' : 'border-white/30'
                    }`}
                    placeholder="Describe the research project or program, your role, and what you learned"
                  />
                  <ErrorMessage error={errors.researchExperienceDescription} />
                </div>
              )}
            </div>
            
            <Separator className="bg-white/30" />
            
            {/* Awards & Accomplishments */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Awards & Accomplishments</Label>
              <p className="text-white/80 text-sm">
                List any awards, recognitions, or standout accomplishments you're proud of
              </p>
              
              {/* Awards list */}
              <div className="space-y-2">
                {formData.awards.map((award, index) => (
                  <div key={index} className="flex items-center bg-white/10 p-2 rounded-lg">
                    <div className="flex-1 text-white">{award}</div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeAward(index)}
                      className="text-white/70 hover:text-white hover:bg-white/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* New award input */}
              <div className="flex space-x-2">
                <Input 
                  value={newAward}
                  onChange={handleNewAwardChange}
                  onKeyPress={handleKeyPress}
                  className="bg-white/30 text-white placeholder:text-white/90 border-white/30 flex-1"
                  placeholder="Add an award or accomplishment"
                />
                <Button 
                  onClick={addAward}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end pt-2 pb-6">
          <Button 
            onClick={handleSubmit} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit and Continue <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
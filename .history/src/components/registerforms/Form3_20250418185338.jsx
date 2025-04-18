import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChevronRight, AlertCircle, X, Plus, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {useNavigate} from "react-router-dom"

export default function CollegePreferencesCard() {
  // State for form data
  const [formData, setFormData] = useState({
    colleges: ['', '', '', '', ''],
    majors: []
  });
  
  const navigate = useNavigate();
  // State for new major input
  const [newMajor, setNewMajor] = useState('');
  
  // State for errors
  const [errors, setErrors] = useState({});
  
  // Common majors/fields of interest
  const commonMajors = [
    "Computer Science", "Engineering", "Business", "Biology", 
    "Psychology", "Communications", "Mathematics", "Economics",
    "Chemistry", "Political Science", "English", "History",
    "Art", "Music", "Nursing", "Sociology", "Philosophy"
  ];
  
  // Load data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('collegePreferencesData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);
  
  // Handle college input changes
  const handleCollegeChange = (index, value) => {
    const updatedColleges = [...formData.colleges];
    updatedColleges[index] = value;
    
    setFormData({
      ...formData,
      colleges: updatedColleges
    });
    
    // Clear error when user types
    if (errors.colleges) {
      setErrors({ ...errors, colleges: '' });
    }
  };
  
  // Add a major from the pre-defined list
  const addCommonMajor = (major) => {
    if (!formData.majors.includes(major)) {
      const updatedMajors = [...formData.majors, major];
      setFormData({
        ...formData,
        majors: updatedMajors
      });
      
      // Clear error when user adds a major
      if (errors.majors) {
        setErrors({ ...errors, majors: '' });
      }
    }
  };
  
  // Add a custom major
  const addCustomMajor = () => {
    if (newMajor.trim() !== '' && !formData.majors.includes(newMajor.trim())) {
      const updatedMajors = [...formData.majors, newMajor.trim()];
      setFormData({
        ...formData,
        majors: updatedMajors
      });
      setNewMajor('');
      
      // Clear error when user adds a major
      if (errors.majors) {
        setErrors({ ...errors, majors: '' });
      }
    }
  };
  
  // Remove a major
  const removeMajor = (major) => {
    const updatedMajors = formData.majors.filter(m => m !== major);
    setFormData({
      ...formData,
      majors: updatedMajors
    });
  };
  
  // Handle input for custom major
  const handleNewMajorChange = (e) => {
    setNewMajor(e.target.value);
  };
  
  // Handle Enter key press on custom major input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomMajor();
    }
  };
  
  // Validate form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    // Validate at least one college is entered
    if (!formData.colleges[0] || formData.colleges[0].trim() === '') {
      formErrors.colleges = 'Please enter at least your top college choice';
      isValid = false;
    }
    
    // Validate majors
    if (formData.majors.length === 0) {
      formErrors.majors = 'Please select or enter at least one major or field of interest';
      isValid = false;
    }
    
    setErrors(formErrors);
    return isValid;
  };
  
  // Handle submit button click
  const handleSubmit = () => {
    if (validateForm()) {
      // Store in local storage
      localStorage.setItem('collegePreferencesData', JSON.stringify(formData));
      navigate('/experience-activities')
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-600 to-green-900">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        College Preferences
      </h1>
      
      <Card className="bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl w-full rounded-3xl">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Your College Choices</h2>
          
          <div className="space-y-6">
            {/* Dream Colleges */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Top 5 Dream Colleges or Universities</Label>
              <p className="text-white/80 text-sm">
                List your preferred schools in order of preference
              </p>
              
              {formData.colleges.map((college, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex items-center justify-center bg-white/10 rounded-full w-8 h-8 shrink-0">
                    <span className="text-white font-medium">{index + 1}</span>
                  </div>
                  <Input 
                    value={college}
                    onChange={(e) => handleCollegeChange(index, e.target.value)}
                    className={`bg-white/30 text-white placeholder:text-white/70 border-white/30 flex-1 ${
                      index === 0 && errors.colleges ? 'border-red-400' : 'border-white/30'
                    }`}
                    placeholder={`College choice #${index + 1}`}
                  />
                </div>
              ))}
              
              {errors.colleges && <ErrorMessage error={errors.colleges} />}
              
              <p className="text-white/70 italic text-sm mt-1">
                *Only your first choice is required
              </p>
            </div>
            
            {/* Majors/Fields of Interest */}
            <div className="space-y-3">
              <Label className="text-white font-medium">
                Majors or Fields of Interest
              </Label>
              <p className="text-white/80 text-sm">
                Select from common majors or add your own
              </p>
              
              {/* Selected majors display */}
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.majors.map((major, index) => (
                  <Badge 
                    key={index} 
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 flex items-center"
                  >
                    {major}
                    <button 
                      onClick={() => removeMajor(major)} 
                      className="ml-2 hover:bg-white/20 rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              {/* Custom major input */}
              <div className="flex space-x-2">
                <Input 
                  value={newMajor}
                  onChange={handleNewMajorChange}
                  onKeyPress={handleKeyPress}
                  className="bg-white/30 text-white placeholder:text-white/70 border-white/30 flex-1"
                  placeholder="Add a custom major or field of interest"
                />
                <Button 
                  onClick={addCustomMajor}
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/20 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Common majors */}
              <div className="mt-3">
                <Label className="text-white/80 text-sm mb-2 block">Common Majors</Label>
                <div className="flex flex-wrap gap-2">
                  {commonMajors.map((major, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className={`border-white/40 text-white cursor-pointer hover:bg-white/20 ${
                        formData.majors.includes(major) ? 'bg-white/20' : 'bg-transparent'
                      }`}
                      onClick={() => addCommonMajor(major)}
                    >
                      {major}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {errors.majors && <ErrorMessage error={errors.majors} />}
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
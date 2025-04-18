import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Home } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function EtcInfoCard() {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    additionalInfo: '',
    specialCircumstances: false,
    personalGoals: '',
    uniqueQualities: ''
  });
  
  // Load data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('additionalInfoData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);
  
  // Handle text area change
  const handleTextChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Handle switch toggle
  const handleSwitchToggle = () => {
    setFormData({
      ...formData,
      specialCircumstances: !formData.specialCircumstances
    });
  };
  
  // Handle submit button click
  const handleSubmit = () => {
    // Store in local storage
    localStorage.setItem('additionalInfoData', JSON.stringify(formData));
    
    // Navigate to home page
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-800 to-green-700">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Additional Information
      </h1>
      
      <Card className="bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl w-full rounded-3xl">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Tell Us More About You</h2>
          
          <div className="space-y-6">
            {/* Main Additional Info */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Anything else we should know about you?</Label>
              <p className="text-white/80 text-sm">
                Share any special circumstances, passions, goals, personal story, or other information that didn't fit elsewhere.
              </p>
              
              <Textarea 
                value={formData.additionalInfo}
                onChange={(e) => handleTextChange('additionalInfo', e.target.value)}
                className="bg-white/30 text-white placeholder:text-white/90 min-h-32 border-white/30"
                placeholder="Your response (optional)"
              />
            </div>
            
            {/* Special Circumstances Toggle */}
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
              <div>
                <Label className="text-white font-medium">Special Circumstances</Label>
                <p className="text-white/80 text-sm mt-1">
                  Check this if you have special circumstances that may affect your application.
                </p>
              </div>
              <Switch 
                checked={formData.specialCircumstances}
                onCheckedChange={handleSwitchToggle}
                className="data-[state==checked]:bg-blue-500 !bg-slate-500"
              />
            </div>
            
            {/* Personal Goals */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Your Personal Goals</Label>
              <p className="text-white/80 text-sm">
                What do you hope to achieve during your college experience and beyond?
              </p>
              
              <Textarea 
                value={formData.personalGoals}
                onChange={(e) => handleTextChange('personalGoals', e.target.value)}
                className="bg-white/30 text-white placeholder:text-white/90 min-h-24 border-white/30"
                placeholder="Your goals (optional)"
              />
            </div>
            
            {/* Unique Qualities */}
            <div className="space-y-3">
              <Label className="text-white font-medium">What Makes You Unique?</Label>
              <p className="text-white/80 text-sm">
                Share anything that makes you stand out from other applicants.
              </p>
              
              <Textarea 
                value={formData.uniqueQualities}
                onChange={(e) => handleTextChange('uniqueQualities', e.target.value)}
                className="bg-white/30 text-white placeholder:text-white/90 min-h-24 border-white/30"
                placeholder="Your unique qualities (optional)"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2 pb-6">
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-white/30 bg-transparent text-white hover:bg-white/20 hover:text-white"
          >
            Back
          </Button>
          
          <Button 
            onClick={handleSubmit} 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
          >
            Submit and Go Home <Home className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
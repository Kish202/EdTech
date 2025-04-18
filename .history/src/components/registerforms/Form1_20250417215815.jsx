import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {USAstates} from 'usa-states'
// Note: In a real implementation, you would install these packages:
// npm install usa-states csc
// For this example, we'll simulate their behavior

export default function RegistrationForm() {
  const [currentCard, setCurrentCard] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    highSchoolName: '',
    city: '',
    state: '',
    graduationYear: '',
    gender: '',
    race: '',
    firstGeneration: '',
  });
  
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
  // Years for dropdown - dynamic calculation
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => ({
    value: (currentYear + i - 5).toString(),
    label: (currentYear + i - 5).toString()
  }));
  
  // Simulate loading states from usa-states package
  useEffect(() => {
    // In real implementation, this would be:
    
    // import { USAStates } from 'usa-states';
    const usStates = new USAStates();
    setStates(usStates.states);
    
    // Simulating state data
    
  }, []);
  
  // Simulate loading cities based on state selection
  useEffect(() => {
    if (formData.state) {
      setIsLoading(true);
      
      // In real implementation, this would use:
      // import { City } from 'country-state-city';
      const citiesData = City.getCitiesOfState('US', formData.state);
      setCities(citiesData);
      
      // Simulate API delay
    //   setTimeout(() => {
    //     // Mock cities data based on state
    //     const citiesData = {
    //       'CA': [
    //         { name: 'Los Angeles' }, 
    //         { name: 'San Francisco' }, 
    //         { name: 'San Diego' }
    //       ],
    //       'NY': [
    //         { name: 'New York City' }, 
    //         { name: 'Buffalo' }, 
    //         { name: 'Albany' }
    //       ],
    //       'TX': [
    //         { name: 'Houston' }, 
    //         { name: 'Austin' }, 
    //         { name: 'Dallas' }
    //       ],
    //       // Default cities for other states
    //       'default': [
    //         { name: 'City 1' }, 
    //         { name: 'City 2' }, 
    //         { name: 'City 3' }
    //       ]
    //     };
        
    //     setCities(citiesData[formData.state] || citiesData['default']);
    //     setIsLoading(false);
    //   }, 500);
    // } else {
    //   setCities([]);
    // }
  }, [formData.state]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user selects
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  // Validation functions
  const validateCard = (cardIndex) => {
    let cardErrors = {};
    let isValid = true;
    
    switch (cardIndex) {
      case 0: // Personal Information
        if (!formData.fullName.trim()) {
          cardErrors.fullName = 'Full name is required';
          isValid = false;
        }
        
        if (!formData.email.trim()) {
          cardErrors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          cardErrors.email = 'Email is invalid';
          isValid = false;
        }
        
        if (formData.phoneNumber.trim() && !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phoneNumber)) {
          cardErrors.phoneNumber = 'Phone number format is invalid';
          isValid = false;
        }
        break;
        
      case 1: // School Information
        if (!formData.highSchoolName.trim()) {
          cardErrors.highSchoolName = 'High school name is required';
          isValid = false;
        }
        
        if (!formData.state) {
          cardErrors.state = 'State is required';
          isValid = false;
        }
        
        if (!formData.city) {
          cardErrors.city = 'City is required';
          isValid = false;
        }
        
        if (!formData.graduationYear) {
          cardErrors.graduationYear = 'Graduation year is required';
          isValid = false;
        }
        break;
        
      case 2: // Demographics
        if (!formData.gender) {
          cardErrors.gender = 'Please select a gender option';
          isValid = false;
        }
        
        if (!formData.race) {
          cardErrors.race = 'Please select a race option';
          isValid = false;
        }
        break;
        
      case 3: // Additional Information
        if (!formData.firstGeneration) {
          cardErrors.firstGeneration = 'Please select an option';
          isValid = false;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(cardErrors);
    return isValid;
  };
  
  // Handle continue button click
  const handleContinue = () => {
    if (validateCard(currentCard) && currentCard < cardRefs.length - 1) {
      setCurrentCard(currentCard + 1);
      
      // Scroll to the next card
      if (cardRefs[currentCard + 1].current) {
        cardRefs[currentCard + 1].current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Handle submit
  const handleSubmit = () => {
    if (validateCard(currentCard)) {
      // Save to local storage
      localStorage.setItem('registrationData', JSON.stringify(formData));
      
      // Redirect to next page
      // In a real app, you would use React Router for this
      alert("Form submitted successfully! Redirecting to next page...");
      // window.location.href = '/next-page'; 
    }
  };
  
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-900 to-green-900">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Student Registration
      </h1>
      
      <div className="w-full max-w-3xl space-y-12">
        {/* Card 1: Personal Information */}
        <Card 
          ref={cardRefs[0]}
          className={`bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl ml-auto ${currentCard === 0 ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}`}
        >
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Personal Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  className={`bg-white/30 text-white placeholder:text-white/70 ${errors.fullName ? 'border-red-400' : 'border-white/30'}`}
                  placeholder="Enter your full name"
                />
                <ErrorMessage error={errors.fullName} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className={`bg-white/30 text-white placeholder:text-white/70 ${errors.email ? 'border-red-400' : 'border-white/30'}`}
                  placeholder="your.email@example.com"
                />
                <ErrorMessage error={errors.email} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-white">Phone Number (optional)</Label>
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleInputChange} 
                  className={`bg-white/30 text-white placeholder:text-white/70 ${errors.phoneNumber ? 'border-red-400' : 'border-white/30'}`}
                  placeholder="(123) 456-7890"
                />
                <ErrorMessage error={errors.phoneNumber} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleContinue} 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Card 2: School Information */}
        <Card 
          ref={cardRefs[1]}
          className={`bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl mr-auto ${currentCard === 1 ? 'scale-100 opacity-100' : currentCard < 1 ? 'scale-95 opacity-50' : 'scale-95 opacity-70'}`}
        >
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-white">School Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="highSchoolName" className="text-white">High School Name</Label>
                <Input 
                  id="highSchoolName" 
                  name="highSchoolName" 
                  value={formData.highSchoolName} 
                  onChange={handleInputChange} 
                  className={`bg-white/30 text-white placeholder:text-white/70 ${errors.highSchoolName ? 'border-red-400' : 'border-white/30'}`}
                  placeholder="Enter your high school name"
                />
                <ErrorMessage error={errors.highSchoolName} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state" className="text-white">State</Label>
                <Select 
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange('state', value)}
                >
                  <SelectTrigger className={`bg-white/30 text-white ${errors.state ? 'border-red-400' : 'border-white/30'}`}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {states.map((state) => (
                      <SelectItem key={state.abbreviation} value={state.abbreviation}>{state.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage error={errors.state} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white">City</Label>
                <Select 
                  value={formData.city}
                  onValueChange={(value) => handleSelectChange('city', value)}
                  disabled={!formData.state || isLoading}
                >
                  <SelectTrigger className={`bg-white/30 text-white ${errors.city ? 'border-red-400' : 'border-white/30'}`}>
                    <SelectValue placeholder={isLoading ? "Loading cities..." : "Select city"} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage error={errors.city} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="graduationYear" className="text-white">Graduation Year</Label>
                <Select 
                  value={formData.graduationYear}
                  onValueChange={(value) => handleSelectChange('graduationYear', value)}
                >
                  <SelectTrigger className={`bg-white/30 text-white ${errors.graduationYear ? 'border-red-400' : 'border-white/30'}`}>
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage error={errors.graduationYear} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleContinue} 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Card 3: Demographics - Part 1 */}
        <Card 
          ref={cardRefs[2]}
          className={`bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl ml-auto ${currentCard === 2 ? 'scale-100 opacity-100' : currentCard < 2 ? 'scale-95 opacity-50' : 'scale-95 opacity-70'}`}
        >
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Demographics</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white">Gender</Label>
                <RadioGroup 
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="border-white text-white" />
                    <Label htmlFor="male" className="text-white">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="border-white text-white" />
                    <Label htmlFor="female" className="text-white">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nonbinary" id="nonbinary" className="border-white text-white" />
                    <Label htmlFor="nonbinary" className="text-white">Non-binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" className="border-white text-white" />
                    <Label htmlFor="prefer-not-to-say" className="text-white">Prefer not to say</Label>
                  </div>
                </RadioGroup>
                <ErrorMessage error={errors.gender} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="race" className="text-white">Race</Label>
                <Select 
                  value={formData.race}
                  onValueChange={(value) => handleSelectChange('race', value)}
                >
                  <SelectTrigger className={`bg-white/30 text-white ${errors.race ? 'border-red-400' : 'border-white/30'}`}>
                    <SelectValue placeholder="Select race" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="american-indian">American Indian or Alaska Native</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="black">Black or African American</SelectItem>
                    <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                    <SelectItem value="pacific-islander">Native Hawaiian or Pacific Islander</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="multiple">Two or More Races</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage error={errors.race} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleContinue} 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Card 4: First Generation Status */}
        <Card 
          ref={cardRefs[3]}
          className={`bg-white/20 backdrop-blur-md shadow-xl border-0 transition-all duration-300 transform max-w-xl mr-auto ${currentCard === 3 ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}
        >
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Additional Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstGeneration" className="text-white">First Generation College Student</Label>
                <p className="text-white/80 text-sm mb-2">
                  A first-generation college student is defined as a student whose parents did not complete a four-year college degree.
                </p>
                <RadioGroup 
                  value={formData.firstGeneration}
                  onValueChange={(value) => handleSelectChange('firstGeneration', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="first-gen-yes" className="border-white text-white" />
                    <Label htmlFor="first-gen-yes" className="text-white">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="first-gen-no" className="border-white text-white" />
                    <Label htmlFor="first-gen-no" className="text-white">No</Label>
                  </div>
                </RadioGroup>
                <ErrorMessage error={errors.firstGeneration} />
              </div>
              
              {Object.keys(errors).length > 0 && currentCard === 3 && (
                <Alert variant="destructive" className="bg-red-500/20 text-white border-red-400 mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please fix all errors before submitting the form.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleSubmit} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit and Continue <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Progress indicators */}
        <div className="flex justify-center space-x-3 mt-6">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              onClick={() => validateCard(currentCard) && setCurrentCard(index)}
              className={`h-3 w-16 rounded-full transition-all duration-300 cursor-pointer ${
                index <= currentCard ? 'bg-green-500' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import first from '@/assets/firstpic.jpg';
import second from '@/assets/secondpic.jpg';
const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 overflow-hidden pb-0 lg:mt-52">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 z-10 lg:ml-28 lg:pl-10 ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 via-blue-600 to-green-600 bg-clip-text text-transparent leading-tight py-2">
            Find Your Perfect College Match
          </h1>
          <p className="text-lg md:text-xl text-blue-800/80 max-w-lg">
            Discover universities that align with your academic goals, budget, and lifestyle. Our personalized recommendations help you make the best decision for your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-6 rounded-xl text-lg">
              Get Started
            </Button>
            <Button variant="outline" className="border-blue-400 text-blue-700 hover:bg-blue-50 px-8 py-6 rounded-xl text-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Side - Tilted Card with Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center lg:mr-16">
          <div 
            className="relative w-full max-w-md aspect-[4/3] transform rotate-3 transition-all duration-300 ease-in-out hover:rotate-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Card Shadow */}
            <div className="absolute inset-0 bg-blue-900/20 rounded-2xl transform translate-x-4 translate-y-4 blur-xl"></div>
            
            {/* Shadcn Card Component */}
            <Card className="relative h-full w-full overflow-hidden border border-white/20 backdrop-blur-sm bg-white/30 shadow-xl">
              <CardContent className="p-0 h-full">
                {/* Gray Image (Default) */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
  <div className="h-full w-full">
    <img
      src={second}
      alt=""
      className="w-full h-full object-cover filter grayscale"
    />
  </div>
</div>

                
                {/* Colorful Image (On Hover) */}
               <div></div>
                  <div className="h-full w-full bg-gradient-to-br from-blue-400 via-blue-300 to-green-300 flex items-center justify-center">
                    {/* Replace with your actual image */}
                    {/* <div className="text-white text-xl font-medium">College Campus (Colorful)</div>
                     */}
  <img
      src={second}
      alt=""
      className="w-full h-full object-cover "
    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-green-300/20 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default HeroSection;
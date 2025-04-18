import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const ProcessSection = () => {
  const steps = [
    {
      number: 1,
      title: "Profile Creation",
      description: "Create your academic profile by entering your interests, grades, budget, and location preferences to help us understand your needs.",
      alignment: "left"
    },
    {
      number: 2,
      title: "AI-Powered Matching",
      description: "Our intelligent algorithm analyzes thousands of institutions to find the best matches based on your unique profile and preferences.",
      alignment: "right"
    },
    {
      number: 3,
      title: "Personalized Recommendations",
      description: "Receive a curated list of colleges and universities that align perfectly with your academic goals and personal requirements.",
      alignment: "left"
    },
    {
      number: 4,
      title: "Detailed Comparisons",
      description: "Compare institutions side-by-side on factors like tuition, campus life, academic programs, and graduate outcomes.",
      alignment: "right"
    },
    {
      number: 5,
      title: "Application Support",
      description: "Get guidance through the application process with deadline reminders, essay tips, and scholarship opportunities tailored to your chosen schools.",
      alignment: "left"
    }
  ];

  return (
    <div className="w-full py-20 bg-gradient-to-br from-white via-blue-50/70 to-green-50/70">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-36">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 bg-clip-text text-transparent mb-1 p6">
            Your Journey to the Perfect College
          </h2>
          <p className="text-lg text-blue-800/70 max-w-2xl mx-auto">
            Our streamlined process helps you navigate the complex world of college selection with ease and confidence.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-blue-300 to-green-300 transform -translate-x-1/2 hidden md:block"></div>

          {/* Steps listing */}
          <div className="space-y-16 md:space-y-24 relative">
            {steps.map((step) => (
              <StepItem key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepItem = ({ step }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const controls = useAnimation();
  
    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView, controls]);
  
    const variants = {
      hidden: {
        opacity: 0,
        x: step.alignment === "left" ? -100 : 100
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      }
    };
  
    return (
      <div ref={ref} className="w-full">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className={`w-full md:w-1/2 ${
            step.alignment === "left" ? "ml-0 md:pr-16 md:pl-0" : "ml-auto md:pl-16 md:pr-0"
          } flex flex-col md:flex-row items-center gap-6 ${
            step.alignment === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Number Circle */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {step.number}
            </div>
          </div>
  
          {/* Content Rectangle */}
          <div className="flex-grow">
            <div className="bg-white/60 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative">
              {/* Connecting line */}
              <div
                className={`absolute top-1/2 ${
                  step.alignment === "left"
                    ? "left-0 -translate-x-full"
                    : "right-0 translate-x-full"
                } w-6 h-1 bg-gradient-to-r from-blue-400 to-green-400 transform -translate-y-1/2 hidden md:block`}
              ></div>
  
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{step.title}</h3>
              <p className="text-blue-700/80">{step.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
  
  

export default ProcessSection;
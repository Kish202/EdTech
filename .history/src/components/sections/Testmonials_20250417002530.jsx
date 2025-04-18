import { useRef } from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Note: You'll need to add these CSS imports at the top of your file or in your global CSS:
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const TestimonialSection = () => {
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Emma Johnson",
      role: "Pre-Med Student",
      image: "/api/placeholder/150/150",
      rating: 5,
      text: "This platform helped me find a college with the perfect biology program for my pre-med journey. I got accepted to my dream school!"
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Computer Science Major",
      image: "/api/placeholder/150/150",
      rating: 5,
      text: "The personalized recommendations were spot on! I found a university with the exact specialization in AI that I was looking for."
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      role: "Business School Student",
      image: "/api/placeholder/150/150",
      rating: 4,
      text: "Thanks to this site, I discovered affordable business schools with great internship opportunities that I hadn't even considered before."
    },
    {
      id: 4,
      name: "Jamal Wilson",
      role: "Engineering Student",
      image: "/api/placeholder/150/150",
      rating: 5,
      text: "The detailed comparisons between engineering programs saved me countless hours of research. Now I'm at my perfect fit university!"
    },
    {
      id: 5,
      name: "Aisha Patel",
      role: "Fine Arts Major",
      image: "/api/placeholder/150/150",
      rating: 5,
      text: "Finding arts programs that matched my specific interests was difficult until I used this site. The recommendations were exactly what I needed."
    }
  ];

  // Generate star ratings
  const renderRating = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    customPaging: (i) => (
      <div
        className="w-2.5 h-2.5 rounded-full bg-blue-200 mx-1 hover:bg-blue-300 transition-colors"
        style={{ opacity: 1 }}
      />
    ),
    appendDots: dots => (
      <div>
        <ul className="flex justify-center mt-6 gap-2"> {dots} </ul>
      </div>
    )
  };

  return (
    <div className="w-full py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className=" inline-block text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent mb-6  border-b-2 border-transparent hover:border-b-2 border-blue-700  ">
            Student Success Stories
          </h2>
          <p className="text-lg text-blue-700/70 max-w-2xl mx-auto">
            Hear from students who found their perfect academic fit through our platform.
          </p>
        </div>

        {/* Custom navigation arrows */}
        <div className="relative">
          <button 
            onClick={() => sliderRef.current.slickPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 mr-2  shadow-md hover:bg-blue-50 transition-colors -ml-2 md:ml-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-blue-700" />
          </button>
          
          <button 
            onClick={() => sliderRef.current.slickNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1  ml-2 shadow-md hover:bg-blue-50 transition-colors -mr-2 md:mr-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-blue-700" />
          </button>

          {/* Testimonial slider */}
          <Slider ref={sliderRef} {...settings} className="testimonial-slider">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4">
                <div className="h-full transform transition-all p-3 duration-300 hover:scale-105 hover:rotate-1 perspective-1000">
                  <Card className="h-full bg-white/70 backdrop-blur-sm border border-blue-100/50 shadow-lg transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-14 w-14 border-2 border-blue-100">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-green-400 text-white">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-blue-800">{testimonial.name}</h3>
                          <p className="text-sm text-blue-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-blue-700/80 mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        {renderRating(testimonial.rating)}
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 py-4 bg-gradient-to-r from-blue-50/50 to-green-50/50 border-t border-blue-100/30">
                      <p className="text-xs text-blue-500/70 italic">Enrolled Fall 2024</p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
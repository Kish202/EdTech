import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedinIcon, 
  YoutubeIcon,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      // In a real application, you would send this to your backend
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-white via-blue-50 to-green-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 opacity-70"></div>
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute -top-24 right-32 w-48 h-48 rounded-full bg-green-500/10 blur-3xl"></div>
      
      {/* Back to top button */}
      <div className="container mx-auto px-4">
        <div className="relative pt-8 pb-4 flex justify-center">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors bg-white/80 px-4 py-2 rounded-full shadow-md hover:shadow-lg border border-blue-100"
          >
            <ChevronUp size={18} />
            <span className="font-medium">Back to top</span>
          </button>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 pt-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
              EduMatch
            </h3>
            <p className="text-blue-700/70 mb-6">
              Connecting students with their perfect academic path. We help you find colleges and universities that match your interests, goals, and budget.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <LinkedinIcon size={20} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links - Visible on desktop, accordion on mobile */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-blue-600 hover:text-blue-800 transition-colors">About Us</Link></li>
              <li><Link href="/colleges" className="text-blue-600 hover:text-blue-800 transition-colors">Browse Colleges</Link></li>
              <li><Link href="/scholarships" className="text-blue-600 hover:text-blue-800 transition-colors">Scholarships</Link></li>
              <li><Link href="/resources" className="text-blue-600 hover:text-blue-800 transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">Contact Us</Link></li>
              <li><Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          {/* Column 3 - Contact Information - Visible on desktop, accordion on mobile */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-blue-700/70">123 Education Lane, Learning City, ED 54321</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-600 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-600 flex-shrink-0" />
                <a href="mailto:info@edumatch.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                  info@edumatch.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-800">Stay Updated</h3>
            <p className="text-blue-700/70 mb-4">
              Subscribe to our newsletter for the latest educational resources, scholarship opportunities, and college application tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/80 border-blue-100 focus:border-blue-300"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white transition-all duration-300"
              >
                Subscribe
                <ArrowRight size={16} className="ml-2" />
              </Button>
              {subscribed && (
                <p className="text-green-600 text-sm">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>
        
        {/* Mobile Accordions - Only visible on mobile */}
        <div className="md:hidden mt-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="quick-links">
              <AccordionTrigger className="text-blue-800 font-semibold">Quick Links</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2">
                  <li><Link href="/about" className="text-blue-600 hover:text-blue-800 transition-colors">About Us</Link></li>
                  <li><Link href="/colleges" className="text-blue-600 hover:text-blue-800 transition-colors">Browse Colleges</Link></li>
                  <li><Link href="/scholarships" className="text-blue-600 hover:text-blue-800 transition-colors">Scholarships</Link></li>
                  <li><Link href="/resources" className="text-blue-600 hover:text-blue-800 transition-colors">Resources</Link></li>
                  <li><Link href="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">Contact Us</Link></li>
                  <li><Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors">Blog</Link></li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="contact">
              <AccordionTrigger className="text-blue-800 font-semibold">Contact Us</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 py-2">
                  <li className="flex items-start gap-2">
                    <MapPin size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-blue-700/70">123 Education Lane, Learning City, ED 54321</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={18} className="text-blue-600 flex-shrink-0" />
                    <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800 transition-colors">
                      (555) 123-4567
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={18} className="text-blue-600 flex-shrink-0" />
                    <a href="mailto:info@edumatch.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                      info@edumatch.com
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <Separator className="my-8 bg-blue-100/50" />
        
        {/* Bottom section with copyright and links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-700/70 text-sm text-center md:text-left">
            © {currentYear} EduMatch. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-600 hover:text-blue-800 transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-blue-600 hover:text-blue-800 transition-colors">
              Accessibility
            </Link>
            <Link href="/sitemap" className="text-blue-600 hover:text-blue-800 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200/50 to-green-100/50 p-4">
      <div
        className={cn(
          'w-full max-w-md p-6 rounded-2xl',
          'bg-green-600/20 backdrop-blur-xl border border-green-300 shadow-lg'
        )}
      >
        <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
          Student Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-b-700/90">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="bg-white/5 border-white/20 text-blue-950/90 placeholder:text-blue-500/50"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-blue-950">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-white/5 border-white/20 text-blue-950 placeholder:text-blue-500/50"
              required
            />
          </div>
          <div>
            <Label htmlFor="grade" className="text-b-700/90">
              Current Grade
            </Label>
            <Input
              id="grade"
              type="text"
              placeholder="e.g., 11th Grade"
              className="bg-white/5 border-white/20 text-b-950 placeholder:text-blue-500/50"
              required
            />
          </div>
          <div>
            <Label htmlFor="interests" className="text-b-700/90">
              Academic Interests
            </Label>
            <Input
              id="interests"
              type="text"
              placeholder="e.g., Computer Science, Biology"
              className="bg-white/5 border-white/20 text-b-700/90 placeholder:text-white/50"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-b-700/90">
              Preferred College Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., California, New York"
              className="bg-white/5 border-white/20 text-b-700/90 placeholder:text-blue-500/50"
            />
          </div>
          <Button
            type="submit"
            className={cn(
              'w-full bg-gradient-to-r from-blue-500 to-green-500 text-white',
              'hover:from-blue-600 hover:to-green-600',
              'border border-white/20 rounded-xl py-2'
            )}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
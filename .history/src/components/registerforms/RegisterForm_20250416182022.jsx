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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-emerald-200 p-4">
      <div
        className={cn(
          'w-full max-w-md p-6 rounded-2xl',
          'bg-green-50/40 backdrop-blur-md border border-green-200/60 shadow-xl'
        )}
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Student Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-green-800 font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="bg-green-50/70 border-green-300 text-green-900 placeholder:text-green-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-green-800 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-green-50/70 border-green-300 text-green-900 placeholder:text-green-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="grade" className="text-green-800 font-medium">
              Current Grade
            </Label>
            <Input
              id="grade"
              type="text"
              placeholder="e.g., 11th Grade"
              className="bg-green-50/70 border-green-300 text-green-900 placeholder:text-green-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="interests" className="text-green-800 font-medium">
              Academic Interests
            </Label>
            <Input
              id="interests"
              type="text"
              placeholder="e.g., Computer Science, Biology"
              className="bg-green-50/70 border-green-300 text-green-900 placeholder:text-green-500"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-green-800 font-medium">
              Preferred College Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., California, New York"
              className="bg-green-50/70 border-green-300 text-green-900 placeholder:text-green-500"
            />
          </div>
          <Button
            type="submit"
            className={cn(
              'w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium',
              'hover:from-green-600 hover:to-emerald-700',
              'border border-green-400/20 rounded-xl py-2 shadow-md'
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
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/Bright Blue.png'; // Update with your logo path
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Colleges', path: '/colleges' },
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
  ];
const handleSubmit = () => {

}
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 fixed top-0 z-50 ">
      <nav
        className={cn(
          'flex items-center justify-between mx-auto max-w-7xl p-3 rounded-full',
          'bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg',
          'transition-all duration-300'
        )}
      >
        {/* Logo - Left Side */}
        <div className="flex items-center p-2 h-[50px]">
          <Link to="/">
            <img
              src={logo}
              alt="College Finder Logo"
              className="h-full w-auto sm:h-24"
            />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden ">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-blue-950 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Menu Items - Center (Hidden on Mobile) */}
        <div
          className={cn(
            'lg:flex items-center gap-4 hidden',
            'bg-white/5 backdrop-blur-sm rounded-xl px-6 py-2 border border-white/10'
          )}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'text-green-500/90 px-3 py-2 rounded-lg text-sm font-medium',
                  'hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-green-500/20',
                  'transition-all duration-200',
                   'bg-gradient-to-r from-blue-500/30 to-green-500/30' 
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Register Button - Right Side */}
        <div className="hidden lg:block p-3">
         
            <Button onClick={handleSubmit()}
              className={cn(
                'bg-gradient-to-r from-blue-500 to-green-500 text-white',
                'hover:from-blue-600 hover:to-green-600',
                'border border-white/20 rounded-xl px-6 py-2'
              )}
            >
              Register
            </Button>
         
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={cn(
              'lg:hidden absolute top-20 left-4 right-4 z-50',
              'bg-white backdrop-blur-lg border border-white/20 rounded-xl p-4',
              'flex flex-col gap-2'
            )}
          >
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'text-blue-950/90 px-3 py-2 rounded-lg text-sm font-medium',
                    'hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-green-500/20',
                     'bg-gradient-to-r from-blue-500/30 to-green-500/30' 
                  )}
              >
                {item.name}
              </NavLink>
            ))}
            {/* <Link to="/register" onClick={() => setIsMenuOpen(false)}> */}
              <Button onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'bg-gradient-to-r from-blue-500 to-green-500 text-white w-full',
                  'hover:from-blue-600 hover:to-green-600',
                  'border border-white/20 rounded-xl py-2'
                )}
              >
                Register
              </Button>
            {/* </Link> */}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
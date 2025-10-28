import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, House } from 'lucide-react';
import logo from '@/assets/logo-white.png';


const Blogbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0118]/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className='mx-auto px-4'>
            
          <div className='flex items-center justify-between h-16'>
            
            <div className='hidden md:flex items-center ml-6'>
              <Button
                variant='ghost'
                className='text-gray-300 hover:text-white transition-colors hover:bg-purple-500/20'
                asChild
              >
                <Link to={'/'}>
                  <House className='w-4 h-4 mr-2' />
                  Home
                </Link>
              </Button>
            </div>
              <div className="barlogo">
              <div className='fixed top-10 left-0 right-0 z-50 transition-all duration-300'> 
                {/* Container for the logo */}
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' >
                  {/* Logo element */}
                  <Link to={'/'}>
                    <img src= '../../assets/logo-white.png' alt='Logo' style={{height: '50px'}} />
                  </Link>
                </div>
              </div>
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <Button
                variant='ghost'
                className='text-gray-300 hover:text-white transition-colors hover:bg-purple-500/20'
                asChild
              >
                <Link to={'/login'}>
                  <LogIn className='w-4 h-4 mr-2' />
                  Login
                </Link>
              </Button>
              <Button className='text-gray-300 hover:text-white transition-colors' asChild>
                <Link to='/register'>
                  <UserPlus className='w-4 h-4 mr-2' />
                  Sign Up
                </Link>
              </Button>
            </div>

            <div className='md:hidden flex items-center'>
              <Button
                variant='ghost'
                size='icon'
                className='text-white'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <Menu className='h-6 w-6' />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-40 bg-[#0A0118]/95 backdrop-blur-lg pt-16'
        >
          <div className='container mx-auto px-4 py-6 flex flex-col space-y-6'>
            <Link
              to='/'
              className='text-white text-xl font-medium py-3 border-b border-purple-500/20'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to='/login'
              className='text-white text-xl font-medium py-3 border-b border-purple-500/20'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to='/register'
              className='text-white text-xl font-medium py-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Blogbar;

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, CircleCheckIcon, CircleHelpIcon, Menu, User, X, Settings, LogOut, FolderOpen  } from 'lucide-react';
import { CircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo-white.svg';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/userInfoSlice';
import { authService } from '@/shared/services/auth.service';

export default function AuthenticatedNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [position, setPosition] = useState<string>('[&_div.absolute]:right-auto [&_div.absolute]:left-0');
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const spaceOnLeft = menuRect.left;
      const spaceOnRight = window.innerWidth - menuRect.right;

      // Set position based on available space
      if (spaceOnLeft > spaceOnRight) {
        setPosition('[&_div.absolute]:left-auto [&_div.absolute]:right-0');
      } else {
        setPosition('[&_div.absolute]:right-auto [&_div.absolute]:left-0');
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      // First dispatch logout to clear Redux state
      dispatch(logout());
      // Then clear storage
      await authService.logout();
      // Finally navigate
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-purple-500/20 ${
          isScrolled
            ? 'bg-[#1A0B2E]/90 backdrop-blur-lg shadow-lg'
            : 'bg-[#1A0B2E]/70 backdrop-blur-sm'
        }`}
      >
        <div className='mx-auto px-12'>
          <div className='flex items-center justify-between h-20'>
            <div className='hidden md:flex items-center h-full ml-6 cursor-pointer'>
              <Link to={'/projects'}>
                <img src={logo} alt="logo" className='w-16 h-16 mr-2 py-2 ' />
              </Link>
            </div>

            <div className='hidden md:flex items-center space-x-4'>
            <Button
                variant='ghost'
                className='text-gray-300 hover:text-white transition-colors hover:bg-purple-500/20'
                asChild
              >
                <Link to='/blogs'>
                  <BookOpen className='w-4 h-4 mr-2' />
                  Blogs
                </Link>
              </Button>
              <Button
                variant='ghost'
                className='text-gray-300 hover:text-white transition-colors hover:bg-purple-500/20'
                asChild
              >
                <Link to='/projects'>
                  <FolderOpen className='w-4 h-4 mr-2' />
                  Projects
                </Link>
              </Button>
              <NavigationMenu className={position} ref={menuRef}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-purple-500/20">
                      <User className='w-4 h-4 mr-2' />
                      Account
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-2 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-purple-500/20 rounded-md">
                              <User className="w-4 h-4" />
                              Profile
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-purple-500/20 rounded-md">
                              <Settings className="w-4 h-4" />
                              Settings
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <button 
                              onClick={handleLogout}
                              className="flex items-center gap-2 p-2 hover:bg-purple-500/20 rounded-md text-red-400 hover:text-red-300 w-full text-left"
                            >
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
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
              to='/projects'
              className='text-white text-xl font-medium py-3 border-b border-purple-500/20'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to='/projects'
              className='text-white text-xl font-medium py-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to='/profile'
              className='text-white text-xl font-medium py-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className='text-white text-xl font-medium py-3'
            >
              Logout
            </button> 
          </div>
        </motion.div>
      )}
    </>
  );
};


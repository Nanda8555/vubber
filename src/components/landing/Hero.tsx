import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Check,
  Loader2,
  Globe2,
  Users,
  Star,
  ArrowRight,
  Zap,
  Languages,
  Video
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo-white.svg';
import LandingCarousel from './LandingCarousel';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(
        'https://api.getwaitlist.com/api/v1/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, waitlist_id: 25439, referral_code: '' })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      await response.json();
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
      setStatus('error');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className='relative min-h-screen overflow-hidden bg-vubber-background'>
      {/* Animated background elements */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10' />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

        {/* Animated gradient orbs */}
        <motion.div
          className='absolute top-20 left-20 w-72 h-72 bg-vubber-overlay-purple rounded-full blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className='absolute bottom-20 right-20 w-96 h-96 bg-vubber-overlay-blue rounded-full blur-3xl'
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </div>

      {/* Centered Logo at Top */}
      <div className='pt-12 text-center'>
        <motion.div
          className='mb-8'
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className='relative w-24 h-24 mx-auto'>
            <motion.img
              src={logo}
              alt='Vubber Logo'
              className='w-full h-full'
              animate={{
                y: [0, -8, 0],
                filter: [
                  'drop-shadow(0 0 0px rgba(168, 85, 247, 0.8))',
                  'drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))',
                  'drop-shadow(0 0 0px rgba(168, 85, 247, 0.8))'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          className='grid lg:grid-cols-12 gap-12 items-center'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Left column - Main content */}
          <div className='lg:col-span-7 text-left space-y-8'>
            <motion.div variants={itemVariants} className='inline-block'>
              <span className='px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium'>
                Limited Early Access
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className='text-5xl md:text-7xl font-bold leading-tight'
            >
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-vubber-gradient-from via-vubber-gradient-via to-vubber-gradient-to'>
                Transform Your Content
                <br />
                Into Any Language
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className='text-vubber-text-secondary text-xl leading-relaxed max-w-xl'
            >
              Break language barriers with AI-powered video translation. Perfect
              lip-sync, natural voice cloning, and seamless localization - all
              in one platform.
            </motion.p>

            <motion.div variants={itemVariants} className='space-y-6'>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col sm:flex-row gap-4 max-w-md'
              >
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='h-14 bg-white/5 border-vubber-border focus:border-vubber-text-accent text-vubber-text-primary placeholder:text-vubber-text-secondary text-lg'
                  required
                  disabled={status === 'loading'}
                />
                <Button
                  type='submit'
                  disabled={status === 'loading'}
                  className='h-14 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium text-lg rounded-md transition-all duration-200'
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </>
                  )}
                </Button>
              </form>

              {/* Social proof with inline SVG avatars */}
              <div className='flex items-center gap-4 text-vubber-text-secondary'>
                <div className='flex -space-x-2'>
                  {/* SVG-based avatars */}
                  <div className='w-8 h-8 rounded-full ring-2 ring-vubber-background overflow-hidden flex items-center justify-center relative'>
                    <div className='absolute inset-0 bg-gradient-to-r from-vubber-gradient-from to-vubber-gradient-to'></div>
                    <svg
                      className='w-5 h-5 text-vubber-text-primary z-10 relative'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <div className='w-8 h-8 rounded-full ring-2 ring-vubber-background overflow-hidden flex items-center justify-center relative'>
                    <div className='absolute inset-0 bg-gradient-to-r from-vubber-gradient-to to-vubber-gradient-from'></div>
                    <svg
                      className='w-5 h-5 text-vubber-text-primary z-10 relative'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <div className='w-8 h-8 rounded-full ring-2 ring-vubber-background overflow-hidden flex items-center justify-center relative'>
                    <div className='absolute inset-0 bg-gradient-to-r from-vubber-gradient-from to-vubber-gradient-to'></div>
                    <svg
                      className='w-5 h-5 text-vubber-text-primary z-10 relative'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <div className='w-8 h-8 rounded-full bg-vubber-text-accent ring-2 ring-vubber-background flex items-center justify-center text-xs font-medium text-vubber-text-primary'>
                    +246
                  </div>
                </div>
                <p className='text-sm'>
                  <span className='font-semibold text-vubber-text-primary'>
                    250+ creators
                  </span>{' '}
                  joined in the last 24 hours
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column - Feature highlights */}
          <motion.div
            variants={itemVariants}
            className='lg:col-span-5 relative'
          >
            <div className='grid grid-cols-2 gap-6'>
              {[
                {
                  icon: Globe2,
                  title: '40+ Languages',
                  desc: 'Localize content for international audiences',
                  delay: 0
                },
                {
                  icon: Users,
                  title: 'Natural Voice Cloning',
                  desc: 'Preserve your authentic voice across languages',
                  delay: 0.2
                },
                {
                  icon: Star,
                  title: 'Perfect Lip Sync',
                  desc: 'AI ensures perfect mouth movements match audio',
                  delay: 0.4
                },
                {
                  icon: Zap,
                  title: 'Quick Processing',
                  desc: 'Get results faster than traditional dubbing',
                  delay: 0.6
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.2,
                    duration: 0.8,
                    ease: 'easeOut'
                  }}
                >
                  <div className='bg-white/5 backdrop-blur-xl border border-vubber-border rounded-xl p-6 shadow-xl hover:shadow-vubber-text-accent/10 transition-all duration-300 hover:-translate-y-1 h-full'>
                    <feature.icon className='w-8 h-8 text-vubber-text-accent mb-4' />
                    <h3 className='text-xl font-semibold text-vubber-text-primary mb-2'>
                      {feature.title}
                    </h3>
                    <p className='text-vubber-text-secondary'>{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Status messages */}
        {status === 'success' && (
          <motion.div
            className='mt-8'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Alert className='bg-green-500/10 border-green-500/20 text-green-300 max-w-md backdrop-blur-sm'>
              <Check className='h-4 w-4' />
              <AlertDescription>
                You're on the list! We'll notify you when we launch.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            className='mt-8  mb-8'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Alert className='bg-red-500/10 border-red-500/20 text-red-300 max-w-md backdrop-blur-sm'>
              <AlertDescription>
                Oops! Something went wrong. Please try again.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Mobile App Availability */}
        <motion.div
          className='mt-24 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className='inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6'>
            Coming to Mobile
          </div>

          <h2 className='text-3xl md:text-4xl font-bold text-vubber-text-primary'>
            Available Soon on iOS and Android
          </h2>
        </motion.div>
        {/* Features Section */}
        <motion.div
          className='mt-24 pt-16 border-t border-purple-500/10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          id='features'
        >
        {/* add icon and placeholder pictures */}
        <div className=' gap-12'>
          <div> 
            <h2 className='text-3xl font-bold text-white mb-6'>
              Features
            </h2>
            <p className='text-vubber-text-secondary mb-6'>
              Explore Vubber's features and see why you will love it.
            </p>
          </div>

            {/* features content, text can be changed */}
            <LandingCarousel></LandingCarousel>
          </div>
        </motion.div>
        {/* Blog Section */}
        <motion.div
          className='mt-28 text-center pt-16 border-t border-vubber-border'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <h2 className='text-3xl md:text-4xl font-bold text-vubber-text-primary mb-6'>
            Check Out Our Blog
          </h2>

          <p className='text-vubber-text-secondary max-w-2xl mx-auto mb-8'>
            Stay updated with the latest news, tips, and insights about video
            translation and localization.
          </p>
          
          <Link to={'/blogs'}>
            <Button
            className='px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium text-lg rounded-md transition-all duration-200'
            >
              Read Our Blog <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </Link>
        </motion.div>
        {/* About Section */}
        <motion.div
          className='mt-24 pt-16 border-t border-vubber-border'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          id='about'
        >
          <h2 className='text-3xl font-bold text-vubber-text-primary mb-6'>About Us</h2>

          <div className='grid md:grid-cols-2 gap-12'>
            <div>
              <p className='text-vubber-text-secondary mb-6'>
                Vubber is on a mission to eliminate language barriers in video
                content, empowering creators to reach global audiences
                seamlessly. Our AI-powered platform enables you to localize your
                videos with perfect lip sync and natural voice cloning.
              </p>
              <p className='text-vubber-text-secondary'>
                Founded by a team of machine learning experts and content
                creators, we understand both the technical challenges and
                creative needs in video translation. Vubber brings together
                cutting-edge AI with an intuitive interface designed
                specifically for content creators.
              </p>
            </div>

            <div className='space-y-6'>
              <div className='bg-white/5 backdrop-blur-xl border border-vubber-border rounded-xl p-6'>
                <h3 className='text-xl font-semibold text-vubber-text-primary mb-2'>
                  Our Vision
                </h3>
                <p className='text-vubber-text-secondary'>
                  We envision a world where video content can be enjoyed by
                  anyone, anywhere, in their native language without
                  compromising the creator's original style and intent.
                </p>
              </div>

              <div className='bg-white/5 backdrop-blur-xl border border-vubber-border rounded-xl p-6'>
                <h3 className='text-xl font-semibold text-vubber-text-primary mb-2'>
                  Join Our Journey
                </h3>
                <p className='text-vubber-text-secondary'>
                  We're just getting started. Join our waitlist today to be
                  among the first to experience the future of video translation
                  and help shape the platform.
                </p>
              </div>
            </div>
          </div>
        </motion.div>


        {/* Footer */}
        <footer className='mt-24 pt-12 pb-8 px-4 border-t border-vubber-border text-vubber-text-secondary'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-vubber-text-primary font-medium mb-4'>Vubber</h3>
              <p className='text-sm'>
                Transform your content for global audiences with AI-powered
                video translation.
              </p>
            </div>

            <div>
              <h3 className='text-white font-medium mb-4'>Product</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a
                    href='#features'
                    className='hover:text-purple-400 transition-colors'
                  >
                    Features
                    
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-white font-medium mb-4'>Company</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a
                    href='#about'
                    className='hover:text-purple-400 transition-colors'
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-white font-medium mb-4'>Connect</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a href="mailto:support@vubber.app">
                    support@vubber.app
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-12 pt-6 border-t border-vubber-border flex flex-col md:flex-row justify-between items-center'>
            <p className='text-sm'>
              © {new Date().getFullYear()} Vubber. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Hero;

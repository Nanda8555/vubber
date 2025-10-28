import Hero from '@/components/landing/Hero';
import LandingLayout from '@/shared/layout/LandingLayout';
import LandingNavbar from '@/shared/layout/LandingNavbar';

const LandingPage = () => {
  return (
    <>
      <LandingLayout>
        <Hero />
      </LandingLayout>
    </>
  );
};

export default LandingPage;

import { ReactNode } from 'react';
import logo from '@/assets/logo-white.svg';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src={logo} alt="Vubber" className="h-20 mx-auto mb-4" />
        </div>
        {children}
      </div>
    </div>
  );
}
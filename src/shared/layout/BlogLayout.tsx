import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import AuthenticatedNavbar from './AuthenticatedNavbar';
import LandingNavbar from './LandingNavbar';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const isAuthenticated = useSelector((state: any) => state.userInfo.isAuthenticated);

  return (
    <div className="min-h-screen bg-background bg-gray-900">
      {isAuthenticated ? <AuthenticatedNavbar /> : <LandingNavbar currentPage="Blogs" />}
      <main>{children}</main>
    </div>
  );
} 
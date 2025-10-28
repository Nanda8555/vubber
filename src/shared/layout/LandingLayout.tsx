import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-background bg-gray-900">
      <LandingNavbar currentPage="Home" />
      <main>{children}</main>
    </div>
  );
}

import { ReactNode } from "react";
import AuthenticatedNavbar from "./AuthenticatedNavbar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0118] h-full relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 z-0" />
      <div className="bg-center opacity-20" />
      <AuthenticatedNavbar />
      <main className="container mx-auto px-4 py-8 mt-20 relative z-1 h-full">{children}</main>
    </div>
  );
}

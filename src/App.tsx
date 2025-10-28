import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Landing from "./pages/landing/landing";
import ProjectsLayout from "./pages/projects/projects-layout";
import ProjectsIndex from "./pages/projects/projects-index";
import Profile from "./pages/profile/profile";
import Settings from "./pages/settings/settings";
import { withAuth, withPublicAuth } from "./utils/protected-routes";
import Blogs from "./pages/blogs/blogs";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Routes */}
            <Route path="/" Component={withPublicAuth(Landing)} />

            {/* Auth Routes */}
            <Route path="/login" Component={withPublicAuth(Login)} />
            <Route path="/register" Component={withPublicAuth(Register)} />

            {/* Dashboard Routes */}
            <Route path="/projects" Component={withAuth(ProjectsLayout)}>
              {/* <Route index Component={ProjectsIndex} /> */}
              <Route path="new" Component={ProjectsIndex} />
            </Route>

            <Route path="/profile" Component={withAuth(Profile)} />
            <Route path="/settings" Component={withAuth(Settings)} />

            {/* Project Routes */}

            {/* Blog Routes */}
            <Route path="/blogs" Component={(Blogs)} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

import ProjectCard from "@/components/projects/projectCard";
import { Button } from "@/components/ui/button";
import projects from "@/constants/projects";
import AuthenticatedLayout from "@/shared/layout/AuthenticatedLayout";
import { IProject } from "@/types/projects";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import NewProjectPopup from "@/components/projects/NewProjectPopup";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectsLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if URL contains /new and open dialog automatically
  useEffect(() => {
    if (location.pathname === "/projects/new") {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [location.pathname]);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      // Update URL when dialog opens
      navigate("/projects/new", { replace: true });
    } else {
      // Update URL when dialog closes
      navigate("/projects", { replace: true });
    }
  };

  return (
    <AuthenticatedLayout>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">My Projects</h1>
            <NewProjectPopup onOpenChange={handleDialogOpenChange} open={isDialogOpen}>
              <Button className="text-gray-100">
                <Plus className="w-4 h-4" strokeWidth={4} /> New Project
              </Button>
            </NewProjectPopup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project: IProject) => (
              <ProjectCard key={project.SK} project={project} />
            ))}
          </div>
        </div>
      </motion.div>
      {/* <Outlet /> */}
    </AuthenticatedLayout>
  );
} 
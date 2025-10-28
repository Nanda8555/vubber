import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProject } from "@/types/projects";
import { BadgeCheck, CircleEllipsis } from "lucide-react";

interface ProjectCardProps {
  project: IProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {


  return (
    <Card className="bg-primary/10   border border-vubber-border hover:bg-gray-900/70 transition-all duration-300 h-56 cursor-pointer">
      <CardHeader className="flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-4 h-full">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-vubber-text-primary">
                {project.status !== "active" ? (
                  <div className="flex items-center gap-2">
                    <BadgeCheck
                      className="w-4 h-4 text-green-500"
                      strokeWidth={3}
                    />
                    <span className="text-green-500 font-medium">
                      Completed
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CircleEllipsis
                      className="w-4 h-4 text-yellow-500"
                      strokeWidth={3}
                    />
                    <span className="text-yellow-500 font-medium">
                      In Progress
                    </span>
                  </div>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-vubber-text-primary">
                {project.createdAt
                  ? new Date(project.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

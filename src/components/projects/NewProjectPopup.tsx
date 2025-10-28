import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui";
import { X, Asterisk } from "lucide-react";
import { projectService } from "@/shared/services/project.service";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import VideoUpload from "@/components/projects/VideoUpload";
import ProjectSuccessPopup from "@/components/projects/ProjectSuccessPopup";

interface FormData {
    projectName: string
    projectDescription: string
    videos: File[]
}

interface NewProjectPopupProps {
    children: React.ReactNode;
    onSuccess?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function NewProjectPopup({ children, onSuccess, open, onOpenChange }: NewProjectPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        projectName: "",
        projectDescription: "",
        videos: [],
    })
    const [videoThumbnails, setVideoThumbnails] = useState<{ [key: string]: string }>({})
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const token = useSelector((state: RootState) => state.userInfo.token);
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing


        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }))
        }
        if (isSuccess) {
            setIsSuccess(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validate form
        const newErrors: { [key: string]: string } = {}
        
        if (!formData.projectName.trim()) {
            newErrors.projectName = "Project name is required"
        }
        
        setErrors(newErrors)
        
        // Don't submit if there are errors
        if (Object.keys(newErrors).length > 0) {
            return
        }
        
        setIsSubmitting(true)

        const apiData = {
            projectName: formData.projectName.trim(),
            projectDescription: formData.projectDescription.trim()
        }
        
        try {
            await projectService.createProject(apiData, token)
            setIsSuccess(true)
            onSuccess?.()
        } catch (error) {
            console.error('Failed to create project:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const setVideosAndProjectName = (videos: File[]) => {
        setFormData((prev) => ({ ...prev, videos }))
        if (formData.projectName.length === 0) {
            setFormData((prev) => ({ ...prev, ["projectName"]: videos[0].name.split(".")[0] }))
        }
    }

    const handleOpenChange = (open: boolean) => {
        if (!open && !isSubmitting) {
            setIsOpen(false);
            onOpenChange?.(false);
            setFormData({
                projectName: "",
                projectDescription: "",
                videos: [],
            });
            setVideoThumbnails({});
            setErrors({});
            setIsSuccess(false);
        } else if (open) {
            setIsOpen(true);
            onOpenChange?.(true);
        }
    };

    // Use external open state if provided, otherwise use internal state
    const dialogOpen = open !== undefined ? open : isOpen;

    if (isSuccess) {
        return (
            <ProjectSuccessPopup onClose={() => handleOpenChange(false)} />
        )
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent 
                className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-vubber-border bg-vubber-background/80 shadow-none [&>button]:hidden"
            >
                <DialogTitle className="sr-only">Create New Project</DialogTitle>
                <DialogDescription className="sr-only">Form to create a new project with name, description, and video uploads</DialogDescription>
                <Card className="w-full shadow-lg bg-gradient-to-r from-[#401e46]/50 via-[#461b4a]/40 to-[#461b4a]/30 backdrop-blur-sm border border-vubber-border text-vubber-text-primary rounded-lg">
                    <CardHeader className="text-center pb-4 relative">
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-vubber-overlay-purple transition-colors"
                            aria-label="Close"
                            onClick={() => handleOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            <X className="w-5 h-5 text-vubber-text-secondary" />
                        </button>
                        <CardTitle className="text-2xl font-light text-vubber-text-primary">Create New Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="projectName" className="text-sm font-medium text-vubber-text-primary flex items-center gap-1">
                                    Project Name <Asterisk className="w-3 h-3 text-red-500" />
                                </Label>              
                                <Input
                                    id="projectName"
                                    type="text"
                                    placeholder="Enter your project name"
                                    value={formData.projectName}
                                    onChange={(e) => handleInputChange("projectName", e.target.value)}
                                    className="border-vubber-border focus:border-vubber-text-accent focus:ring-vubber-text-accent bg-vubber-background text-vubber-text-primary placeholder:text-vubber-text-secondary"
                                />
                                {errors.projectName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="projectDescription" className="text-sm font-medium text-vubber-text-primary">
                                    Project Description
                                </Label>
                                <Textarea
                                    id="projectDescription"
                                    placeholder="Describe your project..."
                                    value={formData.projectDescription}
                                    onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                                    className="min-h-[100px] resize-none border-vubber-border focus:border-vubber-text-accent focus:ring-vubber-text-accent bg-vubber-background text-vubber-text-primary placeholder:text-vubber-text-secondary"
                                />
                                <div className="flex justify-between text-xs text-vubber-text-secondary">
                                    <span>{formData.projectDescription.length}/1000 characters</span>
                                </div>
                            </div>

                            <VideoUpload
                                value={formData.videos}
                                onChange={setVideosAndProjectName}
                                thumbnails={videoThumbnails}
                                setThumbnails={setVideoThumbnails}
                            />

                            <div className="flex justify-center pt-4 pb-4">
                                <Button
                                    type="submit"
                                    className="bg-vubber-text-accent hover:bg-vubber-text-accent/80 text-vubber-text-primary shadow-lg transition-all duration-200 font-medium"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating Project..." : "Create Project"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
} 
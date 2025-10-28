import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { X, CheckCircle } from "lucide-react";

interface ProjectSuccessPopupProps {
  onClose: () => void;
  // Optionally, you can add a resetForm prop if you want to show a reset button
  // onReset?: () => void;
}

const ProjectSuccessPopup: React.FC<ProjectSuccessPopupProps> = ({ onClose }) => {
  // Handler to stop propagation when clicking inside the card
  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      onTouchStart={onClose}
      role="presentation"
    >
      <Card
        className="w-full max-w-md shadow-lg border bg-vubber-background/95 backdrop-blur-md border-vubber-border text-vubber-text-primary relative z-10 rounded-lg"
        onClick={stopPropagation}
        onTouchStart={stopPropagation}
      >
        {/* X button in top right */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-vubber-overlay-purple transition-colors"
          aria-label="Close"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-vubber-text-secondary" />
        </button>
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-vubber-text-accent/10 p-4">
              <CheckCircle className="w-10 h-10 text-vubber-text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-vubber-text-primary">Project Created!</h2>
            <p className="text-vubber-text-secondary text-center">
              Your project has been successfully created and your videos are being uploaded.
            </p>
            {/*
            <Button onClick={onReset} className="w-full">
              Create Another Project
            </Button>
            */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSuccessPopup; 
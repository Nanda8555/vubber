import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Trash } from "lucide-react";

interface VideoUploadProps {
  value: File[];
  onChange: (files: File[]) => void;
  errors?: string;
  thumbnails: { [key: string]: string };
  setThumbnails: (thumbs: { [key: string]: string }) => void;
  label?: string;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({
  value,
  onChange,
  errors,
  thumbnails,
  setThumbnails,
  label = "Upload Videos",
}) => {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const existingKeys = new Set(value.map(f => f.name + f.size));
    const newFiles = files.filter(f => !existingKeys.has(f.name + f.size));
    onChange([...value, ...newFiles]);
    await generateThumbnails(newFiles);
    if (e.target) e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("video/"));
    if (files.length > 0) {
      onChange([...value, ...files]);
      await generateThumbnails(files);
    }
  };

  const generateThumbnails = async (files: File[]) => {
    const newThumbnails: { [key: string]: string } = {};
    for (const file of files) {
      const key = file.name + file.size;
      if (!thumbnails[key]) {
        try {
          newThumbnails[key] = await generateVideoThumbnail(file);
        } catch (error) {
          // ignore
        }
      }
    }
    setThumbnails({ ...thumbnails, ...newThumbnails });
  };

  const generateVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      video.crossOrigin = "anonymous";
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = Math.min(1, video.duration * 0.1);
      };
      video.onseeked = () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL("image/jpeg", 0.8);
          resolve(thumbnail);
        } else {
          reject(new Error("Could not get canvas context"));
        }
      };
      video.onerror = () => {
        reject(new Error("Error loading video"));
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const removeVideo = (index: number) => {
    const videoToRemove = value[index];
    const thumbnailKey = videoToRemove.name + videoToRemove.size;
    onChange(value.filter((_, i) => i !== index));
    const newThumbnails = { ...thumbnails };
    delete newThumbnails[thumbnailKey];
    setThumbnails(newThumbnails);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="videos" className="text-sm font-semibold text-white/90">
        {label}
      </Label>
      <div className="space-y-3">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all border-vubber-border bg-vubber-background duration-200 cursor-pointer ${
            dragOver
              ? "border-vubber-border bg-primary/10"
              : errors
              ? "border-destructive/50 bg-destructive/10"
              : "border-border hover:border-primary bg-background/80"
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <div className="space-y-3">
            <div
              className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${dragOver ? "bg-primary/10" : "bg-muted/30"}`}
            >
              <Upload className={`w-6 h-6 ${dragOver ? "text-primary" : "text-white/60"}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">
                {dragOver ? "Drop videos here" : "Click to upload or drag and drop"}
              </p>
              {/* <p className="text-xs text-white/60 mt-1">Upload videos in any format. No size limit.</p> */}
            </div>
          </div>
        </div>
        <Input
          id="videos"
          ref={inputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {value.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-light text-white/90">Selected Videos ({value.length}):</p>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {value.map((video, index) => {
                const thumbnailKey = video.name + video.size;
                const thumbnail = thumbnails[thumbnailKey];
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/60 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-white/10 rounded-lg overflow-hidden flex-shrink-0 relative">
                        {thumbnail ? (
                          <img
                            src={thumbnail || "/placeholder.svg"}
                            alt={`Thumbnail for ${video.name}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs font-medium text-white/60">
                              {video.name.split(".").pop()?.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white/90 truncate" title={video.name}>
                          {video.name}
                        </p>
                        <p className="text-xs text-white/60">
                          {video.size > 1024 * 1024 * 1024
                            ? `${(video.size / (1024 * 1024 * 1024)).toFixed(1)} GB`
                            : `${(video.size / (1024 * 1024)).toFixed(1)} MB`}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVideo(index)}
                      className="text-destructive hover:text-destructive-foreground flex-shrink-0 text-red bg-white/10 hover:bg-white/20"
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {errors && <p className="text-sm text-destructive font-medium">{errors}</p>}
    </div>
  );
};

export default VideoUpload; 
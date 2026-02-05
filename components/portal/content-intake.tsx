"use client";

import React from "react";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Film,
  Music,
  FileText,
  ImageIcon,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "processing" | "complete" | "error";
}

const fileTypeIcons: Record<string, React.ReactNode> = {
  video: <Film className="w-5 h-5" />,
  audio: <Music className="w-5 h-5" />,
  image: <ImageIcon className="w-5 h-5" />,
  document: <FileText className="w-5 h-5" />,
};

function getFileCategory(type: string): string {
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (type.startsWith("image/")) return "image";
  return "document";
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

export function ContentIntake() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const simulateUpload = useCallback((file: File) => {
    const uploadedFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    };

    setFiles((prev) => [...prev, uploadedFile]);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id
              ? { ...f, progress: 100, status: "processing" }
              : f
          )
        );
        // Simulate processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id ? { ...f, status: "complete" } : f
            )
          );
        }, 1500);
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === uploadedFile.id ? { ...f, progress } : f))
        );
      }
    }, 200);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      for (const file of droppedFiles) {
        simulateUpload(file);
      }
    },
    [simulateUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      for (const file of selectedFiles) {
        simulateUpload(file);
      }
    },
    [simulateUpload]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground text-balance">
          Upload Your Raw Content
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-balance">
          Drop in your videos, audio, or images. Our unified system will
          transform and distribute them across your connected platforms.
        </p>
      </div>

      {/* Drop Zone */}
      <Card
        className={`border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col items-center gap-6">
            {/* Sacred Geometry Upload Icon */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
              </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/40" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-foreground">
                {isDragging ? "Release to upload" : "Drag and drop your files here"}
              </p>
              <p className="text-sm text-muted-foreground">
                Videos, audio, images, or documents up to 2GB each
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-border" />
              <span className="text-sm text-muted-foreground">or</span>
              <div className="h-px w-12 bg-border" />
            </div>

            <label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="default" size="lg" className="min-h-[48px] px-8" asChild>
                <span>Browse Files</span>
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                className="sr-only"
                onChange={handleFileInput}
                accept="video/*,audio/*,image/*,.pdf,.doc,.docx"
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Uploaded Content ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* File Type Icon */}
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
                      {fileTypeIcons[getFileCategory(file.type)]}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate text-foreground">
                          {file.name}
                        </p>
                        {file.status === "complete" && (
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        )}
                        {file.status === "processing" && (
                          <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {file.status === "uploading"
                            ? `Uploading ${Math.round(file.progress)}%`
                            : file.status === "processing"
                            ? "Processing..."
                            : "Ready for distribution"}
                        </span>
                      </div>
                      {file.status === "uploading" && (
                        <Progress value={file.progress} className="h-1 mt-2" />
                      )}
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 min-w-[44px] min-h-[44px]"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Content Types Guide */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Film, label: "Videos", desc: "MP4, MOV, WebM" },
          { icon: Music, label: "Audio", desc: "MP3, WAV, AAC" },
          { icon: ImageIcon, label: "Images", desc: "JPG, PNG, WebP" },
          { icon: FileText, label: "Documents", desc: "PDF, DOC, TXT" },
        ].map((item) => (
          <Card key={item.label} className="bg-secondary/50">
            <CardContent className="p-4 text-center">
              <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

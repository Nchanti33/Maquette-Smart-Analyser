'use client';

import { useState } from 'react';
import { Upload, FileType, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export const DocumentUpload = ({ onUpload, loading = false }: DocumentUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    onUpload(file);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileType className="h-10 w-10 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="h-10 w-10 text-blue-500" />;
      default:
        return <FileText className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
            dragActive ? "border-primary/50 bg-primary/5" : "border-muted-foreground/25",
            file ? "border-green-500/50 bg-green-500/5" : "",
            loading ? "opacity-50 cursor-not-allowed" : ""
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleChange}
            className="hidden"
            disabled={loading}
          />

          {file ? (
            <div className="flex flex-col items-center space-y-2">
              {getFileIcon(file.name)}
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
              {loading ? (
                <div className="mt-2 text-sm text-muted-foreground animate-pulse">
                  Processing document...
                </div>
              ) : (
                <Button 
                  onClick={() => setFile(null)} 
                  variant="outline" 
                  size="sm"
                  className="mt-2"
                >
                  Remove
                </Button>
              )}
            </div>
          ) : (
            <>
              <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Upload Document</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground text-center">
                Drag and drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOCX, and TXT files
              </p>
              <Button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="mt-4"
                disabled={loading}
              >
                Select File
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
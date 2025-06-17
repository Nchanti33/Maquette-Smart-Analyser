"use client";

import { Feature } from "@/lib/types/document";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface JsonPreviewProps {
  feature?: Feature;
  allFeatures?: Feature[];
  outputDataString?: string;
}

export const JsonPreview = ({
  feature,
  allFeatures,
  outputDataString,
}: JsonPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (json: string) => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (json: string, filename: string) => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // If outputDataString is provided, display it instead of the default logic
  const jsonToDisplay = outputDataString
    ? outputDataString
    : feature
    ? JSON.stringify(feature, null, 2)
    : allFeatures
    ? JSON.stringify(
        allFeatures.filter((f) => f.validated),
        null,
        2
      )
    : "";

  const downloadFilename = feature
    ? `feature-${feature.id}.json`
    : "validated-features.json";

  return (
    <Card className="h-full">
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-md">JSON Preview</CardTitle>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleCopy(jsonToDisplay)}
            title="Copy JSON"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleDownload(jsonToDisplay, downloadFilename)}
            title="Download JSON"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-18rem)]">
          {jsonToDisplay ? (
            <pre className="p-4 text-xs font-mono whitespace-pre-wrap break-words overflow-auto bg-secondary/30 rounded-b-md auto-wrap code-block">
              {jsonToDisplay}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-40 text-muted-foreground p-4">
              Select a feature to view its JSON representation
            </div>
          )}
        </ScrollArea>
        {copied && (
          <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm">
            Copied to clipboard!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

"use client";

import { DocumentNode, Feature } from "@/lib/types/document";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ParagraphListProps {
  nodes: Record<string, DocumentNode>;
  features: Feature[];
  selectedNodeId?: string;
  onNodeSelect: (nodeId: string) => void;
  filter?: string;
  validationFilter?: "all" | "validated" | "unvalidated";
  outputDataArray?: string[];
  onCaseSelect?: (idx: number) => void; // Ajout du callback pour la sélection
}

export const ParagraphList = ({
  nodes,
  features,
  selectedNodeId,
  onNodeSelect,
  filter = "",
  validationFilter = "all",
  outputDataArray = [],
  onCaseSelect, // Ajout du callback ici
}: ParagraphListProps) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number | null>(null);

  // Get only paragraph nodes
  const paragraphNodes =
    nodes && typeof nodes === "object"
      ? Object.values(nodes).filter((node) => node.type === "paragraph")
      : [];

  // Filter by text if filter is provided
  const filteredNodes = paragraphNodes.filter((node) => {
    const matchesFilter =
      filter === "" ||
      node.title.toLowerCase().includes(filter.toLowerCase()) ||
      (node.content &&
        node.content.toLowerCase().includes(filter.toLowerCase()));

    // Check if it has associated features that match validation filter
    const nodeFeatures = features.filter((f) => f.sourceId === node.id);
    const hasValidatedFeature = nodeFeatures.some((f) => f.validated);
    const hasUnvalidatedFeature = nodeFeatures.some((f) => !f.validated);

    const matchesValidation =
      validationFilter === "all" ||
      (validationFilter === "validated" && hasValidatedFeature) ||
      (validationFilter === "unvalidated" && hasUnvalidatedFeature);

    return matchesFilter && matchesValidation;
  });

  // Sort by path for a logical order
  filteredNodes.sort((a, b) =>
    a.path.localeCompare(b.path, undefined, { numeric: true })
  );

  return (
    <Card className="h-full min-h-[60vh] min-w-[350px] w-full max-w-full">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-md flex justify-between items-center">
          <span>Specs</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-18rem)]">
          {filteredNodes.length > 0 ? (
            <div className="space-y-1 p-2">
              {filteredNodes.map((node) => {
                // Find parent section and chapter
                const parentSection = node.parentId
                  ? nodes[node.parentId]
                  : null;
                const grandparentChapter = parentSection?.parentId
                  ? nodes[parentSection.parentId]
                  : null;

                // Find associated features
                const nodeFeatures = features.filter(
                  (f) => f.sourceId === node.id
                );
                const hasFeatures = nodeFeatures.length > 0;

                return (
                  <div
                    key={node.id}
                    className={cn(
                      "p-3 rounded-md cursor-pointer transition-colors border",
                      selectedNodeId === node.id
                        ? "bg-primary/10 border-primary/30"
                        : "hover:bg-secondary/50 border-transparent",
                      hasFeatures && "border-l-4",
                      hasFeatures && nodeFeatures.some((f) => !f.validated)
                        ? "border-l-amber-500"
                        : hasFeatures
                        ? "border-l-green-500"
                        : ""
                    )}
                    onClick={() => onNodeSelect(node.id)}
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm font-medium">{node.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-2">
                        <span className="font-medium">{node.path}</span>
                        <span>•</span>
                        <span className="truncate">
                          {grandparentChapter?.title} &gt;{" "}
                          {parentSection?.title}
                        </span>
                      </div>
                      {node.content && (
                        <div className="text-xs mt-1 line-clamp-2 break-words">
                          {node.content}
                        </div>
                      )}
                      {hasFeatures && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {nodeFeatures.map((feature) => (
                            <span
                              key={feature.id}
                              className={cn(
                                "px-2 py-0.5 rounded-full text-xs",
                                feature.validated
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              )}
                            >
                              {feature.type}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}{" "}
            </div>
          ) : (
            <></>
          )}{" "}
          {/* Affichage des cartes JSON issues de outputDataArray */}
          {outputDataArray.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-1 gap-1.5 px-2">
                {" "}
                {outputDataArray.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      className={cn(
                        "w-full text-left px-3 py-2 text-xs rounded-md border transition-colors break-words overflow-hidden text-ellipsis",
                        selectedCaseIdx === idx
                          ? "bg-teal-100 border-teal-600 text-teal-900 font-medium"
                          : "bg-white border-teal-200 hover:bg-teal-50 text-teal-800"
                      )}
                      onClick={() => {
                        setSelectedCaseIdx(idx);
                        if (onCaseSelect) onCaseSelect(idx);
                      }}
                    >
                      {`Spec ${idx + 1}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

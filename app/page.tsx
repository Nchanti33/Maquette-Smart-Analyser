"use client";

import { useState, useEffect } from "react";
import { DocumentNode, Feature, DocumentData } from "@/lib/types/document";
import { sampleDocument } from "@/lib/mock/sampleDocument";
import { Header } from "@/components/layout/Header";
import { DocumentUpload } from "@/components/document/DocumentUpload";
// Removed DocumentTree import
import { ParagraphList } from "@/components/document/ParagraphList";
import { FeatureCard } from "@/components/document/FeatureCard";
import { JsonPreview } from "@/components/document/JsonPreview";
import { FilterBar } from "@/components/filters/FilterBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { sendDocumentToExternalApi } from "@/src/services/externalApiService";
import { SpecDetail } from "@/components/document/SpecDetail";
import "./main-content.css";

// Utility function to recursively remove unnecessary newlines from any object/string
function removeUnnecessaryNewlines(obj: any): any {
  if (typeof obj === "string") {
    // Replace multiple or isolated \n with a space
    return obj.replace(/\n+/g, " ").replace(/ +/g, " ").trim();
  } else if (Array.isArray(obj)) {
    return obj.map(removeUnnecessaryNewlines);
  } else if (typeof obj === "object" && obj !== null) {
    const cleaned: any = {};
    for (const key in obj) {
      cleaned[key] = removeUnnecessaryNewlines(obj[key]);
    }
    return cleaned;
  }
  return obj;
}

function normalizeSpec(spec: any, idx: number): any {
  // Normalise les clés attendues pour l'affichage designer
  return {
    id: spec.id || `Spec_${idx + 1}`,
    title: spec.title || spec.name || spec.label || "",
    description: spec.description || "",
    type: spec.type || "",
    category: spec.category || "",
    status: spec.status || "",
    priority: spec.priority || "",
    content: spec.content || "",
    requirements: Array.isArray(spec.requirements)
      ? spec.requirements
      : spec.requirements
      ? [spec.requirements]
      : [],
    ...spec, // conserve les autres propriétés
  };
}

export default function Home() {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();
  const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>();
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [validationFilter, setValidationFilter] = useState<
    "all" | "validated" | "unvalidated"
  >("all");
  // Ajout d'un état pour stocker outputData
  const [outputData, setOutputData] = useState<any>(null); // Stringified version of outputData for display, with custom cleaning
  let outputDataString = outputData ? JSON.stringify(outputData, null, 2) : "";
  if (outputDataString) {
    // ÉTAPE 1: Supprimer d'abord tous les caractères d'échappement
    outputDataString = outputDataString.replace(/\\/g, "");

    // ÉTAPE 2: Structuration du JSON avec newlines
    // Add a comma between closing and opening curly braces (in that order)
    outputDataString = outputDataString.replace(/}\s*{/g, "},\n{");
    // Add a newline after every '{' and before every '}'
    outputDataString = outputDataString
      .replace(/{/g, "{\n")
      .replace(/}/g, "\n}");
    // Add a newline after every ','
    outputDataString = outputDataString.replace(/,/g, ",\n");

    // ÉTAPE 3: Appliquer les tabulations (après avoir supprimé les backslashes)
    let tabbed = "";
    let indent = 0;
    for (const line of outputDataString.split(/\n/)) {
      // Réduire l'indentation avant de traiter les lignes qui se terminent par '}'
      if (line.match(/^\s*}/)) indent--;
      // Ajouter l'indentation appropriée à chaque ligne
      tabbed += "  ".repeat(Math.max(indent, 0)) + line.trim() + "\n";
      // Augmenter l'indentation après les lignes qui se terminent par '{'
      if (line.match(/{$/)) indent++;
    }
    outputDataString = tabbed;
  }

  // Debug: log outputDataString and its length
  if (outputDataString) {
    console.log("outputDataString length:", outputDataString.length);
    console.log("outputDataString preview:", outputDataString.slice(0, 1000)); // Preview first 1000 chars
  }

  // Array of strings split by the custom separator: ',' between '}' and '{' (close-open)
  let outputDataArray: string[] = [];
  if (outputDataString) {
    outputDataArray = outputDataString.split(/},\s*{/g).map((str, idx, arr) => {
      // Add back the removed braces except for the first and last elements
      if (arr.length === 1) return str;
      if (idx === 0) return str + "}";
      if (idx === arr.length - 1) return "{" + str;
      return "{" + str + "}";
    });
  }

  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setSelectedCaseIdx(null); // Reset selected case on new upload
    try {
      const user = "difyuser"; // You can make this dynamic if needed
      const workflowVarName = "Document_entree"; // Set to your workflow's variable name
      const workflowId = ""; // Not used in the current API call, but can be set if needed
      console.log("Uploading file:", file);
      const apiResult = await sendDocumentToExternalApi(
        file,
        user,
        workflowVarName,
        workflowId
      );
      console.log("API result:", apiResult);
      // Extraction des données dans data.output.Sortie
      const outputData = apiResult?.data?.outputs?.Sortie || {};
      console.log("Data displayed in setDocument:", outputData);
      // Nettoyage des \n inutiles dans outputData (remplacement récursif)
      const cleanedOutputData = removeUnnecessaryNewlines(outputData);
      console.log("Data displayed in setDocument:", cleanedOutputData);
      setOutputData(cleanedOutputData);
      setDocument(cleanedOutputData as DocumentData);
      toast({
        title: "Document uploaded",
        description: `Successfully processed ${file.name}`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedFeature(undefined);
  };

  const handleFeatureValidation = (featureId: string, validated: boolean) => {
    if (!document) return;

    const updatedFeatures = document.features.map((feature) =>
      feature.id === featureId ? { ...feature, validated } : feature
    );

    setDocument({
      ...document,
      features: updatedFeatures,
    });

    toast({
      title: validated ? "Feature validated" : "Feature validation removed",
      description: validated
        ? "The feature has been marked as validated."
        : "The feature is now pending validation.",
      variant: validated ? "default" : "destructive",
    });
  };

  const handleFeatureEdit = (
    featureId: string,
    updatedFeature: Partial<Feature>
  ) => {
    if (!document) return;

    const updatedFeatures = document.features.map((feature) =>
      feature.id === featureId ? { ...feature, ...updatedFeature } : feature
    );

    setDocument({
      ...document,
      features: updatedFeatures,
    });

    // Update the selected feature if it's the one being edited
    if (selectedFeature && selectedFeature.id === featureId) {
      setSelectedFeature({ ...selectedFeature, ...updatedFeature });
    }

    toast({
      title: "Feature updated",
      description: "The feature has been successfully updated.",
    });
  };

  const handleFeatureDelete = (featureId: string) => {
    if (!document) return;

    const updatedFeatures = document.features.filter(
      (feature) => feature.id !== featureId
    );

    setDocument({
      ...document,
      features: updatedFeatures,
    });

    // Clear selected feature if it's the one being deleted
    if (selectedFeature && selectedFeature.id === featureId) {
      setSelectedFeature(undefined);
    }

    toast({
      title: "Feature deleted",
      description: "The feature has been removed.",
      variant: "destructive",
    });
  };

  // Get root nodes (chapters)
  const rootNodeIds =
    document && document.nodes
      ? Object.values(document.nodes)
          .filter((node) => node.parentId === null)
          .map((node) => node.id)
      : [];

  // Get features for the selected node
  const selectedNodeFeatures =
    document && selectedNodeId
      ? document.features.filter(
          (feature) => feature.sourceId === selectedNodeId
        )
      : [];

  // Get the selected node
  const selectedNode =
    document && selectedNodeId ? document.nodes[selectedNodeId] : undefined;

  // Ajout de l'état dans Home
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-teal-600">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="main-content-container">
          {!document ? (
            <div className="max-w-2xl w-full mx-auto my-12 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
                Smart Analyzer
              </h2>
              <DocumentUpload onUpload={handleFileUpload} loading={loading} />
            </div>
          ) : (
            <div className="space-y-4 w-full flex flex-col items-center justify-center">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-semibold text-teal-800">
                  {document.name}
                </h2>
                <button
                  className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition"
                  onClick={() => {
                    setDocument(null);
                    setSelectedCaseIdx(null); // Reset selected case on Retour
                  }}
                  style={{ marginLeft: "auto" }}
                >
                  Retour
                </button>
              </div>
              <FilterBar
                onFilterChange={setSearchFilter}
                onValidationFilterChange={setValidationFilter}
                validationFilter={validationFilter}
                features={document.features}
              />
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[calc(100vh-16rem)] w-full"
              >
                <ResizablePanel
                  defaultSize={25}
                  minSize={20}
                  className="resizable-column"
                >
                  <div className="h-full overflow-hidden">
                    <ParagraphList
                      nodes={document.nodes}
                      features={document.features}
                      selectedNodeId={selectedNodeId}
                      onNodeSelect={handleNodeSelect}
                      filter={searchFilter}
                      validationFilter={validationFilter}
                      outputDataArray={outputDataArray}
                      onCaseSelect={setSelectedCaseIdx}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40}>
                  <div className="h-full p-1 overflow-auto content-container">
                    {selectedCaseIdx !== null &&
                    outputDataArray[selectedCaseIdx] ? (
                      (() => {
                        let parsed = null;
                        try {
                          parsed = JSON.parse(
                            outputDataArray[selectedCaseIdx]
                              .replace(/^[^\{]*/, "")
                              .replace(/[^\}]*$/, "")
                          );
                        } catch {
                          return (
                            <pre className="whitespace-pre-wrap break-words overflow-auto auto-wrap code-block text-xs bg-white rounded-lg shadow border border-teal-200 p-4">
                              {outputDataArray[selectedCaseIdx]}
                            </pre>
                          );
                        }
                        return (
                          <pre className="whitespace-pre-wrap break-words overflow-auto auto-wrap code-block text-xs bg-white rounded-lg shadow border border-teal-200 p-4">
                            {JSON.stringify(parsed, null, 2)}
                          </pre>
                        );
                      })()
                    ) : selectedNodeId && selectedNode ? (
                      <div className="space-y-4 h-full overflow-auto">
                        <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                          <h3 className="text-lg font-medium mb-1 text-teal-900 break-words">
                            {selectedNode.title}
                          </h3>
                          <div className="text-xs text-teal-700 mb-2">
                            {selectedNode.path} • {selectedNode.type}
                          </div>
                          {selectedNode.content && (
                            <p className="text-sm mt-2 text-teal-800 whitespace-pre-wrap break-words">
                              {selectedNode.content}
                            </p>
                          )}
                        </div>

                        {selectedNodeFeatures.length > 0 ? (
                          <div className="space-y-3">
                            <h3 className="text-sm font-medium text-teal-800">
                              Detected Features
                            </h3>
                            {selectedNodeFeatures.map((feature) => (
                              <FeatureCard
                                key={feature.id}
                                feature={feature}
                                sourceNode={selectedNode}
                                onValidate={handleFeatureValidation}
                                onEdit={handleFeatureEdit}
                                onDelete={handleFeatureDelete}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-lg border p-8 text-center text-teal-400 border-teal-200 bg-white/60">
                            No features detected for this {selectedNode.type}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-teal-400">
                        Select a node to view its details and features
                      </div>
                    )}
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={35} minSize={25}>
                  <div className="h-full p-1 overflow-auto content-container">
                    <JsonPreview
                      feature={selectedFeature}
                      allFeatures={
                        !selectedFeature ? document.features : undefined
                      }
                      outputDataString={outputDataString}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
}

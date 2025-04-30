'use client';

import { useState, useEffect } from 'react';
import { DocumentNode, Feature, DocumentData } from '@/lib/types/document';
import { sampleDocument } from '@/lib/mock/sampleDocument';
import { Header } from '@/components/layout/Header';
import { DocumentUpload } from '@/components/document/DocumentUpload';
import { DocumentTree } from '@/components/document/DocumentTree';
import { ParagraphList } from '@/components/document/ParagraphList';
import { FeatureCard } from '@/components/document/FeatureCard';
import { JsonPreview } from '@/components/document/JsonPreview';
import { FilterBar } from '@/components/filters/FilterBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();
  const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>();
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [validationFilter, setValidationFilter] = useState<'all' | 'validated' | 'unvalidated'>('all');
  
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setDocument(sampleDocument);
      setLoading(false);
      toast({
        title: "Document uploaded",
        description: `Successfully processed ${file.name}`,
      });
    }, 1500);
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedFeature(undefined);
  };
  
  const handleFeatureValidation = (featureId: string, validated: boolean) => {
    if (!document) return;
    
    const updatedFeatures = document.features.map(feature => 
      feature.id === featureId ? { ...feature, validated } : feature
    );
    
    setDocument({
      ...document,
      features: updatedFeatures
    });
    
    toast({
      title: validated ? "Feature validated" : "Feature validation removed",
      description: validated 
        ? "The feature has been marked as validated." 
        : "The feature is now pending validation.",
      variant: validated ? "default" : "destructive",
    });
  };
  
  const handleFeatureEdit = (featureId: string, updatedFeature: Partial<Feature>) => {
    if (!document) return;
    
    const updatedFeatures = document.features.map(feature => 
      feature.id === featureId ? { ...feature, ...updatedFeature } : feature
    );
    
    setDocument({
      ...document,
      features: updatedFeatures
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
    
    const updatedFeatures = document.features.filter(feature => feature.id !== featureId);
    
    setDocument({
      ...document,
      features: updatedFeatures
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
  const rootNodeIds = document 
    ? Object.values(document.nodes)
        .filter(node => node.parentId === null)
        .map(node => node.id)
    : [];
    
  // Get features for the selected node
  const selectedNodeFeatures = document && selectedNodeId
    ? document.features.filter(feature => feature.sourceId === selectedNodeId)
    : [];
    
  // Get the selected node
  const selectedNode = document && selectedNodeId
    ? document.nodes[selectedNodeId]
    : undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-6">
        {!document ? (
          <div className="max-w-2xl mx-auto my-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Smart Analyzer</h2>
            <DocumentUpload onUpload={handleFileUpload} loading={loading} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{document.name}</h2>
            </div>
            
            <FilterBar 
              onFilterChange={setSearchFilter}
              onValidationFilterChange={setValidationFilter}
              validationFilter={validationFilter}
              features={document.features}
            />
            
            <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-12rem)]">
              <ResizablePanel defaultSize={25} minSize={20}>
                <Tabs defaultValue="tree">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="tree">Tree View</TabsTrigger>
                    <TabsTrigger value="paragraphs">Paragraphs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tree" className="mt-2">
                    <DocumentTree 
                      nodes={document.nodes}
                      rootNodeIds={rootNodeIds}
                      onNodeSelect={handleNodeSelect}
                      selectedNodeId={selectedNodeId}
                    />
                  </TabsContent>
                  <TabsContent value="paragraphs" className="mt-2">
                    <ParagraphList 
                      nodes={document.nodes}
                      features={document.features}
                      selectedNodeId={selectedNodeId}
                      onNodeSelect={handleNodeSelect}
                      filter={searchFilter}
                      validationFilter={validationFilter}
                    />
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={40}>
                <div className="h-full p-1">
                  {selectedNodeId && selectedNode ? (
                    <div className="space-y-4 h-full overflow-auto">
                      <div className="bg-card rounded-lg p-4 border">
                        <h3 className="text-lg font-medium mb-1">{selectedNode.title}</h3>
                        <div className="text-xs text-muted-foreground mb-2">
                          {selectedNode.path} • {selectedNode.type}
                        </div>
                        {selectedNode.content && (
                          <p className="text-sm mt-2">{selectedNode.content}</p>
                        )}
                      </div>
                      
                      {selectedNodeFeatures.length > 0 ? (
                        <div className="space-y-3">
                          <h3 className="text-sm font-medium">Detected Features</h3>
                          {selectedNodeFeatures.map(feature => (
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
                        <div className="rounded-lg border p-8 text-center text-muted-foreground">
                          No features detected for this {selectedNode.type}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Select a node to view its details and features
                    </div>
                  )}
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={35} minSize={25}>
                <JsonPreview 
                  feature={selectedFeature} 
                  allFeatures={!selectedFeature ? document.features : undefined} 
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
}
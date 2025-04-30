'use client';

import { useState } from 'react';
import { Check, X, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Feature, DocumentNode } from '@/lib/types/document';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FeatureCardProps {
  feature: Feature;
  sourceNode?: DocumentNode;
  onValidate: (featureId: string, validated: boolean) => void;
  onEdit: (featureId: string, updatedFeature: Partial<Feature>) => void;
  onDelete: (featureId: string) => void;
}

export const FeatureCard = ({
  feature,
  sourceNode,
  onValidate,
  onEdit,
  onDelete,
}: FeatureCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeature, setEditedFeature] = useState<Feature>(feature);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleSaveEdit = () => {
    onEdit(feature.id, editedFeature);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedFeature(feature);
    setIsEditing(false);
  };

  const getFeatureTypeColor = (type: string) => {
    switch (type) {
      case 'title':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'summary':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'variable':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const renderConfidence = () => {
    const confidence = feature.metadata?.confidence || 0;
    const confidenceClass = 
      confidence > 0.9 ? 'text-green-600 dark:text-green-400' :
      confidence > 0.8 ? 'text-amber-600 dark:text-amber-400' :
      'text-red-600 dark:text-red-400';
    
    return (
      <div className="flex items-center gap-1">
        <span className={cn("text-xs font-medium", confidenceClass)}>
          {(confidence * 100).toFixed(0)}%
        </span>
        {confidence < 0.8 && (
          <AlertCircle className="h-3 w-3 text-amber-500" />
        )}
      </div>
    );
  };

  return (
    <>
      <Card className={cn(
        "transition-all border-l-4 overflow-hidden",
        feature.validated ? "border-l-green-500" : "border-l-amber-500"
      )}>
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-2">
            <Badge className={cn("rounded-md font-normal", getFeatureTypeColor(feature.type))}>
              {feature.type}
            </Badge>
            {renderConfidence()}
          </div>
          <div className="flex items-center space-x-1">
            <Button 
              variant={feature.validated ? "outline" : "default"} 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => onValidate(feature.id, !feature.validated)}
              title={feature.validated ? "Mark as unvalidated" : "Validate"}
            >
              <Check className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" 
              onClick={() => setDeleteDialogOpen(true)}
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          {isEditing ? (
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-xs font-medium">Content</div>
                <Textarea
                  value={editedFeature.content}
                  onChange={(e) => setEditedFeature({...editedFeature, content: e.target.value})}
                  className="resize-none min-h-[80px]"
                />
              </div>
              {feature.type === 'variable' && (
                <div className="space-y-1">
                  <div className="text-xs font-medium">Value</div>
                  <Input
                    value={typeof editedFeature.value === 'object' 
                      ? JSON.stringify(editedFeature.value) 
                      : String(editedFeature.value || '')}
                    onChange={(e) => setEditedFeature({...editedFeature, value: e.target.value})}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm">{feature.content}</div>
              {feature.type === 'variable' && feature.value !== undefined && (
                <div className="text-xs bg-secondary/50 p-2 rounded-md font-mono whitespace-pre-wrap">
                  {typeof feature.value === 'object' 
                    ? JSON.stringify(feature.value, null, 2) 
                    : feature.value}
                  {feature.metadata?.unit && 
                    <span className="text-muted-foreground ml-1">{feature.metadata.unit}</span>
                  }
                </div>
              )}
              {sourceNode && (
                <div className="text-xs text-muted-foreground mt-1">
                  Source: {sourceNode.path} {sourceNode.title}
                </div>
              )}
            </div>
          )}
        </CardContent>
        {isEditing && (
          <CardFooter className="p-3 pt-0 flex justify-end space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdit}>
              Save
            </Button>
          </CardFooter>
        )}
      </Card>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {feature.type} feature? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-end">
            <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(feature.id);
                setDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, File, FileText, Folder } from 'lucide-react';
import { DocumentNode } from '@/lib/types/document';
import { cn } from '@/lib/utils';

interface DocumentTreeProps {
  nodes: Record<string, DocumentNode>;
  rootNodeIds: string[];
  onNodeSelect: (nodeId: string) => void;
  selectedNodeId?: string;
}

export const DocumentTree = ({
  nodes,
  rootNodeIds,
  onNodeSelect,
  selectedNodeId
}: DocumentTreeProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    rootNodeIds.reduce((acc, id) => ({ ...acc, [id]: true }), {})
  );

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const renderTreeNode = (nodeId: string, level: number = 0) => {
    const node = nodes[nodeId];
    if (!node) return null;

    const isExpanded = !!expandedNodes[nodeId];
    const hasChildren = node.children.length > 0;
    
    const getNodeIcon = () => {
      switch (node.type) {
        case 'chapter':
          return <Folder className="h-4 w-4 shrink-0" />;
        case 'section':
          return <FileText className="h-4 w-4 shrink-0" />;
        case 'paragraph':
          return <File className="h-4 w-4 shrink-0" />;
        default:
          return <File className="h-4 w-4 shrink-0" />;
      }
    };

    return (
      <div key={node.id} className="select-none">
        <div 
          className={cn(
            "flex items-center py-1 px-2 rounded-md hover:bg-secondary/50 cursor-pointer",
            selectedNodeId === node.id && "bg-secondary text-secondary-foreground"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => onNodeSelect(node.id)}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              className="mr-1 p-1 rounded-sm hover:bg-muted"
            >
              {isExpanded ? 
                <ChevronDown className="h-3.5 w-3.5" /> : 
                <ChevronRight className="h-3.5 w-3.5" />
              }
            </button>
          ) : (
            <span className="w-5" />
          )}
          {getNodeIcon()}
          <span className="ml-2 text-sm truncate">{node.title}</span>
          <span className="ml-auto text-xs text-muted-foreground">{node.path}</span>
        </div>
        
        {isExpanded && hasChildren && (
          <div className="pb-1">
            {node.children.map(childId => renderTreeNode(childId, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-auto max-h-[calc(100vh-13rem)] border rounded-md p-2 bg-card">
      {rootNodeIds.map(nodeId => renderTreeNode(nodeId))}
    </div>
  );
};
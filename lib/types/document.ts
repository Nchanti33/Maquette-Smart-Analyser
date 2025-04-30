export type NodeType = 'chapter' | 'section' | 'paragraph';
export type FeatureType = 'title' | 'summary' | 'variable';

export interface DocumentNode {
  id: string;
  type: NodeType;
  title: string;
  content?: string;
  parentId: string | null;
  children: string[];
  level: number;
  path: string; // e.g., "1.2.3"
}

export interface Feature {
  id: string;
  type: FeatureType;
  content: string;
  sourceId: string; // Reference to the document node
  validated: boolean;
  metadata?: Record<string, any>;
  value?: string | number | boolean;
}

export interface DocumentData {
  id: string;
  name: string;
  fileType: 'pdf' | 'docx' | 'txt';
  nodes: Record<string, DocumentNode>;
  features: Feature[];
  uploadedAt: string;
}
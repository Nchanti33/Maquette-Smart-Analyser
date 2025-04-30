import { DocumentData, DocumentNode, Feature } from '@/lib/types/document';

// Helper function to create nodes
const createNode = (
  id: string,
  type: 'chapter' | 'section' | 'paragraph',
  title: string,
  parentId: string | null,
  level: number,
  path: string,
  content?: string
): DocumentNode => ({
  id,
  type,
  title,
  parentId,
  children: [],
  level,
  path,
  content
});

// Create sample document structure
export const createSampleDocument = (): DocumentData => {
  const nodes: Record<string, DocumentNode> = {};
  const features: Feature[] = [];
  
  // Create root nodes (chapters)
  nodes['ch1'] = createNode('ch1', 'chapter', 'Introduction', null, 1, '1');
  nodes['ch2'] = createNode('ch2', 'chapter', 'System Requirements', null, 1, '2');
  nodes['ch3'] = createNode('ch3', 'chapter', 'Technical Specifications', null, 1, '3');
  nodes['ch4'] = createNode('ch4', 'chapter', 'Implementation Guidelines', null, 1, '4');
  
  // Chapter 1 sections
  nodes['s1.1'] = createNode('s1.1', 'section', 'Purpose', 'ch1', 2, '1.1');
  nodes['s1.2'] = createNode('s1.2', 'section', 'Scope', 'ch1', 2, '1.2');
  nodes['ch1'].children.push('s1.1', 's1.2');
  
  // Chapter 1 paragraphs
  nodes['p1.1.1'] = createNode(
    'p1.1.1', 
    'paragraph', 
    'Project Overview', 
    's1.1', 
    3, 
    '1.1.1', 
    'The Smart Analyzer tool aims to provide automated extraction and validation of specifications from technical documents.'
  );
  nodes['s1.1'].children.push('p1.1.1');
  
  nodes['p1.2.1'] = createNode(
    'p1.2.1', 
    'paragraph', 
    'Document Types', 
    's1.2', 
    3, 
    '1.2.1', 
    'The system shall support PDF, DOCX, and TXT document formats for analysis.'
  );
  nodes['s1.2'].children.push('p1.2.1');
  
  // Chapter 2 sections
  nodes['s2.1'] = createNode('s2.1', 'section', 'Hardware Requirements', 'ch2', 2, '2.1');
  nodes['s2.2'] = createNode('s2.2', 'section', 'Software Requirements', 'ch2', 2, '2.2');
  nodes['ch2'].children.push('s2.1', 's2.2');
  
  // Chapter 2 paragraphs
  nodes['p2.1.1'] = createNode(
    'p2.1.1', 
    'paragraph', 
    'Minimum Specifications', 
    's2.1', 
    3, 
    '2.1.1', 
    'The system requires a minimum of 8GB RAM and 4 CPU cores for optimal performance.'
  );
  nodes['s2.1'].children.push('p2.1.1');
  
  nodes['p2.2.1'] = createNode(
    'p2.2.1', 
    'paragraph', 
    'Required Frameworks', 
    's2.2', 
    3, 
    '2.2.1', 
    'The system shall be compatible with Node.js v16+ and Python 3.8+.'
  );
  nodes['s2.2'].children.push('p2.2.1');
  
  // Chapter 3 sections
  nodes['s3.1'] = createNode('s3.1', 'section', 'API Specifications', 'ch3', 2, '3.1');
  nodes['s3.2'] = createNode('s3.2', 'section', 'Data Model', 'ch3', 2, '3.2');
  nodes['ch3'].children.push('s3.1', 's3.2');
  
  // Chapter 3 paragraphs
  nodes['p3.1.1'] = createNode(
    'p3.1.1', 
    'paragraph', 
    'REST Endpoints', 
    's3.1', 
    3, 
    '3.1.1', 
    'The API shall expose RESTful endpoints for document upload, analysis, and retrieval of results.'
  );
  nodes['s3.1'].children.push('p3.1.1');
  
  nodes['p3.2.1'] = createNode(
    'p3.2.1', 
    'paragraph', 
    'Document Schema', 
    's3.2', 
    3, 
    '3.2.1', 
    'Documents are represented as hierarchical trees with chapters, sections, and paragraphs.'
  );
  nodes['s3.2'].children.push('p3.2.1');
  
  // Chapter 4 sections
  nodes['s4.1'] = createNode('s4.1', 'section', 'Integration Guide', 'ch4', 2, '4.1');
  nodes['s4.2'] = createNode('s4.2', 'section', 'Performance Considerations', 'ch4', 2, '4.2');
  nodes['ch4'].children.push('s4.1', 's4.2');
  
  // Chapter 4 paragraphs
  nodes['p4.1.1'] = createNode(
    'p4.1.1', 
    'paragraph', 
    'Authentication', 
    's4.1', 
    3, 
    '4.1.1', 
    'Integration with the system requires OAuth 2.0 authentication and valid API credentials.'
  );
  nodes['s4.1'].children.push('p4.1.1');
  
  nodes['p4.2.1'] = createNode(
    'p4.2.1', 
    'paragraph', 
    'Scaling Considerations', 
    's4.2', 
    3, 
    '4.2.1', 
    'For large documents (>100MB), horizontal scaling is recommended to maintain performance.'
  );
  nodes['s4.2'].children.push('p4.2.1');
  
  // Create features
  features.push({
    id: 'f1',
    type: 'title',
    content: 'Smart Analyzer Technical Specification',
    sourceId: 'ch1',
    validated: true,
    metadata: {
      confidence: 0.95
    }
  });
  
  features.push({
    id: 'f2',
    type: 'summary',
    content: 'The Smart Analyzer tool provides automated extraction and validation of specifications from technical documents.',
    sourceId: 'p1.1.1',
    validated: true,
    metadata: {
      confidence: 0.89
    }
  });
  
  features.push({
    id: 'f3',
    type: 'variable',
    content: 'SUPPORTED_DOCUMENT_FORMATS',
    sourceId: 'p1.2.1',
    validated: false,
    value: ['PDF', 'DOCX', 'TXT'],
    metadata: {
      confidence: 0.82
    }
  });
  
  features.push({
    id: 'f4',
    type: 'variable',
    content: 'MIN_RAM_REQUIREMENT',
    sourceId: 'p2.1.1',
    validated: true,
    value: 8,
    metadata: {
      confidence: 0.94,
      unit: 'GB'
    }
  });
  
  features.push({
    id: 'f5',
    type: 'variable',
    content: 'MIN_CPU_CORES',
    sourceId: 'p2.1.1',
    validated: false,
    value: 4,
    metadata: {
      confidence: 0.91
    }
  });
  
  features.push({
    id: 'f6',
    type: 'variable',
    content: 'NODE_VERSION',
    sourceId: 'p2.2.1',
    validated: true,
    value: '16+',
    metadata: {
      confidence: 0.88
    }
  });
  
  features.push({
    id: 'f7',
    type: 'variable',
    content: 'PYTHON_VERSION',
    sourceId: 'p2.2.1',
    validated: false,
    value: '3.8+',
    metadata: {
      confidence: 0.87
    }
  });
  
  features.push({
    id: 'f8',
    type: 'summary',
    content: 'The system uses a hierarchical document model with chapters, sections, and paragraphs.',
    sourceId: 'p3.2.1',
    validated: true,
    metadata: {
      confidence: 0.85
    }
  });
  
  features.push({
    id: 'f9',
    type: 'variable',
    content: 'AUTH_METHOD',
    sourceId: 'p4.1.1',
    validated: false,
    value: 'OAuth 2.0',
    metadata: {
      confidence: 0.93
    }
  });
  
  features.push({
    id: 'f10',
    type: 'variable',
    content: 'LARGE_DOC_THRESHOLD',
    sourceId: 'p4.2.1',
    validated: true,
    value: 100,
    metadata: {
      confidence: 0.81,
      unit: 'MB'
    }
  });
  
  return {
    id: 'doc-001',
    name: 'Smart Analyzer Technical Specification v1.0',
    fileType: 'pdf',
    nodes,
    features,
    uploadedAt: new Date().toISOString()
  };
};

export const sampleDocument = createSampleDocument();
'use client';

import { useState } from 'react';
import { Search, Filter, Download, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Feature } from '@/lib/types/document';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FilterBarProps {
  onFilterChange: (value: string) => void;
  onValidationFilterChange: (value: 'all' | 'validated' | 'unvalidated') => void;
  validationFilter: 'all' | 'validated' | 'unvalidated';
  features: Feature[];
}

export const FilterBar = ({
  onFilterChange,
  onValidationFilterChange,
  validationFilter,
  features,
}: FilterBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onFilterChange(e.target.value);
  };
  
  const handleExportJSON = () => {
    const validatedFeatures = features.filter(f => f.validated);
    const jsonData = JSON.stringify(validatedFeatures, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'validated_features.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const getValidationFilterLabel = () => {
    switch (validationFilter) {
      case 'validated': return 'Validated';
      case 'unvalidated': return 'Unvalidated';
      default: return 'All Features';
    }
  };
  
  const getValidationCounts = () => {
    const validated = features.filter(f => f.validated).length;
    const unvalidated = features.filter(f => !f.validated).length;
    return { validated, unvalidated, total: features.length };
  };
  
  const counts = getValidationCounts();
  
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full mb-4">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search paragraphs and features..."
          value={searchValue}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shrink-0">
                    <Filter className="h-4 w-4 mr-2" />
                    {getValidationFilterLabel()}
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by validation status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onValidationFilterChange('all')}>
              All Features
              {validationFilter === 'all' && <Check className="ml-2 h-4 w-4" />}
              <span className="ml-auto text-muted-foreground text-xs">{counts.total}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onValidationFilterChange('validated')}>
              Validated
              {validationFilter === 'validated' && <Check className="ml-2 h-4 w-4" />}
              <span className="ml-auto text-muted-foreground text-xs">{counts.validated}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onValidationFilterChange('unvalidated')}>
              Unvalidated
              {validationFilter === 'unvalidated' && <Check className="ml-2 h-4 w-4" />}
              <span className="ml-auto text-muted-foreground text-xs">{counts.unvalidated}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleExportJSON} disabled={counts.validated === 0}>
              <Download className="mr-2 h-4 w-4" />
              Export Validated Features
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" className="shrink-0" onClick={handleExportJSON} disabled={counts.validated === 0}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export validated features as JSON</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
import React from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Globe, 
  Layers, 
  Bot, 
  Smartphone, 
  Code2, 
  LayoutGrid, 
  List,
  RotateCcw
} from 'lucide-react';
import { Category, CATEGORIES, DifficultyLevel, PricingType } from '../data/platforms';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: Category | 'All';
  onCategoryChange: (cat: Category | 'All') => void;
  selectedDifficulty: DifficultyLevel | 'All';
  onDifficultyChange: (diff: DifficultyLevel | 'All') => void;
  selectedPricing: PricingType | 'All';
  onPricingChange: (price: PricingType | 'All') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  resultCount: number;
  totalCount: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedPricing,
  onPricingChange,
  viewMode,
  onViewModeChange,
  resultCount,
  totalCount,
  onResetFilters,
  hasActiveFilters,
}) => {
  const getCategoryIcon = (cat: Category | 'All') => {
    switch (cat) {
      case 'Website builders':
        return <Globe className="h-4 w-4" />;
      case 'No-code/low-code platforms':
        return <Layers className="h-4 w-4" />;
      case 'AI website builders':
        return <Bot className="h-4 w-4" />;
      case 'App development platforms':
        return <Smartphone className="h-4 w-4" />;
      case 'Coding platforms':
        return <Code2 className="h-4 w-4" />;
      default:
        return <SlidersHorizontal className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and view toggle row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, technology (React, Flutter, Python), project type, or use case..."
            className="w-full rounded-xl border border-slate-200/90 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* View mode toggle & reset */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition shadow-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 shadow-xs">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="List view"
            >
              <List className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Categories Segmented Buttons (Interactive filter controls) */}
      <div className="overflow-x-auto scrollbar-none pb-1">
        <div className="flex items-center gap-1.5 min-w-max p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => onCategoryChange('All')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {getCategoryIcon('All')}
            <span>All Categories</span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary filter dropdowns & status summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value as DifficultyLevel | 'All')}
              className="rounded-lg border border-slate-200 bg-white py-1 px-2.5 text-xs text-slate-800 font-medium focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-xs"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner (Fast to learn)</option>
              <option value="Intermediate">Intermediate (Basic coding)</option>
              <option value="Advanced">Advanced (Deep custom code)</option>
            </select>
          </div>

          {/* Pricing Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Pricing:</span>
            <select
              value={selectedPricing}
              onChange={(e) => onPricingChange(e.target.value as PricingType | 'All')}
              className="rounded-lg border border-slate-200 bg-white py-1 px-2.5 text-xs text-slate-800 font-medium focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-xs"
            >
              <option value="All">All Pricing Tiers</option>
              <option value="100% Free">100% Free & Open Source</option>
              <option value="Free tier available">Free Tier Available</option>
              <option value="Paid (Student pack available)">Paid (Student discount)</option>
            </select>
          </div>
        </div>

        {/* Counter */}
        <div className="text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{resultCount}</span> of {totalCount} platforms
        </div>
      </div>
    </div>
  );
};

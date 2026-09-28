/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  PLATFORMS, 
  Platform, 
  Category, 
  DifficultyLevel, 
  PricingType, 
  StudentUseCaseTag 
} from './data/platforms';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PlatformCard } from './components/PlatformCard';
import { PlatformDetailModal } from './components/PlatformDetailModal';
import { TechStackDrawer } from './components/TechStackDrawer';
import { ProjectQuizModal } from './components/ProjectQuizModal';
import { StudentGuideSection } from './components/StudentGuideSection';
import { Footer } from './components/Footer';
import { 
  SearchX, 
  BookmarkCheck, 
  ArrowUp, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

export default function App() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [selectedPricing, setSelectedPricing] = useState<PricingType | 'All'>('All');
  const [selectedTag, setSelectedTag] = useState<StudentUseCaseTag | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals and drawers
  const [activeDetailPlatform, setActiveDetailPlatform] = useState<Platform | null>(null);
  const [isStackDrawerOpen, setIsStackDrawerOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Saved tech stack persisted in localStorage
  const [savedPlatformIds, setSavedPlatformIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('devstack_btech_saved');
      return saved ? JSON.parse(saved) : ['nextjs-vercel', 'supabase', 'v0'];
    } catch {
      return ['nextjs-vercel', 'supabase', 'v0'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('devstack_btech_saved', JSON.stringify(savedPlatformIds));
    } catch {
      // localStorage may fail in restricted sandboxes
    }
  }, [savedPlatformIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleToggleSave = (platform: Platform) => {
    setSavedPlatformIds((prev) => {
      const exists = prev.includes(platform.id);
      if (exists) {
        showToast(`Removed "${platform.name}" from your Tech Stack`);
        return prev.filter((id) => id !== platform.id);
      } else {
        showToast(`Added "${platform.name}" to your Tech Stack`);
        return [...prev, platform.id];
      }
    });
  };

  const handleRemoveSaved = (id: string) => {
    setSavedPlatformIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAllSaved = () => {
    setSavedPlatformIds([]);
    showToast('Cleared your Tech Stack');
  };

  const savedPlatforms = useMemo(() => {
    return PLATFORMS.filter((p) => savedPlatformIds.includes(p.id));
  }, [savedPlatformIds]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedPricing('All');
    setSelectedTag('All');
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedPricing !== 'All' ||
    selectedTag !== 'All'
  );

  // Filtered platforms
  const filteredPlatforms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return PLATFORMS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) {
        return false;
      }

      // Pricing filter
      if (selectedPricing !== 'All' && p.pricing !== selectedPricing) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'All' && !p.recommendedFor.includes(selectedTag)) {
        return false;
      }

      // Search query filter
      if (q) {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSpec = p.specialization.toLowerCase().includes(q);
        const matchesBuild = p.whatStudentsCanBuild.toLowerCase().includes(q);
        const matchesTech = p.techStack.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDiff = p.difficulty.toLowerCase().includes(q);
        const matchesIdeas = p.sampleProjectIdeas.some((idea) => idea.toLowerCase().includes(q));
        const matchesFeatures = p.keyFeatures.some((kf) => kf.toLowerCase().includes(q));

        if (
          !matchesName &&
          !matchesSpec &&
          !matchesBuild &&
          !matchesTech &&
          !matchesCat &&
          !matchesDiff &&
          !matchesIdeas &&
          !matchesFeatures
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedPricing, selectedTag]);

  const scrollToGuide = () => {
    const el = document.getElementById('btech-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs font-medium shadow-xl ring-1 ring-white/10 transition-all animate-in fade-in slide-in-from-bottom-3">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        savedCount={savedPlatformIds.length}
        onOpenSavedDrawer={() => setIsStackDrawerOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenGuide={scrollToGuide}
      />

      {/* Hero Section */}
      <Hero
        onSelectTag={(tag) => setSelectedTag(tag)}
        selectedTag={selectedTag}
        totalPlatforms={PLATFORMS.length}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search, Category Navigation & Dropdown Filters */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedPricing={selectedPricing}
          onPricingChange={setSelectedPricing}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultCount={filteredPlatforms.length}
          totalCount={PLATFORMS.length}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Platforms Grid or List */}
        <div className="mt-8">
          {filteredPlatforms.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
                <SearchX className="h-7 w-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                No matching platforms found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
                No tools matched your current combination of search terms and filters. Try clearing some filters or searching for terms like &ldquo;React&rdquo;, &ldquo;Flutter&rdquo;, &ldquo;Supabase&rdquo;, or &ldquo;No-Code&rdquo;.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredPlatforms.map((platform) => (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  isSaved={savedPlatformIds.includes(platform.id)}
                  onToggleSave={handleToggleSave}
                  onOpenDetails={(p) => setActiveDetailPlatform(p)}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>

        {/* Student Advice & Viva Guide Section */}
        <StudentGuideSection id="btech-guide" />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenGuide={scrollToGuide}
      />

      {/* Platform Detail & Project Viva Modal */}
      <PlatformDetailModal
        platform={activeDetailPlatform}
        onClose={() => setActiveDetailPlatform(null)}
        isSaved={activeDetailPlatform ? savedPlatformIds.includes(activeDetailPlatform.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Project Stack Matchmaker Quiz Modal */}
      <ProjectQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectPlatform={(platform) => {
          setActiveDetailPlatform(platform);
        }}
      />

      {/* My Tech Stack / Synopsis Export Drawer */}
      <TechStackDrawer
        isOpen={isStackDrawerOpen}
        onClose={() => setIsStackDrawerOpen(false)}
        savedPlatforms={savedPlatforms}
        onRemovePlatform={handleRemoveSaved}
        onClearAll={handleClearAllSaved}
        onOpenDetails={(p) => {
          setIsStackDrawerOpen(false);
          setActiveDetailPlatform(p);
        }}
      />
    </div>
  );
}

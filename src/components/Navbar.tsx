import React from 'react';
import { 
  GraduationCap, 
  Bookmark, 
  Sparkles, 
  Layers, 
  Code2, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onOpenQuiz: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  onOpenSavedDrawer,
  onOpenQuiz,
  onOpenGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10">
            <GraduationCap className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900 text-base sm:text-lg">
                DevStack <span className="text-indigo-600 font-extrabold">BTech</span>
              </span>
              <span className="hidden sm:inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                Student Directory
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Web & App Builder Ecosystem for Engineering Students
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenQuiz}
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/70 px-3 py-1.5 text-xs font-semibold text-indigo-800 transition hover:bg-indigo-100/90 active:scale-95"
            title="Get recommendations based on your project requirements"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Stack</span> Matchmaker
          </button>

          <button
            onClick={onOpenGuide}
            type="button"
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95"
          >
            <BookOpen className="h-3.5 w-3.5 text-slate-500" />
            BTech Project Guide
          </button>

          <button
            onClick={onOpenSavedDrawer}
            type="button"
            className="relative flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-95"
            title="View selected tech stack for your project report"
          >
            <Bookmark className="h-3.5 w-3.5 text-indigo-300" />
            <span>My Tech Stack</span>
            {savedCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

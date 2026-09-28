import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  CheckCircle2, 
  Hammer, 
  GraduationCap, 
  Lightbulb, 
  Code2, 
  Coins, 
  Cpu
} from 'lucide-react';
import { Platform } from '../data/platforms';

interface PlatformDetailModalProps {
  platform: Platform | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (platform: Platform) => void;
}

export const PlatformDetailModal: React.FC<PlatformDetailModalProps> = ({
  platform,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!platform) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-200/90 p-5 sm:p-6 bg-slate-50/70">
          <div>
            <div className="text-xs font-semibold text-indigo-600 mb-1">
              {platform.category}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {platform.name}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Difficulty: <strong className="text-slate-700">{platform.difficulty}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Pricing: <strong className="text-slate-700">{platform.pricing}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Specialization */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Core Specialization
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {platform.specialization}
            </p>
          </div>

          {/* What Students Can Build */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 mb-2">
              <Hammer className="h-4 w-4 text-indigo-600" />
              What BTech Students Can Build
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {platform.whatStudentsCanBuild}
            </p>
          </div>

          {/* Sample BTech Project Ideas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Sample Project Ideas for Viva & Submissions
            </h4>
            <ul className="space-y-2">
              {platform.sampleProjectIdeas.map((idea, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why BTech Students Love It */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              Why BTech Students Love It
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {platform.whyBTechStudentsLoveIt}
            </p>
          </div>

          {/* Pricing & Student Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-3.5 bg-white">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
                <Coins className="h-3.5 w-3.5 text-emerald-600" />
                Pricing Details
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {platform.pricingNote}
              </p>
            </div>

            {platform.studentPerks && (
              <div className="rounded-xl border border-slate-200 p-3.5 bg-white">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                  Student Benefits & Perks
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {platform.studentPerks}
                </p>
              </div>
            )}
          </div>

          {/* Key Features & Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-slate-500" />
              Key Capabilities & Underlying Tech
            </h4>
            
            <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2.5 border border-slate-100 font-mono">
              Tech Stack: {platform.techStack}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {platform.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200/90 p-4 sm:p-5 bg-slate-50">
          <button
            onClick={() => onToggleSave(platform)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border transition ${
              isSaved
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4 text-indigo-600" /> : <Bookmark className="h-4 w-4" />}
            <span>{isSaved ? 'In My Tech Stack' : 'Save to My Tech Stack'}</span>
          </button>

          <div className="flex items-center gap-2">
            {platform.docsUrl && (
              <a
                href={platform.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              >
                <BookOpen className="h-3.5 w-3.5 text-slate-500" />
                <span>Documentation</span>
              </a>
            )}

            <a
              href={platform.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-600 transition shadow-sm"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

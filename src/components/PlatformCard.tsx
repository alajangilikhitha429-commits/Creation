import React from 'react';
import { 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Hammer, 
  GraduationCap, 
  Zap, 
  Check,
  Code2
} from 'lucide-react';
import { Platform } from '../data/platforms';

interface PlatformCardProps {
  platform: Platform;
  isSaved: boolean;
  onToggleSave: (platform: Platform) => void;
  onOpenDetails: (platform: Platform) => void;
  viewMode: 'grid' | 'list';
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  isSaved,
  onToggleSave,
  onOpenDetails,
  viewMode,
}) => {
  // Difficulty styling - unboxed quiet color accent
  const getDifficultyColor = (diff: Platform['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-700 bg-emerald-50/80 border-emerald-200/60';
      case 'Intermediate':
        return 'text-amber-700 bg-amber-50/80 border-amber-200/60';
      case 'Advanced':
        return 'text-rose-700 bg-rose-50/80 border-rose-200/60';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getPricingBadge = (pricing: Platform['pricing']) => {
    if (pricing === '100% Free') {
      return 'text-emerald-700 font-semibold';
    }
    if (pricing === 'Free tier available') {
      return 'text-indigo-700 font-medium';
    }
    return 'text-slate-700 font-medium';
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            {/* Header: Title and unboxed metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {platform.name}
              </h3>
              
              {/* Unboxed metadata row with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>{platform.category}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${getDifficultyColor(platform.difficulty)}`}>
                  {platform.difficulty}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className={getPricingBadge(platform.pricing)}>
                  {platform.pricing}
                </span>
              </div>
            </div>

            {/* Specialization */}
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              <span className="font-semibold text-slate-800">Specializes in:</span> {platform.specialization}
            </p>

            {/* What students can build */}
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
                <Hammer className="h-3.5 w-3.5 text-indigo-600" />
                <span>What students can build:</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {platform.whatStudentsCanBuild}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center lg:flex-col lg:justify-center gap-2 pt-2 lg:pt-0 shrink-0">
            <button
              onClick={() => onToggleSave(platform)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                isSaved 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              title={isSaved ? 'Remove from saved stack' : 'Add to my tech stack'}
            >
              {isSaved ? <BookmarkCheck className="h-3.5 w-3.5 text-indigo-600" /> : <Bookmark className="h-3.5 w-3.5 text-slate-400" />}
              <span>{isSaved ? 'In Stack' : 'Save Stack'}</span>
            </button>

            <button
              onClick={() => onOpenDetails(platform)}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              <span>Viva & Ideas</span>
            </button>

            <a
              href={platform.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-indigo-600 transition shadow-xs"
            >
              <span>Visit</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <div className="space-y-3.5">
        {/* Top Header: Unboxed metadata */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">
              {platform.category}
            </div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              {platform.name}
            </h3>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(platform)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
              isSaved
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-700'
            }`}
            title={isSaved ? 'Remove from saved stack' : 'Add to my tech stack'}
            aria-label="Bookmark platform"
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-indigo-600" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Difficulty & Pricing status row */}
        <div className="flex items-center gap-2 text-xs font-medium border-y border-slate-100 py-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${getDifficultyColor(platform.difficulty)}`}>
            {platform.difficulty}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className={`text-xs ${getPricingBadge(platform.pricing)}`}>
            {platform.pricing}
          </span>
        </div>

        {/* Specialization */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Specialization
          </div>
          <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
            {platform.specialization}
          </p>
        </div>

        {/* What students can build with it */}
        <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 text-xs">
          <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1.5">
            <Hammer className="h-3.5 w-3.5 text-indigo-600" />
            <span>What students can build:</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-xs">
            {platform.whatStudentsCanBuild}
          </p>
        </div>

        {/* Tech Stack & Student Note */}
        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1 truncate">
            <Code2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{platform.techStack}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onOpenDetails(platform)}
          className="flex-1 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition text-center"
        >
          Project Ideas & Tips
        </button>

        <a
          href={platform.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-600 transition shadow-xs shrink-0"
        >
          <span>Official Site</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  Code2, 
  Laptop, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  FolderGit2
} from 'lucide-react';
import { StudentUseCaseTag } from '../data/platforms';

interface HeroProps {
  onSelectTag: (tag: StudentUseCaseTag | 'All') => void;
  selectedTag: StudentUseCaseTag | 'All';
  totalPlatforms: number;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectTag,
  selectedTag,
  totalPlatforms,
}) => {
  const quickTags: { tag: StudentUseCaseTag; label: string; desc: string }[] = [
    { tag: 'Hackathon MVP', label: '24h Hackathon MVP', desc: 'Fast turnaround, zero-config' },
    { tag: 'Major Project', label: '7th/8th Sem Capstone', desc: 'Custom code, database, auth' },
    { tag: 'Portfolio', label: 'Placement Portfolio', desc: 'Showcase projects to recruiters' },
    { tag: 'Mobile App', label: 'Android / iOS App', desc: 'Native or cross-platform' },
    { tag: 'Internal Tool', label: 'College Fest & Lab Tools', desc: 'Admin dashboards, portals' }
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-10 sm:py-14">
      {/* Background subtle grid pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Student context pill banner */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3 py-1 text-xs font-medium text-indigo-900 mb-5">
            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>Built for BTech CSE, IT, ECE & Engineering Students</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Popular Platforms for Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800">Websites & Apps</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From overnight hackathon prototypes to final year capstone submissions. 
            Explore verified tools, difficulty curves, student free tiers, and what you can build for college credits.
          </p>

          {/* Quick stats banner */}
          <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{totalPlatforms} Curated Platforms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              <span>5 Industry Categories</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-violet-600" />
              <span>GitHub Student Pack perks verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
              <span>Academic viva & project recommendations</span>
            </div>
          </div>
        </div>

        {/* Quick Project Intention Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200/70">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Filter by BTech Project Goal
            </span>
            {selectedTag !== 'All' && (
              <button
                onClick={() => onSelectTag('All')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition"
              >
                Clear goal filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {quickTags.map(({ tag, label, desc }) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag(isSelected ? 'All' : tag)}
                  className={`group relative text-left rounded-xl p-3 border transition-all text-xs ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                      : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="font-semibold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
                    <span>{label}</span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                    {desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

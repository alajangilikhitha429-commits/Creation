import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  GraduationCap, 
  Layers, 
  FileText,
  Bookmark
} from 'lucide-react';
import { Platform } from '../data/platforms';

interface TechStackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlatforms: Platform[];
  onRemovePlatform: (id: string) => void;
  onClearAll: () => void;
  onOpenDetails: (platform: Platform) => void;
}

export const TechStackDrawer: React.FC<TechStackDrawerProps> = ({
  isOpen,
  onClose,
  savedPlatforms,
  onRemovePlatform,
  onClearAll,
  onOpenDetails,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateSynopsisText = () => {
    let text = `# B.Tech Project Proposed Tech Stack\n\n`;
    text += `Generated from DevStack BTech Directory for Engineering Students.\n\n`;

    savedPlatforms.forEach((p, idx) => {
      text += `### ${idx + 1}. ${p.name} (${p.category})\n`;
      text += `- **Specialization**: ${p.specialization}\n`;
      text += `- **Project Scope / Deliverables**: ${p.whatStudentsCanBuild}\n`;
      text += `- **Difficulty / Learning Curve**: ${p.difficulty}\n`;
      text += `- **License & Pricing**: ${p.pricing} (${p.pricingNote})\n`;
      text += `- **Official Documentation**: ${p.officialUrl}\n\n`;
    });

    return text;
  };

  const handleCopySynopsis = async () => {
    try {
      await navigator.clipboard.writeText(generateSynopsisText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="relative w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Bookmark className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  My Project Tech Stack
                </h3>
                <p className="text-xs text-slate-500">
                  {savedPlatforms.length} platform{savedPlatforms.length === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {savedPlatforms.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
                  <Bookmark className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Your Tech Stack is Empty
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Click the bookmark icon on any platform to shortlist it for your project report or viva presentation.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                  <span>Selected for your project proposal</span>
                  <button
                    onClick={onClearAll}
                    className="text-rose-600 hover:text-rose-700 font-medium transition"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-3">
                  {savedPlatforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="group rounded-xl border border-slate-200 p-3.5 bg-white shadow-xs hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-semibold text-indigo-600">
                            {platform.category}
                          </div>
                          <h4 
                            onClick={() => onOpenDetails(platform)}
                            className="text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                          >
                            {platform.name}
                          </h4>
                        </div>

                        <button
                          onClick={() => onRemovePlatform(platform.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition"
                          title="Remove from stack"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {platform.whatStudentsCanBuild}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                        <span className="text-slate-500 text-[11px]">
                          {platform.difficulty} · {platform.pricing}
                        </span>
                        <a
                          href={platform.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          <span>Site</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer with Copy Synopsis Button */}
          {savedPlatforms.length > 0 && (
            <div className="border-t border-slate-200 p-5 bg-slate-50 space-y-3">
              <button
                onClick={handleCopySynopsis}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition shadow-sm"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Tech Stack for Project Synopsis'}</span>
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Exports formatted markdown ready to paste into your synopsis or viva presentation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { GraduationCap, Heart, ExternalLink, Code2, Globe } from 'lucide-react';
import { CATEGORIES, Category } from '../data/platforms';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenGuide }) => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <GraduationCap className="h-4 w-4 text-indigo-400" />
              </div>
              <span className="font-bold text-slate-900 text-base">
                DevStack <span className="text-indigo-600">BTech</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs max-w-md leading-relaxed">
              An open resource directory curated for Bachelor of Technology (BTech) computer science, information technology, and engineering students looking for the right tools to build software projects, hackathons, and placement portfolios.
            </p>
            <div className="text-[11px] text-slate-400 pt-2">
              All platform trademarks and official links belong to their respective creators.
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 320, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 transition text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Student Resources */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Student Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={onOpenGuide}
                  className="hover:text-indigo-600 transition text-left"
                >
                  Project & Viva Defense Guide
                </button>
              </li>
              <li>
                <a 
                  href="https://education.github.com/pack" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600 transition"
                >
                  <span>GitHub Student Pack</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://webflow.com/classroom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600 transition"
                >
                  <span>Webflow for Education</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://flutter.dev/learn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600 transition"
                >
                  <span>Flutter Student Tutorials</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            DevStack BTech · Curated Directory for Engineering Students
          </div>
          <div>
            Responsive · Free tier verified · Academic project ready
          </div>
        </div>
      </div>
    </footer>
  );
};

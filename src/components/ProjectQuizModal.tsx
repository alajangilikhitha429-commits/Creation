import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { Platform, PLATFORMS } from '../data/platforms';

interface ProjectQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlatform: (platform: Platform) => void;
}

export const ProjectQuizModal: React.FC<ProjectQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectPlatform,
}) => {
  const [step, setStep] = useState<number>(1);
  const [projectGoal, setProjectGoal] = useState<string>('');
  const [codingSkill, setCodingSkill] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setProjectGoal('');
    setCodingSkill('');
    setPriority('');
  };

  // Compute recommendations
  const getRecommendations = (): Platform[] => {
    let matches = [...PLATFORMS];

    if (projectGoal === 'major') {
      matches = matches.filter(p => p.recommendedFor.includes('Major Project'));
    } else if (projectGoal === 'hackathon') {
      matches = matches.filter(p => p.recommendedFor.includes('Hackathon MVP'));
    } else if (projectGoal === 'portfolio') {
      matches = matches.filter(p => p.recommendedFor.includes('Portfolio'));
    } else if (projectGoal === 'mobile') {
      matches = matches.filter(p => p.recommendedFor.includes('Mobile App'));
    } else if (projectGoal === 'internal') {
      matches = matches.filter(p => p.recommendedFor.includes('Internal Tool'));
    }

    if (codingSkill === 'zero') {
      matches = matches.filter(p => p.difficulty === 'Beginner');
    } else if (codingSkill === 'code') {
      matches = matches.filter(p => p.difficulty === 'Intermediate' || p.difficulty === 'Advanced');
    }

    if (priority === 'free') {
      matches = matches.filter(p => p.pricing === '100% Free' || p.pricing === 'Free tier available');
    }

    return matches.slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden my-8 ring-1 ring-slate-900/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-indigo-50/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                BTech Stack Matchmaker
              </h3>
              <p className="text-xs text-slate-500">
                Answer 3 quick questions to discover your ideal platform
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
            aria-label="Close matchmaker"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quiz Steps */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Step 1 of 3</span>
                <span>Project Goal</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                What are you building for college?
              </h4>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'hackathon', title: '24-48h Hackathon Prototype', desc: 'Need lightning-fast working MVP with minimum setup' },
                  { id: 'major', title: 'Final Year Major Project / Capstone', desc: 'Need scalable architecture, real database, and code to show external examiner' },
                  { id: 'portfolio', title: 'Placement Resume Portfolio', desc: 'Stunning personal website to showcase projects to campus recruiters' },
                  { id: 'mobile', title: 'Android or iOS Mobile Application', desc: 'Campus utility, sensor app, or cross-platform utility' },
                  { id: 'internal', title: 'DBMS Lab Project / College Admin Tool', desc: 'Internal CRUD dashboard, attendance tracker, or library portal' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setProjectGoal(item.id);
                      setStep(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-xs group"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 text-sm">
                      {item.title}
                    </div>
                    <div className="text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Step 2 of 3</span>
                <span>Coding Experience</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                What is your team's coding comfort level?
              </h4>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'zero', title: 'No-Code or AI Prompts Preferred', desc: 'Want visual drag & drop or text-to-website AI generators' },
                  { id: 'some', title: 'Comfortable with HTML/CSS & Basic JavaScript', desc: 'Can tweak templates, write simple functions and queries' },
                  { id: 'code', title: 'Full Code Control (React, Dart, TypeScript, SQL)', desc: 'Want genuine source code to inspect, compile, and commit to GitHub' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCodingSkill(item.id);
                      setStep(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-xs group"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 text-sm">
                      {item.title}
                    </div>
                    <div className="text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Step 3 of 3</span>
                <span>Key Constraint</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                What is your #1 priority?
              </h4>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'free', title: '100% Free / Generous Student Tier', desc: 'No credit card required; works on student budgets or GitHub pack' },
                  { id: 'speed', title: 'Fastest Possible Deployment', desc: 'Live URL in minutes to share with teammates and evaluators' },
                  { id: 'resume', title: 'Maximum Resume & Placement Value', desc: 'Teaches skills actively sought by campus hiring companies' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPriority(item.id);
                      setStep(4);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-xs group"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 text-sm">
                      {item.title}
                    </div>
                    <div className="text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Recommendation Ready
                </span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Start over</span>
                </button>
              </div>

              <h4 className="text-lg font-bold text-slate-900">
                Top Matches for Your Project:
              </h4>

              <div className="space-y-3 pt-1">
                {recommendations.map((plat) => (
                  <div
                    key={plat.id}
                    className="rounded-xl border border-slate-200 p-4 bg-slate-50/80 hover:bg-white hover:border-indigo-300 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-medium text-slate-500">
                          {plat.category}
                        </div>
                        <div className="text-base font-bold text-slate-900">
                          {plat.name}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {plat.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {plat.whatStudentsCanBuild}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-[11px] text-slate-500">
                        {plat.pricing}
                      </span>
                      <button
                        onClick={() => {
                          onSelectPlatform(plat);
                          onClose();
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 4 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50 text-xs">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                Back
              </button>
            ) : (
              <span className="text-slate-400">Takes 20 seconds</span>
            )}
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 font-medium"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

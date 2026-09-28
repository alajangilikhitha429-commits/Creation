import React from 'react';
import { 
  GraduationCap, 
  Lightbulb, 
  ShieldCheck, 
  AlertTriangle, 
  Gift, 
  Database,
  ArrowUpRight
} from 'lucide-react';

interface StudentGuideSectionProps {
  id?: string;
}

export const StudentGuideSection: React.FC<StudentGuideSectionProps> = ({ id }) => {
  return (
    <section id={id} className="my-16 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
          <GraduationCap className="h-4 w-4" />
          <span>BTech Engineering Handbook</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Smart Advice for College Web & App Projects
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          How to ace your project reviews, pick the right architecture for your team, and maximize placement value without getting grilled by external examiners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Mini vs Major */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <Lightbulb className="h-4 w-4" />
            </div>
            <span>Mini Project vs Final Year Capstone</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            For <strong>3rd Year Mini-Projects</strong> or hackathons, tools like <em>FlutterFlow</em>, <em>v0</em>, or <em>Appsmith</em> get you a working prototype in days. For <strong>7th/8th Semester Major Projects</strong>, external examiners expect code ownership. Use <em>Next.js</em>, <em>Flutter</em>, or <em>React Native</em> with <em>Supabase/PostgreSQL</em> to explain your architecture diagrams and database normal forms.
          </p>
        </div>

        {/* Card 2: Student Perks */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
              <Gift className="h-4 w-4" />
            </div>
            <span>Claim the GitHub Student Pack</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Never pay for domains or hosting during college. Apply for the <strong>GitHub Student Developer Pack</strong> using your college ID or roll-number email (.edu / .ac.in). You get free domain names from Namecheap/Name.com, free GitHub Codespaces compute hours, Canva Pro, and free JetBrains IDE licenses.
          </p>
        </div>

        {/* Card 3: Free Cloud Limits */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Database className="h-4 w-4" />
            </div>
            <span>Database Free Tiers: Firebase vs Supabase</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            If your project involves chat or live updates, <strong>Firebase Spark Plan</strong> has no time limit and free authentication. If your syllabus requires SQL queries, tables, and foreign keys for DBMS marks, choose <strong>Supabase</strong> (gives you 2 real PostgreSQL databases with vector search for AI projects).
          </p>
        </div>

        {/* Card 4: Viva Defense Tips */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <span>Viva Tip: The "Did you write this?" Test</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            If using AI website builders (like <em>Bolt.new</em> or <em>v0</em>), always export the code into your GitHub repo, understand the component hierarchy, and know how state variables (like React <code>useState</code>) work. External evaluators often ask students to change a button color or add a new column live!
          </p>
        </div>
      </div>
    </section>
  );
};

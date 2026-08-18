"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TerminalSquare, Code, Play, CheckCircle2 } from "lucide-react";
import { practiceProblems } from "../../data/practiceProblems";

export default function PracticeHubPage() {
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const solved = JSON.parse(localStorage.getItem('solved_problems') || '[]');
      setSolvedProblems(solved);
    } catch(e) {}
  }, []);

  const getDifficultyColor = (diff: string) => {
    if (diff === "Easy") return "text-green-600 bg-green-50 border-green-200";
    if (diff === "Medium") return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-canvas border-b border-hairline-soft py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-editorial text-[42px] leading-[1.1] tracking-[-0.5px] text-ink mb-4 flex items-center gap-4">
            <TerminalSquare className="h-10 w-10 text-primary" /> Practice Arena
          </h1>
          <p className="text-[18px] text-slate max-w-2xl">
            Sharpen your problem-solving skills. Write, run, and test algorithms directly in the browser.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceProblems.map((prob, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={prob.id}
            >
              <Link href={`/practice/${prob.id}`} className="block h-full">
                <div className="card-base h-full hover:border-primary transition-all hover:shadow-sm flex flex-col group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border ${getDifficultyColor(prob.difficulty)}`}>
                      {prob.difficulty}
                    </span>
                    {solvedProblems.includes(prob.id) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Code className="h-5 w-5 text-stone group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-primary transition-colors">
                    {prob.title}
                  </h3>
                  <p className="text-slate text-sm mb-6 flex-1 line-clamp-3">
                    {prob.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-ink group-hover:text-primary">
                    Solve Problem <Play className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

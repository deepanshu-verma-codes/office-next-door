"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Code2, Layers, ChevronRight } from "lucide-react";
import { learnData } from "../../data/learnTopics";
import { Tech } from "../../data/types";

export default function LearnHubPage() {
  const [selectedTech, setSelectedTech] = useState<Tech>("JavaScript");
  const [visibleCount, setVisibleCount] = useState(10);
  const itemsPerPage = 10;

  const techs: Tech[] = ["JavaScript", "React", "TypeScript", "Node.js"];

  const filteredTopics = learnData.filter(
    (t) => t.tech === selectedTech
  );

  const paginatedTopics = filteredTopics.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTopics.length;

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-canvas border-b border-hairline-soft py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-editorial text-[42px] leading-[1.1] tracking-[-0.5px] text-ink mb-4 flex items-center gap-4">
            <BookOpen className="h-10 w-10 text-primary" /> OfficeNextDoor Learn
          </h1>
          <p className="text-[18px] text-slate max-w-2xl">
            Master the core concepts of full-stack development. Select your technology to get tailored, production-grade learning materials.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
                <Code2 className="h-4 w-4" /> Technology
              </h3>
              <div className="flex flex-col gap-2">
                {techs.map(tech => (
                  <button
                    key={tech}
                    onClick={() => { setSelectedTech(tech); setVisibleCount(10); }}
                    className={`px-4 py-2 text-left rounded-md transition-colors text-sm font-medium ${
                      selectedTech === tech 
                        ? 'bg-primary text-white' 
                        : 'bg-canvas border border-hairline text-slate hover:border-primary hover:text-primary'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center gap-3">
              <Layers className="h-5 w-5 text-stone" />
              <h2 className="text-xl font-bold text-ink">
                Topics for {selectedTech}
              </h2>
            </div>

            {filteredTopics.length === 0 ? (
              <div className="card-base text-center py-16 border-dashed">
                <BookOpen className="h-12 w-12 text-stone mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-ink mb-2">No topics found</h3>
                <p className="text-slate text-sm">We are actively adding new curriculum for this technology. Check back soon!</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedTopics.map((topic, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (i % 10) * 0.05 }}
                      key={topic.id}
                    >
                      <Link href={`/learn/${topic.id}`} className="block h-full">
                        <div className="card-base h-full hover:border-primary transition-all hover:shadow-sm flex flex-col group cursor-pointer">
                          <h3 className="text-lg font-bold text-ink mb-2 mt-2 group-hover:text-primary transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-slate text-sm mb-6 flex-1">
                            {topic.description}
                          </p>
                          <div className="flex items-center text-sm font-medium text-ink group-hover:text-primary">
                            Start Deep Dive <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-8 flex justify-center border-t border-hairline-soft pt-8">
                    <button
                      onClick={() => setVisibleCount(v => v + itemsPerPage)}
                      className="px-6 py-2.5 border border-hairline font-medium text-[14px] text-ink hover:bg-surface-cream transition-colors rounded"
                    >
                      Load More Topics
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

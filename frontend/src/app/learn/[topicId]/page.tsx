"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, RotateCcw, Monitor, Code, BookOpen } from "lucide-react";
import { learnData } from "../../../data/learnTopics";

export default function TopicPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const topic = learnData.find(t => t.id === topicId);
  
  const [currentStep, setCurrentStep] = useState(0);

  if (!topic) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-ink mb-4">Topic not found</h2>
        <Link href="/learn" className="button-primary">Back to Learn Hub</Link>
      </div>
    );
  }

  const steps = topic.animationSteps;
  const state = steps[currentStep].diagramState;

  // Custom diagram renderer based on topic.diagramType
  const renderDiagram = () => {
    if (topic.diagramType === "event-loop") {
      return (
        <div className="flex gap-4 h-full w-full p-4 font-mono text-sm">
          {/* Call Stack */}
          <div className="flex-1 bg-white border border-hairline-strong rounded-md flex flex-col overflow-hidden">
            <div className="bg-hairline-soft p-2 text-center font-bold text-ink border-b border-hairline-strong">Call Stack</div>
            <div className="flex-1 p-4 flex flex-col-reverse gap-2">
              <AnimatePresence>
                {state.stack.map((item: string, i: number) => (
                  <motion.div 
                    key={item + i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-primary/10 border border-primary/30 text-primary p-2 rounded text-center truncate"
                  >
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            {/* Web/C++ APIs */}
            <div className="flex-1 bg-white border border-hairline-strong rounded-md flex flex-col overflow-hidden">
              <div className="bg-hairline-soft p-2 text-center font-bold text-ink border-b border-hairline-strong">Node APIs</div>
              <div className="flex-1 p-4 flex flex-col gap-2">
                <AnimatePresence>
                  {state.webApis.map((item: string, i: number) => (
                    <motion.div 
                      key={item + i} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-purple-100 border border-purple-300 text-purple-700 p-2 rounded text-center truncate"
                    >
                      {item}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            {/* Callback Queue */}
            <div className="flex-1 bg-white border border-hairline-strong rounded-md flex flex-col overflow-hidden">
              <div className="bg-hairline-soft p-2 text-center font-bold text-ink border-b border-hairline-strong">Callback Queue</div>
              <div className="flex-1 p-4 flex flex-row gap-2 overflow-x-auto items-center">
                <AnimatePresence>
                  {state.queue.map((item: string, i: number) => (
                    <motion.div 
                      key={item + i} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="bg-blue-100 border border-blue-300 text-blue-700 p-2 rounded shrink-0"
                    >
                      {item}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (topic.diagramType === "tree") {
      return (
        <div className="h-full w-full p-8 flex flex-col items-center justify-center font-mono text-sm relative">
          <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 bg-slate text-white rounded">
            Phase: {state.phase?.toUpperCase() || "IDLE"}
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col items-center gap-4">
              {state.activeNodes?.map((node: string, i: number) => (
                <motion.div 
                  key={node + i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-3 rounded-lg border-2 text-center w-40 ${
                    node.includes("WIP") 
                      ? "border-orange-400 bg-orange-50 text-orange-700 border-dashed" 
                      : "border-green-500 bg-green-50 text-green-700"
                  }`}
                >
                  {node}
                </motion.div>
              ))}
            </div>
          </div>
          
          {state.browser && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg flex items-center gap-2"
            >
              <Monitor className="h-5 w-5" /> Browser: {state.browser}
            </motion.div>
          )}
        </div>
      );
    }

    if (topic.diagramType === "memory" || topic.diagramType === "terminal") {
      return (
        <div className="h-full w-full p-6 flex flex-col items-center justify-center font-mono text-sm">
          <motion.div 
            key={state.env}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm bg-white border-2 border-indigo-200 rounded-lg overflow-hidden shadow-sm"
          >
            <div className="bg-indigo-50 p-3 font-bold text-indigo-900 border-b border-indigo-200 text-center">
              Execution Context: {state.env}
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="text-xs text-slate uppercase tracking-wider mb-2 font-bold">Local Memory</div>
                {Object.entries(state.vars || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between bg-slate-50 p-2 rounded text-ink border border-hairline">
                    <span>{k}:</span>
                    <span className="text-primary font-bold">{String(v)}</span>
                  </div>
                ))}
              </div>
              
              {state.closure && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="text-xs text-purple-600 uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Closure (Backpack)
                  </div>
                  {Object.entries(state.closure || {}).map(([k, v]) => (
                    <div key={k} className="flex justify-between bg-purple-50 p-2 rounded text-purple-900 border border-purple-200">
                      <span>{k}:</span>
                      <span className="font-bold">{String(v)}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      );
    }

    return <div>Diagram not implemented for this topic yet.</div>;
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-canvas border-b border-hairline-soft py-8 px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/learn" className="text-[14px] font-medium text-steel hover:text-ink flex items-center gap-2 mb-6 w-max">
            <ArrowLeft className="h-4 w-4" /> Back to Topics
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
              {topic.tech}
            </span>
          </div>
          <h1 className="font-editorial text-[36px] leading-[1.1] text-ink mb-4">
            {topic.title}
          </h1>
          <p className="text-[18px] text-slate max-w-3xl">
            {topic.description}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Explanation & Code */}
        <div className="space-y-8">
          <section>
            <div className="font-bold text-ink p-4 bg-primary/5 rounded-md border border-primary/20 leading-relaxed text-[17px]">
              {topic.definition}
            </div>
          </section>

          <section className="bg-canvas border border-hairline-strong rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-2 text-primary">Interview Question</h3>
            <p className="text-ink font-medium mb-4">"{topic.interviewAsk}"</p>
            
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-2 text-green-600">How to Answer</h3>
            <p className="text-slate text-[15px] leading-relaxed">
              {topic.interviewAnswer}
            </p>
          </section>

          {topic.syntax && (
            <section>
              <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-stone" /> Syntax
              </h2>
              <div className="bg-slate-50 border border-hairline rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-ink">
                  <code>{topic.syntax}</code>
                </pre>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" /> Live Code Example
            </h2>
            <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-x-auto shadow-inner">
              <pre className="text-sm font-mono text-gray-300">
                <code>{topic.codeExample}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* Right Column: Interactive Diagram */}
        <div className="sticky top-24 h-max">
          <div className="bg-canvas rounded-xl shadow-sm border border-hairline-strong overflow-hidden flex flex-col h-[500px]">
            {/* Diagram Header */}
            <div className="bg-ink text-white px-4 py-3 flex items-center justify-between">
              <div className="font-medium text-sm flex items-center gap-2">
                <Monitor className="h-4 w-4" /> Interactive Architecture
              </div>
              <div className="text-xs font-mono text-stone">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>

            {/* Diagram Visualization Area */}
            <div className="flex-1 bg-surface-cream relative overflow-hidden">
              {renderDiagram()}
            </div>

            {/* Diagram Controls & Step Info */}
            <div className="p-6 border-t border-hairline-soft bg-canvas">
              <h3 className="font-bold text-ink mb-2">{steps[currentStep].title}</h3>
              <p className="text-sm text-slate mb-6 min-h-[40px]">
                {steps[currentStep].description}
              </p>
              
              <div className="flex items-center gap-3">
                <button 
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(c => c - 1)}
                  className="px-4 py-2 border border-hairline-strong rounded-md text-sm font-medium text-ink hover:bg-surface disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <button 
                  disabled={currentStep === steps.length - 1}
                  onClick={() => setCurrentStep(c => c + 1)}
                  className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-deep disabled:opacity-50 transition-colors flex-1"
                >
                  Next Step
                </button>
                <button 
                  onClick={() => setCurrentStep(0)}
                  className="p-2 border border-hairline-strong rounded-md text-stone hover:text-ink hover:bg-surface transition-colors"
                  title="Reset Animation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

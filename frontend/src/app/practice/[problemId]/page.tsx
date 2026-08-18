"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Play, Terminal, CheckCircle2, XCircle, Code } from "lucide-react";
import { practiceProblems } from "../../../data/practiceProblems";

export default function ProblemPage() {
  const params = useParams();
  const problemId = params.problemId as string;
  const problem = practiceProblems.find(p => p.id === problemId);
  
  const [code, setCode] = useState(problem?.starterCode || "");
  const [output, setOutput] = useState<{ type: "log" | "error" | "success"; msg: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  if (!problem) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-ink mb-4">Problem not found</h2>
        <Link href="/practice" className="button-primary">Back to Practice</Link>
      </div>
    );
  }

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Slight delay to simulate compilation/running
    setTimeout(() => {
      const runResults: typeof output = [];
      let passedAll = true;
      
      const fakeConsole = {
        log: (...args: any[]) => {
          runResults.push({ type: "log", msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(" ") });
        }
      };

      try {
        // Find the function name from the starter code
        const funcMatch = problem.starterCode.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
        const funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
          throw new Error("Could not detect function name in starter code.");
        }

        // We wrap the user's code and execution inside a new Function.
        // It provides access to a fake console and runs the test cases.
        let testRunnerCode = `
          ${code}
          
          let results = [];
          const testCases = ${JSON.stringify(problem.testCases)};
          
          testCases.forEach((tc, idx) => {
            try {
              // We evaluate the arguments and the expected output
              // Example: if tc.input is "[2,7,11,15], 9", we run \`${funcName}([2,7,11,15], 9)\`
              const actual = eval('${funcName}(' + tc.input + ')');
              const expected = eval('(' + tc.expected + ')');
              
              // Basic deep equality check for arrays/objects, or simple equality for primitives
              const actualStr = JSON.stringify(actual);
              const expectedStr = JSON.stringify(expected);
              
              if (actualStr === expectedStr) {
                results.push({ pass: true, msg: 'Test Case ' + (idx + 1) + ' Passed!' });
              } else {
                results.push({ pass: false, msg: 'Test Case ' + (idx + 1) + ' Failed: Expected ' + expectedStr + ' but got ' + actualStr });
              }
            } catch (err) {
              results.push({ pass: false, msg: 'Test Case ' + (idx + 1) + ' Error: ' + err.message });
            }
          });
          
          return results;
        `;

        const executeUserCode = new Function('console', testRunnerCode);
        const testResults = executeUserCode(fakeConsole);
        
        testResults.forEach((tr: any) => {
          if (tr.pass) {
            runResults.push({ type: "success", msg: tr.msg });
          } else {
            passedAll = false;
            runResults.push({ type: "error", msg: tr.msg });
          }
        });

        if (passedAll) {
          runResults.push({ type: "success", msg: "All test cases passed! Great job!" });
          
          try {
            const solved = JSON.parse(localStorage.getItem('solved_problems') || '[]');
            if (!solved.includes(problemId)) {
              solved.push(problemId);
              localStorage.setItem('solved_problems', JSON.stringify(solved));
            }
          } catch(e) {}
        }

      } catch (err: any) {
        runResults.push({ type: "error", msg: err.message || String(err) });
      }

      setOutput(runResults);
      setIsRunning(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-canvas border-b border-hairline-soft py-4 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/practice" className="text-sm font-medium text-steel hover:text-ink flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="h-4 w-px bg-hairline-strong"></div>
          <h1 className="font-bold text-ink">{problem.title}</h1>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
            problem.difficulty === "Easy" ? "text-green-600 bg-green-50 border-green-200" :
            problem.difficulty === "Medium" ? "text-orange-600 bg-orange-50 border-orange-200" :
            "text-red-600 bg-red-50 border-red-200"
          }`}>
            {problem.difficulty}
          </span>
        </div>
        <button 
          onClick={handleRunCode}
          disabled={isRunning}
          className="bg-primary hover:bg-primary-deep text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isRunning ? <Terminal className="h-4 w-4 animate-pulse" /> : <Play className="h-4 w-4" />}
          Run Code
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Problem Description */}
        <div className="w-1/3 border-r border-hairline-strong bg-canvas p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-ink mb-6">Description</h2>
          <div className="text-sm text-slate leading-relaxed">
            {problem.description.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4">{p}</p>
            ))}
          </div>

          <h3 className="font-bold text-ink mt-8 mb-4">Test Cases</h3>
          <div className="space-y-4">
            {problem.testCases.map((tc, i) => (
              <div key={i} className="bg-surface p-3 rounded border border-hairline">
                <div className="text-xs font-bold text-stone mb-1 uppercase tracking-wider">Case {i + 1}</div>
                <div className="text-sm text-ink mb-1"><span className="text-slate">Input:</span> <code className="bg-canvas px-1 rounded">{tc.input}</code></div>
                <div className="text-sm text-ink"><span className="text-slate">Expected:</span> <code className="bg-canvas px-1 rounded">{tc.expected}</code></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Code Editor & Terminal */}
        <div className="w-2/3 flex flex-col bg-[#1E1E1E]">
          {/* Editor */}
          <div className="flex-1 relative">
            <div className="absolute top-0 left-0 w-full px-4 py-2 bg-[#2D2D2D] border-b border-[#404040] text-xs text-gray-400 font-mono flex items-center gap-2">
              <Code className="h-4 w-4" /> solution.js
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-gray-300 font-mono text-sm p-4 pt-12 resize-none focus:outline-none focus:ring-0 selection:bg-blue-900"
              spellCheck="false"
            />
          </div>

          {/* Terminal / Output */}
          <div className="h-1/3 border-t border-[#404040] bg-[#181818] flex flex-col">
            <div className="px-4 py-2 bg-[#2D2D2D] text-xs text-gray-400 font-mono flex items-center gap-2 border-b border-[#404040]">
              <Terminal className="h-4 w-4" /> Output Console
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2">
              {output.length === 0 ? (
                <div className="text-gray-500 italic">Run your code to see output...</div>
              ) : (
                output.map((out, i) => (
                  <div key={i} className={`flex items-start gap-2 ${
                    out.type === "error" ? "text-red-400" : 
                    out.type === "success" ? "text-green-400" : "text-gray-300"
                  }`}>
                    {out.type === "error" && <XCircle className="h-4 w-4 mt-0.5 shrink-0" />}
                    {out.type === "success" && <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />}
                    {out.type === "log" && <span className="text-blue-400 mt-0.5 shrink-0">❯</span>}
                    <span className="whitespace-pre-wrap">{out.msg}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

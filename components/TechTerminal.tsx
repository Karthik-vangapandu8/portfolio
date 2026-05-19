"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, RefreshCw, X, Square, Minus } from "lucide-react";

interface LogEntry {
  command: string;
  output: React.ReactNode;
}

export function TechTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Available skills log data
  const skillsData: Record<string, React.ReactNode> = {
    "languages.log": (
      <div className="space-y-1.5 text-emerald-400">
        <p className="font-bold">Languages & Core Runtimes:</p>
        <p>• <span className="underline">Python</span>: Backend architecture, FastAPI/Django, AI tool-calling pipelines.</p>
        <p>• <span className="underline">TypeScript/JavaScript</span>: Next.js server components, client hooks, full-stack APIs.</p>
        <p>• <span className="underline">Go</span>: Concurrent workers, microservices, system tools.</p>
        <p>• <span className="underline">SQL</span>: Query optimization, relational schema engineering.</p>
      </div>
    ),
    "backend.log": (
      <div className="space-y-1.5 text-emerald-400">
        <p className="font-bold">Backend & AI Orchestration:</p>
        <p>• <span className="underline">Django / FastAPI</span>: Secure authentication, CORS management, REST APIs.</p>
        <p>• <span className="underline">AI Agents</span>: Tool-use loop design, custom memory retrieval, prompt planning.</p>
        <p>• <span className="underline">Distributed Systems</span>: Async queues, event brokers, background workers.</p>
        <p>• <span className="underline">Node.js</span>: Scalable routing, serverless functions.</p>
      </div>
    ),
    "databases.log": (
      <div className="space-y-1.5 text-emerald-400">
        <p className="font-bold">Databases & State Management:</p>
        <p>• <span className="underline">PostgreSQL</span>: ACID compliance, index profiling, complex join queries.</p>
        <p>• <span className="underline">Redis</span>: High-speed caching, task queuing, rate limiting.</p>
        <p>• <span className="underline">Prisma / Django ORM</span>: Database migrations, type-safe queries, model generation.</p>
        <p>• <span className="underline">SQLite</span>: High performance local storage and local application state.</p>
      </div>
    ),
    "infrastructure.log": (
      <div className="space-y-1.5 text-emerald-400">
        <p className="font-bold">Infrastructure & Tools:</p>
        <p>• <span className="underline">Docker</span>: Containerization, docker-compose orchestration, multi-stage builds.</p>
        <p>• <span className="underline">Linux Systems</span>: SSH keys, server configurations, shell scripting.</p>
        <p>• <span className="underline">Version Control</span>: Git workflow, branch logic, repository migration.</p>
        <p>• <span className="underline">Hosting Services</span>: AWS deployments, Vercel edge configs, secure Ngrok pipelines.</p>
      </div>
    )
  };

  // Scroll terminal to bottom
  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Initial welcome message
  useEffect(() => {
    setHistory([
      {
        command: "system-check",
        output: (
          <div className="text-emerald-500/80 space-y-1 text-xs sm:text-sm">
            <p>{"======================================================"}</p>
            <p>{"  KARTHIK OS (v1.0.4-LTS) -- SYSTEMS CORES SECURE"}</p>
            <p>{"======================================================"}</p>
            <p>{"Type 'help' for commands or click on file logs below."}</p>
            <p className="mt-4 text-[#33ff33] font-bold">{"$ ls -la"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 font-mono">
              <button 
                onClick={() => executeCommand("cat languages.log")}
                className="text-left text-emerald-400 hover:text-white cursor-pointer hover:bg-emerald-950/40 p-1.5 rounded border border-emerald-950 transition-colors"
              >
                {"-rwx--  languages.log"}
              </button>
              <button 
                onClick={() => executeCommand("cat backend.log")}
                className="text-left text-emerald-400 hover:text-white cursor-pointer hover:bg-emerald-950/40 p-1.5 rounded border border-emerald-950 transition-colors"
              >
                {"-rwx--  backend.log"}
              </button>
              <button 
                onClick={() => executeCommand("cat databases.log")}
                className="text-left text-emerald-400 hover:text-white cursor-pointer hover:bg-emerald-950/40 p-1.5 rounded border border-emerald-950 transition-colors"
              >
                {"-rwx--  databases.log"}
              </button>
              <button 
                onClick={() => executeCommand("cat infrastructure.log")}
                className="text-left text-emerald-400 hover:text-white cursor-pointer hover:bg-emerald-950/40 p-1.5 rounded border border-emerald-950 transition-colors"
              >
                {"-rwx--  infrastructure.log"}
              </button>
            </div>
          </div>
        )
      }
    ]);
  }, []);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let output: React.ReactNode = null;

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (trimmed === "help") {
      output = (
        <div className="space-y-1 text-emerald-500/80">
          <p>Available commands:</p>
          <p>• <span className="text-emerald-400">ls</span> : List skill log files</p>
          <p>• <span className="text-emerald-400">cat [filename]</span> : View specific skills log (e.g. <span className="italic">cat languages.log</span>)</p>
          <p>• <span className="text-emerald-400">clear</span> : Clear screen output</p>
          <p>• <span className="text-emerald-400">help</span> : Show this help log</p>
        </div>
      );
    } else if (trimmed === "ls") {
      output = (
        <div className="flex flex-col gap-1 text-emerald-400">
          {Object.keys(skillsData).map((file) => (
            <button
              key={file}
              onClick={() => executeCommand(`cat ${file}`)}
              className="text-left hover:underline cursor-pointer"
            >
              {`-rwx------ 1 guest karthik ${file}`}
            </button>
          ))}
        </div>
      );
    } else if (trimmed.startsWith("cat ")) {
      const targetFile = trimmed.substring(4).trim();
      if (skillsData[targetFile]) {
        output = skillsData[targetFile];
      } else {
        output = <p className="text-red-500">{`cat: ${targetFile}: No such file or log exists`}</p>;
      }
    } else if (trimmed === "") {
      output = null;
    } else {
      output = <p className="text-red-500">{`command not found: ${trimmed}. Type 'help' for instructions.`}</p>;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  return (
    <section className="container-narrow py-6">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground/80 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-muted-foreground" />
          Technical Stack
        </h2>
        <button
          onClick={() => {
            setHistory([]);
            executeCommand("help");
          }}
          className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Reset Console"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal window shell */}
      <div className="crt-container crt-flicker rounded-2xl border-[#225522] flex flex-col min-h-[380px] overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-[#0b0e0b] border-b border-[#225522] px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/30" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/30" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/30" />
          </div>
          <span className="text-xs font-mono text-[#33ff33]/50">guest@karthikkodes:~</span>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-6 font-mono text-xs sm:text-sm overflow-y-auto space-y-4 max-h-[420px] bg-[#050705]">
          {history.map((entry, index) => (
            <div key={index} className="space-y-2">
              {entry.command !== "system-check" && (
                <div className="text-[#33ff33] flex items-center gap-2">
                  <span>guest@karthikkodes:~$</span>
                  <span>{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div className="pl-4 border-l border-[#225522] py-1">
                  {entry.output}
                </div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Line */}
        <div className="bg-[#050705] px-6 py-3 border-t border-[#225522] flex items-center gap-2 text-xs sm:text-sm font-mono text-[#33ff33]">
          <span>guest@karthikkodes:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#33ff33] font-mono caret-[#33ff33]"
            placeholder="Type 'help' or select a file log..."
            autoFocus
          />
          <div className="terminal-cursor shrink-0" />
        </div>
      </div>
    </section>
  );
}

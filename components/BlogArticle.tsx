"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Newspaper, ShieldAlert } from "lucide-react";

interface BlogArticleProps {
  content: string;
}

export function BlogArticle({ content }: BlogArticleProps) {
  const [consoleMode, setConsoleMode] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [booting, setBooting] = useState(false);

  // Simple parser to strip HTML tags for typing effect if needed,
  // or we can just apply retro styling to the parsed HTML.
  useEffect(() => {
    if (consoleMode) {
      setBooting(true);
      const timer = setTimeout(() => {
        setBooting(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [consoleMode]);

  return (
    <div className="flex flex-col gap-6">
      {/* Interactive Toggle */}
      <div className="flex justify-end -mt-6">
        <button
          onClick={() => setConsoleMode(!consoleMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
            consoleMode
              ? "bg-[#33ff33]/10 border-[#33ff33]/40 text-[#33ff33] hover:bg-[#33ff33]/20 shadow-[0_0_10px_rgba(51,255,51,0.1)]"
              : "bg-muted border-border hover:bg-accent text-muted-foreground hover:text-foreground"
          }`}
        >
          {consoleMode ? (
            <>
              <Newspaper className="w-3.5 h-3.5 animate-pulse" />
              Standard View
            </>
          ) : (
            <>
              <Terminal className="w-3.5 h-3.5" />
              Autopsy View
            </>
          )}
        </button>
      </div>

      <motion.div
        layout
        className="transition-all duration-500"
      >
        {consoleMode ? (
          <div className="crt-container crt-flicker rounded-2xl p-6 sm:p-8 font-mono text-sm leading-relaxed select-text border-[#225522]">
            {booting ? (
              <div className="space-y-2 text-[#33ff33]">
                <p className="animate-pulse">{"[SYSTEM] INITIALIZING AUTOPSY CORE v1.0..."}</p>
                <p>{"[SYSTEM] CONNECTING TO SECURE TUNNEL..."}</p>
                <p>{"[SYSTEM] DECRYPTING RAW ARTICLE DATABASES... OK"}</p>
                <p>{"[SYSTEM] PARSING MARKDOWN ENTRIES..."}</p>
                <div className="terminal-cursor" />
              </div>
            ) : (
              <div className="space-y-6 text-[#33ff33]">
                {/* Header logs */}
                <div className="border-b border-[#225522] pb-4 mb-6 opacity-80 text-xs flex flex-col gap-1">
                  <p>{"// SYSTEM AUTOPSY SHELL (v1.0.4-PROD)"}</p>
                  <p>{`// HOST: karthikkodes.vercel.app | STATUS: ATTACHED`}</p>
                  <p>{`// LOCAL TIME: ${new Date().toISOString()}`}</p>
                  <p className="text-[#33ff33]/70">{"// Warning: Confidential operational logs."}</p>
                </div>

                <div 
                  className="prose-terminal"
                  dangerouslySetInnerHTML={{ __html: content }} 
                />

                <div className="pt-8 border-t border-[#225522] text-xs opacity-70 flex justify-between items-center">
                  <span>{"[END OF MEMORY BUFFER]"}</span>
                  <span>
                    {"Awaiting Command..."}
                    <span className="terminal-cursor" />
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </motion.div>

      {/* Styled CRT / Monospace typography support inside the HTML container */}
      <style jsx global>{`
        .prose-terminal h1,
        .prose-terminal h2,
        .prose-terminal h3,
        .prose-terminal h4 {
          color: #33ff33 !important;
          font-family: monospace !important;
          font-weight: bold !important;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          text-shadow: 0 0 4px rgba(51, 255, 51, 0.45);
        }
        .prose-terminal h1 { font-size: 1.5rem; border-bottom: 1px dashed #225522; padding-bottom: 0.5rem; }
        .prose-terminal h2 { font-size: 1.25rem; }
        .prose-terminal h3 { font-size: 1.1rem; }
        
        .prose-terminal p {
          margin-bottom: 1rem;
          color: #33ff33 !important;
          opacity: 0.9;
        }

        .prose-terminal pre,
        .prose-terminal code {
          background: #000a00 !important;
          color: #55ff55 !important;
          border: 1px solid #226622 !important;
          border-radius: 6px;
          font-family: monospace !important;
          padding: 0.75rem !important;
          display: block;
          overflow-x: auto;
          box-shadow: inset 0 0 10px rgba(0, 20, 0, 0.8);
        }

        .prose-terminal ul,
        .prose-terminal ol {
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .prose-terminal li {
          list-style-type: square;
          margin-bottom: 0.5rem;
        }

        .prose-terminal blockquote {
          border-left: 3px solid #33ff33;
          background: rgba(51, 255, 51, 0.05);
          padding: 0.5rem 1rem;
          margin: 1.5rem 0;
          font-style: italic;
        }

        .prose-terminal img {
          filter: grayscale(100%) contrast(150%) brightness(80%) sepia(50%) hue-rotate(60deg);
          border: 1px solid #225522;
          padding: 4px;
          background: #000;
          opacity: 0.8;
          max-width: 100%;
        }

        .prose-terminal a {
          color: #33ff33 !important;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-terminal a:hover {
          background: rgba(51, 255, 51, 0.15);
        }
      `}</style>
    </div>
  );
}

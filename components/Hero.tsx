"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Bell, Heart, Sparkles, X } from "lucide-react";

const ZOMATO_QUOTES = [
  "Hey {name}, are you a hiring manager? Because you've just made me swipe right on this career opportunity. 😉",
  "Hey {name}, are you a signature field? Because I'm ready to make things official with you. 📄",
  "Hey {name}, do you believe in love at first interview, or should I walk by your resume pile again? 😏",
  "Hey {name}, are you a signing bonus? Because you look incredibly attractive and I can't stop thinking about you. 💰",
  "Hey {name}, are you a headhunter? Because you've been running through my mind all day. 🏃‍♂️",
  "Hey {name}, are you a job offer? Because I want to commit to you and only you. 💍",
  "Hey {name}, my notice period is 0 days, because I'm ready to fall for you instantly. ⏰",
  "Hey {name}, let's skip the screening call—I already know we're a perfect match. ❤️",
  "Hey {name}, are you a retirement plan? Because I want to spend the rest of my career with you. 🏖️",
  "Hey {name}, are you looking for a backend engineer? Because I'm ready to commit to you long-term. 💍"
];

export const Hero = ({ location = "the world" }: { location?: string }) => {
  const [nameInput, setNameInput] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [activeQuote, setActiveQuote] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Load name from localStorage on mount if it exists
  useEffect(() => {
    const savedName = localStorage.getItem("visitor_name");
    if (savedName) {
      setVisitorName(savedName);
      setNameInput(savedName);
    }
  }, []);

  const triggerNotification = (name: string) => {
    const randomQuote = ZOMATO_QUOTES[Math.floor(Math.random() * ZOMATO_QUOTES.length)];
    setActiveQuote(randomQuote.replace("{name}", name));
    setShowNotification(true);

    // Auto hide after 8 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 8000);
    return () => clearTimeout(timer);
  };

  const handleNameSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && nameInput.trim() !== "") {
      const name = nameInput.trim();
      setVisitorName(name);
      localStorage.setItem("visitor_name", name);
      triggerNotification(name);
    }
  };

  const triggerNewQuote = () => {
    triggerNotification(visitorName || "stranger");
  };

  return (
    <section className="container-narrow py-12 relative">
      {/* Zomato Push Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed top-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm z-[9999] bg-[#181112] border border-[#ff3f55]/40 rounded-2xl p-4 shadow-2xl shadow-[#ff3f55]/10"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ff3f55] flex items-center justify-center text-white font-extrabold text-lg select-none shrink-0 shadow-lg shadow-[#ff3f55]/20 animate-pulse">
                k
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#ff3f55] flex items-center gap-1">
                    <Bell className="w-3 h-3" /> karthik
                  </span>
                  <span className="text-[10px] text-zinc-400">now</span>
                </div>
                <p className="text-sm font-medium text-zinc-100 mt-1.5 leading-relaxed">
                  {activeQuote}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={triggerNewQuote}
                    className="px-3 py-1 bg-[#ff3f55]/10 hover:bg-[#ff3f55]/20 text-[#ff3f55] text-[10px] font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Heart className="w-2.5 h-2.5 fill-current" /> Another one
                  </button>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-8 text-center md:text-left">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <img
              src="/icons/blog1.png"
              alt="Vangapandu Lokeswara Karthik"
              className="relative rounded-full object-cover border-4 border-background shadow-xl w-24 h-24"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Vangapandu Lokeswara Karthik
            </h1>

            {/* Interactive Visitor Input */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1.5 text-xs sm:text-sm text-muted-foreground font-mono mt-1">
              <span className="hidden sm:inline">visitor@karthikkodes:~$ whoami</span>
              <span className="sm:hidden">visitor:~$ whoami</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="type your name & enter..."
                  value={nameInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNameInput(val);
                    if (val.trim() === "") {
                      setVisitorName("");
                      localStorage.removeItem("visitor_name");
                    }
                  }}
                  onKeyDown={handleNameSubmit}
                  className="bg-transparent border-b border-muted-foreground/30 focus:border-[#ff3f55] outline-none px-1 text-foreground placeholder:text-muted-foreground/50 w-44 transition-all duration-300 font-mono text-center md:text-left"
                />
                {!nameInput.trim() && (
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 bg-[#ff3f55] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg shadow-[#ff3f55]/30 whitespace-nowrap pointer-events-none select-none flex items-center gap-1 z-10"
                  >
                    <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                    Type your name & press Enter!
                    {/* Tooltip Caret */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 w-2 h-2 bg-[#ff3f55] rotate-45" />
                  </motion.div>
                )}
              </div>
              {visitorName && nameInput.trim() !== "" && (
                <button
                  onClick={triggerNewQuote}
                  className="p-1 text-[#ff3f55] hover:text-[#ff3f55]/80 transition-colors animate-pulse cursor-pointer"
                  title="Trigger quote notification"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="text-lg text-muted-foreground mb-6">
          Engineer · Builder · Writer
        </p>
        <p className="text-base text-muted-foreground max-w-xl leading-relaxed mb-8">
          <span className="text-foreground font-bold">Ex-founder</span>.{" "}
          <span className="text-foreground/90 font-semibold">AI agent builder</span>. Public documenter of failures and breakthroughs.
          <br className="hidden sm:inline" />
          {" "}Built production agentic systems at{" "}
          <span className="underline decoration-[#ff3f55]/30 decoration-2 underline-offset-4 text-foreground/90 font-medium transition-colors hover:decoration-[#ff3f55]/60">
            ZOVX Labs
          </span>. Won the{" "}
          <span className="inline-flex items-center gap-1 bg-[#ff3f55]/10 text-[#ff3f55] dark:text-[#ff556b] px-2 py-0.5 rounded-lg text-xs font-bold font-mono">
            World IP Day Innovation Award 🏆
          </span>{" "}
          from the AP State Council of Higher Education.
          <span className="block mt-4 border-l-2 border-[#ff3f55]/30 pl-4 italic text-muted-foreground/80 font-light leading-relaxed">
            "I break things so you don't have to — and write down exactly what happened."
          </span>
        </p>

        {/* Custom Path Navigation Links */}
        <div className="flex gap-4 items-center">
          <div className="flex gap-4 items-center">
            <a
              href="https://github.com/Karthik-vangapandu8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 hover:bg-accent rounded-lg transition-colors text-sm font-mono text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            >
              /src
            </a>
            <a
              href="https://www.linkedin.com/in/vangapandu-karthik/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 hover:bg-accent rounded-lg transition-colors text-sm font-mono text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            >
              /connect
            </a>
            <a
              href="mailto:pavanpandu33031@gmail.com"
              className="px-3 py-1.5 hover:bg-accent rounded-lg transition-colors text-sm font-mono text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            >
              /ping
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

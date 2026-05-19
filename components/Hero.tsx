"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Hero = ({ location = "the world" }: { location?: string }) => {
  const [spotifyData, setSpotifyData] = useState<any>(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    const timeGreeting = hours < 12 ? "Good morning" : hours < 17 ? "Good afternoon" : "Good evening";
    setGreeting(timeGreeting);

    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const data = await res.json();
        setSpotifyData(data);
      } catch (e) {
        console.error("Failed to fetch Spotify status", e);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container-narrow py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-8 text-center md:text-left">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <Image 
              src="/icons/blog1.png" 
              alt="Vangapandu Lokeswara Karthik" 
              width={96} 
              height={96} 
              className="relative rounded-full object-cover border-4 border-background shadow-xl"
              priority
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Vangapandu Lokeswara Karthik
            </h1>
            <p className="text-sm sm:text-base font-medium text-muted-foreground">
              {greeting} from {location}! ☕
            </p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground mb-6">
          Engineer · Builder · Writer
        </p>
        <p className="text-base text-muted-foreground max-w-xl leading-relaxed mb-8">
          I build systems in public, break them, and write down the autopsies. Currently exploring backend architectures, network protocols, and web performance.
        </p>

        <div className="flex gap-4 items-center">
          <div className="flex gap-4 items-center">
            <a 
              href="https://github.com/Karthik-vangapandu8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 hover:bg-accent rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/karthik-vangapandu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 hover:bg-accent rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:vangapandulokeswarakarthik@gmail.com" 
              className="px-3 py-1.5 hover:bg-accent rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
            >
              Email
            </a>
          </div>
          
          <div className="ml-auto">
            {spotifyData?.isPlaying ? (
              <a 
                href={spotifyData.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 bg-accent/50 rounded-full border text-xs font-medium text-muted-foreground hover:bg-accent transition-colors"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="truncate max-w-[150px]">
                  On Repeat: {spotifyData.title}
                </span>
              </a>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-accent/50 rounded-full border text-xs font-medium text-muted-foreground">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                Not Playing
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

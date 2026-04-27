"use client";

import { motion } from "framer-motion";
import { MessageCircle, Code, Briefcase, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [spotifyData, setSpotifyData] = useState<any>(null);

  useEffect(() => {
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
        <h1 className="text-4xl font-bold tracking-tight mb-2">Vangapandu Lokeswara Karthik</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Engineer · Builder · Creative
        </p>
        <p className="text-base text-muted-foreground max-w-xl leading-relaxed mb-8">
          I'm a software engineer passionate about building high-performance web applications and tools that solve real-world problems. Love to experiment with new technologies and contribute to open source.
        </p>

        <div className="flex gap-4 items-center">
          <div className="flex gap-4 items-center">
            <a href="#" className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <Code className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <Briefcase className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <Mail className="w-5 h-5" />
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

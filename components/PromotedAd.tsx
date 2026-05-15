"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Trophy, Quote, X } from 'lucide-react';
import { PROMOTIONS, Promotion } from '@/lib/promotions';

export function PromotedAd() {
  const [ad, setAd] = useState<Promotion | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Select a random ad on mount
    const randomIndex = Math.floor(Math.random() * PROMOTIONS.length);
    setAd(PROMOTIONS[randomIndex]);
  }, []);

  if (!ad || !isVisible) return null;

  const Icon = ad.type === 'achievement' ? Trophy : ad.type === 'quote' ? Quote : Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-[280px] hidden lg:block group"
    >
      <div className="relative p-4 rounded-2xl border bg-background/80 backdrop-blur-xl hover:bg-background/90 transition-all duration-300 shadow-2xl hover:shadow-primary/10 overflow-hidden">
        {/* "Sponsored" Label */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            Self-Sponsored
          </span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground/40 hover:text-foreground transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {ad.image && (
            <div className="relative w-full h-24 rounded-lg overflow-hidden mb-1">
              <img 
                src={ad.image} 
                alt={ad.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-1">
              {ad.title}
            </h4>
          </div>
          
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {ad.description}
          </p>
          
          <a
            href={ad.link}
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-medium px-3 py-2 rounded-xl bg-foreground text-background hover:opacity-90 transition-all"
          >
            {ad.cta}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Subtle Background Glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
      </div>
      
      {/* Ad Attribution */}
      <p className="text-[9px] text-center mt-2 text-muted-foreground/40 italic">
        This ad was personally selected for you.
      </p>
    </motion.div>
  );
}

export function InlineAd() {
  const [ad, setAd] = useState<Promotion | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * PROMOTIONS.length);
    setAd(PROMOTIONS[randomIndex]);
  }, []);

  if (!ad) return null;

  const Icon = ad.type === 'achievement' ? Trophy : ad.type === 'quote' ? Quote : Sparkles;

  return (
    <div className="lg:hidden my-8 px-4">
      <div className="p-4 rounded-xl border bg-accent/30 backdrop-blur-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Promoted
          </span>
        </div>
        <div className="flex gap-4 items-start">
           <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1">
            {ad.image && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
              </div>
            )}
            <h4 className="text-sm font-semibold mb-1">{ad.title}</h4>
            <p className="text-xs text-muted-foreground mb-3">{ad.description}</p>
            <a href={ad.link} className="text-xs font-semibold text-primary flex items-center gap-1">
              {ad.cta} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

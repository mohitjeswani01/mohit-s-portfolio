import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hasCalledOnComplete = useRef(false); // Prevent double-calls to onComplete

  useEffect(() => {
    // Only run the boot sequence once
    runBootSequence();

    // Cleanup function to prevent memory leaks
    return () => {
      // Any cleanup if needed
    };
  }, [onComplete]);

  const runBootSequence = () => {
    const lines = [
      "> Initializing Core Systems...",
      "> Loading Neural Modules...",
      "> Verifying Data Integrity...",
      "> Establishing Secure Connection...",
      "> ACCESS GRANTED: MOHIT_JESWANI_V1.0"
    ];

    let currentLine = 0;

    const typeInterval = setInterval(() => {
      setBootLines(prev => {
        // Prevent duplicates if interval runs fast
        if (prev.length >= lines.length) return prev;
        return [...prev, lines[currentLine]];
      });

      currentLine++;

      if (currentLine >= lines.length) {
        clearInterval(typeInterval);
        // Add a small delay before exploding
        setTimeout(finishAnimation, 500);
      }
    }, 300);
  };

  const finishAnimation = () => {
    // Prevent onComplete from being called multiple times
    if (hasCalledOnComplete.current) return;
    hasCalledOnComplete.current = true;

    const tl = gsap.timeline();

    tl.to(".boot-line", {
      opacity: 0,
      x: -50,
      stagger: 0.1, // Slower stagger looks more dramatic
      duration: 0.3,
    })
      .fromTo(".hero-name-char", {
        opacity: 0,
        scale: 2,
        filter: "blur(10px)"
      }, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(containerRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.8, // Let the user read the name for a split second
        onComplete: () => {
          // Call onComplete only once
          onComplete();
        }
      });
  };

  const name = "MOHIT JESWANI";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col items-center justify-center font-mono overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,27,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(18,18,27,0.8)_2px,transparent_2px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

      {/* Terminal Boot Sequence */}
      <div ref={textRef} className="relative z-10 w-full max-w-lg px-6">
        <div className="flex flex-col gap-2 mb-8 min-h-[160px] font-mono text-sm md:text-base">
          {bootLines.map((line, index) => (
            <div key={index} className="boot-line text-green-500 font-bold tracking-wide">
              {line}
            </div>
          ))}
        </div>

        {/* The Final Name Reveal */}
        <div className="text-center h-24 overflow-hidden">
          {bootLines.length === 5 && (
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              {name.split('').map((char, i) => (
                <span key={i} className="hero-name-char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
          )}
        </div>
      </div>

      {/* Loading Spinner at Bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Glitch deconstruction effect
        gsap.to('.preloader', {
          duration: 0.8,
          scale: 1.1,
          filter: 'hue-rotate(360deg) contrast(2)',
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.to('.preloader', {
              duration: 0.4,
              opacity: 0,
              scale: 0.8,
              filter: 'blur(20px)',
              ease: 'power2.inOut',
              onComplete: onComplete
            });
          }
        });
      }
    });

    // Progress bar animation
    tl.to({}, {
      duration: 3,
      ease: 'power2.out',
      onUpdate: function() {
        const currentProgress = Math.round(this.progress() * 100);
        setProgress(currentProgress);
      }
    });

    // Name character animation
    const nameChars = document.querySelectorAll('.name-char');
    nameChars.forEach((char, index) => {
      tl.fromTo(char, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        scale: 0.5
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
        delay: index * 0.1
      }, 0.5);
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const name = "MOHIT JESWANI";

  return (
    <div className="preloader fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Name */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-wider">
            {name.split('').map((char, index) => (
              <span
                key={index}
                className="name-char inline-block glitch gradient-text"
                data-text={char}
                style={{ perspective: '1000px' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Loading Portfolio</span>
            <span className="text-primary font-mono">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-300 ease-out glow-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Glitch Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary opacity-20 animate-ping" />
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-secondary opacity-30 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent opacity-10 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
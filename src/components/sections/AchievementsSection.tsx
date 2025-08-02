import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import certificateImg from '../../assets/certificate.png';

gsap.registerPlugin(ScrollTrigger);

const AchievementsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.achievement-card');
        gsap.fromTo(cards, {
          opacity: 0,
          y: 30,
          scale: 0.9
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    {
      title: "SYRUS HACKATHON 2025 Participant",
      description: "Certificate of participation in SYRUS HACKATHON 2025 held on 28th - 29th March 2025 at VESIT Mumbai",
      date: "2025",
      icon: "🏆",
      image: certificateImg
    },
    {
      title: "Full Stack Development",
      description: "Expertise in MERN stack development with hands-on experience in real-world projects",
      date: "2024",
      icon: "💻"
    },
    {
      title: "AI Integration Specialist",
      description: "Successfully integrated AI solutions using OpenAI and Gemini APIs in web applications",
      date: "2024",
      icon: "🤖"
    },
    {
      title: "Computer Engineering Student",
      description: "Pursuing B.E. Computer Engineering at VESIT with CGPA 7.03",
      date: "2022-2026",
      icon: "🎓"
    }
  ];

  return (
    <section 
      id="achievements"
      ref={containerRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-bl from-secondary/5 to-accent/5" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 gradient-text"
        >
          Achievements
        </h2>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
            >
              {achievement.image && (
                <div className="mb-4">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {achievement.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {achievement.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-8 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute bottom-1/3 left-12 w-1 h-1 bg-secondary rounded-full animate-ping opacity-40" />
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-accent rounded-full animate-pulse opacity-30" />
    </section>
  );
};

export default AchievementsSection;
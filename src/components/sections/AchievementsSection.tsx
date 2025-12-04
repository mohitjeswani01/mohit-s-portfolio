import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, Trophy, Calendar, ExternalLink } from 'lucide-react';

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
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    {
      title: "Technology Strategy & Innovation",
      organization: "Deloitte",
      description: "Executed a virtual job simulation focused on business intelligence, strategic implementation of cloud technologies, and data-driven decision making.",
      date: "2025",
      icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
      image: "/d_certificate.png",
      type: "Certification",
      // Link Added Here
      link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6910a8297b3b5bddc5652fb8_1764099566441_completion_certificate.pdf"
    },
    {
      title: "Data Visualisation & Analytics",
      organization: "Tata Group",
      description: "Mastered storytelling with data. Created executive-level dashboards and translated complex datasets into actionable business insights.",
      date: "2025",
      icon: <Award className="w-6 h-6 text-purple-400" />,
      image: "/tata_certificate.png",
      type: "Certification",
      // Link Added Here
      link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_6910a8297b3b5bddc5652fb8_1763840232712_completion_certificate.pdf"
    },
    {
      title: "Syrus Hackathon participant",
      organization: "VESIT",
      description: "Competed in a 24-hour code sprint. Developed a scalable solution under strict deadlines, demonstrating rapid prototyping and teamwork.",
      date: "March 2025",
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      image: "/syrus_certificate.png",
      type: "Award",
      link: "#" // No link yet, will render as static text
    }
  ];

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="min-h-screen py-24 px-4 relative overflow-hidden bg-slate-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/10 to-purple-900/10 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        >
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Recognition</span>
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card flex flex-col h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              {/* Image Section */}
              {achievement.image && (
                <div className="aspect-video w-full bg-slate-950 border-b border-slate-800 relative overflow-hidden">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-contain p-2 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider text-slate-400 border border-white/10">
                    {achievement.organization}
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 group-hover:border-blue-500/30 transition-colors">
                    {achievement.icon}
                  </div>
                  <div className="flex items-center text-xs text-slate-500 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    {achievement.date}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {achievement.description}
                </p>

                {/* Footer - NOW INTERACTIVE */}
                <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between">
                  {achievement.link && achievement.link !== '#' ? (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-green-400 flex items-center gap-1.5 hover:text-green-300 hover:underline transition-all cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Credential
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  ) : (
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 cursor-default">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Credential
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
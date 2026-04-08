import React, { useEffect, useRef, useState } from 'react';
// Removed external GSAP dependency to prevent build errors
import { Github, ArrowUpRight, Brain, Car, Database, ShoppingBag, Workflow, Youtube, Command, Shield, Activity } from 'lucide-react';

// --- 1. TYPES & DATA ---

const PROJECTS = [
  {
    id: 'badminton-coach',
    title: "AI Badminton-Coach",
    description: "The Real-Time Multimodal Badminton Coach. A production-ready AI coaching platform providing low latency feedback. Uses a live Stream WebRTC pipeline to analyze player biomechanics during drills.",
    tech: ["Stream WebRTC", "Pose Estimation", "Multimodal LLM", "Vision Agents SDK", "FastAPI"],
    image: "/badminton.png",
    links: {
      demo: "https://badminton-coach-nine.vercel.app/",
      github: "https://github.com/mohitjeswani01/badminton-coach",
      youtube: "https://www.youtube.com/watch?v=7EnlQNmO5v8"
    },
    category: "AI / Vision",
    icon: Activity,
    featured: false
    // hi this is mohit 
  },
  {
    id: 'archestra-sentinel',
    title: "Archestra Sentinel",
    description: "Enterprise-Grade Governance & Observation Platform for agentic workflows. Bridges Archestra Gateway and Docker Engine for real-time security scoring and automated governance.",
    tech: ["Python", "FastAPI", "Docker SDK", "React"],
    image: "/admin-dashboard.png",
    links: {
      github: "https://github.com/mohitjeswani01/archestra-sentinel",
      youtube: "https://www.youtube.com/watch?v=DppGd74_5ZE"
    },
    category: "AI Security / DevOps",
    icon: Shield,
    featured: false
  },
  {
    id: 'hackathon-command-center',
    title: "Hackathon Command Center",
    description: "The first generative dashboard for hackathon organizers. No admin panels. Just intent. Features context-aware morphing and natural language control.",
    tech: ["Next.js", "Generative UI", "Tambo AI", "Vercel"],
    image: "/hackathon-command-center.png",
    links: {
      demo: "https://hackathon-command-center.vercel.app/",
      github: "https://github.com/mohitjeswani01/hackathon-command-center", // Placeholder as per plan
      youtube: "https://www.youtube.com/watch?v=2tjCw4wogH4"
    },
    category: "AI / Dashboard",
    icon: Command,
    featured: false
  },
  {
    id: 'agent-zero',
    title: "AgentZero — Autonomous AI",
    description: "Self-correcting AI operations loop. Orchestrates Kestra workflows with Llama-3 to execute code, handle errors, and automate CI/CD pipelines autonomously.",
    tech: ["Kestra", "Llama-3", "Cline CLI", "Vercel"],
    image: "/dashboard.png", // Auto-fetched from your YouTube ID
    links: {
      demo: "https://nemesis-ai-tau.vercel.app/",
      github: "https://github.com/mohitjeswani01/nemesis_ai",
      youtube: "https://www.youtube.com/watch?v=VKjtmXPARBQ"
    },
    category: "AI / DevOps",
    icon: Workflow,
    featured: false // TAKES THE SPOTLIGHT
  },
  {
    id: 'edu-pilot',
    title: "Edu-Pilot",
    description: "AI-Powered course generation engine utilizing OpenAI & Gemini APIs. Features intelligent study path algorithms and adaptive learning modules.",
    tech: ["Next.js", "OpenAI API", "Gemini API", "Tailwind"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    links: {
      demo: "https://edu-pilot.mohitcodes.xyz/",
      github: "https://github.com/mohitjeswani01/edu-pilot"
    },
    category: "AI / SaaS",
    icon: Brain,
    featured: true
  },
  {
    id: 'car-connect',
    title: "CarConnect",
    description: "Enterprise-grade vehicle rental platform with real-time booking states, complex SQL relationships, and secure payment gateway integration.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    links: {
      github: "https://github.com/mohitjeswani01/CarConnect"
    },
    category: "Full Stack",
    icon: Car,
    featured: false
  },
  {
    id: 'studynotion',
    title: "StudyNotion",
    description: "Cross-platform mobile LMS application. Handles video streaming chunks, offline synchronization, and course marketplace logic.",
    tech: ["React Native", "Redux", "Node.js"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    links: {
      github: "https://github.com/mohitjeswani01/studynotion"
    },
    category: "Mobile App",
    icon: Database,
    featured: false
  },
  {
    id: 'clothing-shop',
    title: "Clothing Shop",
    description: "High-performance e-commerce frontend featuring 3D asset rendering (Spline) and optimized asset delivery pipelines.",
    tech: ["React", "TypeScript", "Spline 3D", "Tailwind"],
    image: "/clothing-shop.png",
    links: {
      github: "https://github.com/mohitjeswani01/puja-home-couture-collection"
    },
    category: "Frontend 3D",
    icon: ShoppingBag,
    featured: false
  }
];

// --- 2. SUB-COMPONENT: SPOTLIGHT CARD ---

const ProjectCard = ({ project }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group h-full rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-slate-600 transition-colors duration-300 flex flex-col shadow-lg"
    >
      {/* Dynamic Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.1), transparent 40%)`,
        }}
      />

      {/* Image Area */}
      <div className="relative h-48 md:h-56 overflow-hidden border-b border-slate-800 group-hover:border-slate-600/50 transition-colors">
        <div className="absolute top-3 right-3 z-20 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-blue-400 border border-blue-500/30 shadow-lg">
          {project.category}
        </div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
            <project.icon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 text-[11px] font-medium bg-slate-800/80 text-slate-300 rounded-md border border-slate-700/50">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {project.links.demo && project.links.demo !== '#' && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[100px]">
              <button className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-900/20">
                Live
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </button>
            </a>
          )}

          {project.links.youtube && (
            <a href={project.links.youtube} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[100px]">
              <button className="w-full py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 border border-red-500/20 hover:border-red-600 group/yt">
                <Youtube className="w-4 h-4" />
                Watch
              </button>
            </a>
          )}

          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={project.links.demo || project.links.youtube ? "flex-1 min-w-[100px]" : "w-full"}>
            <button className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600">
              <Github className="w-4 h-4" />
              Code
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT: PROJECTS SECTION ---

const ProjectsSection = () => {
  // Logic to split Featured vs Normal
  const featuredProject = PROJECTS.find(p => p.featured);
  const otherProjects = PROJECTS.filter(p => !p.featured);

  return (
    <section
      className="min-h-screen py-24 px-4 bg-slate-950 relative overflow-hidden"
      id="projects"
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black, transparent)'
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block mb-3 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase">Projects & Analytics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Engineering</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Scalable applications, AI integrations, and complex system architectures.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-backwards">

          {/* Featured Project (Spans 2 columns on desktop) */}
          {featuredProject && (
            <div className="project-card-entry md:col-span-2">
              <ProjectCard project={featuredProject} />
            </div>
          )}

          {/* Standard Projects */}
          {otherProjects.map((project) => (
            <div key={project.id} className="project-card-entry col-span-1">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <a
            href="https://github.com/mohitjeswani01"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            View complete code archive on GitHub
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
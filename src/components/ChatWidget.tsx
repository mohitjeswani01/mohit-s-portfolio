import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowDown } from 'lucide-react';

// --- STATIC Q&A KNOWLEDGE BASE ---
const QA_DATA: { keywords: string[]; answer: string }[] = [
    // Greetings
    {
        keywords: ['hi', 'hello', 'hey', 'hola', 'sup', 'yo'],
        answer: "Hey there! 👋 I'm Mohit's portfolio assistant. Ask me anything about his skills, projects, experience, or how to work with him!"
    },
    // Who is Mohit
    {
        keywords: ['who', 'about', 'introduce', 'yourself', 'mohit', 'tell me'],
        answer: "Mohit Jeswani is a final-year Computer Engineering student at VESIT, Mumbai (Class of 2026). He's a Software Developer & Data Analyst who builds end-to-end digital systems combining full-stack development with data analytics."
    },
    // Skills
    {
        keywords: ['skills', 'tech', 'stack', 'technologies', 'tools', 'language'],
        answer: "Mohit's core stack:\n\n🔹 **Languages:** Java (OOP), Python, JavaScript, TypeScript, SQL\n🔹 **Frontend:** React.js, Next.js, TailwindCSS\n🔹 **Backend:** Node.js, Express, FastAPI\n🔹 **Data:** Pandas, Power BI, Tableau, Excel\n🔹 **Databases:** MongoDB, PostgreSQL, MySQL\n🔹 **DevOps:** Docker, Git/GitHub, Vercel"
    },
    // Projects
    {
        keywords: ['project', 'built', 'work', 'portfolio', 'made', 'build'],
        answer: "Here are Mohit's top projects:\n\n🏗️ **Archestra Sentinel** — Enterprise governance platform for agentic workflows (Python, FastAPI, Docker)\n🎯 **Hackathon Command Center** — Generative AI dashboard for organizers (Next.js, Tambo AI)\n🤖 **AgentZero** — Self-correcting autonomous AI agent (Kestra, Llama-3)\n📚 **Edu-Pilot** — AI-powered course generation engine (Next.js, OpenAI, Gemini)\n🚗 **CarConnect** — Vehicle rental platform (React, Node.js, MongoDB)\n👗 **Clothing Shop** — 3D e-commerce with Spline (React, TypeScript)"
    },
    // Hackathons
    {
        keywords: ['hackathon', 'competition', 'win', 'won', 'achievement', 'award', 'prize'],
        answer: "Mohit's hackathon journey is impressive! 🏆\n\n🥇 **PR Winner — 'Automate Me If You Can'** by Accomplish × WeMakeDevs ($200 prize, won among 4,000+ participants!)\n🎖️ **AI Agents Assemble** — Built AgentZero\n🎖️ **UI Strikes Back** — Built Hackathon Command Center\n🎖️ **2 Fast 2 MCP** — Built Archestra Sentinel\n🎖️ **Syrus Hackathon** — 24-hour code sprint at VESIT"
    },
    // Education
    {
        keywords: ['education', 'college', 'degree', 'university', 'study', 'cgpa', 'vesit'],
        answer: "Mohit is pursuing a **B.E. in Computer Engineering** from VESIT (Vivekanand Education Society's Institute of Technology), Mumbai with a **CGPA of 7.03**. Expected graduation: Class of 2026."
    },
    // Location
    {
        keywords: ['location', 'where', 'city', 'based', 'live', 'mumbai'],
        answer: "Mohit is based in **Mumbai, India** 📍 and is open to relocation for the right opportunity!"
    },
    // Contact
    {
        keywords: ['contact', 'email', 'reach', 'connect', 'hire', 'message'],
        answer: "You can reach Mohit at:\n\n📧 **Email:** jeswanimohit959@gmail.com\n💼 **LinkedIn:** linkedin.com/in/mohit-jeswani\n🐙 **GitHub:** github.com/mohitjeswani01\n\nOr use the Contact section on this portfolio to send a direct message!"
    },
    // Resume
    {
        keywords: ['resume', 'cv', 'download'],
        answer: "You can download Mohit's resume directly from the homepage — click the **'Download CV'** button, or visit: /mohit_jeswani_resume.pdf"
    },
    // Availability / Hire
    {
        keywords: ['available', 'hire', 'freelance', 'open', 'work', 'job', 'intern', 'opportunity'],
        answer: "Yes! Mohit is currently **open to work** — internships, freelance projects, and full-time roles. He's especially interested in Software Development, Data Analytics, and AI/ML positions. Feel free to reach out!"
    },
    // Website / Client work
    {
        keywords: ['website', 'client', 'service', 'build website', 'custom', 'design', 'web development'],
        answer: "Mohit builds custom websites and web applications for clients! Whether you need a landing page, full-stack web app, dashboard, or e-commerce site — he can deliver a premium, modern solution. Drop a message in the Contact section to discuss your project! 🚀"
    },
    // Pricing
    {
        keywords: ['price', 'cost', 'rate', 'charge', 'budget', 'quote', 'how much'],
        answer: "Pricing depends on the scope and complexity of the project. Mohit offers competitive rates for students and startups. Reach out via the Contact section or email at jeswanimohit959@gmail.com with your requirements for a custom quote!"
    },
    // Java / OOP
    {
        keywords: ['java', 'oop', 'object oriented'],
        answer: "Java is one of Mohit's strongest languages! He has deep expertise in **OOP principles**, **Data Structures & Algorithms**, and uses Java for building robust, scalable backend systems."
    },
    // React / Frontend
    {
        keywords: ['react', 'frontend', 'next', 'nextjs', 'ui'],
        answer: "Mohit specializes in modern frontend development with **React.js** and **Next.js**. He builds responsive, animated, and performant UIs using TailwindCSS, GSAP, and TypeScript."
    },
    // Data Analytics
    {
        keywords: ['data', 'analytics', 'analyst', 'python', 'sql', 'power bi', 'tableau', 'pandas'],
        answer: "Mohit operates at the intersection of development and data. His analytics toolkit includes **Python (Pandas)**, **SQL (Advanced)**, **Power BI**, **Tableau**, and **Excel**. He's completed certifications from Deloitte and Tata Group in this domain."
    },
    // AI / ML
    {
        keywords: ['ai', 'machine learning', 'artificial intelligence', 'llm', 'agent', 'ml'],
        answer: "Mohit has hands-on experience building AI-powered applications:\n\n🤖 **AgentZero** — Autonomous AI with Llama-3 & Kestra\n🛡️ **Archestra Sentinel** — AI governance for agentic workflows\n📚 **Edu-Pilot** — Course generation with OpenAI & Gemini APIs\n\nHe's actively exploring agentic AI, LLM orchestration, and vision agents."
    },
    // Certifications
    {
        keywords: ['certification', 'certificate', 'certified', 'deloitte', 'tata'],
        answer: "Mohit holds verified certifications:\n\n✅ **Technology Strategy & Innovation** — Deloitte (2025)\n✅ **Data Visualisation & Analytics** — Tata Group (2025)\n\nBoth focus on business intelligence, cloud technologies, and data-driven decision making."
    },
    // GitHub
    {
        keywords: ['github', 'repo', 'repository', 'open source', 'code'],
        answer: "Check out Mohit's GitHub: **github.com/mohitjeswani01** 🐙\n\nHe has 7+ public repositories including full-stack apps, AI agents, and hackathon projects. He also won a $200 prize for his open-source contributions to Accomplish!"
    },
    // Strengths
    {
        keywords: ['strength', 'strong', 'best', 'good at', 'specialize'],
        answer: "Mohit's key strengths:\n\n💡 Full-Stack Development (Java, React, Node.js)\n📊 Data Analytics & Visualization\n🤖 AI/ML & Agentic Workflows\n⚡ Rapid Prototyping & Hackathon Experience\n🎯 Problem-Solving & Systems Thinking"
    },
    // Fun / Hobbies
    {
        keywords: ['hobby', 'fun', 'interest', 'free time', 'besides coding'],
        answer: "Beyond code, Mohit enjoys participating in hackathons, exploring new AI tools, and building side projects. He's a continuous learner who's always pushing the boundaries of what's possible with technology! 🚀"
    },
    // Thank you
    {
        keywords: ['thank', 'thanks', 'bye', 'goodbye', 'see you'],
        answer: "Thanks for visiting Mohit's portfolio! 😊 If you'd like to work together or have more questions, don't hesitate to reach out via the Contact section. Have a great day! ✌️"
    },
];

// Fallback answer
const FALLBACK = "Hmm, I'm not sure about that one! 🤔 Try asking about Mohit's skills, projects, hackathons, education, or how to contact him. Or scroll through the portfolio to explore!";

// Greeting message
const GREETING_MESSAGE = {
    role: 'assistant' as const,
    text: "Hey! I'm Mohit's portfolio assistant 👋\n\nI can help you learn about his skills, projects, achievements, and more. What would you like to know?"
};

// Suggested questions
const SUGGESTIONS = [
    "What are Mohit's skills?",
    "Show me his projects",
    "Tell me about hackathon wins",
    "Is he available for hire?",
    "How to contact Mohit?",
];

function findAnswer(input: string): string {
    const lower = input.toLowerCase().trim();

    // Score each Q&A entry by how many keywords match
    let bestMatch: { answer: string; score: number } = { answer: FALLBACK, score: 0 };

    for (const qa of QA_DATA) {
        let score = 0;
        for (const keyword of qa.keywords) {
            if (lower.includes(keyword)) {
                score += keyword.length; // Longer keyword matches = higher priority
            }
        }
        if (score > bestMatch.score) {
            bestMatch = { answer: qa.answer, score };
        }
    }

    return bestMatch.answer;
}

type Message = {
    role: 'user' | 'assistant';
    text: string;
};

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Show bubble after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowBubble(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSend = (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || isTyping) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', text: messageText }]);
        setInput('');
        setIsTyping(true);

        // Simulate thinking delay (4-5 seconds)
        const delay = 4000 + Math.random() * 1000;
        setTimeout(() => {
            const answer = findAnswer(messageText);
            setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
            setIsTyping(false);
        }, delay);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Bubble Popup */}
            {showBubble && !isOpen && (
                <div
                    className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[9998] animate-in fade-in slide-in-from-bottom-4 duration-500"
                    onClick={() => { setIsOpen(true); setShowBubble(false); }}
                >
                    <div className="relative bg-white text-slate-900 rounded-2xl rounded-br-sm p-4 shadow-2xl max-w-[260px] cursor-pointer hover:shadow-3xl transition-shadow">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative">
                                <img src="/mohit-photo.png" alt="Mohit" className="w-10 h-10 rounded-full object-cover" />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Mohit's Assistant!</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Want to chat? I'm <span className="font-bold text-slate-900">Lyra ✨🎀</span>Mohit's assistant to answer questions about his work and experience.
                        </p>
                        <button className="mt-3 w-full bg-slate-900 text-white text-sm font-semibold py-2 rounded-xl hover:bg-slate-800 transition-colors">
                            Start Chat
                        </button>
                    </div>
                </div>
            )}

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-20 right-3 left-3 sm:left-auto sm:bottom-24 sm:right-6 z-[9999] sm:w-[370px] max-h-[75vh] sm:max-h-[620px] flex flex-col bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-300">

                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
                        <div className="relative">
                            <img src="/mohit-photo.png" alt="Mohit" className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30" />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-bold text-sm">Mohit Jeswani</h4>
                            <p className="text-green-400 text-[11px] font-medium">● Online</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[250px] sm:min-h-[380px] max-h-[50vh] sm:max-h-[440px]"
                        style={{ overscrollBehavior: 'contain' }}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-slate-800/80 text-slate-200 rounded-bl-sm border border-slate-700/50'
                                    }`}>
                                    {msg.text.split('\n').map((line, li) => (
                                        <React.Fragment key={li}>
                                            {li > 0 && <br />}
                                            {line.split(/(\*\*[^*]+\*\*)/).map((part, pi) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={pi} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
                                                }
                                                return <span key={pi}>{part}</span>;
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800/80 border border-slate-700/50 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions (only show when few messages) */}
                    {messages.length <= 2 && !isTyping && (
                        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                            {SUGGESTIONS.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(s)}
                                    className="text-[11px] px-2.5 py-1 bg-slate-800/60 border border-slate-700/50 text-slate-400 rounded-full hover:bg-slate-700 hover:text-white transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-3 border-t border-slate-800 bg-slate-900/50">
                        <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl border border-slate-700/50 px-3 py-1.5 focus-within:border-blue-500/50 transition-colors">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                disabled={isTyping}
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none disabled:opacity-50"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FAB Button */}
            <button
                onClick={() => { setIsOpen(!isOpen); setShowBubble(false); }}
                className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen
                    ? 'bg-slate-800 hover:bg-slate-700 rotate-0'
                    : 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 hover:scale-110'
                    }`}
            >
                {isOpen ? (
                    <ArrowDown className="w-5 h-5 text-white" />
                ) : (
                    <>
                        <MessageCircle className="w-6 h-6 text-white" />
                        {/* Notification dot */}
                        <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-600 animate-pulse" />
                    </>
                )}
            </button>
        </>
    );
};

export default ChatWidget;

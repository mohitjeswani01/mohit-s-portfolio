import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowDown } from 'lucide-react';

// --- STATIC Q&A KNOWLEDGE BASE ---
const QA_DATA: { keywords: string[]; answer: string }[] = [
    // Greetings
    {
        keywords: ['hi', 'hello', 'hey', 'hola', 'sup', 'yo'],
        answer: "Greetings! 👋 I'm **Lyra**, your personal guide to Mohit’s professional journey. He is a multi-talented developer who excels at building high-performance full-stack applications and cutting-edge AI agents. 🚀 I'm here to answer any questions you have about his technical skills, recent projects, or how to bring his expertise to your team!"
    },
    // Who is Mohit
    {
        keywords: ['who', 'introduce', 'yourself', 'mohit'],
        answer: "Mohit Jeswani is a highly driven **Software Developer & Data Analyst** and a final-year Computer Engineering student at VESIT, Class of 2026. 🎓 He specializes in engineering comprehensive, end-to-end digital systems that seamlessly integrate React, FastAPI, and advanced AI. As a global hackathon winner, he is known for shipping production-quality code that solves real-world problems with precision. 💎🚀"
    },
    // Skills
    {
        keywords: ['skills', 'tech', 'stack', 'technologies', 'tools', 'language'],
        answer: "Mohit's technical stack is incredibly diverse and production-ready! 🔥\n\n🔹 **Core Languages:** Java (OOP), Python, TypeScript, SQL\n🔹 **Modern Frontend:** React, Next.js, Tailwind CSS\n🔹 **Robust Backend:** Node.js, FastAPI, REST APIs\n🔹 **AI & Data Intelligence:** LLMs, Autonomous AI Agents, RAG, Pandas, Power BI\n\nHe is a versatile 'unicorn' developer who can navigate the entire stack, ensuring seamless integration between backend logic and stunning, responsive user interfaces. 💪"
    },
    // Projects
    {
        keywords: ['project', 'built', 'portfolio', 'made', 'build', 'badminton', 'coach'],
        answer: "Mohit doesn't just build projects; he engineers scalable products that deliver real value! 🚀\n\n🏸 **AI Badminton-Coach:** A real-time multimodal AI coach using Vision Agents SDK and WebRTC for live biomechanic analysis.\n🏗️ **Archestra Sentinel:** An enterprise-grade AI governance and observation platform for secure agentic workflows.\n🎯 **Hackathon Command Center:** A generative UI dashboard that morphs in real-time based on natural language intent.\n🤖 **AgentZero:** An autonomous, self-correcting AI agent orchestrating Kestra workflows and CI/CD pipelines.\n\nHe consistently ships production-level systems that are as beautiful as they are functional! 💎"
    },
    // Hackathons
    {
        keywords: ['hackathon', 'competition', 'wins', 'won', 'achievement', 'award', 'prize'],
        answer: "Mohit has a proven track record of dominating global hackathons under pressure! 🏆🔥\n\n🥇 **PR Winner:** Secured a $200 prize among 4,000+ global participants for high-quality open-source contributions.\n🎖️ **2 Fast 2 MCP:** Recognized as a Top 10 Swag Winner for building Archestra Sentinel.\n🎖️ **Agentic AI Leader:** A veteran of 'AI Agents Assemble', 'UI Strikes Back', and 'Syrus Hackathon'.\n\nHis ability to rapidly prototype complex AI systems and deliver polished results in competitive environments is truly exceptional. 🎯"
    },
    // Education
    {
        keywords: ['education', 'college', 'degree', 'university', 'study', 'cgpa', 'vesit'],
        answer: "Currently, Mohit is pursuing a **B.E. in Computer Engineering** at the prestigious VESIT, Mumbai (Class of 2026). 📚 While he maintains a solid academic foundation, his true expertise comes from his relentless commitment to building—shipping real-world products, exploring new technologies, and winning international competitions to sharpen his engineering craft! ✨"
    },
    // Location
    {
        keywords: ['location', 'where', 'city', 'based', 'live', 'mumbai'],
        answer: "Mohit is based in the vibrant tech hub of **Mumbai, India** 📍. However, he is fully equipped for global collaboration and is highly open to both remote roles and relocation opportunities worldwide! Distance is never a barrier when it comes to delivering top-tier engineering talent to your organization. 🌍🚀"
    },
    // Contact
    {
        keywords: ['contact', 'email', 'reach', 'connect', 'message'],
        answer: "Mohit is always open to professional networking and interesting collaborations! 🤝\n\n📧 **Email:** jeswanimohit959@gmail.com\n💼 **LinkedIn:** linkedin.com/in/mohit-jeswani\n🐙 **GitHub:** github.com/mohitjeswani01\n\nYou can also find a specialized contact form at the bottom of this page. He's incredibly responsive and would love to hear about your next big idea! 🚀"
    },
    // Resume
    {
        keywords: ['resume', 'cv', 'download'],
        answer: "You can find a download link for his full **CV** conveniently located on the homepage! 📄 Once you review the depth of his technical projects and competitive achievements, you’ll see exactly why he’s a massive asset for any high-growth engineering or AI-focused team! 🔥"
    },
    // Availability / Hire
    {
        keywords: ['available', 'hire', 'freelance', 'open', 'job', 'intern', 'opportunity'],
        answer: "Absolutely! Mohit is **actively seeking new opportunities** 🎉, including Internships, Freelance contracts, or Full-time roles in Software Engineering, AI Development, and Data Science. Don't miss out on securing a top-tier developer who can bridge the gap between complex AI logic and intuitive user experiences! 🚀💼"
    },
    // Website / Client work
    {
        keywords: ['website', 'client', 'service', 'build website', 'custom', 'design', 'web development'],
        answer: "Looking for a custom-built, high-performance application or a premium corporate website? 💻✨ Mohit specializes in creating sophisticated digital solutions that are optimized for speed and user engagement. Drop him a message via the Contact section to start discussing how he can bring your vision to life! 🚀"
    },
    // Pricing
    {
        keywords: ['price', 'cost', 'rate', 'charge', 'budget', 'quote', 'how much'],
        answer: "Mohit provides **exceptional value** by delivering premium-quality engineering at competitive rates tailored to your project scope! 💰 Whether it's a quick prototype or a full-scale AI integration, reach out through the Contact form to get a personalized quote and discuss your budget requirements. 🤝"
    },
    // Java / OOP
    {
        keywords: ['java', 'oop', 'object oriented'],
        answer: "Java is one of Mohit’s primary **power languages**! ☕🔥 He possesses deep expertise in Object-Oriented Programming (OOP) and Data Structures & Algorithms (DSA), consistently writing clean, documented, and enterprise-grade code that is both scalable and easy to maintain. 💪"
    },
    // React / Frontend
    {
        keywords: ['react', 'frontend', 'next', 'nextjs', 'ui'],
        answer: "His frontend development capabilities are truly ELITE! 🎨🔥 Mohit builds breathtaking, highly interactive, and animated user interfaces using **React, Next.js, and Framer Motion**. Just spend a few moments exploring this portfolio—every interaction and pixel is designed for a premium user experience. ✨"
    },
    // Data Analytics
    {
        keywords: ['data', 'analytics', 'analyst', 'power bi', 'tableau', 'pandas'],
        answer: "Mohit is a master **data storyteller**! 📊✨ Expertly skilled in **Python, SQL, Power BI, and Tableau**, he has been certified by industry leaders like Deloitte and Tata Group. He goes beyond just building apps; he analyzes complex datasets to provide the actionable insights your business needs to grow. 🦄"
    },
    // AI / ML
    {
        keywords: ['ai', 'machine learning', 'artificial intelligence', 'llm', 'agent', 'ml'],
        answer: "Operating at the absolute cutting edge of AI! 🤖🧠 Mohit has engineered autonomous agents, real-time computer vision bots, and LLM-powered applications using the latest frameworks. If your project requires next-generation intelligence and sophisticated automation, he is the engineer you need leading the charge! 🚀"
    },
    // Certifications
    {
        keywords: ['certification', 'certificate', 'certified', 'deloitte', 'tata'],
        answer: "His technical expertise is formally validated! ✅ Mohit holds professional certifications in **Tech Strategy from Deloitte** and **Data Visualisation from Tata Group**. These demonstrate his ability to understand both deep technical architectures and high-level business strategy simultaneously. 🏢✨"
    },
    // GitHub
    {
        keywords: ['github', 'repo', 'repository', 'open source', 'code'],
        answer: "His GitHub profile is a legitimate goldmine for any engineer or recruiter! 🐙💎 Visit **github.com/mohitjeswani01** to see hundreds of contributions, production-level AI agents, and award-winning hackathon repositories. His commitment to open-source and clean code is evident in every commit! ⭐"
    },
    // Strengths
    {
        keywords: ['strength', 'strong', 'best', 'good at', 'specialize'],
        answer: "What sets Mohit apart? It’s the perfect synergy of technical depth! 💎 He excels in Full-Stack Development, Data Intelligence, and AI Engineering. Combine that with his rapid prototyping speed and excellent communication skills, and you have a developer who can lead a project from concept to deployment! 🌟"
    },
    // Fun / Hobbies
    {
        keywords: ['hobby', 'fun', 'interest', 'free time', 'besides coding'],
        answer: "When he’s not behind a screen, Mohit loves competing in high-stakes hackathons, exploring the latest breakthroughs in AI research, and brainstorming his next big side project. His genuine passion for solving complex puzzles through technology is what drives him to be a top 1% developer! ❤️‍🔥🚀"
    },
    // Thank you
    {
        keywords: ['thank', 'thanks', 'bye', 'goodbye', 'see you'],
        answer: "It’s been a pleasure chatting with you! 😊✨ If you're ready to collaborate with an exceptional developer and AI engineer, don't hesitate to reach out at **jeswanimohit959@gmail.com**. I hope you have an incredible day exploring the rest of Mohit's portfolio! 🚀✌️"
    },
    // Python / SQL specific
    {
        keywords: ['python', 'sql'],
        answer: "His proficiency in Python and SQL is truly world-class! 🐍 From complex SQL query optimizations to developing sophisticated Python-powered AI models and data pipelines, he handles it all with ease. He ensures your data is not just stored, but intelligently utilized. 📊🔥"
    },
];

// Fallback answer
const FALLBACK = "Hmm, I don't have a specific answer for that! 🤔 But trust me, Mohit is incredibly talented. Ask about his **skills**, **projects**, **hackathons**, or how to **hire him**. Or just explore this gorgeous portfolio! 😉";

// Greeting message
const GREETING_MESSAGE = {
    role: 'assistant' as const,
    text: "Hey! I'm **Lyra** ✨ — Mohit's assistant 👋 I'm here to tell you about an insanely talented developer. Ask me about his skills, projects, or hackathon wins! 🚀"
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

    // Score each Q&A entry by keyword relevance
    let bestMatch: { answer: string; score: number } = { answer: FALLBACK, score: 0 };

    for (const qa of QA_DATA) {
        let score = 0;
        let matchedCount = 0;
        for (const keyword of qa.keywords) {
            if (lower.includes(keyword)) {
                // Longer keywords = higher priority, multi-word keywords get a bonus
                score += keyword.length + (keyword.includes(' ') ? 3 : 0);
                matchedCount++;
            }
        }
        // Bonus for higher proportion of keywords matched (specificity boost)
        if (matchedCount > 0) {
            score += (matchedCount / qa.keywords.length) * 5;
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

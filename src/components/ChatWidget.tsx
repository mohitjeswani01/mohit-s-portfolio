import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowDown } from 'lucide-react';

// --- STATIC Q&A KNOWLEDGE BASE ---
const QA_DATA: { keywords: string[]; answer: string }[] = [
    // Greetings
    {
        keywords: ['hi', 'hello', 'hey', 'hola', 'sup', 'yo'],
        answer: "Hey! 👋 I'm **Lyra**, Mohit's assistant. He's an incredible developer who builds amazing full-stack apps and AI agents. 🔥 Ask me about his skills, projects, or how to work with him!"
    },
    // Who is Mohit
    {
        keywords: ['who', 'introduce', 'yourself', 'mohit'],
        answer: "Mohit is a **Software Developer & Data Analyst** (VESIT, Class of 2026). He builds end-to-end digital systems with React, FastAPI, AI, and Data Analytics. He’s a global hackathon winner who ships production-quality code. If you want top-tier talent, he's your guy! 💎🚀"
    },
    // Skills
    {
        keywords: ['skills', 'tech', 'stack', 'technologies', 'tools', 'language'],
        answer: "Mohit's stack is STACKED! 🔥\n\n🔹 **Core:** Java, Python, TS/JS, SQL\n🔹 **Frontend:** React, Next.js, Tailwind\n🔹 **Backend:** Node.js, FastAPI\n🔹 **Data/AI:** Pandas, Power BI, LLMs, AI Agents\n\nHe's a versatile unicorn who masters full-stack dev, data, and AI. 💪"
    },
    // Projects
    {
        keywords: ['project', 'built', 'portfolio', 'made', 'build'],
        answer: "Mohit engineers real solutions, not just projects! 🚀\n\n🏗️ **Archestra Sentinel:** Enterprise AI governance\n🎯 **Hackathon Command Center:** Generative AI dashboard\n🤖 **AgentZero:** Self-correcting AI agent\n📚 **Edu-Pilot:** AI course generator\n\nCheck out his portfolio for more. He ships production-quality systems! 💎"
    },
    // Hackathons
    {
        keywords: ['hackathon', 'competition', 'wins', 'won', 'achievement', 'award', 'prize'],
        answer: "Mohit dominates hackathons! 🏆🔥\n\n🥇 **PR Winner** ($200 prize out of 4000+ globally!)\n🎖️ **2 Fast 2 MCP:** Top 10 Swag Winner! 🎁\n🎖️ **AI Agents Assemble** & **UI Strikes Back** & **Syrus Hackathon** veteran.\n\nUnder pressure, he builds incredible things fast. A true 10x developer! 🎯"
    },
    // Education
    {
        keywords: ['education', 'college', 'degree', 'university', 'study', 'cgpa', 'vesit'],
        answer: "He is pursuing a **B.E. in Computer Engineering** at VESIT, Mumbai (Class of 2026). But his real education comes from building—shipping real products and dominating hackathons! 📚✨"
    },
    // Location
    {
        keywords: ['location', 'where', 'city', 'based', 'live', 'mumbai'],
        answer: "Based in **Mumbai, India** 📍 but open to remote work and relocation! Distance is no barrier for top talent. 🌍🚀"
    },
    // Contact
    {
        keywords: ['contact', 'email', 'reach', 'connect', 'message'],
        answer: "Let's connect! 🤝\n📧 jeswanimohit959@gmail.com\n💼 linkedin.com/in/mohit-jeswani\n🐙 github.com/mohitjeswani01\nOr just use the form in the Contact section. He's super responsive! 🚀"
    },
    // Resume
    {
        keywords: ['resume', 'cv', 'download'],
        answer: "Click **'Download CV'** on the homepage! 📄 Once you see his skills and achievements, you'll definitely want him on your team! 🔥"
    },
    // Availability / Hire
    {
        keywords: ['available', 'hire', 'freelance', 'open', 'job', 'intern', 'opportunity'],
        answer: "Yes! Mohit is **actively open to opportunities** 🎉 — Internships, Freelance, or Full-time roles in Software, AI, and Data. Grab this top-tier talent before someone else does! 🚀💼"
    },
    // Website / Client work
    {
        keywords: ['website', 'client', 'service', 'build website', 'custom', 'design', 'web development'],
        answer: "Need a custom, killer app or website? 💻✨ Mohit builds premium, high-performance web solutions. Drop a message in the Contact section to discuss your next big idea! 🚀"
    },
    // Pricing
    {
        keywords: ['price', 'cost', 'rate', 'charge', 'budget', 'quote', 'how much'],
        answer: "Mohit offers **incredible value** with premium quality at competitive rates! 💰 Reach out via the Contact section for a custom quote. 🤝"
    },
    // Java / OOP
    {
        keywords: ['java', 'oop', 'object oriented'],
        answer: "Java is one of his **power languages**! ☕🔥 He has deep expertise in OOP and DSA, writing exceptionally clean, enterprise-grade code. 💪"
    },
    // React / Frontend
    {
        keywords: ['react', 'frontend', 'next', 'nextjs', 'ui'],
        answer: "His frontend game is ELITE! 🎨🔥 He builds stunning, animated UIs with **React & Next.js**. Just look at this gorgeous portfolio—every pixel is perfection. ✨"
    },
    // Data Analytics
    {
        keywords: ['data', 'analytics', 'analyst', 'power bi', 'tableau', 'pandas'],
        answer: "He’s a **data storyteller**! 📊✨ Expert in **Python, SQL, Power BI, and Tableau**. Certified by Deloitte & Tata, he builds apps AND analyzes the data. A true unicorn! 🦄"
    },
    // AI / ML
    {
        keywords: ['ai', 'machine learning', 'artificial intelligence', 'llm', 'agent', 'ml'],
        answer: "At the cutting edge of AI! 🤖🧠 He’s built autonomous agents, real-time vision bots, and LLM-powered apps. If you need next-gen AI, Mohit is leading the charge! 🚀"
    },
    // Certifications
    {
        keywords: ['certification', 'certificate', 'certified', 'deloitte', 'tata'],
        answer: "Validated expertise! ✅ Certified in **Tech Strategy by Deloitte** and **Data Analytics by Tata Group**. He understands business and tech at the highest level! 🏢✨"
    },
    // GitHub
    {
        keywords: ['github', 'repo', 'repository', 'open source', 'code'],
        answer: "His GitHub is a goldmine! 🐙💎 **github.com/mohitjeswani01** — Full of clean, production-level code, AI agents, and hackathon-winning projects! ⭐"
    },
    // Strengths
    {
        keywords: ['strength', 'strong', 'best', 'good at', 'specialize'],
        answer: "What makes him special? The perfect combo! 💎 He excels at Full-Stack Dev, Data Analytics, and AI. He's a rapid prototyper and a fantastic communicator! 🌟"
    },
    // Fun / Hobbies
    {
        keywords: ['hobby', 'fun', 'interest', 'free time', 'besides coding'],
        answer: "Beyond code, Mohit loves dominating hackathons, exploring new AI tech, and building side projects. His passion for tech is contagious! ❤️‍🔥🚀"
    },
    // Thank you
    {
        keywords: ['thank', 'thanks', 'bye', 'goodbye', 'see you'],
        answer: "Thanks for stopping by! 😊✨ If you want to work with an amazing developer, reach out at **jeswanimohit959@gmail.com**. Have an awesome day! 🚀✌️"
    },
    // Python / SQL specific
    {
        keywords: ['python', 'sql'],
        answer: "His Python and SQL skills are ELITE! 🐍 From complex SQL optimizations to Python-powered AI and data analytics, he handles it all flawlessly. 📊🔥"
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

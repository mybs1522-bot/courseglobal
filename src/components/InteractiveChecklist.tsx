
import React, { useState } from 'react';
import { Check, ArrowRight, AlertTriangle, Zap } from 'lucide-react';

const PAIN_POINTS = [
    "I spend 8+ hours on a single render",
    "Clients keep asking for 'one small change' for free",
    "I'm worried AI might actually replace me",
    "My portfolio looks like everyone else's",
    "I know I should charge more, but I can't justify it",
    "I waste hours searching for textures and models online",
    "I've watched 100 YouTube tutorials but still feel stuck",
    "I see others getting dream projects while I struggle"
];

const RESULT_MESSAGES = [
    { min: 1, max: 2, label: "You're hitting some friction", color: "text-brand-accent", message: "Minor optimizations could save you 10+ hours/week." },
    { min: 3, max: 4, label: "YOUR WORKFLOW IS HOLDING YOU BACK", color: "text-yellow-400", message: "You're losing thousands in potential income every month. The good news? Every single one of these is fixable." },
    { min: 5, max: 6, label: "⚠️ CRITICAL: YOU NEED THIS", color: "text-orange-400", message: "You're not bad at design. You're fighting with broken tools and outdated methods. Let us fix this in 15 days." },
    { min: 7, max: 8, label: "🚨 URGENT: CAREER AT RISK", color: "text-red-400", message: "You're bleeding time, money, and confidence. This course was literally built for someone exactly like you." }
];

export const InteractiveChecklist: React.FC<{ onCtaClick?: () => void }> = ({ onCtaClick }) => {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(i => i !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    const count = checkedItems.length;
    const resultMessage = RESULT_MESSAGES.find(r => count >= r.min && count <= r.max);

    return (
        <div className="max-w-xl mx-auto glass-card p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 text-center">
                Be honest. How many sound like you?
            </h3>
            <p className="text-white/40 text-sm text-center mb-6">Tap every one that hits home. No judgment.</p>
            <div className="space-y-3">
                {PAIN_POINTS.map((point, idx) => {
                    const isChecked = checkedItems.includes(idx);
                    return (
                        <div
                            key={idx}
                            onClick={() => toggleItem(idx)}
                            className={`
                flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300
                border border-transparent
                ${isChecked
                                    ? 'bg-brand-primary/20 border-brand-primary/50 scale-[1.02]'
                                    : 'bg-white/5 hover:bg-white/10 hover:border-white/10'}
              `}
                        >
                            <div className={`
                w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-300 shrink-0
                ${isChecked
                                    ? 'bg-brand-primary border-brand-primary animate-fadeInScale'
                                    : 'border-white/30 bg-transparent'}
              `}>
                                {isChecked && <Check size={16} className="text-white" />}
                            </div>
                            <span className={`text-sm sm:text-base font-medium transition-colors ${isChecked ? 'text-white' : 'text-white/60'}`}>
                                {point}
                            </span>
                        </div>
                    );
                })}
            </div>

            {count > 0 && resultMessage && (
                <div className="mt-6 text-center animate-fadeInUp">
                    <div className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] ${resultMessage.color} mb-3`}>
                        {count >= 5 ? <AlertTriangle size={14} /> : <Zap size={14} />}
                        {resultMessage.label}
                    </div>
                    <p className="text-white/60 text-sm mb-5">
                        {resultMessage.message}
                    </p>
                    {count >= 3 && onCtaClick && (
                        <button
                            onClick={onCtaClick}
                            className="group cta-gradient text-white px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 mx-auto hover:-translate-y-0.5 transition-all shadow-glow"
                        >
                            Fix My Workflow Now
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>
            )}

            {count === 0 && (
                <p className="text-white/20 text-xs text-center mt-4 uppercase tracking-widest">
                    {PAIN_POINTS.length} common struggles — tap to check
                </p>
            )}
        </div>
    );
};

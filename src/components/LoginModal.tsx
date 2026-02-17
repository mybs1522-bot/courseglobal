import React from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div className="relative glass-card p-8 rounded-[2rem] max-w-md w-full border-white/10" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"><X size={20} /></button>
                <h2 className="text-xl font-display font-bold text-white mb-2">Student Login</h2>
                <p className="text-white/40 text-sm mb-6">Access your courses and materials.</p>
                <a href="https://architect.systeme.io/courses" target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center py-4 rounded-xl text-white font-black uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5 shadow-glow"
                    style={{ background: 'linear-gradient(135deg, #FF6B47, #e05535)' }}>
                    Go to Course Portal →
                </a>
                <p className="text-center text-white/30 text-xs mt-4 font-bold uppercase tracking-widest">Hosted on Systeme.io</p>
            </div>
        </div>
    );
};

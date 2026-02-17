
import React, { useState, useEffect } from 'react';
import { AdminModal } from '../components/AdminModal';
import { LoginModal } from '../components/LoginModal';
import { StackedCarousel } from '../components/StackedCarousel';
import { InteractiveChecklist } from '../components/InteractiveChecklist';
import { TESTIMONIALS, FAQ_ITEMS, COURSES, VALUE_STACK_ITEMS, WHO_IS_THIS_FOR, WHO_IS_THIS_NOT_FOR, MENTORS, RATINGS, INCOME_TIERS } from '../constants';
import { GlassCard } from '../components/ui/GlassCard';
import {
  Check, CheckCircle2, ArrowRight, Star, LogIn,
  Zap, TrendingUp, Sparkles, AlertCircle, XCircle,
  CheckCircle, Rocket, Briefcase, Play,
  Lock, Gem, BarChart3, Users, GraduationCap, ListChecks,
  Radio, Shield, ChevronDown, Quote, MousePointer2, Clock, History, Target,
  BrainCircuit, HelpCircle, DollarSign, Microscope, BookOpen, ShieldCheck, Gift, Award, X, Package, Layers,
  Heart, Globe, MessageCircle, Eye, Sun, Moon, Laptop, MonitorSmartphone
} from 'lucide-react';
import { Course } from '../types';
import { useNavigate } from 'react-router-dom';

/* ─── LOGO ─── */
const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <div className="relative w-10 h-10 border border-white/20 flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:bg-brand-primary group-hover:border-brand-primary rounded-xl">
      <span className="font-display font-black text-xl tracking-tighter relative z-10 text-white">AV</span>
    </div>
    <div className="flex flex-col text-left">
      <span className="font-display font-bold text-lg tracking-[0.25em] leading-none text-white">AVADA</span>
    </div>
  </div>
);

/* ─── MASTER CTA ─── */
interface MasterCTAProps { onClick: () => void; timeLeft: { h: number; m: number; s: number }; className?: string; dark?: boolean; text?: string; subtext?: string; }

const MasterCTA: React.FC<MasterCTAProps> = ({ onClick, timeLeft, className = "", dark = false, text = "Start Learning Now", subtext = "Instant Access • 7-Day Refund" }) => {
  const f = (v: number) => v.toString().padStart(2, '0');
  return (
    <div className={`flex flex-col items-center gap-4 w-full max-w-xl mx-auto ${className}`}>
      <div className="flex items-end justify-between w-full px-2 mb-1">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-brand-primary mb-1">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div> 50% OFF TODAY
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl sm:text-5xl font-display font-black tracking-tighter text-white">$49</span>
            <span className="text-white/20 line-through text-lg font-bold">$199</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-red-400 mb-1 animate-pulse">⏳ Discount Offer Ends Soon</div>
          <div className="flex items-center gap-1 font-mono font-bold text-xl sm:text-2xl tabular-nums text-brand-primary">
            <span className="bg-surface-2 px-1.5 py-0.5 rounded">{f(timeLeft.h)}</span><span className="text-white/20">:</span>
            <span className="bg-surface-2 px-1.5 py-0.5 rounded">{f(timeLeft.m)}</span><span className="text-white/20">:</span>
            <span className="bg-surface-2 px-1.5 py-0.5 rounded">{f(timeLeft.s)}</span>
          </div>
        </div>
      </div>
      <button onClick={onClick} className="group relative w-full text-white py-5 sm:py-6 px-4 sm:px-12 rounded-2xl transition-all duration-500 animate-glow-pulse hover:-translate-y-1 active:scale-[0.98] overflow-hidden shadow-glow" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
          <span className="text-base sm:text-xl font-black uppercase tracking-tight whitespace-nowrap">{text}</span>
          <div className="bg-white/20 p-1.5 rounded-full group-hover:translate-x-2 transition-transform duration-300"><ArrowRight size={18} /></div>
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 -left-full w-2/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:animate-[shine_1.5s_infinite]"></div>
        </div>
      </button>
      <div className="text-center text-xs font-bold text-white/40 uppercase tracking-widest">Instant Access • 7-Day Refund</div>
    </div>
  );
};

/* ─── INLINE TIMER CTA (for standalone buttons) ─── */
const TimerCTA: React.FC<{ onClick: () => void; timeLeft: { h: number; m: number; s: number }; text?: string }> = ({ onClick, timeLeft, text = 'Start Learning Now' }) => {
  const f = (v: number) => v.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      <button onClick={onClick} className="group text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-sm sm:text-base font-black uppercase tracking-widest inline-flex items-center gap-3 hover:-translate-y-1 transition-all shadow-glow" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
        {text} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
        <span className="text-red-400 animate-pulse">⏳ Offer Ends</span>
        <span className="font-mono text-brand-primary tabular-nums">{f(timeLeft.h)}:{f(timeLeft.m)}:{f(timeLeft.s)}</span>
      </div>
    </div>
  );
};

/* ─── FAQ ACCORDION ─── */
const FAQAccordion: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex items-center justify-between text-left group">
        <span className="text-base sm:text-lg font-bold text-white/90 group-hover:text-brand-primary transition-colors pr-4">{question}</span>
        <ChevronDown size={20} className={`text-white/30 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-brand-primary' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[600px] pb-5' : 'max-h-0'}`}>
        <p className="text-white/50 leading-relaxed font-medium text-sm sm:text-base">{answer}</p>
      </div>
    </div>
  );
};

/* ─── SOCIAL PROOF TOAST ─── */
const SocialProofToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const names = ['Emily from NYC', 'Kenji from Tokyo', 'Sofia from Madrid', 'James from Sydney', 'Lisa from London', 'Carlos from Buenos Aires', 'Elena from Berlin', 'Lucas from São Paulo'];
  const times = ['2 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago', '15 minutes ago', '18 minutes ago', '22 minutes ago', '25 minutes ago'];
  useEffect(() => {
    const showToast = () => { setVisible(true); setTimeout(() => { setVisible(false); setTimeout(() => { setCurrentIndex(prev => (prev + 1) % names.length); }, 500); }, 4000); };
    const initialTimeout = setTimeout(showToast, 8000);
    const interval = setInterval(showToast, 25000);
    return () => { clearTimeout(initialTimeout); clearInterval(interval); };
  }, []);
  return (
    <div className={`fixed bottom-20 md:bottom-6 left-4 z-50 transition-all duration-500 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="glass-card px-4 py-3 rounded-xl flex items-center gap-3 shadow-glow max-w-xs border-brand-primary/30">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-emerald-400 rounded-full flex items-center justify-center shrink-0"><Check size={14} className="text-white" /></div>
        <div>
          <p className="text-sm font-bold text-white">{names[currentIndex]}</p>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">downloaded courses {times[currentIndex]}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════ LANDING PAGE ═══════════════════════════════════════ */
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 23, s: 49 });
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [enrolledRecently] = useState(Math.floor(Math.random() * 12) + 20);
  const [heroIdx, setHeroIdx] = useState(0);
  const HERO_LINES = [
    <>Most architects & designers<br />learn this <span className="text-gradient">the hard way.</span></>,
    <>The AI workflow top firms<br /><span className="text-gradient">don't want you to know.</span></>,
    <>From zero to photorealistic<br />renders in <span className="text-gradient">just 15 days.</span></>,
    <>Learn to design any interior<br />or exterior in <span className="text-gradient">just 15 days.</span></>,
  ];

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % 4), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const calc = () => {
      const D = (2 * 3600 + 23 * 60 + 49) * 1000, now = Date.now(), r = D - (now % D);
      setTimeLeft({ h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) });
    };
    const t = setInterval(calc, 1000); calc();
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const openCheckout = () => { navigate('/checkout'); };
  const openCourseCheckout = (course: Course) => { navigate('/checkout'); };

  return (
    <div className="min-h-screen bg-surface-0 text-white font-sans overflow-x-hidden selection:bg-brand-primary selection:text-white">

      {/* ─── STICKY NAV ─── */}
      <nav className="w-full z-50 sticky top-0 bg-surface-0/90 backdrop-blur-xl border-b border-white/5">
        <div className="bg-gradient-to-r from-brand-primary via-purple-500 to-brand-primary text-white py-1.5 px-4 flex justify-center text-center text-[10px] font-black uppercase tracking-[0.15em]">
          {"\u26A1"} {enrolledRecently} people joined in the last hour • Price goes up soon
        </div>
        <div className="px-4 sm:px-6 md:px-12 py-3 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"><LogIn size={14} /> Login</button>
            <button onClick={openCheckout} className="hidden md:block text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all" style={{ background: '#6366f1' }}>Start Learning — $49</button>
          </div>
        </div>
      </nav>

      <main>
        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1 — THE HOOK (Above the Fold) */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
          <div className="aurora-bg w-[600px] h-[600px] bg-brand-primary/20 top-[-200px] left-[-200px] animate-aurora"></div>
          <div className="aurora-bg w-[500px] h-[500px] bg-brand-primary/10 top-[20%] right-[-200px] animate-aurora" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-grid opacity-30"></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="w-full lg:w-3/5 text-center lg:text-left">
                <div className="reveal inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-2 rounded-full text-[7px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-8 border-brand-primary/30">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-primary animate-pulse"></span>
                  <span className="text-white/80 whitespace-nowrap">Learn Everything in Interior/Exterior Design</span>
                </div>

                <div className="reveal stagger-1 relative h-[4.5rem] sm:h-[7rem] md:h-[9rem] lg:h-[11rem] mb-4 sm:mb-6 overflow-hidden">
                  {HERO_LINES.map((line, i) => (
                    <h1 key={i} className={`absolute inset-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tighter transition-all duration-700 ease-in-out ${i === heroIdx ? 'opacity-100 translate-y-0' : i === (heroIdx + 2) % 3 ? 'opacity-0 -translate-y-8' : 'opacity-0 translate-y-8'}`}>
                      {line}
                    </h1>
                  ))}
                </div>

                <p className="reveal stagger-2 text-base sm:text-xl md:text-2xl text-white/60 font-medium max-w-2xl mb-3 sm:mb-4 leading-relaxed mx-auto lg:mx-0">
                  A <span style={{ color: '#4FACFE', fontWeight: 600 }}>systematic, step-by-step program</span> that takes you<br className="hidden sm:block" />
                  from complete beginner to AI-powered designer in 15 days.
                </p>
                <p className="reveal stagger-2 text-sm sm:text-base text-white/40 max-w-xl mb-6 sm:mb-8 leading-relaxed mx-auto lg:mx-0">
                  <span style={{ color: '#6366f1', fontWeight: 600 }}>No degree required. No prior knowledge.</span><br />
                  Just you and your laptop. 6 courses. 10,000+ assets. AI tools.<br />
                  Everything for <span className="text-white font-bold">just $49.</span>
                </p>

                <div className="reveal stagger-3 w-full max-w-md mx-auto lg:mx-0 mb-6 sm:mb-8">
                  <MasterCTA onClick={openCheckout} timeLeft={timeLeft} text="Start Learning Now →" />
                </div>

                <div className="reveal stagger-4 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Laptop className="text-brand-primary" size={14} /> Zero to Pro</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="text-brand-primary" size={14} /> No Experience Needed</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="text-brand-primary" size={14} /> Lifetime Access</span>
                </div>
              </div>

              <div className="w-full lg:w-2/5 relative reveal stagger-5">
                <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-2xl sm:rounded-[2rem] overflow-hidden">
                  <iframe src="https://iframe.mediadelivery.net/embed/494628/3009186c-d8fe-400c-b1af-2787fdf042a1?autoplay=true&loop=true&muted=true&preload=true" className="absolute inset-0 w-full h-full scale-150" allow="autoplay; fullscreen" loading="lazy" style={{ border: 'none' }}></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-surface-1 border-y border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4 sm:gap-10 flex-wrap">
              <div className="reveal flex items-center gap-1.5 sm:gap-2 shrink-0"><span className="text-lg sm:text-2xl font-display font-black text-white">50,000+</span><span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-white/30">Students</span></div>
              <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
              <div className="reveal stagger-1 flex items-center gap-1.5 sm:gap-2 shrink-0"><span className="text-lg sm:text-2xl font-display font-black text-white">42+</span><span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-white/30">Countries</span></div>
              <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
              <div className="reveal stagger-2 flex items-center gap-1.5 sm:gap-2 shrink-0"><span className="text-lg sm:text-2xl font-display font-black text-brand-primary">4.8★</span><span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-white/30">Rating</span></div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* PAIN → SOLUTION SECTION */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-surface-0 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <div className="reveal inline-flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4"><AlertCircle size={14} /> Sound Familiar?</div>
              <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">Struggling with <span className="text-gradient">any of these?</span></h2>
              <p className="reveal stagger-2 text-white/40 text-lg max-w-xl mx-auto">Every problem below has a solution inside the bundle.</p>
            </div>
            <div className="space-y-4 sm:space-y-5">
              {[
                { emoji: '🤖', problem: 'AI is taking over design — and you don\'t know where to start', fixEmoji: '🧠', fix: 'We walk you through every AI tool step-by-step — no tech skills needed' },
                { emoji: '⏰', problem: 'One concept takes you days of sketching and revisions', fixEmoji: '⚡', fix: 'Our AI workflow lets you generate 10 design concepts in 10 minutes flat' },
                { emoji: '👻', problem: 'You send your portfolio and… crickets. No reply.', fixEmoji: '💼', fix: 'We help you build an AI-powered portfolio in 15 days that lands you clients' },
                { emoji: '💸', problem: 'You\'re charging $200–$500 while AI-savvy designers charge 10×', fixEmoji: '💰', fix: 'Our students charge $2,000–$8,000 per project — because they work 10× faster' },
                { emoji: '😰', problem: 'Firms are hiring AI designers and you feel left behind', fixEmoji: '🚀', fix: 'We make you the AI designer firms are looking for — in just 15 days' },
                { emoji: '🔍', problem: 'You\'re still Googling textures and building models from scratch', fixEmoji: '🎁', fix: 'We give you 10,000+ textures, 2,000+ models, and AI tools to generate more' },
              ].map((item, i) => (
                <div key={i} className={`reveal stagger-${Math.min(i + 1, 4)} glass-card rounded-2xl overflow-hidden`}>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-stretch">
                    {/* Problem Side */}
                    <div className="p-4 sm:p-6 bg-red-500/5 flex items-start gap-3">
                      <span className="text-lg sm:text-2xl shrink-0">{item.emoji}</span>
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-red-400/60 mb-1">The Problem</div>
                        <p className="text-white/70 font-bold text-xs sm:text-sm leading-snug">{item.problem}</p>
                      </div>
                    </div>
                    {/* Arrow Divider */}
                    <div className="flex items-center px-2 sm:px-4 bg-gradient-to-r from-red-500/5 to-brand-primary/5">
                      <ArrowRight size={16} className="text-brand-primary" />
                    </div>
                    {/* Fix Side */}
                    <div className="p-4 sm:p-6 bg-brand-primary/5 flex items-start gap-3">
                      <span className="text-lg sm:text-2xl shrink-0">{item.fixEmoji}</span>
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-brand-primary/60 mb-1">Our Fix</div>
                        <p className="text-white/80 font-bold text-xs sm:text-sm leading-snug">{item.fix}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal mt-10 text-center">
              <button onClick={openCheckout} className="group text-white px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest inline-flex items-center gap-3 hover:-translate-y-1 transition-all shadow-glow" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
                Fix All of This for $49 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3 — WHAT IS AVADA? */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-surface-0 relative overflow-hidden">
          <div className="aurora-bg w-[500px] h-[500px] bg-brand-primary/15 top-[-100px] right-[-200px] animate-aurora"></div>
          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">

            {/* COURSE SLIDER */}
            <div className="reveal-scale mb-10 sm:mb-12">
              <StackedCarousel onCourseClick={openCourseCheckout} />
            </div>

            <div className="reveal inline-flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Play size={14} fill="currentColor" /> See It In Action
            </div>
            <h2 className="reveal stagger-1 text-2xl sm:text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter">Here is your shortcut<br /><span className="text-gradient">from zero to photoreal.</span></h2>
            <p className="reveal stagger-2 text-white/50 text-sm sm:text-lg max-w-2xl mx-auto mb-3 sm:mb-4">
              A <span style={{ color: '#4FACFE', fontWeight: 600 }}>systematic AI-powered program</span> for architects & interior designers.<br />
              6 step-by-step courses. AI tools. 10,000+ assets.<br />
              <span style={{ color: '#4FACFE', fontWeight: 700 }}>"Start from zero. End with a portfolio."</span>
            </p>
            <p className="reveal stagger-2 text-white/40 text-sm max-w-xl mx-auto mb-8 sm:mb-10">
              No degree required. No prior experience needed.<br />
              Just hands-on projects that build your skills in 15 days.
            </p>

            {/* VIDEO 2 */}
            <div className="reveal-scale relative w-full aspect-video overflow-hidden rounded-xl" style={{ background: 'transparent' }}>
              <iframe src="https://iframe.mediadelivery.net/embed/494628/b246d571-6816-4299-9f41-b4e3c957e992?autoplay=true&loop=true&muted=true&preload=true&responsive=true" className="w-full h-full" allowFullScreen allow="autoplay; fullscreen" loading="lazy" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></iframe>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 4 — WHAT YOU'LL LEARN (Benefits) + Two-Phase Engine */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-surface-1 relative">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <div className="reveal"><BrainCircuit className="text-brand-primary mx-auto mb-6" size={44} /></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">Want to design faster?<br />Want clients to say <span className="text-gradient">wow?</span></h2>
            <p className="reveal stagger-2 text-lg sm:text-xl text-white/40 font-medium max-w-2xl mx-auto mb-12 sm:mb-16">Here's exactly how. Two phases. 15 days.<br /><span style={{ color: '#4FACFE', fontWeight: 700 }}>The fastest path to mastery.</span></p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="reveal-left p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] glass-card text-left relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-4">Phase 1 — Foundation</div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tighter mb-4">Draft. Model. Build.</h3>
                  <p className="text-white/40 mb-6 leading-relaxed text-sm sm:text-base">AutoCAD + SketchUp. The backbone.<br />Learn to draft accurate plans and build complex 3D models fast.<br /><span style={{ color: '#4FACFE', fontWeight: 600 }}>This is where you become dangerous.</span></p>
                  <div className="space-y-3 mb-6">
                    {['Construction-ready plans in hours, not days', 'Complex 3D models without crashes', 'Speed shortcuts that save 60% of your time — so you go home at 5pm'].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 glass-card p-3 sm:p-4 rounded-xl font-medium text-xs sm:text-sm text-white/70"><CheckCircle2 size={16} className="text-brand-primary shrink-0" /> {p}</div>
                    ))}
                  </div>
                  <div className="glass-card p-4 rounded-xl border-brand-primary/20">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">Student Result</p>
                    <p className="text-sm text-white/70 italic">"I cut my drafting time from 8 hours to 3 hours in the first week." — James W., Sydney</p>
                  </div>
                </div>
              </div>
              <div className="reveal-right p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-brand-primary/20 to-purple-500/10 border border-brand-primary/20 text-left relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-4">Phase 2 — Superpower</div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tighter mb-4">Render. Animate. Earn.</h3>
                  <p className="text-white/40 mb-6 leading-relaxed text-sm sm:text-base">V-Ray, Lumion, D5 + AI.<br />Turn models into photographs. Create cinematic walkthroughs.<br /><span style={{ color: '#4FACFE', fontWeight: 700 }}>This is where you start earning serious money.</span></p>
                  <div className="space-y-3 mb-6">
                    {['Photorealistic renders clients can\'t tell from photos', 'Cinematic walkthroughs that close deals in 60 seconds', 'AI concept generation — 10 ideas in 10 minutes'].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 glass-card p-3 sm:p-4 rounded-xl font-medium text-xs sm:text-sm text-white/70"><Zap size={16} className="text-brand-primary shrink-0" /> {p}</div>
                    ))}
                  </div>
                  <div className="glass-card p-4 rounded-xl border-brand-primary/20">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">Student Result</p>
                    <p className="text-sm text-white/70 italic">"Closed a $22,000 project with a walkthrough I made Sunday night. Best ROI of my life." — Sophie L., Paris</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CHECKLIST — PRESERVED */}
        <section className="py-12 bg-surface-0 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="reveal"><InteractiveChecklist onCtaClick={openCheckout} /></div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 5 — WHO THIS IS FOR */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-surface-1 border-t border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter text-center">Does this sound like you?</h2>
            <p className="text-white/40 text-lg text-center max-w-xl mx-auto mb-12">If even one of these hits home — you're in the right place.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="reveal-left bg-surface-0 p-8 rounded-[2.5rem] border border-brand-primary/20">
                <h3 className="text-xl font-display font-bold text-brand-primary mb-6 flex items-center gap-3"><CheckCircle size={24} /> This IS for you if…</h3>
                <div className="space-y-4">
                  {WHO_IS_THIS_FOR.map((item, i) => (
                    <div key={i} className="flex items-start gap-4"><Check size={18} className="text-brand-primary mt-1 shrink-0" /><p className="text-white/70 font-medium">{item}</p></div>
                  ))}
                </div>
              </div>
              <div className="reveal-right bg-surface-0 p-8 rounded-[2.5rem] border border-red-500/20">
                <h3 className="text-xl font-display font-bold text-red-500 mb-6 flex items-center gap-3"><XCircle size={24} /> This is NOT for you if…</h3>
                <div className="space-y-4">
                  {WHO_IS_THIS_NOT_FOR.map((item, i) => (
                    <div key={i} className="flex items-start gap-4"><X size={18} className="text-red-500 mt-1 shrink-0" /><p className="text-white/70 font-medium">{item}</p></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal mt-10 text-center">
              <button onClick={openCheckout} className="group text-white px-10 py-5 rounded-2xl text-base font-black uppercase tracking-widest inline-flex items-center gap-3 hover:-translate-y-1 transition-all shadow-glow" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
                Yes — I'm Ready. Let's Go. <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/30 text-xs mt-3 font-bold uppercase tracking-widest">7-Day Money-Back Guarantee • Instant Access</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 6 — SOCIAL PROOF */}
        {/* ══════════════════════════════════════════════════════════════════ */}

        {/* INCOME TRANSFORMATION */}
        <section className="py-20 sm:py-28 bg-surface-0 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="reveal"><DollarSign className="text-brand-primary mx-auto mb-6" size={44} /></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">Still thinking "is it worth $49?"</h2>
            <p className="reveal stagger-2 text-white/40 text-lg max-w-2xl mx-auto mb-12">Look at what happens to your income<br />when you <span style={{ color: '#4FACFE', fontWeight: 600 }}>stop guessing</span> and start using a professional workflow.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {INCOME_TIERS.map((tier, i) => (
                <div key={i} className={`reveal stagger-${Math.min(i + 1, 4)} glass-card p-6 sm:p-8 rounded-2xl text-left group hover:border-brand-primary/30 transition-all`}>
                  <div className="text-3xl mb-4">{tier.icon}</div>
                  <h4 className="font-bold text-white text-base sm:text-lg mb-4">{tier.label}</h4>
                  <div className="flex items-center gap-4">
                    <div><div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Before</div><div className="text-lg font-bold text-white/30 line-through">{tier.before}</div></div>
                    <ArrowRight size={20} className="text-brand-primary shrink-0" />
                    <div><div className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-1">After</div><div className="text-lg font-bold text-brand-primary">{tier.after}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal mt-12 glass-card p-6 rounded-2xl border-brand-primary/20 max-w-lg mx-auto">
              <p className="text-white/60 text-sm mb-4">Your investment: <span className="text-white font-bold">$49 once.</span> Average student ROI: <span style={{ color: '#6366f1', fontWeight: 600 }}>$4,000+ within 90 days.</span></p>
              <button onClick={openCheckout} className="group w-full text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-glow text-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
                Download Courses & Start Earning <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>


        {/* RATINGS — PRESERVED */}
        <section className="py-16 sm:py-20 bg-surface-0 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="reveal text-center text-2xl sm:text-3xl font-display font-bold text-white mb-3 tracking-tighter">Don't just take our word for it.</h2>
            <p className="reveal stagger-1 text-center text-white/40 text-sm mb-10"><span style={{ color: '#6366f1', fontWeight: 600 }}>Thousands of architects trust this.</span> Check the numbers.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {RATINGS.map((r, i) => (
                <div key={i} className={`reveal stagger-${i + 1} glass-card p-6 rounded-2xl text-center group hover:border-white/20 transition-all`}>
                  <div className="text-lg font-bold text-white mb-2">{r.platform}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">{[...Array(5)].map((_, j) => (<Star key={j} size={18} className="text-yellow-400" fill="currentColor" />))}</div>
                  <div className="text-2xl font-display font-black text-white mb-1">{r.rating}/5</div>
                  <div className="text-xs text-white/40 font-bold uppercase tracking-widest">{r.reviews} reviews</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 bg-surface-1 overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <div className="reveal mb-4"><div className="inline-flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"><MessageCircle size={14} /> Real Stories. Real Results.</div></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tighter">50,000+ students. Here's what they say.</h2>
            <p className="reveal stagger-2 text-white/40 text-lg max-w-xl mx-auto mb-12">No actors. No scripts. Just real architects,<br />interior designers, and students who took the leap.</p>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-8 md:pb-0 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`reveal stagger-${Math.min((i % 3) + 1, 3)} glass-card p-6 sm:p-8 rounded-[2rem] text-left relative shrink-0 w-[85vw] md:w-auto snap-center shadow-lg flex flex-col`}>
                  <Quote className="absolute top-6 right-6 text-white/5" size={36} />
                  <div className="flex items-center gap-1 mb-4">{[...Array(5)].map((_, j) => (<Star key={j} size={12} className="text-yellow-400" fill="currentColor" />))}</div>
                  <p className="text-sm sm:text-base font-medium text-white/80 leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-inner">{t.name.charAt(0)}</div>
                    <div><div className="font-bold text-white text-sm">{t.name}</div><div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{t.role} • {t.location}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 7 — FUTURE PACE */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-surface-0 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="reveal text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter">Picture this.<br /><span className="text-gradient">Six months from now.</span></h2>
            <p className="reveal stagger-1 text-white/40 text-lg max-w-xl mx-auto mb-12">Close your eyes for a second.<br />Imagine what changes when you finally learn the full workflow.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="reveal stagger-1 glass-card p-6 rounded-2xl border-brand-primary/20">
                <div className="text-3xl mb-4">💰</div>
                <h4 className="font-bold text-white text-lg mb-2">You charge 3–10× more.</h4>
                <p className="text-white/50 text-sm">Clients pay a premium for <span style={{ color: '#4FACFE', fontWeight: 600 }}>speed and photorealism.</span> You deliver both. Suddenly $100/hr feels cheap — because it is.</p>
              </div>
              <div className="reveal stagger-2 glass-card p-6 rounded-2xl border-brand-primary/20">
                <div className="text-3xl mb-4">⏰</div>
                <h4 className="font-bold text-white text-lg mb-2">You go home at 5pm.</h4>
                <p className="text-white/50 text-sm">No more all-nighters grinding on renders. Finish your work by 5pm. <span style={{ color: '#4FACFE', fontWeight: 700 }}>Have dinner with your family. Have a life.</span></p>
              </div>
              <div className="reveal stagger-3 glass-card p-6 rounded-2xl border-brand-primary/20">
                <div className="text-3xl mb-4">😎</div>
                <h4 className="font-bold text-white text-lg mb-2">You become the AI expert.</h4>
                <p className="text-white/50 text-sm">Stop fearing AI replacing you. <span style={{ color: '#4FACFE', fontWeight: 600 }}>You ARE the person using AI.</span> Firms hire YOU for the skills everyone else is struggling to learn.</p>
              </div>
            </div>

            {/* AI WARNING — LOSS AVERSION */}
            <div className="reveal mt-16 glass-card p-6 sm:p-10 rounded-[2rem] border-l-4 border-red-500 text-left max-w-4xl mx-auto bg-gradient-to-r from-red-500/10 to-transparent">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="bg-red-500/10 p-4 rounded-2xl shrink-0 mx-auto sm:mx-0 mb-2 sm:mb-0"><AlertCircle size={32} className="text-red-400" /></div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">Every month you wait is a month your competitors get ahead.</h3>
                  <p className="text-white/60 text-sm sm:text-lg leading-relaxed mb-4">AI is changing architecture <strong className="text-white">right now.</strong> Firms are hiring designers who know AI — and <span style={{ color: '#6366f1', fontWeight: 600 }}>laying off those who don't.</span> In 12 months, the gap will be uncloseable.</p>
                  <p className="text-white/70 text-sm sm:text-lg leading-relaxed mb-8 italic">Our students already generate concepts in minutes, create renders 10× faster, and charge <span className="text-white font-bold">$2,000—$8,000 per project</span> instead of $200—$500.</p>
                  <button onClick={openCheckout} className="group text-white px-10 py-4 rounded-2xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:-translate-y-1 transition-all shadow-glow w-full sm:w-auto" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
                    Get AI-Ready Now — Download Courses <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECRET WEAPON TOOLKIT — PRESERVED */}
        <section className="py-20 sm:py-28 bg-surface-1 relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">Your secret weapon toolkit.</h2>
              <p className="reveal stagger-2 text-white/50 text-lg">Stop wasting hours searching Google for assets.<br /><span style={{ color: '#4FACFE', fontWeight: 700 }}>We give you everything. Included free.</span></p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="reveal-left glass-card p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-brand-primary/30 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] group-hover:bg-brand-primary/20 transition-all"></div>
                <Layers size={48} className="text-brand-primary mb-6" />
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">10,000+ Textures</h3>
                <p className="text-white/50 mb-4">Premium 4K textures: wood, marble, concrete, fabric, metal, tile. Every material you'll ever need — so you never waste time searching again.</p>
                <p className="text-white/30 text-sm mb-6 italic">"These textures alone saved me $500/month." — Amara O.</p>
                <div className="text-brand-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2">Worth $499 • Included Free <Check size={16} /></div>
              </div>
              <div className="reveal-right glass-card p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-brand-primary/30 transition-all cursor-pointer">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] group-hover:bg-brand-primary/20 transition-all"></div>
                <Package size={48} className="text-brand-primary mb-6" />
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">2,000+ 3D Models</h3>
                <p className="text-white/50 mb-4">Sofas, chairs, lighting, plants, cars, décor. Don't waste time modeling furniture. Just drag, drop, and render — so your output triples overnight.</p>
                <p className="text-white/30 text-sm mb-6 italic">"I stopped modeling furniture entirely. Output tripled." — Elena V.</p>
                <div className="text-brand-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2">Worth $399 • Included Free <Check size={16} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 8 — OBJECTION HANDLING */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-surface-0 border-y border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
            <div className="reveal"><Shield size={32} className="text-brand-primary mx-auto mb-6 opacity-80" /></div>
            <h2 className="reveal stagger-1 text-2xl sm:text-4xl font-display font-bold text-white mb-8">You might be thinking…</h2>
            <div className="reveal stagger-2 space-y-8 text-left max-w-2xl mx-auto">
              <div className="glass-card p-6 sm:p-8 rounded-[2rem] border-l-4 border-brand-primary bg-gradient-to-br from-brand-primary/10 to-transparent">
                <p className="text-white/80 text-lg font-bold mb-3">"I'm a complete beginner. Will I get lost?"</p>
                <p className="text-white/60 text-base leading-relaxed">We literally start from "how to download the software." Every module builds step-by-step. Several of our top students started knowing nothing — <span style={{ color: '#6366f1', fontWeight: 600 }}>now they run their own studios.</span></p>
              </div>
              <div className="glass-card p-6 sm:p-8 rounded-[2rem] border-l-4 border-brand-primary bg-gradient-to-br from-brand-primary/10 to-transparent">
                <p className="text-white/80 text-lg font-bold mb-3">"$49 feels too cheap. What's the catch?"</p>
                <p className="text-white/60 text-base leading-relaxed">No catch. No subscription. No upsells. We keep it affordable by teaching at scale — <span style={{ color: '#6366f1', fontWeight: 600 }}>50,000+ students and counting.</span> We believe everyone deserves world-class design education.</p>
              </div>
              <div className="glass-card p-6 sm:p-8 rounded-[2rem] border-l-4 border-brand-primary bg-gradient-to-br from-brand-primary/10 to-transparent">
                <p className="text-white/80 text-lg font-bold mb-3">"What if it doesn't work for me?"</p>
                <p className="text-white/60 text-base leading-relaxed">Try everything for 7 full days. If you're not completely blown away — email us. <span style={{ color: '#6366f1', fontWeight: 600 }}>Full refund. No questions. No hassle.</span> We don't want your $49 if it doesn't change your life.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MENTORS — PRESERVED */}
        <section className="py-20 sm:py-28 bg-surface-1 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="reveal"><GraduationCap className="text-brand-primary mx-auto mb-6" size={44} /></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tighter">Your Mentors</h2>
            <p className="reveal stagger-2 text-white/40 text-lg mb-12">Industry veterans who've taught 50,000+ students<br />and worked on 200+ real projects.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {MENTORS.map((mentor, i) => (
                <div key={i} className={`reveal stagger-${i + 1} glass-card p-8 rounded-[2rem] text-left relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-[60px]"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary rounded-2xl flex items-center justify-center mb-6"><GraduationCap size={28} className="text-white" /></div>
                    <h3 className="text-xl font-display font-bold text-white mb-1">{mentor.name}</h3>
                    <p className="text-xs text-brand-primary font-bold uppercase tracking-widest mb-4">{mentor.title}</p>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">{mentor.specialties.map((s, j) => (<span key={j} className="glass-card px-3 py-1 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-widest">{s}</span>))}</div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1 text-brand-primary font-bold"><Users size={12} /> {mentor.students} students</span>
                      <span className="flex items-center gap-1 text-yellow-400 font-bold"><Star size={12} fill="currentColor" /> {mentor.rating}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 9 — THE OFFER (Value Stack) */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-surface-0">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <h2 className="reveal stagger-1 text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tighter">Look at everything you get.</h2>
            <p className="reveal stagger-2 text-white/40 mb-8">Here's what you'd pay if you bought all of this separately.</p>
            <div className="reveal-scale glass-card p-6 sm:p-10 rounded-[2rem] border-2 border-brand-primary/30 shadow-glow mb-12 text-left">
              <div className="space-y-4 mb-8">
                {VALUE_STACK_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3"><div className="bg-brand-primary/10 p-1 rounded-full"><Check size={12} className="text-brand-primary" /></div><span className="text-sm font-medium text-white/80">{item.name}</span></div>
                    <span className="text-sm font-bold text-white/30 line-through">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-white/40 uppercase tracking-widest">Total Real Value</span><span className="text-xl font-bold text-white/30 line-through">$3,384</span></div>
                <div className="flex items-center justify-between"><span className="text-lg font-black text-white uppercase tracking-widest">You Pay Today</span><span className="text-5xl font-display font-black text-brand-primary">$49</span></div>
                <p className="text-xs text-white/30 mt-2 text-right">That's 98% off. Not a typo.</p>
              </div>
            </div>
            <div className="reveal flex justify-center">
              <MasterCTA onClick={openCheckout} timeLeft={timeLeft} className="glass-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem]" dark text="Download Everything Now →" />
            </div>
          </div>
        </section>

        {/* RISK REVERSAL */}
        <section className="py-16 sm:py-24 bg-surface-1 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <div className="reveal"><ShieldCheck size={56} className="text-brand-primary mx-auto mb-6" /></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-tighter">Zero risk. 7-day money-back guarantee.</h2>
            <p className="reveal stagger-2 text-white/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Try everything for 7 full days. Watch the courses.<br />Download the assets. Practice the workflows.<br />If you're not blown away — <span style={{ color: '#6366f1', fontWeight: 600 }}>we'll refund every penny.</span><br />No questions. No hassle. No hard feelings.
            </p>
            <div className="reveal stagger-3 glass-card p-6 rounded-2xl inline-flex items-center gap-4 border-brand-primary/30">
              <Lock size={20} className="text-brand-primary" />
              <span className="text-sm font-bold text-white/70">Secure checkout • Protected by Stripe & PayPal</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-surface-0">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="reveal text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tighter">Still have questions?</h2>
            <p className="reveal stagger-1 text-center text-white/40 mb-12">We've answered the most common ones below.<br />If yours isn't here — email us. We reply fast.</p>
            <div className="reveal stagger-2 glass-card p-6 sm:p-10 rounded-[2.5rem]">
              {FAQ_ITEMS.map((item, i) => (<FAQAccordion key={i} question={item.question} answer={item.answer} />))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 10 — FINAL CTA (The Close) */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 bg-surface-1 relative overflow-hidden">
          <div className="aurora-bg w-[600px] h-[600px] bg-brand-primary/20 top-[-200px] left-[-200px] animate-aurora"></div>
          <div className="aurora-bg w-[400px] h-[400px] bg-brand-primary/15 bottom-[-100px] right-[-150px] animate-aurora" style={{ animationDelay: '3s' }}></div>
          <div className="absolute inset-0 bg-grid opacity-20"></div>

          <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
            <div className="reveal"><Rocket size={48} className="text-brand-primary mx-auto mb-6" /></div>
            <h2 className="reveal stagger-1 text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">
              You've read this far.<br />That means <span className="text-gradient">something.</span>
            </h2>
            <p className="reveal stagger-2 text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
              You know you need this.<br />
              <span style={{ color: '#6366f1', fontWeight: 600 }}>Every day you wait is a day your competitors pull ahead.</span>
            </p>
            <p className="reveal stagger-2 text-white/70 text-base max-w-lg mx-auto mb-10">
              50,000+ students already made the switch.<br />
              <span style={{ color: '#6366f1', fontWeight: 600 }}>Average income increase: $3,400/month.</span><br />
              Your turn.
            </p>

            <div className="reveal stagger-3 max-w-md mx-auto">
              <MasterCTA onClick={openCheckout} timeLeft={timeLeft} text="Download Courses Now →" subtext="7-Day Refund • Lifetime Access • Instant Download" />
            </div>

            <div className="reveal stagger-4 mt-10 flex flex-wrap justify-center gap-6 text-xs text-white/30 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-primary" /> 7-Day Refund</span>
              <span className="flex items-center gap-1.5"><Lock size={14} className="text-brand-primary" /> Secure Checkout</span>
              <span className="flex items-center gap-1.5"><Globe size={14} className="text-brand-primary" /> 42+ Countries</span>
            </div>
          </div>
        </section>

      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-surface-0 py-12 px-6 text-center border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-4">Avada Architectural AI • 2026</p>
        <div className="flex justify-center gap-6 text-[10px] text-white/20 font-bold uppercase tracking-widest">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </footer>

      {/* ─── STICKY MOBILE CTA ─── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface-1/90 backdrop-blur-xl border-t border-white/10 p-2 transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <button onClick={openCheckout} className="w-full relative group overflow-hidden text-white rounded-xl shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all h-14 flex items-center px-4" style={{ background: '#6366f1' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,#6366f1,#4f46e5,#6366f1)' }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-[shine_3s_infinite]"></div>
          <div className="relative z-10 w-full flex items-center justify-between">
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-yellow-300 animate-pulse drop-shadow-md">
                ENDS {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
              </span>
              <span className="text-sm font-black uppercase tracking-[0.15em] text-white">
                Start Learning Now
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-200 line-through opacity-80">$99</span>
              <span className="text-xl font-display font-black text-white">$49</span>
            </div>
          </div>
        </button>
      </div>

      {/* ─── SOCIAL PROOF TOAST ─── */}
      <SocialProofToast />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default LandingPage;

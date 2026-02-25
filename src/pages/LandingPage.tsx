
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, CheckCircle2, X, ChevronDown, Target, Sparkles, MessageSquare, Home, LogIn, Layers, Play, Award, AlertTriangle, Bot, Cpu, PenTool } from 'lucide-react';
import { TESTIMONIALS, FAQ_ITEMS, COURSES, VALUE_STACK_ITEMS, INCOME_TIERS, MENTORS, WHO_IS_THIS_FOR, WHO_IS_THIS_NOT_FOR } from '../constants';
import { LoginModal } from '../components/LoginModal';
import {
  Logo, CallToActionWidget, SocialProofToast,
  PROBLEM_POINTS, TRANSFORMATION_STORIES, CHOOSE_PATH_DATA, INDUSTRIES, BUSINESS_MODULES,
  PHASE_DATA, PAGE_PREVIEWS_ROW1, PAGE_PREVIEWS_ROW2, FEAR_STATS, AI_TRUTH,
} from './LandingHelpers';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 36, s: 20 });
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const calc = () => { const D = (3 * 3600 + 36 * 60 + 20) * 1000, now = Date.now(), r = D - (now % D); setTimeLeft({ h: Math.floor((r / 3600000) % 24), m: Math.floor((r / 60000) % 60), s: Math.floor((r / 1000) % 60) }); };
    const t = setInterval(calc, 1000); calc(); return () => clearInterval(t);
  }, []);
  useEffect(() => { const h = () => setShowStickyBar(window.scrollY > 600); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);

  const openCheckout = () => navigate('/checkout');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden antialiased selection:bg-orange-500/30">

      {/* ═══ STICKY HEADER ═══ */}
      <header className="sticky top-0 z-[60] bg-black/80 backdrop-blur-xl border-b border-zinc-900 px-5 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"><LogIn size={14} /> Login</button>
            <button onClick={openCheckout} className="hidden md:block text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all premium-stroke" style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>Enroll Now — $49</button>
          </div>
        </div>
      </header>

      <main>
        {/* ═══ HERO — Pattern Interrupt + Authority + Fear ═══ */}
        <section className="relative pt-0 pb-16 md:pb-24 overflow-hidden bg-[#0d0d0d]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
            <div className="absolute top-10 left-1/3 w-[400px] h-[400px] bg-orange-500/10 blur-[150px] rounded-full" />
            <div className="absolute top-10 right-1/3 w-[300px] h-[300px] bg-orange-400/8 blur-[120px] rounded-full" />
          </div>
          <div className="max-w-5xl mx-auto px-5 relative z-10">
            <div className="flex flex-col items-center text-center pt-8 md:pt-16">
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
                <AlertTriangle size={14} className="text-red-400" />
                <span className="text-xs font-bold text-red-400">AI is replacing designers who don't adapt</span>
              </div>
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-zinc-400">50,000+ students already enrolled</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.08] mb-6 text-white tracking-tight">
                AI Can Render. <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">It Can't Design.</span><br />
                <span className="text-2xl md:text-4xl text-zinc-400 font-medium">Learn both. Become unstoppable.</span>
              </h1>
              <p className="text-base md:text-xl text-zinc-400 font-medium mb-4 leading-relaxed max-w-2xl">
                The complete system that takes you from <strong className="text-white">zero to advanced</strong> — 6 courses covering AutoCAD, SketchUp, V-Ray, Lumion, D5 & AI Architecture. No paid software needed. We provide everything.
              </p>
              <p className="text-sm text-orange-400 font-bold mb-8 flex items-center gap-2">
                <Sparkles size={16} /> All software provided FREE with lifetime access
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
                <button onClick={openCheckout} className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] transition-all flex items-center gap-3 group whitespace-nowrap premium-stroke">
                  Start Learning — $49 (was $99) <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
              <p className="text-xs text-zinc-600 mb-10">⚡ Instant access • No paid software required • 7-day money-back guarantee</p>
              {/* Hero Video */}
              <div className="w-full max-w-4xl mb-10 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-orange-500/5" style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  title="Course overview video"
                  src="https://iframe.mediadelivery.net/embed/494628/81badf78-a3b0-42fa-9f23-9f7213d4185c?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
                  loading="lazy"
                  style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen={true}
                />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full max-w-4xl">
                {COURSES.map((c) => (
                  <div key={c.id} className="relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-zinc-800 group cursor-pointer hover:border-orange-500/50 transition-all hover:scale-105">
                    <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{c.software}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEAR STATS BAR — Social Proof + Anxiety ═══ */}
        <section className="py-10 bg-[#0a0a0a] border-t border-b border-zinc-900">
          <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEAR_STATS.map((s, i) => (
              <div key={i} className="text-center reveal">
                <span className="text-2xl mb-2 block">{s.icon}</span>
                <span className="text-3xl md:text-4xl font-display font-black text-orange-400">{s.stat}</span>
                <p className="text-xs text-zinc-500 mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ AI TRUTH SECTION — The Big Revelation ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6"><Bot size={16} className="text-orange-400" /><span className="text-xs font-bold text-orange-400">THE AI REALITY CHECK</span></div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">Everyone's Talking About AI.<br /><span className="text-orange-400">Here's What They're Not Telling You.</span></h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">AI will revolutionize rendering. But it has a fatal flaw that nobody mentions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AI_TRUTH.map((item, i) => (
                <div key={i} className={`reveal bg-zinc-900/50 border rounded-2xl p-6 ${item.color === 'green' ? 'border-green-500/30' : item.color === 'red' ? 'border-red-500/30' : 'border-orange-500/30'}`}>
                  <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${item.color === 'green' ? 'bg-green-500/10 text-green-400' : item.color === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'}`}>{item.verdict}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="reveal text-center mt-10">
              <p className="text-zinc-300 text-lg font-semibold mb-2">This course teaches you the <span className="text-orange-400">Hybrid Workflow</span>.</p>
              <p className="text-zinc-500 text-sm">You learn to design with precision. AI handles the heavy rendering. Together, you're 10x faster than either alone.</p>
            </div>
          </div>
        </section>

        {/* ═══ ALL-IN-ONE BRIDGE ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a] border-t border-zinc-900">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">Zero to Advanced. One Bundle. No Paid Software.</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
              AutoCAD. SketchUp. V-Ray. Lumion. D5. <span className="text-orange-400">AI.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto mb-4">The entire architect's pipeline in one system. Every tool, every technique, every shortcut — from your first click to your first $5,000 walkthrough.</p>
            <p className="text-sm font-bold text-green-400 mb-8 flex items-center justify-center gap-2"><CheckCircle size={16} /> All software links & free licenses included — you don't pay a penny for tools</p>
            <button onClick={openCheckout} className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-base hover:bg-zinc-100 transition-all inline-flex items-center gap-3 group whitespace-nowrap premium-stroke">
              See What's Inside <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </button>
            {/* Course Preview Video */}
            <div className="w-full max-w-3xl mx-auto mt-10 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl" style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                title="Course preview walkthrough"
                src="https://iframe.mediadelivery.net/embed/489113/a214b199-e64a-4eaf-af70-edfbc586e5fd?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
                loading="lazy"
                style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={true}
              />
            </div>
          </div>
        </section>

        {/* ═══ PEEK INSIDE CAROUSEL ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a] overflow-hidden border-t border-zinc-900">
          <div className="max-w-5xl mx-auto px-5 mb-12 text-center">
            <div className="reveal">
              <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-4">Student results</p>
              <h2 className="text-3xl md:text-6xl font-display font-bold text-white tracking-tight mb-6">This Is What Our Students <span className="text-orange-400">Produce</span></h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto italic font-serif">"15 days ago I didn't know what SketchUp was. Now I have 3 job offers."</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex gap-3 md:gap-8 animate-scroll-left hover:pause">
              {[...PAGE_PREVIEWS_ROW1, ...PAGE_PREVIEWS_ROW1].map((img, i) => (
                <div key={i} className="w-[200px] md:w-[400px] shrink-0 aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative group bg-zinc-900">
                  <img src={img} alt="Student Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 md:gap-8 animate-scroll-right hover:pause">
              {[...PAGE_PREVIEWS_ROW2, ...PAGE_PREVIEWS_ROW2].map((img, i) => (
                <div key={i} className="w-[200px] md:w-[400px] shrink-0 aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative group bg-zinc-900">
                  <img src={img} alt="Student Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MANIFESTO ═══ */}
        <section className="py-16 md:py-28 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-4">A message from the instructor</p>
              <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-8 leading-snug">"I've watched this industry punish talented people who can't visualize their ideas."</h2>
            </div>
            <div className="reveal space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed">
              <p>Here's the truth nobody tells you: <strong className="text-white">design skill alone doesn't win clients anymore.</strong></p>
              <p>The architect who shows cinematic walkthroughs wins. The designer who renders photorealistic images wins. The freelancer who delivers in 2 days instead of 2 weeks wins. Every. Single. Time.</p>
              <p>And now? <strong className="text-red-400">AI is accelerating this gap.</strong> Designers who learn the AI hybrid workflow are charging 3x more. Those who don't are watching their inbox go quiet.</p>
              <p>Universities don't teach you these tools. YouTube gives you fragments. Expensive courses charge $2,000+ and still leave you struggling. Meanwhile, your competitors are getting faster every month.</p>
              <p>So I built this system. <strong className="text-white">Six courses. Every tool in the pipeline. Zero paid software required.</strong> We even provide the software links, free licenses, and 10,000+ assets.</p>
              <p className="text-white font-semibold text-lg md:text-xl border-l-2 border-orange-500 pl-4">The question isn't whether you can afford $49. It's whether you can afford to keep falling behind while 50,000+ students are learning the exact skills that get people hired, promoted, and paid.</p>
            </div>
          </div>
        </section>

        {/* ═══ FRICTION GRID ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">The Old Way vs. <span className="text-orange-400">The Hybrid System</span></h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="reveal bg-zinc-900/50 border border-red-500/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><X size={20} className="text-red-400" /></div><h3 className="text-xl font-bold text-red-300">Still Doing This?</h3></div>
                <ul className="space-y-4">
                  {['Googling random tutorials that contradict each other', 'Paying $2,000+ for courses that don\'t cover AI', '4 hours on a floor plan. Your competitor does it in 40 minutes.', 'Handing clients flat PDFs. They hire the person with 3D walkthroughs.', 'Paying $500/month for software you could get free', 'Graduating without a single portfolio-ready render'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm"><X size={14} className="text-red-400 mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="reveal bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><CheckCircle size={20} className="text-orange-400" /></div><h3 className="text-xl font-bold text-white">With This System</h3></div>
                <ul className="space-y-4">
                  {['Structured pipeline: AutoCAD → SketchUp → V-Ray → Lumion → D5 → AI', 'AI handles your rendering. You handle the design. 10x output.', '15 days to a professional portfolio — even from zero', 'All software provided FREE — no expensive licenses ever', '10,000+ textures, models, AI prompts included', 'Mentor support when you\'re stuck at 11pm before a deadline'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm"><CheckCircle size={14} className="text-orange-400 mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SOUND FAMILIAR — Agitation ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-4xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">Be Honest. <span className="text-orange-400">Is This You?</span></h2>
              <p className="text-zinc-500 text-sm">Every week you don't fix this, someone hungrier does.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PROBLEM_POINTS.map((point, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-start gap-4 hover:border-red-500/20 transition-all">
                  <span className="text-3xl">{point.emoji}</span>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">{point.text}</p>
                </div>
              ))}
            </div>
            <div className="reveal text-center mt-10">
              <p className="text-zinc-400 text-sm">If you checked even ONE of these — <strong className="text-white">this system was built for you.</strong></p>
            </div>
          </div>
        </section>

        {/* ═══ WHO IS THIS FOR ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-10 tracking-tight">If You're Any of These, <span className="text-orange-400">You're Already Behind.</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {INDUSTRIES.map((ind, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/30 transition-all group text-left">
                  <div className="text-3xl mb-3">{ind.icon}</div>
                  <span className="text-sm font-bold text-white block mb-1">{ind.label}</span>
                  <span className="text-xs text-zinc-500">{ind.hook}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FREE SOFTWARE BAIT ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-6"><CheckCircle size={16} className="text-green-400" /><span className="text-xs font-bold text-green-400">NO PAID SOFTWARE REQUIRED</span></div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">"But I Can't Afford Expensive Software..."</h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                That excuse dies today. <strong className="text-white">Every software in this system is available for free.</strong> We provide direct links to official free versions, student licenses, and free alternatives. SketchUp, AutoCAD, D5 Render — all free. Even V-Ray and Lumion have free student editions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {[
                  { icon: <Cpu size={24} />, title: 'Software Provided', desc: 'Direct links to every free/student version. No hunting. No piracy. Legit and ready.' },
                  { icon: <Sparkles size={24} />, title: 'AI Tools = Free', desc: 'The AI rendering tools we teach are completely free. $0/month. Replace $500 subscriptions.' },
                  { icon: <Award size={24} />, title: 'Lifetime Access', desc: 'Enroll once, access forever. Every update, every new module — free for life.' }
                ].map((item, i) => (
                  <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-left">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 text-green-400">{item.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-orange-400 font-bold text-sm">The only investment is $49 and 15 days of your time. Everything else is provided.</p>
            </div>
          </div>
        </section>

        {/* ═══ NOT JUST TUTORIALS ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">This isn't <span className="text-orange-400">"just tutorials."</span></h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto mb-8">This is the complete pipeline that takes you from <strong className="text-white">opening AutoCAD for the first time</strong> to <strong className="text-white">delivering cinematic renders that win $18,000 projects</strong>. Every course is project-based, hands-on, and designed for real-world results. And AI does the heavy lifting on rendering.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: <Layers size={24} />, title: '6 Complete Courses', desc: 'AutoCAD → SketchUp → V-Ray → Lumion → D5 → AI. Zero to advanced. The full pipeline.' },
                  { icon: <Play size={24} />, title: 'Project-Based', desc: 'You build real interiors, renders, and walkthroughs. 6+ portfolio pieces by the end.' },
                  { icon: <Bot size={24} />, title: 'AI-Powered Rendering', desc: 'Learn to use AI for rendering, concept generation, and style transfer. Free tools only.' }
                ].map((item, i) => (
                  <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-left">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-400">{item.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CHOOSE YOUR PATH ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Choose Your Path</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CHOOSE_PATH_DATA.map((path, i) => (
                <div key={i} className={`reveal bg-gradient-to-br ${path.color} border border-zinc-800 rounded-2xl p-8 hover:border-orange-500/30 transition-all`}>
                  <span className="text-3xl mb-4 block">{path.emoji}</span>
                  <h3 className="text-xl font-bold text-white mb-3">{path.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{path.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BEFORE & AFTER ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-2">Before & After</h2><p className="text-zinc-500 text-sm">Real students. Real transformations. Same $49 investment.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TRANSFORMATION_STORIES.map((story, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                  <span className="text-4xl mb-4 block">{story.emoji}</span>
                  <div className="flex items-center gap-2 mb-4"><span className="font-bold text-white">{story.name}</span><span className="text-xs text-zinc-500">• {story.role}</span></div>
                  <div className="mb-3"><p className="text-[10px] font-mono uppercase text-red-400 mb-1">Before</p><p className="text-zinc-400 text-sm">{story.before}</p></div>
                  <div><p className="text-[10px] font-mono uppercase text-green-400 mb-1">After</p><p className="text-zinc-300 text-sm font-medium">{story.after}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE MATH ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">The Math <span className="text-orange-400">Doesn't Lie</span></h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="reveal bg-zinc-900/50 border border-red-500/20 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-red-400 mb-6 font-mono uppercase tracking-wider">The Expensive Way</h3>
                <div className="space-y-4">
                  {[['University Arch-Viz Course', '$2,000 – $5,000'], ['Premium Software Licenses', '$500+/year'], ['Outsourced Renders', '$3,000/image'], ['Random YouTube (your time)', '100+ hours wasted'], ['Lost Clients (flat PDFs)', '$$$$ uncountable']].map(([l, c], i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-800"><span className="text-zinc-400 text-sm">{l}</span><span className="text-zinc-300 text-sm font-medium">{c}</span></div>
                  ))}
                </div>
              </div>
              <div className="reveal bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/20 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-green-400 mb-6 font-mono uppercase tracking-wider">This System</h3>
                <div className="space-y-4">
                  {[['All 6 Courses (Zero to Advanced)', '$49'], ['All Software (Free Licenses)', '$0'], ['10,000+ Textures & Models', '$0 (included)'], ['AI Prompt Vault & Tools', '$0 (included)'], ['Mentor Support + Diploma', '$0 (included)'], ['Lifetime Access + Updates', '$0 (forever)']].map(([l, c], i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-zinc-800/50"><span className="text-zinc-300 text-sm">{l}</span><span className="text-green-400 text-sm font-bold">{c}</span></div>
                  ))}
                  <div className="flex justify-between items-center pt-2"><span className="text-white font-bold text-lg">Total Investment</span><span className="text-green-400 font-black text-2xl">$49</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ MID-SCROLL CTA ═══ */}
        <CallToActionWidget timeLeft={timeLeft} onClick={openCheckout} headline="Still thinking?" subtext="50,000+ students already made this decision. The only question is whether you'll join them today — or wish you had." />

        {/* ═══ INCOME TIERS ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">What You Could <span className="text-orange-400">Earn</span></h2>
              <p className="text-zinc-500 text-sm">Real numbers. Real students. The $49 pays for itself on your first gig.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {INCOME_TIERS.map((tier, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-4"><span className="text-3xl">{tier.icon}</span><span className="text-sm font-bold text-white">{tier.label}</span></div>
                  <div className="flex items-center gap-4">
                    <div><p className="text-[10px] font-mono text-zinc-600 uppercase mb-1">Before</p><p className="text-zinc-500 text-sm line-through">{tier.before}</p></div>
                    <ArrowRight size={16} className="text-orange-400" />
                    <div><p className="text-[10px] font-mono text-orange-400 uppercase mb-1">After</p><p className="text-white text-sm font-bold">{tier.after}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6 COURSES ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">6 Courses. One Pipeline. <span className="text-orange-400">Total Mastery.</span></h2>
              <p className="text-zinc-500 text-sm mt-2">Each course includes free software, project files, and mentor support</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map((course) => (
                <div key={course.id} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all group">
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-800 relative">
                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full"><span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">{course.software}</span></div>
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full"><span className="text-[10px] font-bold text-zinc-300">{course.students} students</span></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                    <ul className="space-y-2">{course.learningPoints.map((p, j) => (<li key={j} className="flex items-start gap-2 text-xs text-zinc-500"><CheckCircle2 size={12} className="text-orange-400 mt-0.5 shrink-0" />{p}</li>))}</ul>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-orange-400 text-xs font-semibold">{course.workflowImpact}</p>
                      <span className="text-[10px] text-green-400 font-bold">FREE SOFTWARE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 9 PHASES ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">9 Phases. Zero to <span className="text-orange-400">Advanced.</span></h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PHASE_DATA.map((phase, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-3"><span className="text-3xl font-display font-black text-orange-500/30">{phase.phase}</span><h3 className="text-sm font-bold text-white">{phase.title}</h3></div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ USE CASES ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">What Will You Do <span className="text-orange-400">With These Skills?</span></h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUSINESS_MODULES.map((mod, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-start gap-5 hover:border-orange-500/20 transition-all">
                  <div className="text-3xl">{mod.icon}</div>
                  <div><h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3><p className="text-zinc-400 text-sm leading-relaxed">{mod.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ VALUE STACK ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">Everything You Get <span className="text-orange-400">For $49</span></h2></div>
            <div className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
              {VALUE_STACK_ITEMS.map((item, i) => (
                <div key={i} className={`flex justify-between items-center px-6 py-4 ${i !== VALUE_STACK_ITEMS.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                  <div className="flex items-center gap-3"><CheckCircle size={16} className="text-orange-400 shrink-0" /><span className="text-sm text-zinc-300">{item.name}</span></div>
                  <span className="text-sm font-bold text-zinc-500">{item.value}</span>
                </div>
              ))}
              <div className="bg-orange-500/5 border-t border-orange-500/20 px-6 py-5 flex justify-between items-center">
                <span className="text-white font-bold">You Pay Today</span>
                <div className="flex items-center gap-3"><span className="text-zinc-500 line-through text-sm">$3,335</span><span className="text-2xl font-display font-black text-orange-400">$49</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ MENTORS ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-4xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Your <span className="text-orange-400">Mentors</span></h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MENTORS.map((mentor, i) => (
                <div key={i} className="reveal bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold text-lg">{mentor.name[0]}</div><div><h3 className="text-lg font-bold text-white">{mentor.name}</h3><p className="text-xs text-zinc-500">{mentor.title}</p></div></div>
                  <p className="text-zinc-400 text-sm mb-4">{mentor.bio}</p>
                  <div className="flex items-center gap-4 text-xs text-zinc-500"><span className="flex items-center gap-1"><Star size={12} className="text-orange-400 fill-orange-400" /> {mentor.rating}</span><span>{mentor.students} students</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS CAROUSEL ═══ */}
        <section className="py-20 md:py-32 bg-black overflow-hidden">
          <div className="px-5 mb-16 text-center">
            <h2 className="text-3xl md:text-6xl font-display font-bold text-white tracking-tight mb-4">Don't Take <span className="text-orange-400">Our Word</span></h2>
            <p className="text-zinc-500 text-lg">Here's what 50,000+ students say.</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 animate-scroll-left hover:pause">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-orange-500/30 transition-all">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-orange-500 text-orange-500" />)}</div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-orange-500">{t.name[0]}</div><div className="text-left"><p className="text-sm font-bold text-white flex items-center gap-1">{t.name} <CheckCircle size={12} className="text-green-500" /></p><p className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.role} • {t.location}</p></div></div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll-right hover:pause">
              {[...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-orange-500/30 transition-all">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-orange-500 text-orange-500" />)}</div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-orange-500">{t.name[0]}</div><div className="text-left"><p className="text-sm font-bold text-white flex items-center gap-1">{t.name} <CheckCircle size={12} className="text-green-500" /></p><p className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.role} • {t.location}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ UNFAIR ADVANTAGE + P.S. ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Your <span className="text-orange-400">Unfair Advantage</span></h2>
              <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">While everyone else is watching disconnected YouTube videos and paying $500/month for software — you'll have the complete pipeline, free software, 10,000+ assets, and AI rendering skills that make you 10x faster. In 15 days.</p>
              <div className="dramatic-card-container max-w-xl mx-auto text-left">
                <div className="dramatic-inner-container">
                  <div className="dramatic-border-outer"><div className="dramatic-main-card p-6">
                    <p className="text-zinc-800 text-sm leading-relaxed"><strong className="text-zinc-900">P.S.</strong> — Right now, AI is creating a divide. Designers who learn the hybrid workflow are charging 3x more. Those who don't are slowly becoming irrelevant. This course closes that gap in 15 days — for $49. But we won't keep it at this price forever. When the timer hits zero, the price goes up. Don't be the person who comes back tomorrow and pays more.</p>
                  </div></div>
                  <div className="dramatic-glow-layer-1"></div>
                  <div className="dramatic-glow-layer-2"></div>
                </div>
                <div className="dramatic-overlay-1"></div>
                <div className="dramatic-background-glow"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <CallToActionWidget timeLeft={timeLeft} onClick={openCheckout} headline="This Is Your Window." subtext="AI is widening the gap every day. 50,000+ students chose to be on the right side. Your move." />

        {/* ═══ FAQ ═══ */}
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-3xl mx-auto px-5">
            <div className="reveal text-center mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Common Questions</h2></div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="reveal group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden" open={openFaqIndex === i}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none" onClick={(e) => { e.preventDefault(); setOpenFaqIndex(openFaqIndex === i ? null : i); }}>
                    <span className="text-sm md:text-base font-semibold text-white pr-6">{faq.question}</span>
                    <ChevronDown size={18} className={`text-zinc-500 transition-transform shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                  </summary>
                  <div className="px-5 pb-5"><p className="text-zinc-400 text-sm leading-relaxed">{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ LAST PUSH ═══ */}
        <section className="py-16 md:py-24 bg-[#0a0a0a] border-t border-zinc-900">
          <div className="max-w-2xl mx-auto px-5 text-center">
            <div className="reveal">
              <p className="text-red-400 text-xs font-mono uppercase tracking-widest mb-4">⚠️ Price goes up when timer expires</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight">You Have Two Options.</h2>
              <p className="text-zinc-400 mb-2"><strong className="text-zinc-300">Option 1:</strong> Close this tab. Keep doing what you're doing. Watch AI-trained designers pass you.</p>
              <p className="text-zinc-400 mb-8"><strong className="text-white">Option 2:</strong> Invest $49. Learn the complete pipeline in 15 days. Join 50,000+ students who chose to adapt.</p>
              <button onClick={openCheckout} className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] transition-all inline-flex items-center gap-3 group whitespace-nowrap premium-stroke">
                Choose Option 2 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#050505] py-12 px-6 text-center border-t border-zinc-900 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-4">Avada Design & Architecture • 2026</p>
        <div className="flex justify-center gap-6 text-[10px] text-zinc-600 font-bold uppercase tracking-widest"><span>Privacy</span><span>Terms</span><span>Support</span></div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-800 p-2 transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <button onClick={openCheckout} className="w-full relative group overflow-hidden text-white rounded-xl shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all h-14 flex items-center px-4" style={{ background: 'linear-gradient(90deg,#f97316,#ea580c,#f97316)' }}>
          <div className="relative z-10 w-full flex items-center justify-between">
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-yellow-300 animate-pulse">⚠ PRICE GOES UP IN {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}</span>
              <span className="text-sm font-black uppercase tracking-[0.15em] text-white">Enroll Now</span>
            </div>
            <div className="flex items-center gap-2"><span className="text-xs font-bold text-red-200 line-through opacity-80">$99</span><span className="text-xl font-display font-black text-white">$49</span></div>
          </div>
        </button>
      </div>

      <SocialProofToast />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default LandingPage;

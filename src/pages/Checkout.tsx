
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { COURSES } from '../constants';
import { submitPhoneNumber } from '../services/mockBackend';

// --- CONFIGURATION ---
const STRIPE_PUBLISHABLE_KEY = "pk_live_51PRJCsGGsoQTkhyv6OrT4zvnaaB5Y0MSSkTXi0ytj33oygsfW3dcu6aOFa9q3dr2mXYTCJErnFQJcOcyuDAsQd4B00lIAdclbB";
const BACKEND_URL = "https://avaada.space/create-payment-intent";
const PAYPAL_BUSINESS_EMAIL = "design@avada.in";
const PAYPAL_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg";

declare global { interface Window { Stripe?: (key: string) => any; } }

/* ═══ Inline SVG Icons ═══ */
const IC = {
    Check: ({ s = 14, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={c}><polyline points="20 6 9 17 4 12" /></svg>,
    ArrowL: ({ s = 16, ...p }: { s?: number } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
    ArrowR: ({ s = 16, ...p }: { s?: number } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Shield: ({ s = 14, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>,
    Lock: ({ s = 14, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={c}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    Mail: ({ s = 18, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={c}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
    Card: ({ s = 16, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={c}><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    Loader: ({ s = 22, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${c}`}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>,
    Download: ({ s = 18, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    User: ({ s = 16, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Star: ({ s = 12, ...p }: { s?: number } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    Clock: ({ s = 14, c = "", ...p }: { s?: number; c?: string } & React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={c}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
};

/* ═══ Step Indicator ═══ */
const StepIndicator: React.FC = () => (
    <div className="flex items-center justify-center gap-0 text-xs font-bold">
        <div className="flex items-center gap-2">
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800 }}>1</div>
            <span style={{ color: '#6366f1', fontWeight: 700, fontSize: 12 }}>Checkout</span>
        </div>
        <div style={{ width: 36, height: 2, background: 'linear-gradient(90deg, #6366f1, #e0e7ff)', margin: '0 8px', borderRadius: 2 }} />
        <div className="flex items-center gap-2">
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#f1f5f9', border: '1.5px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 11, fontWeight: 800 }}>2</div>
            <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: 12 }}>Access Course</span>
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════════════════════════ */
export const Checkout = () => {
    const navigate = useNavigate();
    const [viewState, setViewState] = useState<'LOADING' | 'FORM' | 'PROCESSING' | 'SUCCESS'>('LOADING');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isStripeLoaded, setIsStripeLoaded] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ h: 2, m: 14, s: 30 });

    const stripeRef = useRef<any>(null);
    const elementsRef = useRef<any>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    const fmt = (v: number) => v.toString().padStart(2, '0');

    // Reset PROCESSING when returning from PayPal tab
    useEffect(() => {
        const handler = () => {
            if (document.visibilityState === 'visible' && viewState === 'PROCESSING') {
                setViewState('FORM');
                setErrorMessage(null);
            }
        };
        document.addEventListener('visibilitychange', handler);
        return () => document.removeEventListener('visibilitychange', handler);
    }, [viewState]);

    useEffect(() => { setViewState('LOADING'); setTimeout(() => setViewState('FORM'), 500); }, []);

    useEffect(() => {
        const t = setInterval(() => {
            setTimeLeft(p => {
                if (p.s > 0) return { ...p, s: p.s - 1 };
                if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
                if (p.h > 0) return { h: p.h - 1, m: 59, s: 59 };
                return p;
            });
        }, 1000);
        return () => clearInterval(t);
    }, []);

    // Autoslide courses logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (galleryRef.current) {
                const isEnd = galleryRef.current.scrollLeft + galleryRef.current.clientWidth >= galleryRef.current.scrollWidth - 10;
                if (isEnd) {
                    galleryRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    galleryRef.current.scrollBy({ left: 160, behavior: 'smooth' });
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => { if (viewState === 'FORM' && !stripeRef.current) initStripe(); }, [viewState]);

    const initStripe = async (retry = 0) => {
        try {
            if (!window.Stripe) {
                if (!document.getElementById('stripe-js')) { const s = document.createElement('script'); s.src = 'https://js.stripe.com/v3/'; s.id = 'stripe-js'; s.async = true; document.head.appendChild(s); }
                if (retry < 10) setTimeout(() => initStripe(retry + 1), 500);
                else setErrorMessage("Unable to load card gateway. Use PayPal below.");
                return;
            }
            if (stripeRef.current) return;
            stripeRef.current = window.Stripe(STRIPE_PUBLISHABLE_KEY);
            elementsRef.current = stripeRef.current.elements({
                mode: 'payment', amount: 4900, currency: 'usd', paymentMethodTypes: ['card'],
                appearance: {
                    theme: 'flat',
                    variables: { fontFamily: '"Inter", sans-serif', borderRadius: '10px', colorPrimary: '#6366f1', colorBackground: '#ffffff', colorText: '#1e293b', colorTextPlaceholder: '#94a3b8' },
                    rules: {
                        '.Input': { border: '1.5px solid #e2e8f0', padding: '14px 16px', fontSize: '15px', boxShadow: 'none' },
                        '.Input:focus': { border: '1.5px solid #6366f1', boxShadow: '0 0 0 3px rgba(99,102,241,0.1)' },
                        '.Label': { fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1', marginBottom: '6px' },
                    }
                }
            });
            const pe = elementsRef.current.create("payment", {
                layout: { type: 'tabs', defaultCollapsed: false },
                fields: { billingDetails: { email: 'never', address: 'never' } },
                wallets: { applePay: 'never', googlePay: 'never' }
            });
            setTimeout(() => { const mp = document.getElementById("stripe-element-mount"); if (mp) { pe.mount("#stripe-element-mount"); setIsStripeLoaded(true); } }, 100);
        } catch { setErrorMessage("Card gateway unavailable. Use PayPal below."); setIsStripeLoaded(false); }
    };

    const validateEmail = (): boolean => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError(true); setEmailErrorMsg('Enter email');
            if (emailInputRef.current) { emailInputRef.current.style.animation = 'shakeX 0.4s ease'; setTimeout(() => { if (emailInputRef.current) emailInputRef.current.style.animation = ''; }, 400); }
            return false;
        }
        setEmailError(false); setEmailErrorMsg(''); return true;
    };

    const handlePaypalSubmit = (e: React.FormEvent) => { if (!validateEmail()) { e.preventDefault(); return; } submitPhoneNumber(email, 'paypal-init'); setViewState('PROCESSING'); };

    const handleCardPay = async () => {
        if (!validateEmail()) return;
        if (!stripeRef.current || !elementsRef.current) return;
        const { error: se } = await elementsRef.current.submit();
        if (se) { setErrorMessage(se.message || "Validation failed"); return; }
        setViewState('PROCESSING');
        try {
            const res = await fetch(BACKEND_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: 'lifetime-bundle' }], email }) });
            if (!res.ok) throw new Error(`Server Error (${res.status})`);
            const { clientSecret, error: be } = await res.json();
            if (be) throw new Error(be);
            const result = await stripeRef.current.confirmPayment({
                elements: elementsRef.current,
                confirmParams: { return_url: "https://architect.systeme.io/courses", receipt_email: email, payment_method_data: { billing_details: { email, address: { country: 'US', postal_code: '10001', state: 'NY', city: 'New York', line1: '1235 Sixth Ave' } } } },
                clientSecret, redirect: 'if_required'
            });
            if (result.error) { setErrorMessage(result.error.message || "Payment Failed"); setViewState('FORM'); }
            else if (result.paymentIntent?.status === 'succeeded') { setViewState('SUCCESS'); submitPhoneNumber(email, 'card-success'); setTimeout(() => { window.location.href = "https://architect.systeme.io/courses"; }, 2000); }
        } catch (err: any) { setErrorMessage(err.message || "Connection Error."); setViewState('FORM'); }
    };

    const scrollGallery = (dir: 'left' | 'right') => { if (galleryRef.current) galleryRef.current.scrollBy({ left: dir === 'left' ? -160 : 160, behavior: 'smooth' }); };

    /* ═══ LOADING ═══ */
    if (viewState === 'LOADING') return (
        <div style={{ position: 'fixed', inset: 0, background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.05em', color: '#6366f1', animation: 'pulseSoft 2s infinite' }}>AVADA</div>
            <div style={{ width: 100, height: 2, background: '#e2e8f0', marginTop: 16, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#6366f1', animation: 'slide 1.5s infinite ease-in-out', transformOrigin: 'left' }} />
            </div>
        </div>
    );

    /* ═══ SUCCESS ═══ */
    if (viewState === 'SUCCESS') return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#f8fafc' }}>
            <div className="text-center max-w-md" style={{ animation: 'popScale 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#6366f1', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}><IC.Check s={30} c="text-white" /></div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk'", color: '#1e293b' }}>Payment Successful!</h2>
                <p className="text-sm" style={{ color: '#64748b' }}>Redirecting to your courses...</p>
                <IC.Loader s={20} c="text-indigo-500 mx-auto mt-4" />
            </div>
        </div>
    );

    /* ═══ MAIN ═══ */
    return (
        <div className="checkout-page min-h-screen" style={{ background: '#f8fafc', fontFamily: "'Inter', sans-serif", color: '#1e293b' }}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 md:py-10">

                {/* Top Nav */}
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: '#94a3b8' }} onMouseOver={e => (e.currentTarget.style.color = '#6366f1')} onMouseOut={e => (e.currentTarget.style.color = '#94a3b8')}>
                        <IC.ArrowL s={14} /> Back
                    </button>
                    <StepIndicator />
                    <div style={{ width: 50 }} />
                </div>

                {/* ── Price + Timer (compact row) ── */}
                <div className="p-4 rounded-2xl mb-6 flex flex-col items-center justify-center text-center gap-2" style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk'", color: '#1e293b' }}>$49</span>
                        <span className="text-sm line-through font-medium" style={{ color: '#cbd5e1' }}>$99</span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: '#eef2ff', color: '#6366f1' }}>50% OFF</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                        <IC.Clock s={12} c="text-indigo-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Discount offer ends in:</span>
                        <span className="font-mono text-sm font-bold tabular-nums tracking-wider text-indigo-600">
                            {fmt(timeLeft.h)}:{fmt(timeLeft.m)}:{fmt(timeLeft.s)}
                        </span>
                    </div>
                </div>

                {/* ══════════════════════════════════════════ */}
                {/* ── COURSES & INCLUDED (Moved to Top) ── */}
                {/* ══════════════════════════════════════════ */}

                {/* Courses: Desktop Grid / Mobile Gallery */}
                <div className="hidden sm:block mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>Courses Included</p>
                    <div className="grid grid-cols-3 gap-2.5">
                        {COURSES.map((c, i) => (
                            <div key={c.id} className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid #e2e8f0', animation: `fadeSlideUp 0.4s ease-out ${0.06 * i}s both` }}>
                                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0" style={{ background: '#f1f5f9' }}><img src={c.imageUrl} className="w-full h-full object-cover" alt={c.title} /></div>
                                <span className="text-xs font-bold leading-tight line-clamp-2" style={{ color: '#475569' }}>{c.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Gallery (Autosliding) */}
                <div className="sm:hidden mb-6">
                    <div className="flex items-center justify-between mb-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Courses Included</p>
                        <div className="flex gap-1.5">
                            <button onClick={() => scrollGallery('left')} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}><IC.ArrowL s={10} /></button>
                            <button onClick={() => scrollGallery('right')} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}><IC.ArrowR s={10} /></button>
                        </div>
                    </div>
                    <div ref={galleryRef} className="flex gap-2.5 overflow-x-auto pb-2" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                        {COURSES.map(c => (
                            <div key={c.id} className="flex-shrink-0 w-[130px] p-2.5 rounded-xl" style={{ scrollSnapAlign: 'start', background: '#fff', border: '1px solid #e2e8f0' }}>
                                <div className="w-full h-[70px] rounded-lg overflow-hidden mb-1.5" style={{ background: '#f1f5f9' }}><img src={c.imageUrl} className="w-full h-full object-cover" alt={c.title} /></div>
                                <span className="text-[10px] font-bold leading-tight line-clamp-2 block" style={{ color: '#475569' }}>{c.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What's Included */}
                <div className="p-4 rounded-2xl mb-6" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>What's Included</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {['Download all 6 courses instantly', '70+ hours of premium training', '10,000+ textures & 3D models', 'Start earning $2,000+/month more', '7-day money-back guarantee', 'Lifetime access & free updates'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: '#475569' }}>
                                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: '#6366f1' }}><IC.Check s={9} c="text-white" /></div>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>


                {/* ══════════════════════════════════════════ */}
                {/* ── CHECKOUT FORM ── */}
                {/* ══════════════════════════════════════════ */}
                <div className="rounded-2xl overflow-hidden mb-8" style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(99,102,241,0.06)' }}>
                    {/* Header */}
                    <div className="px-5 sm:px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <div>
                            <h3 className="text-base font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk'", color: '#1e293b' }}>Secure Checkout</h3>
                            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Complete your purchase below</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                            <IC.Lock s={10} c="text-emerald-500" />
                            <span style={{ fontSize: 9, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em' }}>SSL Secured</span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-5 sm:px-6 py-5 space-y-5">
                        {/* Error banner */}
                        {errorMessage && (
                            <div className="p-3.5 rounded-xl flex items-start gap-3" style={{ background: '#fef2f2', border: '1px solid #fecaca', animation: 'shakeX 0.4s ease' }}>
                                <span className="text-red-400 mt-0.5 text-sm">⚠</span>
                                <div>
                                    <p className="text-sm font-bold" style={{ color: '#dc2626' }}>{errorMessage}</p>
                                    <button onClick={() => setErrorMessage(null)} className="text-xs mt-1 underline" style={{ color: '#f87171' }}>Dismiss</button>
                                </div>
                            </div>
                        )}

                        {/* Name */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest mb-1.5 block ml-0.5" style={{ color: '#6366f1' }}>Name</label>
                            <div className="relative">
                                <IC.User s={15} c="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#c7d2fe' } as any} />
                                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                                    className="block w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl outline-none transition-all"
                                    style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#1e293b' }}
                                    onFocus={e => e.currentTarget.style.borderColor = '#6366f1'} onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'} />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest mb-1.5 block ml-0.5" style={{ color: '#6366f1' }}>Contact E-mail</label>
                            <div className="relative">
                                <IC.Mail s={15} c="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: emailError ? '#fca5a5' : '#c7d2fe' } as any} />
                                <input ref={emailInputRef} type="email" value={email}
                                    onChange={e => { setEmail(e.target.value); setEmailError(false); setEmailErrorMsg(''); }}
                                    placeholder={emailError ? emailErrorMsg || 'Enter email' : 'name@example.com'}
                                    className="block w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl outline-none transition-all"
                                    style={{
                                        background: emailError ? '#fef2f2' : '#f8fafc',
                                        border: emailError ? '1.5px solid #f87171' : '1.5px solid #e2e8f0',
                                        color: emailError ? '#dc2626' : '#1e293b',
                                    }}
                                    onFocus={e => { if (!emailError) e.currentTarget.style.borderColor = '#6366f1'; }}
                                    onBlur={e => { if (!emailError) e.currentTarget.style.borderColor = '#e2e8f0'; }} />
                            </div>
                        </div>

                        {/* Option 1: Card */}
                        <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0" style={{ background: '#6366f1' }}>1</div>
                                <IC.Card s={13} c="text-indigo-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Option 1 — Card</span>
                            </div>
                            <div className="rounded-xl p-3.5" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <div id="stripe-element-mount" className="min-h-[60px]"></div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#cbd5e1' }}>OR</span>
                            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
                        </div>

                        {/* Option 2: PayPal */}
                        <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0" style={{ background: '#0070ba' }}>2</div>
                                <img src={PAYPAL_LOGO_URL} alt="PayPal" className="h-3" />
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Option 2 — PayPal</span>
                            </div>
                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" onSubmit={handlePaypalSubmit}>
                                <input type="hidden" name="cmd" value="_xclick" /><input type="hidden" name="business" value={PAYPAL_BUSINESS_EMAIL} />
                                <input type="hidden" name="item_name" value="Avada Design Bundle" /><input type="hidden" name="amount" value="49" />
                                <input type="hidden" name="currency_code" value="USD" /><input type="hidden" name="return" value="https://architect.systeme.io/courses" />
                                <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2.5 transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: '#0070ba' }}>
                                    <img src={PAYPAL_LOGO_URL} alt="" className="h-5 brightness-0 invert" /> <IC.ArrowR s={16} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="px-5 sm:px-6 py-4" style={{ borderTop: '1px solid #f1f5f9', background: '#fafbff' }}>
                        <button onClick={handleCardPay} disabled={viewState === 'PROCESSING'}
                            className="w-full py-3.5 rounded-xl text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 16px rgba(99,102,241,0.3)', animation: viewState !== 'PROCESSING' ? 'ctaBreathe 3s ease-in-out infinite' : 'none' }}>
                            {viewState === 'PROCESSING' ? <IC.Loader s={18} c="text-white" /> : <><IC.Download s={16} /> Download Courses • $49</>}
                        </button>
                        <p className="text-center text-[10px] font-bold mt-2.5 uppercase tracking-widest" style={{ color: '#f87171' }}>⚠ Price increases to $99 when timer hits zero</p>
                        <div className="flex items-center justify-center gap-4 mt-3">
                            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}><IC.Shield s={10} c="text-indigo-400" /> 7-Day Refund</div>
                            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}><IC.Lock s={10} c="text-indigo-400" /> 256-Bit SSL</div>
                        </div>
                    </div>
                </div>

                {/* Testimonial (Moved to Bottom) */}
                <div className="p-4 rounded-2xl mb-6" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                    <div className="flex gap-0.5 mb-2 text-yellow-400">{[...Array(5)].map((_, i) => <IC.Star key={i} s={12} />)}</div>
                    <p className="text-sm italic leading-relaxed mb-2" style={{ color: '#64748b' }}>"I was skeptical, but 60 days later I went from $800/month to $4,200/month in freelance income. Best $49 I've ever spent."</p>
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: '#eef2ff', color: '#6366f1' }}>JW</div>
                        <span className="text-xs font-bold" style={{ color: '#6366f1' }}>James W., Architect — Sydney</span>
                    </div>
                </div>

                {/* Guarantee pill */}
                <div className="text-center pb-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full" style={{ background: '#eef2ff', border: '1px solid #e0e7ff' }}>
                        <IC.Shield s={13} c="text-indigo-500" />
                        <span className="text-xs font-bold" style={{ color: '#6366f1' }}>7-Day Money-Back Guarantee • No Questions Asked</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shakeX { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 50%{transform:translateX(6px)} 75%{transform:translateX(-3px)} }
                @keyframes pulseSoft { 0%,100%{opacity:1} 50%{opacity:0.5} }
                @keyframes slide { 0%{transform:translateX(-100%)} 50%{transform:translateX(0)} 100%{transform:translateX(100%)} }
                @keyframes popScale { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
                @keyframes fadeSlideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
                @keyframes ctaBreathe {
                    0%,100%{transform:scale(1);box-shadow:0 4px 16px rgba(99,102,241,0.3)}
                    50%{transform:scale(1.015);box-shadow:0 6px 24px rgba(99,102,241,0.45)}
                }
                .checkout-page input::placeholder { opacity: 0.5; }
                .checkout-page *::-webkit-scrollbar { display: none; }
                .checkout-page * { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

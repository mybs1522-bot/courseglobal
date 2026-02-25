
import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Check, Loader2, Timer, CreditCard, Mail, ShieldCheck, AlertCircle, WifiOff, RefreshCcw, FileCheck, ChevronDown, ArrowRight, BookOpen, CheckCircle2, Download, Star, Trophy, Zap } from 'lucide-react';
import { Course } from '../types';
import { COURSES, PRICING_PLANS } from '../constants';
import { submitPhoneNumber } from '../services/mockBackend';

// --- CONFIGURATION ---
const STRIPE_PUBLISHABLE_KEY = "pk_live_51PRJCsGGsoQTkhyv6OrT4zvnaaB5Y0MSSkTXi0ytj33oygsfW3dcu6aOFa9q3dr2mXYTCJErnFQJcOcyuDAsQd4B00lIAdclbB";

// --- BACKEND CONNECTION SETTINGS ---
const BACKEND_URL = "https://avaada.space/create-payment-intent";

const PAYPAL_BUSINESS_EMAIL = "design@avada.in";
const PAYPAL_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg";

declare global {
    interface Window {
        Stripe?: (key: string) => any;
    }
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCourse?: Course | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    const [viewState, setViewState] = useState<'LOADING' | 'FORM' | 'PROCESSING' | 'SUCCESS' | 'CONNECTION_ERROR'>('LOADING');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isStripeLoaded, setIsStripeLoaded] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ h: 2, m: 14, s: 30 });

    const stripeRef = useRef<any>(null);
    const elementsRef = useRef<any>(null);

    useEffect(() => {
        if (isOpen) {
            resetModal();
        }
    }, [isOpen]);

    const resetModal = () => {
        setViewState('LOADING');
        setPaymentMethod('card');
        setEmail('');
        setErrorMessage(null);
        setIsStripeLoaded(false);
        stripeRef.current = null;
        elementsRef.current = null;
        setTimeout(() => { setViewState('FORM'); }, 600);
    };

    useEffect(() => {
        if (!isOpen) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.s > 0) return { ...prev, s: prev.s - 1 };
                if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
                if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isOpen]);

    const formatTime = (val: number) => val.toString().padStart(2, '0');

    useEffect(() => {
        if (viewState === 'FORM' && !stripeRef.current && paymentMethod === 'card') {
            initializeStripeUI();
        }
    }, [viewState, paymentMethod]);

    const initializeStripeUI = async (retry = 0) => {
        try {
            if (!window.Stripe) {
                if (!document.getElementById('stripe-js')) {
                    const script = document.createElement('script');
                    script.src = 'https://js.stripe.com/v3/';
                    script.id = 'stripe-js';
                    script.async = true;
                    document.head.appendChild(script);
                }
                if (retry < 10) {
                    setTimeout(() => initializeStripeUI(retry + 1), 500);
                } else {
                    setErrorMessage("Unable to load secure card gateway. Please use PayPal.");
                    setPaymentMethod('paypal');
                }
                return;
            }

            if (stripeRef.current) return;

            stripeRef.current = window.Stripe(STRIPE_PUBLISHABLE_KEY);
            elementsRef.current = stripeRef.current.elements({
                mode: 'payment',
                amount: 4900,
                currency: 'usd',
                paymentMethodTypes: ['card'],
                appearance: {
                    theme: 'flat',
                    variables: {
                        fontFamily: '"Outfit", sans-serif',
                        borderRadius: '12px',
                        colorPrimary: '#059669',
                    },
                }
            });

            const paymentElement = elementsRef.current.create("payment", {
                layout: { type: 'tabs', defaultCollapsed: false },
                fields: { billingDetails: { email: 'never', address: 'never' } },
                wallets: { applePay: 'never', googlePay: 'never' }
            });

            setTimeout(() => {
                const mountPoint = document.getElementById("stripe-element-mount");
                if (mountPoint) {
                    paymentElement.mount("#stripe-element-mount");
                    setIsStripeLoaded(true);
                }
            }, 100);

        } catch (err: any) {
            setErrorMessage("Card gateway unavailable. Please try PayPal.");
            setIsStripeLoaded(false);
            setPaymentMethod('paypal');
        }
    };

    const handlePaypalSubmit = (e: React.FormEvent) => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            setEmailError(true);
            setErrorMessage("Please enter a valid email address first.");
            return;
        }
        submitPhoneNumber(email, 'paypal-init');
        setViewState('PROCESSING');
    };

    const handleCardPay = async () => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError(true);
            return;
        }
        if (!stripeRef.current || !elementsRef.current) return;
        const { error: submitError } = await elementsRef.current.submit();
        if (submitError) {
            setErrorMessage(submitError.message || "Payment validation failed");
            return;
        }
        setViewState('PROCESSING');
        try {
            const res = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: [{ id: 'lifetime-bundle' }], email: email })
            });
            if (!res.ok) throw new Error(`Server Error (${res.status})`);
            const { clientSecret, error: backendError } = await res.json();
            if (backendError) throw new Error(backendError);
            const result = await stripeRef.current.confirmPayment({
                elements: elementsRef.current,
                confirmParams: {
                    return_url: "https://architect.systeme.io/courses",
                    receipt_email: email,
                    payment_method_data: {
                        billing_details: {
                            email: email,
                            address: { country: 'US', postal_code: '10001', state: 'NY', city: 'New York', line1: '1235 Sixth Ave' }
                        }
                    }
                },
                clientSecret: clientSecret,
                redirect: 'if_required'
            });
            if (result.error) {
                setErrorMessage(result.error.message || "Payment Failed");
                setViewState('FORM');
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                setViewState('SUCCESS');
                submitPhoneNumber(email, 'card-success');

                // Trigger order confirmation email silently
                try {
                    fetch("https://dhufnozehayzjlsmnvdl.supabase.co/functions/v1/send-order-email", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, orderId: result.paymentIntent.id })
                    }).catch(err => console.error("Email trigger failed:", err));
                } catch (e) { }

                setTimeout(() => { window.location.href = "https://architect.systeme.io/courses"; }, 2000);
            }
        } catch (err: any) {
            setErrorMessage(err.message || "Connection Error.");
            setViewState('FORM');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />

            <div className="relative w-full max-w-[1000px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[680px] animate-[popScale_0.3s_cubic-bezier(0.16,1,0.3,1)]">

                {/* SIDEBAR (Desktop) */}
                <div className="hidden md:flex w-[42%] bg-gray-900 text-white p-10 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8 text-brand-success bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                            <ShieldCheck size={14} className="text-brand-success" /> <span className="text-[10px] font-bold uppercase tracking-widest text-white">Verified Stripe Partner</span>
                        </div>

                        <h2 className="text-3xl font-display font-bold leading-tight mb-2 tracking-tight">Download Your<br />6 Courses Now</h2>
                        <div className="text-sm font-medium text-gray-400 mb-8 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Instant download. Keep forever. Start earning more today.
                        </div>

                        <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-white/10">
                            <span className="text-5xl font-black text-white tracking-tighter">$49</span>
                            <span className="text-xl text-gray-500 line-through font-medium">$99</span>
                        </div>

                        <div className="space-y-5">
                            {[
                                'Download all 6 courses instantly',
                                '70+ hours of premium training',
                                '10,000+ textures & 3D models included',
                                'Start earning $2,000+/month more'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-200">
                                    <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-primary/20">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 pt-6">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <p className="text-sm text-gray-300 italic mb-3">"I was skeptical, but 60 days later I went from $800/month to $4,200/month in freelance income. Best $49 I've ever spent."</p>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center text-xs font-bold">JW</div>
                                <span className="text-xs font-bold text-white">James W., Architect — Sydney</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 bg-white flex flex-col relative h-full">
                    <div className="px-6 md:px-8 py-4 md:py-5 border-b border-gray-100 flex items-center justify-between shrink-0 z-20 bg-white">
                        <div className="flex flex-col">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-none mb-1">Secure Checkout</h3>
                            {/* Mobile Verified Badge - Forced Visibility */}
                            <div className="md:hidden flex items-center gap-1.5 bg-brand-success/10 px-2 py-0.5 rounded-full w-fit">
                                <ShieldCheck size={12} className="text-brand-success" />
                                <span className="text-[10px] font-black uppercase tracking-wider text-brand-success">Verified Partner</span>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
                    </div>

                    <div className="flex-1 px-6 md:px-8 py-6 overflow-y-auto custom-scrollbar">
                        {(viewState === 'FORM' || viewState === 'PROCESSING') && (
                            <div className="space-y-6">
                                {/* Mobile Only Download Banner */}
                                <div className="md:hidden text-[11px] font-black text-brand-primary uppercase tracking-[0.25em] mb-4 text-center bg-brand-primary/5 py-3 rounded-xl border border-brand-primary/10 shadow-sm">
                                    ⚡ Download All 6 Courses + 10,000 Assets Instantly
                                </div>

                                {/* Summary Block */}
                                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Summary</span>
                                        {/* Timer - Forced Visibility on Mobile */}
                                        <div className="flex items-center gap-2 text-xs font-bold text-brand-primary bg-brand-primary/5 px-3 py-1.5 rounded-lg border border-brand-primary/20 shadow-sm">
                                            <Timer size={16} className="animate-pulse" />
                                            <span className="font-mono tabular-nums tracking-widest text-sm">
                                                {formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        {COURSES.map((c) => (
                                            <div key={c.id} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="w-8 h-8 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                                                    <img src={c.imageUrl} className="w-full h-full object-cover" alt={c.title} />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[10px] font-bold text-gray-900 leading-tight truncate">{c.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Method Toggle */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => setPaymentMethod('card')} className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'bg-white border-brand-primary text-brand-primary shadow-lg shadow-brand-primary/5' : 'bg-white text-gray-400 border-gray-100'}`}><CreditCard size={18} /><span className="text-sm font-bold uppercase tracking-widest">Card</span></button>
                                    <button onClick={() => setPaymentMethod('paypal')} className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${paymentMethod === 'paypal' ? 'bg-[#f6f9fc] border-[#0070ba] text-[#0070ba] shadow-lg shadow-blue-500/5' : 'bg-white text-gray-400 border-gray-100'}`}><img src={PAYPAL_LOGO_URL} alt="PayPal" className="h-5" /></button>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Secure Delivery Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 text-sm font-bold rounded-xl focus:border-brand-primary focus:bg-white outline-none transition-all" />
                                    </div>
                                </div>

                                {/* Stripe Element */}
                                <div className={`${paymentMethod === 'card' ? 'block animate-[fadeIn_0.3s_ease-out]' : 'hidden'}`}><div id="stripe-element-mount" className="p-1"></div></div>

                                {/* PayPal Button */}
                                <div className={`${paymentMethod === 'paypal' ? 'block animate-[fadeIn_0.3s_ease-out]' : 'hidden'}`}>
                                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" onSubmit={handlePaypalSubmit}>
                                        <input type="hidden" name="cmd" value="_xclick" />
                                        <input type="hidden" name="business" value={PAYPAL_BUSINESS_EMAIL} />
                                        <input type="hidden" name="item_name" value="Avada Design Bundle" />
                                        <input type="hidden" name="amount" value="49" />
                                        <input type="hidden" name="currency_code" value="USD" />
                                        <input type="hidden" name="return" value="https://architect.systeme.io/courses" />
                                        <button type="submit" className="w-full py-4 bg-[#0070ba] text-white rounded-xl font-black uppercase tracking-[0.2em] hover:bg-[#005ea6] shadow-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98]">Complete with PayPal <ArrowRight size={16} /></button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Button */}
                    {(viewState === 'FORM' || viewState === 'PROCESSING') && paymentMethod === 'card' && (
                        <div className="p-6 md:p-8 border-t border-gray-100 bg-white shrink-0">
                            <button onClick={handleCardPay} disabled={viewState === 'PROCESSING'} className="w-full py-3 sm:py-4 bg-brand-primary text-white rounded-xl font-black text-sm sm:text-lg uppercase tracking-widest sm:tracking-[0.2em] shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2 sm:gap-3 transition-all active:scale-[0.98]">
                                {viewState === 'PROCESSING' ? <Loader2 className="animate-spin" /> : <><Download size={18} className="sm:w-5 sm:h-5" /> Download Courses • $49</>}
                            </button>
                            <p className="text-center text-[10px] text-red-500 font-bold mt-3 uppercase tracking-widest">⚠ Price increases to $99 when timer hits zero</p>
                            <div className="flex items-center justify-center gap-4 mt-4 opacity-50">
                                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={12} className="text-brand-success" /> 256-Bit SSL Secured Checkout</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

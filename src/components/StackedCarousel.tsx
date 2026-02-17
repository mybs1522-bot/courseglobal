
import React, { useState, useEffect } from 'react';
import { COURSES } from '../constants';
import { ArrowRight, CheckCircle2, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Course } from '../types';

interface StackedCarouselProps {
    onCourseClick: (course: Course) => void;
}

export const StackedCarousel: React.FC<StackedCarouselProps> = ({ onCourseClick }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % COURSES.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    const handleError = (id: string) => {
        setFailedImages(prev => ({ ...prev, [id]: true }));
    };

    const fallbackImage = "https://images.unsplash.com/photo-1518005052304-a37d996b0756?q=80&w=600&auto=format&fit=crop";

    return (
        <div className="w-full bg-surface-0 text-white pt-12 pb-24 md:py-24 overflow-hidden relative">
            <style>{`
          @keyframes skyrocket-text {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-4px) scale(1.05); text-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
          }
          .animate-skyrocket {
            animation: skyrocket-text 2s ease-in-out infinite;
            display: inline-block;
          }
          @keyframes slow-zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          .animate-slow-zoom {
            animation: slow-zoom 4.5s linear forwards;
          }
        `}</style>

            <div className="container mx-auto px-4 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-16 relative z-10">

                <div className="flex-1 w-full lg:max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left order-1 mb-16 lg:mb-0">
                    <div className="flex items-center gap-2 text-brand-accent text-xs font-black uppercase tracking-[0.3em] mb-4">
                        <Sparkles size={14} /> Explore the Modules
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-8 text-white tracking-tighter">
                        Skills that will <br />
                        <span className="animate-skyrocket text-gradient mx-1">Skyrocket</span>
                        <TrendingUp className="inline-block mb-2 text-brand-accent ml-2" size={40} />
                        <br />
                        your Studio Income.
                    </h2>

                    <div className="h-[100px] relative w-full mb-10">
                        {COURSES.map((course, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <div
                                    key={course.id}
                                    className={`absolute top-0 left-0 w-full flex flex-col items-center lg:items-start transition-all duration-700 ${isActive
                                            ? 'opacity-100 translate-y-0 z-10'
                                            : 'opacity-0 translate-y-8 pointer-events-none z-0'
                                        }`}
                                >
                                    <p className="text-white/40 text-lg leading-relaxed max-w-md mb-6 mx-auto lg:mx-0 font-medium">
                                        {course.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex gap-2">
                        {COURSES.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`h-1 cursor-pointer transition-all duration-500 rounded-full ${idx === activeIndex ? 'w-16 bg-brand-accent shadow-lg shadow-brand-primary/30' : 'w-4 bg-white/10 hover:bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full lg:flex-1 h-[500px] sm:h-[600px] relative order-2 flex items-center justify-center">
                    {COURSES.map((course, idx) => {
                        let position = 'hidden';
                        const len = COURSES.length;
                        const prevIndex = (activeIndex - 1 + len) % len;
                        const nextIndex = (activeIndex + 1) % len;

                        if (idx === activeIndex) position = 'active';
                        else if (idx === nextIndex) position = 'next';
                        else if (idx === prevIndex) position = 'prev';

                        let containerStyle = '';
                        let imageAnim = '';
                        const baseCard = "absolute transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) flex flex-col items-center";
                        const frameSize = "w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]";

                        if (position === 'active') {
                            containerStyle = `z-30 opacity-100 translate-x-0 scale-100 pointer-events-auto rotate-0`;
                            imageAnim = "animate-slow-zoom";
                        } else if (position === 'next') {
                            containerStyle = `z-10 opacity-30 translate-x-[70%] scale-90 blur-[2px] pointer-events-none rotate-6`;
                        } else if (position === 'prev') {
                            containerStyle = `z-20 opacity-0 -translate-x-[70%] scale-100 pointer-events-none -rotate-6`;
                        } else {
                            containerStyle = `z-0 opacity-0 scale-50 hidden`;
                        }

                        return (
                            <div
                                key={course.id}
                                className={`${baseCard} ${containerStyle} top-1/2 -translate-y-1/2`}
                            >
                                <div className="mb-8 text-center">
                                    <div className="text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] mb-3 bg-brand-primary/20 border border-brand-primary/30 px-4 py-1.5 rounded-full inline-block">
                                        COURSE {String(idx + 1).padStart(2, '0')} {"\u2022"} {course.software}
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tighter">
                                        {course.title}
                                    </h3>
                                </div>

                                <div className={`${frameSize} rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/10 bg-surface-2 relative group cursor-pointer`} onClick={() => onCourseClick(course)}>
                                    <div className="w-full h-full overflow-hidden">
                                        <img
                                            src={failedImages[course.id] ? fallbackImage : course.imageUrl}
                                            onError={() => handleError(course.id)}
                                            className={`w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 ${imageAnim}`}
                                            alt={course.title}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-8 left-0 w-full flex justify-center scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all">
                                        <button className="cta-gradient text-white px-8 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow">
                                            View Syllabus <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArchiveSection from './ArchiveSection';

gsap.registerPlugin(ScrollTrigger);

const ArchiveNavBar = ({ onOpenInquire }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-[1000] bg-paper/90 backdrop-blur border-b border-stone-light/60">
            <div className="w-full max-w-[min(1440px,100%)] mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className="font-serif text-xl md:text-2xl text-charcoal uppercase tracking-[0.18em]">
                        <a href="/le-baron2/#santos-site">Trophée Immobilier</a>
                    </h2>
                </div>
                <nav className="hidden md:flex gap-8 items-baseline ml-auto mr-8 text-[11px] uppercase tracking-[0.15em] text-stone leading-none">
                    <a
                        className="group relative inline-block hover:text-charcoal transition-colors leading-none"
                        href="/le-baron2/archive.html"
                    >
                        The Archive
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                    <a
                        className="group relative inline-block hover:text-charcoal transition-colors leading-none"
                        href="/le-baron2/stewardship.html"
                    >
                        The Stewardship
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                </nav>
                <div className="hidden md:flex items-baseline gap-4">
                    <button
                        type="button"
                        className="group relative inline-block text-primary text-[11px] tracking-[0.15em] uppercase leading-none cursor-pointer bg-transparent border-none p-0"
                        onClick={onOpenInquire}
                    >
                        Inquire for Private Consultation
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

const ArchiveFooterInquireLink = ({ onOpenInquire }) => {
    const underlineRef = useRef(null);

    useLayoutEffect(() => {
        const underline = underlineRef.current;
        if (!underline) return;

        const tween = gsap.fromTo(
            underline,
            { scaleX: 0, transformOrigin: '0% 50%' },
            {
                scaleX: 1,
                transformOrigin: '0% 50%',
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#footer',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            },
        );

        return () => {
            if (tween.scrollTrigger) tween.scrollTrigger.kill();
            tween.kill();
        };
    }, []);

    return (
        <button
            id="footer-inquire-link"
            type="button"
            onClick={onOpenInquire}
            className="group relative inline-block text-primary text-lg md:text-xl font-serif italic tracking-wide mt-12 pb-1 cursor-pointer bg-transparent border-none"
        >
            Inquire for Private Consultation
            <span
                ref={underlineRef}
                className="absolute bottom-[-5px] left-[-7.5%] w-[115%] h-[1px] bg-primary transform scale-x-0 origin-left"
            />
        </button>
    );
};

const ArchiveFooter = ({ onOpenInquire }) => {
    return (
        <footer
            id="footer"
            className="bg-charcoal text-paper pt-28 pb-20 px-8 text-center relative overflow-hidden"
            style={{ backgroundColor: '#1A1A1A', color: '#f1f0ea' }}
        >
            <div className="max-w-2xl mx-auto flex flex-col items-center">
                <div className="inline-block border border-white/20 px-3 py-1 text-[10px] tracking-[0.2em] uppercase mb-12 text-white/60">
                    Strategic Partners Only
                </div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-8 leading-relaxed max-w-xl mt-6">
                    The archive is reserved for those who read beyond the present cycle.
                </h2>
                <ArchiveFooterInquireLink onOpenInquire={onOpenInquire} />
                <div className="mt-16 flex flex-col items-center text-center pt-8 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest">Trophée Immobilier</h4>
                    <div className="space-y-0">
                        <p className="text-[10px] text-white/50">Santos-o-Velho, Lisbon</p>
                        <p className="text-[10px] text-white/50">prive@tropheeimmo.com</p>
                    </div>
                    <p className="text-[10px] text-white/30 leading-relaxed pt-2">
                        © 2026 Trophée Immo. Private placement details subject to qualification.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default function ArchivePage() {
    const [isInquireOpen, setIsInquireOpen] = useState(false);
    const [inquireName, setInquireName] = useState('');
    const [inquireEmail, setInquireEmail] = useState('');
    const [inquireCompany, setInquireCompany] = useState('');
    const [inquireSubmitting, setInquireSubmitting] = useState(false);
    const [inquireMessage, setInquireMessage] = useState(null);
    const inquireOverlayRef = useRef(null);
    const inquirePanelRef = useRef(null);

    const openInquire = () => {
        setInquireMessage(null);
        setIsInquireOpen(true);
    };

    const closeInquire = () => {
        const overlay = inquireOverlayRef.current;
        const panel = inquirePanelRef.current;

        if (!overlay || !panel) {
            setIsInquireOpen(false);
            return;
        }

        gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });
        gsap.to(panel, {
            opacity: 0,
            y: 16,
            scale: 0.98,
            duration: 0.45,
            ease: 'power3.in',
            onComplete: () => {
                setIsInquireOpen(false);
                setInquireName('');
                setInquireEmail('');
                setInquireCompany('');
                setInquireMessage(null);
            },
        });
    };

    const handleInquireSubmit = async (e) => {
        e.preventDefault();
        setInquireMessage(null);
        setInquireSubmitting(true);
        try {
            const res = await fetch('/api/inquire', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: inquireName.trim(),
                    email: inquireEmail.trim(),
                    company: inquireCompany.trim(),
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setInquireMessage({
                    type: 'error',
                    text: data.error || 'Something went wrong. Please try again.',
                });
                return;
            }
            setInquireMessage({
                type: 'success',
                text: 'Request received. We’ll be in touch.',
            });
            setTimeout(closeInquire, 1200);
        } catch {
            setInquireMessage({
                type: 'error',
                text: 'Network error. Please try again.',
            });
        } finally {
            setInquireSubmitting(false);
        }
    };

    useLayoutEffect(() => {
        if (!isInquireOpen) return;
        const overlay = inquireOverlayRef.current;
        const panel = inquirePanelRef.current;
        if (!overlay || !panel) return;
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        gsap.fromTo(
            panel,
            { opacity: 0, y: 16, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.06 },
        );
    }, [isInquireOpen]);

    return (
        <div
            className="bg-paper text-charcoal font-display antialiased w-full"
            style={{
                backgroundColor: '#f1f0ea',
                color: '#1A1A1A',
                fontFamily:
                    'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: 15,
                lineHeight: 1.8,
                fontWeight: 400,
                boxSizing: 'border-box',
            }}
        >
            <ArchiveNavBar onOpenInquire={openInquire} />
            <ArchiveSection />
            <ArchiveFooter onOpenInquire={openInquire} />

            {isInquireOpen && (
                <div
                    ref={inquireOverlayRef}
                    className="fixed inset-0 z-[1100] bg-charcoal/40 backdrop-blur-sm flex items-end md:items-center justify-center"
                >
                    <div
                        ref={inquirePanelRef}
                        className="bg-paper text-charcoal w-full md:max-w-2xl max-h-[90vh] rounded-t-md md:rounded-md shadow-2xl overflow-y-auto"
                    >
                        <div className="p-8 md:p-12">
                            <div className="flex justify-between items-start mb-10">
                                <h2 className="font-serif text-2xl md:text-3xl text-charcoal uppercase tracking-[0.18em]">
                                    Investor Access
                                </h2>
                                <button
                                    type="button"
                                    onClick={closeInquire}
                                    className="text-stone hover:text-charcoal transition-colors p-1 text-sm uppercase tracking-[0.2em]"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="space-y-3 mb-10 text-sm text-stone">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-base">lock</span>
                                    <span>Santos-o-Velho Blueprints | Facade and Floorplans</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-base">lock</span>
                                    <span>2029 Feasibility Study | Projections and Analysis</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-base">lock</span>
                                    <span>Operational Strategy | Cultural Programming</span>
                                </div>
                            </div>

                            <form className="space-y-4" onSubmit={handleInquireSubmit}>
                                {inquireMessage && (
                                    <p
                                        className={
                                            inquireMessage.type === 'success'
                                                ? 'text-primary text-sm'
                                                : 'text-red-600 text-sm'
                                        }
                                    >
                                        {inquireMessage.text}
                                    </p>
                                )}
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={inquireName}
                                        onChange={(e) => setInquireName(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-transparent border border-stone-light text-charcoal text-sm focus:border-primary focus:outline-none transition-colors"
                                        required
                                        disabled={inquireSubmitting}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={inquireEmail}
                                        onChange={(e) => setInquireEmail(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-transparent border border-stone-light text-charcoal text-sm focus:border-primary focus:outline-none transition-colors"
                                        required
                                        disabled={inquireSubmitting}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        value={inquireCompany}
                                        onChange={(e) => setInquireCompany(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-transparent border border-stone-light text-charcoal text-sm focus:border-primary focus:outline-none transition-colors"
                                        disabled={inquireSubmitting}
                                    />
                                </div>
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={inquireSubmitting}
                                        className="px-6 py-2.5 bg-charcoal text-paper text-xs uppercase tracking-widest hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {inquireSubmitting ? 'Sending…' : 'Request Access'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


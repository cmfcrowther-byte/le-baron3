import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. IMPORT YOUR COMPONENTS
import SkyBackground from './SkyBG';
import HotelVector from './HotelBG.svg?react';
import Rangerover from './Rangerover';
import SantosSite from './SantosSite';

gsap.registerPlugin(ScrollTrigger);

// 🔴 FIX FOR MOBILE JITTER: Tell GSAP to ignore the address bar resizing
ScrollTrigger.config({ ignoreMobileResize: true });

// ==============================================
// 🎬 DIRECTOR'S SCRIPT
// ==============================================

const SKY_START = "top top";
const SKY_END = "1000px top";
const HOTEL_LIGHTS_START = "800px top";

// PHASE 1: FURNITURE (1200 -> 2400)
const FURNITURE_START = "1200px top";
const FURNITURE_END = "2400px top";

// PHASE 2: DOORS (2400 -> 3400)
const DOORS_START = "3000px top";
const DOORS_END = "3800px top";

// PHASE 3: FADE TO WHITE (3400 -> 4000)
const FADE_TO_WHITE_START = "3400px top";
const FADE_TO_WHITE_END = "4500px top";

// ==============================================

const ScrollMeter = () => {
    const [metrics, setMetrics] = useState({ percent: 0, pixels: 0 });
    const [fps, setFps] = useState(0);
    const [loadTime, setLoadTime] = useState(null);

    // Scroll metrics
    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.scrollY;
            let percent = total > 0 ? (current / total) * 100 : 0;
            setMetrics({ percent: Math.round(Math.max(0, Math.min(percent, 100))), pixels: Math.round(current) });
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Approximate page load time (seconds since navigation start when this mounts)
    useEffect(() => {
        try {
            const timing = performance.timing;
            if (timing && timing.navigationStart) {
                const now = Date.now();
                const loadSeconds = (now - timing.navigationStart) / 1000;
                setLoadTime(loadSeconds);
            } else if (performance.timeOrigin) {
                const loadSeconds = (performance.now()) / 1000;
                setLoadTime(loadSeconds);
            }
        } catch {
            setLoadTime(null);
        }
    }, []);

    // FPS counter
    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        let lastFpsUpdate = lastTime;
        let rafId;

        const loop = (time) => {
            frameCount += 1;
            const delta = time - lastFpsUpdate;
            if (delta >= 1000) {
                const currentFps = (frameCount * 1000) / delta;
                setFps(Math.round(currentFps));
                frameCount = 0;
                lastFpsUpdate = time;
            }
            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 9999,
                backgroundColor: 'rgba(0,0,0,0.85)',
                color: '#00FF00',
                padding: '10px 15px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                fontSize: '14px',
                pointerEvents: 'none',
                whiteSpace: 'pre',
            }}
        >
            SCROLL: {metrics.percent}%{"\n"}
            PIXELS: {metrics.pixels}px{"\n"}
            LOAD: {loadTime != null ? loadTime.toFixed(2) : '...'}s{"\n"}
            FPS: {fps || '...'}
        </div>
    );
};

const NavBar = ({ onOpenInquire }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef(null);
    const toggleMobile = () => setMobileOpen((prev) => !prev);

    // Mobile only: close menu when clicking outside it
    useEffect(() => {
        if (!mobileOpen) return;
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setMobileOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [mobileOpen]);

    return (
        <>
            <nav ref={navRef} className="fixed top-0 left-0 w-full z-[1000] bg-paper/90 backdrop-blur border-b border-stone-light/60">
                <div className="w-full max-w-[min(1440px,100%)] mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="font-serif text-xl md:text-2xl text-charcoal uppercase tracking-[0.18em]">
                            <a href="/le-baron2/#santos-site">
                                <span className="md:hidden">T.I.</span>
                                <span className="hidden md:inline">Trophée Immobilier</span>
                            </a>
                        </h2>
                    </div>

                    {/* Desktop nav */}
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

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        className="md:hidden ml-auto flex flex-col justify-between w-7 h-5 cursor-pointer bg-transparent border-none p-0"
                        aria-label="Toggle navigation"
                        onClick={toggleMobile}
                    >
                        <span
                            className={`h-[2px] w-full bg-charcoal transition-transform duration-300 ${
                                mobileOpen ? 'translate-y-[7px] rotate-45' : ''
                            }`}
                        />
                        <span
                            className={`h-[2px] w-full bg-charcoal transition-opacity duration-300 ${
                                mobileOpen ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                        <span
                            className={`h-[2px] w-full bg-charcoal transition-transform duration-300 ${
                                mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                            }`}
                        />
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-stone-light/60 bg-paper/95 backdrop-blur">
                        <div className="px-6 py-4 space-y-3 text-[11px] uppercase tracking-[0.15em] text-stone text-right">
                            <a
                                href="/le-baron2/archive.html"
                                className="block py-1 hover:text-charcoal"
                                onClick={() => setMobileOpen(false)}
                            >
                                The Archive
                            </a>
                            <a
                                href="/le-baron2/stewardship.html"
                                className="block py-1 hover:text-charcoal"
                                onClick={() => setMobileOpen(false)}
                            >
                                The Stewardship
                            </a>
                            <button
                                type="button"
                                className="block ml-auto py-1 text-primary text-right text-[11px] uppercase tracking-[0.15em]"
                                onClick={() => {
                                    setMobileOpen(false);
                                    onOpenInquire && onOpenInquire();
                                }}
                            >
                                Inquire for Private Consultation
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

const HotelLayer = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // --- 1. WINDOW LIGHTS --- (children may be <g> or <path> depending on SVG export)
            const windows = "#windowLights > *";
            gsap.set("#windowLights", { display: "block" });
            gsap.set(windows, { opacity: 0 });

            gsap.to(windows, {
                opacity: 0.8,
                ease: "none",
                duration: 0.05,
                stagger: { amount: 5, from: "random" },
                scrollTrigger: {
                    trigger: "body",
                    start: HOTEL_LIGHTS_START,
                    end: FURNITURE_START,
                    scrub: 1
                }
            });

            // --- 2. FURNITURE TIMELINE ---
            const furnitureTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: FURNITURE_START,
                    end: FURNITURE_END,
                    scrub: true
                }
            });

            const group1_Parasols = ["#TwoLeftParasol", "#OneLeftParasol", "#TwoRightParasol", "#OneRightParasol"];
            const group2_Tables = ["#TwoLeftTableChair", "#OneLeftTableChair", "#TwoRightTableChair", "#OneRightTableChair"];
            const group3_Trees = ["#LeftLemonTree", "#RightLemonTree"];

            furnitureTl.from(group1_Parasols, { y: 150, opacity: 0, duration: 1, ease: "power2.out" });
            furnitureTl.from(group2_Tables, { y: 150, opacity: 0, duration: 1, ease: "power2.out" });
            furnitureTl.from(group3_Trees, { y: 150, opacity: 0, duration: 1, ease: "power2.out" });

            // --- 3. DOOR TIMELINE ---
            const doorTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: DOORS_START,
                    end: DOORS_END,
                    scrub: true
                }
            });

            const leftDoors = ["#onedoor-L-container", "#twodoor-L-container", "#threedoor-L-container"];
            const rightDoors = ["#onedoor-R-container", "#twodoor-R-container", "#threedoor-R-container"];

            // Door lights: fade in as doors open, fade out when scrolling back (luxurious opacity tied to scroll)
            doorTl.set("#DoorLights", { display: "block", opacity: 0 }, 0);
            doorTl.to("#DoorLights", { opacity: 1, duration: 0.55, ease: "sine.inOut" }, 0);
            doorTl.to(leftDoors, { scaleX: -1, transformOrigin: "left center", ease: "none" }, 0);
            doorTl.to(rightDoors, { scaleX: -1, transformOrigin: "right center", ease: "none" }, 0);

            // --- 4. WHITE SCREEN FADE IN ---
            gsap.fromTo("#white-overlay",
                { opacity: 0 },
                {
                    opacity: 1,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: "body",
                        start: FADE_TO_WHITE_START,
                        end: FADE_TO_WHITE_END,
                        scrub: true
                    }
                }
            );

            // --- 5. HERO TEXT FADE OUT TOWARD END OF WHITE PHASE ---
            // Keep the \"Le Baron / OPENING 2029\" title fully visible through most of the white overlay,
            // then fade it out over the latter part of the same scroll band used for the white screen.
            gsap.to("#white-overlay-text", {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    // Delay the fade a bit further while keeping a similar span
                    start: "4300px top",
                    end: "5500px top",
                    scrub: true
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{
            position: 'fixed',

            /* 🔴 1. ANCHOR TO BOTTOM */
            bottom: 0,
            left: 0,
            width: '100%',

            /* 🔴 2. LOCK TO SMALL HEIGHT (No growing, no shrinking) */
            height: '100svh',

            /* 🔴 3. ALIGN TO BOTTOM */
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',

            zIndex: 1,
            pointerEvents: 'none'
        }}>

            {/* HOTEL ILLUSTRATION */}
            <HotelVector
                className="hotel-vector"
                style={{
                    // Limit width so it never grows beyond design intent
                    maxWidth: '1600px',
                    // Never let the building be taller than the viewport
                    maxHeight: '95svh',
                    // Maintain aspect ratio
                    height: 'auto',
                    width: 'auto',
                    // Layout / centering
                    display: 'block',
                    margin: '0 auto',
                }}
            />

            {/* WHITE OVERLAY SCREEN */}
            <div id="white-overlay" style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100svh',
                backgroundColor: '#f1f0ea',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10,
                opacity: 0
            }}>
                <div id="white-overlay-text" style={{ textAlign: 'center', color: 'black' }}>
                    <h1 style={{
                        fontFamily: '"Times New Roman", serif',
                        fontSize: '4rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        margin: 0
                    }}>
                        Le Baron
                    </h1>
                    <p style={{
                        fontFamily: 'sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.4em',
                        marginTop: '20px',
                        color: '#999999'
                    }}>
                        OPENING 2029
                    </p>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [isInquireOpen, setIsInquireOpen] = useState(false);
    const [inquireName, setInquireName] = useState('');
    const [inquireEmail, setInquireEmail] = useState('');
    const [inquireCompany, setInquireCompany] = useState('');
    const [inquireSubmitting, setInquireSubmitting] = useState(false);
    const [inquireMessage, setInquireMessage] = useState(null); // { type: 'success'|'error', text }
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
                setInquireMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
                return;
            }
            setInquireMessage({ type: 'success', text: 'Request received. We’ll be in touch.' });
            setTimeout(closeInquire, 1200);
        } catch {
            setInquireMessage({ type: 'error', text: 'Network error. Please try again.' });
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
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.06 }
        );
    }, [isInquireOpen]);

    return (
        <div id="main-container" style={{ minHeight: '100svh', width: '100%', position: 'relative' }}>
            <NavBar onOpenInquire={openInquire} />
            <SkyBackground start={SKY_START} end={SKY_END} />
            {/* Debug widget (scroll / pixels / load / fps) retained for quick reactivation */}
            {/* <ScrollMeter /> */}
            <HotelLayer />

            {/* JEEP CONTAINER */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <Rangerover />
            </div>

            {/* Santos Registry website content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 20,
                    marginTop: '5svh',
                }}
            >
                <SantosSite onOpenInquire={openInquire} />
            </div>

            {isInquireOpen && (
                <div
                    ref={inquireOverlayRef}
                    className="fixed inset-0 z-[1100] bg-charcoal/40 backdrop-blur-sm flex items-end md:items-center justify-center"
                >
                    <div
                        ref={inquirePanelRef}
                        className="bg-paper text-charcoal w-full md:max-w-2xl max-h-[90svh] rounded-t-md md:rounded-md shadow-2xl overflow-y-auto"
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

export default App;
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
    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.scrollY;
            let percent = total > 0 ? (current / total) * 100 : 0;
            setMetrics({ percent: Math.round(Math.max(0, Math.min(percent, 100))), pixels: Math.round(current) });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div style={{
            position: 'fixed', top: 20, right: 20, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.85)', color: '#00FF00',
            padding: '10px 15px', borderRadius: '6px', fontFamily: 'monospace',
            fontWeight: 'bold', fontSize: '14px', pointerEvents: 'none', whiteSpace: 'pre'
        }}>
            SCROLL: {metrics.percent}%{"\n"}PIXELS: {metrics.pixels}px
        </div>
    );
};

const NavBar = ({ onOpenInquire }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-[1000] bg-paper/90 backdrop-blur border-b border-stone-light/60">
            <div className="w-full max-w-[min(1440px,100%)] mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className="font-serif text-xl md:text-2xl text-charcoal uppercase tracking-[0.18em]">
                        <a href="#santos-site">Trophée Immobilier</a>
                    </h2>
                </div>
                <nav className="hidden md:flex gap-8 items-baseline ml-auto mr-8 text-[11px] uppercase tracking-[0.15em] text-stone leading-none">
                    <a
                        className="group relative inline-block hover:text-charcoal transition-colors leading-none"
                        href="#narrative"
                    >
                        The Archive
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                    <a
                        className="group relative inline-block hover:text-charcoal transition-colors leading-none"
                        href="#timeline"
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

const HotelLayer = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // --- 1. WINDOW LIGHTS ---
            const windows = "#windowLights > g";
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
                    /* 1. LIMIT WIDTH (Already there) */
                    maxWidth: '1600px',

                    /* 2. LIMIT HEIGHT (The Fix!) */
                    /* Never let the building be taller than 85% of the screen */
                    maxHeight: '95vh',

                    /* 3. MAINTAIN ASPECT RATIO */
                    height: 'auto',
                    width: 'auto',

                    /* 4. LAYOUT */
                    display: 'block',

                    /* 5. CENTER IT (Crucial if it shrinks) */
                    margin: '0 auto'
                }}
            />

            {/* WHITE OVERLAY SCREEN */}
            <div id="white-overlay" style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                backgroundColor: '#f1f0ea',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10,
                opacity: 0
            }}>
                <div style={{ textAlign: 'center', color: 'black' }}>
                    <h1 style={{
                        fontFamily: '"Times New Roman", serif',
                        fontSize: '4rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        margin: 0
                    }}>
                        Hotel Lisbon
                    </h1>
                    <p style={{
                        fontFamily: 'sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.4em',
                        marginTop: '20px',
                        color: '#666'
                    }}>
                        OPENING 2028
                    </p>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [isInquireOpen, setIsInquireOpen] = useState(false);
    const inquireOverlayRef = useRef(null);
    const inquirePanelRef = useRef(null);

    const openInquire = () => setIsInquireOpen(true);
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
            onComplete: () => setIsInquireOpen(false),
        });
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
        <div id="main-container" style={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
            <NavBar onOpenInquire={openInquire} />
            <SkyBackground start={SKY_START} end={SKY_END} />
            <ScrollMeter />
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
                    marginTop: '100vh',
                }}
            >
                <div className="w-full max-w-[1440px] mx-auto bg-paper">
                    <SantosSite onOpenInquire={openInquire} />
                </div>
            </div>

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

                            <form
                                className="space-y-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    closeInquire();
                                }}
                            >
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2.5 bg-transparent border border-stone-light text-charcoal text-sm focus:border-primary focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2.5 bg-transparent border border-stone-light text-charcoal text-sm focus:border-primary focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2.5 bg-transparent border border-stone-light text-charcoal text-sm focus:border-primary focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-charcoal text-paper text-xs uppercase tracking-widest hover:bg-primary transition-colors"
                                    >
                                        Request Access
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
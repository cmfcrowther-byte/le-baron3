import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContentLayer = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const staticTextRef = useRef(null);
    const wordMaskRef = useRef(null);
    const wordsRef = useRef(null);
    const phiRef = useRef(null);
    const gridRef = useRef(null);

    // HISTORY BUFFER: 41 points for the "Wake" effect
    const historyRef = useRef(new Array(41).fill(0));
    const smoothVRef = useRef(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // 1. HERO ANIMATION
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=2000",
                    pin: true,
                    scrub: 0.5,
                }
            });

            tl.to(wordsRef.current, { y: "-2em", ease: "steps(2)", duration: 2 });
            tl.add("split");
            tl.to(staticTextRef.current, { xPercent: -200, opacity: 0, ease: "power2.in", duration: 1 }, "split");
            tl.to(wordMaskRef.current, { xPercent: 200, opacity: 0, ease: "power2.in", duration: 1 }, "split");

            // 2. TRIGGERNOMETRY LAB
            let time = 0;
            const params = { velocity: 0 };
            let stopTimer = null;

            ScrollTrigger.create({
                trigger: phiRef.current,
                start: "top top",
                end: "+=2500",
                pin: true,
                onUpdate: (self) => {
                    const v = Math.abs(self.getVelocity() / 1500);
                    gsap.to(params, { velocity: v, duration: 0.2, overwrite: true, ease: "power1.out" });

                    if (stopTimer) stopTimer.kill();
                    stopTimer = gsap.delayedCall(0.1, () => {
                        gsap.to(params, { velocity: 0, duration: 0.5, ease: "power2.out" });
                    });
                }
            });

            const tick = () => {
                time += 0.05;
                const v = params.velocity;

                // Signal Smoothing
                smoothVRef.current += (v - smoothVRef.current) * 0.1;
                const smoothV = smoothVRef.current;
                const cleanV = smoothV < 0.001 ? 0 : smoothV;

                // --- A. GEODESIC WAKE (Momentum) ---
                historyRef.current.shift();
                historyRef.current.push(60 * cleanV);

                // Draw the Path
                let transD = "M 0 50";
                for (let i = 0; i < 41; i++) {
                    const x = i * 5;
                    const amplitude = historyRef.current[i];
                    const y = 50 + Math.sin(x * 0.06 + time * 1.5) * amplitude;
                    transD += ` L ${x} ${y}`;
                }
                transD += " L 400 50";

                // UPDATE ETCHED PATHS (Base + Highlight)
                gsap.set(".path-m-base", { attr: { d: transD } });
                gsap.set(".path-m-etch", { attr: { d: transD } });

                // Pilot Dot
                const dotY = 50 + Math.sin(200 * 0.06 + time * 1.5) * (60 * cleanV);
                gsap.set("#dot-m", { attr: { cx: 200, cy: dotY } });


                // --- B. HYSTERESIS LOOP (Inertia) ---
                const orbitScale = 45 * cleanV;
                if (cleanV === 0) {
                    gsap.set(".path-i", { opacity: 0 });
                    gsap.set("#dot-i", { attr: { cx: 200, cy: 50 } });
                } else {
                    const hX = 200 + Math.cos(time * 2) * (orbitScale * 2);
                    const hY = 50 + Math.sin(time * 2) * (orbitScale);
                    gsap.set(".path-i", { attr: { rx: orbitScale * 2, ry: orbitScale }, opacity: 1 });
                    gsap.set("#dot-i", { attr: { cx: hX, cy: hY } });
                }

                // --- C. ELASTIC MODULUS (Elasticity) ---
                const bowDepth = 50 + (60 * cleanV);
                const elasticD = `M 0 50 Q 200 ${bowDepth} 400 50`;

                // Update Etched Paths
                gsap.set(".path-e-base", { attr: { d: elasticD } });
                gsap.set(".path-e-etch", { attr: { d: elasticD } });
                gsap.set("#dot-e", { attr: { cx: 200, cy: bowDepth } });
            };

            gsap.ticker.add(tick);

            // 3. DASHBOARD ANIMATION
            const blocks = gsap.utils.toArray(gridRef.current.children);
            gsap.fromTo(blocks, { y: 100, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
                scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" }
            });

            return () => {
                gsap.ticker.remove(tick);
                if (stopTimer) stopTimer.kill();
            };

        }, containerRef);
        return () => ctx.revert();
    }, []);

    // --- STYLES FOR THE GLASS HUD ---
    const glassStyle = {
        background: 'linear-gradient(135deg, rgba(241,240,234,0.7) 0%, rgba(241,240,234,0.2) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(241,240,234,0.8)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        gap: '0', // No gap, using borders for dividers
        position: 'relative',
        overflow: 'hidden' // Clip the inner grid
    };

    const monoLabel = {
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: '10px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: '#999999', // brand-muted
        fontWeight: 'bold'
    };

    return (
        <div ref={containerRef} style={{ position: 'relative', zIndex: 10, backgroundColor: '#f1f0ea', width: '100%', overflow: 'hidden' }}>

            {/* HERO */}
            <div ref={heroRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f0ea' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <h2 ref={staticTextRef} style={{ fontSize: '40px', fontFamily: 'Georgia, serif', color: '#1a1a1a', margin: 0, textAlign: 'center', lineHeight: 1 }}>ENGINEERING</h2>
                    <div ref={wordMaskRef} style={{ fontSize: '40px', height: '1em', overflow: 'hidden', position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', lineHeight: 1 }}>
                        <div ref={wordsRef} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="word-item">MOTION</div>
                            <div className="word-item">ATTENTION</div>
                            <div className="word-item">IMMERSION</div>
                        </div>
                    </div>
                </div>
                <style>{`.word-item { font-size: 40px; font-family: Arial, sans-serif; font-weight: 900; color: #1a1a1a; margin: 0; text-align: center; line-height: 1; height: 1em; display: flex; align-items: center; justify-content: center; }`}</style>
            </div>

            {/* SCIENCE LAB (THE GLASS HUD) */}
            <div ref={phiRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 5vw', backgroundColor: '#f1f0ea' }}>

                <div style={{ marginBottom: '50px', textAlign: 'center', maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '3rem', fontFamily: 'Georgia, serif', color: '#1a1a1a', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.1 }}>Form follows physics.</h2>
                    <p style={{ fontSize: '1.2rem', color: '#999999', fontFamily: 'Georgia, serif', lineHeight: 1.7 }}>We design digital environments that respect momentum, weight, and inertia. It doesn't just look real. It feels real.</p>
                </div>

                <div style={glassStyle}>
                    {/* Background Grid (Etched into Glass) */}
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none', backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

                    {/* GLOBAL METADATA */}
                    <div style={{ position: 'absolute', top: '15px', left: '20px', ...monoLabel }}>SYS_STATUS: ACTIVE</div>
                    <div style={{ position: 'absolute', bottom: '15px', right: '20px', ...monoLabel }}>REF_FRAME: 400px/s</div>

                    {/* GRAPH 1: MOMENTUM */}
                    <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.05)', paddingRight: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={monoLabel}>GEODESIC.history</span>
                            <span style={{ ...monoLabel, opacity: 0.4 }}>MOMENTUM</span>
                        </div>
                        <svg viewBox="0 0 400 100" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                            {/* Zero Line */}
                            <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

                            {/* Etched Path (Highlight shifted down-right) */}
                            <path className="path-m-etch" d="M 0 50" fill="none" stroke="#f1f0ea" strokeWidth="2.5" opacity="0.5" style={{ transform: 'translate(0.5px, 1px)' }} />
                            {/* Base Path (Dark) */}
                            <path className="path-m-base" d="M 0 50" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />

                            {/* Glowing Active Dot */}
                            <circle id="dot-m" r="3.5" fill="#FF4500" style={{ filter: 'drop-shadow(0 0 6px #FF4500)' }} />
                        </svg>
                    </div>

                    {/* GRAPH 2: INERTIA */}
                    <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.05)', padding: '0 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={monoLabel}>HYSTERESIS.loop</span>
                            <span style={{ ...monoLabel, opacity: 0.4 }}>INERTIA</span>
                        </div>
                        <svg viewBox="0 0 400 100" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                            <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

                            <ellipse className="path-i" cx="200" cy="50" rx="0" ry="0" fill="none" stroke="#1a1a1a" strokeWidth="1.2" strokeDasharray="4 2" />
                            <circle id="dot-i" r="3.5" fill="#FF4500" style={{ filter: 'drop-shadow(0 0 6px #FF4500)' }} />
                        </svg>
                    </div>

                    {/* GRAPH 3: ELASTICITY */}
                    <div style={{ flex: 1, paddingLeft: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={monoLabel}>MODULUS.tension</span>
                            <span style={{ ...monoLabel, opacity: 0.4 }}>ELASTICITY</span>
                        </div>
                        <svg viewBox="0 0 400 100" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                            <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

                            {/* Etched Path */}
                            <path className="path-e-etch" d="M 0 50" fill="none" stroke="#f1f0ea" strokeWidth="2.5" opacity="0.5" style={{ transform: 'translate(0.5px, 1px)' }} />
                            <path className="path-e-base" d="M 0 50" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />

                            <circle id="dot-e" r="3.5" fill="#FF4500" style={{ filter: 'drop-shadow(0 0 6px #FF4500)' }} />
                        </svg>
                    </div>

                </div>
            </div>

            {/* DASHBOARD */}
            <div style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
                    <div>
                        <div style={{ height: '150px', background: '#f1f0ea', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                            <span style={{ color: '#999999' }}>SPEED.svg</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Velocity</h3>
                        <p style={{ color: '#999999', lineHeight: 1.6 }}>No video files. No bloat. Just pure, weightless code that loads instantly.</p>
                    </div>
                    <div>
                        <div style={{ height: '150px', background: '#f1f0ea', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                            <span style={{ color: '#999999' }}>SEO.svg</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Visibility</h3>
                        <p style={{ color: '#999999', lineHeight: 1.6 }}>Google reads every word. High-performance SEO that doesn't sacrifice style.</p>
                    </div>
                    <div>
                        <div style={{ height: '150px', background: '#f1f0ea', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                            <span style={{ color: '#999999' }}>DEVICE.svg</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Fluency</h3>
                        <p style={{ color: '#999999', lineHeight: 1.6 }}>One fluid experience across every device. From 27-inch iMacs to 5-inch screens.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentLayer;
import React, { useEffect, useRef } from 'react';
import { windowsSVG } from './windows-art';
import hotelBg from './hotel-facade.png';

const Windows = () => {
    const containerRef = useRef(null);
    const pinRef = useRef(null);
    const lightsRef = useRef(null);

    useEffect(() => {
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        if (!gsap || !ScrollTrigger) return;

        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0,              // Instant snap
                pin: pinRef.current,
                markers: false
            }
        });

        // --- THE "98% SNAP" TIMELINE ---

        // 1. Start: Lights OFF
        tl.set(lightsRef.current, { opacity: 0 });

        // 2. Wait: Keep OFF for the first 98%
        tl.to({}, { duration: 0.98 });

        // 3. SNAP: Turn Lights ON
        tl.set(lightsRef.current, { opacity: 1 });

        // 4. Hold: Keep them ON for the final tiny 2%
        tl.to({}, { duration: 0.02 });

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                height: '300vh',
                backgroundColor: 'transparent',
                position: 'relative',
                zIndex: 1
            }}
        >
            <div
                ref={pinRef}
                style={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* 👇 SCALING WRAPPER 
                   We wrap both layers here and scale them by 0.8 (80%).
                   This keeps them locked together perfectly.
                */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'scale(0.8)' // <--- REDUCES SIZE BY 20%
                }}>

                    {/* HOTEL IMAGE */}
                    <img
                        src={hotelBg}
                        alt="Hotel"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            zIndex: 1
                        }}
                    />

                    {/* LIGHTS LAYER */}
                    <div
                        ref={lightsRef}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            zIndex: 10,
                            mixBlendMode: 'multiply',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        dangerouslySetInnerHTML={{ __html: windowsSVG }}
                    />
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: 20, width: '100%', textAlign: 'center', opacity: 0.5, fontFamily: 'monospace' }}>
                SCROLL TO BOTTOM TO LIGHT UP
            </div>
        </div>
    );
};

export default Windows;
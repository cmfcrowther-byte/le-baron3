import React, { useEffect, useRef } from 'react';
import { walkingmanSVG } from './walkingman-art';

const Walkingman = () => {
    const containerRef = useRef(null);
    const frameRef = useRef(1);
    const timeRef = useRef(0);
    const dirRef = useRef(1); // 1 = Forward, -1 = Backward

    // 1. UNIFIED ENGINE (PING PONG CYCLE)
    useEffect(() => {
        let requestID;

        // A. SETUP (Hide everything except the first frame initially)
        if (containerRef.current) {
            const svg = containerRef.current.querySelector('svg');
            if (svg) {
                svg.removeAttribute('width');
                svg.removeAttribute('height');
                svg.style.overflow = 'visible';

                // --- FIX: BETTER FRAME DETECTION ---
                // 1. Get all direct children that are Groups (<g>)
                let layers = Array.from(svg.children).filter(el => el.tagName === 'g');

                // 2. SAFETY CHECK: If we only found ONE group, the frames are hidden inside it.
                // (Inkscape often wraps everything in one "Layer 1" folder)
                if (layers.length === 1) {
                    layers = Array.from(layers[0].children).filter(el => el.tagName === 'g');
                }

                // 3. Hide all except the first one
                layers.forEach((group, index) => {
                    group.style.display = (index === 0) ? 'block' : 'none';
                });
            }
        }

        // B. ANIMATION LOOP
        const animate = (time) => {
            // CHANGE '85' TO A LOWER NUMBER for faster...
            if (time - timeRef.current > 75) {
                if (containerRef.current) {
                    const svg = containerRef.current.querySelector('svg');

                    if (svg) {
                        // --- RE-SELECT FRAMES (Must match setup logic) ---
                        let layers = Array.from(svg.children).filter(el => el.tagName === 'g');
                        if (layers.length === 1) {
                            layers = Array.from(layers[0].children).filter(el => el.tagName === 'g');
                        }

                        if (layers.length > 0) {

                            // --- YOUR PING PONG LOGIC (UNTOUCHED) ---

                            let next = frameRef.current + dirRef.current;

                            if (next >= layers.length) {
                                next = layers.length;
                                dirRef.current = -1;
                            }
                            else if (next <= 1) {
                                next = 1;
                                dirRef.current = 1;
                            }

                            frameRef.current = next;

                            // --- END PING PONG LOGIC ---

                            // Update Display (Using Index, NOT Names)
                            layers.forEach((el, index) => {
                                if (index + 1 === frameRef.current) {
                                    el.style.display = 'block';
                                } else {
                                    el.style.display = 'none';
                                }
                            });
                        }
                    }
                }
                timeRef.current = time;
            }
            requestID = requestAnimationFrame(animate);
        };

        requestID = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestID);
    }, []);

    // 2. DRIVING PATH (GSAP)
    useEffect(() => {
        if (containerRef.current && window.gsap) {
            const tl = window.gsap.timeline({ repeat: -1 });

            tl.fromTo(containerRef.current,
                {
                    x: '-200px',
                    y: '75vh',
                    opacity: 1,
                    scaleX: 1
                },
                {
                    x: '110vw',
                    y: '65vh',
                    opacity: 1,
                    duration: 25,
                    ease: "none"
                }
            );
            return () => tl.kill();
        }
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '320px',
                zIndex: 9996,
                pointerEvents: 'none',
            }}
            dangerouslySetInnerHTML={{ __html: walkingmanSVG }}
        />
    );
};

export default Walkingman;
import React, { useEffect, useRef } from 'react';
import CarSvg from './car.svg?react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Rangerover = () => {
    const carRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        // 1. SHARED SETUP (Assets & Helpers)
        // ------------------------------------------------
        const wheels = gsap.utils.toArray("[id*='wheel-']");
        wheels.sort((a, b) => (a.id > b.id) ? 1 : -1);
        wheels.forEach(w => w.style.display = 'none');
        if (wheels.length > 0) wheels[0].style.display = 'block';

        const headlights = gsap.utils.selector(carRef.current)("#headlight-beam");
        const svgElement = carRef.current.querySelector("svg");

        gsap.set(headlights, { opacity: 0 });

        // Helper: Spin Wheels
        const spinWheels = (duration) => {
            if (wheels.length === 0) return;
            const proxy = { frame: 0 };
            gsap.to(proxy, {
                frame: wheels.length * 20,
                duration: duration,
                ease: "none",
                onUpdate: () => {
                    const index = Math.floor(proxy.frame) % wheels.length;
                    wheels.forEach((w, i) => {
                        w.style.display = (i === index) ? 'block' : 'none';
                    });
                }
            });
        };

        // Helper: Bounce Car
        const bounceCar = (duration) => {
            gsap.fromTo(svgElement,
                { y: 0 },
                {
                    y: 4,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    duration: 0.15
                }
            );
            gsap.delayedCall(duration, () => {
                gsap.killTweensOf(svgElement);
                gsap.to(svgElement, { y: 0, duration: 0.2 });
            });
        };


        // 2. DESKTOP LOGIC (Min-Width: 769px)
        // ------------------------------------------------
        // (Standard Behavior: Parked -> Drive Away -> Return)
        mm.add("(min-width: 769px)", () => {

            gsap.set(carRef.current, { x: 0 }); // Start Parked

            ScrollTrigger.create({
                trigger: trackRef.current,
                start: "650px top",

                onEnter: () => {
                    gsap.to(headlights, { opacity: 0.9, duration: 0.2 });
                    gsap.to(carRef.current, {
                        x: "-120vw",
                        duration: 4,
                        ease: "power1.in",
                        overwrite: true
                    });
                    spinWheels(4);
                    bounceCar(4);
                },

                onLeaveBack: () => {
                    gsap.set(carRef.current, { x: "100vw" });
                    gsap.set(headlights, { opacity: 0.9 });
                    gsap.to(carRef.current, {
                        x: 0,
                        duration: 3,
                        ease: "power2.out",
                        overwrite: true
                    });
                    gsap.to(headlights, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 3
                    });
                    spinWheels(3);
                    bounceCar(3);
                }
            });
        });


        // 3. MOBILE LOGIC (Max-Width: 768px)
        // ------------------------------------------------
        // (New Logic: Invisible -> Drive Past -> Teleport Reset)
        mm.add("(max-width: 768px)", () => {

            // Start HIDDEN off to the right
            gsap.set(carRef.current, { x: "120vw" });

            ScrollTrigger.create({
                trigger: trackRef.current,
                start: "650px top",

                // ACTION A: Drive ACROSS (Right to Left)
                onEnter: () => {
                    gsap.to(headlights, { opacity: 0.9, duration: 0.2 });

                    gsap.fromTo(carRef.current,
                        { x: "120vw" },
                        {
                            x: "-150vw",
                            duration: 5,
                            ease: "power1.inOut",
                            overwrite: true
                        }
                    );
                    spinWheels(5);
                    bounceCar(5);
                },

                // 🔴 ACTION B: INSTANT RESET (Teleport)
                // When scrolling back up, we just snap back to the start line invisibly.
                onLeaveBack: () => {
                    // 1. Kill any active driving animation immediately
                    gsap.killTweensOf(carRef.current);
                    gsap.killTweensOf(headlights);

                    // 2. Teleport back to "Waiting Room" (No animation)
                    gsap.set(carRef.current, { x: "120vw" });

                    // 3. Reset Lights
                    gsap.set(headlights, { opacity: 0 });
                }
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <>
            <div ref={carRef} style={{
                position: 'fixed',
                bottom: '2%',
                right: '5%',
                left: 'auto',
                width: '450px',
                zIndex: 100,
                pointerEvents: 'none'
            }}>
                <CarSvg style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            <div ref={trackRef} style={{
                width: '100%',
                height: '6000px',
                position: 'relative',
                zIndex: -1,
            }}>
            </div>
        </>
    );
};

export default Rangerover;
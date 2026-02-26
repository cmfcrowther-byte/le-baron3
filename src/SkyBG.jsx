import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Sky = (props) => {
    const skyRef = useRef(null);
    const startPoint = props.start || "top top";
    const endPoint = props.end || "bottom bottom";

    useEffect(() => {
        const ctx = gsap.context(() => {
            console.log("SKY ORDERS RECEIVED:", startPoint, endPoint);

            gsap.fromTo(skyRef.current,
                { backgroundColor: "#f1f0eaff" }, // Day (brand-paper)
                {
                    backgroundColor: "#00091dd4", // Night (brand-midnight with alpha)
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: startPoint,
                        end: endPoint,
                        scrub: 1
                    }
                }
            );
        });
        return () => ctx.revert();
    }, [startPoint, endPoint]);

    return (
        <div ref={skyRef} style={{
            position: 'fixed', top: 0, left: 0, width: '100%',

            /* 🔴 FIXED: Oversize the sky so it never reveals white gaps */
            height: '120vh',

            zIndex: 0, pointerEvents: 'none', backgroundColor: "#f1f0eaff"
        }} />
    );
};

export default Sky;
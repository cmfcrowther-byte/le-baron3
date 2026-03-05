import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LisboaMap from './Lisboa-SuperLight.svg?react';
import facadeDesaturated from './facade-desaturated.jpeg';

gsap.registerPlugin(ScrollTrigger);

function SantosSite({ onOpenInquire }) {
    const mapRef = useRef(null);

    // When map enters view: cascade cartouche labels (reverse order); each cartouche appears with text already there
    useLayoutEffect(() => {
        let st;
        let stAll;
        const run = () => {
            const container = mapRef.current;
            if (!container) return;
            const svgEl = container.querySelector('svg');
            const labelsGroup = svgEl?.querySelector('#g11647') ?? document.getElementById('g11647');
            if (!labelsGroup || !container.contains(labelsGroup)) return;

            labelsGroup.style.display = 'inline';

            const childGroups = Array.from(labelsGroup.children).filter((el) => el.tagName === 'g');
            if (!childGroups.length) return;

            childGroups.forEach((g) => {
                g.style.opacity = '0';
            });

            const ordered = [...childGroups].reverse();
            const cartoucheFadeDuration = 0.65;
            const staggerDelay = 0.85;
            const santosLabel = svgEl?.querySelector('#santosOvelhoLABEL') ?? document.getElementById('santosOvelhoLABEL');
            const leBaronLogo = svgEl?.querySelector('#LeBaronLogoGroup') ?? document.getElementById('LeBaronLogoGroup');

            const showAllLabels = () => {
                ordered.forEach((g) => {
                    g.style.opacity = '1';
                });
                if (santosLabel) {
                    santosLabel.style.display = 'block';
                    gsap.set(santosLabel, { xPercent: 0 });
                }
                if (leBaronLogo) {
                    leBaronLogo.style.display = 'block';
                    gsap.set(leBaronLogo, { opacity: 1 });
                }
            };

            st = ScrollTrigger.create({
                trigger: '#map',
                start: 'top 82%',
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();
                    ordered.forEach((group, i) => {
                        const start = i * staggerDelay;
                        tl.to(group, { opacity: 1, duration: cartoucheFadeDuration }, start);
                    });
                    const cascadeEnd = (ordered.length - 1) * staggerDelay + cartoucheFadeDuration;
                    if (santosLabel) {
                        tl.set(santosLabel, { display: 'block', xPercent: 100 }, cascadeEnd);
                        tl.to(santosLabel, { xPercent: 0, duration: 0.7, ease: 'power2.out' }, cascadeEnd);
                    }
                    if (leBaronLogo) {
                        tl.set(leBaronLogo, { display: 'block', opacity: 0 }, cascadeEnd + 0.7);
                        tl.to(leBaronLogo, { opacity: 1, duration: 1.8, ease: 'power1.inOut' }, cascadeEnd + 0.7);
                    }
                },
            });

            // Safety net: if the user scrolls past the map quickly, force all labels/cartouches fully visible
            stAll = ScrollTrigger.create({
                trigger: '#map',
                start: 'bottom 20%',
                once: true,
                onEnter: showAllLabels,
            });
        };

        const id = requestAnimationFrame(() => run());
        return () => {
            cancelAnimationFrame(id);
            if (st) st.kill();
            if (stAll) stAll.kill();
        };
    }, []);

    // Subtle, continuous water movement: dash offset loops left-to-right with no visible jumps
    useLayoutEffect(() => {
        const container = mapRef.current;
        if (!container) return;
        const svgEl = container.querySelector('svg');
        if (!svgEl) return;

        const waterGroup = svgEl.querySelector('#g12237');
        if (!waterGroup) return;

        const waterPaths = Array.from(waterGroup.querySelectorAll('path'));
        if (!waterPaths.length) return;

        const tweens = waterPaths.map((path, index) => {
            const style = window.getComputedStyle(path);
            const dashArrayStr = style.strokeDasharray;
            let period = 4;
            if (dashArrayStr && dashArrayStr !== 'none') {
                const parts = dashArrayStr
                    .split(',')
                    .map((p) => parseFloat(p.trim()))
                    .filter((n) => Number.isFinite(n) && n > 0);
                if (parts.length) {
                    period = parts.reduce((a, b) => a + b, 0);
                }
            }

            // Animate strokeDashoffset over exactly one dash period so it tiles seamlessly
            return gsap.fromTo(
                path,
                { strokeDashoffset: 0 },
                {
                    strokeDashoffset: -period,
                    duration: 3,
                    repeat: -1,
                    ease: 'none',
                    delay: index * 0.4,
                }
            );
        });

        return () => {
            tweens.forEach((tween) => tween.kill());
        };
    }, []);

    // Mobile-only: pin the map section and pan horizontally to reveal more of the right-hand side
    useLayoutEffect(() => {
        const container = mapRef.current;
        if (!container) return;
        const svgEl = container.querySelector('svg');
        if (!svgEl) return;

        // Only run this pinning behaviour on narrow (mobile) viewports
        if (window.innerWidth > 768) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#map',
                start: 'top 30%',
                end: '+=800',
                scrub: true,
                pin: '#map',
                anticipatePin: 1,
            },
        });

        // Start by showing more of the LEFT side (xPercent: 25),
        // then pan to the RIGHT (xPercent: -40) as the user scrolls,
        // revealing slightly less of the right-hand portion than before.
        tl.fromTo(svgEl, { xPercent: 25 }, { xPercent: -40, ease: 'none' });

        return () => {
            tl.scrollTrigger && tl.scrollTrigger.kill();
            tl.kill();
        };
    }, []);

    // Fade in the strategic tagline as it scrolls into view
    useLayoutEffect(() => {
        const el = document.getElementById('narrative-tagline');
        if (!el) return;

        gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    // Fade in each investment timeline section as it scrolls into view (same style as tagline)
    useLayoutEffect(() => {
        const items = document.querySelectorAll('.timeline-reveal');
        if (!items.length) return;

        const tweens = [];
        items.forEach((el) => {
            gsap.set(el, { opacity: 0, y: 24 });
            const tween = gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
            tweens.push(tween);
        });

        return () => {
            tweens.forEach((t) => {
                t.scrollTrigger?.kill();
                t.kill();
            });
        };
    }, []);

    return (
        <div
            id="santos-site"
            className="bg-paper text-charcoal font-display antialiased w-full"
            style={{
                backgroundColor: '#f1f0ea',
                color: '#1A1A1A',
                fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: 15,
                lineHeight: 1.8,
                fontWeight: 400,
                boxSizing: 'border-box',
            }}
        >
            {/* MAIN CONTENT */}
            <main className="w-full max-w-[min(1440px,100%)] mx-auto bg-paper">
                {/* STRATEGIC NARRATIVE */}
                <section className="pt-[12rem] pb-24 px-8 md:px-16" id="narrative">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <header className="space-y-4 text-left">
                            <span className="copy-eyebrow flex items-center gap-4">
                                The Strategic Narrative <span className="h-[1px] w-12 bg-stone-light/40" />
                            </span>
                            <h2 className="copy-section-title">
                                Asset Strategy · Phased Value Creation
                            </h2>
                            <p className="copy-body">
                                We are deploying a dual-asset strategy to anchor the district: first, by establishing a cultural
                                epicenter, and second, by restoring a heritage landmark.
                            </p>
                            <p className="copy-body">
                                This sequencing mitigates the traditional ramp-up risk associated with hospitality developments by
                                activating the membership base and revenue stream immediately. The result is a pre-conditioned
                                market and captive occupancy demand established prior to the Hotel&apos;s delivery.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-[7rem]">
                            {/* Phase I */}
                            <article className="space-y-4 scroll-mt-28" id="prologue">
                                <div className="space-y-3">
                                    <span className="copy-eyebrow flex items-center gap-4">
                                        Phase I <span className="h-[1px] w-12 bg-stone-light/40" />
                                    </span>
                                    <h3 className="copy-title-md">
                                        The Private Maison
                                    </h3>
                                    <p className="copy-caption">Operational 2026</p>
                                </div>
                                <p className="copy-body">
                                    An intimate flagship townhouse serving as the project&apos;s cultural anchor. Before the
                                    hotel&apos;s inauguration, this venue operates as a private members&apos; salon—establishing
                                    the brand&apos;s exclusivity and defining the district&apos;s new social hierarchy.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex gap-2">
                                        <span className="text-primary mt-[2px]">•</span>
                                        <span className="copy-list">
                                            <span className="font-semibold text-charcoal">Status:</span> In Development
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-primary mt-[2px]">•</span>
                                        <span className="copy-list">
                                            <span className="font-semibold text-charcoal">Role:</span> Brand Equity &amp;
                                            Cash Flow
                                        </span>
                                    </li>
                                </ul>
                            </article>

                            {/* Phase II */}
                            <article className="space-y-4 scroll-mt-28" id="riverside">
                                <div className="space-y-3">
                                    <span className="copy-eyebrow flex items-center gap-4">
                                        Phase II <span className="h-[1px] w-12 bg-stone-light/40" />
                                    </span>
                                    <h3 className="copy-title-md">
                                        The Heritage Landmark
                                    </h3>
                                    <p className="copy-caption">Completing 2029</p>
                                </div>
                                <p className="copy-body">
                                    The meticulous restoration of a grand 19th-century palace fronting the Tagus River. Anchored
                                    by 27 suites and extensive private gardens, this asset scales the Maison&apos;s intimacy into a
                                    permanent, trophy hospitality destination.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex gap-2">
                                        <span className="text-primary mt-[2px]">•</span>
                                        <span className="copy-list">
                                            <span className="font-semibold text-charcoal">Status:</span> Architectural
                                            Planning
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-primary mt-[2px]">•</span>
                                        <span className="copy-list">
                                            <span className="font-semibold text-charcoal">Role:</span> Asset Value &amp;
                                            Legacy
                                        </span>
                                    </li>
                                </ul>
                            </article>
                        </div>

                        <div className="pt-16 md:pt-[10.5rem] pb-16">
                            <h3 id="narrative-tagline" className="copy-tagline mb-12">
                                One Philosophy. Two Scales. The Townhouse establishes the pulse; the Landmark secures the
                                legacy.
                            </h3>
                        </div>
                    </div>
                </section>
                
                {/* MAP / ENCLAVE SECTION */}
                <section className="relative bg-paper pt-4 pb-8 md:pt-8 md:pb-12" id="map">
                    <div ref={mapRef} className="w-full min-w-0 overflow-visible" id="enclave-svg-container">
                        <div className="mx-auto w-full max-w-5xl flex justify-center">
                            <LisboaMap
                                className="w-full h-auto block origin-center scale-[2] md:scale-[1.25] object-contain"
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto px-8 md:px-12 pt-[32vh] pb-12 md:py-16">
                        <span className="copy-eyebrow flex items-center gap-4 mb-4">
                            The Location <span className="h-[1px] w-12 bg-stone-light/40" />
                        </span>
                        <h2 className="copy-section-title mb-2">The Enclave</h2>
                        <p className="copy-body-muted mb-6">
                            Lisbon&apos;s seat of long-term capital preservation.
                        </p>
                        <div className="w-12 h-[1px] bg-primary mb-6" />
                        <p className="copy-body mb-8">
                            Originally the residential seat of 18th-century nobility, Santos-o-Velho has reclaimed its position
                            as the city&apos;s undisputed aesthetic heart. A village-scale enclave of foreign embassies and
                            galleries, the district commands the capital&apos;s highest demand while retaining a barrier to
                            entry that protects asset value.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex gap-2">
                                <span className="text-primary mt-[2px]">•</span>
                                <span className="copy-list">
                                    <span className="font-semibold text-charcoal">Proximity:</span> 2 Minutes to Riverside
                                    Promenade
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary mt-[2px]">•</span>
                                <span className="copy-list">
                                    <span className="font-semibold text-charcoal">Connectivity:</span> 20 Minutes to
                                    International Airport
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary mt-[2px]">•</span>
                                <span className="copy-list">
                                    <span className="font-semibold text-charcoal">Context:</span> The Diplomatic Quarter
                                </span>
                            </li>
                        </ul>
                        <div className="mt-12 flex gap-4 copy-label">
                            <span>Lat: 38.7046</span>
                            <span>Long: -9.1621</span>
                        </div>
                    </div>
                </section>
                
                {/* PORTFOLIO GRID */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Asset A */}
                        <div className="p-8 md:py-12 md:px-8 border-stone-light/50">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h3 className="font-serif text-2xl italic text-charcoal">The Portfolio</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-stone mt-2">
                                        Asset A: The Maison
                                    </p>
                                </div>
                                <div className="text-right text-stone/40 font-serif text-4xl opacity-20">01</div>
                            </div>

                            {/* Mobile: text in site typography, images below */}
                            <div className="block md:hidden space-y-12">
                                <div className="space-y-3">
                                    <p className="copy-caption">The Technical Envelope</p>
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">Configuration:</span> [Insert Suites] Private
                                        Suites
                                    </p>
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">The Salon:</span> A sophisticated social
                                        landscape for founding members.
                                    </p>
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">Atmosphere:</span> Polished elegance with
                                        personality. A dialogue of heavy linens, muted stone, and absolute discretion.
                                    </p>
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">The Vision.</span> A &quot;cultural
                                        heartbeat&quot; that bridges the gap between the heritage of the 18th century and the
                                        spirited exclusivity of the Le Baron legacy.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-16">
                                    <div className="col-span-1 col-start-2">
                                        <div className="aspect-square bg-stone-light/20 relative overflow-hidden rounded-sm">
                                            <img
                                                alt="Detail of beige travertine stone texture"
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0QCSmXWHvbuKpA3I9BT40cWVYiT-Gw7GEXM_i7muWDyiOihLOu54T2vbkQHkF09cOHDoO1qnzEpHPx-aVWmAa8AXgkb9g4dEDSBVbyJMO7p8qweXaMnlOoKsOdqEFGAm6BYl2LMEydJduJseg-waYuW4cN90oCZ0l3dQARWZyCrOmrHQ46xnofoPhV0HoXZ6QxyWcPGOhpnAC7swUMbrh3REz2yWA3F_jHgA4Z2t4pzjyw9EPsCz6nu7xEkjLeze4UlKDKj1fKKg"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 aspect-[2/1] bg-stone-light/20 relative overflow-hidden rounded-sm">
                                        <img
                                            alt="Abstract architectural shadow on a plaster wall"
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuByIbcGgCf2j0tAsgdsz5q5R1E065Ko4ZnqVIsjiAFHVonie-LrQ-_hWa5W42P6H9yo9eECyNkWWjevwifGQXBgWbnVSccOgpXqdzMULQZ5IhvWE28GQBldWtBnpscErZXUNsRiKBd_yz4bKL0v3mohdRRt5bxaNhtdUwaYK0B9HAx0d_TuOGfS0Q3lLjRgjhkqw44RYD_D6QOnfzyBEKfrGi5gOxCRrEIF3X5szho-_WC-CFB50IwbGxBUFw_1unvTmN9KqnhBqWU"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Desktop: original card + images */}
                            <div className="hidden md:grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-stone-light/30 rounded-sm p-5 flex flex-col space-y-2">
                                    <p className="text-[11px] text-stone leading-relaxed">The Technical Envelope</p>
                                    <p className="text-[11px] text-stone">
                                        <span className="font-semibold text-charcoal">Configuration:</span> [Insert Suites]{' '}
                                        Private Suites
                                    </p>
                                    <p className="text-[11px] text-stone">
                                        <span className="font-semibold text-charcoal">The Salon:</span> A sophisticated social
                                        landscape for founding members.
                                    </p>
                                    <p className="text-[11px] text-stone">
                                        <span className="font-semibold text-charcoal">Atmosphere:</span> Polished elegance with
                                        personality. A dialogue of heavy linens, muted stone, and absolute discretion.
                                    </p>
                                    <p className="text-[11px] text-stone leading-relaxed">
                                        <span className="font-semibold text-charcoal">The Vision.</span> An initial
                                        architectural expression of the Santos project. A &quot;cultural heartbeat&quot; that
                                        bridges the gap between the heritage of the 18th century and the spirited exclusivity of
                                        the Le Baron legacy.
                                    </p>
                                </div>

                                <div className="aspect-square bg-stone-light/20 relative overflow-hidden rounded-sm">
                                    <img
                                        alt="Detail of beige travertine stone texture"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0QCSmXWHvbuKpA3I9BT40cWVYiT-Gw7GEXM_i7muWDyiOihLOu54T2vbkQHkF09cOHDoO1qnzEpHPx-aVWmAa8AXgkb9g4dEDSBVbyJMO7p8qweXaMnlOoKsOdqEFGAm6BYl2LMEydJduJseg-waYuW4cN90oCZ0l3dQARWZyCrOmrHQ46xnofoPhV0HoXZ6QxyWcPGOhpnAC7swUMbrh3REz2yWA3F_jHgA4Z2t4pzjyw9EPsCz6nu7xEkjLeze4UlKDKj1fKKg"
                                    />
                                </div>

                                <div className="col-span-2 aspect-[2/1] bg-stone-light/20 relative overflow-hidden rounded-sm">
                                    <img
        alt="Abstract architectural shadow on a plaster wall"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuByIbcGgCf2j0tAsgdsz5q5R1E065Ko4ZnqVIsjiAFHVonie-LrQ-_hWa5W42P6H9yo9eECyNkWWjevwifGQXBgWbnVSccOgpXqdzMULQZ5IhvWE28GQBldWtBnpscErZXUNsRiKBd_yz4bKL0v3mohdRRt5bxaNhtdUwaYK0B9HAx0d_TuOGfS0Q3lLjRgjhkqw44RYD_D6QOnfzyBEKfrGi5gOxCRrEIF3X5szho-_WC-CFB50IwbGxBUFw_1unvTmN9KqnhBqWU"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Asset B */}
                        <div className="p-8 md:py-12 md:px-8">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h3 className="font-serif text-2xl italic text-charcoal">&nbsp;</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-stone mt-2">
                                        Asset B: The Hotel
                                    </p>
                                </div>
                                <div className="text-right text-stone/40 font-serif text-4xl opacity-20">02</div>
                            </div>

                            {/* Mobile: text in site typography, images below */}
                            <div className="block md:hidden space-y-12">
                                <div className="space-y-3">
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">Volume:</span> 3,200 m² Interior
                                    </p>
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">Sanctuary:</span> 600 m² Private Gardens
                                    </p>
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">Scale:</span> 3.8m Ceiling Heights (Noble Floor)
                                    </p>
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">Capacity:</span> 27 Heritage Suites with
                                        panoramic Tagus views
                                    </p>
                                    <p className="copy-body">
                                        <span className="font-semibold text-charcoal">The Vision.</span> A rare &quot;Trophy Asset&quot;.
                                        One of the last remaining riverside palaces in Lisbon, offering an unmatched combination of
                                        historical fabric and private green space—a structural finiteness that new developments cannot
                                        replicate.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-16">
                                    <div className="col-span-1 col-start-2">
                                        <div className="aspect-square bg-stone-light/20 relative overflow-hidden rounded-sm">
                                            <img
                                                alt="Detail of window frame shadow on floor"
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRjOmXNW060wa7Y9wjM2aeWNIZJjhfGjsSyDJ6EBTomJqz7rrwhj1BicKA9ATrqB3zDu7b8jZfyS2zIdW2EXvaAh4ZlD-KOiSZDx1X1FoOXys88VVtB_QbW_EPmpmPu9bnKiJKnaineYSPE62a80mm0IqeQpK4yYoTC7orWkILO0xWWqz2RxJSs9wZNkVe2LyHY9fOoy2ruR6SOKj7ge2-ndYD4g-sp_9yCMBo8QS2wbBh4NwCJmngjWRRQBDQKXQWVD-fhy2iOS0"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 aspect-[2/1] bg-stone-light/20 relative overflow-hidden rounded-sm">
                                        <img
                                            alt="Minimalist architectural staircase detail"
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiCAmSaTd0AwXQVwvVfieJYMxkJ0n4fhTzfYj7fD7BpNFJFHx-DKlgBo98DbqCXM8ybHhYsALxCE1S9-rUS5eICgyd4JfC-bEtiAKMPh0uwWesCiHkA4-Jtel-h6r4OUiv_WMTZl5UcJNJa8lKAkU9wy8K1_NiXyC7tfJ2KdoQDPy_quyH4m9H170wBeHXm1_uwrL9xhotigdsKL1il6ICZSligRm0bF8qD9dL1F590XjAJQNLzuMdUzShZhYS5YWXlWgyO7YmWFM"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Desktop: original card + images */}
                            <div className="hidden md:grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-stone-light/30 rounded-sm p-5 flex flex-col space-y-2">
                                    <p className="text-[11px] text-stone">
                                        <span className="font-semibold text-charcoal">Volume:</span> 3,200 m² Interior
                                    </p>
                                    <p className="text-[11px] text-stone">
                                        <span className="font-semibold text-charcoal">Sanctuary:</span> 600 m² Private Gardens
                                    </p>
                                    <p className="text-[11px] text-stone">
                                        <span className="font-semibold text-charcoal">Scale:</span> 3.8m Ceiling Heights (Noble
                                        Floor)
                                    </p>
                                    <p className="text-[11px] text-stone">
                                        <span className="font-semibold text-charcoal">Capacity:</span> 27 Heritage Suites with
                                        panoramic Tagus views
                                    </p>
                                    <p className="text-[11px] text-stone leading-relaxed">
                                        <span className="font-semibold text-charcoal">The Vision.</span> A rare &quot;Trophy
                                        Asset&quot;. One of the last remaining riverside palaces in Lisbon, offering an unmatched
                                        combination of historical fabric and private green space—a structural finiteness that new
                                        developments cannot replicate.
                                    </p>
                                </div>

                                <div className="aspect-square bg-stone-light/20 relative overflow-hidden rounded-sm">
                                    <img
                                        alt="Detail of window frame shadow on floor"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRjOmXNW060wa7Y9wjM2aeWNIZJjhfGjsSyDJ6EBTomJqz7rrwhj1BicKA9ATrqB3zDu7b8jZfyS2zIdW2EXvaAh4ZlD-KOiSZDx1X1FoOXys88VVtB_QbW_EPmpmPu9bnKiJKnaineYSPE62a80mm0IqeQpK4yYoTC7orWkILO0xWWqz2RxJSs9wZNkVe2LyHY9fOoy2ruR6SOKj7ge2-ndYD4g-sp_9yCMBo8QS2wbBh4NwCJmngjWRRQBDQKXQWVD-fhy2iOS0"
                                    />
                                </div>

                                <div className="col-span-2 aspect-[2/1] bg-stone-light/20 relative overflow-hidden rounded-sm">
                                    <img
                                        alt="Minimalist architectural staircase detail"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiCAmSaTd0AwXQVwvVfieJYMxkJ0n4fhTzfYj7fD7BpNFJFHx-DKlgBo98DbqCXM8ybHhYsALxCE1S9-rUS5eICgyd4JfC-bEtiAKMPh0uwWesCiHkA4-Jtel-h6r4OUiv_WMTZl5UcJNJa8lKAkU9wy8K1_NiXyC7tfJ2KdoQDPy_quyH4m9H170wBeHXm1_uwrL9xhotigdsKL1il6ICZSligRm0bF8qD9dL1F590XjAJQNLzuMdUzShZhYS5YWXlWgyO7YmWFM"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* HERITAGE RESTORATION */}
                <section className="mt-12 md:mt-20 pt-16 pb-20 md:pt-20 md:pb-24 px-8 md:px-20 bg-paper">
                    <div className="w-full flex justify-center">
                        {/* Mobile: full-width text/images; Desktop: constrained to 60vw */}
                        <div className="w-full md:w-[60vw] space-y-10">
                            <div className="space-y-6">
                                <span className="copy-eyebrow flex items-center gap-4">
                                    The Heritage Restoration <span className="h-[1px] w-12 bg-stone-light/40" />
                                </span>
                                <h2 className="copy-section-title">Architectural Stewardship</h2>
                                <p className="copy-body">
                                    A structurally finite 19th-century asset. Behind its classical façade lies a spatial volume
                                    unmatched in Santos-o-Velho. Our mandate is precise architectural stewardship: preserving the
                                    property&apos;s aristocratic lineage while seamlessly integrating the infrastructure of a modern,
                                    ultra-luxury destination.
                                </p>
                            </div>

                            <div className="relative overflow-hidden rounded-sm flex items-center justify-center py-8 md:py-10">
                                <img
                                    src={facadeDesaturated}
                                    alt="Desaturated façade of the restored Lisbon palace"
                                    className="w-full h-full object-contain hover:scale-[1.03] transition-transform duration-700"
                                />
                            </div>

                            <ul className="mt-4 space-y-2">
                                <li className="flex gap-2">
                                    <span className="text-primary mt-[2px]">•</span>
                                    <span className="copy-list">
                                        <span className="font-semibold text-charcoal">The Façade:</span> Preserving the original
                                        aristocratic detailing.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary mt-[2px]">•</span>
                                    <span className="copy-list">
                                        <span className="font-semibold text-charcoal">The Volume:</span> Restoring the 3.8m ceiling
                                        heights.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary mt-[2px]">•</span>
                                    <span className="copy-list">
                                        <span className="font-semibold text-charcoal">The Dialogue:</span> Strict historical
                                        preservation, modern execution.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* INVESTMENT TIMELINE */}
                <section className="px-8 pt-8 pb-24 md:px-20 md:pt-20 md:pb-20" id="timeline">
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="copy-section-title mb-4">Investment Timeline</h2>
                        <div className="w-16 h-[1px] bg-primary" />
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-stone-light -translate-x-1/2" />

                        {/* 2024 */}
                        <div className="timeline-reveal relative flex flex-col md:flex-row items-center justify-between mb-16 group">
                            <div className="md:w-1/2 md:pr-12 text-left md:text-right pl-12 md:pl-0 mb-2 md:mb-0">
                                {/* Mobile: bullet + year + phase on one row */}
                                <div className="flex items-baseline gap-3 mb-2 md:hidden">
                                    <span className="inline-block w-3 h-3 rounded-full bg-charcoal ring-4 ring-paper" />
                                    <span className="copy-timeline-year text-primary">2024</span>
                                    <span className="copy-caption">Phase I</span>
                                </div>
                                {/* Desktop: year only */}
                                <span className="copy-timeline-year text-primary hidden md:inline-block">2024</span>
                                <h4 className="copy-title-sm">Acquisition &amp; Security</h4>
                                <p className="copy-body mt-2">
                                    The cornerstone is secured. Asset-backed investment and strategic site control established.
                                </p>
                            </div>
                            {/* Desktop bullet */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-charcoal ring-4 ring-paper group-hover:scale-125 transition-transform hidden md:block" />
                            {/* Desktop phase */}
                            <div className="md:w-1/2 md:pl-12 pl-12 hidden md:block">
                                <span className="copy-caption">Phase I</span>
                            </div>
                        </div>

                        {/* 2025 */}
                        <div className="timeline-reveal relative flex flex-col md:flex-row-reverse items-center justify-between mb-16 group">
                            <div className="md:w-1/2 md:pl-12 text-left pl-12 md:pl-0 mb-2 md:mb-0">
                                {/* Mobile: bullet + year + phase on one row */}
                                <div className="flex items-baseline gap-3 mb-2 md:hidden">
                                    <span className="inline-block w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper" />
                                    <span className="copy-timeline-year text-charcoal">2025</span>
                                    <span className="copy-caption">Phase II</span>
                                </div>
                                {/* Desktop: year only */}
                                <span className="copy-timeline-year text-charcoal hidden md:inline-block">2025</span>
                                <h4 className="copy-title-sm">Architectural Refinement</h4>
                                <p className="copy-body mt-2">
                                    Finalizing the design dialogue between the heritage façade and contemporary interior volumes.
                                </p>
                            </div>
                            {/* Desktop bullet */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper group-hover:scale-125 transition-transform hidden md:block" />
                            {/* Desktop phase */}
                            <div className="md:w-1/2 md:pr-12 pl-12 text-left md:text-right hidden md:block">
                                <span className="copy-caption">Phase II</span>
                            </div>
                        </div>

                        {/* 2026 */}
                        <div className="timeline-reveal relative flex flex-col md:flex-row items-center justify-between mb-16 group">
                            <div className="md:w-1/2 md:pr-12 text-left md:text-right pl-12 md:pl-0 mb-2 md:mb-0">
                                {/* Mobile: bullet + year + phase on one row */}
                                <div className="flex items-baseline gap-3 mb-2 md:hidden">
                                    <span className="inline-block w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper" />
                                    <span className="copy-timeline-year text-primary">2026</span>
                                    <span className="copy-caption">Phase III</span>
                                </div>
                                {/* Desktop: year only */}
                                <span className="copy-timeline-year text-primary hidden md:inline-block">2026</span>
                                <h4 className="copy-title-sm text-primary">Cultural Inauguration</h4>
                                <p className="copy-body mt-2">
                                    Grand opening of The Maison. The brand begins operation, establishing the hospitality
                                    philosophy.
                                </p>
                            </div>
                            {/* Desktop bullet */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper group-hover:scale-125 transition-transform hidden md:block" />
                            {/* Desktop phase */}
                            <div className="md:w-1/2 md:pl-12 pl-12 hidden md:block">
                                <span className="copy-caption">Phase III</span>
                            </div>
                        </div>

                        {/* 2027 */}
                        <div className="timeline-reveal relative flex flex-col md:flex-row-reverse items-center justify-between mb-16 group">
                            <div className="md:w-1/2 md:pl-12 text-left pl-12 md:pl-0 mb-2 md:mb-0">
                                {/* Mobile: bullet + year + phase on one row */}
                                <div className="flex items-baseline gap-3 mb-2 md:hidden">
                                    <span className="inline-block w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper" />
                                    <span className="copy-timeline-year text-stone/80">2027</span>
                                    <span className="copy-caption text-stone/60">Phase IV</span>
                                </div>
                                {/* Desktop: year only */}
                                <span className="copy-timeline-year text-stone/80 hidden md:inline-block">2027</span>
                                <h4 className="copy-title-sm text-stone">Structural Restoration</h4>
                                <p className="copy-body-muted mt-2">
                                    Commencement of the Riverside Landmark restoration.
                                </p>
                            </div>
                            {/* Desktop bullet */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper group-hover:scale-125 transition-transform hidden md:block" />
                            {/* Desktop phase */}
                            <div className="md:w-1/2 md:pr-12 pl-12 text-left md:text-right hidden md:block">
                                <span className="copy-caption text-stone/60">Phase IV</span>
                            </div>
                        </div>

                        {/* 2029 */}
                        <div className="timeline-reveal relative flex flex-col md:flex-row items-center justify-between group">
                            <div className="md:w-1/2 md:pr-12 text-left md:text-right pl-12 md:pl-0 mb-2 md:mb-0">
                                {/* Mobile: bullet + year + phase on one row */}
                                <div className="flex items-baseline gap-3 mb-2 md:hidden">
                                    <span className="inline-block w-3 h-3 rounded-full bg-primary ring-4 ring-paper" />
                                    <span className="copy-timeline-year text-primary">2029</span>
                                    <span className="copy-caption text-stone/60">Phase V</span>
                                </div>
                                {/* Desktop: year only */}
                                <span className="copy-timeline-year text-primary hidden md:inline-block">2029</span>
                                <h4 className="copy-title-sm text-primary">The Grand Opening</h4>
                                <p className="copy-body-muted mt-2">
                                    Unveiling of the 27-suite estate and private gardens. Full realization of the asset value.
                                </p>
                            </div>
                            {/* Desktop bullet */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-paper group-hover:scale-125 transition-transform hidden md:block" />
                            {/* Desktop phase */}
                            <div className="md:w-1/2 md:pl-12 pl-12 hidden md:block">
                                <span className="copy-caption text-stone/60">Phase V</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
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
                        Detailed architectural plans are reserved for strategic counterparts.
                    </h2>
                    <FooterInquireLink onOpenInquire={onOpenInquire} />
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
        </div>
    );
}

const FooterInquireLink = ({ onOpenInquire }) => {
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
                ease: 'none',
                scrollTrigger: {
                    trigger: '#footer',
                    start: 'top 92%',
                    end: 'top 5%',
                    scrub: true,
                },
            }
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

export default SantosSite;


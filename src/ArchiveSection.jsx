import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ArchiveSection() {
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
        <main className="w-full max-w-[min(1440px,100%)] mx-auto bg-paper">
            <section className="pt-[9.6rem] pb-24 px-8 md:px-20" id="timeline">
                <div className="max-w-4xl mx-auto mb-24 space-y-6">
                    <span className="copy-eyebrow flex items-center gap-4">
                        The Archive <span className="h-[1px] w-12 bg-stone-light/40" />
                    </span>
                    <h2 className="copy-section-title">
                        Provenance &amp; Lineage
                    </h2>
                    <p className="copy-body max-w-3xl mt-10 mb-20">
                        A chronological record of how Santos-o-Velho evolved from a post-seismic refuge for nobility
                        into Lisbon&apos;s most finite enclave of heritage estates.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="hidden md:block absolute left-[26%] top-0 bottom-0 w-[1px] bg-stone-light -translate-x-1/2" />

                    {/* 1755 – The Origin */}
                    <div className="timeline-reveal relative flex flex-col md:flex-row items-start justify-start md:gap-10 mb-16 group">
                        <div className="md:w-1/3 text-left pl-6 md:pl-0 mb-4 md:mb-0">
                            <span className="copy-timeline-year text-stone/60">1755</span>
                            <h4 className="copy-title-sm">The Origin</h4>
                        </div>
                        <div className="hidden md:block absolute left-[26%] -translate-x-1/2 w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper group-hover:scale-125 transition-transform" />
                        <div className="md:w-1/2 max-w-md md:pl-0 pl-6">
                            <p className="copy-label">
                                A Noble Refuge
                            </p>
                            <p className="copy-body mt-2">
                                Following the 1755 earthquake, Santos-o-Velho became the preferred sanctuary for the
                                Portuguese aristocracy. While the lower city was rebuilt in the Pombaline grid, this
                                enclave remained a rare bastion of original estates—a neighborhood defined not by
                                reconstruction, but by the continuity of its noble lineage.
                            </p>
                        </div>
                    </div>

                    {/* 18th C. – The Foundation */}
                    <div className="timeline-reveal relative flex flex-col md:flex-row items-start justify-start md:gap-10 mb-16 group">
                        <div className="md:w-1/3 text-left pl-6 md:pl-0 mb-4 md:mb-0">
                            <span className="copy-timeline-year text-stone/60">18th C.</span>
                            <h4 className="copy-title-sm">The Foundation</h4>
                        </div>
                        <div className="hidden md:block absolute left-[26%] -translate-x-1/2 w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper group-hover:scale-125 transition-transform" />
                        <div className="md:w-1/2 max-w-md md:pl-0 pl-6">
                            <p className="copy-label">
                                Architectural Permanence
                            </p>
                            <p className="copy-body mt-2">
                                The district rests upon a geological shelf that spared it from the seismic destruction
                                of the 18th century. Consequently, it remains one of the few enclaves in Lisbon where
                                the pre-earthquake architectural fabric survives—offering a tactile connection to the
                                city&apos;s 17th-century Palacetes that modern developments cannot replicate.
                            </p>
                        </div>
                    </div>

                    {/* 1850s – The Monarchy */}
                    <div className="timeline-reveal relative flex flex-col md:flex-row items-start justify-start md:gap-10 mb-16 group">
                        <div className="md:w-1/3 text-left pl-6 md:pl-0 mb-4 md:mb-0">
                            <span className="copy-timeline-year text-stone/60">1850s</span>
                            <h4 className="copy-title-sm">The Monarchy</h4>
                        </div>
                        <div className="hidden md:block absolute left-[26%] -translate-x-1/2 w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper group-hover:scale-125 transition-transform" />
                        <div className="md:w-1/2 max-w-md md:pl-0 pl-6">
                            <p className="copy-label">
                                The Diplomatic Quarter
                            </p>
                            <p className="copy-body mt-2">
                                As the gateway to Lapa, Santos-o-Velho thrived within the immediate orbit of the
                                monarchy. With the Royal Court established at the nearby Palácio das Necessidades, the
                                high nobility commissioned &quot;river-view&quot; estates here—securing a strategic
                                balance between proximity to power and the serenity of the Tagus.
                            </p>
                        </div>
                    </div>

                    {/* 19th C. – The Legacy */}
                    <div className="timeline-reveal relative flex flex-col md:flex-row items-start justify-start md:gap-10 group">
                        <div className="md:w-1/3 text-left pl-6 md:pl-0 mb-4 md:mb-0">
                            <span className="copy-timeline-year text-stone/60">19th C.</span>
                            <h4 className="copy-title-sm">The Legacy</h4>
                        </div>
                        <div className="hidden md:block absolute left-[26%] -translate-x-1/2 w-3 h-3 rounded-full bg-stone-light ring-4 ring-paper group-hover:scale-125 transition-transform" />
                        <div className="md:w-1/2 max-w-md md:pl-0 pl-6">
                            <p className="copy-label">
                                The Estate
                            </p>
                            <p className="copy-body mt-2">
                                Originally the residence of [Insert Family Name/Title], the 19th-century structure
                                stands as a testament to this diplomatic heritage. Its Andar Nobre (Noble Floor) and
                                600m² of private walled gardens represent a scale of residential architecture that is
                                now structurally finite in the capital.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}


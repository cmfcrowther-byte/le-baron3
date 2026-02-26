import React from 'react';

export default function StewardshipSection() {
    return (
        <main className="w-full max-w-[min(1440px,100%)] mx-auto bg-paper">
            <section className="pt-[12rem] pb-20 px-8 md:px-20">
                <div className="max-w-4xl mx-auto mb-16 space-y-10">
                    <header className="space-y-4 text-left">
                        <span className="copy-eyebrow flex items-center gap-4">
                            The Stewardship <span className="h-[1px] w-12 bg-stone-light/40" />
                        </span>
                        <h2 className="copy-section-title">
                            Strategic Execution &amp; Governance
                        </h2>
                        <p className="copy-body max-w-3xl mb-8 md:mb-10">
                            A multi-disciplinary principal team integrating high-value real estate acquisition, operational precision,
                            and global brand equity.
                        </p>
                    </header>

                    <div className="space-y-16">
                        {/* Founding Principals */}
                        <section className="space-y-6 pt-10 md:pt-14 pb-8 md:pb-10">
                            <h3 className="copy-subsection-head mb-8">
                                Founding Principals
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <article className="space-y-2">
                                    <h4 className="copy-title-sm">Miki Momén</h4>
                                    <p className="copy-caption">Principal</p>
                                    <p className="copy-body">
                                        Leading international development with 25 years of cross-sector experience in finance, tech, and
                                        private equity initiatives.
                                    </p>
                                </article>
                                <article className="space-y-2">
                                    <h4 className="copy-title-sm">Freddie Crowther</h4>
                                    <p className="copy-caption">Principal</p>
                                    <p className="copy-body">
                                        Directing strategic acquisition and capital alignment with a track record of acquiring over
                                        &euro;100M in European real estate assets.
                                    </p>
                                </article>
                            </div>
                        </section>

                        {/* Operations & Design */}
                        <section className="space-y-6">
                            <h3 className="copy-subsection-head mb-8">
                                Operations &amp; Design
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                                {/* Row 1: Andrew & André */}
                                <article className="space-y-2">
                                    <h4 className="copy-title-sm">Andrew Purcell</h4>
                                    <p className="copy-caption">Operations Director</p>
                                    <p className="copy-body">
                                        Overseeing operational integrity; formerly Head of Operations for Soho House &amp; Co. across ten
                                        London properties.
                                    </p>
                                </article>
                                <article className="space-y-2">
                                    <h4 className="copy-title-sm">Andr&eacute; Saraiva</h4>
                                    <p className="copy-caption">Creative Director</p>
                                    <p className="copy-body">
                                        Guiding the aesthetic narrative and cultural legacy; founder of the Le Baron hospitality concept.
                                    </p>
                                </article>

                                {/* Row 2: George & Ania */}
                                <article className="space-y-2">
                                    <h4 className="copy-title-sm">George Glass</h4>
                                    <p className="copy-caption">Development Director</p>
                                    <p className="copy-body">
                                        Directing structural realization and heritage restoration with over 25 years of high-end
                                        construction expertise.
                                    </p>
                                </article>
                                <article className="space-y-2">
                                    <h4 className="copy-title-sm">Ania Porzuczek</h4>
                                    <p className="copy-caption">Strategic Relations</p>
                                    <p className="copy-body">
                                        Managing global partnerships and community alignment.
                                    </p>
                                </article>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}


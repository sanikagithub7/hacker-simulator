import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

const particlesOptions: ISourceOptions = {
    fullScreen: false,
    background: { color: 'transparent' },
    fpsLimit: 60,
    particles: {
        color: { value: '#00FF41' },
        links: {
            color: '#00FF41',
            distance: 150,
            enable: true,
            opacity: 0.15,
            width: 1,
        },
        move: {
            enable: true,
            speed: 0.8,
            direction: 'none' as const,
            outModes: { default: 'bounce' as const },
        },
        number: { value: 60, density: { enable: true } },
        opacity: { value: 0.3 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
};

const headlineWords = ['You Look Like', "You Know What", "You're Doing."];

const tickerItems = [
    'STATUS: ONLINE',
    'NODES CONNECTED: 2,847',
    'FIREWALL: BYPASSED',
    'ENCRYPTION: ACTIVE',
    'TRACE: NONE DETECTED',
    'SIGNAL: NOMINAL',
    'UPLINK: STABLE',
    'PROTOCOL: SECURED',
];

export default function HeroSection() {
    const [init, setInit] = useState(false);
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    const subheadline = '> The ultimate hacker simulator. Type anything. Look like a genius.';

    useEffect(() => {
        let idx = 0;
        const timer = setInterval(() => {
            if (idx <= subheadline.length) {
                setTypedText(subheadline.slice(0, idx));
                idx++;
            } else {
                clearInterval(timer);
            }
        }, 40);
        return () => clearInterval(timer);
    }, []);

    const particlesLoaded = useCallback(async () => { }, []);

    const scrollTo = useCallback((targetId: string) => {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    const asciiArt = `
    ┌──────────┐
    │  ┌────┐  │
    │  │ >_ │  │
    │  └────┘  │
    │  ██████  │
    │  ██████  │
    └──────────┘
      │      │
    ──┘      └──
  `;

    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
            {/* Particles */}
            {init && (
                <Particles
                    id="hero-particles"
                    className="absolute inset-0 z-0"
                    options={particlesOptions}
                    particlesLoaded={particlesLoaded}
                />
            )}

            {/* Scanline Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none scanline-overlay" />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center w-full">
                <div className="flex-1">
                    {/* Headline */}
                    <div className="mb-8">
                        {headlineWords.map((word, i) => (
                            <motion.h1
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.2, duration: 0.7, ease: 'easeOut' as const }}
                                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-terminal-green leading-tight"
                                style={{ textShadow: '0 0 30px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.1)' }}
                            >
                                {word}
                            </motion.h1>
                        ))}
                    </div>

                    {/* Typewriter subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="font-mono text-terminal-green/80 text-sm sm:text-base md:text-lg mb-10 max-w-2xl"
                    >
                        {typedText}
                        <span className="inline-block w-2 h-5 bg-terminal-green ml-1 animate-pulse align-text-bottom" />
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <button
                            onClick={() => scrollTo('simulator')}
                            className="group font-mono text-sm px-8 py-3 bg-terminal-green text-black font-bold rounded hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all duration-300 text-center cursor-pointer border-none"
                        >
                            Launch Simulator
                            <span className="ml-2 group-hover:ml-3 transition-all">→</span>
                        </button>
                        <button
                            onClick={() => scrollTo('features')}
                            className="font-mono text-sm px-8 py-3 border border-terminal-green/50 text-terminal-green rounded hover:border-terminal-green hover:bg-terminal-green/5 transition-all duration-300 text-center cursor-pointer bg-transparent"
                        >
                            View Features ↓
                        </button>
                    </motion.div>
                </div>

                {/* ASCII Art - Desktop Only */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="hidden lg:block flex-shrink-0 ml-12"
                >
                    <pre
                        className="font-mono text-terminal-green/40 text-sm leading-tight animate-float"
                        style={{ textShadow: '0 0 10px rgba(0,255,65,0.2)' }}
                    >
                        {asciiArt}
                    </pre>
                </motion.div>
            </div>

            {/* Ticker */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/80 border-t border-terminal-green/10 overflow-hidden">
                <div className="ticker-track">
                    <div className="ticker-content">
                        {[...tickerItems, ...tickerItems].map((item, i) => (
                            <span key={i} className="font-mono text-xs text-terminal-green/50 mx-6">
                                {item}
                                <span className="text-terminal-green ml-4">●</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

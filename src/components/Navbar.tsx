import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Features', target: 'features' },
    { label: 'Simulator', target: 'simulator' },
    { label: 'How It Works', target: 'how-it-works' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = useCallback((targetId: string) => {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMobileOpen(false);
    }, []);

    const scrollToTop = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileOpen(false);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-black/90 backdrop-blur-md border-b border-terminal-green/20 shadow-[0_2px_20px_rgba(0,255,65,0.08)]'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a
                        href="/"
                        onClick={scrollToTop}
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-8 h-8 rounded border border-terminal-green/50 flex items-center justify-center bg-terminal-green/10 group-hover:bg-terminal-green/20 transition-colors">
                            <Terminal className="w-4 h-4 text-terminal-green" />
                        </div>
                        <span className="font-display text-terminal-green text-lg tracking-wider hidden sm:block">
                            HACKER SIMULATOR
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => scrollTo(link.target)}
                                className="font-mono text-sm text-gray-400 hover:text-terminal-green transition-colors relative group bg-transparent border-none cursor-pointer"
                            >
                                <span className="text-terminal-green/50 mr-1">&gt;</span>
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-terminal-green group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                        <button
                            onClick={() => scrollTo('simulator')}
                            className="font-mono text-sm px-4 py-2 border border-terminal-green text-terminal-green rounded hover:bg-terminal-green/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300 cursor-pointer bg-transparent"
                        >
                            Launch App
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-terminal-green p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-black/95 backdrop-blur-md border-t border-terminal-green/10 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => scrollTo(link.target)}
                                    className="block w-full text-left font-mono text-sm text-gray-400 hover:text-terminal-green py-2 bg-transparent border-none cursor-pointer"
                                >
                                    <span className="text-terminal-green/50 mr-2">&gt;</span>
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => scrollTo('simulator')}
                                className="block w-full font-mono text-sm text-center px-4 py-2 border border-terminal-green text-terminal-green rounded mt-2 bg-transparent cursor-pointer hover:bg-terminal-green/10 transition-colors"
                            >
                                Launch App
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

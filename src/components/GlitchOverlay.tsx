import { useEffect, useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function GlitchOverlay() {
    const { escActive, setEscActive, accessFlash, glitchActive } = useAppStore();
    const [countdown, setCountdown] = useState(5);

    // ESC countdown
    useEffect(() => {
        if (!escActive) {
            setCountdown(5);
            return;
        }

        setCountdown(5);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setTimeout(() => setEscActive(false), 600);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [escActive, setEscActive]);

    // Cancel ESC on any key
    const cancelEsc = useCallback(
        (e: KeyboardEvent) => {
            if (escActive && e.key !== 'Escape') {
                setEscActive(false);
            }
        },
        [escActive, setEscActive]
    );

    useEffect(() => {
        window.addEventListener('keydown', cancelEsc);
        return () => window.removeEventListener('keydown', cancelEsc);
    }, [cancelEsc]);

    return (
        <>
            {/* ACCESS INJECTED flash */}
            {accessFlash && (
                <div className="fixed inset-0 z-[9000] pointer-events-none flex items-center justify-center">
                    <div
                        className="font-display text-3xl sm:text-5xl text-terminal-green font-bold tracking-widest animate-fade-out"
                        style={{ textShadow: '0 0 20px #00FF41, 0 0 40px #00FF41, 0 0 80px rgba(0,255,65,0.4)' }}
                    >
                        ACCESS INJECTED
                    </div>
                </div>
            )}

            {/* ESC Overlay */}
            {escActive && (
                <div className="fixed inset-0 z-[9999] bg-red-900/95 flex flex-col items-center justify-center text-center animate-screen-shake">
                    <div
                        className="font-display text-2xl sm:text-4xl text-white tracking-widest mb-8 animate-pulse"
                        style={{ textShadow: '0 0 20px #ff0000' }}
                    >
                        ⚠ TRACE DETECTED — ABORTING CONNECTION ⚠
                    </div>
                    <div
                        className="font-display text-7xl sm:text-9xl text-white font-bold"
                        style={{ textShadow: '0 0 40px #ff0000, 0 0 80px rgba(255,0,0,0.5)' }}
                    >
                        {countdown}
                    </div>
                    <p className="font-mono text-xs text-white/50 mt-12">
                        Press any key to cancel abort
                    </p>
                </div>
            )}

            {/* Glitch overlay */}
            {glitchActive && (
                <div className="fixed inset-0 z-[8999] pointer-events-none glitch-overlay-effect" />
            )}
        </>
    );
}

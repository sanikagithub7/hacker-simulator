import { useEffect, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useKeyboardEffect(addBurst: (count: number) => void) {
    const { setAccessFlash, setEscActive, escActive, muted } = useAppStore();

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (escActive) {
            // Any key during ESC cancels the countdown
            setEscActive(false);
            return;
        }

        if (e.key === 'Escape') {
            setEscActive(true);
            return;
        }

        // Burst of lines
        const count = Math.floor(Math.random() * 4) + 3;
        addBurst(count);

        // Access flash
        setAccessFlash(true);
        setTimeout(() => setAccessFlash(false), 800);

        // Play click sound
        if (!muted) {
            try {
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(800 + Math.random() * 600, ctx.currentTime);
                gain.gain.setValueAtTime(0.03, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.06);
            } catch { /* silent */ }
        }
    }, [addBurst, setAccessFlash, setEscActive, escActive, muted]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}

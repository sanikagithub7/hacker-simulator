import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useGlitch() {
    const { setGlitchActive } = useAppStore();

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const triggerGlitch = () => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 500);
            const next = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
            timeout = setTimeout(triggerGlitch, next);
        };

        timeout = setTimeout(triggerGlitch, Math.floor(Math.random() * 5000) + 5000);
        return () => clearTimeout(timeout);
    }, [setGlitchActive]);
}

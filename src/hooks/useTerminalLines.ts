import { useEffect, useRef, useState, useCallback } from 'react';
import { getRandomLine, fileTrees } from '../data/terminalLines';
import type { TermLine } from '../data/terminalLines';

export function useTerminalLines(intervalMs = 250) {
    const [lines, setLines] = useState<TermLine[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const addLine = useCallback(() => {
        setLines((prev) => {
            const next = [...prev, getRandomLine()];
            return next.length > 300 ? next.slice(-300) : next;
        });
    }, []);

    const addBurst = useCallback((count: number) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => addLine(), i * 40);
        }
    }, [addLine]);

    const addFileTree = useCallback(() => {
        const tree = fileTrees[Math.floor(Math.random() * fileTrees.length)];
        setLines((prev) => {
            const next = [...prev, { text: tree, color: 'cyan' as const }];
            return next.length > 300 ? next.slice(-300) : next;
        });
    }, []);

    useEffect(() => {
        const schedule = () => {
            addLine();
            const jitter = Math.floor(Math.random() * (350 - 150 + 1)) + 150;
            timerRef.current = setTimeout(schedule, jitter);
        };
        schedule();
        const treeInterval = setInterval(() => {
            if (Math.random() < 0.1) addFileTree();
        }, 5000);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            clearInterval(treeInterval);
        };
    }, [addLine, addFileTree]);

    return { lines, addBurst, addLine };
}

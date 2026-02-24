import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function StatsBar() {
    const [clock, setClock] = useState('00:00:00');
    const { muted, toggleMute } = useAppStore();
    const [sessionId] = useState(() =>
        Array.from({ length: 8 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')
    );

    useEffect(() => {
        const timer = setInterval(() => {
            const n = new Date();
            setClock(
                [n.getHours(), n.getMinutes(), n.getSeconds()]
                    .map((v) => String(v).padStart(2, '0'))
                    .join(':')
            );
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-terminal-dim/30 border-b border-terminal-green/10 font-mono text-xs shrink-0">
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                <span className="text-terminal-green/70">CONNECTED</span>
                <span className="text-terminal-green/30">SESSION: 0x{sessionId}</span>
            </div>
            <span className="font-display text-terminal-green text-sm tracking-widest hidden sm:block"
                style={{ textShadow: '0 0 10px rgba(0,255,65,0.3)' }}>
                HACKER SIMULATOR
            </span>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleMute}
                    className="text-terminal-green hover:text-white transition-colors text-base"
                    aria-label="Toggle sound"
                >
                    {muted ? '🔇' : '🔊'}
                </button>
                <span className="text-terminal-cyan">{clock}</span>
            </div>
        </div>
    );
}

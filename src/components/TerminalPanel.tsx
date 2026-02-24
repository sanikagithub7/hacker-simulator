import { useEffect, useRef } from 'react';
import type { TermLine } from '../data/terminalLines';

interface Props {
    lines: TermLine[];
}

const colorMap: Record<string, string> = {
    green: 'text-terminal-green',
    cyan: 'text-terminal-cyan',
    red: 'text-terminal-red',
    white: 'text-white',
    yellow: 'text-yellow-400',
    dim: 'text-terminal-green/40',
};

export default function TerminalPanel({ lines }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [lines.length]);

    return (
        <div className="h-full flex flex-col bg-black/60 rounded overflow-hidden border border-terminal-green/10">
            {/* Panel Header */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-terminal-dim/30 border-b border-terminal-green/10 text-[10px] font-mono text-terminal-green/50 shrink-0">
                <span className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-terminal-red/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="w-2 h-2 rounded-full bg-terminal-green/60" />
                </span>
                <span className="tracking-widest">TERMINAL — /root/hack</span>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed scrollbar-hide">
                {lines.map((line, i) => (
                    <div
                        key={i}
                        className={`whitespace-pre-wrap break-all animate-fade-in ${colorMap[line.color || 'green']
                            }`}
                    >
                        {line.text}
                    </div>
                ))}
                {/* Blinking cursor */}
                <span className="inline-block w-2 h-3.5 bg-terminal-green animate-blink align-text-bottom" />
                <div ref={bottomRef} />
            </div>
        </div>
    );
}

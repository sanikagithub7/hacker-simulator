import { useState, useEffect } from 'react';
import { processNames } from '../data/terminalLines';

const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

const pBar = (pct: number) => {
    const f = Math.round(pct / 100 * 12);
    return '[' + '█'.repeat(f) + '░'.repeat(12 - f) + '] ' + pct + '%';
};

interface Process {
    pid: number;
    name: string;
    cpu: string;
}

export default function SystemPanel() {
    const [stats, setStats] = useState({
        cpu: 94, ram: '12.4', netIn: '847.3', netOut: '234.1',
        uptime: '04:22:13', temp: 89, disk: 73,
    });
    const [procs, setProcs] = useState<Process[]>([]);

    useEffect(() => {
        let seconds = rand(10000, 99999);

        const timer = setInterval(() => {
            seconds++;
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;

            setStats({
                cpu: rand(70, 99),
                ram: `${rand(8, 15)}.${rand(0, 9)}`,
                netIn: `${rand(100, 999)}.${rand(0, 9)}`,
                netOut: `${rand(10, 499)}.${rand(0, 9)}`,
                uptime: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
                temp: rand(55, 95),
                disk: rand(40, 95),
            });

            const shuffled = [...processNames].sort(() => Math.random() - 0.5).slice(0, rand(5, 7));
            setProcs(shuffled.map((name) => ({
                pid: rand(1000, 9999),
                name,
                cpu: (rand(10, 350) / 10).toFixed(1),
            })));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-full flex flex-col bg-black/60 rounded overflow-hidden border border-terminal-green/10">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-terminal-dim/30 border-b border-terminal-green/10 text-[10px] font-mono text-terminal-green/50 shrink-0">
                <span className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-terminal-red/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="w-2 h-2 rounded-full bg-terminal-green/60" />
                </span>
                <span className="tracking-widest">SYSTEM MONITOR</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs scrollbar-hide space-y-1">
                <div>
                    <span className="text-terminal-cyan">CPU  </span>
                    <span className="text-terminal-green">{pBar(stats.cpu)}</span>
                </div>
                <div>
                    <span className="text-terminal-cyan">RAM  </span>
                    <span className="text-terminal-green">{stats.ram} / 16.0 GB</span>
                </div>
                <div>
                    <span className="text-terminal-cyan">NET↓ </span>
                    <span className="text-terminal-green">↓ {stats.netIn} MB/s</span>
                </div>
                <div>
                    <span className="text-terminal-cyan">NET↑ </span>
                    <span className="text-terminal-green">↑ {stats.netOut} MB/s</span>
                </div>
                <div>
                    <span className="text-terminal-cyan">UP   </span>
                    <span className="text-terminal-green">{stats.uptime}</span>
                </div>
                <div>
                    <span className="text-terminal-cyan">TEMP </span>
                    <span className={stats.temp > 85 ? 'text-terminal-red' : 'text-terminal-green'}>
                        {stats.temp}°C {stats.temp > 85 ? '⚠' : ''}
                    </span>
                </div>
                <div>
                    <span className="text-terminal-cyan">DISK </span>
                    <span className="text-terminal-green">{stats.disk}% used</span>
                </div>

                {/* Process Table */}
                <div className="mt-3 border-t border-terminal-green/10 pt-2">
                    <div className="text-yellow-400 mb-1">
                        {'  PID    PROCESS              CPU%'}
                    </div>
                    {procs.map((p, i) => (
                        <div key={i} className="text-terminal-green/60">
                            {'  '}{String(p.pid).padStart(4)}{'   '}{p.name.padEnd(20)}{' '}{p.cpu.padStart(5)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

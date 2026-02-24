import { useState, useEffect } from 'react';
import { asciiMap, mapLocations } from '../data/terminalLines';

const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randIP = () => `${rand(1, 223)}.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`;
const randPort = () => pick([22, 80, 443, 8080, 3306, 5432, 8443]);

const statuses = ['TRACKING NODE...', 'SIGNAL ACQUIRED', 'TRIANGULATING...', 'INTERCEPTING...', 'NODE COMPROMISED', 'ROUTING TRAFFIC...'];
const pBar = (pct: number) => {
    const f = Math.round(pct / 100 * 20);
    return '[' + '█'.repeat(f) + '░'.repeat(20 - f) + '] ' + pct + '%';
};

interface Connection {
    src: string;
    dst: string;
    status: string;
}

export default function MapPanel() {
    const [loc, setLoc] = useState(pick(mapLocations));
    const [status, setStatus] = useState(pick(statuses));
    const [connections, setConnections] = useState<Connection[]>([]);
    const [signal, setSignal] = useState(rand(40, 100));
    const [ip, setIp] = useState(randIP());

    useEffect(() => {
        const timer = setInterval(() => {
            setLoc(pick(mapLocations));
            setStatus(pick(statuses));
            setSignal(rand(40, 100));
            setIp(randIP());
            const count = rand(3, 5);
            const conns: Connection[] = [];
            for (let i = 0; i < count; i++) {
                conns.push({
                    src: randIP(),
                    dst: randIP(),
                    status: pick(['ENCRYPTED', 'ACTIVE', 'RELAYING', 'SNIFFING']),
                });
            }
            setConnections(conns);
        }, 3000);
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
                <span className="tracking-widest">GLOBAL NETWORK MONITOR</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs scrollbar-hide">
                {/* ASCII Map */}
                <pre className="text-[9px] sm:text-[10px] leading-tight text-terminal-green/30 mb-3 overflow-x-auto whitespace-pre">
                    {asciiMap.join('\n')}
                </pre>

                {/* Status */}
                <div className="text-yellow-400 text-xs mb-2">
                    █ {status}
                </div>

                {/* Target Info */}
                <div className="space-y-0.5 mb-3">
                    <div className="text-terminal-cyan">  TARGET: {loc.name}</div>
                    <div className="text-terminal-green/40">  LAT: {loc.lat}  LON: {loc.lon}</div>
                    <div className="text-terminal-green/40">  IP: {ip}  PORT: {randPort()}</div>
                    <div className="text-terminal-green">  SIGNAL: {pBar(signal)}</div>
                </div>

                {/* Active Connections */}
                <div className="text-yellow-400 mb-1">  ACTIVE CONNECTIONS: {connections.length + rand(2, 8)}</div>
                {connections.map((c, i) => (
                    <div key={i} className="text-terminal-green/40">
                        {'  '}{c.src} ──▶ {c.dst} [{c.status}]
                    </div>
                ))}
            </div>
        </div>
    );
}

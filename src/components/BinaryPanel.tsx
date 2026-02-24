import { useState, useEffect } from 'react';

const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const waveChars = '▁▂▃▄▅▆▇█';
const randHex = (n = 8) => '0x' + Array.from({ length: n }, () => '0123456789ABCDEF'[rand(0, 15)]).join('');

export default function BinaryPanel() {
    const [rows, setRows] = useState<string[]>([]);
    const [wave, setWave] = useState('');
    const [hexLine, setHexLine] = useState('');
    const [freq, setFreq] = useState({ freq: '0', amp: '0', snr: 0, ber: '0' });

    useEffect(() => {
        const timer = setInterval(() => {
            // Binary rows
            const newRows: string[] = [];
            for (let r = 0; r < 6; r++) {
                let line = '';
                for (let g = 0; g < 4; g++) {
                    line += Array.from({ length: 8 }, () => rand(0, 1)).join('') + ' ';
                }
                newRows.push(line);
            }
            setRows(newRows);

            // Hex line
            setHexLine(`${randHex(8)} ${randHex(8)} ${randHex(8)}`);
        }, 200);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            // Waveform
            let w = '';
            for (let i = 0; i < 40; i++) w += waveChars[rand(0, waveChars.length - 1)];
            setWave(w);

            setFreq({
                freq: (rand(100, 999) / 10).toFixed(1),
                amp: (rand(10, 99) / 10).toFixed(1),
                snr: rand(5, 35),
                ber: (rand(1, 50) / 10000).toFixed(4),
            });
        }, 500);
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
                <span className="tracking-widest">SIGNAL INTERCEPT</span>
            </div>

            <div className="flex-1 overflow-hidden p-3 font-mono text-xs scrollbar-hide">
                {/* Waveform */}
                <div className="text-terminal-cyan text-[10px] mb-1">■ SIGNAL WAVEFORM</div>
                <div className="text-terminal-green text-sm leading-tight tracking-wide mb-1">{wave}</div>

                {/* Binary stream */}
                <div className="text-terminal-cyan text-[10px] mt-3 mb-1">■ DATA STREAM</div>
                {rows.map((row, i) => (
                    <div key={i} className="text-terminal-green/40 text-[11px]">{row}</div>
                ))}
                <div className="text-terminal-green/50 text-[11px] mt-1">{hexLine}</div>

                {/* Frequency info */}
                <div className="mt-3 text-terminal-green/40 text-[10px] space-y-0.5">
                    <div>FREQ: {freq.freq} MHz  AMP: {freq.amp} dBm</div>
                    <div>SNR: {freq.snr} dB   BER: {freq.ber}</div>
                </div>
            </div>
        </div>
    );
}

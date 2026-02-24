import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { useTerminalLines } from '../hooks/useTerminalLines';
import { useKeyboardEffect } from '../hooks/useKeyboardEffect';
import { useGlitch } from '../hooks/useGlitch';
import StatsBar from './StatsBar';
import TerminalPanel from './TerminalPanel';
import MapPanel from './MapPanel';
import BinaryPanel from './BinaryPanel';
import SystemPanel from './SystemPanel';

export default function SimulatorSection() {
    const { glitchActive, accessFlash } = useAppStore();
    const { lines, addBurst } = useTerminalLines();

    useKeyboardEffect(addBurst);
    useGlitch();

    return (
        <section id="simulator" className="relative py-24 bg-black">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="font-display text-2xl md:text-3xl text-terminal-green">
            // LIVE_TERMINAL — ACTIVE SESSION
                    </h2>
                    <p className="font-mono text-xs text-gray-500 mt-2">
                        Click anywhere inside the simulator and start typing. Press ESC for a surprise.
                    </p>
                </motion.div>

                {/* Simulator Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`relative rounded-lg overflow-hidden border transition-all duration-300 ${accessFlash
                            ? 'border-terminal-green shadow-[0_0_40px_rgba(0,255,65,0.3)]'
                            : 'border-terminal-green/20 shadow-[0_0_20px_rgba(0,255,65,0.05)]'
                        } ${glitchActive ? 'glitch-active' : ''}`}
                    style={{ height: '85vh', minHeight: '500px' }}
                >
                    {/* Stats Bar */}
                    <StatsBar />

                    {/* Panel Grid */}
                    <div className="flex flex-col md:flex-row h-[calc(100%-40px)]">
                        {/* Left Panel - Terminal */}
                        <div className="w-full md:w-[40%] h-[40%] md:h-full p-1">
                            <TerminalPanel lines={lines} />
                        </div>

                        {/* Right Area */}
                        <div className="w-full md:w-[60%] flex flex-col h-[60%] md:h-full">
                            {/* Map Panel */}
                            <div className="h-1/2 p-1">
                                <MapPanel />
                            </div>

                            {/* Bottom Right: Binary + System */}
                            <div className="h-1/2 flex">
                                <div className="w-1/2 p-1">
                                    <BinaryPanel />
                                </div>
                                <div className="w-1/2 p-1">
                                    <SystemPanel />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scanline overlay on simulator */}
                    <div className="absolute inset-0 pointer-events-none scanline-overlay z-10" />
                </motion.div>
            </div>
        </section>
    );
}

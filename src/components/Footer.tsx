import { Terminal } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-terminal-green/10 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-terminal-green/50" />
                        <span className="font-display text-sm text-terminal-green/50 tracking-wider">
                            HACKER SIMULATOR
                        </span>
                    </div>

                    {/* Disclaimer */}
                    <p className="font-mono text-[10px] text-gray-600 text-center max-w-md">
            // Built for educational and entertainment purposes only. No actual hacking occurs.
                    </p>

                    {/* Status */}
                    <div className="flex items-center gap-2 font-mono text-xs text-terminal-green/40">
                        SYSTEM ONLINE
                        <span className="w-2 h-2 rounded-full bg-terminal-green/50 animate-pulse" />
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="font-mono text-[9px] text-gray-700">
                        © 2025 Hacker Simulator. All systems operational.
                    </p>
                </div>
            </div>
        </footer>
    );
}

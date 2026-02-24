import { motion } from 'framer-motion';
import { Keyboard, Globe, Terminal, ShieldAlert, Zap, Activity } from 'lucide-react';

const features = [
    {
        icon: Keyboard,
        title: 'Ghost Typing',
        badge: 'ACTIVE BY DEFAULT',
        description:
            'Type anything you want on your keyboard — smash random keys, type gibberish, press every letter — but the terminal will only output real-looking elite hacker code. Your keystrokes are invisible. The output is legendary.',
    },
    {
        icon: Globe,
        title: 'Global Node Map',
        badge: 'REAL-TIME',
        description:
            'Watch as the simulator tracks and displays fake IP addresses from around the world in real time. Glowing red dots flash across a retro ASCII world map as new "connections" are established every few seconds.',
    },
    {
        icon: Terminal,
        title: 'Intrusion Feed',
        badge: '∞ INFINITE STREAM',
        description:
            'A continuously updating terminal feed streams fake exploit commands, brute-force attacks, SQL injections, hash decryption results, and payload uploads — all formatted to look dangerously authentic.',
    },
    {
        icon: ShieldAlert,
        title: 'ESC to Abort',
        badge: 'PRESS ESC TO TEST',
        description:
            'Press ESC at any time to trigger the Emergency Abort sequence — a dramatic full-screen red TRACE DETECTED alert with a 5-second countdown, then automatic reconnect. Perfect for when someone walks up behind you.',
    },
    {
        icon: Zap,
        title: 'Glitch Engine',
        badge: 'PROCEDURAL',
        description:
            'Every 10–20 seconds, the entire interface hits a randomized glitch — RGB channel splitting, horizontal screen tearing, and static noise, all rendered in pure CSS. No two glitches are the same.',
    },
    {
        icon: Activity,
        title: 'Live Stats HUD',
        badge: '1s REFRESH',
        description:
            'A constantly updating heads-up display shows fake CPU usage (always dangerously high), RAM consumption, network I/O throughput, system uptime, and a live process table with suspicious process names. Updates every second.',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
};

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-3xl md:text-4xl text-terminal-green mb-4 inline-block relative">
            // CORE_FEATURES.exe
                        <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-terminal-green to-transparent animate-pulse" />
                    </h2>
                    <p className="font-mono text-sm text-gray-500 mt-4 max-w-xl mx-auto">
                        Everything you need to look absolutely terrifying at a coffee shop.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            className="group relative bg-terminal-card border border-terminal-border rounded-lg p-6 hover:border-terminal-green/50 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,65,0.08)]"
                        >
                            {/* Badge */}
                            <span className="absolute top-4 right-4 font-mono text-[10px] text-terminal-green/60 border border-terminal-green/20 px-2 py-0.5 rounded">
                                {feature.badge}
                            </span>

                            {/* Icon */}
                            <div className="w-12 h-12 rounded border border-terminal-green/30 flex items-center justify-center mb-5 bg-terminal-green/5 group-hover:bg-terminal-green/10 transition-colors">
                                <feature.icon className="w-6 h-6 text-terminal-green" />
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-lg text-terminal-green mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="font-mono text-xs text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

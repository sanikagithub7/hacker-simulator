import { motion } from 'framer-motion';
import { Rocket, Keyboard, Shield } from 'lucide-react';

const steps = [
    {
        num: '01',
        icon: Rocket,
        title: 'Open The Simulator',
        description:
            'Scroll down or click Launch. The simulator boots instantly in your browser with no install, no login, no setup.',
    },
    {
        num: '02',
        icon: Keyboard,
        title: 'Start Typing Anything',
        description:
            'Bang on your keyboard randomly. Type your name. Spam the spacebar. The Ghost Typing engine intercepts your input and replaces it with authentic-looking hacker output in real time.',
    },
    {
        num: '03',
        icon: Shield,
        title: 'Look Absolutely Unstoppable',
        description:
            'Sit back. The multi-panel interface handles everything. People around you will have questions. You will have no answers. That is the point.',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-3xl md:text-4xl text-terminal-green inline-block relative">
            // HOW_IT_WORKS
                        <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-terminal-green to-transparent animate-pulse" />
                    </h2>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="relative text-center p-8 border border-terminal-border rounded-lg bg-terminal-card hover:border-terminal-green/30 transition-all duration-300"
                        >
                            {/* Big Number */}
                            <div
                                className="font-display text-6xl text-terminal-green/10 absolute top-4 left-6"
                                style={{ textShadow: '0 0 20px rgba(0,255,65,0.05)' }}
                            >
                                {step.num}
                            </div>

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-full border border-terminal-green/30 flex items-center justify-center mx-auto mb-5 bg-terminal-green/5">
                                <step.icon className="w-7 h-7 text-terminal-green" />
                            </div>

                            <h3 className="font-display text-lg text-terminal-green mb-3">
                                {step.title}
                            </h3>
                            <p className="font-mono text-xs text-gray-500 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

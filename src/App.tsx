import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import SimulatorSection from './components/SimulatorSection';
import Footer from './components/Footer';
import GlitchOverlay from './components/GlitchOverlay';

export default function App() {
    return (
        <div className="bg-black min-h-screen text-terminal-green">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <HowItWorks />
            <SimulatorSection />
            <Footer />
            <GlitchOverlay />
        </div>
    );
}

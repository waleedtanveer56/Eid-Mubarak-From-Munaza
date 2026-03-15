import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MessageCircle, Heart, Star, Moon, Sparkles, Send, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Scene } from './components/Scene';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10 ${className}`}>
    {children}
  </section>
);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Initial celebration
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#0FA958', '#FFFFFF']
    });
  };

  return (
    <div ref={containerRef} className="relative bg-eid-blue selection:bg-eid-gold selection:text-eid-blue">
      <Scene />
      
      {/* Hero Section */}
      <Section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ 
              filter: ["drop-shadow(0 0 10px rgba(255,215,0,0.3))", "drop-shadow(0 0 20px rgba(255,215,0,0.6))", "drop-shadow(0 0 10px rgba(255,215,0,0.3))"] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-8 inline-block"
          >
            <Moon className="w-20 h-20 text-eid-gold fill-eid-gold/20" />
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-serif font-bold text-eid-gold mb-6 tracking-tight glow-gold">
            Eid Mubarak
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed px-4">
            May this blessed Eid bring peace, happiness, and countless blessings to your life. 
            May Allah accept your prayers and fill your home with joy.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12"
          >
            <ChevronDown className="w-8 h-8 text-eid-gold/50 animate-bounce mx-auto" />
          </motion.div>
        </motion.div>
      </Section>

      {/* Personal Message Section */}
      <Section>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-8 md:p-16 rounded-3xl max-w-3xl w-full mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-eid-gold to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-eid-green to-transparent opacity-50" />
          
          <div className="flex justify-center mb-8">
            <Heart className="w-12 h-12 text-eid-green animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif italic text-center text-eid-gold mb-8">
            To my beloved family and my dear sisters, CZNs & Friends,
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-white/90 leading-relaxed text-center font-light italic">
            <p>
              On this beautiful occasion of Eid, I pray that Allah fills your lives with happiness, 
              success, and endless blessings.
            </p>
            <p>
              May your hearts always stay full of peace and gratitude. 
              May the light of faith guide you in every step of your journey.
            </p>
            <p className="font-medium text-eid-gold text-2xl mt-8">
              Eid Mubarak to all of you.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/60 text-sm uppercase tracking-widest mb-2">With love and warm wishes,</p>
            <div className="relative inline-block">
              <span className="text-4xl md:text-5xl font-serif font-bold text-eid-gold glow-gold">MUNAZA</span>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-0.5 bg-eid-gold absolute -bottom-2 left-0 shadow-[0_0_10px_#FFD700]"
              />
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Celebration Section */}
      <Section className="bg-gradient-to-b from-transparent to-eid-blue/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onViewportEnter={triggerCelebration}
          className="text-center max-w-2xl px-4 relative"
        >
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-eid-gold/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-eid-green/10 rounded-full blur-3xl animate-pulse" />
          
          <Sparkles className="w-16 h-16 text-eid-gold mx-auto mb-8" />
          <h3 className="text-4xl md:text-5xl font-serif text-eid-gold mb-6 glow-gold">
            A Season of Joy
          </h3>
          <p className="text-xl text-white/80 leading-relaxed italic">
            “May this Eid bring peace to your heart, happiness to your home, and blessings to your life.”
          </p>
          
          <div className="mt-16 grid grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <div className="w-1 h-24 bg-gradient-to-b from-eid-gold/0 via-eid-gold/50 to-eid-gold" />
                <div className="w-8 h-12 bg-eid-gold rounded-t-full rounded-b-lg shadow-[0_0_20px_#FFD700] relative">
                  <div className="absolute inset-0 bg-white/20 rounded-t-full blur-[2px]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Final Message */}
      <Section className="min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-serif text-eid-gold/80 italic mb-4">
            Eid Mubarak from
          </p>
          <h4 className="text-5xl md:text-7xl font-serif font-bold text-eid-gold glow-gold">
            MUNAZA
          </h4>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center bg-black/20 backdrop-blur-sm">
        <p className="text-white/60 font-medium tracking-wide">
          Eid Mubarak • Warm wishes from MUNAZA
        </p>
        <p className="text-white/30 text-xs mt-4 uppercase tracking-widest">
          Created with love by MUNAZA
        </p>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/923086452102"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-eid-green p-4 rounded-full shadow-[0_0_20px_rgba(15,169,88,0.4)] group"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-eid-green text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Send Eid Wishes
        </span>
      </motion.a>
      
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-eid-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-eid-green/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

const TECHS = [
  { name: 'JavaScript', icon: '⚡' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'React', icon: '⚛️' },
  { name: 'WebAssembly', icon: '🔮' },
  { name: 'GitHub Pages', icon: '🚀' },
  { name: 'Stockfish', icon: '♟️' },
];

export default function LogoCloud() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-16 sm:py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-surface-200/40 font-medium uppercase tracking-widest mb-10"
        >
          {t.logoCloud.title}
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-16">
          {TECHS.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl glass hover:bg-white/8 transition-all duration-300 cursor-default group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{tech.icon}</span>
              <span className="text-sm sm:text-base font-semibold text-surface-200/70 group-hover:text-white transition-colors duration-300">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Crown } from 'lucide-react';

export default function CTA() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      {/* BG effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-accent-950/20 to-surface-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-600/10 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative chess piece */}
          <div className="absolute -top-4 -right-4 text-[120px] sm:text-[160px] text-white/[0.02] leading-none select-none pointer-events-none">
            ♛
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-accent-500/25"
          >
            <Crown className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
          >
            {t.cta.title1}
            <br />
            <span className="gradient-text">{t.cta.title2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg text-surface-200/60 max-w-xl mx-auto"
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/curso"
              className="btn-primary px-10 py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 group"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t.cta.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 text-xs text-surface-200/30"
          >
            {t.cta.note}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

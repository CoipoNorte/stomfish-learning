import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Layers } from 'lucide-react';
import ChessBoard from './ChessBoard';
import { useLanguage } from '../context/LanguageContext';

const GITHUB_URL = 'https://github.com/CoipoNorte/stomfish-learning';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-20">
      {/* Ambient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-500/8 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-600/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs sm:text-sm text-surface-200/80 font-medium">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight"
            >
              <span className="text-white">{t.hero.title1} </span>
              <span className="gradient-text">{t.hero.titleHighlight}</span>
              <span className="text-white"> {t.hero.title2}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-surface-200/70 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t.hero.subtitle}{' '}
              <span className="text-accent-400 font-semibold">{t.hero.subtitleHighlight}</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/curso"
                className="btn-primary px-8 py-4 rounded-2xl text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t.hero.cta1}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 glass hover:bg-white/10 transition-all duration-300 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                {t.hero.cta2}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-sm text-surface-200/60">
                <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-accent-400" />
                </div>
                <span><strong className="text-white">45+</strong> {t.hero.stats.lessons}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-surface-200/60">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-brand-400" />
                </div>
                <span><strong className="text-white">8</strong> {t.hero.stats.modules}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-surface-200/60">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <span><strong className="text-white">Open Source</strong></span>
              </div>
            </motion.div>
          </div>

          {/* Right - Chess Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Glow behind board */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-brand-500/20 rounded-3xl blur-[80px] scale-75" />
            
            <div className="relative">
              {/* Floating code snippet */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -right-4 sm:-right-12 top-4 glass-strong rounded-xl p-3 sm:p-4 z-10 animate-float hidden sm:block"
              >
                <pre className="text-xs font-mono text-accent-300">
                  <code>{`const engine = new Stomfish();
engine.setPosition(fen);
const best = engine.search(20);`}</code>
                </pre>
              </motion.div>

              {/* Floating eval bar */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -left-4 sm:-left-16 bottom-12 glass-strong rounded-xl p-3 sm:p-4 z-10 animate-float-delayed hidden sm:block"
              >
                <div className="text-xs text-surface-200/60 mb-1.5">Engine Eval</div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 rounded-full bg-surface-800 overflow-hidden">
                    <div className="h-full w-[65%] bg-gradient-to-r from-accent-500 to-brand-400 rounded-full" />
                  </div>
                  <span className="text-sm font-bold text-white">+1.4</span>
                </div>
              </motion.div>

              <ChessBoard size="lg" animated />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-950 to-transparent" />
    </section>
  );
}

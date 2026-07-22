import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import {
  Download, Terminal, Layout, Puzzle, Palette, Zap,
  Globe, Box, Layers, Code2, MousePointerClick, Sparkles
} from 'lucide-react';

export default function Features() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const FEATURES = [
    { icon: Download, ...t.features.items.download, color: 'from-blue-500 to-cyan-400' },
    { icon: Terminal, ...t.features.items.jsIntegration, color: 'from-violet-500 to-purple-400' },
    { icon: Layout, ...t.features.items.board, color: 'from-emerald-500 to-teal-400' },
    { icon: Puzzle, ...t.features.items.pieces, color: 'from-orange-500 to-amber-400' },
    { icon: MousePointerClick, ...t.features.items.dragDrop, color: 'from-pink-500 to-rose-400' },
    { icon: Sparkles, ...t.features.items.animations, color: 'from-yellow-500 to-orange-400' },
    { icon: Palette, ...t.features.items.themes, color: 'from-indigo-500 to-blue-400' },
    { icon: Layers, ...t.features.items.components, color: 'from-red-500 to-pink-400' },
    { icon: Zap, ...t.features.items.analysis, color: 'from-cyan-500 to-blue-400' },
    { icon: Code2, ...t.features.items.examples, color: 'from-fuchsia-500 to-violet-400' },
    { icon: Box, ...t.features.items.deploy, color: 'from-lime-500 to-green-400' },
    { icon: Globe, ...t.features.items.fullApp, color: 'from-sky-500 to-indigo-400' },
  ];

  return (
    <section id="features" ref={ref} className="py-20 sm:py-32 section-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Puzzle className="w-4 h-4 text-accent-400" />
            <span className="text-xs sm:text-sm text-surface-200/80 font-medium">{t.features.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
          >
            {t.features.title}
            <span className="gradient-text-brand">{t.features.titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-surface-200/60 max-w-2xl mx-auto"
          >
            {t.features.subtitle}
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="glass rounded-2xl p-6 card-hover group cursor-default"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-accent-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-surface-200/50 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

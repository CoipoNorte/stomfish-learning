import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { Heart, GitFork, Users, GitCommit } from 'lucide-react';

const GITHUB_URL = 'https://github.com/CoipoNorte/stomfish-learning';

const CONTRIBUTORS = [
  { initials: 'JM', color: 'from-blue-500 to-cyan-400' },
  { initials: 'SC', color: 'from-violet-500 to-purple-400' },
  { initials: 'AR', color: 'from-emerald-500 to-teal-400' },
  { initials: 'LK', color: 'from-orange-500 to-amber-400' },
  { initials: 'MP', color: 'from-pink-500 to-rose-400' },
  { initials: 'DV', color: 'from-indigo-500 to-blue-400' },
  { initials: '+', color: 'from-surface-700 to-surface-600' },
];

export default function Community() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const STATS = [
    { icon: '⭐', value: '1.2k', label: t.community.stats.stars },
    { icon: GitFork, value: '340', label: t.community.stats.forks },
    { icon: Users, value: '28', label: t.community.stats.contributors },
    { icon: GitCommit, value: '890', label: t.community.stats.commits },
  ];

  return (
    <section id="community" ref={ref} className="py-20 sm:py-32 relative">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-xs sm:text-sm text-surface-200/80 font-medium">{t.community.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
          >
            {t.community.title}
            <span className="gradient-text-brand">{t.community.titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-surface-200/60 max-w-2xl mx-auto"
          >
            {t.community.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-strong rounded-2xl p-8 sm:p-10"
          >
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {STATS.map((stat, i) => {
                const Icon = typeof stat.icon === 'string' ? null : stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
                      {Icon ? (
                        <Icon className="w-6 h-6 text-accent-400" />
                      ) : (
                        <span className="text-2xl">{stat.icon as string}</span>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-surface-200/40 mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contributors */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <div className="text-xs text-surface-200/40 uppercase tracking-wider mb-4">{t.community.stats.contributors}</div>
              <div className="flex items-center gap-3 flex-wrap">
                {CONTRIBUTORS.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                  >
                    {c.initials}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contribute Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 sm:p-10 flex flex-col justify-center"
          >
            <div className="text-5xl mb-6">🤝</div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.community.contribute.title}</h3>
            <p className="text-surface-200/60 leading-relaxed mb-8">
              {t.community.contribute.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </span>
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 glass hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
                Discord
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

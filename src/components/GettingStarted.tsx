import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, GitBranch, Terminal, FileCode, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const GITHUB_URL = 'https://github.com/CoipoNorte/stomfish-learning';

export default function GettingStarted() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();
  const [copied, setCopied] = useState<number | null>(null);

  const STEPS = [
    { icon: GitBranch, ...t.gettingStarted.steps.s1, cmd: 'git clone https://github.com/stomfish/stomfish-learning.git' },
    { icon: Terminal, ...t.gettingStarted.steps.s2, cmd: 'cd stomfish-learning && npm install' },
    { icon: FileCode, ...t.gettingStarted.steps.s3, cmd: 'npm run docs' },
    { icon: Rocket, ...t.gettingStarted.steps.s4, cmd: 'npm run dev' },
  ];

  const copyToClipboard = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="getting-started" ref={ref} className="py-20 sm:py-32 section-gradient relative">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent-600/5 rounded-full blur-[150px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Rocket className="w-4 h-4 text-accent-400" />
            <span className="text-xs sm:text-sm text-surface-200/80 font-medium">{t.gettingStarted.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
          >
            {t.gettingStarted.title}
            <span className="gradient-text-brand">{t.gettingStarted.titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-surface-200/60 max-w-xl mx-auto"
          >
            {t.gettingStarted.subtitle}
          </motion.p>
        </div>

        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass rounded-2xl p-5 sm:p-6 card-hover group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="sm:hidden">
                      <div className="text-xs text-accent-400 font-medium uppercase tracking-wider mb-0.5">
                        Paso {i + 1}
                      </div>
                      <h3 className="text-white font-bold">{step.title}</h3>
                    </div>
                  </div>

                  <div className="flex-1 hidden sm:block">
                    <div className="text-xs text-accent-400 font-medium uppercase tracking-wider mb-0.5">
                      Step {i + 1}
                    </div>
                    <h3 className="text-white font-bold text-lg">{step.title}</h3>
                    <p className="text-sm text-surface-200/50 mt-1">{step.description}</p>
                  </div>

                  <div className="flex-1 sm:max-w-md">
                    <div className="relative">
                      <pre className="bg-surface-900/50 rounded-xl p-4 pr-12 overflow-x-auto">
                        <code className="text-sm font-mono text-accent-300">{step.cmd}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(step.cmd, i)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-lg text-surface-200/40 hover:text-white hover:bg-white/5 transition-all"
                        aria-label="Copy command"
                      >
                        {copied === i ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-surface-200/50 mt-3 sm:hidden">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg group"
          >
            <span className="relative z-10 flex items-center gap-3">
              {t.gettingStarted.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

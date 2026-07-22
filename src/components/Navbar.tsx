import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Crown, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

const GITHUB_URL = 'https://github.com/CoipoNorte/stomfish-learning';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const isLanding = location.pathname === '/';
  const isCourse = location.pathname.startsWith('/curso');

  const NAV_LINKS = isLanding ? [
    { label: t.nav.features, href: '/#features' },
    { label: t.nav.lessons, href: '/curso' },
    { label: t.nav.docs, href: '/#getting-started' },
    { label: t.nav.community, href: '/#community' },
  ] : [
    { label: lang === 'es' ? 'Inicio' : 'Home', href: '/' },
    { label: lang === 'es' ? 'Curso' : 'Course', href: '/curso' },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggleLang = (newLang: Language) => {
    setLang(newLang);
    setLangOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isCourse
            ? 'glass-strong shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center shadow-lg shadow-accent-500/25 group-hover:shadow-accent-500/40 transition-shadow duration-300">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-none tracking-tight">
                  Stomfish
                </span>
                <span className="text-[10px] text-surface-200/60 font-medium tracking-widest uppercase">
                  Learning
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                link.href.startsWith('/') && !link.href.includes('#') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-4 py-2 text-sm text-surface-200/80 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 text-sm text-surface-200/80 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>

            {/* Desktop CTA + Language */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-surface-200/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase font-medium">{lang}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 glass-strong rounded-xl overflow-hidden min-w-[120px] shadow-xl"
                    >
                      <button
                        onClick={() => toggleLang('es')}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${lang === 'es' ? 'text-accent-400' : 'text-surface-200/70'}`}
                      >
                        <span>🇪🇸</span> Español
                      </button>
                      <button
                        onClick={() => toggleLang('en')}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${lang === 'en' ? 'text-accent-400' : 'text-surface-200/70'}`}
                      >
                        <span>🇺🇸</span> English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* GitHub */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-surface-200/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>

              <Link
                to="/curso"
                className="btn-primary px-5 py-2.5 rounded-xl text-white text-sm font-semibold relative z-10"
              >
                <span className="relative z-10">{t.nav.startLearning}</span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="p-2 text-surface-200/70 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-surface-200/80 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface-950/98 backdrop-blur-xl md:hidden pt-20"
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {NAV_LINKS.map((link, i) => (
                link.href.startsWith('/') && !link.href.includes('#') ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      to={link.href}
                      className="block w-full text-center py-4 text-lg text-surface-200 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full text-center py-4 text-lg text-surface-200 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </motion.a>
                )
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex gap-3 mt-4"
              >
                <button
                  onClick={() => toggleLang('es')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${lang === 'es' ? 'bg-accent-500/20 text-accent-400' : 'glass text-surface-200/60'}`}
                >
                  🇪🇸 Español
                </button>
                <button
                  onClick={() => toggleLang('en')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${lang === 'en' ? 'bg-accent-500/20 text-accent-400' : 'glass text-surface-200/60'}`}
                >
                  🇺🇸 English
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full mt-4"
              >
                <Link
                  to="/curso"
                  className="block w-full btn-primary py-4 rounded-xl text-white text-lg font-semibold text-center"
                >
                  <span className="relative z-10">{t.nav.startLearning}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

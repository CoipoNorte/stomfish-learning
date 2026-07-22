import { Crown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GITHUB_URL = 'https://github.com/CoipoNorte/stomfish-learning';

export default function Footer() {
  const { t } = useLanguage();

  const LINKS = {
    [t.footer.product]: [
      { label: t.footer.links.features, href: '#features' },
      { label: t.footer.links.lessons, href: '#roadmap' },
      { label: t.footer.links.roadmap, href: '#roadmap' },
      { label: t.footer.links.changelog, href: GITHUB_URL + '/releases' },
    ],
    [t.footer.resources]: [
      { label: t.footer.links.gettingStarted, href: '#getting-started' },
      { label: t.footer.links.apiReference, href: GITHUB_URL + '/wiki' },
      { label: t.footer.links.examples, href: GITHUB_URL + '/tree/main/examples' },
      { label: t.footer.links.blog, href: '#' },
    ],
    [t.footer.community]: [
      { label: t.footer.links.github, href: GITHUB_URL },
      { label: t.footer.links.discord, href: '#' },
      { label: t.footer.links.contributing, href: GITHUB_URL + '/blob/main/CONTRIBUTING.md' },
      { label: t.footer.links.codeOfConduct, href: GITHUB_URL + '/blob/main/CODE_OF_CONDUCT.md' },
    ],
  };

  return (
    <footer className="border-t border-white/5 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 group mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center shadow-lg shadow-accent-500/25">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-none tracking-tight">Stomfish</span>
                <span className="text-[10px] text-surface-200/60 font-medium tracking-widest uppercase">Learning</span>
              </div>
            </a>
            <p className="text-sm text-surface-200/40 leading-relaxed max-w-xs mb-6">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              {/* GitHub */}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-surface-200/40 hover:text-white hover:bg-white/10 transition-all duration-200" aria-label="GitHub">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-surface-200/40 hover:text-white hover:bg-white/10 transition-all duration-200" aria-label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Discord */}
              <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-surface-200/40 hover:text-white hover:bg-white/10 transition-all duration-200" aria-label="Discord">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-surface-200/40 hover:text-accent-300 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-200/30">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-surface-200/20">{t.footer.madeWith}</span>
            <span className="text-sm">♟️</span>
            <span className="text-xs text-surface-200/20">&</span>
            <span className="text-sm">💜</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

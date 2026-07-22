import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { Monitor, Code2, Eye } from 'lucide-react';

const CODE_EXAMPLE = `import { StomfishBoard } from 'stomfish';

// Initialize the board with default position
const board = new StomfishBoard({
  container: '#chess-app',
  theme: 'classic',
  pieces: 'merida',
  animation: { duration: 200 },
  coordinates: true,
});

// Connect the Stomfish engine
board.connectEngine({
  depth: 20,
  showArrows: true,
  showEval: true,
});

// Listen for moves
board.on('move', (move) => {
  console.log(\`\${move.san} played!\`);
  board.engine.analyze();
});`;

export default function Showcase() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('board');

  const TABS = [
    { id: 'board', label: t.showcase.tabs.board, icon: Monitor },
    { id: 'code', label: t.showcase.tabs.code, icon: Code2 },
    { id: 'output', label: t.showcase.tabs.preview, icon: Eye },
  ];

  return (
    <section ref={ref} className="py-20 sm:py-32 section-gradient relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-accent-600/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Code2 className="w-4 h-4 text-accent-400" />
            <span className="text-xs sm:text-sm text-surface-200/80 font-medium">{t.showcase.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
          >
            {t.showcase.title}
            <span className="gradient-text-brand">{t.showcase.titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-surface-200/60 max-w-2xl mx-auto"
          >
            {t.showcase.subtitle}
          </motion.p>
        </div>

        {/* Interactive Demo Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-accent-500/20 text-accent-300'
                          : 'text-surface-200/50 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-surface-200/30 font-mono hidden sm:block">stomfish-app.tsx</div>
            </div>

            {/* Content area */}
            <div className="min-h-[400px] sm:min-h-[450px]">
              <AnimatePresence mode="wait">
                {activeTab === 'code' && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-6"
                  >
                    <pre className="text-xs sm:text-sm font-mono text-surface-200/80 leading-relaxed overflow-x-auto">
                      {CODE_EXAMPLE.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="text-surface-200/20 w-8 shrink-0 select-none text-right mr-4">
                            {i + 1}
                          </span>
                          <code
                            className="whitespace-pre"
                            dangerouslySetInnerHTML={{
                              __html: highlightSyntax(line),
                            }}
                          />
                        </div>
                      ))}
                    </pre>
                  </motion.div>
                )}

                {activeTab === 'board' && (
                  <motion.div
                    key="board"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 sm:p-8 flex items-center justify-center"
                  >
                    <div className="w-full max-w-sm">
                      <MiniBoard />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'output' && (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 sm:p-8"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 glass rounded-xl p-4">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-surface-200/70 font-mono">{t.showcase.engineConnected}</span>
                      </div>
                      <div className="glass rounded-xl p-4 space-y-3">
                        <div className="text-xs text-surface-200/40 uppercase tracking-wider">{t.showcase.liveEval}</div>
                        <div className="flex items-center gap-3">
                          <div className="w-full h-4 rounded-full bg-surface-800 overflow-hidden">
                            <motion.div
                              initial={{ width: '50%' }}
                              animate={{ width: '62%' }}
                              transition={{ duration: 2, ease: 'easeInOut' }}
                              className="h-full bg-gradient-to-r from-white to-surface-200 rounded-full"
                            />
                          </div>
                          <span className="text-lg font-bold font-mono text-white">+0.8</span>
                        </div>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <div className="text-xs text-surface-200/40 uppercase tracking-wider mb-3">{t.showcase.moveHistory}</div>
                        <div className="flex flex-wrap gap-2">
                          {['1. e4', 'e5', '2. Nf3', 'Nc6', '3. Bb5', 'a6', '4. Ba4', 'Nf6'].map((m, i) => (
                            <span key={i} className={`px-2 py-1 rounded text-xs font-mono ${
                              i % 2 === 0 ? 'text-white bg-white/10' : 'text-surface-200/60'
                            }`}>
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <div className="text-xs text-surface-200/40 uppercase tracking-wider mb-2">{t.showcase.bestLine}</div>
                        <div className="text-sm font-mono text-accent-300">
                          5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function highlightSyntax(line: string): string {
  return line
    .replace(/\/\/.*/g, '<span class="text-surface-200/30">$&</span>')
    .replace(/('.*?'|`.*?`)/g, '<span class="text-green-400/80">$&</span>')
    .replace(/\b(import|from|const|new|true|false)\b/g, '<span class="text-accent-400">$&</span>')
    .replace(/\b(console|log)\b/g, '<span class="text-brand-400">$&</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$&</span>');
}

function MiniBoard() {
  const pieces: Record<string, string> = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
  };
  const board = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-xl">
      {board.map((row, r) => (
        <div key={r} className="flex">
          {row.map((piece, c) => {
            const isLight = (r + c) % 2 === 0;
            return (
              <div
                key={`${r}-${c}`}
                className={`w-full aspect-square flex items-center justify-center text-xl sm:text-2xl ${
                  isLight ? 'bg-chess-light' : 'bg-chess-dark'
                } hover:brightness-110 transition-all duration-200 cursor-pointer`}
              >
                {piece && (
                  <span style={{
                    color: piece === piece.toUpperCase() ? '#fff' : '#1a1a1a',
                    textShadow: piece === piece.toUpperCase()
                      ? '0 0 2px rgba(0,0,0,0.8)'
                      : '0 0 2px rgba(255,255,255,0.3)',
                  }}>
                    {pieces[piece]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

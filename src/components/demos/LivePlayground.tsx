import { useState, useEffect } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { DemoBoard } from './DemoBoard';

interface PlaygroundProps {
  initialFen?: string;
  title?: string;
}

export function LivePlayground({ 
  initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  title = 'Playground'
}: PlaygroundProps) {
  const [fen, setFen] = useState(initialFen);
  const [moves, setMoves] = useState<string[]>([]);
  const [theme, setTheme] = useState<'classic' | 'blue' | 'green'>('classic');
  const [showCoords, setShowCoords] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const DEMO_MOVES = [
    { from: 'e2', to: 'e4' },
    { from: 'e7', to: 'e5' },
    { from: 'g1', to: 'f3' },
    { from: 'b8', to: 'c6' },
    { from: 'f1', to: 'b5' },
  ];

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      if (moves.length < DEMO_MOVES.length) {
        const move = DEMO_MOVES[moves.length];
        setMoves(prev => [...prev, `${move.from}-${move.to}`]);
      } else {
        setAutoPlay(false);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [autoPlay, moves.length]);

  const handleMove = (from: string, to: string) => {
    setMoves(prev => [...prev, `${from}-${to}`]);
  };

  const reset = () => {
    setFen(initialFen);
    setMoves([]);
    setAutoPlay(false);
  };

  return (
    <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between">
        <span className="font-semibold text-white flex items-center gap-2">
          <span className="text-lg">🎮</span> {title}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`p-2 rounded-lg transition-colors ${
              autoPlay ? 'bg-yellow-500/20 text-yellow-400' : 'bg-zinc-700 text-zinc-400 hover:text-white'
            }`}
          >
            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-lg bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-6">
        {/* Board */}
        <div className="flex justify-center">
          <DemoBoard
            fen={fen}
            theme={theme}
            showCoordinates={showCoords}
            interactive={!autoPlay}
            size="md"
            onMove={handleMove}
          />
        </div>

        {/* Controls & Info */}
        <div className="space-y-4">
          {/* Theme selector */}
          <div>
            <label className="text-xs text-zinc-500 mb-2 block">Tema</label>
            <div className="flex gap-2">
              {(['classic', 'blue', 'green'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                    theme === t ? 'bg-accent-500 text-white' : 'bg-zinc-700 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCoords}
              onChange={e => setShowCoords(e.target.checked)}
              className="rounded bg-zinc-700 border-zinc-600 text-accent-500"
            />
            <span className="text-sm text-zinc-400">Mostrar coordenadas</span>
          </label>

          {/* Move history */}
          <div>
            <label className="text-xs text-zinc-500 mb-2 block">Movimientos</label>
            <div className="bg-zinc-900 rounded-lg p-3 min-h-[80px] max-h-[120px] overflow-y-auto">
              {moves.length === 0 ? (
                <span className="text-zinc-600 text-sm">Arrastra piezas o presiona play...</span>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {moves.map((move, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300"
                    >
                      {Math.floor(i / 2) + 1}{i % 2 === 0 ? '.' : '...'}{move}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FEN display */}
          <div>
            <label className="text-xs text-zinc-500 mb-2 block">FEN</label>
            <div className="bg-zinc-900 rounded-lg p-2 font-mono text-xs text-accent-400 break-all">
              {fen}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

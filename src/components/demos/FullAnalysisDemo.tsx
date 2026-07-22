import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX } from 'lucide-react';
import { DemoBoard } from './DemoBoard';
import { DemoEvalBar } from './DemoEvalBar';

const GAME_POSITIONS = [
  { fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', eval: 20, move: null },
  { fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1', eval: 25, move: 'e4' },
  { fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2', eval: 30, move: 'e5' },
  { fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2', eval: 45, move: 'Nf3' },
  { fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', eval: 35, move: 'Nc6' },
  { fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3', eval: 50, move: 'Bb5' },
  { fen: 'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', eval: 40, move: 'a6' },
];

export function FullAnalysisDemo() {
  const [posIndex, setPosIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [depth, setDepth] = useState(20);
  const [multiPV, setMultiPV] = useState(1);

  const pos = GAME_POSITIONS[posIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setPosIndex(prev => {
        if (prev >= GAME_POSITIONS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const reset = () => {
    setPosIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg">🔬</span>
          <span className="font-semibold">Análisis Completo</span>
          <span className="text-xs text-zinc-500 bg-zinc-700 px-2 py-0.5 rounded">
            Ruy López
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg ${soundEnabled ? 'text-accent-400' : 'text-zinc-500'}`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg ${showSettings ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="px-4 py-3 bg-zinc-900/50 border-b border-zinc-700 flex gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Profundidad:</span>
            <input
              type="range"
              min="10"
              max="30"
              value={depth}
              onChange={e => setDepth(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm font-mono w-6">{depth}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Multi-PV:</span>
            <select
              value={multiPV}
              onChange={e => setMultiPV(Number(e.target.value))}
              className="bg-zinc-800 rounded px-2 py-1 text-sm"
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
      )}

      <div className="p-4 lg:p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Eval bar + Board */}
          <div className="lg:col-span-2 flex gap-3 justify-center">
            <DemoEvalBar initialScore={pos.eval} animated={false} />
            <DemoBoard
              fen={pos.fen}
              size="md"
              arrows={posIndex > 0 ? [{ from: 'e2', to: 'e4', color: '#15803d' }] : []}
            />
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            {/* Engine info */}
            <div className="bg-zinc-900 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-zinc-600'}`} />
                <span className="text-sm text-zinc-400">Stockfish 16 NNUE</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center mb-4">
                <div>
                  <div className="text-xl font-bold font-mono">
                    {pos.eval > 0 ? '+' : ''}{(pos.eval / 100).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-zinc-500">EVAL</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono">{depth}</div>
                  <div className="text-[10px] text-zinc-500">DEPTH</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono">1.2M</div>
                  <div className="text-[10px] text-zinc-500">NPS</div>
                </div>
              </div>

              {/* Best lines */}
              <div className="text-xs text-zinc-500 mb-2">Mejores líneas</div>
              <div className="space-y-2">
                {Array.from({ length: multiPV }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className={`font-mono ${i === 0 ? 'text-green-400' : 'text-zinc-400'}`}>
                      {i === 0 ? '+0.45' : i === 1 ? '+0.30' : '+0.15'}
                    </span>
                    <span className="text-zinc-300 font-mono text-xs">
                      {i === 0 ? 'Nf3 Nc6 Bb5 a6' : i === 1 ? 'd4 exd4 Qxd4' : 'Bc4 Nf6 d3'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Move list */}
            <div className="bg-zinc-900 rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-2">Movimientos</div>
              <div className="flex flex-wrap gap-1.5">
                {GAME_POSITIONS.slice(1).map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPosIndex(i + 1)}
                    className={`px-2 py-1 rounded text-xs font-mono ${
                      posIndex === i + 1 
                        ? 'bg-accent-600 text-white' 
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {i % 2 === 0 ? `${Math.floor(i / 2) + 1}. ` : ''}{p.move}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-zinc-700">
          <button
            onClick={reset}
            className="p-2 rounded-lg bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={() => setPosIndex(Math.max(0, posIndex - 1))}
            disabled={posIndex === 0}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-zinc-400 hover:text-white disabled:opacity-50"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
              isPlaying ? 'bg-yellow-600' : 'bg-accent-600'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </button>
          <button
            onClick={() => setPosIndex(Math.min(GAME_POSITIONS.length - 1, posIndex + 1))}
            disabled={posIndex >= GAME_POSITIONS.length - 1}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-zinc-400 hover:text-white disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

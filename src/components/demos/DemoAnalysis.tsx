import { useState, useEffect } from 'react';
import { DemoBoard } from './DemoBoard';
import { DemoEvalBar } from './DemoEvalBar';

const ANALYSIS_POSITIONS = [
  {
    name: 'Posición inicial',
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    eval: 20,
    bestMove: { from: 'e2', to: 'e4' },
    pv: ['e2e4', 'e7e5', 'g1f3', 'b8c6'],
  },
  {
    name: 'Apertura Italiana',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    eval: 35,
    bestMove: { from: 'g8', to: 'f6' },
    pv: ['g8f6', 'b1c3', 'f8e7', 'O-O'],
  },
  {
    name: 'Medio juego',
    fen: 'r2q1rk1/ppp2ppp/2n1bn2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 8',
    eval: -45,
    bestMove: { from: 'd4', to: 'e5' },
    pv: ['d4e5', 'f6e4', 'c3e4', 'd5e4'],
  },
  {
    name: 'Ventaja decisiva',
    fen: 'r1b2rk1/pp3ppp/2p5/3pP3/1b1Pn3/2NB4/PP3PPP/R1BQ1RK1 w - - 0 12',
    eval: 285,
    bestMove: { from: 'd3', to: 'h7' },
    pv: ['d3h7', 'g8h7', 'd1h5', 'h7g8', 'h5f7'],
  },
];

export function DemoAnalysis() {
  const [posIndex, setPosIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [depth, setDepth] = useState(0);
  const [displayedEval, setDisplayedEval] = useState(0);

  const position = ANALYSIS_POSITIONS[posIndex];

  useEffect(() => {
    if (!isAnalyzing) {
      setDepth(0);
      setDisplayedEval(0);
      return;
    }

    const interval = setInterval(() => {
      setDepth(d => {
        if (d >= 20) {
          setIsAnalyzing(false);
          return 20;
        }
        // Simular evaluación que converge
        const progress = (d + 1) / 20;
        const noise = (Math.random() - 0.5) * 50 * (1 - progress);
        setDisplayedEval(Math.round(position.eval * progress + noise));
        return d + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isAnalyzing, position.eval]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setDepth(0);
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Selector de posición */}
      <div className="flex flex-wrap gap-2">
        {ANALYSIS_POSITIONS.map((pos, i) => (
          <button
            key={i}
            onClick={() => {
              setPosIndex(i);
              setIsAnalyzing(false);
              setDepth(0);
              setDisplayedEval(0);
            }}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              posIndex === i
                ? 'bg-accent-600 text-white'
                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
            }`}
          >
            {pos.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tablero con eval bar */}
        <div className="flex gap-3 justify-center">
          <DemoEvalBar initialScore={displayedEval} animated={false} />
          <DemoBoard 
            fen={position.fen}
            size="md"
            arrows={depth > 5 ? [{ ...position.bestMove, color: '#15803d' }] : []}
          />
        </div>

        {/* Panel de análisis */}
        <div className="flex-1 space-y-4">
          {/* Controles */}
          <div className="flex gap-3">
            <button
              onClick={isAnalyzing ? stopAnalysis : startAnalysis}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                isAnalyzing 
                  ? 'bg-red-600 hover:bg-red-500' 
                  : 'bg-green-600 hover:bg-green-500'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Detener
                </>
              ) : (
                <>▶ Analizar</>
              )}
            </button>
          </div>

          {/* Info del análisis */}
          <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold font-mono">
                  {depth > 0 ? (displayedEval > 0 ? '+' : '') + (displayedEval / 100).toFixed(2) : '—'}
                </div>
                <div className="text-xs text-zinc-500">Evaluación</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono">{depth}</div>
                <div className="text-xs text-zinc-500">Profundidad</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono">
                  {depth > 0 ? `${(depth * 50000).toLocaleString()}` : '—'}
                </div>
                <div className="text-xs text-zinc-500">Nodos/s</div>
              </div>
            </div>

            {depth > 5 && (
              <div className="border-t border-zinc-700 pt-3">
                <div className="text-xs text-zinc-500 mb-1">Mejor línea</div>
                <div className="font-mono text-sm text-accent-400">
                  {position.pv.slice(0, 4).join(' ')}
                </div>
              </div>
            )}
          </div>

          {/* Código */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Comando UCI</label>
            <pre className="bg-zinc-800 rounded-lg p-3 text-xs font-mono overflow-x-auto">
              <code className="text-green-400">{`position fen ${position.fen}
go depth 20`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

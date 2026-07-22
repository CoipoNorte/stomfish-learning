import { useState } from 'react';
import { DemoBoard } from './DemoBoard';

export function DemoDragDrop() {
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);

  const handleMove = (from: string, to: string) => {
    const moveNotation = `${from}-${to}`;
    setMoveHistory(prev => [...prev, moveNotation]);
    setLastMove({ from, to });
    
    // Nota: En una implementación real usaríamos chess.js para actualizar el FEN
    // Aquí solo mostramos el movimiento visualmente
  };

  const resetBoard = () => {
    setFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    setMoveHistory([]);
    setLastMove(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-accent-500/10 border border-accent-500/30 rounded-lg p-4 text-sm">
        <strong className="text-accent-400">💡 Interactivo:</strong> Arrastra las piezas para moverlas. 
        Los movimientos se registran abajo.
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tablero interactivo */}
        <div className="flex justify-center">
          <DemoBoard 
            fen={fen}
            interactive={true}
            size="md"
            highlightSquares={lastMove ? [lastMove.from, lastMove.to] : []}
            onMove={handleMove}
          />
        </div>

        {/* Panel de información */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-zinc-400">Historial de movimientos</label>
              <button
                onClick={resetBoard}
                className="text-xs text-accent-400 hover:text-accent-300"
              >
                Reiniciar
              </button>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4 min-h-[100px] max-h-[200px] overflow-y-auto">
              {moveHistory.length === 0 ? (
                <span className="text-zinc-500 text-sm">Arrastra una pieza para comenzar...</span>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {moveHistory.map((move, i) => (
                    <span 
                      key={i}
                      className={`px-2 py-1 rounded text-sm font-mono ${
                        i % 2 === 0 ? 'bg-white/10 text-white' : 'bg-zinc-700 text-zinc-300'
                      }`}
                    >
                      {Math.floor(i / 2) + 1}.{i % 2 === 0 ? '' : '..'} {move}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Código de ejemplo */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Implementación</label>
            <pre className="bg-zinc-800 rounded-lg p-4 text-xs font-mono overflow-x-auto">
              <code className="text-green-400">{`// Hook para drag & drop
const handleMouseDown = (piece, square, e) => {
  setDragging({ piece, from: square });
  setPosition({ x: e.clientX, y: e.clientY });
};

const handleMouseUp = (e) => {
  const toSquare = getSquareFromPoint(e);
  if (dragging && toSquare) {
    onMove(dragging.from, toSquare);
  }
  setDragging(null);
};`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

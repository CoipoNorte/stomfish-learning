import { useState, useEffect } from 'react';

const PIECES: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
};

const INITIAL_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const DEMO_MOVES = [
  { from: [6, 4], to: [4, 4] },
  { from: [1, 4], to: [3, 4] },
  { from: [7, 6], to: [5, 5] },
  { from: [0, 1], to: [2, 2] },
  { from: [7, 5], to: [4, 2] },
  { from: [1, 3], to: [2, 3] },
  { from: [6, 3], to: [5, 3] },
  { from: [0, 2], to: [3, 5] },
];

interface ChessBoardProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

export default function ChessBoard({ size = 'md', animated = true, className = '' }: ChessBoardProps) {
  const [board, setBoard] = useState(INITIAL_BOARD.map(r => [...r]));
  const [, setMoveIndex] = useState(0);
  const [highlight, setHighlight] = useState<number[][]>([]);
  const [hoveredSquare, setHoveredSquare] = useState<number[] | null>(null);

  const cellSize = size === 'sm' ? 'w-7 h-7 sm:w-8 sm:h-8' : size === 'md' ? 'w-9 h-9 sm:w-11 sm:h-11' : 'w-11 h-11 sm:w-14 sm:h-14';
  const fontSize = size === 'sm' ? 'text-lg sm:text-xl' : size === 'md' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl';

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      setMoveIndex(prev => {
        const next = prev + 1;
        if (next >= DEMO_MOVES.length) {
          setBoard(INITIAL_BOARD.map(r => [...r]));
          setHighlight([]);
          return 0;
        }
        const move = DEMO_MOVES[prev];
        setBoard(prevBoard => {
          const newBoard = prevBoard.map(r => [...r]);
          const piece = newBoard[move.from[0]][move.from[1]];
          newBoard[move.from[0]][move.from[1]] = '';
          newBoard[move.to[0]][move.to[1]] = piece;
          return newBoard;
        });
        setHighlight([move.from, move.to]);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [animated]);

  const isHighlighted = (r: number, c: number) =>
    highlight.some(h => h[0] === r && h[1] === c);

  const isHovered = (r: number, c: number) =>
    hoveredSquare?.[0] === r && hoveredSquare?.[1] === c;

  return (
    <div className={`inline-block rounded-xl overflow-hidden shadow-2xl shadow-black/50 ${className}`}>
      <div className="p-1 bg-surface-800/80 rounded-xl">
        {board.map((row, r) => (
          <div key={r} className="flex">
            {row.map((piece, c) => {
              const isLight = (r + c) % 2 === 0;
              const highlighted = isHighlighted(r, c);
              const hovered = isHovered(r, c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={`${cellSize} flex items-center justify-center relative cursor-pointer transition-all duration-300 ${
                    highlighted
                      ? 'bg-yellow-400/40'
                      : hovered
                      ? isLight ? 'bg-amber-200' : 'bg-amber-600'
                      : isLight
                      ? 'bg-chess-light'
                      : 'bg-chess-dark'
                  }`}
                  onMouseEnter={() => setHoveredSquare([r, c])}
                  onMouseLeave={() => setHoveredSquare(null)}
                >
                  {piece && (
                    <span
                      className={`${fontSize} select-none transition-transform duration-300 ${
                        hovered ? 'scale-110' : ''
                      } ${
                        piece === piece.toUpperCase() ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]' : 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]'
                      }`}
                      style={{
                        color: piece === piece.toUpperCase() ? '#ffffff' : '#1a1a1a',
                        textShadow: piece === piece.toUpperCase()
                          ? '0 0 2px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.5)'
                          : '0 0 2px rgba(255,255,255,0.3)',
                      }}
                    >
                      {PIECES[piece]}
                    </span>
                  )}
                  {highlighted && (
                    <div className="absolute inset-0 border-2 border-yellow-400/60 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

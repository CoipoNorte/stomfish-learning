import { useState, useEffect } from 'react';

const PIECES: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
};

interface DemoBoardProps {
  fen?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  showCoordinates?: boolean;
  highlightSquares?: string[];
  arrows?: Array<{ from: string; to: string; color?: string }>;
  theme?: 'classic' | 'blue' | 'green';
  onSquareClick?: (square: string) => void;
  onMove?: (from: string, to: string) => void;
}

const THEMES = {
  classic: { light: '#f0d9b5', dark: '#b58863' },
  blue: { light: '#dee3e6', dark: '#8ca2ad' },
  green: { light: '#ffffdd', dark: '#86a666' },
};

function parseFEN(fen: string): (string | null)[][] {
  const board: (string | null)[][] = [];
  const rows = fen.split(' ')[0].split('/');
  
  for (const row of rows) {
    const boardRow: (string | null)[] = [];
    for (const char of row) {
      if (char >= '1' && char <= '8') {
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push(null);
        }
      } else {
        boardRow.push(char);
      }
    }
    board.push(boardRow);
  }
  return board;
}

function squareToCoords(square: string): { row: number; col: number } {
  const col = square.charCodeAt(0) - 97;
  const row = 8 - parseInt(square[1]);
  return { row, col };
}

export function DemoBoard({
  fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  size = 'md',
  interactive = false,
  showCoordinates = true,
  highlightSquares = [],
  arrows = [],
  theme = 'classic',
  onSquareClick,
  onMove,
}: DemoBoardProps) {
  const [board, setBoard] = useState(() => parseFEN(fen));
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [dragPiece, setDragPiece] = useState<{ piece: string; x: number; y: number } | null>(null);

  useEffect(() => {
    setBoard(parseFEN(fen));
  }, [fen]);

  const cellSize = size === 'sm' ? 32 : size === 'md' ? 44 : 56;
  const boardSize = cellSize * 8;
  const colors = THEMES[theme];

  const toSquare = (row: number, col: number): string => {
    return String.fromCharCode(97 + col) + (8 - row);
  };

  const handleSquareClick = (row: number, col: number) => {
    const square = toSquare(row, col);
    const piece = board[row][col];

    if (selectedSquare) {
      if (selectedSquare !== square && onMove) {
        onMove(selectedSquare, square);
      }
      setSelectedSquare(null);
    } else if (piece && interactive) {
      setSelectedSquare(square);
    }

    onSquareClick?.(square);
  };

  const handleMouseDown = (row: number, col: number, e: React.MouseEvent) => {
    if (!interactive) return;
    const piece = board[row][col];
    if (!piece) return;

    e.preventDefault();
    setSelectedSquare(toSquare(row, col));
    setDragPiece({ piece, x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragPiece) {
      setDragPiece({ ...dragPiece, x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragPiece && selectedSquare) {
      const boardRect = e.currentTarget.getBoundingClientRect();
      const col = Math.floor((e.clientX - boardRect.left) / cellSize);
      const row = Math.floor((e.clientY - boardRect.top) / cellSize);
      
      if (col >= 0 && col < 8 && row >= 0 && row < 8) {
        const toSq = toSquare(row, col);
        if (selectedSquare !== toSq) {
          // Mover pieza visualmente
          const newBoard = board.map(r => [...r]);
          const fromCoords = squareToCoords(selectedSquare);
          const piece = newBoard[fromCoords.row][fromCoords.col];
          newBoard[fromCoords.row][fromCoords.col] = null;
          newBoard[row][col] = piece;
          setBoard(newBoard);
          onMove?.(selectedSquare, toSq);
        }
      }
    }
    setDragPiece(null);
    setSelectedSquare(null);
  };

  const isHighlighted = (row: number, col: number) => {
    const square = toSquare(row, col);
    return highlightSquares.includes(square);
  };

  const isSelected = (row: number, col: number) => {
    return selectedSquare === toSquare(row, col);
  };

  return (
    <div className="inline-block">
      <div 
        className="relative select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ width: boardSize + (showCoordinates ? 20 : 0), height: boardSize + (showCoordinates ? 20 : 0) }}
      >
        {/* Coordenadas */}
        {showCoordinates && (
          <>
            <div className="absolute left-0 top-5 flex flex-col" style={{ width: 20, height: boardSize }}>
              {[8,7,6,5,4,3,2,1].map(n => (
                <div key={n} className="flex-1 flex items-center justify-center text-xs text-zinc-500">
                  {n}
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-5 flex" style={{ width: boardSize, height: 20 }}>
              {['a','b','c','d','e','f','g','h'].map(l => (
                <div key={l} className="flex-1 flex items-center justify-center text-xs text-zinc-500">
                  {l}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Tablero */}
        <div 
          className="absolute rounded-lg overflow-hidden shadow-xl"
          style={{ 
            top: showCoordinates ? 0 : 0, 
            left: showCoordinates ? 20 : 0,
            width: boardSize,
            height: boardSize,
          }}
        >
          {board.map((row, r) => (
            <div key={r} className="flex">
              {row.map((piece, c) => {
                const isLight = (r + c) % 2 === 0;
                const highlighted = isHighlighted(r, c);
                const selected = isSelected(r, c);
                const isDragOrigin = dragPiece && selected;

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`flex items-center justify-center transition-colors duration-150 ${
                      interactive ? 'cursor-pointer hover:brightness-110' : ''
                    }`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: selected 
                        ? 'rgba(255, 255, 0, 0.5)' 
                        : highlighted 
                        ? 'rgba(255, 255, 0, 0.3)' 
                        : isLight ? colors.light : colors.dark,
                    }}
                    onClick={() => handleSquareClick(r, c)}
                    onMouseDown={(e) => handleMouseDown(r, c, e)}
                  >
                    {piece && !isDragOrigin && (
                      <span
                        className="transition-transform duration-150"
                        style={{
                          fontSize: cellSize * 0.7,
                          color: piece === piece.toUpperCase() ? '#fff' : '#000',
                          textShadow: piece === piece.toUpperCase()
                            ? '0 1px 2px rgba(0,0,0,0.8)'
                            : '0 1px 2px rgba(255,255,255,0.3)',
                        }}
                      >
                        {PIECES[piece]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Flechas SVG */}
          {arrows.length > 0 && (
            <svg 
              className="absolute inset-0 pointer-events-none"
              width={boardSize}
              height={boardSize}
            >
              {arrows.map((arrow, i) => {
                const from = squareToCoords(arrow.from);
                const to = squareToCoords(arrow.to);
                const x1 = from.col * cellSize + cellSize / 2;
                const y1 = from.row * cellSize + cellSize / 2;
                const x2 = to.col * cellSize + cellSize / 2;
                const y2 = to.row * cellSize + cellSize / 2;
                const color = arrow.color || '#15803d';

                return (
                  <g key={i} opacity="0.8">
                    <line
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={color}
                      strokeWidth={cellSize * 0.15}
                      strokeLinecap="round"
                      markerEnd="url(#arrowhead)"
                    />
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill={color} />
                      </marker>
                    </defs>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Pieza siendo arrastrada */}
        {dragPiece && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: dragPiece.x,
              top: dragPiece.y,
              transform: 'translate(-50%, -50%)',
              fontSize: cellSize * 0.8,
              color: dragPiece.piece === dragPiece.piece.toUpperCase() ? '#fff' : '#000',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {PIECES[dragPiece.piece]}
          </div>
        )}
      </div>
    </div>
  );
}

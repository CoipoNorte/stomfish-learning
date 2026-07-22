import { useState } from 'react';

interface MiniSquareProps {
  isLight?: boolean;
  piece?: string;
  highlighted?: boolean;
  selected?: boolean;
  showMove?: boolean;
  coordinate?: string;
  size?: number;
  onClick?: () => void;
}

const PIECES: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
};

export function MiniSquare({ 
  isLight = true, 
  piece, 
  highlighted = false,
  selected = false,
  showMove = false,
  coordinate,
  size = 60,
  onClick 
}: MiniSquareProps) {
  const isWhitePiece = piece ? piece === piece.toUpperCase() : false;

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-center relative cursor-pointer
        transition-all duration-200 hover:brightness-110
      `}
      style={{
        width: size,
        height: size,
        backgroundColor: selected 
          ? 'rgba(255, 255, 0, 0.5)' 
          : highlighted 
          ? 'rgba(255, 255, 0, 0.3)' 
          : isLight ? '#f0d9b5' : '#b58863',
      }}
    >
      {piece && (
        <span
          style={{
            fontSize: size * 0.7,
            color: isWhitePiece ? '#fff' : '#000',
            textShadow: isWhitePiece ? '0 1px 2px rgba(0,0,0,0.8)' : '0 1px 2px rgba(255,255,255,0.3)',
          }}
        >
          {PIECES[piece]}
        </span>
      )}
      
      {showMove && !piece && (
        <div 
          className="rounded-full bg-black/20"
          style={{ width: size * 0.3, height: size * 0.3 }}
        />
      )}
      
      {coordinate && (
        <span className="absolute bottom-0.5 right-1 text-[8px] opacity-50">
          {coordinate}
        </span>
      )}
    </div>
  );
}

export function SquareDemo() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="text-sm text-zinc-400 mb-2">Haz clic en las casillas:</div>
      <div className="flex gap-2 flex-wrap">
        <MiniSquare 
          isLight 
          coordinate="a1" 
          selected={selected === 0}
          onClick={() => setSelected(0)}
        />
        <MiniSquare 
          isLight={false} 
          coordinate="b1" 
          piece="N"
          selected={selected === 1}
          onClick={() => setSelected(1)}
        />
        <MiniSquare 
          isLight 
          coordinate="c1" 
          piece="B"
          highlighted
          selected={selected === 2}
          onClick={() => setSelected(2)}
        />
        <MiniSquare 
          isLight={false} 
          coordinate="d1" 
          showMove
          selected={selected === 3}
          onClick={() => setSelected(3)}
        />
      </div>
      <div className="text-xs text-zinc-500">
        {selected !== null && `Casilla seleccionada: ${['a1', 'b1', 'c1', 'd1'][selected]}`}
      </div>
    </div>
  );
}

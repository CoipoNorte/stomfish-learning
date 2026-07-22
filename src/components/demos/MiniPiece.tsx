const PIECES: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
};

interface MiniPieceProps {
  piece: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function MiniPiece({ piece, size = 'md', showLabel = false }: MiniPieceProps) {
  const isWhite = piece === piece.toUpperCase();
  const fontSize = size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-4xl' : 'text-6xl';
  
  const labels: Record<string, string> = {
    'K': 'Rey', 'Q': 'Dama', 'R': 'Torre', 'B': 'Alfil', 'N': 'Caballo', 'P': 'Peón',
    'k': 'Rey', 'q': 'Dama', 'r': 'Torre', 'b': 'Alfil', 'n': 'Caballo', 'p': 'Peón',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`${fontSize} select-none`}
        style={{
          color: isWhite ? '#fff' : '#000',
          textShadow: isWhite ? '0 2px 4px rgba(0,0,0,0.8)' : '0 2px 4px rgba(255,255,255,0.3)',
        }}
      >
        {PIECES[piece]}
      </span>
      {showLabel && (
        <span className="text-xs text-zinc-500">
          {labels[piece]} {isWhite ? '(B)' : '(N)'}
        </span>
      )}
    </div>
  );
}

export function PieceGallery() {
  const whitePieces = ['K', 'Q', 'R', 'B', 'N', 'P'];
  const blackPieces = ['k', 'q', 'r', 'b', 'n', 'p'];

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs text-zinc-500 mb-2">Blancas</div>
        <div className="flex gap-4 flex-wrap">
          {whitePieces.map(p => (
            <MiniPiece key={p} piece={p} showLabel />
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs text-zinc-500 mb-2">Negras</div>
        <div className="flex gap-4 flex-wrap">
          {blackPieces.map(p => (
            <MiniPiece key={p} piece={p} showLabel />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { DemoBoard } from './DemoBoard';

const EXAMPLE_FENS = [
  { name: 'Posición inicial', fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' },
  { name: 'Después de 1.e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1' },
  { name: 'Defensa Siciliana', fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2' },
  { name: 'Apertura Italiana', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3' },
  { name: 'Mate del pastor', fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4' },
  { name: 'Endgame', fen: '8/8/8/4k3/8/8/4K3/4R3 w - - 0 1' },
];

export function DemoFEN() {
  const [selectedFen, setSelectedFen] = useState(EXAMPLE_FENS[0]);
  const [customFen, setCustomFen] = useState('');
  const [error, setError] = useState('');

  const handleCustomFen = () => {
    if (!customFen.trim()) return;
    
    // Validación básica
    const parts = customFen.trim().split(' ');
    if (parts.length < 1) {
      setError('FEN inválido');
      return;
    }

    const rows = parts[0].split('/');
    if (rows.length !== 8) {
      setError('FEN debe tener 8 filas separadas por /');
      return;
    }

    setError('');
    setSelectedFen({ name: 'Personalizado', fen: customFen.trim() });
  };

  // Parsear FEN para mostrar detalles
  const parseFenDetails = (fen: string) => {
    const parts = fen.split(' ');
    return {
      board: parts[0] || '',
      turn: parts[1] === 'w' ? 'Blancas' : 'Negras',
      castling: parts[2] || '-',
      enPassant: parts[3] || '-',
      halfmove: parts[4] || '0',
      fullmove: parts[5] || '1',
    };
  };

  const details = parseFenDetails(selectedFen.fen);

  return (
    <div className="space-y-6">
      {/* Selector de posiciones */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_FENS.map((ex) => (
          <button
            key={ex.name}
            onClick={() => setSelectedFen(ex)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              selectedFen.name === ex.name
                ? 'bg-accent-600 text-white'
                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
            }`}
          >
            {ex.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tablero */}
        <div className="flex justify-center">
          <DemoBoard fen={selectedFen.fen} size="md" />
        </div>

        {/* Detalles del FEN */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider">FEN String</label>
            <div className="mt-1 p-3 bg-zinc-800 rounded-lg font-mono text-sm text-accent-400 break-all">
              {selectedFen.fen}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <div className="text-zinc-500 text-xs mb-1">Turno</div>
              <div className="font-semibold">{details.turn}</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <div className="text-zinc-500 text-xs mb-1">Enroque</div>
              <div className="font-mono">{details.castling}</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <div className="text-zinc-500 text-xs mb-1">En Passant</div>
              <div className="font-mono">{details.enPassant}</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <div className="text-zinc-500 text-xs mb-1">Movimiento</div>
              <div className="font-mono">{details.fullmove}</div>
            </div>
          </div>

          {/* Input personalizado */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider">FEN Personalizado</label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={customFen}
                onChange={(e) => setCustomFen(e.target.value)}
                placeholder="Pega un FEN aquí..."
                className="flex-1 bg-zinc-800 px-3 py-2 rounded-lg text-sm font-mono placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button
                onClick={handleCustomFen}
                className="px-4 py-2 bg-accent-600 hover:bg-accent-500 rounded-lg text-sm font-medium"
              >
                Cargar
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

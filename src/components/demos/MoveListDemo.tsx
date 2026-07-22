import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const SAMPLE_GAME = [
  { num: 1, white: 'e4', black: 'e5' },
  { num: 2, white: 'Nf3', black: 'Nc6' },
  { num: 3, white: 'Bb5', black: 'a6' },
  { num: 4, white: 'Ba4', black: 'Nf6' },
  { num: 5, white: 'O-O', black: 'Be7' },
  { num: 6, white: 'Re1', black: 'b5' },
  { num: 7, white: 'Bb3', black: 'd6' },
  { num: 8, white: 'c3', black: 'O-O' },
  { num: 9, white: 'h3', black: 'Nb8' },
  { num: 10, white: 'd4', black: 'Nbd7' },
];

export function MoveListDemo() {
  const [currentMove, setCurrentMove] = useState(-1);
  const [style, setStyle] = useState<'table' | 'inline' | 'figurine'>('table');

  const totalMoves = SAMPLE_GAME.length * 2;

  const goToMove = (index: number) => {
    setCurrentMove(Math.max(-1, Math.min(totalMoves - 1, index)));
  };

  const getMoveIndex = (moveNum: number, isBlack: boolean) => {
    return (moveNum - 1) * 2 + (isBlack ? 1 : 0);
  };

  const figurineMap: Record<string, string> = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘',
  };

  const toFigurine = (san: string) => {
    return san.replace(/^[KQRBN]/, match => figurineMap[match] || match);
  };

  return (
    <div className="space-y-4">
      {/* Style selector */}
      <div className="flex gap-2">
        {(['table', 'inline', 'figurine'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`px-3 py-1.5 rounded-lg text-sm capitalize ${
              style === s ? 'bg-accent-600 text-white' : 'bg-zinc-700 text-zinc-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Move list */}
      <div className="bg-zinc-800 rounded-xl overflow-hidden">
        <div className="max-h-64 overflow-y-auto p-4">
          {style === 'table' && (
            <table className="w-full text-sm">
              <tbody>
                {SAMPLE_GAME.map((move) => (
                  <tr key={move.num} className="hover:bg-zinc-700/50">
                    <td className="text-zinc-500 pr-3 py-1 w-8">{move.num}.</td>
                    <td 
                      className={`px-2 py-1 cursor-pointer rounded ${
                        currentMove === getMoveIndex(move.num, false) ? 'bg-accent-600' : ''
                      }`}
                      onClick={() => goToMove(getMoveIndex(move.num, false))}
                    >
                      {move.white}
                    </td>
                    <td 
                      className={`px-2 py-1 cursor-pointer rounded ${
                        currentMove === getMoveIndex(move.num, true) ? 'bg-accent-600' : ''
                      }`}
                      onClick={() => goToMove(getMoveIndex(move.num, true))}
                    >
                      {move.black}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {style === 'inline' && (
            <div className="flex flex-wrap gap-1">
              {SAMPLE_GAME.map((move) => (
                <span key={move.num} className="inline-flex items-center">
                  <span className="text-zinc-500 mr-1">{move.num}.</span>
                  <span 
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${
                      currentMove === getMoveIndex(move.num, false) ? 'bg-accent-600' : 'hover:bg-zinc-700'
                    }`}
                    onClick={() => goToMove(getMoveIndex(move.num, false))}
                  >
                    {move.white}
                  </span>
                  <span 
                    className={`px-1.5 py-0.5 rounded cursor-pointer ml-1 ${
                      currentMove === getMoveIndex(move.num, true) ? 'bg-accent-600' : 'hover:bg-zinc-700'
                    }`}
                    onClick={() => goToMove(getMoveIndex(move.num, true))}
                  >
                    {move.black}
                  </span>
                </span>
              ))}
            </div>
          )}

          {style === 'figurine' && (
            <div className="flex flex-wrap gap-1">
              {SAMPLE_GAME.map((move) => (
                <span key={move.num} className="inline-flex items-center">
                  <span className="text-zinc-500 mr-1">{move.num}.</span>
                  <span 
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${
                      currentMove === getMoveIndex(move.num, false) ? 'bg-accent-600' : 'hover:bg-zinc-700'
                    }`}
                    onClick={() => goToMove(getMoveIndex(move.num, false))}
                  >
                    {toFigurine(move.white)}
                  </span>
                  <span 
                    className={`px-1.5 py-0.5 rounded cursor-pointer ml-1 ${
                      currentMove === getMoveIndex(move.num, true) ? 'bg-accent-600' : 'hover:bg-zinc-700'
                    }`}
                    onClick={() => goToMove(getMoveIndex(move.num, true))}
                  >
                    {toFigurine(move.black)}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-1 p-3 border-t border-zinc-700 bg-zinc-800/50">
          <button 
            onClick={() => goToMove(-1)}
            className="p-2 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => goToMove(currentMove - 1)}
            className="p-2 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 text-sm text-zinc-500">
            {currentMove + 1} / {totalMoves}
          </span>
          <button 
            onClick={() => goToMove(currentMove + 1)}
            className="p-2 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => goToMove(totalMoves - 1)}
            className="p-2 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

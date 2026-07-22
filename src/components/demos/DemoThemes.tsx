import { useState } from 'react';
import { DemoBoard } from './DemoBoard';

const BOARD_THEMES = [
  { id: 'classic', name: 'Clásico', light: '#f0d9b5', dark: '#b58863' },
  { id: 'blue', name: 'Azul', light: '#dee3e6', dark: '#8ca2ad' },
  { id: 'green', name: 'Verde', light: '#ffffdd', dark: '#86a666' },
];



export function DemoThemes() {
  const [theme, setTheme] = useState<'classic' | 'blue' | 'green'>('classic');
  const [showCoords, setShowCoords] = useState(true);
  const [flipped, setFlipped] = useState(false);



  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Preview del tablero */}
        <div className="flex justify-center">
          <div style={{ transform: flipped ? 'rotate(180deg)' : 'none' }}>
            <DemoBoard 
              fen="r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4"
              theme={theme}
              showCoordinates={showCoords}
              size="md"
            />
          </div>
        </div>

        {/* Controles */}
        <div className="flex-1 space-y-6">
          {/* Tema del tablero */}
          <div>
            <label className="text-sm text-zinc-400 mb-3 block">Tema del tablero</label>
            <div className="flex gap-3">
              {BOARD_THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                    theme === t.id 
                      ? 'bg-accent-500/20 ring-2 ring-accent-500' 
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden grid grid-cols-2 shadow-md">
                    <div style={{ background: t.light }} />
                    <div style={{ background: t.dark }} />
                    <div style={{ background: t.dark }} />
                    <div style={{ background: t.light }} />
                  </div>
                  <span className="text-xs">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Opciones */}
          <div className="space-y-3">
            <label className="text-sm text-zinc-400 mb-2 block">Opciones</label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showCoords}
                onChange={(e) => setShowCoords(e.target.checked)}
                className="w-5 h-5 rounded bg-zinc-700 border-zinc-600 text-accent-500 focus:ring-accent-500"
              />
              <span className="text-sm">Mostrar coordenadas</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={flipped}
                onChange={(e) => setFlipped(e.target.checked)}
                className="w-5 h-5 rounded bg-zinc-700 border-zinc-600 text-accent-500 focus:ring-accent-500"
              />
              <span className="text-sm">Voltear tablero</span>
            </label>
          </div>

          {/* Código de ejemplo */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Código</label>
            <pre className="bg-zinc-800 rounded-lg p-4 text-sm font-mono overflow-x-auto">
              <code className="text-green-400">{`<Board
  theme="${theme}"
  showCoordinates={${showCoords}}
  flipped={${flipped}}
/>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

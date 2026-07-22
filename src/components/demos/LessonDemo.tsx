import { DemoBoard } from './DemoBoard';
import { DemoEvalBar } from './DemoEvalBar';
import { DemoUCI } from './DemoUCI';
import { DemoFEN } from './DemoFEN';
import { DemoThemes } from './DemoThemes';
import { DemoDragDrop } from './DemoDragDrop';
import { DemoAnalysis } from './DemoAnalysis';
import { AnimationDemo } from './AnimationDemo';
import { MoveListDemo } from './MoveListDemo';
import { FullAnalysisDemo } from './FullAnalysisDemo';
import { LivePlayground } from './LivePlayground';
import { PieceGallery } from './MiniPiece';
import { SquareDemo } from './MiniSquare';
import { useLanguage } from '../../context/LanguageContext';

interface LessonDemoProps {
  lessonId: string;
}

export function LessonDemo({ lessonId }: LessonDemoProps) {
  const { lang } = useLanguage();
  
  const demo = getDemo(lessonId, lang);
  
  if (!demo) return null;

  return (
    <div className="my-10 p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{demo.icon}</span>
        <h3 className="text-lg font-bold text-white">{demo.title}</h3>
        <span className="ml-auto text-xs px-2 py-1 bg-accent-500/20 text-accent-400 rounded-full">
          {lang === 'es' ? 'Interactivo' : 'Interactive'}
        </span>
      </div>
      <p className="text-sm text-zinc-400 mb-6">{demo.description}</p>
      
      {demo.component}
    </div>
  );
}

function getDemo(lessonId: string, lang: string): { icon: string; title: string; description: string; component: React.ReactNode } | null {
  const t = lang === 'es';

  const demos: Record<string, { icon: string; title: string; description: string; component: React.ReactNode }> = {
    // Módulo 1: Fundamentos del Motor
    'm1-l1': {
      icon: '♟️',
      title: t ? 'Tablero de demostración' : 'Demo Board',
      description: t 
        ? 'Este es el tablero que construirás. Prueba a hacer clic en las casillas o arrastrar piezas.'
        : 'This is the board you will build. Try clicking squares or dragging pieces.',
      component: <LivePlayground title={t ? 'Tu futuro tablero' : 'Your future board'} />,
    },
    'm1-l2': {
      icon: '📥',
      title: t ? 'Estructura de archivos' : 'File Structure',
      description: t 
        ? 'Vista previa de la organización del proyecto que crearás.'
        : 'Preview of the project organization you will create.',
      component: (
        <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm">
          <div className="text-zinc-500 mb-2"># node_modules/stockfish/</div>
          <div className="flex flex-col gap-1 pl-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">📄</span>
              <span className="text-zinc-300">stockfish.js</span>
              <span className="text-zinc-600 text-xs">← Loader principal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">📦</span>
              <span className="text-zinc-300">stockfish.wasm</span>
              <span className="text-zinc-600 text-xs">← Binario WebAssembly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">⚙️</span>
              <span className="text-zinc-300">stockfish.worker.js</span>
              <span className="text-zinc-600 text-xs">← Web Worker</span>
            </div>
          </div>
        </div>
      ),
    },
    'm1-l3': {
      icon: '🏗️',
      title: t ? 'Estructura del proyecto' : 'Project Structure',
      description: t 
        ? 'Así organizarás tu código. Cada carpeta tiene un propósito específico.'
        : 'This is how you will organize your code. Each folder has a specific purpose.',
      component: (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-zinc-900 rounded-lg p-4 font-mono text-xs">
            <div className="text-accent-400 mb-2">src/</div>
            <div className="pl-4 space-y-1 text-zinc-400">
              <div>📁 components/</div>
              <div className="pl-4">📁 Board/</div>
              <div className="pl-4">📁 Engine/</div>
              <div className="pl-4">📁 UI/</div>
              <div>📁 hooks/</div>
              <div>📁 lib/</div>
              <div>📁 types/</div>
              <div>📄 App.tsx</div>
              <div>📄 main.tsx</div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="bg-zinc-900/50 p-3 rounded-lg">
              <span className="text-accent-400">components/</span>
              <span className="text-zinc-500 ml-2">→ UI reutilizable</span>
            </div>
            <div className="bg-zinc-900/50 p-3 rounded-lg">
              <span className="text-green-400">hooks/</span>
              <span className="text-zinc-500 ml-2">→ Lógica React</span>
            </div>
            <div className="bg-zinc-900/50 p-3 rounded-lg">
              <span className="text-blue-400">lib/</span>
              <span className="text-zinc-500 ml-2">→ Utilidades puras</span>
            </div>
            <div className="bg-zinc-900/50 p-3 rounded-lg">
              <span className="text-yellow-400">types/</span>
              <span className="text-zinc-500 ml-2">→ TypeScript</span>
            </div>
          </div>
        </div>
      ),
    },
    'm1-l4': {
      icon: '💻',
      title: t ? 'Consola UCI interactiva' : 'Interactive UCI Console',
      description: t 
        ? 'Prueba comandos UCI reales. Escribe "uci", "isready", "go depth 5", etc.'
        : 'Try real UCI commands. Type "uci", "isready", "go depth 5", etc.',
      component: <DemoUCI />,
    },

    // Módulo 2: El Tablero
    'm2-l1': {
      icon: '📋',
      title: t ? 'Explorador de FEN' : 'FEN Explorer',
      description: t 
        ? 'Selecciona posiciones o ingresa tu propio FEN para ver cómo se parsea.'
        : 'Select positions or enter your own FEN to see how it parses.',
      component: <DemoFEN />,
    },
    'm2-l2': {
      icon: '🎨',
      title: t ? 'Componentes del tablero' : 'Board Components',
      description: t 
        ? 'Los bloques fundamentales: Square (casilla) y Piece (pieza).'
        : 'The fundamental blocks: Square and Piece.',
      component: (
        <div className="space-y-8">
          <div>
            <div className="text-sm text-zinc-400 mb-4">Componente Piece</div>
            <PieceGallery />
          </div>
          <div>
            <div className="text-sm text-zinc-400 mb-4">Componente Square</div>
            <SquareDemo />
          </div>
        </div>
      ),
    },

    // Módulo 3: Piezas e Interacción
    'm3-l1': {
      icon: '🎭',
      title: t ? 'Sets de piezas' : 'Piece Sets',
      description: t 
        ? 'Las piezas Unicode que usamos vs piezas SVG profesionales.'
        : 'The Unicode pieces we use vs professional SVG pieces.',
      component: <PieceGallery />,
    },
    'm3-l2': {
      icon: '👆',
      title: t ? 'Drag & Drop interactivo' : 'Interactive Drag & Drop',
      description: t 
        ? '¡Arrastra las piezas! Los movimientos se registran automáticamente.'
        : 'Drag the pieces! Moves are recorded automatically.',
      component: <DemoDragDrop />,
    },
    'm3-l3': {
      icon: '📱',
      title: t ? 'Soporte táctil' : 'Touch Support',
      description: t 
        ? 'El mismo tablero funciona en móviles. Prueba en tu teléfono.'
        : 'The same board works on mobile. Try on your phone.',
      component: (
        <div className="text-center space-y-4">
          <DemoBoard fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" interactive size="md" />
          <p className="text-xs text-zinc-500">
            {t ? '↑ Funciona igual con touch y mouse' : '↑ Works the same with touch and mouse'}
          </p>
        </div>
      ),
    },
    'm3-l4': {
      icon: '✨',
      title: t ? 'Demo de animaciones' : 'Animation Demo',
      description: t 
        ? 'Experimenta con diferentes curvas de easing y duraciones.'
        : 'Experiment with different easing curves and durations.',
      component: <AnimationDemo />,
    },

    // Módulo 4: Lógica del Juego
    'm4-l1': {
      icon: '✅',
      title: t ? 'Validación de movimientos' : 'Move Validation',
      description: t 
        ? 'Solo se permiten movimientos legales. Intenta mover ilegalmente.'
        : 'Only legal moves allowed. Try to move illegally.',
      component: <DemoDragDrop />,
    },
    'm4-l2': {
      icon: '🏰',
      title: t ? 'Movimientos especiales' : 'Special Moves',
      description: t 
        ? 'Enroque, en passant y promoción.'
        : 'Castling, en passant and promotion.',
      component: (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-zinc-500 mb-2">{t ? 'Enroque' : 'Castling'}</div>
            <DemoBoard fen="r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1" size="sm" />
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-500 mb-2">En Passant</div>
            <DemoBoard fen="8/8/8/pP6/8/8/8/8 w - a6 0 1" size="sm" highlightSquares={['a6']} />
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-500 mb-2">{t ? 'Promoción' : 'Promotion'}</div>
            <DemoBoard fen="8/P7/8/8/8/8/8/8 w - - 0 1" size="sm" highlightSquares={['a8']} />
          </div>
        </div>
      ),
    },
    'm4-l3': {
      icon: '👑',
      title: t ? 'Jaque y Mate' : 'Check and Mate',
      description: t 
        ? 'Ejemplos visuales de jaque, jaque mate y tablas.'
        : 'Visual examples of check, checkmate and stalemate.',
      component: (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-amber-400 mb-2">⚠️ {t ? 'Jaque' : 'Check'}</div>
            <DemoBoard fen="rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3" size="sm" highlightSquares={['e1']} />
          </div>
          <div className="text-center">
            <div className="text-xs text-red-400 mb-2">☠️ {t ? 'Mate' : 'Checkmate'}</div>
            <DemoBoard fen="r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4" size="sm" highlightSquares={['f7', 'e8']} />
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-400 mb-2">🤝 {t ? 'Tablas' : 'Stalemate'}</div>
            <DemoBoard fen="k7/8/1K6/8/8/8/8/8 b - - 0 1" size="sm" />
          </div>
        </div>
      ),
    },
    'm4-l4': {
      icon: '📝',
      title: t ? 'Lista de movimientos' : 'Move List',
      description: t 
        ? 'Diferentes estilos de notación. Haz clic para navegar.'
        : 'Different notation styles. Click to navigate.',
      component: <MoveListDemo />,
    },

    // Módulo 5: Integración del Motor
    'm5-l1': {
      icon: '🔧',
      title: t ? 'Web Worker en acción' : 'Web Worker in Action',
      description: t 
        ? 'El motor corre en segundo plano sin bloquear la UI.'
        : 'The engine runs in background without blocking UI.',
      component: <DemoUCI />,
    },
    'm5-l2': {
      icon: '📊',
      title: t ? 'Barra de evaluación' : 'Evaluation Bar',
      description: t 
        ? 'Visualización de la ventaja. Se actualiza en tiempo real.'
        : 'Advantage visualization. Updates in real-time.',
      component: (
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <div className="text-center">
            <div className="text-xs text-zinc-500 mb-2">Vertical</div>
            <DemoEvalBar orientation="vertical" animated />
          </div>
          <div className="text-center w-64">
            <div className="text-xs text-zinc-500 mb-2">Horizontal</div>
            <DemoEvalBar orientation="horizontal" animated />
          </div>
        </div>
      ),
    },
    'm5-l3': {
      icon: '➡️',
      title: t ? 'Flechas y análisis' : 'Arrows and Analysis',
      description: t 
        ? 'Visualización completa con flechas de mejor movimiento.'
        : 'Full visualization with best move arrows.',
      component: <DemoAnalysis />,
    },

    // Módulo 6: Interfaz de Usuario
    'm6-l1': {
      icon: '🖥️',
      title: t ? 'Vista de análisis completa' : 'Full Analysis View',
      description: t 
        ? 'Todo junto: tablero, eval, movimientos, motor.'
        : 'Everything together: board, eval, moves, engine.',
      component: <FullAnalysisDemo />,
    },

    // Módulo 7: Temas
    'm7-l1': {
      icon: '🎨',
      title: t ? 'Personalización' : 'Customization',
      description: t 
        ? 'Prueba diferentes temas y configuraciones.'
        : 'Try different themes and settings.',
      component: <DemoThemes />,
    },

    // Módulo 8: Despliegue
    'm8-l1': {
      icon: '🚀',
      title: t ? 'Preview de producción' : 'Production Preview',
      description: t 
        ? 'Así se verá tu app desplegada.'
        : 'This is how your deployed app will look.',
      component: <FullAnalysisDemo />,
    },
  };

  return demos[lessonId] || null;
}

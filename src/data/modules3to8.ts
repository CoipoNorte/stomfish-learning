import { Module } from './courseContent';

export const modulesThreeToEight: Module[] = [
  {
    id: 'm3',
    number: '03',
    slug: 'piezas-interaccion',
    title: 'Piezas e Interacción',
    titleEn: 'Pieces & Interaction',
    description: 'Arrastra, suelta y anima las piezas',
    descriptionEn: 'Drag, drop and animate pieces',
    icon: '👆',
    lessons: [
      {
        id: 'm3-l1',
        slug: 'piezas-svg',
        title: 'Sets de piezas SVG',
        titleEn: 'SVG Piece Sets',
        description: 'Renderiza piezas con gráficos vectoriales',
        descriptionEn: 'Render pieces with vector graphics',
        duration: '12 min',
        content: `
# Sets de Piezas SVG

Hasta ahora hemos usado caracteres Unicode para las piezas (♔, ♕, etc.). Funcionan, pero tienen limitaciones: no podemos cambiar colores fácilmente ni aplicar efectos visuales sofisticados.

## ¿Por qué SVG?

- **Escalable** - Se ven perfectos a cualquier tamaño
- **Personalizable** - Podemos cambiar colores con CSS
- **Ligero** - Archivos pequeños, carga rápida
- **Animable** - Podemos animar con CSS o JS

## Estructura de una pieza SVG

Una pieza de ajedrez en SVG típicamente tiene esta estructura:

\`\`\`xml
<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
  <!-- Contorno/sombra -->
  <g fill="none" stroke="#000" stroke-width="1.5">
    <!-- Paths que definen la forma -->
    <path d="M 22.5,11.63 L 22.5,6" />
    <!-- ... más paths -->
  </g>
  
  <!-- Relleno -->
  <g fill="#fff">
    <path d="..." />
  </g>
</svg>
\`\`\`

## Descargando sets de piezas

Hay varios sets gratuitos disponibles:

### 1. Piezas de Lichess (Recomendado)
\`\`\`bash
# cburnett (clásico)
https://github.com/lichess-org/lila/tree/master/public/piece/cburnett

# merida
https://github.com/lichess-org/lila/tree/master/public/piece/merida

# alpha
https://github.com/lichess-org/lila/tree/master/public/piece/alpha
\`\`\`

### 2. Chess.com pieces
Disponibles en varios formatos y estilos.

## Organizando las piezas

Crea una estructura de carpetas:

\`\`\`
public/
└── pieces/
    ├── cburnett/
    │   ├── wK.svg  # Rey blanco
    │   ├── wQ.svg  # Dama blanca
    │   ├── wR.svg  # Torre blanca
    │   ├── wB.svg  # Alfil blanco
    │   ├── wN.svg  # Caballo blanco
    │   ├── wP.svg  # Peón blanco
    │   ├── bK.svg  # Rey negro
    │   ├── bQ.svg  # Dama negra
    │   └── ...
    └── merida/
        └── ...
\`\`\`

## Componente Piece mejorado

\`\`\`tsx
// src/components/Board/Piece.tsx
import { useMemo } from 'react';

interface PieceProps {
  piece: string;        // 'K', 'q', 'P', etc.
  pieceSet?: string;    // 'cburnett', 'merida', etc.
  size?: number;
  isDragging?: boolean;
}

const PIECE_NAMES: Record<string, string> = {
  'K': 'wK', 'Q': 'wQ', 'R': 'wR', 'B': 'wB', 'N': 'wN', 'P': 'wP',
  'k': 'bK', 'q': 'bQ', 'r': 'bR', 'b': 'bB', 'n': 'bN', 'p': 'bP',
};

export function Piece({ 
  piece, 
  pieceSet = 'cburnett',
  size = 80,
  isDragging = false 
}: PieceProps) {
  const pieceName = PIECE_NAMES[piece];
  const src = \`/pieces/\${pieceSet}/\${pieceName}.svg\`;

  return (
    <img
      src={src}
      alt={pieceName}
      width={size}
      height={size}
      draggable={false}
      className={\`
        select-none pointer-events-none
        transition-transform duration-150
        \${isDragging ? 'scale-110 drop-shadow-lg' : ''}
      \`}
      style={{
        filter: isDragging ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : undefined
      }}
    />
  );
}
\`\`\`

## Preloading de piezas

Para evitar parpadeos al cargar:

\`\`\`tsx
// src/hooks/usePiecePreload.ts
import { useEffect } from 'react';

const PIECES = ['wK', 'wQ', 'wR', 'wB', 'wN', 'wP', 'bK', 'bQ', 'bR', 'bB', 'bN', 'bP'];

export function usePiecePreload(pieceSet: string) {
  useEffect(() => {
    PIECES.forEach(piece => {
      const img = new Image();
      img.src = \`/pieces/\${pieceSet}/\${piece}.svg\`;
    });
  }, [pieceSet]);
}
\`\`\`

## Sistema de temas

\`\`\`tsx
// src/context/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
  pieceSet: string;
  boardLight: string;
  boardDark: string;
}

const THEMES: Record<string, Theme> = {
  classic: {
    pieceSet: 'cburnett',
    boardLight: '#f0d9b5',
    boardDark: '#b58863',
  },
  blue: {
    pieceSet: 'merida',
    boardLight: '#dee3e6',
    boardDark: '#8ca2ad',
  },
  green: {
    pieceSet: 'alpha',
    boardLight: '#ffffdd',
    boardDark: '#86a666',
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (name: string) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState('classic');
  const theme = THEMES[themeName];

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
\`\`\`

---

**Próximo paso:** Implementaremos drag & drop para mover las piezas.
`,
        contentEn: `
# SVG Piece Sets

So far we've used Unicode characters for pieces (♔, ♕, etc.). They work, but have limitations: we can't easily change colors or apply sophisticated visual effects.

## Why SVG?

- **Scalable** - Look perfect at any size
- **Customizable** - We can change colors with CSS
- **Lightweight** - Small files, fast loading
- **Animatable** - Can animate with CSS or JS

## SVG Piece Structure

A chess piece in SVG typically has this structure:

\`\`\`xml
<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#000" stroke-width="1.5">
    <path d="M 22.5,11.63 L 22.5,6" />
  </g>
  <g fill="#fff">
    <path d="..." />
  </g>
</svg>
\`\`\`

## Improved Piece Component

\`\`\`tsx
interface PieceProps {
  piece: string;
  pieceSet?: string;
  size?: number;
  isDragging?: boolean;
}

export function Piece({ piece, pieceSet = 'cburnett', size = 80, isDragging = false }: PieceProps) {
  const pieceName = PIECE_NAMES[piece];
  const src = \`/pieces/\${pieceSet}/\${pieceName}.svg\`;

  return (
    <img
      src={src}
      alt={pieceName}
      width={size}
      height={size}
      draggable={false}
      className={\`select-none \${isDragging ? 'scale-110' : ''}\`}
    />
  );
}
\`\`\`

---

**Next step:** We'll implement drag & drop to move pieces.
`
      },
      {
        id: 'm3-l2',
        slug: 'drag-and-drop',
        title: 'Implementando Drag & Drop',
        titleEn: 'Implementing Drag & Drop',
        description: 'Mueve piezas arrastrando con el mouse',
        descriptionEn: 'Move pieces by dragging with mouse',
        duration: '20 min',
        content: `
# Implementando Drag & Drop

Vamos a crear un sistema de arrastrar y soltar para mover las piezas. Usaremos eventos del DOM nativos para máximo control.

## Estado del drag

Necesitamos trackear:
- ¿Se está arrastrando una pieza?
- ¿Cuál pieza?
- ¿Desde qué casilla?
- ¿Posición actual del cursor?

\`\`\`tsx
// src/hooks/useDragPiece.ts
import { useState, useCallback, useRef, useEffect } from 'react';

interface DragState {
  isDragging: boolean;
  piece: string | null;
  fromSquare: string | null;
  position: { x: number; y: number } | null;
}

export function useDragPiece(onMove: (from: string, to: string) => void) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    piece: null,
    fromSquare: null,
    position: null,
  });
  
  const boardRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback((
    piece: string,
    square: string,
    clientX: number,
    clientY: number
  ) => {
    setDragState({
      isDragging: true,
      piece,
      fromSquare: square,
      position: { x: clientX, y: clientY },
    });
  }, []);

  const updateDrag = useCallback((clientX: number, clientY: number) => {
    setDragState(prev => ({
      ...prev,
      position: { x: clientX, y: clientY },
    }));
  }, []);

  const endDrag = useCallback((toSquare: string | null) => {
    if (dragState.fromSquare && toSquare && dragState.fromSquare !== toSquare) {
      onMove(dragState.fromSquare, toSquare);
    }
    setDragState({
      isDragging: false,
      piece: null,
      fromSquare: null,
      position: null,
    });
  }, [dragState.fromSquare, onMove]);

  // Event listeners globales para mouse
  useEffect(() => {
    if (!dragState.isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateDrag(e.clientX, e.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Encontrar sobre qué casilla se soltó
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const square = element?.closest('[data-square]')?.getAttribute('data-square');
      endDrag(square || null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState.isDragging, updateDrag, endDrag]);

  return { dragState, startDrag, boardRef };
}
\`\`\`

## Componente Square actualizado

\`\`\`tsx
// src/components/Board/Square.tsx
import { ReactNode, MouseEvent } from 'react';

interface SquareProps {
  square: string;
  isLight: boolean;
  isHighlighted?: boolean;
  isValidMove?: boolean;
  onMouseDown?: (e: MouseEvent) => void;
  children?: ReactNode;
}

export function Square({
  square,
  isLight,
  isHighlighted,
  isValidMove,
  onMouseDown,
  children,
}: SquareProps) {
  return (
    <div
      data-square={square}
      onMouseDown={onMouseDown}
      className={\`
        aspect-square flex items-center justify-center relative
        cursor-pointer select-none
        \${isLight ? 'bg-board-light' : 'bg-board-dark'}
        \${isHighlighted ? 'ring-4 ring-yellow-400/50 ring-inset' : ''}
      \`}
    >
      {children}
      
      {/* Indicador de movimiento válido */}
      {isValidMove && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1/3 h-1/3 rounded-full bg-black/20" />
        </div>
      )}
    </div>
  );
}
\`\`\`

## Pieza arrastrada (ghost piece)

\`\`\`tsx
// src/components/Board/DraggedPiece.tsx
import { Piece } from './Piece';

interface DraggedPieceProps {
  piece: string;
  position: { x: number; y: number };
  pieceSet?: string;
}

export function DraggedPiece({ piece, position, pieceSet }: DraggedPieceProps) {
  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Piece piece={piece} pieceSet={pieceSet} isDragging />
    </div>
  );
}
\`\`\`

## Board con drag & drop

\`\`\`tsx
// src/components/Board/Board.tsx
import { useDragPiece } from '../../hooks/useDragPiece';
import { Square } from './Square';
import { Piece } from './Piece';
import { DraggedPiece } from './DraggedPiece';
import { parseFEN } from '../../lib/fen';

interface BoardProps {
  fen: string;
  onMove?: (from: string, to: string) => void;
  validMoves?: string[]; // Casillas donde puede ir la pieza seleccionada
}

export function Board({ fen, onMove, validMoves = [] }: BoardProps) {
  const { board } = parseFEN(fen);
  const { dragState, startDrag, boardRef } = useDragPiece((from, to) => {
    onMove?.(from, to);
  });

  const toSquare = (row: number, col: number): string => {
    return String.fromCharCode(97 + col) + (8 - row);
  };

  const handleMouseDown = (
    piece: string,
    square: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    startDrag(piece, square, e.clientX, e.clientY);
  };

  return (
    <>
      <div ref={boardRef} className="grid grid-cols-8 w-fit">
        {board.map((row, r) =>
          row.map((piece, c) => {
            const square = toSquare(r, c);
            const isLight = (r + c) % 2 === 0;
            const isDragOrigin = dragState.fromSquare === square;
            const isValidMove = validMoves.includes(square);

            return (
              <Square
                key={square}
                square={square}
                isLight={isLight}
                isHighlighted={isDragOrigin}
                isValidMove={isValidMove && dragState.isDragging}
                onMouseDown={
                  piece
                    ? (e) => handleMouseDown(piece, square, e)
                    : undefined
                }
              >
                {piece && !isDragOrigin && (
                  <Piece piece={piece} />
                )}
              </Square>
            );
          })
        )}
      </div>

      {/* Pieza siendo arrastrada */}
      {dragState.isDragging && dragState.piece && dragState.position && (
        <DraggedPiece
          piece={dragState.piece}
          position={dragState.position}
        />
      )}
    </>
  );
}
\`\`\`

## Uso

\`\`\`tsx
function App() {
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

  const handleMove = (from: string, to: string) => {
    console.log(\`Move: \${from} -> \${to}\`);
    // Aquí validarías el movimiento y actualizarías el FEN
  };

  return (
    <Board 
      fen={fen} 
      onMove={handleMove}
    />
  );
}
\`\`\`

---

**Próximo paso:** Agregaremos soporte táctil para dispositivos móviles.
`,
        contentEn: `
# Implementing Drag & Drop

Let's create a drag and drop system to move pieces. We'll use native DOM events for maximum control.

## Drag State

We need to track:
- Is a piece being dragged?
- Which piece?
- From which square?
- Current cursor position?

\`\`\`tsx
interface DragState {
  isDragging: boolean;
  piece: string | null;
  fromSquare: string | null;
  position: { x: number; y: number } | null;
}

export function useDragPiece(onMove: (from: string, to: string) => void) {
  const [dragState, setDragState] = useState<DragState>({...});
  // ... implementation
}
\`\`\`

---

**Next step:** We'll add touch support for mobile devices.
`
      },
      {
        id: 'm3-l3',
        slug: 'soporte-tactil',
        title: 'Soporte táctil',
        titleEn: 'Touch Support',
        description: 'Haz que funcione en móviles y tablets',
        descriptionEn: 'Make it work on mobile and tablets',
        duration: '15 min',
        content: `
# Soporte Táctil

Los eventos táctiles son diferentes a los eventos de mouse. Necesitamos manejarlos específicamente para una buena experiencia móvil.

## Eventos táctiles vs mouse

| Mouse | Touch |
|-------|-------|
| mousedown | touchstart |
| mousemove | touchmove |
| mouseup | touchend |
| clientX/Y | touches[0].clientX/Y |

## Hook unificado

\`\`\`tsx
// src/hooks/usePointerDrag.ts
import { useState, useCallback, useEffect } from 'react';

interface DragState {
  isDragging: boolean;
  piece: string | null;
  fromSquare: string | null;
  position: { x: number; y: number } | null;
}

export function usePointerDrag(onMove: (from: string, to: string) => void) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    piece: null,
    fromSquare: null,
    position: null,
  });

  const getCoords = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const startDrag = useCallback((
    piece: string,
    square: string,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    e.preventDefault();
    const nativeEvent = e.nativeEvent;
    const coords = getCoords(nativeEvent as MouseEvent | TouchEvent);
    
    setDragState({
      isDragging: true,
      piece,
      fromSquare: square,
      position: coords,
    });
  }, []);

  const updateDrag = useCallback((e: MouseEvent | TouchEvent) => {
    const coords = getCoords(e);
    setDragState(prev => ({ ...prev, position: coords }));
  }, []);

  const endDrag = useCallback((e: MouseEvent | TouchEvent) => {
    const coords = getCoords(e);
    const element = document.elementFromPoint(coords.x, coords.y);
    const toSquare = element?.closest('[data-square]')?.getAttribute('data-square');
    
    if (dragState.fromSquare && toSquare && dragState.fromSquare !== toSquare) {
      onMove(dragState.fromSquare, toSquare);
    }
    
    setDragState({
      isDragging: false,
      piece: null,
      fromSquare: null,
      position: null,
    });
  }, [dragState.fromSquare, onMove]);

  useEffect(() => {
    if (!dragState.isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      updateDrag(e);
    };

    const handleEnd = (e: MouseEvent | TouchEvent) => {
      endDrag(e);
    };

    // Mouse events
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    
    // Touch events
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchcancel', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchcancel', handleEnd);
    };
  }, [dragState.isDragging, updateDrag, endDrag]);

  return { dragState, startDrag };
}
\`\`\`

## Mejoras para móvil

### Prevenir scroll durante drag

\`\`\`css
/* Cuando se está arrastrando */
body.dragging {
  overflow: hidden;
  touch-action: none;
}
\`\`\`

\`\`\`tsx
useEffect(() => {
  if (dragState.isDragging) {
    document.body.classList.add('dragging');
  } else {
    document.body.classList.remove('dragging');
  }
}, [dragState.isDragging]);
\`\`\`

### Feedback visual táctil

\`\`\`tsx
// Vibración al levantar pieza (si está disponible)
const startDrag = useCallback((...) => {
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
  // ...
}, []);
\`\`\`

### Área de toque más grande

\`\`\`tsx
<div className="p-2 -m-2"> {/* Padding extra para área táctil */}
  <Piece piece={piece} />
</div>
\`\`\`

---

**Próximo paso:** Animaremos los movimientos para que sean fluidos.
`,
        contentEn: `
# Touch Support

Touch events are different from mouse events. We need to handle them specifically for a good mobile experience.

## Touch vs Mouse Events

| Mouse | Touch |
|-------|-------|
| mousedown | touchstart |
| mousemove | touchmove |
| mouseup | touchend |
| clientX/Y | touches[0].clientX/Y |

## Unified Hook

\`\`\`tsx
export function usePointerDrag(onMove: (from: string, to: string) => void) {
  const getCoords = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };
  // ... implementation
}
\`\`\`

---

**Next step:** We'll animate moves to make them smooth.
`
      },
      {
        id: 'm3-l4',
        slug: 'animaciones-movimiento',
        title: 'Animaciones de movimiento',
        titleEn: 'Move Animations',
        description: 'Anima las piezas cuando se mueven',
        descriptionEn: 'Animate pieces when they move',
        duration: '15 min',
        content: `
# Animaciones de Movimiento

Las animaciones hacen que los movimientos se sientan naturales y ayudan al usuario a seguir qué está pasando en el tablero.

## Tipos de animaciones

1. **Movimiento de pieza** - La pieza se desliza de una casilla a otra
2. **Captura** - La pieza capturada desaparece
3. **Promoción** - Transformación visual del peón
4. **Enroque** - Dos piezas se mueven simultáneamente

## Sistema de animación

\`\`\`tsx
// src/hooks/useAnimatedMove.ts
import { useState, useCallback } from 'react';

interface Animation {
  piece: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export function useAnimatedMove(squareSize: number) {
  const [animation, setAnimation] = useState<Animation | null>(null);

  const animateMove = useCallback((
    piece: string,
    fromSquare: string,
    toSquare: string
  ) => {
    const fromCoords = squareToCoords(fromSquare, squareSize);
    const toCoords = squareToCoords(toSquare, squareSize);

    setAnimation({ piece, from: fromCoords, to: toCoords });

    // Limpiar después de la animación
    setTimeout(() => {
      setAnimation(null);
    }, 200); // Duración de la animación
  }, [squareSize]);

  return { animation, animateMove };
}

function squareToCoords(square: string, size: number) {
  const col = square.charCodeAt(0) - 97; // 'a' = 0
  const row = 8 - parseInt(square[1]);   // '8' = 0
  return { x: col * size, y: row * size };
}
\`\`\`

## Componente de pieza animada

\`\`\`tsx
// src/components/Board/AnimatedPiece.tsx
import { useEffect, useState } from 'react';
import { Piece } from './Piece';

interface AnimatedPieceProps {
  piece: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  duration?: number;
  pieceSet?: string;
}

export function AnimatedPiece({
  piece,
  from,
  to,
  duration = 200,
  pieceSet,
}: AnimatedPieceProps) {
  const [position, setPosition] = useState(from);

  useEffect(() => {
    // Iniciar animación en el siguiente frame
    requestAnimationFrame(() => {
      setPosition(to);
    });
  }, [to]);

  return (
    <div
      className="absolute pointer-events-none z-40"
      style={{
        transform: \`translate(\${position.x}px, \${position.y}px)\`,
        transition: \`transform \${duration}ms cubic-bezier(0.4, 0, 0.2, 1)\`,
      }}
    >
      <Piece piece={piece} pieceSet={pieceSet} />
    </div>
  );
}
\`\`\`

## Integrando en el Board

\`\`\`tsx
// Board.tsx
import { AnimatedPiece } from './AnimatedPiece';

export function Board({ fen, onMove }: BoardProps) {
  const [animation, setAnimation] = useState<Animation | null>(null);
  const squareSize = 80; // o calculado dinámicamente

  const handleMove = (from: string, to: string) => {
    // Iniciar animación
    const piece = getPieceAt(from);
    if (piece) {
      setAnimation({
        piece,
        from: squareToCoords(from, squareSize),
        to: squareToCoords(to, squareSize),
      });
    }

    // Actualizar posición después de animación
    setTimeout(() => {
      onMove?.(from, to);
      setAnimation(null);
    }, 200);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-8">
        {/* Casillas y piezas estáticas */}
      </div>

      {/* Pieza animándose */}
      {animation && (
        <AnimatedPiece
          piece={animation.piece}
          from={animation.from}
          to={animation.to}
        />
      )}
    </div>
  );
}
\`\`\`

## Animación de captura

\`\`\`tsx
// Fade out de la pieza capturada
{capturedPiece && (
  <div
    className="absolute animate-fade-out"
    style={{ left: captureX, top: captureY }}
  >
    <Piece piece={capturedPiece} />
  </div>
)}
\`\`\`

\`\`\`css
@keyframes fade-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.5); }
}

.animate-fade-out {
  animation: fade-out 200ms ease-out forwards;
}
\`\`\`

## Easing functions

Las curvas de easing hacen las animaciones más naturales:

\`\`\`css
/* Movimiento estándar */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Rebote suave */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Entrada rápida, salida lenta */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
\`\`\`

---

**Próximo paso:** Implementaremos la lógica del juego - validación de movimientos.
`,
        contentEn: `
# Move Animations

Animations make moves feel natural and help users follow what's happening on the board.

## Animation Types

1. **Piece movement** - Piece slides from one square to another
2. **Capture** - Captured piece disappears
3. **Promotion** - Visual transformation of pawn
4. **Castling** - Two pieces move simultaneously

## Animation System

\`\`\`tsx
export function useAnimatedMove(squareSize: number) {
  const [animation, setAnimation] = useState<Animation | null>(null);

  const animateMove = useCallback((piece, fromSquare, toSquare) => {
    const fromCoords = squareToCoords(fromSquare, squareSize);
    const toCoords = squareToCoords(toSquare, squareSize);
    setAnimation({ piece, from: fromCoords, to: toCoords });
    setTimeout(() => setAnimation(null), 200);
  }, [squareSize]);

  return { animation, animateMove };
}
\`\`\`

---

**Next step:** We'll implement game logic - move validation.
`
      }
    ]
  },
  {
    id: 'm4',
    number: '04',
    slug: 'logica-juego',
    title: 'Lógica del Juego',
    titleEn: 'Game Logic',
    description: 'Movimientos legales, capturas y reglas especiales',
    descriptionEn: 'Legal moves, captures & special rules',
    icon: '♟️',
    lessons: [
      {
        id: 'm4-l1',
        slug: 'validacion-movimientos',
        title: 'Validación de movimientos',
        titleEn: 'Move Validation',
        description: 'Verifica que los movimientos sean legales',
        descriptionEn: 'Verify moves are legal',
        duration: '20 min',
        content: `
# Validación de Movimientos

Necesitamos asegurarnos de que solo se permitan movimientos legales según las reglas del ajedrez.

## Enfoque: chess.js

En lugar de implementar toda la lógica desde cero (lo cual es complejo), usaremos la librería \`chess.js\`:

\`\`\`bash
npm install chess.js
\`\`\`

## Uso básico de chess.js

\`\`\`typescript
import { Chess } from 'chess.js';

// Crear una partida nueva
const game = new Chess();

// O desde una posición FEN
const game2 = new Chess('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');

// Obtener movimientos legales
const moves = game.moves(); // ['a3', 'a4', 'b3', 'b4', ...]

// Movimientos desde una casilla específica
const e2Moves = game.moves({ square: 'e2' }); // ['e3', 'e4']

// Hacer un movimiento
game.move('e4');
// o con objeto
game.move({ from: 'e2', to: 'e4' });

// Verificar estado
game.isCheck();       // ¿Está en jaque?
game.isCheckmate();   // ¿Jaque mate?
game.isStalemate();   // ¿Tablas por ahogado?
game.isDraw();        // ¿Tablas?
game.isGameOver();    // ¿Partida terminada?

// Obtener FEN actual
game.fen();

// Turno actual
game.turn(); // 'w' o 'b'
\`\`\`

## Hook useChess

\`\`\`typescript
// src/hooks/useChess.ts
import { useState, useCallback, useMemo } from 'react';
import { Chess, Square, Move } from 'chess.js';

export function useChess(initialFen?: string) {
  const [game, setGame] = useState(() => new Chess(initialFen));
  const [history, setHistory] = useState<Move[]>([]);

  const fen = game.fen();
  const turn = game.turn();
  const isCheck = game.isCheck();
  const isCheckmate = game.isCheckmate();
  const isGameOver = game.isGameOver();

  const getLegalMoves = useCallback((square: Square): Square[] => {
    const moves = game.moves({ square, verbose: true });
    return moves.map(m => m.to as Square);
  }, [game]);

  const makeMove = useCallback((from: Square, to: Square): boolean => {
    try {
      const move = game.move({ from, to, promotion: 'q' }); // Auto-promote to queen
      if (move) {
        setHistory(prev => [...prev, move]);
        setGame(new Chess(game.fen())); // Trigger re-render
        return true;
      }
    } catch (e) {
      console.error('Invalid move:', e);
    }
    return false;
  }, [game]);

  const reset = useCallback(() => {
    setGame(new Chess(initialFen));
    setHistory([]);
  }, [initialFen]);

  const undo = useCallback(() => {
    game.undo();
    setHistory(prev => prev.slice(0, -1));
    setGame(new Chess(game.fen()));
  }, [game]);

  return {
    fen,
    turn,
    isCheck,
    isCheckmate,
    isGameOver,
    history,
    getLegalMoves,
    makeMove,
    reset,
    undo,
  };
}
\`\`\`

## Integrando con el Board

\`\`\`tsx
// App.tsx
import { useState } from 'react';
import { Board } from './components/Board/Board';
import { useChess } from './hooks/useChess';

function App() {
  const { fen, turn, isCheckmate, getLegalMoves, makeMove, reset } = useChess();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);

  const handleSquareClick = (square: string) => {
    if (selectedSquare) {
      // Intentar mover
      const success = makeMove(selectedSquare, square);
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }

    // Seleccionar pieza
    const moves = getLegalMoves(square);
    if (moves.length > 0) {
      setSelectedSquare(square);
      setValidMoves(moves);
    }
  };

  return (
    <div>
      <div className="mb-4">
        Turno: {turn === 'w' ? 'Blancas' : 'Negras'}
        {isCheckmate && <span className="text-red-500 ml-2">¡Jaque Mate!</span>}
      </div>
      
      <Board
        fen={fen}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
        onSquareClick={handleSquareClick}
      />
      
      <button onClick={reset} className="mt-4 px-4 py-2 bg-blue-600 rounded">
        Nueva partida
      </button>
    </div>
  );
}
\`\`\`

---

**Próximo paso:** Implementaremos movimientos especiales (enroque, en passant, promoción).
`,
        contentEn: `
# Move Validation

We need to ensure only legal moves according to chess rules are allowed.

## Approach: chess.js

Instead of implementing all logic from scratch (which is complex), we'll use the \`chess.js\` library:

\`\`\`bash
npm install chess.js
\`\`\`

## Basic chess.js Usage

\`\`\`typescript
import { Chess } from 'chess.js';

const game = new Chess();
const moves = game.moves(); // ['a3', 'a4', 'b3', ...]
game.move('e4');
game.isCheck();
game.isCheckmate();
game.fen();
\`\`\`

---

**Next step:** We'll implement special moves (castling, en passant, promotion).
`
      },
      {
        id: 'm4-l2',
        slug: 'movimientos-especiales',
        title: 'Movimientos especiales',
        titleEn: 'Special Moves',
        description: 'Enroque, en passant y promoción',
        descriptionEn: 'Castling, en passant and promotion',
        duration: '18 min',
        content: `
# Movimientos Especiales

El ajedrez tiene varios movimientos especiales que requieren manejo específico.

## 1. Enroque (Castling)

El rey se mueve dos casillas hacia la torre, y la torre salta al otro lado.

\`\`\`typescript
// chess.js maneja el enroque automáticamente
game.move('O-O');   // Enroque corto
game.move('O-O-O'); // Enroque largo

// O con coordenadas (el rey se mueve 2 casillas)
game.move({ from: 'e1', to: 'g1' }); // Detecta enroque corto
\`\`\`

### Animando el enroque

\`\`\`tsx
const animateCastling = (move: Move) => {
  // Animar rey
  animateMove(move.piece, move.from, move.to);
  
  // Animar torre
  if (move.flags.includes('k')) { // Kingside
    animateMove('R', 'h1', 'f1');
  } else if (move.flags.includes('q')) { // Queenside
    animateMove('R', 'a1', 'd1');
  }
};
\`\`\`

## 2. En Passant

Captura especial de peón.

\`\`\`typescript
// chess.js detecta en passant automáticamente
const move = game.move({ from: 'd5', to: 'e6' });
if (move.flags.includes('e')) {
  // Es captura en passant
  const capturedSquare = move.to[0] + move.from[1]; // e.g., 'e5'
  animateCapture(capturedSquare);
}
\`\`\`

## 3. Promoción

Cuando un peón llega a la última fila.

\`\`\`tsx
// src/components/PromotionDialog.tsx
interface PromotionDialogProps {
  color: 'w' | 'b';
  onSelect: (piece: 'q' | 'r' | 'b' | 'n') => void;
}

export function PromotionDialog({ color, onSelect }: PromotionDialogProps) {
  const pieces = ['q', 'r', 'b', 'n'] as const;
  
  return (
    <div className="absolute bg-white rounded-lg shadow-xl p-2 flex flex-col">
      {pieces.map(piece => (
        <button
          key={piece}
          onClick={() => onSelect(piece)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Piece piece={color === 'w' ? piece.toUpperCase() : piece} />
        </button>
      ))}
    </div>
  );
}
\`\`\`

### Hook con promoción

\`\`\`typescript
// src/hooks/useChess.ts
const [promotionMove, setPromotionMove] = useState<{from: string, to: string} | null>(null);

const makeMove = useCallback((from: string, to: string, promotion?: string) => {
  // Verificar si es promoción
  const piece = game.get(from);
  const isPromotion = piece?.type === 'p' && (to[1] === '8' || to[1] === '1');
  
  if (isPromotion && !promotion) {
    setPromotionMove({ from, to });
    return 'promotion';
  }
  
  const move = game.move({ from, to, promotion });
  // ...
}, [game]);

const completePromotion = useCallback((piece: string) => {
  if (promotionMove) {
    makeMove(promotionMove.from, promotionMove.to, piece);
    setPromotionMove(null);
  }
}, [promotionMove, makeMove]);
\`\`\`

---

**Próximo paso:** Detectaremos jaque, jaque mate y tablas.
`,
        contentEn: `
# Special Moves

Chess has several special moves that require specific handling.

## 1. Castling

The king moves two squares toward the rook, and the rook jumps to the other side.

## 2. En Passant

Special pawn capture.

## 3. Promotion

When a pawn reaches the last rank.

---

**Next step:** We'll detect check, checkmate and draws.
`
      },
      {
        id: 'm4-l3',
        slug: 'jaque-mate-tablas',
        title: 'Jaque, Mate y Tablas',
        titleEn: 'Check, Mate & Draws',
        description: 'Detecta el fin de la partida',
        descriptionEn: 'Detect game endings',
        duration: '15 min',
        content: `
# Jaque, Mate y Tablas

Necesitamos detectar y mostrar visualmente cuando la partida termina.

## Estados de fin de partida

\`\`\`typescript
// Con chess.js
game.isCheck()        // Rey en jaque
game.isCheckmate()    // Jaque mate
game.isStalemate()    // Ahogado (no puede mover pero no está en jaque)
game.isDraw()         // Tablas
game.isThreefoldRepetition() // Repetición triple
game.isInsufficientMaterial() // Material insuficiente

// Resultado
game.isGameOver()     // Cualquier fin de partida
\`\`\`

## Componente de estado del juego

\`\`\`tsx
// src/components/GameStatus.tsx
interface GameStatusProps {
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  turn: 'w' | 'b';
}

export function GameStatus({ isCheck, isCheckmate, isStalemate, isDraw, turn }: GameStatusProps) {
  if (isCheckmate) {
    const winner = turn === 'w' ? 'Negras' : 'Blancas';
    return (
      <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold animate-pulse">
        ¡Jaque Mate! Ganan las {winner}
      </div>
    );
  }

  if (isStalemate) {
    return (
      <div className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold">
        Tablas por ahogado
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold">
        Tablas
      </div>
    );
  }

  if (isCheck) {
    return (
      <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
        ¡Jaque!
      </div>
    );
  }

  return (
    <div className="bg-zinc-700 text-white px-4 py-2 rounded-lg">
      Turno: {turn === 'w' ? '⚪ Blancas' : '⚫ Negras'}
    </div>
  );
}
\`\`\`

## Resaltando el rey en jaque

\`\`\`tsx
// En el Board, encontrar la posición del rey en jaque
const getKingSquare = (color: 'w' | 'b'): string | null => {
  const board = game.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece?.type === 'k' && piece.color === color) {
        return String.fromCharCode(97 + c) + (8 - r);
      }
    }
  }
  return null;
};

// Casilla del rey en jaque
const kingInCheck = isCheck ? getKingSquare(turn) : null;

// En el render de Square:
<Square
  isInCheck={square === kingInCheck}
  // ...
/>

// CSS para el rey en jaque
.in-check {
  background: radial-gradient(circle, #ff0000 0%, transparent 70%);
}
\`\`\`

---

**Próximo paso:** Implementaremos la notación PGN para guardar partidas.
`,
        contentEn: `
# Check, Mate & Draws

We need to detect and visually show when the game ends.

## Game End States

\`\`\`typescript
game.isCheck()
game.isCheckmate()
game.isStalemate()
game.isDraw()
game.isGameOver()
\`\`\`

## Game Status Component

\`\`\`tsx
export function GameStatus({ isCheckmate, turn }) {
  if (isCheckmate) {
    const winner = turn === 'w' ? 'Black' : 'White';
    return <div>Checkmate! {winner} wins</div>;
  }
  // ...
}
\`\`\`

---

**Next step:** We'll implement PGN notation to save games.
`
      },
      {
        id: 'm4-l4',
        slug: 'notacion-pgn',
        title: 'Notación PGN',
        titleEn: 'PGN Notation',
        description: 'Guarda y carga partidas en formato estándar',
        descriptionEn: 'Save and load games in standard format',
        duration: '12 min',
        content: `
# Notación PGN

**PGN** (Portable Game Notation) es el formato estándar para guardar partidas de ajedrez.

## Estructura de un PGN

\`\`\`pgn
[Event "Casual Game"]
[Site "Chess.com"]
[Date "2024.01.15"]
[White "Magnus"]
[Black "Hikaru"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 1-0
\`\`\`

## Usando PGN con chess.js

\`\`\`typescript
// Cargar PGN
game.loadPgn(\`
[Event "Test"]
[White "Player1"]
[Black "Player2"]

1. e4 e5 2. Nf3 Nc6
\`);

// Exportar PGN
const pgn = game.pgn();

// Historial en notación SAN
const history = game.history(); // ['e4', 'e5', 'Nf3', 'Nc6']

// Historial detallado
const detailedHistory = game.history({ verbose: true });
// [{ from: 'e2', to: 'e4', san: 'e4', ... }, ...]
\`\`\`

## Componente MoveList

\`\`\`tsx
// src/components/MoveList.tsx
interface MoveListProps {
  history: { san: string }[];
  currentMove: number;
  onMoveClick: (index: number) => void;
}

export function MoveList({ history, currentMove, onMoveClick }: MoveListProps) {
  const pairs: [string, string?][] = [];
  
  for (let i = 0; i < history.length; i += 2) {
    pairs.push([history[i].san, history[i + 1]?.san]);
  }

  return (
    <div className="bg-zinc-800 rounded-lg p-4 max-h-80 overflow-y-auto">
      <table className="w-full text-sm">
        <tbody>
          {pairs.map(([white, black], i) => (
            <tr key={i} className="hover:bg-zinc-700">
              <td className="text-zinc-500 pr-2 w-8">{i + 1}.</td>
              <td 
                className={\`cursor-pointer px-2 \${currentMove === i * 2 ? 'bg-blue-600 rounded' : ''}\`}
                onClick={() => onMoveClick(i * 2)}
              >
                {white}
              </td>
              {black && (
                <td 
                  className={\`cursor-pointer px-2 \${currentMove === i * 2 + 1 ? 'bg-blue-600 rounded' : ''}\`}
                  onClick={() => onMoveClick(i * 2 + 1)}
                >
                  {black}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
\`\`\`

## Navegación por la partida

\`\`\`typescript
// Hook para navegar el historial
function useGameNavigation() {
  const [game] = useState(() => new Chess());
  const [moves, setMoves] = useState<string[]>([]);
  const [viewIndex, setViewIndex] = useState(-1);

  const getPositionAt = (index: number) => {
    const tempGame = new Chess();
    for (let i = 0; i <= index && i < moves.length; i++) {
      tempGame.move(moves[i]);
    }
    return tempGame.fen();
  };

  const goToMove = (index: number) => {
    setViewIndex(index);
  };

  const goToStart = () => goToMove(-1);
  const goToEnd = () => goToMove(moves.length - 1);
  const goBack = () => goToMove(Math.max(-1, viewIndex - 1));
  const goForward = () => goToMove(Math.min(moves.length - 1, viewIndex + 1));

  return { moves, viewIndex, getPositionAt, goToMove, goToStart, goToEnd, goBack, goForward };
}
\`\`\`

---

**Próximo paso:** Conectaremos todo con el motor Stockfish para análisis.
`,
        contentEn: `
# PGN Notation

**PGN** (Portable Game Notation) is the standard format for saving chess games.

## PGN Structure

\`\`\`pgn
[Event "Casual Game"]
[White "Magnus"]
[Black "Hikaru"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 1-0
\`\`\`

## Using PGN with chess.js

\`\`\`typescript
game.loadPgn(pgnString);
const pgn = game.pgn();
const history = game.history();
\`\`\`

---

**Next step:** We'll connect everything with the Stockfish engine for analysis.
`
      }
    ]
  },
  {
    id: 'm5',
    number: '05',
    slug: 'integracion-motor',
    title: 'Integración del Motor',
    titleEn: 'Engine Integration',
    description: 'Análisis en tiempo real con Stockfish',
    descriptionEn: 'Real-time analysis with Stockfish',
    icon: '🔌',
    lessons: [
      {
        id: 'm5-l1',
        slug: 'web-workers',
        title: 'Web Workers',
        titleEn: 'Web Workers',
        description: 'Ejecuta el motor sin bloquear la UI',
        descriptionEn: 'Run engine without blocking UI',
        duration: '15 min',
        content: `
# Web Workers

Stockfish es computacionalmente intensivo. Sin Web Workers, bloquearía la interfaz. Los Workers ejecutan código en un hilo separado.

## ¿Qué es un Web Worker?

Un Worker es un script que se ejecuta en segundo plano, separado del hilo principal de la página.

\`\`\`javascript
// main.js - Hilo principal
const worker = new Worker('worker.js');

worker.postMessage('Hola Worker');

worker.onmessage = (e) => {
  console.log('Respuesta:', e.data);
};

// worker.js - Hilo del worker
self.onmessage = (e) => {
  console.log('Recibido:', e.data);
  self.postMessage('Hola Main');
};
\`\`\`

## Stockfish como Worker

Stockfish.js ya viene preparado para funcionar como Worker:

\`\`\`typescript
// src/lib/stockfishWorker.ts
export function createStockfishWorker(): Worker {
  // En desarrollo, apunta al archivo en public/
  return new Worker('/stockfish.js');
}
\`\`\`

## Hook useStockfish completo

\`\`\`typescript
// src/hooks/useStockfish.ts
import { useEffect, useRef, useState, useCallback } from 'react';

interface EngineInfo {
  depth: number;
  score: number;
  mate: number | null;
  pv: string[];
  nps: number;
}

export function useStockfish() {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [info, setInfo] = useState<EngineInfo | null>(null);
  const [bestMove, setBestMove] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const worker = new Worker('/stockfish.js');
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const line = e.data;

      if (line === 'readyok') {
        setIsReady(true);
      }

      if (line.startsWith('info depth')) {
        const parsed = parseInfo(line);
        if (parsed) setInfo(parsed);
      }

      if (line.startsWith('bestmove')) {
        const move = line.split(' ')[1];
        setBestMove(move);
        setIsAnalyzing(false);
      }
    };

    // Inicializar UCI
    worker.postMessage('uci');
    worker.postMessage('isready');

    return () => {
      worker.postMessage('quit');
      worker.terminate();
    };
  }, []);

  const analyze = useCallback((fen: string, depth = 20) => {
    if (!workerRef.current || !isReady) return;
    
    setIsAnalyzing(true);
    setBestMove(null);
    setInfo(null);
    
    workerRef.current.postMessage('ucinewgame');
    workerRef.current.postMessage(\`position fen \${fen}\`);
    workerRef.current.postMessage(\`go depth \${depth}\`);
  }, [isReady]);

  const stop = useCallback(() => {
    workerRef.current?.postMessage('stop');
    setIsAnalyzing(false);
  }, []);

  return { isReady, isAnalyzing, info, bestMove, analyze, stop };
}

function parseInfo(line: string): EngineInfo | null {
  const depthMatch = line.match(/depth (\\d+)/);
  const scoreMatch = line.match(/score (cp|mate) (-?\\d+)/);
  const pvMatch = line.match(/pv (.+)/);
  const npsMatch = line.match(/nps (\\d+)/);

  if (!depthMatch) return null;

  return {
    depth: parseInt(depthMatch[1]),
    score: scoreMatch?.[1] === 'cp' ? parseInt(scoreMatch[2]) : 0,
    mate: scoreMatch?.[1] === 'mate' ? parseInt(scoreMatch[2]) : null,
    pv: pvMatch ? pvMatch[1].split(' ') : [],
    nps: npsMatch ? parseInt(npsMatch[1]) : 0,
  };
}
\`\`\`

---

**Próximo paso:** Mostraremos la evaluación visualmente.
`,
        contentEn: `
# Web Workers

Stockfish is computationally intensive. Without Web Workers, it would block the interface. Workers run code in a separate thread.

## What is a Web Worker?

A Worker is a script that runs in the background, separate from the main page thread.

\`\`\`javascript
const worker = new Worker('worker.js');
worker.postMessage('Hello Worker');
worker.onmessage = (e) => console.log(e.data);
\`\`\`

---

**Next step:** We'll display the evaluation visually.
`
      },
      {
        id: 'm5-l2',
        slug: 'barra-evaluacion',
        title: 'Barra de evaluación',
        titleEn: 'Evaluation Bar',
        description: 'Visualiza la ventaja de cada bando',
        descriptionEn: 'Visualize advantage for each side',
        duration: '12 min',
        content: `
# Barra de Evaluación

La barra de evaluación muestra visualmente quién va ganando. Es un elemento icónico de las plataformas de ajedrez.

## Componente EvalBar

\`\`\`tsx
// src/components/EvalBar.tsx
interface EvalBarProps {
  score: number;        // En centipawns
  mate: number | null;  // Mate en N movimientos
  orientation?: 'vertical' | 'horizontal';
}

export function EvalBar({ score, mate, orientation = 'vertical' }: EvalBarProps) {
  // Convertir score a porcentaje (limitado a ±10 peones)
  const clampedScore = Math.max(-1000, Math.min(1000, score));
  const percentage = 50 + (clampedScore / 1000) * 50;
  
  // Si hay mate, mostrar al extremo
  const whitePercentage = mate !== null
    ? (mate > 0 ? 100 : 0)
    : percentage;

  const formatScore = () => {
    if (mate !== null) {
      return \`M\${Math.abs(mate)}\`;
    }
    const pawns = Math.abs(score) / 100;
    return pawns.toFixed(1);
  };

  const isWhiteWinning = mate !== null ? mate > 0 : score > 0;

  if (orientation === 'vertical') {
    return (
      <div className="w-8 h-full bg-zinc-800 rounded-lg overflow-hidden relative">
        {/* Lado negro (arriba) */}
        <div 
          className="absolute top-0 left-0 right-0 bg-zinc-900 transition-all duration-300"
          style={{ height: \`\${100 - whitePercentage}%\` }}
        />
        {/* Lado blanco (abajo) */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-300"
          style={{ height: \`\${whitePercentage}%\` }}
        />
        {/* Texto */}
        <div className={\`
          absolute inset-x-0 flex items-center justify-center text-xs font-bold
          \${isWhiteWinning ? 'bottom-1 text-zinc-800' : 'top-1 text-white'}
        \`}>
          {formatScore()}
        </div>
      </div>
    );
  }

  // Horizontal version...
  return (
    <div className="h-6 w-full bg-zinc-800 rounded-lg overflow-hidden relative flex">
      <div 
        className="bg-white transition-all duration-300"
        style={{ width: \`\${whitePercentage}%\` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
        <span className={isWhiteWinning ? 'text-zinc-800' : 'text-white'}>
          {formatScore()}
        </span>
      </div>
    </div>
  );
}
\`\`\`

## Uso con el tablero

\`\`\`tsx
function ChessAnalysis() {
  const { info } = useStockfish();
  
  return (
    <div className="flex gap-2">
      <EvalBar 
        score={info?.score ?? 0} 
        mate={info?.mate ?? null} 
      />
      <Board fen={fen} />
    </div>
  );
}
\`\`\`

---

**Próximo paso:** Mostraremos flechas del mejor movimiento en el tablero.
`,
        contentEn: `
# Evaluation Bar

The evaluation bar visually shows who's winning. It's an iconic element of chess platforms.

## EvalBar Component

\`\`\`tsx
export function EvalBar({ score, mate }: { score: number; mate: number | null }) {
  const percentage = 50 + (score / 1000) * 50;
  // ...render bar
}
\`\`\`

---

**Next step:** We'll show best move arrows on the board.
`
      },
      {
        id: 'm5-l3',
        slug: 'flechas-movimiento',
        title: 'Flechas de mejor movimiento',
        titleEn: 'Best Move Arrows',
        description: 'Dibuja flechas sobre el tablero',
        descriptionEn: 'Draw arrows on the board',
        duration: '15 min',
        content: `
# Flechas de Mejor Movimiento

Las flechas muestran visualmente qué movimiento recomienda el motor.

## SVG Overlay

Usamos una capa SVG sobre el tablero para dibujar las flechas:

\`\`\`tsx
// src/components/Board/Arrows.tsx
interface ArrowProps {
  from: string;  // e.g., 'e2'
  to: string;    // e.g., 'e4'
  color?: string;
  squareSize: number;
}

export function Arrow({ from, to, color = '#15803d', squareSize }: ArrowProps) {
  const fromCoords = squareToPixel(from, squareSize);
  const toCoords = squareToPixel(to, squareSize);

  // Calcular puntos de la flecha
  const dx = toCoords.x - fromCoords.x;
  const dy = toCoords.y - fromCoords.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  // Cabeza de la flecha
  const headLength = squareSize * 0.4;
  const headWidth = squareSize * 0.3;

  // Punto donde termina el cuerpo de la flecha
  const bodyEndX = toCoords.x - Math.cos(angle) * headLength;
  const bodyEndY = toCoords.y - Math.sin(angle) * headLength;

  // Puntos de la cabeza
  const leftX = toCoords.x - Math.cos(angle - Math.PI / 6) * headLength;
  const leftY = toCoords.y - Math.sin(angle - Math.PI / 6) * headLength;
  const rightX = toCoords.x - Math.cos(angle + Math.PI / 6) * headLength;
  const rightY = toCoords.y - Math.sin(angle + Math.PI / 6) * headLength;

  return (
    <g opacity="0.8">
      {/* Cuerpo de la flecha */}
      <line
        x1={fromCoords.x}
        y1={fromCoords.y}
        x2={bodyEndX}
        y2={bodyEndY}
        stroke={color}
        strokeWidth={squareSize * 0.15}
        strokeLinecap="round"
      />
      {/* Cabeza de la flecha */}
      <polygon
        points={\`\${toCoords.x},\${toCoords.y} \${leftX},\${leftY} \${rightX},\${rightY}\`}
        fill={color}
      />
    </g>
  );
}

function squareToPixel(square: string, size: number) {
  const col = square.charCodeAt(0) - 97;
  const row = 8 - parseInt(square[1]);
  return {
    x: col * size + size / 2,
    y: row * size + size / 2,
  };
}
\`\`\`

## Capa de flechas

\`\`\`tsx
// src/components/Board/ArrowLayer.tsx
interface ArrowLayerProps {
  arrows: Array<{ from: string; to: string; color?: string }>;
  squareSize: number;
  boardSize: number;
}

export function ArrowLayer({ arrows, squareSize, boardSize }: ArrowLayerProps) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={boardSize}
      height={boardSize}
      viewBox={\`0 0 \${boardSize} \${boardSize}\`}
    >
      {arrows.map((arrow, i) => (
        <Arrow
          key={\`\${arrow.from}-\${arrow.to}-\${i}\`}
          from={arrow.from}
          to={arrow.to}
          color={arrow.color}
          squareSize={squareSize}
        />
      ))}
    </svg>
  );
}
\`\`\`

## Integrando con el análisis

\`\`\`tsx
function ChessAnalysis() {
  const { info, bestMove } = useStockfish();
  const squareSize = 80;
  
  // Convertir el mejor movimiento a flecha
  const arrows = bestMove ? [{
    from: bestMove.slice(0, 2),
    to: bestMove.slice(2, 4),
    color: '#15803d', // Verde
  }] : [];

  // También mostrar la línea principal (PV)
  if (info?.pv && info.pv.length > 1) {
    arrows.push({
      from: info.pv[1].slice(0, 2),
      to: info.pv[1].slice(2, 4),
      color: '#1d4ed8', // Azul (respuesta)
    });
  }

  return (
    <div className="relative">
      <Board fen={fen} />
      <ArrowLayer arrows={arrows} squareSize={squareSize} boardSize={squareSize * 8} />
    </div>
  );
}
\`\`\`

---

**Próximo paso:** Crearemos una interfaz completa con todos los controles.
`,
        contentEn: `
# Best Move Arrows

Arrows visually show which move the engine recommends.

## SVG Overlay

We use an SVG layer over the board to draw arrows:

\`\`\`tsx
export function Arrow({ from, to, color, squareSize }) {
  // Calculate arrow points
  // ...render SVG arrow
}
\`\`\`

---

**Next step:** We'll create a complete interface with all controls.
`
      }
    ]
  },
  {
    id: 'm6',
    number: '06',
    slug: 'interfaz-usuario',
    title: 'Interfaz de Usuario',
    titleEn: 'User Interface',
    description: 'Paneles, controles y layout completo',
    descriptionEn: 'Panels, controls and full layout',
    icon: '🎨',
    lessons: [
      {
        id: 'm6-l1',
        slug: 'layout-analisis',
        title: 'Layout de análisis',
        titleEn: 'Analysis Layout',
        description: 'Organiza todos los componentes',
        descriptionEn: 'Organize all components',
        duration: '15 min',
        content: `
# Layout de Análisis

Vamos a crear un layout profesional que combine todos nuestros componentes.

## Estructura

\`\`\`
┌─────────────────────────────────────────────┐
│ Header (logo, controles, config)            │
├────┬────────────────────┬───────────────────┤
│    │                    │ Panel de info     │
│ E  │    Tablero         │ - Evaluación      │
│ v  │                    │ - PV              │
│ a  │                    │ - Stats           │
│ l  │                    ├───────────────────┤
│    │                    │ Lista de moves    │
├────┴────────────────────┴───────────────────┤
│ Controles (play, back, forward, flip)       │
└─────────────────────────────────────────────┘
\`\`\`

## Componente AnalysisView

\`\`\`tsx
// src/components/AnalysisView.tsx
import { useState } from 'react';
import { Board } from './Board/Board';
import { EvalBar } from './EvalBar';
import { MoveList } from './MoveList';
import { EngineInfo } from './EngineInfo';
import { Controls } from './Controls';
import { useChess } from '../hooks/useChess';
import { useStockfish } from '../hooks/useStockfish';

export function AnalysisView() {
  const [flipped, setFlipped] = useState(false);
  const chess = useChess();
  const engine = useStockfish();

  // Auto-analizar en cada cambio de posición
  useEffect(() => {
    engine.analyze(chess.fen);
  }, [chess.fen]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center px-4">
        <h1 className="text-xl font-bold">♞ Stomfish Analysis</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto">
        {/* Columna izquierda: Eval + Tablero */}
        <div className="flex gap-2">
          <EvalBar
            score={engine.info?.score ?? 0}
            mate={engine.info?.mate ?? null}
          />
          <Board
            fen={chess.fen}
            flipped={flipped}
            onMove={chess.makeMove}
            arrows={engine.bestMove ? [{
              from: engine.bestMove.slice(0, 2),
              to: engine.bestMove.slice(2, 4),
            }] : []}
          />
        </div>

        {/* Columna derecha: Info + Moves */}
        <div className="flex flex-col gap-4 lg:w-80">
          <EngineInfo
            depth={engine.info?.depth ?? 0}
            nps={engine.info?.nps ?? 0}
            pv={engine.info?.pv ?? []}
            isAnalyzing={engine.isAnalyzing}
          />
          <MoveList
            history={chess.history}
            onMoveClick={(i) => chess.goToMove(i)}
          />
        </div>
      </div>

      {/* Controles */}
      <Controls
        onFlip={() => setFlipped(!flipped)}
        onReset={chess.reset}
        onUndo={chess.undo}
        isAnalyzing={engine.isAnalyzing}
        onToggleAnalysis={() => {
          engine.isAnalyzing ? engine.stop() : engine.analyze(chess.fen);
        }}
      />
    </div>
  );
}
\`\`\`

---

**Próximo paso:** Añadiremos controles de navegación.
`,
        contentEn: `
# Analysis Layout

Let's create a professional layout combining all our components.

---

**Next step:** We'll add navigation controls.
`
      }
    ]
  },
  {
    id: 'm7',
    number: '07',
    slug: 'temas-personalizacion',
    title: 'Temas y Personalización',
    titleEn: 'Themes & Customization',
    description: 'Colores, piezas y preferencias',
    descriptionEn: 'Colors, pieces and preferences',
    icon: '🎭',
    lessons: [
      {
        id: 'm7-l1',
        slug: 'sistema-temas',
        title: 'Sistema de temas',
        titleEn: 'Theme System',
        description: 'Cambia colores y estilos',
        descriptionEn: 'Change colors and styles',
        duration: '15 min',
        content: `
# Sistema de Temas

Permitiremos a los usuarios personalizar la apariencia del tablero.

## Definiendo temas

\`\`\`typescript
// src/themes/boardThemes.ts
export interface BoardTheme {
  name: string;
  light: string;
  dark: string;
  highlight: string;
  selected: string;
}

export const boardThemes: Record<string, BoardTheme> = {
  classic: {
    name: 'Clásico',
    light: '#f0d9b5',
    dark: '#b58863',
    highlight: 'rgba(255, 255, 0, 0.4)',
    selected: 'rgba(20, 85, 30, 0.5)',
  },
  blue: {
    name: 'Azul',
    light: '#dee3e6',
    dark: '#8ca2ad',
    highlight: 'rgba(0, 100, 255, 0.3)',
    selected: 'rgba(0, 100, 255, 0.5)',
  },
  green: {
    name: 'Verde',
    light: '#ffffdd',
    dark: '#86a666',
    highlight: 'rgba(255, 255, 0, 0.4)',
    selected: 'rgba(0, 150, 0, 0.5)',
  },
  brown: {
    name: 'Marrón',
    light: '#f0d9b5',
    dark: '#946f51',
    highlight: 'rgba(255, 255, 0, 0.4)',
    selected: 'rgba(0, 100, 0, 0.5)',
  },
  purple: {
    name: 'Púrpura',
    light: '#e8e0f0',
    dark: '#957bb8',
    highlight: 'rgba(200, 100, 255, 0.4)',
    selected: 'rgba(150, 50, 200, 0.5)',
  },
};
\`\`\`

## Context de tema

\`\`\`tsx
// src/context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BoardTheme, boardThemes } from '../themes/boardThemes';

interface ThemeContextValue {
  boardTheme: BoardTheme;
  pieceSet: string;
  setBoardTheme: (id: string) => void;
  setPieceSet: (set: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [boardThemeId, setBoardThemeId] = useState(() => 
    localStorage.getItem('boardTheme') || 'classic'
  );
  const [pieceSet, setPieceSetState] = useState(() =>
    localStorage.getItem('pieceSet') || 'cburnett'
  );

  const setBoardTheme = (id: string) => {
    setBoardThemeId(id);
    localStorage.setItem('boardTheme', id);
  };

  const setPieceSet = (set: string) => {
    setPieceSetState(set);
    localStorage.setItem('pieceSet', set);
  };

  return (
    <ThemeContext.Provider value={{
      boardTheme: boardThemes[boardThemeId],
      pieceSet,
      setBoardTheme,
      setPieceSet,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
\`\`\`

## Selector de tema

\`\`\`tsx
// src/components/ThemeSelector.tsx
import { boardThemes } from '../themes/boardThemes';
import { useTheme } from '../context/ThemeContext';

const PIECE_SETS = ['cburnett', 'merida', 'alpha', 'chess7', 'kosal'];

export function ThemeSelector() {
  const { boardTheme, pieceSet, setBoardTheme, setPieceSet } = useTheme();

  return (
    <div className="p-4 bg-zinc-800 rounded-lg space-y-4">
      <div>
        <label className="text-sm text-zinc-400 block mb-2">Tablero</label>
        <div className="flex gap-2">
          {Object.entries(boardThemes).map(([id, theme]) => (
            <button
              key={id}
              onClick={() => setBoardTheme(id)}
              className={\`w-10 h-10 rounded border-2 \${
                boardTheme.name === theme.name ? 'border-blue-500' : 'border-transparent'
              }\`}
              title={theme.name}
            >
              <div className="w-full h-full grid grid-cols-2">
                <div style={{ background: theme.light }} />
                <div style={{ background: theme.dark }} />
                <div style={{ background: theme.dark }} />
                <div style={{ background: theme.light }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-zinc-400 block mb-2">Piezas</label>
        <select
          value={pieceSet}
          onChange={(e) => setPieceSet(e.target.value)}
          className="bg-zinc-700 rounded px-3 py-2 w-full"
        >
          {PIECE_SETS.map(set => (
            <option key={set} value={set}>{set}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
\`\`\`

---

**Próximo paso:** Añadiremos efectos de sonido.
`,
        contentEn: `
# Theme System

We'll allow users to customize the board appearance.

## Defining Themes

\`\`\`typescript
export const boardThemes = {
  classic: { light: '#f0d9b5', dark: '#b58863', ... },
  blue: { light: '#dee3e6', dark: '#8ca2ad', ... },
  // ...
};
\`\`\`

---

**Next step:** We'll add sound effects.
`
      }
    ]
  },
  {
    id: 'm8',
    number: '08',
    slug: 'despliegue',
    title: 'Despliegue',
    titleEn: 'Deployment',
    description: 'Publica tu app en GitHub Pages',
    descriptionEn: 'Publish your app on GitHub Pages',
    icon: '🚀',
    lessons: [
      {
        id: 'm8-l1',
        slug: 'build-produccion',
        title: 'Build de producción',
        titleEn: 'Production Build',
        description: 'Optimiza tu app para producción',
        descriptionEn: 'Optimize your app for production',
        duration: '10 min',
        content: `
# Build de Producción

Vamos a preparar tu app para el mundo real.

## Configuración de Vite

\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/stomfish-learning/', // Nombre de tu repo
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          chess: ['chess.js'],
        },
      },
    },
  },
});
\`\`\`

## Scripts de build

\`\`\`json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
\`\`\`

## Instalar gh-pages

\`\`\`bash
npm install -D gh-pages
\`\`\`

## Desplegar

\`\`\`bash
npm run deploy
\`\`\`

¡Tu app estará disponible en \`https://tuusuario.github.io/stomfish-learning/\`!

---

**¡Felicidades! Has completado el curso.** 🎉
`,
        contentEn: `
# Production Build

Let's prepare your app for the real world.

## Vite Configuration

\`\`\`typescript
export default defineConfig({
  base: '/stomfish-learning/',
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
});
\`\`\`

## Deploy

\`\`\`bash
npm run deploy
\`\`\`

Your app will be available at \`https://yourusername.github.io/stomfish-learning/\`!

---

**Congratulations! You've completed the course.** 🎉
`
      }
    ]
  }
];

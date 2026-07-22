export interface Lesson {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  duration: string;
  content: string;
  contentEn: string;
}

export interface Module {
  id: string;
  number: string;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  lessons: Lesson[];
}

import { modulesThreeToEight } from './modules3to8';

export const courseModulesBase: Module[] = [
  {
    id: 'm1',
    number: '01',
    slug: 'fundamentos-motor',
    title: 'Fundamentos del Motor',
    titleEn: 'Engine Foundations',
    description: 'Descarga, instala y configura Stockfish',
    descriptionEn: 'Download, install & configure Stockfish',
    icon: '⚙️',
    lessons: [
      {
        id: 'm1-l1',
        slug: 'que-es-stockfish',
        title: '¿Qué es Stockfish y cómo funciona?',
        titleEn: 'What is Stockfish and how does it work?',
        description: 'Introducción al motor de ajedrez más potente del mundo',
        descriptionEn: 'Introduction to the most powerful chess engine in the world',
        duration: '10 min',
        content: `
# ¿Qué es Stockfish?

**Stockfish** es el motor de ajedrez de código abierto más potente del mundo. Es usado por millones de jugadores, desde principiantes hasta grandes maestros, para analizar partidas y mejorar su juego.

## ¿Por qué Stockfish?

- 🏆 **#1 en el ranking CCRL** - Consistentemente el motor más fuerte
- 🆓 **100% Open Source** - Licencia GPL, código disponible en GitHub
- 🌐 **Multiplataforma** - Windows, Mac, Linux, y compilable a WebAssembly
- 🔧 **Extensible** - Protocolo UCI estándar para comunicación

## ¿Cómo funciona un motor de ajedrez?

Un motor de ajedrez como Stockfish funciona mediante tres componentes principales:

### 1. Generador de Movimientos
Calcula todos los movimientos legales posibles en una posición dada. Stockfish puede generar millones de posiciones por segundo.

\`\`\`
Posición inicial → 20 movimientos posibles
Después de 1.e4 → 20 respuestas posibles
Después de 1.e4 e5 → 29 movimientos para blancas
\`\`\`

### 2. Función de Evaluación
Asigna un valor numérico a cada posición. Positivo = ventaja blancas, negativo = ventaja negras.

\`\`\`
+1.00 = Blancas tienen ventaja de ~1 peón
 0.00 = Posición igualada
-2.50 = Negras tienen ventaja significativa
\`\`\`

**Factores que evalúa:**
- Material (piezas en el tablero)
- Estructura de peones
- Seguridad del rey
- Actividad de piezas
- Control del centro

### 3. Algoritmo de Búsqueda
Explora el árbol de posiciones futuras para encontrar el mejor movimiento. Stockfish usa **Alpha-Beta pruning** con mejoras como:

- **Iterative Deepening**: Busca cada vez más profundo
- **Transposition Tables**: Recuerda posiciones ya analizadas
- **Null Move Pruning**: Descarta líneas poco prometedoras
- **Late Move Reductions**: Reduce profundidad en movimientos tardíos

## NNUE: La revolución de Stockfish

Desde 2020, Stockfish incorpora **NNUE** (Efficiently Updatable Neural Network):

\`\`\`
Stockfish Clásico: Evaluación basada en reglas programadas
Stockfish NNUE: Evaluación con red neuronal entrenada
\`\`\`

NNUE combina la velocidad de búsqueda tradicional con la intuición posicional de las redes neuronales, resultando en un motor significativamente más fuerte.

## El protocolo UCI

Stockfish se comunica mediante el protocolo **UCI** (Universal Chess Interface). Es un protocolo de texto simple:

\`\`\`bash
# Iniciar comunicación
> uci
< id name Stockfish 16
< id author T. Romstad, M. Costalba, J. Kiiski, G. Linscott
< uciok

# Configurar una posición
> position startpos moves e2e4 e7e5

# Pedir análisis
> go depth 20
< info depth 20 score cp 35 pv d2d4 d7d6 ...
< bestmove d2d4
\`\`\`

En las próximas lecciones, aprenderás a usar estos comandos desde JavaScript.

## Stockfish vs Otros Motores

| Motor | ELO (aprox) | Open Source | NNUE |
|-------|-------------|-------------|------|
| Stockfish 16 | 3550+ | ✅ | ✅ |
| Leela Chess Zero | 3500+ | ✅ | NN puro |
| Komodo | 3450+ | ❌ | ✅ |
| Houdini | 3400+ | ❌ | ❌ |

## ¿Qué construiremos?

En este curso, aprenderás a:

1. **Ejecutar Stockfish** en el navegador usando WebAssembly
2. **Comunicarte** con el motor via el protocolo UCI
3. **Construir** un tablero de ajedrez interactivo
4. **Visualizar** el análisis del motor en tiempo real
5. **Desplegar** tu propia plataforma de ajedrez

¡Todo con código abierto y desplegable gratis en GitHub Pages!

---

**Próximo paso:** Descargaremos Stockfish y lo ejecutaremos por primera vez.
`,
        contentEn: `
# What is Stockfish?

**Stockfish** is the most powerful open-source chess engine in the world. It's used by millions of players, from beginners to grandmasters, to analyze games and improve their play.

## Why Stockfish?

- 🏆 **#1 in CCRL ranking** - Consistently the strongest engine
- 🆓 **100% Open Source** - GPL license, code available on GitHub
- 🌐 **Cross-platform** - Windows, Mac, Linux, and compilable to WebAssembly
- 🔧 **Extensible** - Standard UCI protocol for communication

## How does a chess engine work?

A chess engine like Stockfish works through three main components:

### 1. Move Generator
Calculates all possible legal moves in a given position. Stockfish can generate millions of positions per second.

\`\`\`
Starting position → 20 possible moves
After 1.e4 → 20 possible responses
After 1.e4 e5 → 29 moves for white
\`\`\`

### 2. Evaluation Function
Assigns a numerical value to each position. Positive = white advantage, negative = black advantage.

\`\`\`
+1.00 = White has ~1 pawn advantage
 0.00 = Equal position
-2.50 = Black has significant advantage
\`\`\`

**Factors evaluated:**
- Material (pieces on the board)
- Pawn structure
- King safety
- Piece activity
- Center control

### 3. Search Algorithm
Explores the tree of future positions to find the best move. Stockfish uses **Alpha-Beta pruning** with improvements like:

- **Iterative Deepening**: Searches deeper each iteration
- **Transposition Tables**: Remembers already analyzed positions
- **Null Move Pruning**: Discards unpromising lines
- **Late Move Reductions**: Reduces depth on late moves

## NNUE: The Stockfish Revolution

Since 2020, Stockfish incorporates **NNUE** (Efficiently Updatable Neural Network):

\`\`\`
Classic Stockfish: Evaluation based on programmed rules
Stockfish NNUE: Evaluation with trained neural network
\`\`\`

NNUE combines traditional search speed with the positional intuition of neural networks, resulting in a significantly stronger engine.

## The UCI Protocol

Stockfish communicates via the **UCI** (Universal Chess Interface) protocol. It's a simple text protocol:

\`\`\`bash
# Start communication
> uci
< id name Stockfish 16
< id author T. Romstad, M. Costalba, J. Kiiski, G. Linscott
< uciok

# Set up a position
> position startpos moves e2e4 e7e5

# Request analysis
> go depth 20
< info depth 20 score cp 35 pv d2d4 d7d6 ...
< bestmove d2d4
\`\`\`

In the next lessons, you'll learn to use these commands from JavaScript.

## Stockfish vs Other Engines

| Engine | ELO (approx) | Open Source | NNUE |
|--------|--------------|-------------|------|
| Stockfish 16 | 3550+ | ✅ | ✅ |
| Leela Chess Zero | 3500+ | ✅ | Pure NN |
| Komodo | 3450+ | ❌ | ✅ |
| Houdini | 3400+ | ❌ | ❌ |

## What will we build?

In this course, you'll learn to:

1. **Run Stockfish** in the browser using WebAssembly
2. **Communicate** with the engine via UCI protocol
3. **Build** an interactive chess board
4. **Visualize** engine analysis in real-time
5. **Deploy** your own chess platform

All open source and deployable for free on GitHub Pages!

---

**Next step:** We'll download Stockfish and run it for the first time.
`
      },
      {
        id: 'm1-l2',
        slug: 'descargar-stockfish',
        title: 'Descargando Stockfish',
        titleEn: 'Downloading Stockfish',
        description: 'Obtén los binarios y la versión WASM para web',
        descriptionEn: 'Get the binaries and WASM version for web',
        duration: '8 min',
        content: `
# Descargando Stockfish

Existen varias formas de obtener Stockfish dependiendo de cómo quieras usarlo. Para desarrollo web, nos interesa especialmente la versión **WebAssembly**.

## Opciones de descarga

### 1. Binario nativo (para pruebas locales)

Descarga desde el sitio oficial:
- 🔗 [stockfishchess.org/download](https://stockfishchess.org/download/)

Selecciona tu sistema operativo:
- **Windows**: \`stockfish-windows-x86-64-avx2.exe\`
- **macOS**: \`stockfish-macos-x86-64\` o \`stockfish-macos-arm64\`
- **Linux**: \`stockfish-linux-x86-64-avx2\`

### 2. Stockfish.js (WebAssembly)

Para usar en el navegador, necesitamos la versión compilada a WebAssembly. Hay varias opciones:

#### Opción A: stockfish.js (recomendado para empezar)

\`\`\`bash
npm install stockfish
\`\`\`

Este paquete incluye el motor compilado a JavaScript/WASM.

#### Opción B: stockfish.wasm (más rendimiento)

\`\`\`bash
npm install stockfish.wasm
\`\`\`

Versión WASM pura con mejor rendimiento pero requiere configuración adicional.

#### Opción C: Desde CDN

\`\`\`html
<script src="https://unpkg.com/stockfish/stockfish.js"></script>
\`\`\`

## Estructura de archivos

Cuando uses stockfish.js, obtendrás estos archivos:

\`\`\`
node_modules/stockfish/
├── stockfish.js          # Loader principal
├── stockfish.wasm        # Binario WebAssembly
├── stockfish.worker.js   # Worker para multi-threading
└── stockfish-nnue.wasm   # Red neuronal NNUE (opcional)
\`\`\`

## Verificando la instalación

Crea un archivo de prueba:

\`\`\`javascript
// test-stockfish.js
const Stockfish = require('stockfish');
const engine = Stockfish();

engine.onmessage = (msg) => {
  console.log('Stockfish:', msg);
};

engine.postMessage('uci');
engine.postMessage('isready');
\`\`\`

Ejecuta con Node.js:

\`\`\`bash
node test-stockfish.js
\`\`\`

Deberías ver:

\`\`\`
Stockfish: id name Stockfish 16
Stockfish: id author T. Romstad, M. Costalba, J. Kiiski, G. Linscott
Stockfish: option name Debug Log File type string default
...
Stockfish: uciok
Stockfish: readyok
\`\`\`

## Para nuestro proyecto

En este curso usaremos un enfoque híbrido:

1. **Desarrollo**: stockfish.js vía npm
2. **Producción**: Archivos WASM servidos estáticamente

Crea la estructura de tu proyecto:

\`\`\`bash
mkdir stomfish-learning
cd stomfish-learning
npm init -y
npm install stockfish
\`\`\`

## Configuración en Vite/React

Para proyectos con Vite, necesitamos configurar los workers:

\`\`\`javascript
// vite.config.js
export default {
  optimizeDeps: {
    exclude: ['stockfish']
  },
  worker: {
    format: 'es'
  }
}
\`\`\`

## Copiando archivos WASM

Para producción, copia los archivos WASM a tu carpeta pública:

\`\`\`bash
cp node_modules/stockfish/*.wasm public/
cp node_modules/stockfish/*.js public/
\`\`\`

O usa un script en package.json:

\`\`\`json
{
  "scripts": {
    "copy-stockfish": "cp node_modules/stockfish/*.wasm public/ && cp node_modules/stockfish/stockfish.js public/"
  }
}
\`\`\`

---

**Próximo paso:** Configuraremos el entorno de desarrollo y haremos que Stockfish funcione en el navegador.
`,
        contentEn: `
# Downloading Stockfish

There are several ways to get Stockfish depending on how you want to use it. For web development, we're especially interested in the **WebAssembly** version.

## Download Options

### 1. Native Binary (for local testing)

Download from the official site:
- 🔗 [stockfishchess.org/download](https://stockfishchess.org/download/)

Select your operating system:
- **Windows**: \`stockfish-windows-x86-64-avx2.exe\`
- **macOS**: \`stockfish-macos-x86-64\` or \`stockfish-macos-arm64\`
- **Linux**: \`stockfish-linux-x86-64-avx2\`

### 2. Stockfish.js (WebAssembly)

To use in the browser, we need the WebAssembly compiled version. There are several options:

#### Option A: stockfish.js (recommended to start)

\`\`\`bash
npm install stockfish
\`\`\`

This package includes the engine compiled to JavaScript/WASM.

#### Option B: stockfish.wasm (more performance)

\`\`\`bash
npm install stockfish.wasm
\`\`\`

Pure WASM version with better performance but requires additional setup.

#### Option C: From CDN

\`\`\`html
<script src="https://unpkg.com/stockfish/stockfish.js"></script>
\`\`\`

## File Structure

When using stockfish.js, you'll get these files:

\`\`\`
node_modules/stockfish/
├── stockfish.js          # Main loader
├── stockfish.wasm        # WebAssembly binary
├── stockfish.worker.js   # Worker for multi-threading
└── stockfish-nnue.wasm   # NNUE neural network (optional)
\`\`\`

## Verifying Installation

Create a test file:

\`\`\`javascript
// test-stockfish.js
const Stockfish = require('stockfish');
const engine = Stockfish();

engine.onmessage = (msg) => {
  console.log('Stockfish:', msg);
};

engine.postMessage('uci');
engine.postMessage('isready');
\`\`\`

Run with Node.js:

\`\`\`bash
node test-stockfish.js
\`\`\`

You should see:

\`\`\`
Stockfish: id name Stockfish 16
Stockfish: id author T. Romstad, M. Costalba, J. Kiiski, G. Linscott
Stockfish: option name Debug Log File type string default
...
Stockfish: uciok
Stockfish: readyok
\`\`\`

## For Our Project

In this course we'll use a hybrid approach:

1. **Development**: stockfish.js via npm
2. **Production**: WASM files served statically

Create your project structure:

\`\`\`bash
mkdir stomfish-learning
cd stomfish-learning
npm init -y
npm install stockfish
\`\`\`

## Vite/React Configuration

For Vite projects, we need to configure workers:

\`\`\`javascript
// vite.config.js
export default {
  optimizeDeps: {
    exclude: ['stockfish']
  },
  worker: {
    format: 'es'
  }
}
\`\`\`

## Copying WASM Files

For production, copy WASM files to your public folder:

\`\`\`bash
cp node_modules/stockfish/*.wasm public/
cp node_modules/stockfish/*.js public/
\`\`\`

Or use a script in package.json:

\`\`\`json
{
  "scripts": {
    "copy-stockfish": "cp node_modules/stockfish/*.wasm public/ && cp node_modules/stockfish/stockfish.js public/"
  }
}
\`\`\`

---

**Next step:** We'll set up the development environment and get Stockfish working in the browser.
`
      },
      {
        id: 'm1-l3',
        slug: 'configuracion-entorno',
        title: 'Configuración del entorno',
        titleEn: 'Environment Setup',
        description: 'Prepara tu proyecto React + Vite + TypeScript',
        descriptionEn: 'Set up your React + Vite + TypeScript project',
        duration: '12 min',
        content: `
# Configuración del Entorno

Vamos a crear un proyecto desde cero con todas las herramientas que necesitaremos.

## Stack tecnológico

- **React 18+** - UI reactiva
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos utilitarios
- **Stockfish.js** - Motor de ajedrez

## Creando el proyecto

\`\`\`bash
# Crear proyecto con Vite
npm create vite@latest mi-ajedrez -- --template react-ts

# Entrar al directorio
cd mi-ajedrez

# Instalar dependencias base
npm install

# Instalar dependencias adicionales
npm install stockfish
npm install -D tailwindcss postcss autoprefixer
\`\`\`

## Configurar Tailwind CSS

Inicializa Tailwind:

\`\`\`bash
npx tailwindcss init -p
\`\`\`

Configura \`tailwind.config.js\`:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores del tablero
        'board-light': '#f0d9b5',
        'board-dark': '#b58863',
        'board-highlight': '#ffff00',
        'board-move': '#829769',
      }
    },
  },
  plugins: [],
}
\`\`\`

Actualiza \`src/index.css\`:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --board-light: #f0d9b5;
  --board-dark: #b58863;
}

body {
  @apply bg-zinc-900 text-zinc-100;
}
\`\`\`

## Estructura del proyecto

Organiza tu código así:

\`\`\`
src/
├── components/
│   ├── Board/
│   │   ├── Board.tsx
│   │   ├── Square.tsx
│   │   └── Piece.tsx
│   ├── Engine/
│   │   ├── EngineContext.tsx
│   │   └── useEngine.ts
│   └── UI/
│       ├── EvalBar.tsx
│       └── MoveList.tsx
├── lib/
│   ├── chess.ts        # Lógica del juego
│   ├── fen.ts          # Parser FEN
│   └── stockfish.ts    # Wrapper del motor
├── hooks/
│   └── useStockfish.ts
├── types/
│   └── chess.ts
├── App.tsx
└── main.tsx
\`\`\`

## Tipos TypeScript

Crea \`src/types/chess.ts\`:

\`\`\`typescript
// Tipos básicos de ajedrez
export type PieceColor = 'white' | 'black';
export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export type Square = string; // e.g., 'e4', 'a1'
export type Board = (Piece | null)[][];

export interface Move {
  from: Square;
  to: Square;
  piece: Piece;
  captured?: Piece;
  promotion?: PieceType;
  san: string; // Standard Algebraic Notation
}

export interface Position {
  board: Board;
  turn: PieceColor;
  castling: {
    whiteKingside: boolean;
    whiteQueenside: boolean;
    blackKingside: boolean;
    blackQueenside: boolean;
  };
  enPassant: Square | null;
  halfmoveClock: number;
  fullmoveNumber: number;
}

// FEN string (posición en formato estándar)
export type FEN = string;

// Evaluación del motor
export interface EngineEval {
  depth: number;
  score: number; // en centipawns
  mate?: number; // si hay mate forzado
  pv: string[];  // línea principal
  bestMove: string;
}
\`\`\`

## Wrapper de Stockfish

Crea \`src/lib/stockfish.ts\`:

\`\`\`typescript
type MessageHandler = (message: string) => void;

export class StockfishEngine {
  private worker: Worker | null = null;
  private messageHandlers: MessageHandler[] = [];
  private isReady = false;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Cargar Stockfish como Web Worker
        this.worker = new Worker('/stockfish.js');
        
        this.worker.onmessage = (e) => {
          const message = e.data;
          this.messageHandlers.forEach(handler => handler(message));
          
          if (message === 'readyok') {
            this.isReady = true;
            resolve();
          }
        };

        this.worker.onerror = (e) => {
          reject(e);
        };

        // Iniciar protocolo UCI
        this.send('uci');
        this.send('isready');
      } catch (error) {
        reject(error);
      }
    });
  }

  send(command: string): void {
    if (this.worker) {
      this.worker.postMessage(command);
    }
  }

  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  setPosition(fen: string): void {
    this.send(\`position fen \${fen}\`);
  }

  go(options: { depth?: number; movetime?: number } = {}): void {
    let cmd = 'go';
    if (options.depth) cmd += \` depth \${options.depth}\`;
    if (options.movetime) cmd += \` movetime \${options.movetime}\`;
    this.send(cmd);
  }

  stop(): void {
    this.send('stop');
  }

  quit(): void {
    this.send('quit');
    this.worker?.terminate();
    this.worker = null;
  }
}
\`\`\`

## Hook personalizado

Crea \`src/hooks/useStockfish.ts\`:

\`\`\`typescript
import { useState, useEffect, useCallback } from 'react';
import { StockfishEngine } from '../lib/stockfish';
import type { EngineEval } from '../types/chess';

export function useStockfish() {
  const [engine, setEngine] = useState<StockfishEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [evaluation, setEvaluation] = useState<EngineEval | null>(null);

  useEffect(() => {
    const sf = new StockfishEngine();
    
    sf.init().then(() => {
      setEngine(sf);
      setIsLoading(false);
    });

    sf.onMessage((msg) => {
      // Parsear mensajes de info
      if (msg.startsWith('info depth')) {
        const eval = parseInfoMessage(msg);
        if (eval) setEvaluation(eval);
      }
      // Parsear mejor movimiento
      if (msg.startsWith('bestmove')) {
        const move = msg.split(' ')[1];
        setEvaluation(prev => prev ? { ...prev, bestMove: move } : null);
      }
    });

    return () => sf.quit();
  }, []);

  const analyze = useCallback((fen: string, depth = 20) => {
    if (engine) {
      engine.setPosition(fen);
      engine.go({ depth });
    }
  }, [engine]);

  const stop = useCallback(() => {
    engine?.stop();
  }, [engine]);

  return { isLoading, evaluation, analyze, stop };
}

function parseInfoMessage(msg: string): EngineEval | null {
  // Implementar parser de mensajes UCI
  // ...
  return null;
}
\`\`\`

## Verificar que funciona

Actualiza \`src/App.tsx\`:

\`\`\`tsx
import { useStockfish } from './hooks/useStockfish';

function App() {
  const { isLoading, evaluation, analyze } = useStockfish();

  const handleAnalyze = () => {
    // FEN de la posición inicial
    const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    analyze(startingFen, 15);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Mi Ajedrez</h1>
      
      {isLoading ? (
        <p>Cargando Stockfish...</p>
      ) : (
        <div>
          <button 
            onClick={handleAnalyze}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Analizar posición inicial
          </button>
          
          {evaluation && (
            <div className="mt-4 p-4 bg-zinc-800 rounded">
              <p>Profundidad: {evaluation.depth}</p>
              <p>Evaluación: {evaluation.score / 100}</p>
              <p>Mejor movimiento: {evaluation.bestMove}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
\`\`\`

Ejecuta el proyecto:

\`\`\`bash
npm run dev
\`\`\`

---

**Próximo paso:** Enviaremos nuestro primer comando al motor y obtendremos un análisis real.
`,
        contentEn: `
# Environment Setup

Let's create a project from scratch with all the tools we'll need.

## Tech Stack

- **React 18+** - Reactive UI
- **TypeScript** - Static typing
- **Vite** - Ultra-fast build tool
- **Tailwind CSS** - Utility styles
- **Stockfish.js** - Chess engine

## Creating the Project

\`\`\`bash
# Create project with Vite
npm create vite@latest my-chess -- --template react-ts

# Enter directory
cd my-chess

# Install base dependencies
npm install

# Install additional dependencies
npm install stockfish
npm install -D tailwindcss postcss autoprefixer
\`\`\`

## Configure Tailwind CSS

Initialize Tailwind:

\`\`\`bash
npx tailwindcss init -p
\`\`\`

Configure \`tailwind.config.js\`:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Board colors
        'board-light': '#f0d9b5',
        'board-dark': '#b58863',
        'board-highlight': '#ffff00',
        'board-move': '#829769',
      }
    },
  },
  plugins: [],
}
\`\`\`

Update \`src/index.css\`:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --board-light: #f0d9b5;
  --board-dark: #b58863;
}

body {
  @apply bg-zinc-900 text-zinc-100;
}
\`\`\`

## Project Structure

Organize your code like this:

\`\`\`
src/
├── components/
│   ├── Board/
│   │   ├── Board.tsx
│   │   ├── Square.tsx
│   │   └── Piece.tsx
│   ├── Engine/
│   │   ├── EngineContext.tsx
│   │   └── useEngine.ts
│   └── UI/
│       ├── EvalBar.tsx
│       └── MoveList.tsx
├── lib/
│   ├── chess.ts        # Game logic
│   ├── fen.ts          # FEN parser
│   └── stockfish.ts    # Engine wrapper
├── hooks/
│   └── useStockfish.ts
├── types/
│   └── chess.ts
├── App.tsx
└── main.tsx
\`\`\`

## TypeScript Types

Create \`src/types/chess.ts\`:

\`\`\`typescript
// Basic chess types
export type PieceColor = 'white' | 'black';
export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export type Square = string; // e.g., 'e4', 'a1'
export type Board = (Piece | null)[][];

export interface Move {
  from: Square;
  to: Square;
  piece: Piece;
  captured?: Piece;
  promotion?: PieceType;
  san: string; // Standard Algebraic Notation
}

export interface Position {
  board: Board;
  turn: PieceColor;
  castling: {
    whiteKingside: boolean;
    whiteQueenside: boolean;
    blackKingside: boolean;
    blackQueenside: boolean;
  };
  enPassant: Square | null;
  halfmoveClock: number;
  fullmoveNumber: number;
}

// FEN string (position in standard format)
export type FEN = string;

// Engine evaluation
export interface EngineEval {
  depth: number;
  score: number; // in centipawns
  mate?: number; // if forced mate
  pv: string[];  // principal variation
  bestMove: string;
}
\`\`\`

## Stockfish Wrapper

Create \`src/lib/stockfish.ts\`:

\`\`\`typescript
type MessageHandler = (message: string) => void;

export class StockfishEngine {
  private worker: Worker | null = null;
  private messageHandlers: MessageHandler[] = [];
  private isReady = false;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Load Stockfish as Web Worker
        this.worker = new Worker('/stockfish.js');
        
        this.worker.onmessage = (e) => {
          const message = e.data;
          this.messageHandlers.forEach(handler => handler(message));
          
          if (message === 'readyok') {
            this.isReady = true;
            resolve();
          }
        };

        this.worker.onerror = (e) => {
          reject(e);
        };

        // Start UCI protocol
        this.send('uci');
        this.send('isready');
      } catch (error) {
        reject(error);
      }
    });
  }

  send(command: string): void {
    if (this.worker) {
      this.worker.postMessage(command);
    }
  }

  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  setPosition(fen: string): void {
    this.send(\`position fen \${fen}\`);
  }

  go(options: { depth?: number; movetime?: number } = {}): void {
    let cmd = 'go';
    if (options.depth) cmd += \` depth \${options.depth}\`;
    if (options.movetime) cmd += \` movetime \${options.movetime}\`;
    this.send(cmd);
  }

  stop(): void {
    this.send('stop');
  }

  quit(): void {
    this.send('quit');
    this.worker?.terminate();
    this.worker = null;
  }
}
\`\`\`

Run the project:

\`\`\`bash
npm run dev
\`\`\`

---

**Next step:** We'll send our first command to the engine and get a real analysis.
`
      },
      {
        id: 'm1-l4',
        slug: 'primer-comando',
        title: 'Tu primer comando UCI',
        titleEn: 'Your first UCI command',
        description: 'Comunícate con el motor y obtén tu primer análisis',
        descriptionEn: 'Communicate with the engine and get your first analysis',
        duration: '15 min',
        content: `
# Tu Primer Comando UCI

Es hora de hablar con Stockfish. En esta lección, enviaremos comandos UCI y parsearemos las respuestas del motor.

## El protocolo UCI

UCI (Universal Chess Interface) es el estándar de comunicación entre interfaces gráficas y motores de ajedrez. Es un protocolo de texto simple basado en líneas.

### Comandos básicos

| Comando | Descripción |
|---------|-------------|
| \`uci\` | Iniciar modo UCI, el motor responde con su info |
| \`isready\` | Pregunta si el motor está listo |
| \`ucinewgame\` | Prepara para una nueva partida |
| \`position\` | Establece la posición del tablero |
| \`go\` | Inicia el cálculo/análisis |
| \`stop\` | Detiene el cálculo |
| \`quit\` | Cierra el motor |

### Respuestas del motor

| Respuesta | Significado |
|-----------|-------------|
| \`uciok\` | Motor listo para recibir comandos |
| \`readyok\` | Motor listo para calcular |
| \`info ...\` | Información durante el cálculo |
| \`bestmove\` | Mejor movimiento encontrado |

## Estableciendo posiciones

El comando \`position\` tiene dos formas:

\`\`\`bash
# Desde la posición inicial + movimientos
position startpos moves e2e4 e7e5 g1f3

# Desde una posición FEN
position fen rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
\`\`\`

## Ejemplo práctico interactivo

Vamos a crear un componente que muestre la comunicación en tiempo real:

\`\`\`tsx
// src/components/EngineConsole.tsx
import { useState, useEffect, useRef } from 'react';

export function EngineConsole() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Inicializar el worker
    const worker = new Worker('/stockfish.js');
    workerRef.current = worker;

    worker.onmessage = (e) => {
      setMessages(prev => [...prev, \`← \${e.data}\`]);
    };

    // Enviar comando inicial
    sendCommand('uci');

    return () => worker.terminate();
  }, []);

  const sendCommand = (cmd: string) => {
    if (workerRef.current) {
      setMessages(prev => [...prev, \`→ \${cmd}\`]);
      workerRef.current.postMessage(cmd);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm text-zinc-400">Stockfish UCI Console</span>
      </div>
      
      <div className="h-80 overflow-y-auto p-4 font-mono text-sm">
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={msg.startsWith('→') ? 'text-blue-400' : 'text-green-400'}
          >
            {msg}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-zinc-700 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un comando UCI..."
            className="flex-1 bg-zinc-800 px-4 py-2 rounded text-sm"
          />
          <button 
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded text-sm font-medium"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
\`\`\`

## Prueba estos comandos

1. **Verificar que el motor está listo:**
\`\`\`
isready
\`\`\`
Respuesta: \`readyok\`

2. **Establecer posición inicial y analizar:**
\`\`\`
position startpos
go depth 15
\`\`\`

3. **Analizar una posición específica:**
\`\`\`
position fen r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4
go depth 20
\`\`\`

4. **Detener el análisis:**
\`\`\`
stop
\`\`\`

## Parseando la respuesta \`info\`

Las líneas \`info\` contienen datos valiosos:

\`\`\`
info depth 15 seldepth 20 multipv 1 score cp 35 nodes 284619 nps 948730 time 300 pv d2d4 d7d6 c2c4
\`\`\`

| Campo | Significado |
|-------|-------------|
| \`depth 15\` | Profundidad de búsqueda |
| \`seldepth 20\` | Profundidad selectiva máxima |
| \`score cp 35\` | Evaluación: +0.35 peones |
| \`score mate 5\` | Mate en 5 movimientos |
| \`nodes 284619\` | Nodos analizados |
| \`nps 948730\` | Nodos por segundo |
| \`pv d2d4 d7d6...\` | Línea principal (mejores movimientos) |

## Función de parseo

\`\`\`typescript
interface EngineInfo {
  depth: number;
  score: number;
  mate?: number;
  nodes: number;
  nps: number;
  pv: string[];
}

function parseInfoLine(line: string): EngineInfo | null {
  if (!line.startsWith('info depth')) return null;

  const parts = line.split(' ');
  const info: EngineInfo = {
    depth: 0,
    score: 0,
    nodes: 0,
    nps: 0,
    pv: []
  };

  for (let i = 0; i < parts.length; i++) {
    switch (parts[i]) {
      case 'depth':
        info.depth = parseInt(parts[++i]);
        break;
      case 'score':
        if (parts[i + 1] === 'cp') {
          info.score = parseInt(parts[i + 2]);
          i += 2;
        } else if (parts[i + 1] === 'mate') {
          info.mate = parseInt(parts[i + 2]);
          i += 2;
        }
        break;
      case 'nodes':
        info.nodes = parseInt(parts[++i]);
        break;
      case 'nps':
        info.nps = parseInt(parts[++i]);
        break;
      case 'pv':
        info.pv = parts.slice(i + 1);
        return info; // pv es siempre el último
    }
  }

  return info;
}
\`\`\`

## Ejercicio: Analiza esta posición

Copia esta posición (la famosa "Fried Liver Attack"):

\`\`\`
position fen r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6
go depth 20
\`\`\`

¿Cuál es el mejor movimiento para las blancas? 🤔

---

**Próximo paso:** En el siguiente módulo, construiremos un tablero de ajedrez visual para mostrar las posiciones.
`,
        contentEn: `
# Your First UCI Command

It's time to talk to Stockfish. In this lesson, we'll send UCI commands and parse engine responses.

## The UCI Protocol

UCI (Universal Chess Interface) is the standard communication protocol between graphical interfaces and chess engines. It's a simple line-based text protocol.

### Basic Commands

| Command | Description |
|---------|-------------|
| \`uci\` | Start UCI mode, engine responds with its info |
| \`isready\` | Ask if engine is ready |
| \`ucinewgame\` | Prepare for a new game |
| \`position\` | Set the board position |
| \`go\` | Start calculation/analysis |
| \`stop\` | Stop calculation |
| \`quit\` | Close the engine |

### Engine Responses

| Response | Meaning |
|----------|---------|
| \`uciok\` | Engine ready to receive commands |
| \`readyok\` | Engine ready to calculate |
| \`info ...\` | Information during calculation |
| \`bestmove\` | Best move found |

## Setting Positions

The \`position\` command has two forms:

\`\`\`bash
# From starting position + moves
position startpos moves e2e4 e7e5 g1f3

# From a FEN position
position fen rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
\`\`\`

## Parsing the \`info\` Response

The \`info\` lines contain valuable data:

\`\`\`
info depth 15 seldepth 20 multipv 1 score cp 35 nodes 284619 nps 948730 time 300 pv d2d4 d7d6 c2c4
\`\`\`

| Field | Meaning |
|-------|---------|
| \`depth 15\` | Search depth |
| \`seldepth 20\` | Maximum selective depth |
| \`score cp 35\` | Evaluation: +0.35 pawns |
| \`score mate 5\` | Mate in 5 moves |
| \`nodes 284619\` | Nodes analyzed |
| \`nps 948730\` | Nodes per second |
| \`pv d2d4 d7d6...\` | Principal variation (best moves) |

## Exercise: Analyze this Position

Copy this position (the famous "Fried Liver Attack"):

\`\`\`
position fen r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6
go depth 20
\`\`\`

What's the best move for white? 🤔

---

**Next step:** In the next module, we'll build a visual chessboard to display positions.
`
      }
    ]
  },
  {
    id: 'm2',
    number: '02',
    slug: 'tablero-ajedrez',
    title: 'El Tablero de Ajedrez',
    titleEn: 'The Chessboard',
    description: 'Construye un tablero responsive y visual',
    descriptionEn: 'Build a responsive, visual board',
    icon: '♟️',
    lessons: [
      {
        id: 'm2-l1',
        slug: 'entendiendo-fen',
        title: 'Entendiendo la notación FEN',
        titleEn: 'Understanding FEN Notation',
        description: 'Aprende a leer y escribir posiciones de ajedrez',
        descriptionEn: 'Learn to read and write chess positions',
        duration: '10 min',
        content: `
# Entendiendo la Notación FEN

**FEN** (Forsyth-Edwards Notation) es el estándar para representar posiciones de ajedrez como texto. Es esencial para comunicarnos con Stockfish.

## Anatomía de un FEN

Un FEN tiene 6 partes separadas por espacios:

\`\`\`
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
│                                           │ │    │ │ │
│                                           │ │    │ │ └─ Número de jugada
│                                           │ │    │ └─── Contador 50 movimientos
│                                           │ │    └───── Casilla en passant
│                                           │ └────────── Derechos de enroque
│                                           └──────────── Turno (w/b)
└──────────────────────────────────────────────────────── Posición del tablero
\`\`\`

## Parte 1: Posición del tablero

Las piezas se representan con letras:

| Letra | Pieza (Blancas) | Letra | Pieza (Negras) |
|-------|-----------------|-------|----------------|
| K | Rey ♔ | k | Rey ♚ |
| Q | Dama ♕ | q | Dama ♛ |
| R | Torre ♖ | r | Torre ♜ |
| B | Alfil ♗ | b | Alfil ♝ |
| N | Caballo ♘ | n | Caballo ♞ |
| P | Peón ♙ | p | Peón ♟ |

Los números indican casillas vacías consecutivas. Las filas se separan con \`/\`.

### Ejemplo visual

\`\`\`
  a b c d e f g h
8 r n b q k b n r  →  rnbqkbnr
7 p p p p p p p p  →  pppppppp
6 . . . . . . . .  →  8
5 . . . . . . . .  →  8
4 . . . . P . . .  →  4P3
3 . . . . . . . .  →  8
2 P P P P . P P P  →  PPPP1PPP
1 R N B Q K B N R  →  RNBQKBNR
\`\`\`

FEN después de 1.e4:
\`\`\`
rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
\`\`\`

## Parte 2: Turno

- \`w\` = Blancas mueven
- \`b\` = Negras mueven

## Parte 3: Derechos de enroque

- \`K\` = Blancas pueden enrocar corto
- \`Q\` = Blancas pueden enrocar largo
- \`k\` = Negras pueden enrocar corto
- \`q\` = Negras pueden enrocar largo
- \`-\` = Nadie puede enrocar

## Parte 4: Casilla en passant

Si un peón acaba de avanzar dos casillas, se indica la casilla donde puede ser capturado al paso.

Ejemplo: Después de 1.e4, el FEN incluye \`e3\` porque un peón negro en d4 o f4 podría capturar al paso.

## Parser FEN en TypeScript

\`\`\`typescript
// src/lib/fen.ts

export interface ParsedFEN {
  board: (string | null)[][];
  turn: 'w' | 'b';
  castling: string;
  enPassant: string | null;
  halfmove: number;
  fullmove: number;
}

export function parseFEN(fen: string): ParsedFEN {
  const parts = fen.split(' ');
  
  // Parsear el tablero
  const board: (string | null)[][] = [];
  const rows = parts[0].split('/');
  
  for (const row of rows) {
    const boardRow: (string | null)[] = [];
    for (const char of row) {
      if (char >= '1' && char <= '8') {
        // Casillas vacías
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push(null);
        }
      } else {
        // Pieza
        boardRow.push(char);
      }
    }
    board.push(boardRow);
  }

  return {
    board,
    turn: parts[1] as 'w' | 'b',
    castling: parts[2],
    enPassant: parts[3] === '-' ? null : parts[3],
    halfmove: parseInt(parts[4]),
    fullmove: parseInt(parts[5])
  };
}

export function boardToFEN(board: (string | null)[][]): string {
  return board.map(row => {
    let fenRow = '';
    let emptyCount = 0;
    
    for (const cell of row) {
      if (cell === null) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fenRow += emptyCount;
          emptyCount = 0;
        }
        fenRow += cell;
      }
    }
    
    if (emptyCount > 0) fenRow += emptyCount;
    return fenRow;
  }).join('/');
}
\`\`\`

## Posiciones FEN famosas

Prueba estas posiciones en tu tablero:

**Posición inicial:**
\`\`\`
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
\`\`\`

**Defensa Siciliana (después de 1.e4 c5):**
\`\`\`
rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2
\`\`\`

**Mate del pastor:**
\`\`\`
r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4
\`\`\`

**Mate de la coz:**
\`\`\`
5rk1/5ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1
\`\`\`

---

**Próximo paso:** Renderizaremos el tablero visualmente usando React y SVG.
`,
        contentEn: `
# Understanding FEN Notation

**FEN** (Forsyth-Edwards Notation) is the standard for representing chess positions as text. It's essential for communicating with Stockfish.

## Anatomy of a FEN

A FEN has 6 parts separated by spaces:

\`\`\`
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
│                                           │ │    │ │ │
│                                           │ │    │ │ └─ Move number
│                                           │ │    │ └─── 50-move counter
│                                           │ │    └───── En passant square
│                                           │ └────────── Castling rights
│                                           └──────────── Turn (w/b)
└──────────────────────────────────────────────────────── Board position
\`\`\`

## Part 1: Board Position

Pieces are represented with letters:

| Letter | Piece (White) | Letter | Piece (Black) |
|--------|---------------|--------|---------------|
| K | King ♔ | k | King ♚ |
| Q | Queen ♕ | q | Queen ♛ |
| R | Rook ♖ | r | Rook ♜ |
| B | Bishop ♗ | b | Bishop ♝ |
| N | Knight ♘ | n | Knight ♞ |
| P | Pawn ♙ | p | Pawn ♟ |

Numbers indicate consecutive empty squares. Rows are separated by \`/\`.

## FEN Parser in TypeScript

\`\`\`typescript
// src/lib/fen.ts

export interface ParsedFEN {
  board: (string | null)[][];
  turn: 'w' | 'b';
  castling: string;
  enPassant: string | null;
  halfmove: number;
  fullmove: number;
}

export function parseFEN(fen: string): ParsedFEN {
  const parts = fen.split(' ');
  
  // Parse the board
  const board: (string | null)[][] = [];
  const rows = parts[0].split('/');
  
  for (const row of rows) {
    const boardRow: (string | null)[] = [];
    for (const char of row) {
      if (char >= '1' && char <= '8') {
        // Empty squares
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push(null);
        }
      } else {
        // Piece
        boardRow.push(char);
      }
    }
    board.push(boardRow);
  }

  return {
    board,
    turn: parts[1] as 'w' | 'b',
    castling: parts[2],
    enPassant: parts[3] === '-' ? null : parts[3],
    halfmove: parseInt(parts[4]),
    fullmove: parseInt(parts[5])
  };
}
\`\`\`

---

**Next step:** We'll render the board visually using React and SVG.
`
      },
      {
        id: 'm2-l2',
        slug: 'renderizando-tablero',
        title: 'Renderizando el tablero',
        titleEn: 'Rendering the Board',
        description: 'Crea un tablero visual con React',
        descriptionEn: 'Create a visual board with React',
        duration: '15 min',
        content: `
# Renderizando el Tablero

Vamos a construir un tablero de ajedrez visual usando React y CSS. Empezaremos simple y lo iremos mejorando.

## Estructura de componentes

\`\`\`
Board/
├── Board.tsx      # Contenedor principal
├── Square.tsx     # Casilla individual
├── Piece.tsx      # Pieza de ajedrez
└── styles.css     # Estilos
\`\`\`

## El componente Square

\`\`\`tsx
// src/components/Board/Square.tsx
import { ReactNode } from 'react';

interface SquareProps {
  isLight: boolean;
  isHighlighted?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export function Square({ 
  isLight, 
  isHighlighted, 
  isSelected,
  onClick, 
  children 
}: SquareProps) {
  const baseColor = isLight ? 'bg-board-light' : 'bg-board-dark';
  const highlight = isHighlighted ? 'ring-4 ring-yellow-400/50 ring-inset' : '';
  const selected = isSelected ? 'bg-yellow-400/40' : '';

  return (
    <div
      onClick={onClick}
      className={\`
        aspect-square flex items-center justify-center
        cursor-pointer transition-all duration-150
        \${baseColor} \${highlight} \${selected}
        hover:brightness-110
      \`}
    >
      {children}
    </div>
  );
}
\`\`\`

## El componente Piece

Usaremos caracteres Unicode para las piezas (simple pero efectivo):

\`\`\`tsx
// src/components/Board/Piece.tsx

const PIECE_SYMBOLS: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
};

interface PieceProps {
  piece: string;
  isDragging?: boolean;
}

export function Piece({ piece, isDragging }: PieceProps) {
  const isWhite = piece === piece.toUpperCase();
  const symbol = PIECE_SYMBOLS[piece];

  return (
    <span
      className={\`
        text-5xl select-none cursor-grab
        transition-transform duration-150
        \${isDragging ? 'scale-110 cursor-grabbing' : ''}
        \${isWhite ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]' : ''}
      \`}
      style={{
        color: isWhite ? '#ffffff' : '#000000',
        textShadow: isWhite 
          ? '0 0 3px rgba(0,0,0,0.8)' 
          : '0 0 3px rgba(255,255,255,0.3)',
      }}
    >
      {symbol}
    </span>
  );
}
\`\`\`

## El componente Board

\`\`\`tsx
// src/components/Board/Board.tsx
import { useState } from 'react';
import { Square } from './Square';
import { Piece } from './Piece';
import { parseFEN } from '../../lib/fen';

interface BoardProps {
  fen: string;
  flipped?: boolean;
  onSquareClick?: (square: string) => void;
  highlightedSquares?: string[];
}

export function Board({ 
  fen, 
  flipped = false,
  onSquareClick,
  highlightedSquares = []
}: BoardProps) {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const { board } = parseFEN(fen);

  // Convertir índices a notación algebraica
  const toSquare = (row: number, col: number): string => {
    const file = String.fromCharCode(97 + col); // a-h
    const rank = 8 - row; // 1-8
    return \`\${file}\${rank}\`;
  };

  // Determinar orden de renderizado
  const rows = flipped ? [...board].reverse() : board;
  const colOrder = flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

  const handleSquareClick = (square: string) => {
    setSelectedSquare(square);
    onSquareClick?.(square);
  };

  return (
    <div className="inline-block rounded-lg overflow-hidden shadow-2xl">
      {/* Coordenadas superiores */}
      <div className="flex bg-zinc-800">
        <div className="w-6" />
        {colOrder.map(c => (
          <div key={c} className="w-16 text-center text-xs text-zinc-500">
            {String.fromCharCode(97 + (flipped ? 7 - c : c))}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Coordenadas izquierda */}
        <div className="flex flex-col bg-zinc-800">
          {rows.map((_, r) => (
            <div key={r} className="h-16 w-6 flex items-center justify-center text-xs text-zinc-500">
              {flipped ? r + 1 : 8 - r}
            </div>
          ))}
        </div>

        {/* Tablero */}
        <div className="grid grid-cols-8">
          {rows.map((row, r) => (
            colOrder.map(c => {
              const actualRow = flipped ? 7 - r : r;
              const actualCol = flipped ? 7 - c : c;
              const square = toSquare(actualRow, actualCol);
              const piece = board[actualRow][actualCol];
              const isLight = (actualRow + actualCol) % 2 === 0;

              return (
                <Square
                  key={square}
                  isLight={isLight}
                  isSelected={selectedSquare === square}
                  isHighlighted={highlightedSquares.includes(square)}
                  onClick={() => handleSquareClick(square)}
                >
                  {piece && <Piece piece={piece} />}
                </Square>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
}
\`\`\`

## Uso del componente

\`\`\`tsx
// src/App.tsx
import { Board } from './components/Board/Board';

function App() {
  const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-8">
      <Board 
        fen={startingFen}
        highlightedSquares={['e4', 'e5']}
        onSquareClick={(sq) => console.log('Clicked:', sq)}
      />
    </div>
  );
}
\`\`\`

## Resultado

¡Ahora tienes un tablero visual! En la siguiente lección, agregaremos la capacidad de mover piezas con drag and drop.

---

**Próximo paso:** Implementaremos drag & drop para mover piezas.
`,
        contentEn: `
# Rendering the Board

Let's build a visual chess board using React and CSS. We'll start simple and improve it gradually.

## Component Structure

\`\`\`
Board/
├── Board.tsx      # Main container
├── Square.tsx     # Individual square
├── Piece.tsx      # Chess piece
└── styles.css     # Styles
\`\`\`

(Content continues with the same code examples...)

---

**Next step:** We'll implement drag & drop to move pieces.
`
      }
    ]
  }
];

// Combinar todos los módulos
export const courseModules: Module[] = [...courseModulesBase, ...modulesThreeToEight];

export function getModuleBySlug(slug: string): Module | undefined {
  return courseModules.find((m: Module) => m.slug === slug);
}

export function getLessonBySlug(moduleSlug: string, lessonSlug: string): Lesson | undefined {
  const module = getModuleBySlug(moduleSlug);
  return module?.lessons.find((l: Lesson) => l.slug === lessonSlug);
}

export function getNextLesson(moduleSlug: string, lessonSlug: string): { module: Module; lesson: Lesson } | null {
  const moduleIndex = courseModules.findIndex((m: Module) => m.slug === moduleSlug);
  if (moduleIndex === -1) return null;

  const module = courseModules[moduleIndex];
  const lessonIndex = module.lessons.findIndex((l: Lesson) => l.slug === lessonSlug);
  
  // Siguiente lección en el mismo módulo
  if (lessonIndex < module.lessons.length - 1) {
    return { module, lesson: module.lessons[lessonIndex + 1] };
  }
  
  // Primera lección del siguiente módulo
  if (moduleIndex < courseModules.length - 1) {
    const nextModule = courseModules[moduleIndex + 1];
    return { module: nextModule, lesson: nextModule.lessons[0] };
  }

  return null;
}

export function getPrevLesson(moduleSlug: string, lessonSlug: string): { module: Module; lesson: Lesson } | null {
  const moduleIndex = courseModules.findIndex((m: Module) => m.slug === moduleSlug);
  if (moduleIndex === -1) return null;

  const module = courseModules[moduleIndex];
  const lessonIndex = module.lessons.findIndex((l: Lesson) => l.slug === lessonSlug);
  
  // Lección anterior en el mismo módulo
  if (lessonIndex > 0) {
    return { module, lesson: module.lessons[lessonIndex - 1] };
  }
  
  // Última lección del módulo anterior
  if (moduleIndex > 0) {
    const prevModule = courseModules[moduleIndex - 1];
    return { module: prevModule, lesson: prevModule.lessons[prevModule.lessons.length - 1] };
  }

  return null;
}

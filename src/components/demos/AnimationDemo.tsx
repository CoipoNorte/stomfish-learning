import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const PIECES: Record<string, string> = {
  'N': '♘', 'n': '♞', 'Q': '♕', 'R': '♖',
};

interface AnimatedPiece {
  piece: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

const DEMO_ANIMATIONS: AnimatedPiece[] = [
  { piece: 'N', fromX: 1, fromY: 7, toX: 2, toY: 5 }, // Nf3
  { piece: 'n', fromX: 6, fromY: 0, toX: 5, toY: 2 }, // Nf6
  { piece: 'N', fromX: 2, fromY: 5, toX: 3, toY: 3 }, // Nd4
  { piece: 'Q', fromX: 3, fromY: 7, toX: 7, toY: 3 }, // Qh5
];

export function AnimationDemo() {
  const [currentAnim, setCurrentAnim] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(300);

  const anim = DEMO_ANIMATIONS[currentAnim];
  const cellSize = 50;
  
  // Calculate current position based on progress
  const currentX = anim.fromX + (anim.toX - anim.fromX) * progress;
  const currentY = anim.fromY + (anim.toY - anim.fromY) * progress;

  useEffect(() => {
    if (!isPlaying) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(1, elapsed / duration);
      setProgress(newProgress);

      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
      }
    };

    requestAnimationFrame(animate);
  }, [isPlaying, duration]);

  const playAnimation = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  const nextAnim = () => {
    setCurrentAnim(prev => (prev + 1) % DEMO_ANIMATIONS.length);
    setProgress(0);
    setIsPlaying(false);
  };

  const prevAnim = () => {
    setCurrentAnim(prev => (prev - 1 + DEMO_ANIMATIONS.length) % DEMO_ANIMATIONS.length);
    setProgress(0);
    setIsPlaying(false);
  };

  // Easing function visualization
  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    bounce: (t: number) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Animation preview */}
        <div className="bg-zinc-800 rounded-xl p-4">
          <div className="text-sm text-zinc-500 mb-3">Vista previa de animación</div>
          <div 
            className="relative bg-zinc-900 rounded-lg mx-auto"
            style={{ width: cellSize * 8, height: cellSize * 8 }}
          >
            {/* Board grid */}
            {Array.from({ length: 8 }).map((_, r) => (
              <div key={r} className="flex">
                {Array.from({ length: 8 }).map((_, c) => (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: (r + c) % 2 === 0 ? '#f0d9b5' : '#b58863',
                    }}
                  />
                ))}
              </div>
            ))}

            {/* From position indicator */}
            <div
              className="absolute border-2 border-blue-400 rounded pointer-events-none"
              style={{
                width: cellSize,
                height: cellSize,
                left: anim.fromX * cellSize,
                top: anim.fromY * cellSize,
              }}
            />

            {/* To position indicator */}
            <div
              className="absolute border-2 border-green-400 rounded pointer-events-none"
              style={{
                width: cellSize,
                height: cellSize,
                left: anim.toX * cellSize,
                top: anim.toY * cellSize,
              }}
            />

            {/* Animated piece */}
            <div
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                width: cellSize,
                height: cellSize,
                left: currentX * cellSize,
                top: currentY * cellSize,
                transition: isPlaying ? 'none' : 'all 0.1s',
              }}
            >
              <span 
                className="text-4xl"
                style={{
                  color: anim.piece === anim.piece.toUpperCase() ? '#fff' : '#000',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {PIECES[anim.piece]}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button onClick={prevAnim} className="p-2 bg-zinc-700 rounded-lg hover:bg-zinc-600">
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={playAnimation}
              disabled={isPlaying}
              className="p-3 bg-accent-600 rounded-lg hover:bg-accent-500 disabled:opacity-50"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button onClick={nextAnim} className="p-2 bg-zinc-700 rounded-lg hover:bg-zinc-600">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Easing curves */}
        <div className="bg-zinc-800 rounded-xl p-4">
          <div className="text-sm text-zinc-500 mb-3">Curvas de easing</div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(easingFunctions).map(([name, fn]) => (
              <div key={name} className="bg-zinc-900 rounded-lg p-3">
                <div className="text-xs text-zinc-400 mb-2 capitalize">{name}</div>
                <svg viewBox="0 0 100 50" className="w-full h-12">
                  <path
                    d={`M 0 50 ${Array.from({ length: 50 }).map((_, i) => {
                      const t = i / 49;
                      const y = 50 - fn(t) * 50;
                      return `L ${t * 100} ${y}`;
                    }).join(' ')}`}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                  {/* Current position */}
                  <circle
                    cx={progress * 100}
                    cy={50 - fn(progress) * 50}
                    r="4"
                    fill="#8b5cf6"
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* Duration slider */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span>Duración</span>
              <span>{duration}ms</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Code example */}
      <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm">
        <div className="text-zinc-500 text-xs mb-2">// CSS transition</div>
        <code className="text-green-400">
          {`transition: transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);`}
        </code>
      </div>
    </div>
  );
}

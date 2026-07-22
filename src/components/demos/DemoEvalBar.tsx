import { useState, useEffect } from 'react';

interface DemoEvalBarProps {
  initialScore?: number;
  animated?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export function DemoEvalBar({ 
  initialScore = 0, 
  animated = true,
  orientation = 'vertical' 
}: DemoEvalBarProps) {
  const [score, setScore] = useState(initialScore);
  const [mate, setMate] = useState<number | null>(null);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      // Simular cambios de evaluación
      const rand = Math.random();
      if (rand < 0.05) {
        // Ocasionalmente mostrar mate
        setMate(Math.floor(Math.random() * 5) + 1);
        setScore(0);
      } else {
        setMate(null);
        setScore(prev => {
          const change = (Math.random() - 0.5) * 100;
          return Math.max(-500, Math.min(500, prev + change));
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [animated]);

  const clampedScore = Math.max(-1000, Math.min(1000, score));
  const percentage = 50 + (clampedScore / 1000) * 50;
  const whitePercentage = mate !== null ? (mate > 0 ? 100 : 0) : percentage;

  const formatScore = () => {
    if (mate !== null) return `M${Math.abs(mate)}`;
    return (Math.abs(score) / 100).toFixed(1);
  };

  const isWhiteWinning = mate !== null ? mate > 0 : score > 0;

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-64 bg-zinc-800 rounded-lg overflow-hidden relative shadow-lg">
          <div 
            className="absolute top-0 left-0 right-0 bg-zinc-900 transition-all duration-500 ease-out"
            style={{ height: `${100 - whitePercentage}%` }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-500 ease-out"
            style={{ height: `${whitePercentage}%` }}
          />
          <div className={`
            absolute inset-x-0 flex items-center justify-center text-xs font-bold
            ${isWhiteWinning ? 'bottom-2 text-zinc-800' : 'top-2 text-white'}
          `}>
            {formatScore()}
          </div>
        </div>
        <div className="text-xs text-zinc-500">
          {score > 0 ? '+' : ''}{(score / 100).toFixed(1)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <div className="h-8 w-full bg-zinc-800 rounded-lg overflow-hidden relative shadow-lg">
        <div 
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${whitePercentage}%` }}
        />
        <div className={`
          absolute inset-0 flex items-center justify-center text-sm font-bold
          ${whitePercentage > 50 ? 'text-zinc-800' : 'text-white'}
        `}>
          {isWhiteWinning ? '+' : ''}{formatScore()}
        </div>
      </div>
      <div className="flex justify-between text-xs text-zinc-500">
        <span>Negras</span>
        <span>Blancas</span>
      </div>
    </div>
  );
}

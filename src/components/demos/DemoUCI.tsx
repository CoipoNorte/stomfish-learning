import { useState, useRef, useEffect } from 'react';

interface Message {
  type: 'input' | 'output';
  text: string;
}

const SIMULATED_RESPONSES: Record<string, string[]> = {
  'uci': [
    'id name Stockfish 16',
    'id author T. Romstad, M. Costalba, J. Kiiski, G. Linscott',
    'option name Threads type spin default 1 min 1 max 512',
    'option name Hash type spin default 16 min 1 max 33554432',
    'uciok',
  ],
  'isready': ['readyok'],
  'ucinewgame': [],
  'd': [
    ' +---+---+---+---+---+---+---+---+',
    ' | r | n | b | q | k | b | n | r |',
    ' +---+---+---+---+---+---+---+---+',
    ' | p | p | p | p | p | p | p | p |',
    ' +---+---+---+---+---+---+---+---+',
    ' |   |   |   |   |   |   |   |   |',
    ' +---+---+---+---+---+---+---+---+',
    ' |   |   |   |   |   |   |   |   |',
    ' +---+---+---+---+---+---+---+---+',
    ' |   |   |   |   |   |   |   |   |',
    ' +---+---+---+---+---+---+---+---+',
    ' |   |   |   |   |   |   |   |   |',
    ' +---+---+---+---+---+---+---+---+',
    ' | P | P | P | P | P | P | P | P |',
    ' +---+---+---+---+---+---+---+---+',
    ' | R | N | B | Q | K | B | N | R |',
    ' +---+---+---+---+---+---+---+---+',
    'Fen: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  ],
};

export function DemoUCI() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'output', text: '// Stockfish UCI Console - Simulado' },
    { type: 'output', text: '// Escribe comandos UCI: uci, isready, position, go, etc.' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateResponse = async (command: string) => {
    setIsProcessing(true);
    
    // Simular delay
    await new Promise(r => setTimeout(r, 100));

    const cmd = command.toLowerCase().trim().split(' ')[0];
    let responses: string[] = [];

    if (SIMULATED_RESPONSES[cmd]) {
      responses = SIMULATED_RESPONSES[cmd];
    } else if (command.startsWith('position')) {
      responses = [];
    } else if (command.startsWith('go')) {
      // Simular análisis
      for (let depth = 1; depth <= 5; depth++) {
        await new Promise(r => setTimeout(r, 200));
        setMessages(prev => [...prev, {
          type: 'output',
          text: `info depth ${depth} score cp ${Math.floor(Math.random() * 100 - 50)} nodes ${depth * 1000} nps ${500000 + Math.floor(Math.random() * 500000)} pv e2e4 e7e5 g1f3`
        }]);
      }
      responses = ['bestmove e2e4 ponder e7e5'];
    } else if (command === 'quit') {
      responses = ['// Motor cerrado'];
    } else {
      responses = [`// Comando no reconocido: ${command}`];
    }

    for (const response of responses) {
      await new Promise(r => setTimeout(r, 50));
      setMessages(prev => [...prev, { type: 'output', text: response }]);
    }

    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const command = input.trim();
    setMessages(prev => [...prev, { type: 'input', text: command }]);
    setInput('');
    simulateResponse(command);
  };

  const quickCommands = ['uci', 'isready', 'position startpos', 'go depth 5', 'd'];

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-xl border border-zinc-700">
      {/* Header */}
      <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm text-zinc-400 font-mono">Stockfish UCI (Simulado)</span>
      </div>

      {/* Quick commands */}
      <div className="px-4 py-2 border-b border-zinc-700 flex gap-2 flex-wrap">
        {quickCommands.map(cmd => (
          <button
            key={cmd}
            onClick={() => {
              setMessages(prev => [...prev, { type: 'input', text: cmd }]);
              simulateResponse(cmd);
            }}
            disabled={isProcessing}
            className="px-2 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 rounded text-zinc-300 disabled:opacity-50"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 font-mono text-sm">
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={`${
              msg.type === 'input' 
                ? 'text-blue-400' 
                : msg.text.startsWith('//') 
                ? 'text-zinc-500' 
                : 'text-green-400'
            }`}
          >
            {msg.type === 'input' ? '> ' : '< '}{msg.text}
          </div>
        ))}
        {isProcessing && (
          <div className="text-yellow-400 animate-pulse">Procesando...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-zinc-700 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un comando UCI..."
            disabled={isProcessing}
            className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
          <button 
            type="submit"
            disabled={isProcessing}
            className="bg-accent-600 hover:bg-accent-500 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-medium text-white"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

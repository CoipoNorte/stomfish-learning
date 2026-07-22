import { useState } from 'react';
import { Check, Copy, Play, Eye, Code } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodePreviewProps {
  code: string;
  language?: string;
  preview?: React.ReactNode;
  title?: string;
  executable?: boolean;
  onRun?: () => void;
}

export function CodePreview({ 
  code, 
  language = 'typescript', 
  preview,
  title,
  executable = false,
  onRun 
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(!!preview);
  const [isRunning, setIsRunning] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    onRun?.();
    setTimeout(() => setIsRunning(false), 1000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 my-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <span className="text-xs text-zinc-500 font-mono ml-2">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {preview && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                showPreview ? 'bg-accent-500/20 text-accent-400' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {showPreview ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
              {showPreview ? 'Preview' : 'Code'}
            </button>
          )}
          {executable && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="p-1.5 rounded text-zinc-500 hover:text-green-400 hover:bg-green-400/10 transition-colors disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-pulse' : ''}`} />
            </button>
          )}
          <button
            onClick={copyCode}
            className="p-1.5 rounded text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`${preview && showPreview ? 'grid md:grid-cols-2' : ''}`}>
        {/* Code */}
        <div className={`${preview && showPreview ? 'border-r border-zinc-700' : ''}`}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.8rem',
              background: 'transparent',
              maxHeight: '400px',
            }}
            showLineNumbers
            lineNumberStyle={{ color: '#4a5568', fontSize: '0.7rem' }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>

        {/* Preview */}
        {preview && showPreview && (
          <div className="p-4 bg-zinc-800/50 flex items-center justify-center min-h-[200px]">
            {preview}
          </div>
        )}
      </div>
    </div>
  );
}

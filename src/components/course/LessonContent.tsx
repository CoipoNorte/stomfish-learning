import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getLessonBySlug, getModuleBySlug, getNextLesson, getPrevLesson } from '../../data/courseContent';
import { useLanguage } from '../../context/LanguageContext';
import { LessonDemo } from '../demos/LessonDemo';

export function LessonContent() {
  const { moduleSlug, lessonSlug } = useParams();
  const { lang } = useLanguage();

  const module = moduleSlug ? getModuleBySlug(moduleSlug) : undefined;
  const lesson = moduleSlug && lessonSlug ? getLessonBySlug(moduleSlug, lessonSlug) : undefined;
  const nextLesson = moduleSlug && lessonSlug ? getNextLesson(moduleSlug, lessonSlug) : null;
  const prevLesson = moduleSlug && lessonSlug ? getPrevLesson(moduleSlug, lessonSlug) : null;

  const content = lesson ? (lang === 'es' ? lesson.content : lesson.contentEn) : '';

  const renderedContent = useMemo(() => {
    if (!content) return null;
    return renderMarkdown(content);
  }, [content]);

  if (!module || !lesson) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-surface-200/60">
            {lang === 'es' ? 'Lección no encontrada' : 'Lesson not found'}
          </p>
          <Link to="/curso" className="text-accent-400 hover:underline mt-2 inline-block">
            {lang === 'es' ? 'Volver al curso' : 'Back to course'}
          </Link>
        </div>
      </div>
    );
  }

  const lessonTitle = lang === 'es' ? lesson.title : lesson.titleEn;
  const moduleTitle = lang === 'es' ? module.title : module.titleEn;

  return (
    <article className="flex-1 max-w-4xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-200/50 mb-6">
        <Link to="/curso" className="hover:text-white transition-colors">
          {lang === 'es' ? 'Curso' : 'Course'}
        </Link>
        <span>/</span>
        <Link to={`/curso/${module.slug}/${module.lessons[0].slug}`} className="hover:text-white transition-colors">
          {moduleTitle}
        </Link>
        <span>/</span>
        <span className="text-surface-200/80">{lessonTitle}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{module.icon}</span>
          <span className="text-sm text-accent-400 font-medium">
            {lang === 'es' ? 'Módulo' : 'Module'} {module.number}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {lessonTitle}
        </h1>
        <div className="flex items-center gap-4 text-sm text-surface-200/50">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {lesson.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {lang === 'es' ? 'Lectura' : 'Reading'}
          </span>
        </div>
      </header>

      {/* Interactive Demo */}
      <LessonDemo lessonId={lesson.id} />

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        {renderedContent}
      </div>

      {/* Navigation */}
      <footer className="mt-16 pt-8 border-t border-white/5">
        <div className="flex justify-between gap-4">
          {prevLesson ? (
            <Link
              to={`/curso/${prevLesson.module.slug}/${prevLesson.lesson.slug}`}
              className="flex-1 glass rounded-xl p-4 hover:bg-white/5 transition-colors group"
            >
              <span className="text-sm text-surface-200/50 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                {lang === 'es' ? 'Anterior' : 'Previous'}
              </span>
              <span className="text-white font-medium mt-1 block group-hover:text-accent-400 transition-colors">
                {lang === 'es' ? prevLesson.lesson.title : prevLesson.lesson.titleEn}
              </span>
            </Link>
          ) : <div className="flex-1" />}

          {nextLesson && (
            <Link
              to={`/curso/${nextLesson.module.slug}/${nextLesson.lesson.slug}`}
              className="flex-1 glass rounded-xl p-4 hover:bg-white/5 transition-colors group text-right"
            >
              <span className="text-sm text-surface-200/50 flex items-center gap-1 justify-end">
                {lang === 'es' ? 'Siguiente' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-white font-medium mt-1 block group-hover:text-accent-400 transition-colors">
                {lang === 'es' ? nextLesson.lesson.title : nextLesson.lesson.titleEn}
              </span>
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}

// Simple markdown renderer
function renderMarkdown(markdown: string): React.ReactNode[] {
  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'text';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={key++} className="my-6 rounded-xl overflow-hidden">
          <SyntaxHighlighter
            language={lang}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.875rem',
              background: 'rgba(0,0,0,0.4)',
            }}
          >
            {codeLines.join('\n')}
          </SyntaxHighlighter>
        </div>
      );
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="text-3xl font-bold text-white mt-10 mb-6">{line.slice(2)}</h1>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(3)}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-xl font-semibold text-white mt-6 mb-3">{line.slice(4)}</h3>);
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      elements.push(<hr key={key++} className="my-10 border-white/10" />);
      i++;
      continue;
    }

    // Tables
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].includes('|')) {
        const cells = lines[i].split('|').filter(c => c.trim()).map(c => c.trim());
        if (!lines[i].includes('---')) {
          tableRows.push(cells);
        }
        i++;
      }
      if (tableRows.length > 0) {
        elements.push(
          <div key={key++} className="my-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {tableRows[0].map((cell, ci) => (
                    <th key={ci} className="px-4 py-2 text-left text-surface-200/80 font-semibold">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, ri) => (
                  <tr key={ri} className="border-b border-white/5">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2 text-surface-200/60">{renderInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Lists
    if (line.trim().startsWith('- ') || line.trim().match(/^\d+\./)) {
      const listItems: string[] = [];
      const isOrdered = line.trim().match(/^\d+\./);
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().match(/^\d+\./))) {
        listItems.push(lines[i].trim().replace(/^-\s+|^\d+\.\s+/, ''));
        i++;
      }
      const ListTag = isOrdered ? 'ol' : 'ul';
      elements.push(
        <ListTag key={key++} className={`my-4 space-y-2 ${isOrdered ? 'list-decimal' : 'list-disc'} list-inside text-surface-200/70`}>
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraphs
    elements.push(
      <p key={key++} className="my-4 text-surface-200/70 leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-white/10 rounded text-accent-300 text-sm font-mono">$1</code>');
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-400 hover:underline" target="_blank" rel="noopener">$1</a>');
  // Emoji shortcuts
  text = text.replace(/:(\w+):/g, (_, name) => {
    const emojis: Record<string, string> = { 'white_check_mark': '✅', 'x': '❌' };
    return emojis[name] || `:${name}:`;
  });

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

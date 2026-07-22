import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { courseModules } from '../data/courseContent';
import { useLanguage } from '../context/LanguageContext';

export function CoursePage() {
  const { lang } = useLanguage();

  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-surface-950 pt-20">
      {/* Header */}
      <header className="border-b border-white/5 bg-surface-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/" className="text-sm text-surface-200/50 hover:text-white transition-colors mb-4 inline-block">
            ← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-4">
            {lang === 'es' ? 'Curso Completo' : 'Full Course'}
          </h1>
          <p className="mt-4 text-lg text-surface-200/60 max-w-2xl">
            {lang === 'es' 
              ? 'Aprende paso a paso a construir tu propia plataforma de ajedrez con Stockfish, desde cero hasta el despliegue.'
              : 'Learn step by step to build your own chess platform with Stockfish, from zero to deployment.'}
          </p>
          <div className="flex items-center gap-6 mt-6 text-sm text-surface-200/50">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {courseModules.length} {lang === 'es' ? 'módulos' : 'modules'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              {totalLessons} {lang === 'es' ? 'lecciones' : 'lessons'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              ~4 {lang === 'es' ? 'horas' : 'hours'}
            </span>
          </div>
        </div>
      </header>

      {/* Modules */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {courseModules.map((module, i) => {
            const moduleTitle = lang === 'es' ? module.title : module.titleEn;
            const moduleDesc = lang === 'es' ? module.description : module.descriptionEn;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
              >
                {/* Module header */}
                <div className="p-6 sm:p-8 border-b border-white/5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center text-2xl shrink-0">
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-accent-400 font-medium">
                          {lang === 'es' ? 'Módulo' : 'Module'} {module.number}
                        </span>
                        <span className="text-surface-200/30">•</span>
                        <span className="text-sm text-surface-200/50">
                          {module.lessons.length} {lang === 'es' ? 'lecciones' : 'lessons'}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">{moduleTitle}</h2>
                      <p className="text-surface-200/50 mt-1">{moduleDesc}</p>
                    </div>
                  </div>
                </div>

                {/* Lessons list */}
                <div className="divide-y divide-white/5">
                  {module.lessons.map((lesson, idx) => {
                    const lessonTitle = lang === 'es' ? lesson.title : lesson.titleEn;
                    const lessonDesc = lang === 'es' ? lesson.description : lesson.descriptionEn;

                    return (
                      <Link
                        key={lesson.id}
                        to={`/curso/${module.slug}/${lesson.slug}`}
                        className="flex items-center gap-4 p-4 sm:p-6 hover:bg-white/[0.02] transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-surface-800 flex items-center justify-center text-sm font-medium text-surface-200/50 group-hover:bg-accent-500/20 group-hover:text-accent-400 transition-colors shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium group-hover:text-accent-400 transition-colors truncate">
                            {lessonTitle}
                          </h3>
                          <p className="text-sm text-surface-200/40 truncate">{lessonDesc}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-surface-200/30">{lesson.duration}</span>
                          <ArrowRight className="w-4 h-4 text-surface-200/30 group-hover:text-accent-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coming soon modules placeholder */}
        <div className="mt-12 glass rounded-2xl p-8 text-center">
          <span className="text-4xl mb-4 block">🚧</span>
          <h3 className="text-xl font-bold text-white mb-2">
            {lang === 'es' ? 'Más módulos próximamente' : 'More modules coming soon'}
          </h3>
          <p className="text-surface-200/50">
            {lang === 'es' 
              ? 'Estamos trabajando en más contenido. ¡Mantente atento!'
              : "We're working on more content. Stay tuned!"}
          </p>
        </div>
      </main>
    </div>
  );
}

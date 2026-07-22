import { Link, useParams } from 'react-router-dom';

import { courseModules } from '../../data/courseContent';
import { useLanguage } from '../../context/LanguageContext';

export function CourseSidebar() {
  const { moduleSlug, lessonSlug } = useParams();
  const { lang } = useLanguage();

  return (
    <aside className="w-72 lg:w-80 shrink-0 bg-surface-900/50 border-r border-white/5 overflow-y-auto h-[calc(100vh-64px)] sticky top-16">
      <div className="p-4">
        <Link 
          to="/curso" 
          className="flex items-center gap-2 text-sm text-surface-200/60 hover:text-white transition-colors mb-4"
        >
          ← {lang === 'es' ? 'Volver al curso' : 'Back to course'}
        </Link>

        <nav className="space-y-4">
          {courseModules.map((module) => {
            const isActiveModule = moduleSlug === module.slug;
            const moduleTitle = lang === 'es' ? module.title : module.titleEn;

            return (
              <div key={module.id}>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActiveModule ? 'bg-accent-500/10 text-accent-400' : 'text-surface-200/70'
                }`}>
                  <span className="text-lg">{module.icon}</span>
                  <span className="truncate">{module.number}. {moduleTitle}</span>
                </div>

                <ul className="mt-1 ml-4 border-l border-white/5 pl-4 space-y-1">
                  {module.lessons.map((lesson, idx) => {
                    const isActive = moduleSlug === module.slug && lessonSlug === lesson.slug;
                    const lessonTitle = lang === 'es' ? lesson.title : lesson.titleEn;

                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/curso/${module.slug}/${lesson.slug}`}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive 
                              ? 'bg-accent-500/20 text-white font-medium' 
                              : 'text-surface-200/50 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                            isActive 
                              ? 'bg-accent-500 text-white' 
                              : 'bg-surface-700 text-surface-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="truncate">{lessonTitle}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

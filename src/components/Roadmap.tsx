import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, BookOpen } from 'lucide-react';
import { courseModules } from '../data/courseContent';

export default function Roadmap() {
  const { ref, isVisible } = useScrollReveal();
  const { lang, t } = useLanguage();

  return (
    <section id="roadmap" ref={ref} className="py-20 sm:py-32 relative">
      {/* BG accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <BookOpen className="w-4 h-4 text-brand-400" />
            <span className="text-xs sm:text-sm text-surface-200/80 font-medium">{t.roadmap.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
          >
            {t.roadmap.title}
            <span className="gradient-text-brand">{t.roadmap.titleHighlight}</span>
            <br className="hidden sm:block" />
            {t.roadmap.title2}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-surface-200/60 max-w-2xl mx-auto"
          >
            {t.roadmap.subtitle}
          </motion.p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {courseModules.map((module, i) => {
            const moduleTitle = lang === 'es' ? module.title : module.titleEn;
            const moduleDesc = lang === 'es' ? module.description : module.descriptionEn;
            const firstLesson = module.lessons[0];

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              >
                <Link
                  to={`/curso/${module.slug}/${firstLesson.slug}`}
                  className="glass rounded-2xl p-6 sm:p-8 card-hover group relative overflow-hidden block"
                >
                  {/* Module number */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <span className="text-4xl sm:text-5xl font-black text-white/[0.03] group-hover:text-accent-500/10 transition-colors duration-500">
                      {module.number}
                    </span>
                  </div>

                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 bg-gradient-to-br from-accent-500 to-brand-500">
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                          {moduleTitle}
                        </h3>
                        <p className="text-sm text-surface-200/50 mt-0.5">{moduleDesc}</p>
                      </div>
                    </div>

                    <ul className="space-y-2 ml-14 mb-4">
                      {module.lessons.slice(0, 4).map((lesson) => {
                        const lessonTitle = lang === 'es' ? lesson.title : lesson.titleEn;
                        return (
                          <li key={lesson.id} className="flex items-center gap-2.5 text-sm text-surface-200/60">
                            <Check className="w-3.5 h-3.5 shrink-0 text-green-400" />
                            {lessonTitle}
                          </li>
                        );
                      })}
                      {module.lessons.length > 4 && (
                        <li className="text-sm text-surface-200/40 ml-6">
                          +{module.lessons.length - 4} {lang === 'es' ? 'más' : 'more'}...
                        </li>
                      )}
                    </ul>

                    <div className="ml-14">
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent-400 group-hover:text-accent-300 font-medium transition-colors">
                        {t.roadmap.startModule}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View full course CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/curso"
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg group"
          >
            <span className="relative z-10 flex items-center gap-3">
              {lang === 'es' ? 'Ver curso completo' : 'View full course'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

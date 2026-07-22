import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

function FAQItem({ question, answer, index, isVisible }: { question: string; answer: string; index: number; isVisible: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      className="glass rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left group hover:bg-white/[0.02] transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-semibold text-white pr-4 group-hover:text-accent-300 transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-surface-200/40 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180 text-accent-400' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-surface-200/60 leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const FAQS = [
    t.faq.items.q1,
    t.faq.items.q2,
    t.faq.items.q3,
    t.faq.items.q4,
    t.faq.items.q5,
    t.faq.items.q6,
    t.faq.items.q7,
    t.faq.items.q8,
  ];

  return (
    <section id="faq" ref={ref} className="py-20 sm:py-32 section-gradient">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <HelpCircle className="w-4 h-4 text-accent-400" />
            <span className="text-xs sm:text-sm text-surface-200/80 font-medium">{t.faq.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
          >
            {t.faq.title}
            <span className="gradient-text-brand">{t.faq.titleHighlight}</span>
          </motion.h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

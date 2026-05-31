import { motion } from 'framer-motion';
import { FileSearch, Loader2 } from 'lucide-react';

const steps = [
  'Извлечение реквизитов…',
  'Поиск рисковых формулировок…',
  'Формирование заключения…',
];

export function ProcessingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <motion.div
        className="relative mb-8 flex size-20 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FileSearch className="size-9 text-violet-300" aria-hidden />
        <motion.div
          className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full bg-indigo-600 shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="size-4 text-white" aria-hidden />
        </motion.div>
      </motion.div>

      <h2 className="text-lg font-semibold text-white">Анализируем документ</h2>
      <p className="mt-2 text-sm text-slate-400">ИИ проверяет договор на юридические риски</p>

      <ul className="mt-8 space-y-2">
        {steps.map((step, index) => (
          <motion.li
            key={step}
            className="text-sm text-slate-500"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.4,
            }}
          >
            {step}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

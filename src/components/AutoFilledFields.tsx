import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { AutoFilledField } from '../types/contract';

interface AutoFilledFieldsProps {
  fields: AutoFilledField[];
}

export function AutoFilledFields({ fields }: AutoFilledFieldsProps) {
  if (fields.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="size-4 text-violet-300" aria-hidden />
        <h3 className="text-sm font-semibold text-white">Автозаполненные реквизиты</h3>
        <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300">
          {fields.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/8">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-4 py-3 font-medium text-slate-400">Поле</th>
              <th className="px-4 py-3 font-medium text-slate-400">Значение</th>
              <th className="px-4 py-3 font-medium text-slate-400">Источник</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <motion.tr
                key={`${field.field}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-white/5 last:border-0"
              >
                <td className="px-4 py-3 font-medium text-slate-300">{field.field}</td>
                <td className="px-4 py-3 text-white">{field.value}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">
                  {field.extractedFrom}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

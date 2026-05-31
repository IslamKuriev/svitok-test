import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { ContractRequisite } from '../types/contract';

interface ContractTableProps {
  title: string;
  requisites: ContractRequisite[];
}

export function ContractTable({ title, requisites }: ContractTableProps) {
  if (requisites.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle2 className="size-4 text-emerald-400" aria-hidden />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
          {requisites.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/8">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-4 py-3 font-medium text-slate-400">Раздел</th>
              <th className="px-4 py-3 font-medium text-slate-400">Поле</th>
              <th className="px-4 py-3 font-medium text-slate-400">Значение</th>
            </tr>
          </thead>
          <tbody>
            {requisites.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className="border-b border-white/5 last:border-0"
              >
                <td className="px-4 py-3 text-slate-500">{row.section}</td>
                <td className="px-4 py-3 font-medium text-slate-300">{row.field}</td>
                <td className="px-4 py-3 text-slate-400">{row.value}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Building2, Calendar, FileText, Hash, type LucideIcon } from 'lucide-react';
import type { ContractInfo, RiskCounts } from '../types/contract';

interface FileCardProps {
  contract: ContractInfo;
  riskCounts: RiskCounts;
  selected: boolean;
  icon: LucideIcon;
  onSelect: () => void;
}

function formatAmount(amount: string, currency: string): string {
  const symbol = currency === 'RUB' ? '₽' : currency;
  return `${amount} ${symbol}`;
}

export function FileCard({
  contract,
  riskCounts,
  selected,
  icon: Icon,
  onSelect,
}: FileCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={[
        'group relative w-full rounded-xl border p-4 text-left transition-colors duration-200',
        selected
          ? 'border-violet-400/60 bg-violet-500/15 shadow-lg shadow-violet-500/10'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8',
      ].join(' ')}
      aria-pressed={selected}
    >
      {selected && (
        <span className="absolute top-3 right-3 size-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
      )}

      <div className="flex gap-3">
        <div
          className={[
            'flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors',
            selected
              ? 'bg-violet-500/30 text-violet-200'
              : 'bg-white/8 text-slate-400 group-hover:text-slate-300',
          ].join(' ')}
        >
          <Icon className="size-5" aria-hidden />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{contract.name}</p>
          <p className="mt-0.5 truncate text-xs text-slate-400">{contract.documentType}</p>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Hash className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">{contract.contractNumber}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="size-3.5 shrink-0" aria-hidden />
          <span>{contract.contractDate}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Building2 className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">{contract.customer.shortName}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <FileText className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate font-mono">{contract.fileName}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 border-t border-white/8 pt-3">
        <span className="rounded-md bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-300">
          {riskCounts.high} высоких
        </span>
        <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-300">
          {riskCounts.warnings} предупр.
        </span>
        <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
          {riskCounts.normal} норма
        </span>
      </div>

      <p className="mt-3 text-sm font-medium text-slate-300">
        {formatAmount(contract.totalAmount, contract.currency)}
      </p>
    </motion.button>
  );
}

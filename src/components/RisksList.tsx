import { motion } from 'framer-motion';
import { AlertTriangle, Info } from 'lucide-react';
import type { RiskItem } from '../types/contract';

type RisksListVariant = 'high' | 'warning';

interface RisksListProps {
  title: string;
  risks: RiskItem[];
  variant: RisksListVariant;
}

const variantStyles: Record<
  RisksListVariant,
  { border: string; badge: string; icon: typeof AlertTriangle }
> = {
  high: {
    border: 'border-red-400/20',
    badge: 'bg-red-500/15 text-red-300',
    icon: AlertTriangle,
  },
  warning: {
    border: 'border-amber-400/20',
    badge: 'bg-amber-500/15 text-amber-300',
    icon: Info,
  },
};

export function RisksList({ title, risks, variant }: RisksListProps) {
  const styles = variantStyles[variant];
  const Icon = styles.icon;

  if (risks.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-4 text-slate-400" aria-hidden />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${styles.badge}`}>
          {risks.length}
        </span>
      </div>

      <ul className="space-y-3">
        {risks.map((risk, index) => (
          <motion.li
            key={risk.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-lg border p-4 ${styles.border} bg-white/3`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-sm font-medium text-white">{risk.title}</p>
              <span className="shrink-0 font-mono text-xs text-slate-500">{risk.clause}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{risk.description}</p>
            <p className="mt-3 border-t border-white/8 pt-3 text-xs text-slate-500">
              <span className="font-medium text-slate-400">Рекомендация: </span>
              {risk.recommendation}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { ContractResult } from '../types/contract';

interface RiskSummaryProps {
  result: ContractResult;
}

export function RiskSummary({ result }: RiskSummaryProps) {
  const { contract, riskCounts, summary } = result;

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4">
        <p className="text-xs font-medium tracking-wide text-violet-300 uppercase">
          Краткое заключение
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">{contract.name}</h2>
        <p className="mt-1 text-sm text-slate-400">
          {contract.documentType} · № {contract.contractNumber} · {contract.contractDate}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{summary}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2">
          <AlertTriangle className="size-4 text-red-400" aria-hidden />
          <span className="text-sm font-medium text-red-300">
            {riskCounts.high} высоких
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2">
          <Info className="size-4 text-amber-400" aria-hidden />
          <span className="text-sm font-medium text-amber-300">
            {riskCounts.warnings} предупреждений
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2">
          <CheckCircle2 className="size-4 text-emerald-400" aria-hidden />
          <span className="text-sm font-medium text-emerald-300">
            {riskCounts.normal} нормальных
          </span>
        </div>
      </div>
    </section>
  );
}

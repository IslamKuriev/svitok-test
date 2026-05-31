import { motion } from 'framer-motion';
import { ArrowRight, FileKey, Gavel, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ContractResult } from '../types/contract';
import { FileCard } from './FileCard';

const documentIcons: Record<string, LucideIcon> = {
  'supply-dell-poweredge': Server,
  'license-erp-suite': FileKey,
  'gov-contract-44fz': Gavel,
};

interface ExampleSelectorProps {
  examples: ContractResult[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAnalyze: () => void;
}

export function ExampleSelector({
  examples,
  selectedId,
  onSelect,
  onAnalyze,
}: ExampleSelectorProps) {
  const isReady = selectedId !== null;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-300">Выберите документ для анализа</h2>
        <span className="text-xs text-slate-500">{examples.length} примера</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-1">
        {examples.map((example, index) => {
          const { contract, riskCounts } = example;
          const Icon = documentIcons[contract.id] ?? Server;

          return (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <FileCard
                contract={contract}
                riskCounts={riskCounts}
                selected={selectedId === contract.id}
                icon={Icon}
                onSelect={() => onSelect(contract.id)}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          type="button"
          disabled={!isReady}
          onClick={onAnalyze}
          whileHover={isReady ? { scale: 1.01 } : undefined}
          whileTap={isReady ? { scale: 0.98 } : undefined}
          className={[
            'flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200',
            isReady
              ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500'
              : 'cursor-not-allowed bg-white/5 text-slate-500',
          ].join(' ')}
        >
          Запустить анализ
          <ArrowRight className="size-4" aria-hidden />
        </motion.button>

        {!isReady && (
          <p className="mt-2 text-center text-xs text-slate-500">
            Выберите один из документов выше
          </p>
        )}
      </motion.div>
    </section>
  );
}

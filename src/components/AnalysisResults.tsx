import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { ContractResult } from '../types/contract';
import {
  getHighRisks,
  getNormalRequisites,
  getWarningRisks,
} from '../utils/contractFilters';
import { AutoFilledFields } from './AutoFilledFields';
import { ContractTable } from './ContractTable';
import { RiskSummary } from './RiskSummary';
import { RisksList } from './RisksList';

interface AnalysisResultsProps {
  result: ContractResult;
  onBack: () => void;
}

export function AnalysisResults({ result, onBack }: AnalysisResultsProps) {
  const highRisks = getHighRisks(result.risks);
  const warningRisks = getWarningRisks(result.risks);
  const normalRequisites = getNormalRequisites(result.requisites);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Новый анализ
      </button>

      <RiskSummary result={result} />

      <RisksList title="Высокие риски" risks={highRisks} variant="high" />

      <RisksList title="Предупреждения" risks={warningRisks} variant="warning" />

      <ContractTable title="Нормальные пункты" requisites={normalRequisites} />

      <AutoFilledFields fields={result.autoFilledFields} />
    </motion.div>
  );
}

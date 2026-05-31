import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AnalysisResults } from '../components/AnalysisResults';
import { ExampleSelector } from '../components/ExampleSelector';
import { Header } from '../components/Header';
import { ProcessingAnimation } from '../components/ProcessingAnimation';
import { contractExamples, getContractExampleById } from '../data/contractExamples';
import type { ContractResult } from '../types/contract';

export interface LawyerPageProps {
  onAnalyze?: (result: ContractResult) => void;
}

type PagePhase = 'select' | 'processing' | 'results';

const ANALYSIS_DURATION_MS = 2000;

const pageClass = 'relative min-h-svh overflow-hidden bg-[#08080f] font-sans';
const radialGlowClass =
  'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.18),transparent)]';
const gridOverlayClass =
  'pointer-events-none absolute inset-0 lawyer-page-grid mask-[radial-gradient(ellipse_at_center,black_20%,transparent_75%)]';

export function LawyerPage({ onAnalyze }: LawyerPageProps) {
  const [phase, setPhase] = useState<PagePhase>('select');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<ContractResult | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleAnalyze = () => {
    if (!selectedId) return;

    const result = getContractExampleById(selectedId);
    if (!result) return;

    setPhase('processing');

    timerRef.current = setTimeout(() => {
      setActiveResult(result);
      setPhase('results');
      onAnalyze?.(result);
    }, ANALYSIS_DURATION_MS);
  };

  const handleBack = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPhase('select');
    setActiveResult(null);
  };

  const isResultsLayout = phase === 'results';

  return (
    <div className={pageClass}>
      <div className={radialGlowClass} aria-hidden={true} />
      <div
        className="pointer-events-none absolute top-1/4 -left-32 size-96 rounded-full bg-violet-600/10 blur-3xl"
        aria-hidden={true}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-indigo-600/10 blur-3xl"
        aria-hidden={true}
      />
      <div className={gridOverlayClass} aria-hidden={true} />

      <main
        className={[
          'relative z-10 min-h-svh p-4 sm:p-6',
          isResultsLayout
            ? 'py-8'
            : 'flex items-center justify-center',
        ].join(' ')}
      >
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={[
            'rounded-2xl border border-white/10 bg-white/4 shadow-2xl shadow-black/40 backdrop-blur-xl',
            isResultsLayout
              ? 'mx-auto w-full max-w-3xl p-6 sm:p-8'
              : 'w-full max-w-2xl p-6 sm:p-8',
          ].join(' ')}
        >
          {phase === 'select' && (
            <>
              <Header />
              <ExampleSelector
                examples={contractExamples}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onAnalyze={handleAnalyze}
              />
            </>
          )}

          {phase === 'processing' && <ProcessingAnimation />}

          {phase === 'results' && activeResult && (
            <AnalysisResults result={activeResult} onBack={handleBack} />
          )}
        </motion.div>
      </main>
    </div>
  );
}

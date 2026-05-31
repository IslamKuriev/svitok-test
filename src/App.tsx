import { LawyerPage } from './pages/LawyerPage';
import type { ContractResult } from './types/contract';

function App() {
  const handleAnalyze = (result: ContractResult) => {
    console.info('[СВИТОК ЮРИСТ] Анализ запущен:', result.contract.name);
  };

  return <LawyerPage onAnalyze={handleAnalyze} />;
}

export default App;

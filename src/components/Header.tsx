import { Scale, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-8 text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium tracking-wide text-violet-200">
        <Sparkles className="size-3.5 text-violet-300" aria-hidden />
        Legal AI Platform
      </div>

      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
          <Scale className="size-5 text-white" aria-hidden />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          СВИТОК ЮРИСТ
        </h1>
      </div>

      <p className="text-base text-slate-400 sm:text-lg">
        ИИ-анализ юридических документов
      </p>
    </header>
  );
}

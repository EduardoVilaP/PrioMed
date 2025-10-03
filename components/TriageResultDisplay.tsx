
import React from 'react';
import { TriageResult } from '../types';

interface TriageResultDisplayProps {
  result: TriageResult;
}

const TriageResultDisplay: React.FC<TriageResultDisplayProps> = ({ result }) => {
  const { priorityScore, triageSummary, careType } = result;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getScoreRingColor = (score: number) => {
    if (score >= 80) return 'stroke-red-500';
    if (score >= 40) return 'stroke-yellow-500';
    return 'stroke-green-500';
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (priorityScore / 100) * circumference;

  return (
    <div className="mt-8 bg-slate-800/60 border border-slate-700 rounded-xl p-6 shadow-lg animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-slate-200 mb-4">Sua Triagem Preliminar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Score Ring */}
        <div className="flex justify-center items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className="text-slate-700"
                strokeWidth="10"
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="currentColor"
              ></circle>
              {/* Progress circle */}
              <circle
                className={`transform -rotate-90 origin-center transition-all duration-1000 ${getScoreRingColor(priorityScore)}`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="currentColor"
              ></circle>
            </svg>
            <div className={`absolute inset-0 flex flex-col justify-center items-center ${getScoreColor(priorityScore)}`}>
              <span className="text-4xl font-bold">{priorityScore}</span>
              <span className="text-sm font-semibold">Prioridade</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="md:col-span-2 text-center md:text-left">
          <p className="text-slate-400 mb-3">
            <span className="font-semibold text-slate-300">Resumo da IA:</span> "{triageSummary}"
          </p>
          <p className="text-slate-400">
            <span className="font-semibold text-slate-300">Recomendação:</span> O atendimento mais indicado é de <span className="font-bold text-white">{careType}</span>.
          </p>
           <p className="mt-3 text-xs text-slate-500 italic">
            Este score representa a prioridade inicial na fila. A sua posição é ajustada dinamicamente considerando também o seu tempo de espera.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TriageResultDisplay;

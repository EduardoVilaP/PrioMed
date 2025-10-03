
import React from 'react';
import Spinner from './Spinner';

interface SymptomInputProps {
  symptoms: string;
  setSymptoms: (symptoms: string) => void;
  onFindCare: () => void;
  isLoading: boolean;
}

const SymptomInput: React.FC<SymptomInputProps> = ({ symptoms, setSymptoms, onFindCare, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onFindCare();
      }
    }
  };
    
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700 animate-fade-in-up">
      <label htmlFor="symptoms" className="block text-lg font-medium text-slate-300 mb-2">
        Descreva seus sintomas
      </label>
      <textarea
        id="symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ex: febre alta, dor de cabeça e tosse seca há 2 dias..."
        className="w-full h-28 p-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none placeholder-slate-500"
        disabled={isLoading}
      />
      <button
        onClick={onFindCare}
        disabled={isLoading || !symptoms.trim()}
        className="mt-4 w-full flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-lg shadow-cyan-900/50"
      >
        {isLoading ? (
          <>
            <Spinner />
            Analisando e buscando...
          </>
        ) : (
          'Encontrar Atendimento'
        )}
      </button>
    </div>
  );
};

export default SymptomInput;

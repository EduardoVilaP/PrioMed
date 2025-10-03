import React, { useState, useEffect, useCallback } from 'react';
import { Facility, CareType, OccupancyLevel, Coordinates, TriageResult } from './types';
import { MOCK_FACILITIES } from './constants';
import { getTriageResult } from './services/geminiService';
import { getUserLocation, findNearbyFacilities } from './services/locationService';
import { Stethoscope } from './components/icons/Stethoscope';
import SymptomInput from './components/SymptomInput';
import TriageResultDisplay from './components/TriageResultDisplay';
import FacilityList from './components/FacilityList';
import EstablishmentDashboard from './components/EstablishmentDashboard';

const App: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>(MOCK_FACILITIES);
  const [view, setView] = useState<'patient' | 'establishment'>('patient');

  // Patient view state
  const [symptoms, setSymptoms] = useState<string>('');
  const [recommendedFacilities, setRecommendedFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);

  // Data simulation logic
  useEffect(() => {
    const simulateData = () => {
      setFacilities(prevFacilities =>
        prevFacilities.map(facility => {
          let newWaitTime = facility.waitTimeMinutes;
          const fluctuation = Math.random() * 10 - 5;
          switch (facility.type) {
            case CareType.Emergencia:
              newWaitTime += fluctuation * 2;
              break;
            case CareType.Urgencia:
              newWaitTime += fluctuation;
              break;
            case CareType.Consulta:
              newWaitTime += fluctuation * 0.5;
              break;
          }
          newWaitTime = Math.max(5, Math.min(300, newWaitTime));

          let newOccupancy: OccupancyLevel;
          if (newWaitTime > 150) newOccupancy = OccupancyLevel.Lotado;
          else if (newWaitTime > 80) newOccupancy = OccupancyLevel.Alta;
          else if (newWaitTime > 30) newOccupancy = OccupancyLevel.Moderada;
          else newOccupancy = OccupancyLevel.Baixa;

          return {
            ...facility,
            waitTimeMinutes: Math.round(newWaitTime),
            occupancy: newOccupancy,
          };
        })
      );
    };

    const intervalId = setInterval(simulateData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Find care logic
  const handleFindCare = useCallback(async () => {
    if (!symptoms.trim()) {
      setError('Por favor, descreva seus sintomas.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearched(true);
    setRecommendedFacilities([]);
    setUserLocation(null);
    setTriageResult(null);

    try {
      const location: Coordinates = await getUserLocation();
      setUserLocation(location);
      
      const triageData: TriageResult = await getTriageResult(symptoms);
      setTriageResult(triageData);
      
      const nearbyFacilities = findNearbyFacilities(location, triageData.careType, facilities);

      setRecommendedFacilities(nearbyFacilities);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [symptoms, facilities]);


  const viewButtonClasses = (buttonView: 'patient' | 'establishment') => 
    `px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
      view === buttonView 
        ? 'bg-cyan-500 text-white shadow-md' 
        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
    }`;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8 animate-fade-in-down">
          <div className="flex justify-center items-center gap-4 mb-2">
            <Stethoscope className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              PrioMed
            </h1>
          </div>
        </header>

        <nav className="flex justify-center p-1 bg-slate-800 rounded-full shadow-inner mb-8 w-fit mx-auto animate-fade-in">
          <button onClick={() => setView('patient')} className={viewButtonClasses('patient')} aria-current={view === 'patient'}>
            Para Pacientes
          </button>
          <button onClick={() => setView('establishment')} className={viewButtonClasses('establishment')} aria-current={view === 'establishment'}>
            Para Estabelecimentos
          </button>
        </nav>

        {view === 'patient' ? (
          <main>
            <p className="text-center text-slate-400 text-lg mb-8 animate-fade-in-up">
              Relate seus sintomas e encontre o atendimento ideal perto de você.
            </p>
            <SymptomInput
              symptoms={symptoms}
              setSymptoms={setSymptoms}
              onFindCare={handleFindCare}
              isLoading={isLoading}
            />
            {error && (
              <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center animate-fade-in">
                <p><strong>Erro:</strong> {error}</p>
              </div>
            )}
            
            {triageResult && !isLoading && (
              <TriageResultDisplay result={triageResult} />
            )}
      
            <div className="mt-8">
              <FacilityList
                facilities={recommendedFacilities}
                isLoading={isLoading}
                searched={searched}
                userLocation={userLocation}
              />
            </div>
          </main>
        ) : (
          <main>
              <EstablishmentDashboard facilities={facilities} />
          </main>
        )}
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Aviso: Este é um protótipo. As informações de tempo de espera e lotação são simuladas.</p>
          <p>&copy; 2024 PrioMed. Desenvolvido com IA.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
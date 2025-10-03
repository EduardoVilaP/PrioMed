import React from 'react';
import { Facility, Coordinates } from '../types';
import FacilityCard from './FacilityCard';
import Spinner from './Spinner';

interface FacilityListProps {
  facilities: Facility[];
  isLoading: boolean;
  searched: boolean;
  userLocation: Coordinates | null;
}

const FacilityList: React.FC<FacilityListProps> = ({ facilities, isLoading, searched, userLocation }) => {
  if (isLoading) {
    return (
      <div className="text-center p-8 text-slate-400">
        <div className="flex justify-center items-center gap-3">
          <Spinner />
          <p className="text-lg">Buscando locais de atendimento...</p>
        </div>
      </div>
    );
  }

  if (!searched) {
    return null;
  }

  if (facilities.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-800/50 rounded-lg mt-6 border border-slate-700 animate-fade-in">
        <h3 className="text-xl font-semibold text-slate-300">Nenhum local encontrado</h3>
        <p className="text-slate-400 mt-2">
          Não encontramos locais de atendimento correspondentes à recomendação para os sintomas informados. Tente descrever seus sintomas com mais detalhes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-200 mb-4 border-b-2 border-slate-700 pb-2">
            Locais Recomendados
        </h2>
      {facilities.map((facility, index) => (
        <FacilityCard 
          key={facility.id} 
          facility={facility} 
          index={index} 
          userLocation={userLocation}
        />
      ))}
    </div>
  );
};

export default FacilityList;
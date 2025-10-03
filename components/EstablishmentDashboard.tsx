import React from 'react';
import { Facility } from '../types';
import FacilityManagerCard from './FacilityManagerCard';
import { Building } from './icons/Building';

interface EstablishmentDashboardProps {
  facilities: Facility[];
}

const EstablishmentDashboard: React.FC<EstablishmentDashboardProps> = ({ facilities }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-2">
            <Building className="w-10 h-10 text-cyan-400" />
            <h2 className="text-3xl font-bold text-slate-200">
                Monitoramento de Fluxo
            </h2>
        </div>
        <p className="text-slate-400">
            Visualize o status atual da sua unidade em tempo real.
        </p>
      </div>
      <div className="space-y-4">
        {facilities.map((facility, index) => (
          <FacilityManagerCard
            key={facility.id}
            facility={facility}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default EstablishmentDashboard;
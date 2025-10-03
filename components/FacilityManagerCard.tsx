import React from 'react';
import { Facility, OccupancyLevel } from '../types';
import { Clock } from './icons/Clock';
import { Users } from './icons/Users';
import { MapPin } from './icons/MapPin';

interface FacilityManagerCardProps {
  facility: Facility;
  index: number;
}

const occupancyStyles: Record<OccupancyLevel, { text: string; bg: string; icon: string }> = {
  [OccupancyLevel.Baixa]: { text: 'text-green-300', bg: 'bg-green-500/20', icon: '🟢' },
  [OccupancyLevel.Moderada]: { text: 'text-yellow-300', bg: 'bg-yellow-500/20', icon: '🟡' },
  [OccupancyLevel.Alta]: { text: 'text-orange-300', bg: 'bg-orange-500/20', icon: '🟠' },
  [OccupancyLevel.Lotado]: { text: 'text-red-300', bg: 'bg-red-500/20', icon: '🔴' },
};

const formatWaitTime = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins > 0 ? `${mins}min` : ''}`.trim();
};

const FacilityManagerCard: React.FC<FacilityManagerCardProps> = ({ facility, index }) => {
  const style = { animationDelay: `${index * 100}ms` };
  const occupancyStyle = occupancyStyles[facility.occupancy];


  return (
    <div
      className="bg-slate-800 border border-slate-700 rounded-lg p-5 shadow-lg transition-all duration-300 animate-fade-in-up"
      style={style}
    >
        <div>
          <h3 className="text-xl font-bold text-cyan-300">{facility.name}</h3>
          <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            {facility.address}
          </p>
        </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700 flex flex-wrap gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-slate-400" />
              <div>
                <p className="font-semibold text-white">{formatWaitTime(facility.waitTimeMinutes)}</p>
                <p className="text-sm text-slate-400">Tempo de espera</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-slate-400" />
              <div>
                <p className={`font-semibold ${occupancyStyle.text}`}>{facility.occupancy}</p>
                <p className="text-sm text-slate-400">Lotação atual</p>
              </div>
            </div>
      </div>
    </div>
  );
};

export default FacilityManagerCard;

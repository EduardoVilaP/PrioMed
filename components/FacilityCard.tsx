
import React from 'react';
import { Facility, OccupancyLevel, Coordinates } from '../types';
import { Clock } from './icons/Clock';
import { Users } from './icons/Users';
import { MapPin } from './icons/MapPin';
import { Navigation } from './icons/Navigation';

interface FacilityCardProps {
  facility: Facility;
  index: number;
  userLocation: Coordinates | null;
}

const occupancyStyles: Record<OccupancyLevel, { text: string; bg: string; icon: string }> = {
  [OccupancyLevel.Baixa]: { text: 'text-green-300', bg: 'bg-green-500/20', icon: '🟢' },
  [OccupancyLevel.Moderada]: { text: 'text-yellow-300', bg: 'bg-yellow-500/20', icon: '🟡' },
  [OccupancyLevel.Alta]: { text: 'text-orange-300', bg: 'bg-orange-500/20', icon: '🟠' },
  [OccupancyLevel.Lotado]: { text: 'text-red-300', bg: 'bg-red-500/20', icon: '🔴' },
};

const FacilityCard: React.FC<FacilityCardProps> = ({ facility, index, userLocation }) => {
  const style = { animationDelay: `${index * 100}ms` };
  const occupancyStyle = occupancyStyles[facility.occupancy];

  const formatWaitTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}min` : ''}`.trim();
  };

  const handleGetDirections = () => {
    if (userLocation) {
      const { latitude: userLat, longitude: userLng } = userLocation;
      const { latitude: facilityLat, longitude: facilityLng } = facility.coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${facilityLat},${facilityLng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };


  return (
    <div 
      className="bg-slate-800 border border-slate-700 rounded-lg p-5 shadow-lg hover:bg-slate-700/50 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
      style={style}
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-start">
        <div>
          <h3 className="text-xl font-bold text-cyan-300">{facility.name}</h3>
          <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            {facility.address}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 sm:text-right flex-shrink-0">
            <p className="text-lg font-semibold text-white">{facility.distanceKm} km</p>
            <p className="text-sm text-slate-400">de distância</p>
        </div>
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

      <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
         <p className="text-xs text-slate-500 italic flex-1">
          Nota: A fila de prioridade é dinâmica e considera a urgência e o tempo de chegada.
        </p>
        <button
          onClick={handleGetDirections}
          disabled={!userLocation}
          className="w-full sm:w-auto flex-shrink-0 mt-2 sm:mt-0 flex justify-center items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        >
          <Navigation className="w-4 h-4" />
          Obter Rotas
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;

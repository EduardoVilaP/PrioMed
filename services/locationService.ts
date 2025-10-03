import { Coordinates, CareType, Facility } from '../types';

export const getUserLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não é suportada por este navegador.'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          reject(new Error('Não foi possível obter sua localização. Por favor, habilite a permissão de localização.'));
        }
      );
    }
  });
};

const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.latitude * (Math.PI / 180)) *
      Math.cos(coord2.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};


export const findNearbyFacilities = (userLocation: Coordinates, careType: CareType, allFacilities: Facility[]): Facility[] => {
    
    const relevantFacilities = allFacilities.filter(facility => facility.type === careType);

    const facilitiesWithDistance = relevantFacilities.map(facility => ({
        ...facility,
        distanceKm: parseFloat(calculateDistance(userLocation, facility.coordinates).toFixed(1)),
    }));

    facilitiesWithDistance.sort((a, b) => a.distanceKm! - b.distanceKm!);

    return facilitiesWithDistance;
}
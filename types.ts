
export enum CareType {
  Emergencia = 'Emergência',
  Urgencia = 'Urgência',
  Consulta = 'Consulta de Rotina',
  Desconhecido = 'Desconhecido',
}

export enum OccupancyLevel {
  Baixa = 'Baixa',
  Moderada = 'Moderada',
  Alta = 'Alta',
  Lotado = 'Lotado',
}

export interface TriageResult {
  careType: CareType;
  priorityScore: number;
  triageSummary: string;
}

export interface Facility {
  id: number;
  name: string;
  address: string;
  coordinates: Coordinates;
  waitTimeMinutes: number;
  occupancy: OccupancyLevel;
  type: CareType;
  distanceKm?: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export enum TaxiAvailability {
  Available = "available",
  Busy = "busy",
}

export interface Taxi {
  status: TaxiAvailability;
  taxi_id: string;
  model: string;
  license_plate: string;
  current_location: { x: number; y: number };
  availability: TaxiAvailability;
}
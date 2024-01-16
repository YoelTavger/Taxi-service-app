export interface UserType {
    user_id?: number;
    user_name: string;
    password: string;
    email: string;
    full_name: string;
    phone_number: string;
    created_at?: Date;
}

export enum TaxiAvailability {
    Available = "available",
    Busy = "busy",
  }
  
  export interface TaxiAttributes {
    taxi_id: string;
    model: string;
    license_plate: string;
    current_location: { x: number; y: number };
    availability: TaxiAvailability;
  }
  
import { Vehicle } from '../entities/vehicle.entity';

export interface VehicleRepository {
  save(vehicle: Vehicle): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle | null>;
  findByPlaca(placa: string): Promise<Vehicle | null>;
  findByChassi(chassi: string): Promise<Vehicle | null>;
  findByRenavam(renavam: string): Promise<Vehicle | null>;
  findAll(): Promise<Vehicle[]>;
  update(id: string, vehicle: Vehicle): Promise<Vehicle>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}

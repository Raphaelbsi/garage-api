import { Injectable } from '@nestjs/common';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';

@Injectable()
export class InMemoryVehicleRepository implements VehicleRepository {
  private vehicles: Map<string, Vehicle> = new Map();

  async save(vehicle: Vehicle): Promise<Vehicle> {
    this.vehicles.set(vehicle.id, vehicle);
    return vehicle;
  }

  async findById(id: string): Promise<Vehicle | null> {
    return this.vehicles.get(id) || null;
  }

  async findByPlaca(placa: string): Promise<Vehicle | null> {
    for (const vehicle of this.vehicles.values()) {
      if (vehicle.placa === placa) {
        return vehicle;
      }
    }
    return null;
  }

  async findByChassi(chassi: string): Promise<Vehicle | null> {
    for (const vehicle of this.vehicles.values()) {
      if (vehicle.chassi === chassi) {
        return vehicle;
      }
    }
    return null;
  }

  async findByRenavam(renavam: string): Promise<Vehicle | null> {
    for (const vehicle of this.vehicles.values()) {
      if (vehicle.renavam === renavam) {
        return vehicle;
      }
    }
    return null;
  }

  async findAll(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async update(id: string, vehicle: Vehicle): Promise<Vehicle> {
    if (!this.vehicles.has(id)) {
      throw new Error(`Vehicle with id ${id} not found`);
    }
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async delete(id: string): Promise<void> {
    if (!this.vehicles.has(id)) {
      throw new Error(`Vehicle with id ${id} not found`);
    }
    this.vehicles.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.vehicles.has(id);
  }

  // Method for testing purposes - to clear the repository
  clear(): void {
    this.vehicles.clear();
  }

  // Method for testing purposes - to get size
  size(): number {
    return this.vehicles.size;
  }
}

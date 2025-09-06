import { Injectable, Inject } from '@nestjs/common';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';

@Injectable()
export class DeleteVehicleUseCase {
  constructor(
    @Inject('VehicleRepository')
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingVehicle = await this.vehicleRepository.findById(id);

    if (!existingVehicle) {
      throw new Error(`Vehicle with id ${id} not found`);
    }

    await this.vehicleRepository.delete(id);
  }
}

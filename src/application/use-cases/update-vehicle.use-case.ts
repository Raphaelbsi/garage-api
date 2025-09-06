import { Injectable, Inject } from '@nestjs/common';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { UpdateVehicleDto } from '../dtos/update-vehicle.dto';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject('VehicleRepository')
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findById(id);

    if (!existingVehicle) {
      throw new Error(`Vehicle with id ${id} not found`);
    }

    await this.validateUniqueConstraints(id, updateVehicleDto);

    existingVehicle.update(updateVehicleDto);
    return await this.vehicleRepository.update(id, existingVehicle);
  }

  private async validateUniqueConstraints(
    currentId: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<void> {
    if (updateVehicleDto.placa) {
      const existingByPlaca = await this.vehicleRepository.findByPlaca(
        updateVehicleDto.placa,
      );
      if (existingByPlaca && existingByPlaca.id !== currentId) {
        throw new Error(
          `Vehicle with placa ${updateVehicleDto.placa} already exists`,
        );
      }
    }

    if (updateVehicleDto.chassi) {
      const existingByChassi = await this.vehicleRepository.findByChassi(
        updateVehicleDto.chassi,
      );
      if (existingByChassi && existingByChassi.id !== currentId) {
        throw new Error(
          `Vehicle with chassi ${updateVehicleDto.chassi} already exists`,
        );
      }
    }

    if (updateVehicleDto.renavam) {
      const existingByRenavam = await this.vehicleRepository.findByRenavam(
        updateVehicleDto.renavam,
      );
      if (existingByRenavam && existingByRenavam.id !== currentId) {
        throw new Error(
          `Vehicle with renavam ${updateVehicleDto.renavam} already exists`,
        );
      }
    }
  }
}

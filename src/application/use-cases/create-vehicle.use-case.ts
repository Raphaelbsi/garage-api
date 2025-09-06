import { Injectable, Inject } from '@nestjs/common';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject('VehicleRepository')
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    await this.validateUniqueConstraints(createVehicleDto);

    const vehicle = new Vehicle(createVehicleDto);
    return await this.vehicleRepository.save(vehicle);
  }

  private async validateUniqueConstraints(
    createVehicleDto: CreateVehicleDto,
  ): Promise<void> {
    const existingByPlaca = await this.vehicleRepository.findByPlaca(
      createVehicleDto.placa,
    );
    if (existingByPlaca) {
      throw new Error(
        `Vehicle with placa ${createVehicleDto.placa} already exists`,
      );
    }

    const existingByChassi = await this.vehicleRepository.findByChassi(
      createVehicleDto.chassi,
    );
    if (existingByChassi) {
      throw new Error(
        `Vehicle with chassi ${createVehicleDto.chassi} already exists`,
      );
    }

    const existingByRenavam = await this.vehicleRepository.findByRenavam(
      createVehicleDto.renavam,
    );
    if (existingByRenavam) {
      throw new Error(
        `Vehicle with renavam ${createVehicleDto.renavam} already exists`,
      );
    }
  }
}

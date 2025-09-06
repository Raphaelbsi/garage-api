import { Module } from '@nestjs/common';
import { VehicleController } from './presentation/controllers/vehicle.controller';
import { CreateVehicleUseCase } from './application/use-cases/create-vehicle.use-case';
import { FindAllVehiclesUseCase } from './application/use-cases/find-all-vehicles.use-case';
import { FindVehicleByIdUseCase } from './application/use-cases/find-vehicle-by-id.use-case';
import { UpdateVehicleUseCase } from './application/use-cases/update-vehicle.use-case';
import { DeleteVehicleUseCase } from './application/use-cases/delete-vehicle.use-case';
import { VehicleRepository } from './domain/repositories/vehicle.repository';
import { InMemoryVehicleRepository } from './infrastructure/repositories/in-memory-vehicle.repository';

@Module({
  controllers: [VehicleController],
  providers: [
    {
      provide: 'VehicleRepository',
      useClass: InMemoryVehicleRepository,
    },
    CreateVehicleUseCase,
    FindAllVehiclesUseCase,
    FindVehicleByIdUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
  ],
  exports: ['VehicleRepository'],
})
export class VehicleModule {}

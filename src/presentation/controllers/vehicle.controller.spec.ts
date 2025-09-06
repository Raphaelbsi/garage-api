import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { CreateVehicleUseCase } from '../../application/use-cases/create-vehicle.use-case';
import { FindAllVehiclesUseCase } from '../../application/use-cases/find-all-vehicles.use-case';
import { FindVehicleByIdUseCase } from '../../application/use-cases/find-vehicle-by-id.use-case';
import { UpdateVehicleUseCase } from '../../application/use-cases/update-vehicle.use-case';
import { DeleteVehicleUseCase } from '../../application/use-cases/delete-vehicle.use-case';
import { CreateVehicleDto } from '../../application/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../../application/dtos/update-vehicle.dto';
import { Vehicle } from '../../domain/entities/vehicle.entity';

describe('VehicleController', () => {
  let controller: VehicleController;
  let createVehicleUseCase: jest.Mocked<CreateVehicleUseCase>;
  let findAllVehiclesUseCase: jest.Mocked<FindAllVehiclesUseCase>;
  let findVehicleByIdUseCase: jest.Mocked<FindVehicleByIdUseCase>;
  let updateVehicleUseCase: jest.Mocked<UpdateVehicleUseCase>;
  let deleteVehicleUseCase: jest.Mocked<DeleteVehicleUseCase>;

  beforeEach(async () => {
    const mockCreateVehicleUseCase = {
      execute: jest.fn(),
    };

    const mockFindAllVehiclesUseCase = {
      execute: jest.fn(),
    };

    const mockFindVehicleByIdUseCase = {
      execute: jest.fn(),
    };

    const mockUpdateVehicleUseCase = {
      execute: jest.fn(),
    };

    const mockDeleteVehicleUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: CreateVehicleUseCase,
          useValue: mockCreateVehicleUseCase,
        },
        {
          provide: FindAllVehiclesUseCase,
          useValue: mockFindAllVehiclesUseCase,
        },
        {
          provide: FindVehicleByIdUseCase,
          useValue: mockFindVehicleByIdUseCase,
        },
        {
          provide: UpdateVehicleUseCase,
          useValue: mockUpdateVehicleUseCase,
        },
        {
          provide: DeleteVehicleUseCase,
          useValue: mockDeleteVehicleUseCase,
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    createVehicleUseCase = module.get(CreateVehicleUseCase);
    findAllVehiclesUseCase = module.get(FindAllVehiclesUseCase);
    findVehicleByIdUseCase = module.get(FindVehicleByIdUseCase);
    updateVehicleUseCase = module.get(UpdateVehicleUseCase);
    deleteVehicleUseCase = module.get(DeleteVehicleUseCase);
  });

  describe('create', () => {
    it('should create a vehicle', async () => {
      const createVehicleDto: CreateVehicleDto = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      const createdVehicle = new Vehicle(createVehicleDto);
      createVehicleUseCase.execute.mockResolvedValue(createdVehicle);

      const result = await controller.create(createVehicleDto);

      expect(createVehicleUseCase.execute).toHaveBeenCalledWith(
        createVehicleDto,
      );
      expect(result).toEqual(createdVehicle.toJSON());
    });
  });

  describe('findAll', () => {
    it('should return all vehicles', async () => {
      const vehicles = [
        new Vehicle({
          placa: 'ABC-1234',
          chassi: '1HGBH41JXMN109186',
          renavam: '12345678901',
          modelo: 'Civic',
          marca: 'Honda',
          ano: 2023,
        }),
        new Vehicle({
          placa: 'XYZ-9876',
          chassi: '9HGBH41JXMN109189',
          renavam: '98765432109',
          modelo: 'Corolla',
          marca: 'Toyota',
          ano: 2022,
        }),
      ];

      findAllVehiclesUseCase.execute.mockResolvedValue(vehicles);

      const result = await controller.findAll();

      expect(findAllVehiclesUseCase.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(vehicles.map((v) => v.toJSON()));
    });
  });

  describe('findOne', () => {
    it('should return a vehicle by id', async () => {
      const vehicleId = '123e4567-e89b-12d3-a456-426614174000';
      const vehicle = new Vehicle({
        id: vehicleId,
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      findVehicleByIdUseCase.execute.mockResolvedValue(vehicle);

      const result = await controller.findOne(vehicleId);

      expect(findVehicleByIdUseCase.execute).toHaveBeenCalledWith(vehicleId);
      expect(result).toEqual(vehicle.toJSON());
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const vehicleId = '123e4567-e89b-12d3-a456-426614174000';
      const updateVehicleDto: UpdateVehicleDto = {
        modelo: 'Accord',
        ano: 2024,
      };

      const updatedVehicle = new Vehicle({
        id: vehicleId,
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Accord',
        marca: 'Honda',
        ano: 2024,
      });

      updateVehicleUseCase.execute.mockResolvedValue(updatedVehicle);

      const result = await controller.update(vehicleId, updateVehicleDto);

      expect(updateVehicleUseCase.execute).toHaveBeenCalledWith(
        vehicleId,
        updateVehicleDto,
      );
      expect(result).toEqual(updatedVehicle.toJSON());
    });
  });

  describe('remove', () => {
    it('should delete a vehicle', async () => {
      const vehicleId = '123e4567-e89b-12d3-a456-426614174000';

      deleteVehicleUseCase.execute.mockResolvedValue(undefined);

      const result = await controller.remove(vehicleId);

      expect(deleteVehicleUseCase.execute).toHaveBeenCalledWith(vehicleId);
      expect(result).toEqual({ message: 'Vehicle deleted successfully' });
    });
  });
});

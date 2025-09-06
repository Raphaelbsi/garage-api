import { FindVehicleByIdUseCase } from './find-vehicle-by-id.use-case';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';

describe('FindVehicleByIdUseCase', () => {
  let useCase: FindVehicleByIdUseCase;
  let vehicleRepository: jest.Mocked<VehicleRepository>;

  beforeEach(() => {
    vehicleRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByPlaca: jest.fn(),
      findByChassi: jest.fn(),
      findByRenavam: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    };

    useCase = new FindVehicleByIdUseCase(vehicleRepository);
  });

  describe('execute', () => {
    const vehicleId = '123e4567-e89b-12d3-a456-426614174000';

    it('should return vehicle when found', async () => {
      const vehicle = new Vehicle({
        id: vehicleId,
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      vehicleRepository.findById.mockResolvedValue(vehicle);

      const result = await useCase.execute(vehicleId);

      expect(vehicleRepository.findById).toHaveBeenCalledWith(vehicleId);
      expect(result).toEqual(vehicle);
    });

    it('should throw error when vehicle not found', async () => {
      vehicleRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(vehicleId)).rejects.toThrow(
        `Vehicle with id ${vehicleId} not found`,
      );

      expect(vehicleRepository.findById).toHaveBeenCalledWith(vehicleId);
    });

    it('should throw error if repository fails', async () => {
      vehicleRepository.findById.mockRejectedValue(new Error('Database error'));

      await expect(useCase.execute(vehicleId)).rejects.toThrow(
        'Database error',
      );
      expect(vehicleRepository.findById).toHaveBeenCalledWith(vehicleId);
    });
  });
});

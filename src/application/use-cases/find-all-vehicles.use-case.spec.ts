import { FindAllVehiclesUseCase } from './find-all-vehicles.use-case';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';

describe('FindAllVehiclesUseCase', () => {
  let useCase: FindAllVehiclesUseCase;
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

    useCase = new FindAllVehiclesUseCase(vehicleRepository);
  });

  describe('execute', () => {
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

      vehicleRepository.findAll.mockResolvedValue(vehicles);

      const result = await useCase.execute();

      expect(vehicleRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(vehicles);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no vehicles exist', async () => {
      vehicleRepository.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(vehicleRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should throw error if repository fails', async () => {
      vehicleRepository.findAll.mockRejectedValue(new Error('Database error'));

      await expect(useCase.execute()).rejects.toThrow('Database error');
      expect(vehicleRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});

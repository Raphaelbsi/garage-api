import { CreateVehicleUseCase } from './create-vehicle.use-case';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';

describe('CreateVehicleUseCase', () => {
  let useCase: CreateVehicleUseCase;
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

    useCase = new CreateVehicleUseCase(vehicleRepository);
  });

  describe('execute', () => {
    const validVehicleData: CreateVehicleDto = {
      placa: 'ABC-1234',
      chassi: '1HGBH41JXMN109186',
      renavam: '12345678901',
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2023,
    };

    it('should create a vehicle successfully', async () => {
      const expectedVehicle = new Vehicle(validVehicleData);
      vehicleRepository.findByPlaca.mockResolvedValue(null);
      vehicleRepository.findByChassi.mockResolvedValue(null);
      vehicleRepository.findByRenavam.mockResolvedValue(null);
      vehicleRepository.save.mockResolvedValue(expectedVehicle);

      const result = await useCase.execute(validVehicleData);

      expect(vehicleRepository.findByPlaca).toHaveBeenCalledWith(
        validVehicleData.placa,
      );
      expect(vehicleRepository.findByChassi).toHaveBeenCalledWith(
        validVehicleData.chassi,
      );
      expect(vehicleRepository.findByRenavam).toHaveBeenCalledWith(
        validVehicleData.renavam,
      );
      expect(vehicleRepository.save).toHaveBeenCalledWith(expect.any(Vehicle));
      expect(result).toEqual(expectedVehicle);
    });

    it('should throw error if vehicle with same placa already exists', async () => {
      const existingVehicle = new Vehicle(validVehicleData);
      vehicleRepository.findByPlaca.mockResolvedValue(existingVehicle);

      await expect(useCase.execute(validVehicleData)).rejects.toThrow(
        'Vehicle with placa ABC-1234 already exists',
      );

      expect(vehicleRepository.findByPlaca).toHaveBeenCalledWith(
        validVehicleData.placa,
      );
      expect(vehicleRepository.save).not.toHaveBeenCalled();
    });

    it('should throw error if vehicle with same chassi already exists', async () => {
      const existingVehicle = new Vehicle({
        ...validVehicleData,
        placa: 'XYZ-9876',
      });
      vehicleRepository.findByPlaca.mockResolvedValue(null);
      vehicleRepository.findByChassi.mockResolvedValue(existingVehicle);

      await expect(useCase.execute(validVehicleData)).rejects.toThrow(
        'Vehicle with chassi 1HGBH41JXMN109186 already exists',
      );

      expect(vehicleRepository.findByChassi).toHaveBeenCalledWith(
        validVehicleData.chassi,
      );
      expect(vehicleRepository.save).not.toHaveBeenCalled();
    });

    it('should throw error if vehicle with same renavam already exists', async () => {
      const existingVehicle = new Vehicle({
        ...validVehicleData,
        placa: 'XYZ-9876',
        chassi: '9HGBH41JXMN109189',
      });
      vehicleRepository.findByPlaca.mockResolvedValue(null);
      vehicleRepository.findByChassi.mockResolvedValue(null);
      vehicleRepository.findByRenavam.mockResolvedValue(existingVehicle);

      await expect(useCase.execute(validVehicleData)).rejects.toThrow(
        'Vehicle with renavam 12345678901 already exists',
      );

      expect(vehicleRepository.findByRenavam).toHaveBeenCalledWith(
        validVehicleData.renavam,
      );
      expect(vehicleRepository.save).not.toHaveBeenCalled();
    });

    it('should throw error if repository save fails', async () => {
      vehicleRepository.findByPlaca.mockResolvedValue(null);
      vehicleRepository.findByChassi.mockResolvedValue(null);
      vehicleRepository.findByRenavam.mockResolvedValue(null);
      vehicleRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(useCase.execute(validVehicleData)).rejects.toThrow(
        'Database error',
      );

      expect(vehicleRepository.save).toHaveBeenCalledWith(expect.any(Vehicle));
    });
  });
});

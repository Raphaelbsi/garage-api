import { UpdateVehicleUseCase } from './update-vehicle.use-case';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { UpdateVehicleDto } from '../dtos/update-vehicle.dto';

describe('UpdateVehicleUseCase', () => {
  let useCase: UpdateVehicleUseCase;
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

    useCase = new UpdateVehicleUseCase(vehicleRepository);
  });

  describe('execute', () => {
    const vehicleId = '123e4567-e89b-12d3-a456-426614174000';
    const existingVehicle = new Vehicle({
      id: vehicleId,
      placa: 'ABC-1234',
      chassi: '1HGBH41JXMN109186',
      renavam: '12345678901',
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2023,
    });

    it('should update vehicle successfully', async () => {
      const updateData: UpdateVehicleDto = {
        modelo: 'Accord',
        ano: 2024,
      };

      const updatedVehicle = new Vehicle({
        ...existingVehicle.toJSON(),
        ...updateData,
      });

      vehicleRepository.findById.mockResolvedValue(existingVehicle);
      vehicleRepository.findByPlaca.mockResolvedValue(null);
      vehicleRepository.findByChassi.mockResolvedValue(null);
      vehicleRepository.findByRenavam.mockResolvedValue(null);
      vehicleRepository.update.mockResolvedValue(updatedVehicle);

      const result = await useCase.execute(vehicleId, updateData);

      expect(vehicleRepository.findById).toHaveBeenCalledWith(vehicleId);
      expect(vehicleRepository.update).toHaveBeenCalledWith(
        vehicleId,
        expect.any(Vehicle),
      );
      expect(result).toEqual(updatedVehicle);
    });

    it('should throw error when vehicle not found', async () => {
      const updateData: UpdateVehicleDto = {
        modelo: 'Accord',
      };

      vehicleRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(vehicleId, updateData)).rejects.toThrow(
        `Vehicle with id ${vehicleId} not found`,
      );

      expect(vehicleRepository.findById).toHaveBeenCalledWith(vehicleId);
      expect(vehicleRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error if updating to existing placa', async () => {
      const updateData: UpdateVehicleDto = {
        placa: 'XYZ-9876',
      };

      const conflictVehicle = new Vehicle({
        id: 'different-id',
        placa: 'XYZ-9876',
        chassi: '9HGBH41JXMN109189',
        renavam: '98765432109',
        modelo: 'Corolla',
        marca: 'Toyota',
        ano: 2022,
      });

      vehicleRepository.findById.mockResolvedValue(existingVehicle);
      vehicleRepository.findByPlaca.mockResolvedValue(conflictVehicle);

      await expect(useCase.execute(vehicleId, updateData)).rejects.toThrow(
        'Vehicle with placa XYZ-9876 already exists',
      );

      expect(vehicleRepository.findByPlaca).toHaveBeenCalledWith(
        updateData.placa,
      );
      expect(vehicleRepository.update).not.toHaveBeenCalled();
    });

    it('should allow updating to same placa of same vehicle', async () => {
      const updateData: UpdateVehicleDto = {
        placa: 'ABC-1234', // same placa
        modelo: 'Accord',
      };

      const updatedVehicle = new Vehicle({
        ...existingVehicle.toJSON(),
        ...updateData,
      });

      vehicleRepository.findById.mockResolvedValue(existingVehicle);
      vehicleRepository.findByPlaca.mockResolvedValue(existingVehicle); // same vehicle
      vehicleRepository.update.mockResolvedValue(updatedVehicle);

      const result = await useCase.execute(vehicleId, updateData);

      expect(vehicleRepository.update).toHaveBeenCalledWith(
        vehicleId,
        expect.any(Vehicle),
      );
      expect(result).toEqual(updatedVehicle);
    });
  });
});

import { InMemoryVehicleRepository } from './in-memory-vehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';

describe('InMemoryVehicleRepository', () => {
  let repository: InMemoryVehicleRepository;

  beforeEach(() => {
    repository = new InMemoryVehicleRepository();
  });

  afterEach(() => {
    repository.clear();
  });

  describe('save', () => {
    it('should save a vehicle', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      const result = await repository.save(vehicle);

      expect(result).toEqual(vehicle);
      expect(repository.size()).toBe(1);
    });
  });

  describe('findById', () => {
    it('should return vehicle when found', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      await repository.save(vehicle);
      const result = await repository.findById(vehicle.id);

      expect(result).toEqual(vehicle);
    });

    it('should return null when not found', async () => {
      const result = await repository.findById('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('findByPlaca', () => {
    it('should return vehicle when found by placa', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      await repository.save(vehicle);
      const result = await repository.findByPlaca('ABC-1234');

      expect(result).toEqual(vehicle);
    });

    it('should return null when not found', async () => {
      const result = await repository.findByPlaca('XYZ-9876');
      expect(result).toBeNull();
    });
  });

  describe('findByChassi', () => {
    it('should return vehicle when found by chassi', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      await repository.save(vehicle);
      const result = await repository.findByChassi('1HGBH41JXMN109186');

      expect(result).toEqual(vehicle);
    });

    it('should return null when not found', async () => {
      const result = await repository.findByChassi('9HGBH41JXMN109189');
      expect(result).toBeNull();
    });
  });

  describe('findByRenavam', () => {
    it('should return vehicle when found by renavam', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      await repository.save(vehicle);
      const result = await repository.findByRenavam('12345678901');

      expect(result).toEqual(vehicle);
    });

    it('should return null when not found', async () => {
      const result = await repository.findByRenavam('98765432109');
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all vehicles', async () => {
      const vehicle1 = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      const vehicle2 = new Vehicle({
        placa: 'XYZ-9876',
        chassi: '9HGBH41JXMN109189',
        renavam: '98765432109',
        modelo: 'Corolla',
        marca: 'Toyota',
        ano: 2022,
      });

      await repository.save(vehicle1);
      await repository.save(vehicle2);
      const result = await repository.findAll();

      expect(result).toHaveLength(2);
      expect(result).toContain(vehicle1);
      expect(result).toContain(vehicle2);
    });

    it('should return empty array when no vehicles', async () => {
      const result = await repository.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update vehicle successfully', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      await repository.save(vehicle);
      vehicle.update({ modelo: 'Accord' });
      const result = await repository.update(vehicle.id, vehicle);

      expect(result.modelo).toBe('Accord');
    });

    it('should throw error when vehicle not found', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      await expect(
        repository.update('non-existent-id', vehicle),
      ).rejects.toThrow('Vehicle with id non-existent-id not found');
    });
  });

  describe('delete', () => {
    it('should delete vehicle successfully', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      await repository.save(vehicle);
      expect(repository.size()).toBe(1);

      await repository.delete(vehicle.id);
      expect(repository.size()).toBe(0);
    });

    it('should throw error when vehicle not found', async () => {
      await expect(repository.delete('non-existent-id')).rejects.toThrow(
        'Vehicle with id non-existent-id not found',
      );
    });
  });

  describe('exists', () => {
    it('should return true when vehicle exists', async () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      await repository.save(vehicle);
      const result = await repository.exists(vehicle.id);

      expect(result).toBe(true);
    });

    it('should return false when vehicle does not exist', async () => {
      const result = await repository.exists('non-existent-id');
      expect(result).toBe(false);
    });
  });
});

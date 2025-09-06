import { Vehicle } from './vehicle.entity';

describe('Vehicle Entity', () => {
  describe('constructor', () => {
    it('should create a vehicle with all required properties', () => {
      const vehicleData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      const vehicle = new Vehicle(vehicleData);

      expect(vehicle.id).toBe(vehicleData.id);
      expect(vehicle.placa).toBe(vehicleData.placa);
      expect(vehicle.chassi).toBe(vehicleData.chassi);
      expect(vehicle.renavam).toBe(vehicleData.renavam);
      expect(vehicle.modelo).toBe(vehicleData.modelo);
      expect(vehicle.marca).toBe(vehicleData.marca);
      expect(vehicle.ano).toBe(vehicleData.ano);
    });

    it('should generate a new id if not provided', () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      const vehicle = new Vehicle(vehicleData);

      expect(vehicle.id).toBeDefined();
      expect(typeof vehicle.id).toBe('string');
      expect(vehicle.id.length).toBeGreaterThan(0);
    });

    it('should set createdAt and updatedAt timestamps', () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      const vehicle = new Vehicle(vehicleData);

      expect(vehicle.createdAt).toBeInstanceOf(Date);
      expect(vehicle.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('validation', () => {
    it('should throw error for invalid placa format', () => {
      const vehicleData = {
        placa: 'INVALID',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      expect(() => new Vehicle(vehicleData)).toThrow('Invalid placa format');
    });

    it('should throw error for invalid chassi length', () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: 'SHORT',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      expect(() => new Vehicle(vehicleData)).toThrow(
        'Chassi must have 17 characters',
      );
    });

    it('should throw error for invalid renavam length', () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '123',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      expect(() => new Vehicle(vehicleData)).toThrow(
        'Renavam must have 11 digits',
      );
    });

    it('should throw error for invalid year', () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 1885,
      };

      expect(() => new Vehicle(vehicleData)).toThrow('Invalid year');
    });

    it('should throw error for future year', () => {
      const nextYear = new Date().getFullYear() + 2;
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: nextYear,
      };

      expect(() => new Vehicle(vehicleData)).toThrow('Invalid year');
    });
  });

  describe('update', () => {
    it('should update vehicle properties and updatedAt timestamp', () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      const originalUpdatedAt = vehicle.updatedAt;

      setTimeout(() => {
        vehicle.update({
          modelo: 'Accord',
          marca: 'Honda',
          ano: 2024,
        });

        expect(vehicle.modelo).toBe('Accord');
        expect(vehicle.ano).toBe(2024);
        expect(vehicle.updatedAt).not.toBe(originalUpdatedAt);
      }, 10);
    });

    it('should validate updated properties', () => {
      const vehicle = new Vehicle({
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      });

      expect(() => vehicle.update({ ano: 1800 })).toThrow('Invalid year');
    });
  });
});

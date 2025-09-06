import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Vehicle E2E', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/vehicles (POST)', () => {
    it('should create a vehicle', () => {
      const createVehicleDto = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      return request(app.getHttpServer())
        .post('/vehicles')
        .send(createVehicleDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.placa).toBe(createVehicleDto.placa);
          expect(res.body.chassi).toBe(createVehicleDto.chassi);
          expect(res.body.renavam).toBe(createVehicleDto.renavam);
          expect(res.body.modelo).toBe(createVehicleDto.modelo);
          expect(res.body.marca).toBe(createVehicleDto.marca);
          expect(res.body.ano).toBe(createVehicleDto.ano);
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
        });
    });

    it('should return 400 for invalid placa format', () => {
      const createVehicleDto = {
        placa: 'INVALID',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      return request(app.getHttpServer())
        .post('/vehicles')
        .send(createVehicleDto)
        .expect(400);
    });

    it('should return 409 for duplicate placa', async () => {
      const createVehicleDto = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      // Create first vehicle
      await request(app.getHttpServer())
        .post('/vehicles')
        .send(createVehicleDto)
        .expect(201);

      // Try to create duplicate
      return request(app.getHttpServer())
        .post('/vehicles')
        .send({
          ...createVehicleDto,
          chassi: '9HGBH41JXMN109189',
          renavam: '98765432109',
        })
        .expect(409);
    });
  });

  describe('/vehicles (GET)', () => {
    it('should return empty array when no vehicles exist', () => {
      return request(app.getHttpServer())
        .get('/vehicles')
        .expect(200)
        .expect([]);
    });

    it('should return all vehicles', async () => {
      const createVehicleDto1 = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      const createVehicleDto2 = {
        placa: 'XYZ-9876',
        chassi: '9HGBH41JXMN109189',
        renavam: '98765432109',
        modelo: 'Corolla',
        marca: 'Toyota',
        ano: 2022,
      };

      // Create vehicles
      await request(app.getHttpServer())
        .post('/vehicles')
        .send(createVehicleDto1)
        .expect(201);

      await request(app.getHttpServer())
        .post('/vehicles')
        .send(createVehicleDto2)
        .expect(201);

      // Get all vehicles
      return request(app.getHttpServer())
        .get('/vehicles')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[1]).toHaveProperty('id');
        });
    });
  });

  describe('/vehicles/:id (GET)', () => {
    it('should return a vehicle by id', async () => {
      const createVehicleDto = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      // Create vehicle
      const createResponse = await request(app.getHttpServer())
        .post('/vehicles')
        .send(createVehicleDto)
        .expect(201);

      const vehicleId = createResponse.body.id;

      // Get vehicle by id
      return request(app.getHttpServer())
        .get(`/vehicles/${vehicleId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(vehicleId);
          expect(res.body.placa).toBe(createVehicleDto.placa);
        });
    });

    it('should return 404 for non-existent vehicle', () => {
      return request(app.getHttpServer())
        .get('/vehicles/123e4567-e89b-12d3-a456-426614174000')
        .expect(404);
    });
  });

  describe('/vehicles/:id (PATCH)', () => {
    it('should update a vehicle', async () => {
      const createVehicleDto = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      // Create vehicle
      const createResponse = await request(app.getHttpServer())
        .post('/vehicles')
        .send(createVehicleDto)
        .expect(201);

      const vehicleId = createResponse.body.id;

      const updateVehicleDto = {
        modelo: 'Accord',
        ano: 2024,
      };

      // Update vehicle
      return request(app.getHttpServer())
        .patch(`/vehicles/${vehicleId}`)
        .send(updateVehicleDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(vehicleId);
          expect(res.body.modelo).toBe(updateVehicleDto.modelo);
          expect(res.body.ano).toBe(updateVehicleDto.ano);
          expect(res.body.placa).toBe(createVehicleDto.placa); // unchanged
        });
    });

    it('should return 404 for non-existent vehicle', () => {
      return request(app.getHttpServer())
        .patch('/vehicles/123e4567-e89b-12d3-a456-426614174000')
        .send({ modelo: 'Test' })
        .expect(404);
    });
  });

  describe('/vehicles/:id (DELETE)', () => {
    it('should delete a vehicle', async () => {
      const createVehicleDto = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      // Create vehicle
      const createResponse = await request(app.getHttpServer())
        .post('/vehicles')
        .send(createVehicleDto)
        .expect(201);

      const vehicleId = createResponse.body.id;

      // Delete vehicle
      await request(app.getHttpServer())
        .delete(`/vehicles/${vehicleId}`)
        .expect(204);

      // Verify deletion
      return request(app.getHttpServer())
        .get(`/vehicles/${vehicleId}`)
        .expect(404);
    });

    it('should return 404 for non-existent vehicle', () => {
      return request(app.getHttpServer())
        .delete('/vehicles/123e4567-e89b-12d3-a456-426614174000')
        .expect(404);
    });
  });

  describe('Business rules validation', () => {
    it('should enforce unique constraints across all fields', async () => {
      const baseVehicle = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023,
      };

      // Create base vehicle
      await request(app.getHttpServer())
        .post('/vehicles')
        .send(baseVehicle)
        .expect(201);

      // Try to create with duplicate chassi
      await request(app.getHttpServer())
        .post('/vehicles')
        .send({
          ...baseVehicle,
          placa: 'XYZ-9876',
          renavam: '98765432109',
        })
        .expect(409);

      // Try to create with duplicate renavam
      await request(app.getHttpServer())
        .post('/vehicles')
        .send({
          ...baseVehicle,
          placa: 'XYZ-9876',
          chassi: '9HGBH41JXMN109189',
        })
        .expect(409);
    });

    it('should validate year constraints', () => {
      const invalidYearVehicle = {
        placa: 'ABC-1234',
        chassi: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 1800, // Invalid year
      };

      return request(app.getHttpServer())
        .post('/vehicles')
        .send(invalidYearVehicle)
        .expect(400);
    });
  });
});

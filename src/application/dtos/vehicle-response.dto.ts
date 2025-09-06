import { ApiProperty } from '@nestjs/swagger';

export enum VehicleType {
  CARRO = 'CARRO',
  MOTO = 'MOTO',
  CAMINHAO = 'CAMINHAO',
}

export class VehicleResponseDto {
  @ApiProperty({
    description: 'ID único do veículo',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Placa do veículo',
    example: 'ABC-1234',
  })
  placa: string;

  @ApiProperty({
    description: 'Chassi do veículo',
    example: '1HGBH41JXMN109186',
  })
  chassi: string;

  @ApiProperty({
    description: 'Renavam do veículo',
    example: '12345678901',
  })
  renavam: string;

  @ApiProperty({
    description: 'Modelo do veículo',
    example: 'Civic',
  })
  modelo: string;

  @ApiProperty({
    description: 'Marca do veículo',
    example: 'Honda',
  })
  marca: string;

  @ApiProperty({
    description: 'Ano do veículo',
    example: 2023,
  })
  ano: number;

  @ApiProperty({
    description: 'Cor do veículo',
    example: 'Azul',
  })
  cor: string;

  @ApiProperty({
    description: 'Tipo do veículo',
    example: VehicleType.CARRO,
    enum: VehicleType,
  })
  tipo: VehicleType;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

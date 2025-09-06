import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Matches,
  Length,
  Min,
  Max,
  IsEnum,
} from 'class-validator';

export enum VehicleType {
  CARRO = 'CARRO',
  MOTO = 'MOTO',
  CAMINHAO = 'CAMINHAO',
}

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Placa do veículo no formato ABC-1234 ou ABC1D23',
    example: 'ABC-1234',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, {
    message:
      'Placa deve estar no formato ABC-1234 (padrão antigo) ou ABC1D23 (Mercosul)',
  })
  placa: string;

  @ApiProperty({
    description: 'Chassi do veículo com 17 caracteres',
    example: '1HGBH41JXMN109186',
  })
  @IsString()
  @IsNotEmpty()
  @Length(17, 17, { message: 'Chassi deve ter exatamente 17 caracteres' })
  chassi: string;

  @ApiProperty({
    description: 'Renavam do veículo com 11 dígitos',
    example: '12345678901',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, {
    message: 'Renavam deve ter exatamente 11 dígitos numéricos',
  })
  renavam: string;

  @ApiProperty({
    description: 'Modelo do veículo',
    example: 'Civic',
  })
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty({
    description: 'Marca do veículo',
    example: 'Honda',
  })
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty({
    description: 'Ano do veículo',
    example: 2023,
    minimum: 1886,
  })
  @IsNumber()
  @Min(1886, { message: 'Ano deve ser maior ou igual a 1886' })
  @Max(new Date().getFullYear() + 1, {
    message: `Ano deve ser menor ou igual a ${new Date().getFullYear() + 1}`,
  })
  ano: number;

  @ApiProperty({
    description: 'Cor do veículo',
    example: 'Azul',
  })
  @IsString()
  @IsNotEmpty()
  cor: string;

  @ApiProperty({
    description: 'Tipo do veículo',
    example: VehicleType.CARRO,
    enum: VehicleType,
  })
  @IsEnum(VehicleType, { message: 'Tipo deve ser CARRO, MOTO ou CAMINHAO' })
  tipo: VehicleType;
}

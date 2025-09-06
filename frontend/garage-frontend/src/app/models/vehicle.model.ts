export interface Vehicle {
  id: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
  cor: string;
  tipo: VehicleType;
  createdAt: Date;
  updatedAt: Date;
}

export enum VehicleType {
  CARRO = 'CARRO',
  MOTO = 'MOTO',
  CAMINHAO = 'CAMINHAO',
}

export interface CreateVehicleRequest {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
  cor: string;
  tipo: VehicleType;
}

export interface UpdateVehicleRequest {
  placa?: string;
  chassi?: string;
  renavam?: string;
  modelo?: string;
  marca?: string;
  ano?: number;
  cor?: string;
  tipo?: VehicleType;
}

// Aliases para compatibilidade com diferentes convenções
export type CreateVehicleDto = CreateVehicleRequest;
export type UpdateVehicleDto = UpdateVehicleRequest;

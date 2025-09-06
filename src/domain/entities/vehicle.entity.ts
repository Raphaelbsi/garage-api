import { v4 as uuidv4 } from 'uuid';

export enum VehicleType {
  CARRO = 'CARRO',
  MOTO = 'MOTO',
  CAMINHAO = 'CAMINHAO',
}

export interface VehicleProps {
  id?: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
  cor: string;
  tipo: VehicleType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateVehicleProps {
  placa?: string;
  chassi?: string;
  renavam?: string;
  modelo?: string;
  marca?: string;
  ano?: number;
  cor?: string;
  tipo?: VehicleType;
}

export class Vehicle {
  private _id: string;
  private _placa: string;
  private _chassi: string;
  private _renavam: string;
  private _modelo: string;
  private _marca: string;
  private _ano: number;
  private _cor: string;
  private _tipo: VehicleType;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: VehicleProps) {
    this._id = props.id || uuidv4();
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();

    this.validateAndSetPlaca(props.placa);
    this.validateAndSetChassi(props.chassi);
    this.validateAndSetRenavam(props.renavam);
    this.validateAndSetAno(props.ano);

    this._modelo = props.modelo;
    this._marca = props.marca;
    this._cor = props.cor;
    this._tipo = props.tipo;
  }

  private validateAndSetPlaca(placa: string): void {
    const placaRegex = /^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (!placaRegex.test(placa)) {
      throw new Error('Invalid placa format');
    }
    this._placa = placa;
  }

  private validateAndSetChassi(chassi: string): void {
    if (chassi.length !== 17) {
      throw new Error('Chassi must have 17 characters');
    }
    this._chassi = chassi;
  }

  private validateAndSetRenavam(renavam: string): void {
    if (renavam.length !== 11 || !/^\d+$/.test(renavam)) {
      throw new Error('Renavam must have 11 digits');
    }
    this._renavam = renavam;
  }

  private validateAndSetAno(ano: number): void {
    const currentYear = new Date().getFullYear();
    if (ano < 1886 || ano > currentYear + 1) {
      throw new Error('Invalid year');
    }
    this._ano = ano;
  }

  update(props: UpdateVehicleProps): void {
    if (props.placa !== undefined) {
      this.validateAndSetPlaca(props.placa);
    }
    if (props.chassi !== undefined) {
      this.validateAndSetChassi(props.chassi);
    }
    if (props.renavam !== undefined) {
      this.validateAndSetRenavam(props.renavam);
    }
    if (props.ano !== undefined) {
      this.validateAndSetAno(props.ano);
    }
    if (props.modelo !== undefined) {
      this._modelo = props.modelo;
    }
    if (props.marca !== undefined) {
      this._marca = props.marca;
    }
    if (props.cor !== undefined) {
      this._cor = props.cor;
    }
    if (props.tipo !== undefined) {
      this._tipo = props.tipo;
    }

    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get placa(): string {
    return this._placa;
  }

  get chassi(): string {
    return this._chassi;
  }

  get renavam(): string {
    return this._renavam;
  }

  get modelo(): string {
    return this._modelo;
  }

  get marca(): string {
    return this._marca;
  }

  get ano(): number {
    return this._ano;
  }

  get cor(): string {
    return this._cor;
  }

  get tipo(): VehicleType {
    return this._tipo;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  toJSON() {
    return {
      id: this._id,
      placa: this._placa,
      chassi: this._chassi,
      renavam: this._renavam,
      modelo: this._modelo,
      marca: this._marca,
      ano: this._ano,
      cor: this._cor,
      tipo: this._tipo,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}

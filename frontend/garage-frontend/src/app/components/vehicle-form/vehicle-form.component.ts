import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Vehicle,
  VehicleType,
  CreateVehicleRequest,
  UpdateVehicleRequest,
} from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
})
export class VehicleFormComponent implements OnInit {
  vehicleForm!: FormGroup;
  loading = false;
  isEditMode = false;
  vehicleId?: string;
  currentVehicle?: Vehicle;

  // Configurações do formulário
  minYear = 1900;
  maxYear = new Date().getFullYear() + 1;

  availableColors = [
    { value: 'BRANCO', label: 'Branco', hex: '#ffffff' },
    { value: 'PRETO', label: 'Preto', hex: '#000000' },
    { value: 'PRATA', label: 'Prata', hex: '#c0c0c0' },
    { value: 'CINZA', label: 'Cinza', hex: '#808080' },
    { value: 'VERMELHO', label: 'Vermelho', hex: '#ff0000' },
    { value: 'AZUL', label: 'Azul', hex: '#0000ff' },
    { value: 'VERDE', label: 'Verde', hex: '#008000' },
    { value: 'AMARELO', label: 'Amarelo', hex: '#ffff00' },
    { value: 'LARANJA', label: 'Laranja', hex: '#ffa500' },
    { value: 'ROXO', label: 'Roxo', hex: '#800080' },
    { value: 'MARROM', label: 'Marrom', hex: '#a52a2a' },
    { value: 'ROSA', label: 'Rosa', hex: '#ffc0cb' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.vehicleId = params['id'];
        this.loadVehicle();
      }
    });
  }

  private initializeForm(): void {
    this.vehicleForm = this.fb.group({
      tipo: ['', [Validators.required]],
      placa: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[A-Z]{3}-?[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/,
          ),
        ],
      ],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      modelo: ['', [Validators.required, Validators.minLength(2)]],
      ano: [
        '',
        [
          Validators.required,
          Validators.min(this.minYear),
          Validators.max(this.maxYear),
        ],
      ],
      cor: ['', [Validators.required]],
      chassi: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(17),
          Validators.pattern(/^[A-Za-z0-9]+$/),
        ],
      ],
      renavam: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(/^[0-9]{11}$/),
        ],
      ],
    });
  }

  private async loadVehicle(): Promise<void> {
    if (!this.vehicleId) return;

    try {
      this.loading = true;
      this.vehicleService.getVehicleById(this.vehicleId).subscribe({
        next: (vehicle) => {
          this.currentVehicle = vehicle;
          this.populateForm(vehicle);
        },
        error: (error) => {
          console.error('Erro ao carregar veículo:', error);
          this.snackBar.open('Erro ao carregar dados do veículo', 'Fechar', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/vehicles']);
        },
        complete: () => {
          this.loading = false;
        },
      });
    } catch (error) {
      console.error('Erro ao carregar veículo:', error);
      this.snackBar.open('Erro ao carregar dados do veículo', 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      this.loading = false;
      this.router.navigate(['/vehicles']);
    }
  }

  private populateForm(vehicle: Vehicle): void {
    this.vehicleForm.patchValue({
      tipo: vehicle.tipo,
      placa: vehicle.placa,
      marca: vehicle.marca,
      modelo: vehicle.modelo,
      ano: vehicle.ano,
      cor: vehicle.cor,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
    });
  }

  onPlacaChange(event: any): void {
    let value = event.target.value.toUpperCase();

    // Remove caracteres inválidos
    value = value.replace(/[^A-Z0-9]/g, '');

    // Aplica formatação automática para placa antiga (ABC-1234)
    if (value.length <= 7 && /^[A-Z]{0,3}[0-9]*$/.test(value)) {
      if (value.length > 3) {
        value = value.substring(0, 3) + '-' + value.substring(3);
      }
    }

    // Atualiza o campo
    this.vehicleForm.get('placa')?.setValue(value);
  }

  async onSubmit(): Promise<void> {
    if (this.vehicleForm.invalid || this.loading) {
      this.markFormGroupTouched();
      return;
    }

    try {
      this.loading = true;
      const formValue = this.vehicleForm.value;

      if (this.isEditMode && this.vehicleId) {
        // Modo de edição
        const updateData: UpdateVehicleRequest = {
          tipo: formValue.tipo,
          placa: formValue.placa,
          marca: formValue.marca,
          modelo: formValue.modelo,
          ano: formValue.ano,
          cor: formValue.cor,
          chassi: formValue.chassi,
          renavam: formValue.renavam,
        };

        this.vehicleService
          .updateVehicle(this.vehicleId, updateData)
          .subscribe({
            next: () => {
              this.snackBar.open('Veículo atualizado com sucesso!', 'Fechar', {
                duration: 3000,
                panelClass: ['success-snackbar'],
              });
              this.router.navigate(['/vehicles']);
            },
            error: (error) => {
              console.error('Erro ao atualizar veículo:', error);
              this.handleError(error, 'Erro ao atualizar veículo');
            },
            complete: () => {
              this.loading = false;
            },
          });
      } else {
        // Modo de criação
        const createData: CreateVehicleRequest = {
          tipo: formValue.tipo,
          placa: formValue.placa,
          marca: formValue.marca,
          modelo: formValue.modelo,
          ano: formValue.ano,
          cor: formValue.cor,
          chassi: formValue.chassi,
          renavam: formValue.renavam,
        };

        this.vehicleService.createVehicle(createData).subscribe({
          next: () => {
            this.snackBar.open('Veículo cadastrado com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            this.router.navigate(['/vehicles']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar veículo:', error);
            this.handleError(error, 'Erro ao cadastrar veículo');
          },
          complete: () => {
            this.loading = false;
          },
        });
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      this.snackBar.open('Erro inesperado', 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      this.loading = false;
    }
  }

  private handleError(error: any, defaultMessage: string): void {
    let message = defaultMessage;

    if (error.error && error.error.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }

    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.vehicleForm.controls).forEach((key) => {
      const control = this.vehicleForm.get(key);
      control?.markAsTouched();
    });
  }

  getTypeIcon(type: VehicleType): string {
    const icons: { [key in VehicleType]: string } = {
      [VehicleType.CARRO]: 'directions_car',
      [VehicleType.MOTO]: 'two_wheeler',
      [VehicleType.CAMINHAO]: 'local_shipping',
    };
    return icons[type] || 'help';
  }

  getTypeLabel(type: VehicleType): string {
    const labels: { [key in VehicleType]: string } = {
      [VehicleType.CARRO]: 'Carro',
      [VehicleType.MOTO]: 'Moto',
      [VehicleType.CAMINHAO]: 'Caminhão',
    };
    return labels[type] || type;
  }

  getColorHex(color: string): string {
    const colorOption = this.availableColors.find((c) => c.value === color);
    return colorOption?.hex || '#cccccc';
  }
}

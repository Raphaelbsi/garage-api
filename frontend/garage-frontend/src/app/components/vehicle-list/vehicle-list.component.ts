import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicle, VehicleType } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  loading = true;

  // Filtros
  searchTerm = '';
  selectedType = '';
  selectedBrand = '';

  // Propriedades da tabela
  displayedColumns: string[] = [
    'tipo',
    'marca',
    'modelo',
    'placa',
    'ano',
    'cor',
    'actions',
  ];

  // Computed properties
  get uniqueBrands(): string[] {
    const brands = this.vehicles.map((v) => v.marca);
    return [...new Set(brands)].sort();
  }

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  async loadVehicles(): Promise<void> {
    try {
      this.loading = true;
      this.vehicleService.getAllVehicles().subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
          this.applyFilters();
        },
        error: (error) => {
          console.error('Erro ao carregar veículos:', error);
          this.snackBar.open('Erro ao carregar veículos', 'Fechar', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        },
        complete: () => {
          this.loading = false;
        },
      });
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
      this.snackBar.open('Erro ao carregar veículos', 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      this.loading = false;
    }
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredVehicles = this.vehicles.filter((vehicle) => {
      // Filtro por texto (busca em marca, modelo e placa)
      const searchMatch =
        !this.searchTerm ||
        vehicle.marca.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        vehicle.placa.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtro por tipo
      const typeMatch =
        !this.selectedType || vehicle.tipo === this.selectedType;

      // Filtro por marca
      const brandMatch =
        !this.selectedBrand || vehicle.marca === this.selectedBrand;

      return searchMatch && typeMatch && brandMatch;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedBrand = '';
    this.applyFilters();
  }

  viewVehicle(vehicle: Vehicle): void {
    this.router.navigate(['/vehicles', vehicle.id]);
  }

  async deleteVehicle(vehicle: Vehicle): Promise<void> {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o veículo ${vehicle.marca} ${vehicle.modelo} (${vehicle.placa})?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      },
    });

    const result = await confirmDialog.afterClosed().toPromise();
    if (result) {
      try {
        this.vehicleService.deleteVehicle(vehicle.id).subscribe({
          next: () => {
            this.snackBar.open('Veículo excluído com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            this.loadVehicles();
          },
          error: (error) => {
            console.error('Erro ao excluir veículo:', error);
            this.snackBar.open('Erro ao excluir veículo', 'Fechar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          },
        });
      } catch (error) {
        console.error('Erro ao excluir veículo:', error);
        this.snackBar.open('Erro ao excluir veículo', 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      }
    }
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
    const colors: { [key: string]: string } = {
      BRANCO: '#ffffff',
      PRETO: '#000000',
      PRATA: '#c0c0c0',
      CINZA: '#808080',
      VERMELHO: '#ff0000',
      AZUL: '#0000ff',
      VERDE: '#008000',
      AMARELO: '#ffff00',
      LARANJA: '#ffa500',
      ROXO: '#800080',
      MARROM: '#a52a2a',
      ROSA: '#ffc0cb',
    };
    return colors[color.toUpperCase()] || '#cccccc';
  }
}

// Componente de diálogo de confirmação
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">{{ data.cancelText }}</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">
        {{ data.confirmText }}
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

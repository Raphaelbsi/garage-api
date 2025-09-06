import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Vehicle,
  CreateVehicleRequest,
  UpdateVehicleRequest,
} from '../models/vehicle.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly apiUrl = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getVehicleById(id: string): Observable<Vehicle> {
    return this.http
      .get<Vehicle>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createVehicle(vehicle: CreateVehicleRequest): Observable<Vehicle> {
    return this.http
      .post<Vehicle>(this.apiUrl, vehicle)
      .pipe(catchError(this.handleError));
  }

  updateVehicle(
    id: string,
    vehicle: UpdateVehicleRequest,
  ): Observable<Vehicle> {
    return this.http
      .patch<Vehicle>(`${this.apiUrl}/${id}`, vehicle)
      .pipe(catchError(this.handleError));
  }

  deleteVehicle(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
      }
    }

    console.error('Erro no serviço de veículos:', error);
    return throwError(() => errorMessage);
  }
}

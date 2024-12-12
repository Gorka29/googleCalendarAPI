// src/app/services/appointments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  id?: number;
  name: string;
  description: string;
  startdate: string;
  enddate: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private apiUrl = 'https://googleCalendarAPI.vercel.app/api/appointments';

  constructor(private http: HttpClient) {}

  // Obtener todas las citas
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  // Crear una nueva cita
  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }
}

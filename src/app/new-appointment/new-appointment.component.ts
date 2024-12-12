import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { loginRequest } from '../msal.config';
import { CommonModule, DatePipe } from '@angular/common';
import { InteractionRequiredAuthError } from '@azure/msal-browser';


@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {
  events: any[] = [];
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: MsalService, private http: HttpClient) {
    this.checkAccount();
  }

  checkAccount() {
    const account = this.authService.instance.getActiveAccount();
    if (account) {
      this.isLoggedIn = true;
      this.userName = account.name || account.username || '';
    } else {
      this.isLoggedIn = false;
      this.userName = '';
    }
  }

  signIn() {
    console.log('Redirigiendo al inicio de sesión...');
    this.authService.loginRedirect();
  }

  signOut() {
    console.log('Redirigiendo al cierre de sesión...');
    this.authService.logoutRedirect();
  }

  getCalendarEvents() {
    const activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount) {
      console.log('No hay una cuenta activa. Debes iniciar sesión primero.');
      return;
    }

    const tokenRequest = {
      scopes: ['https://graph.microsoft.com/Calendars.Read'],
      account: activeAccount,
    };

    this.authService.acquireTokenSilent(tokenRequest).subscribe({
      next: (response) => {
        const token = response.accessToken;
        console.log('Token obtenido:', token);
        this.fetchEvents(token);
      },
      error: (err) => {
        console.error('Error al obtener el token de forma silenciosa:', err);

        if (err instanceof InteractionRequiredAuthError) {
          // Reintentar la autenticaci��n con loginPopup como fallback
          this.authService.loginPopup(tokenRequest).subscribe({
            next: (popupResponse) => {
              const token = popupResponse.accessToken;
              console.log('Token obtenido con loginPopup:', token);
              this.fetchEvents(token);
            },
            error: (popupErr) =>
              console.error('Error al obtener el token con loginPopup:', popupErr),
          });
        }
      },
    });
  }

  fetchEvents(token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    console.log('Iniciando fetchEvents con token:', token.substring(0, 10) + '...');

    this.http
      .get<{value: any[]}>('https://graph.microsoft.com/v1.0/me/calendar/events', { headers })
      .subscribe({
        next: (response) => {
          console.log('Respuesta completa:', response);
          if (response.value.length === 0) {
            console.log('No se encontraron eventos en el calendario');
          }
          this.events = response.value.map(event => ({
            ...event,
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime)
          }));
          console.log('Eventos procesados:', this.events);
        },
        error: (err) => {
          console.error('Error al obtener eventos:', err);
          console.error('Detalles del error:', {
            status: err.status,
            message: err.message,
            error: err.error
          });
          this.events = [];
        },
      });
  }
}

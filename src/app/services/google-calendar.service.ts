import { Injectable } from '@angular/core';

declare const google: any; // Para Google Identity Services

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private CLIENT_ID = '776163066585-8lkr6dr5rgm1ick3p6i5cqcu4b5l6bbq.apps.googleusercontent.com';
  private token: string = '';

  constructor() {}

  initializeGoogleAuth() {
    try {
      google.accounts.id.initialize({
        client_id: this.CLIENT_ID,
        callback: (response: any) => {
          console.log('Token recibido:', response.credential);
        },
      });
      console.log('Inicialización de Google Auth completada con éxito');
    } catch (error) {
      console.error('Error al inicializar Google Auth:', error);
    }

    // Muestra el popup
    google.accounts.id.prompt();
  }
}

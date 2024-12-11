import { Injectable } from '@angular/core';

declare const google: any; // Para Google Identity Services

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private CLIENT_ID = '776163066585-hk0eirmivm5865kcbn3s19a15ugsj6ro.apps.googleusercontent.com';
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

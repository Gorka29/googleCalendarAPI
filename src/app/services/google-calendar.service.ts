import { Injectable } from '@angular/core';

declare const google: any; // Para Google Identity Services

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private CLIENT_ID = '776163066585-8lkr6dr5rgm1ick3p6i5cqcu4b5l6bbq.apps.googleusercontent.com';
  private token: string = '';

  constructor() {}

  initializeGoogleAuth(callback: (token: string) => void): void {
    google.accounts.id.initialize({
      client_id: this.CLIENT_ID,
      callback: (response: any) => {
        this.token = response.credential;
        console.log('Token obtenido:', this.token);
        callback(this.token);
      },
    });

    google.accounts.id.prompt(); // Lanza el diálogo de autenticación
  }
}

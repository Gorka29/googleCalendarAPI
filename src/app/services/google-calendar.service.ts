import { Injectable } from '@angular/core';
import { loadGapiInsideDOM } from 'gapi-script';

declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (params: any) => Promise<void>;
        load: (api: string, version: string) => Promise<void>;
        request: (params: { path: string; method: string; body?: any }) => Promise<any>;
      };
      auth2: {
        init: (params: { client_id: string }) => Promise<any>;
        getAuthInstance: () => any;
      };
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private CLIENT_ID = '776163066585-8lkr6dr5rgm1ick3p6i5cqcu4b5l6bbq.apps.googleusercontent.com';
  private API_KEY = 'TU_API_KEY';
  private DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  private SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  constructor() {}

  async initGoogleAuth() {
    await loadGapiInsideDOM();
    return new Promise<void>((resolve, reject) => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client
          .init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES,
          })
          .then(() => resolve())
          .catch((error: any) => reject(error));
      });
    });
  }

  async signIn() {
    try {
      await new Promise<void>((resolve, reject) => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2
            .init({
              client_id: this.CLIENT_ID,
            })
            .then(() => resolve())
            .catch((err: any) => reject(err));
        });
      });

      const authInstance = window.gapi.auth2.getAuthInstance();
      return authInstance.signIn();
    } catch (error) {
      console.error('Error en signIn:', error);
    }
  }

  async initializeGapi() {
    return new Promise<void>((resolve, reject) => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2
          .init({
            client_id: this.CLIENT_ID,
          })
          .then(() => resolve())
          .catch((err: any) => reject(err));
      });
    });
  }

  async addEvent(event: any) {
    try {
      await window.gapi.client.load('calendar', 'v3');
      console.log('Google Calendar API cargada correctamente');

      const response = await window.gapi.client.request({
        path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        method: 'POST',
        body: event,
      });

      console.log('Evento creado:', response);
      return response;
    } catch (error) {
      console.error('Error al añadir el evento:', error);
      return null;
    }
  }
}

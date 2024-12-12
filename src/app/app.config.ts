import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MsalService, MsalGuard, MsalBroadcastService, MSAL_INSTANCE } from '@azure/msal-angular';
import { PublicClientApplication, Configuration } from '@azure/msal-browser';
import { routes } from './app.routes';

// Configuración de MSAL
const msalConfig: Configuration = {
  auth: {
    clientId: 'e17f8d3b-94c8-4e4c-84af-ee59ef8c747a', // Reemplaza con tu Client ID
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:4200',
  },
};

// Factory para MSAL_INSTANCE
export function MSALInstanceFactory(): PublicClientApplication {
  const instance = new PublicClientApplication(msalConfig);
  instance.initialize(); // Asegúrate de inicializar MSAL
  return instance;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};

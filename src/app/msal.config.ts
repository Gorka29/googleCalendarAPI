import { Configuration, PublicClientApplication } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'e17f8d3b-94c8-4e4c-84af-ee59ef8c747a',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:4200', // URI configurada en Azure
  },
};

export const loginRequest = {
  scopes: ['User.Read', 'Calendars.ReadWrite'], // Permisos configurados
};

export const msalInstance = new PublicClientApplication(msalConfig);

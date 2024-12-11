import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleCalendarService } from '../services/google-calendar.service';
import { CommonModule } from '@angular/common';

declare var createGoogleEvent: any;

// Declara la función global
declare global {
  interface Window {
    gapiLoaded: () => void;
    gisLoaded: () => void;
    createGoogleEvent: (eventDetails: any) => void;
  }
}

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {

  eventForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private googleCalendarService: GoogleCalendarService
  ) {
    this.eventForm = this.fb.group({
      summary: [''],
      description: [''],
      start: [''],
      end: [''],
    });
  }

  async addEvent() {
    this.successMessage = '';
    this.errorMessage = '';

    const formValues = this.eventForm.value;
    const event = {
      summary: formValues.summary,
      description: formValues.description,
      start: {
        dateTime: new Date(formValues.start).toISOString(),
        timeZone: 'Europe/Madrid',
      },
      end: {
        dateTime: new Date(formValues.end).toISOString(),
        timeZone: 'Europe/Madrid',
      },
    };

    try {
      await this.googleCalendarService.initGoogleAuth();
      await this.googleCalendarService.signIn();
      const response = await this.googleCalendarService.addEvent(event);
      console.log('Evento creado:', response);
      this.successMessage = `Evento creado: ${response.summary}`;
    } catch (error: any) {
      console.error('Error al crear el evento:', error);
      this.errorMessage = `Error al crear el evento: ${error.message}`;
    }
  }

}

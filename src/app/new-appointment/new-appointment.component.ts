import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleCalendarService } from '../services/google-calendar.service';

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
  imports: [ReactiveFormsModule],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {

  eventForm: FormGroup;

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
    const formValues = this.eventForm.value;
    const event = {
      summary: formValues.summary,
      description: formValues.description,
      start: {
        dateTime: new Date(formValues.start).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(formValues.end).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
    };

    try {
      await this.googleCalendarService.initGoogleAuth();
      await this.googleCalendarService.signIn();
      const response = await this.googleCalendarService.addEvent(event);
      console.log('Evento creado:', response);
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  }

}

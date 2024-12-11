import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleCalendarService } from '../services/google-calendar.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {

  events: any[] = [];

  constructor(private googleService: GoogleCalendarService) {}

  connectToGoogle() {
    this.googleService.initializeGoogleAuth();
  }

}

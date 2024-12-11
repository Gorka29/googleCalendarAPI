import { Component } from '@angular/core';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NewAppointmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'googleCalendarAPI';
}

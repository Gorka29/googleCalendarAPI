import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewAppointmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'googleCalendarAPI';
}

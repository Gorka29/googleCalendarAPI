import { Component } from '@angular/core';
import { AppointmentListComponent } from "./appointment-list/appointment-list.component";
import { NewAppointmentComponent } from "./new-appointment/new-appointment.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppointmentListComponent, NewAppointmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

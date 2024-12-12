import { Component } from '@angular/core';
import { Appointment, AppointmentsService } from '../services/appointments.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent {

  appointments: Appointment[] = [];
  newAppointment: Appointment = { name: '', description: '', startdate: '', enddate: '' };

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentsService.getAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }

  addAppointment() {
    this.appointmentsService.createAppointment(this.newAppointment).subscribe((appointment) => {
      this.appointments.push(appointment);
      this.newAppointment = { name: '', description: '', startdate: '', enddate: '' };
    });
  }

}

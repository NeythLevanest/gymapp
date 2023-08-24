import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';
import { TimeSlot } from 'src/app/models/timeSlots';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(300, style({ opacity: 0 }))),
    ]),
  ],
})
export class CalendarComponent {
  days: Date[] = [];
  timeSlots: TimeSlot[] = [
    new TimeSlot('08:00 AM', '09:00 AM'),
    new TimeSlot('09:00 AM', '10:00 AM'),
    new TimeSlot('10:00 AM', '11:00 AM'),
    new TimeSlot('11:00 AM', '12:00 PM'),
    new TimeSlot('12:00 PM', '01:00 PM'),
    new TimeSlot('01:00 PM', '02:00 PM'),
    new TimeSlot('02:00 PM', '03:00 PM'),
    new TimeSlot('03:00 PM', '04:00 PM'),
    new TimeSlot('04:00 PM', '05:00 PM'),
  ];

  reservations: { [key: string]: TimeSlot[] } = {};
  currentWeekStart: Date;

  constructor() {
    this.currentWeekStart = new Date();
    this.currentWeekStart.setHours(0, 0, 0, 0);
    this.updateWeek();
  }

    previousWeek(): void {
      this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
      this.updateWeek();
    }

    nextWeek(): void {
      this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
      this.updateWeek();
    }

  updateWeek(): void {
    this.days = [];
    const startDate = new Date(this.currentWeekStart);
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      this.days.push(date);
    }
  }

  isReserved(day: Date, timeSlot: TimeSlot): boolean {
    const key = this.formatDate(day);
    return this.reservations[key]?.some(slot => this.areTimeSlotsEqual(slot, timeSlot)) || false;
  }

  // reserveSlot(day: Date, timeSlot: TimeSlot): void {
  //   const key = this.formatDate(day);
  //   if (!this.reservations[key]) {
  //     this.reservations[key] = [];
  //   }

  //   const existingSlotIndex = this.reservations[key].findIndex(slot => this.areTimeSlotsEqual(slot, timeSlot));

  //   if (existingSlotIndex === -1) {
  //     this.reservations[key].push(timeSlot);
  //   } else {
  //     this.reservations[key].splice(existingSlotIndex, 1);
  //   }
  // }
  reserveSlot(day: Date, timeSlot: TimeSlot): void {
    const key = this.formatDate(day);
    const reservationsForDay = this.reservations[key] || [];

    if (reservationsForDay.length < 4 && !this.isReserved(day, timeSlot)) {
      reservationsForDay.push(timeSlot);
      this.reservations[key] = reservationsForDay;
    } else if (this.isReserved(day, timeSlot)) {
      const updatedReservations = reservationsForDay.filter(reservation => !this.areTimeSlotsEqual(reservation, timeSlot));
      this.reservations[key] = updatedReservations;
    }
  }

  getReservationCount(day: Date): number {
    const key = this.formatDate(day);
    const slotReservations = this.reservations[key] || [];
    return slotReservations.length;
  }

  

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private areTimeSlotsEqual(slot1: TimeSlot, slot2: TimeSlot): boolean {
    return slot1.startTime === slot2.startTime && slot1.endTime === slot2.endTime;
  }

 
}

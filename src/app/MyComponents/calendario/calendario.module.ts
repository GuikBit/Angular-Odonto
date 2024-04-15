import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';



@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    TagModule,
    BadgeModule
  ],
  exports: [
    CalendarioComponent
  ]
})
export class CalendarioModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AdminMainComponent } from './admin-main/admin-main.component'
import { CalendarModule } from 'primeng/calendar';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { MenuModule } from 'primeng/menu';


@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminTemplateComponent,
    AdminMainComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    MenuModule
  ],
  exports:[
    AdminMenuComponent,
    AdminTemplateComponent,
    AdminMainComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AdminModule { }

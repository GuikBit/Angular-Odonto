import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AdminMainComponent } from './admin-main/admin-main.component';



@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule
  ],
  exports:[


  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AdminModule { }

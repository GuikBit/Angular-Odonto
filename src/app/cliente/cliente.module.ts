// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteInfoComponent } from './cliente-info/cliente-info.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenubarModule } from 'primeng/menubar';
import {MatIconModule} from '@angular/material/icon';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
  declarations: [
    // ClienteInfoComponent,
    // ClienteListComponent,
    ClienteEditComponent,
    // ClienteNovoComponent
  ],
  imports: [
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    DialogModule,
    CalendarModule,
    AccordionModule,
    DividerModule,
    TabViewModule,
    SpeedDialModule,
    MenubarModule,
    MatIconModule,
    FileUploadModule
  ],
  exports: [
    // ClienteInfoComponent,
    // ClienteListComponent,
    ClienteEditComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ClienteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { ChartModule } from 'primeng/chart';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TabViewModule } from 'primeng/tabview';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaModule } from '../../consulta/consulta.module';
import { CalendarioModule } from '../../MyComponents/calendario/calendario.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DentistaListarComponent } from './dentista-listar.component';
import { DentistaNovoComponent } from 'src/app/dentista/dentista-novo/dentista-novo.component';
import { DentistaModule } from 'src/app/dentista/dentista.module';




@NgModule({
  declarations: [
    DentistaListarComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    CalendarioModule,
    CardModule,
    ColorPickerModule,
    TabViewModule,
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
    AvatarModule,
    ImageModule,
    ChipModule,
    ChartModule,
    FieldsetModule,
    TagModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    ConsultaModule
    
  ],exports: [
    DentistaListarComponent
  ]
})
export class DentistaListarModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentistaNovoComponent } from './dentista-novo/dentista-novo.component';
import { DentistaInfoComponent } from './dentista-info/dentista-info.component';
import { DentistaListComponent } from './dentista-list/dentista-list.component';
import { DentistaRoutingModule } from './dentista-routing.module';
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
import { StepperModule } from 'primeng/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaListComponent } from '../consulta/consulta-list/consulta-list.component';
import { DentistaEditComponent } from './dentista-edit/dentista-edit.component';
import { ConsultaNovaComponent } from '../consulta/consulta-nova/consulta-nova.component';
import { ConsultaInfoComponent } from '../consulta/consulta-info/consulta-info.component';
import { ConsultaModule } from '../consulta/consulta.module';
import { CalendarioModule } from '../MyComponents/calendario/calendario.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DentistaListarModule } from '../MyComponents/dentista-listar/dentista-listar.module';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';


@NgModule({
  declarations: [
    DentistaNovoComponent,
    DentistaInfoComponent,
    DentistaListComponent,
    DentistaEditComponent,
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
    PasswordModule,
    FloatLabelModule,
    InputMaskModule,
    InputSwitchModule,
    StepperModule,
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
    ConsultaModule,
    DentistaListarModule
  ],exports: [
    DentistaNovoComponent,
    DentistaInfoComponent,
    DentistaListComponent,
    DentistaEditComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DentistaModule { }

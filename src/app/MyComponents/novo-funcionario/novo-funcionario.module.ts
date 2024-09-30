import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NovoFuncionarioComponent } from './novo-funcionario.component';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [
    NovoFuncionarioComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    MenuModule,
    ImageModule,
    InputSwitchModule,
    TabViewModule,
    SidebarModule,
    BreadcrumbModule,
    RouterModule,
    FloatLabelModule,
    TableModule,
    InputTextModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextareaModule
  ],
  exports: [
    NovoFuncionarioComponent
  ]
})


export class NovoFuncionarioModule { }

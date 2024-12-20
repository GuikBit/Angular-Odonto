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
import { StepperModule } from 'primeng/stepper';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { ListFuncionarioComponent } from '../list-funcionario/list-funcionario.component';
import { TagModule } from 'primeng/tag';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';



@NgModule({
  declarations: [
    NovoFuncionarioComponent,
    ListFuncionarioComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    MenuModule,
    ImageModule,
    StepperModule,
    InputIconModule,
    CheckboxModule,
    IconFieldModule,
    AvatarModule,
    InputSwitchModule,
    TabViewModule,
    SidebarModule,
    InputNumberModule,
    BreadcrumbModule,
    RouterModule,
    FloatLabelModule,
    DividerModule,
    TableModule,
    InputTextModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextareaModule,
    TagModule,
    PasswordModule,
  ],
  exports: [
    NovoFuncionarioComponent,
    ListFuncionarioComponent
  ]
})


export class NovoFuncionarioModule { }

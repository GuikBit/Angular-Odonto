import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasPagarComponent } from './contas-pagar.component';
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


@NgModule({
  declarations: [
    ContasPagarComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    MenuModule,
    SidebarModule,
    BreadcrumbModule,
    RouterModule,
    TableModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextareaModule
  ],
  exports: [
    ContasPagarComponent
  ]
})


export class ConstasPagarModule { }

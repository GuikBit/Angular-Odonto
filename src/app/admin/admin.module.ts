import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { AdminFinanceiroComponent } from './admin-financeiro/admin-financeiro.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ConstasPagarModule } from '../MyComponents/contas-pagar/constas-pagar.module';

@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminFinanceiroComponent
  ],
  imports: [
    CommonModule,
    ConstasPagarModule,
    CalendarModule,
    MenuModule,
    SidebarModule,
    BreadcrumbModule,
    RouterModule,
    TableModule,
    InputTextModule
  ],
  exports:[
    AdminMenuComponent,
    AdminFinanceiroComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AdminModule { }

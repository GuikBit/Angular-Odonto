import { AdminConfiguracoesComponent } from './admin-configuracoes/admin-configuracoes.component';
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
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { AdminConsultaComponent } from './admin-consulta/admin-consulta.component';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminFinanceiroComponent,
    AdminConfiguracoesComponent,
    AdminConsultaComponent
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
    InputTextModule,
    DividerModule,
    TabViewModule,
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextareaModule,
    ConfirmDialogModule,
  ],
  exports:[
    AdminMenuComponent,
    AdminFinanceiroComponent,
    AdminConfiguracoesComponent,
    AdminConsultaComponent
  ],
  providers:[
    ConfirmationService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AdminModule { }

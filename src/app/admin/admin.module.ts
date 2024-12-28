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
import { AdminDentistaComponent } from './admin-dentista/admin-dentista.component';
import { StepperModule } from 'primeng/stepper';
import { MenubarModule } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { ConstasPagarModule } from '../MyComponents/contas-pagar/constas-pagar.module';
import { NovoFuncionarioModule } from '../MyComponents/novo-funcionario/novo-funcionario.module';
import { DentistaModule } from "../dentista/dentista.module";
import { NovoCargoModule } from "../MyComponents/novo-cargo/novo-cargo.module";
import { AdminPontoComponent } from './admin-ponto/admin-ponto.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DentistaListarModule } from "../MyComponents/dentista-listar/dentista-listar.module";
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { NovoPontoComponent } from '../MyComponents/novo-ponto/novo-ponto.component';
@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminFinanceiroComponent,
    AdminConfiguracoesComponent,
    AdminConsultaComponent,
    AdminDentistaComponent,
    AdminPontoComponent,
    NovoPontoComponent
  ],
  imports: [
    CommonModule,
    ConstasPagarModule,
    NovoFuncionarioModule,
    CalendarModule,
    ImageModule,
    MenubarModule,
    AvatarModule,
    TagModule,
    AvatarGroupModule,
    MenuModule,
    SidebarModule,
    SelectButtonModule,
    BreadcrumbModule,
    RouterModule,
    TableModule,
    RippleModule,
    InputTextModule,
    DividerModule,
    TabViewModule,
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule,
    CheckboxModule,
    DialogModule,
    InputTextareaModule,
    ConfirmDialogModule,
    StepperModule,
    ConstasPagarModule,
    ConstasPagarModule,
    NovoCargoModule,
    DentistaListarModule,
    DentistaModule
],
  exports:[
    AdminMenuComponent,
    AdminFinanceiroComponent,
    AdminConfiguracoesComponent,
    AdminConsultaComponent,
    AdminDentistaComponent,
    AdminPontoComponent
  ],
  providers:[
    ConfirmationService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AdminModule { }

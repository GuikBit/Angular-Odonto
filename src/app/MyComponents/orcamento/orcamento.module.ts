
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoOrcamentoComponent } from './novo-orcamento/novo-orcamento.component';
import { TagModule } from 'primeng/tag';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { StepperModule } from 'primeng/stepper';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { EditorModule } from 'primeng/editor';
import { PagamentoInfoComponent } from 'src/app/consulta/pagamento-info/pagamento-info.component';
import { ConsultaModule } from 'src/app/consulta/consulta.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
@NgModule({
  declarations: [
    NovoOrcamentoComponent,
    DragDropComponent,
  ],
  imports: [
    FloatLabelModule,
    InputNumberModule,
    ConsultaModule,
    CommonModule,
    DragDropModule,
    StepperModule,
    TableModule,
    TagModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    DividerModule,
    TooltipModule,
    SidebarModule,
    FormsModule,
    EditorModule
  ], exports:[
    NovoOrcamentoComponent,
    DragDropComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OrcamentoModule { }

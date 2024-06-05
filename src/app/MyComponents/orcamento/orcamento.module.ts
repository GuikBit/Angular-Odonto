
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    NovoOrcamentoComponent,
    DragDropComponent
  ],
  imports: [
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
  ]
})
export class OrcamentoModule { }

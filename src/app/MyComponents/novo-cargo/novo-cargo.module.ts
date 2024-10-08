import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoCargoComponent } from './novo-cargo.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ListCargoComponent } from '../list-cargo/list-cargo.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';



@NgModule({
  declarations: [
    NovoCargoComponent,
    ListCargoComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    TagModule
  ],
  exports: [
    NovoCargoComponent,
    ListCargoComponent
  ]
})
export class NovoCargoModule { }

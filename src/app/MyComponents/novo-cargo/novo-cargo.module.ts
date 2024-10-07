import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoCargoComponent } from './novo-cargo.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    NovoCargoComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    InputTextareaModule,
    ButtonModule
  ],
  exports: [
    NovoCargoComponent
  ]
})
export class NovoCargoModule { }

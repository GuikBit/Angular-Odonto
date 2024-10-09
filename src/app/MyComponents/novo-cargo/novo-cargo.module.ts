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
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';


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
    TagModule,
    DialogModule,
    TooltipModule,
    InputMaskModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule
  ],
  exports: [
    NovoCargoComponent,
    ListCargoComponent
  ]
})
export class NovoCargoModule { }

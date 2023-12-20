import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentistaNovoComponent } from './dentista-novo/dentista-novo.component';
import { DentistaInfoComponent } from './dentista-info/dentista-info.component';
import { DentistaListComponent } from './dentista-list/dentista-list.component';
import { DentistaRoutingModule } from './dentista-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaListComponent } from '../consulta/consulta-list/consulta-list.component';
import { DentistaEditComponent } from './dentista-edit/dentista-edit.component';



@NgModule({
  declarations: [
    DentistaNovoComponent,
    DentistaInfoComponent,
    DentistaListComponent,
    DentistaEditComponent
  ],
  imports: [
    // CommonModule,
    // DentistaRoutingModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatIconModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatCardModule,
    // MatTableModule,
    // MatSortModule,
    // MatPaginatorModule,
    // MatBottomSheetModule,
    // MatTableModule,
    // MatFormFieldModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatCardModule,
    // MatTableModule,
    // MatSortModule,
    // MatPaginatorModule,
    // MatIconModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatTableModule,
    // MatSortModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatTreeModule,
    // OverlayModule,
    // MatFormFieldModule,
    // PortalModule,
    // ScrollingModule,
    // DialogModule,
    // ReactiveFormsModule,
    // FormsModule
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
  ],exports: [
    DentistaNovoComponent,
    DentistaInfoComponent,
    DentistaListComponent,
    DentistaEditComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DentistaModule { }

// import { ToolbarModule } from 'primeng/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'

// import { ClientesService } from './clientes.service';
// import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';
// import { ServicoPrestadoService } from './servico-prestado.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteModule } from './cliente/cliente.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkListboxModule} from '@angular/cdk/listbox';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
// import {MatButtonModule} from '@angular/material/button';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
// import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkMenuModule} from '@angular/cdk/menu';
import {DialogModule} from '@angular/cdk/dialog';
// import { DentistaListComponent } from './dentista/dentista-list/dentista-list.component';
// import { ConsultaListComponent } from './consulta/consulta-list/consulta-list.component';
import { DentistaModule } from './dentista/dentista.module';
import { ConsultaModule } from './consulta/consulta.module';
import { CustomSnackbarComponent } from './util/custom-snackbar/custom-snackbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Cliente } from './cliente/cliente';
import { ClienteNovoComponent } from './cliente/cliente-novo/cliente-novo.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ConsultaListComponent } from './consulta/consulta-list/consulta-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    CustomSnackbarComponent,
    ClienteNovoComponent,
    ClienteListComponent,
    // ConsultaListComponent
  ],
  imports: [
    ButtonModule,
    ToastModule,
    //ToolbarModule,
    InputTextModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClienteModule,
    DentistaModule,
    ConsultaModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    MatFormFieldModule,
    MatIconModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkListboxModule,
    CdkMenuModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    // MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    DialogModule,
    InputTextModule,
    MatFormFieldModule,
    // MatInputModule
    CardModule,
    ChartModule
  ],
  providers: [
  //  ClientesService,
  //  ServicoPrestadoService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MessageService,

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

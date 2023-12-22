import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DentistaListComponent } from './dentista/dentista-list/dentista-list.component';
import { ConsultaListComponent } from './consulta/consulta-list/consulta-list.component';
import { ClienteNovoComponent } from './cliente/cliente-novo/cliente-novo.component';
import { ClienteInfoComponent } from './cliente/cliente-info/cliente-info.component';
import { ClienteEditComponent } from './cliente/cliente-edit/cliente-edit.component';
import { ConsultaNovaComponent } from './consulta/consulta-nova/consulta-nova.component';
import { ConsultaInfoComponent } from './consulta/consulta-info/consulta-info.component';
import { ConsultaEditComponent } from './consulta/consulta-edit/consulta-edit.component';
import { DentistaNovoComponent } from './dentista/dentista-novo/dentista-novo.component';
import { DentistaInfoComponent } from './dentista/dentista-info/dentista-info.component';
import { DentistaEditComponent } from './dentista/dentista-edit/dentista-edit.component';



const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: '', component: LayoutComponent, children:[
    //home
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

    //cliente
    {path: 'clientes', component: ClienteListComponent, canActivate: [AuthGuard]},
    {path: 'clientes/novo', component: ClienteNovoComponent, canActivate: [AuthGuard]},
    {path: 'clientes/info/:id', component: ClienteInfoComponent, canActivate: [AuthGuard]},
    {path: 'clientes/edit/:id', component: ClienteEditComponent, canActivate: [AuthGuard]},

    //dentista
    {path: 'dentistas', component: DentistaListComponent, canActivate: [AuthGuard]},
    {path: 'dentistas/novo', component: DentistaNovoComponent, canActivate: [AuthGuard]},
    {path: 'dentistas/info/:id', component: DentistaInfoComponent, canActivate: [AuthGuard]},
    {path: 'dentistas/edit/:id', component: DentistaEditComponent, canActivate: [AuthGuard]},

    //consulta
    {path: 'consultas', component: ConsultaListComponent, canActivate: [AuthGuard]},
    {path: 'consultas/nova', component: ConsultaNovaComponent, canActivate: [AuthGuard]},
    {path: 'consultas/info/:id', component: ConsultaInfoComponent, canActivate: [AuthGuard]},
    {path: 'consultas/edit/:id', component: ConsultaEditComponent, canActivate: [AuthGuard]},
    //{path: 'relatorio', component: RelatorioComponent, canActivate: [AuthGuard]},

    {path: '', redirectTo: 'home', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

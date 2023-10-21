import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DentistaListComponent } from './dentista/dentista-list/dentista-list.component';
import { ConsultaListComponent } from './consulta/consulta-list/consulta-list.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: '', component: LayoutComponent, children:[
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'clientes', component: ClienteListComponent, canActivate: [AuthGuard]},
    {path: 'dentistas', component: DentistaListComponent, canActivate: [AuthGuard]},
    {path: 'consultas', component: ConsultaListComponent, canActivate: [AuthGuard]},
   //{path: 'relatorio', component: RelatorioComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { DentistaNovoComponent } from '../dentista/dentista-novo/dentista-novo.component';
import { DentistaInfoComponent } from '../dentista/dentista-info/dentista-info.component';
import { ClienteNovoComponent } from './cliente-novo/cliente-novo.component';
import { ClienteInfoComponent } from './cliente-info/cliente-info.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';



const routes: Routes = [
  {path: 'clientes', component: LayoutComponent,canActivate:[AuthGuard] , children:[
    {path: '', redirectTo:'/clientes/lista', pathMatch:'full'},
    {path: 'novo', component: ClienteNovoComponent},
    {path: 'info/:id', component: ClienteInfoComponent},
    {path: 'edit/:id', component: ClienteEditComponent}    
  ]} 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

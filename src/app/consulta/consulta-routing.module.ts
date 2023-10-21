import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';
import { ConsultaNovaComponent } from './consulta-nova/consulta-nova.component';
import { ConsultaInfoComponent } from './consulta-info/consulta-info.component';
import { ConsultaEditComponent } from './consulta-edit/consulta-edit.component';

const routes: Routes = [
  {path: 'consultas', component: LayoutComponent,canActivate:[AuthGuard] , children:[
    {path: '', redirectTo:'/consultas/lista', pathMatch:'full'},
    {path: 'novo', component: ConsultaNovaComponent},
    {path: 'info/:id', component: ConsultaInfoComponent},
    {path: 'edit/:id', component: ConsultaEditComponent}    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }

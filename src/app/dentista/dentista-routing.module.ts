import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';
import { DentistaNovoComponent } from './dentista-novo/dentista-novo.component';
import { DentistaInfoComponent } from './dentista-info/dentista-info.component';
import { DentistaEditComponent } from './dentista-edit/dentista-edit.component';

const routes: Routes = [
  {path: 'dentistas', component: LayoutComponent,canActivate:[AuthGuard] , children:[
    {path: '', redirectTo:'/dentistas/lista', pathMatch:'full'},
    {path: 'novo', component: DentistaNovoComponent},
    {path: 'info/:id', component: DentistaInfoComponent},
    {path: 'edit/:id', component: DentistaEditComponent}    
  ]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DentistaRoutingModule { }

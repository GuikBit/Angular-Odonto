import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent implements OnInit {

  items: MenuItem[];
  sidebarVisible: boolean = true;
  menu: MenuItem ;
  home: MenuItem | undefined;
  constructor(private router: Router){

  }
  ngOnInit(): void {
    this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

    this.home = { icon: 'pi pi-home', routerLink: '/admin' };
    this.menu = {}
  }
  setActiveItem(url: string): void {
    this.items.forEach(item => {
      item.styleClass = '';
      if (url.includes(item.routerLink)) {
        item.styleClass = 'active';
      }
    });
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }



  navegacaoRotas(rota: string){
    if(rota == ''){
      this.router.navigate(['/admin'])
    }else{
      this.router.navigate(['/admin/' + rota])
    }

  }
  delete(){

  }
}

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

  constructor(private router: Router){
    this.items = [
      {
          label:"Configurações",
          items: [
            {
              label: 'Sistema',
              icon: 'pi pi-fw pi-list',
              routerLink: '/configuracoes/paciente',
              routerLinkActive: 'menuAtivo'
            },
            {
              label: 'Ações',
              icon:'pi pi-fw pi-wrench',
              routerLink: ''
            },
            {
              label: 'Especialidade',
              icon: 'pi pi-pw pi-plus',
              command: ()=>{

              }
            }
        ],
      },

      {
          label:"Financeiro",
          icon: 'pi pi-fw pi-dollar',
          items:[
            {
              label: 'Entradas',
              icon: 'pi pi-pw pi-arrow-right',
              command: ()=>{

              }
            },
            {
              label: 'Saidas',
              icon:'pi pi-fw pi-arrow-left',
            },

            {
              label: 'Export',
              icon: 'pi pi-fw pi-external-link'
            }
          ],
      },
      {
        icon: 'pi pi-fw pi-file-export',
        label:"Relatórios",
        items: [
          {
            label: 'Atestado',
            icon: 'pi pi-fw pi-file-word'
          },
          {
            label: 'Pedido exame',
            icon: 'pi pi-fw pi-file-word'
          },

          {
            label: 'Outros',
            icon: 'pi pi-fw pi-file-pdf'
          }
        ],
      }
    ];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveItem(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit(): void {

  }
  setActiveItem(url: string): void {
    this.items.forEach(item => {
      item.styleClass = '';
      if (url.includes(item.routerLink)) {
        item.styleClass = 'active';
      }
    });
  }




  delete(){

  }
}

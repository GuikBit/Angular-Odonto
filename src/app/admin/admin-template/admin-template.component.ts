import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { ActivatedRoute } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    DividerModule,
    BadgeModule,
    MenubarModule
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.items = [
      {
          icon:'pi pi-fw pi-user',
          label:"Informações",
          items: [
            {
              label: 'Consultar',
              icon: 'pi pi-fw pi-list',
              command: () => {

              },
              routerLink: '/areaAdmin/paciente'
            },
            {
              label: 'Ações',
              icon:'pi pi-fw pi-wrench',
              items: [
                {
                  label: 'Editar',
                  icon: 'pi pi-fw pi-user-edit',
                  command: () => {


                  },
                },
                {
                  label: 'Salvar',
                  icon: 'pi pi-fw pi-save',
                  command: () => {


                  }
                },
                {
                  separator: true
                },
                {
                  label: 'Reativar Paciente',
                  icon: 'pi pi-fw pi-user-plus',
                  command: () => {


                  }
              },
                {
                    label: 'Inativar Paciente',
                    icon: 'pi pi-fw pi-user-minus',




                },
              ]
            },

            {
                separator: true
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-external-link'
            }
        ],
      },
      {
        label: 'Consultas',
        icon: 'pi pi-fw pi-briefcase',
        items:[
          {
            label: 'Consultar',
            icon: 'pi pi-pw pi-list',
            command: ()=>{

            }
          },
          {
            label: 'Nova',
            icon: 'pi pi-pw pi-plus',
            command: ()=>{

            }
          },

          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }

        ]
      },
      {
          label:"Pagamentos",
          icon: 'pi pi-fw pi-dollar',
          items:[
            {
              label: 'Consultar',
              icon: 'pi pi-pw pi-list',
              command: ()=>{

              }
            },
            {
              label: 'Novo',
              icon:'pi pi-fw pi-plus',
            },
            {
              separator: true
            },
            {
              label: 'Export',
              icon: 'pi pi-fw pi-external-link'
            }
          ],
      },
      {
        icon: 'pi pi-fw pi-file-export',
        label:"Relatorios",
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
            separator: true
          },
          {
            label: 'Outros',
            icon: 'pi pi-fw pi-file-pdf'
          }
        ],
    },
      {
          icon: 'pi pi-wrench',
          //label:"Inativar Paciente",

      },

  ];

  }

}

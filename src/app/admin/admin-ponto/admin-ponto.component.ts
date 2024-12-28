import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RegistroPonto, Status, TipoRegistro } from 'src/app/class/RegistroPonto';
import { RegistroPontoService } from 'src/app/services/registro-ponto.service';

@Component({
  selector: 'app-admin-ponto',
  templateUrl: './admin-ponto.component.html',
  styleUrl: './admin-ponto.component.css',
  styles: [
    `
    :host ::ng-deep {
        .p-paginator {

        }

        .p-progressbar {
            height: .5rem;
            background-color: #D8DADC;

            .p-progressbar-value {
                background-color: #607D8B;
            }
        }

        .table-header {
            display: flex;
            justify-content: space-between;
        }

        .p-calendar .p-datepicker {
            min-width: 25rem;

            td {
                font-weight: 400;
            }
        }

        .p-datatable.p-datatable-customers {
            .p-datatable-header {
                padding: 1rem;
                text-align: left;
                font-size: 1.5rem;
            }

            .p-paginator {
                padding: 1rem;
            }

            .p-datatable-thead > tr > th {
                text-align: left;
            }

            .p-datatable-tbody > tr > td {
                cursor: auto;
            }

            .p-dropdown-label:not(.p-placeholder) {
                text-transform: uppercase;
            }
        }

        .p-w-100 {
            width: 100%;
        }

        /* Responsive */
        .p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
            display: none;
        }
    }

    @media screen and (max-width: 960px) {
        :host ::ng-deep {
            .p-datatable {
                &.p-datatable-customers {
                    .p-datatable-thead > tr > th,
                    .p-datatable-tfoot > tr > td {
                        display: none !important;
                    }

                    .p-datatable-tbody > tr {
                        border-bottom: 1px solid var(--layer-2);

                        > td {
                            text-align: left;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            border: 0 none;

                            .p-column-title {
                                min-width: 30%;
                                display: inline-block;
                                font-weight: bold;
                            }

                            p-progressbar {
                                width: 100%;
                            }

                            &:last-child {
                                border-bottom: 1px solid var(--surface-d);
                            }
                        }
                    }
                }
            }
        }
    }
    `
    ],
})
export class AdminPontoComponent implements OnInit {

  modalJustificativa: boolean = false;
  selectedStatus: any;

  selectedPonto!: any;

  listaPontos: RegistroPonto[];

  formulario: FormBuilder;
  novoPonto: boolean = false;

  statuses: { label: string, value: string, status: boolean }[] = [
    { label: 'ativo', value: 'Ativo', status: true },
    { label: 'inativo', value: 'Inativo', status: false }
  ];

  userLogado: any;
  org: any;
  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private pontoService: RegistroPontoService) {
    if ((this.userLogado === undefined || this.userLogado === null) && (this.org === null || this.org === undefined)) {

      const userStorage = localStorage.getItem('userLogado');
      const orgStorage = localStorage.getItem('organizacao');

      if (userStorage && orgStorage) {
        this.userLogado = JSON.parse(userStorage);
        this.org = JSON.parse(orgStorage);
      }
    }
  }

  ngOnInit(){
    this.pontoService.getPontoEletronico(this.userLogado.organizacaoId).then((response)=>{
      if(response?.status === 200){
        this.listaPontos = response.data;
      }
    })
  }

  itemStatus(item: any){
    if(Status.Aprovado === item){
      return 'Aprovado';
    }else if(Status.Pendente === item){
      return 'Pendente';
    }else{
      return 'Rejeitado';
    }

  }

  itemRegistro(item: any){
    if(TipoRegistro.InicioExpediente === item){
      return 'Inicio Expediente';
    }else if(TipoRegistro.FimExpediente === item){
      return 'Fim Expediente';
    }else if(TipoRegistro.InicioAlmoco === item){
      return 'Inicio Almoço';
    }else if(TipoRegistro.FimAlmoco === item ){
      return 'Fim Almoço';
    }else if(TipoRegistro.InicioPausa === item){
      return 'Inicio Pausa';
    }else{
      return 'Fim Pausa';
    }
  }
  getIcon(status: number) {
    switch (status) {
        case 3:
            return 'pi pi-times';

        case 1:
            return 'pi pi-check';

        case 2:
            return 'pi pi-exclamation-triangle';

        default:
            return 'pi pi-info-circle';
    }
  }
  getSeverity(status: number) {
    switch (status) {
        case 3:
            return 'danger';

        case 1:
            return 'success';

        case 2:
            return 'warning';

        default:
            return 'info';
    }
}

itemControle(controle: string){
  switch (controle) {
    case 'A':
      return 'Automatico';
    default:
      return 'Manual';
  }

}

  onRowSelect(event: any) {
    console.log(event.data);
    this.modalJustificativa=true;
   // this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
  }

  onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
  }

  cadastroNovoPonto(){
    this.novoPonto = true;
  }

}

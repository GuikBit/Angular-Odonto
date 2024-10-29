import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrganizacaoService } from 'src/app/services/organizacao.service';

@Component({
  selector: 'app-list-funcionario',
  templateUrl: './list-funcionario.component.html',
  styleUrl: './list-funcionario.component.css'
})
export class ListFuncionarioComponent implements OnInit {

  novoFuncionario: boolean = false;
  listaFuncionarios: any[] = [];
  selectedStatus: any;
  statuses: { label: string, value: string, status: boolean }[] = [
    { label: 'ativo', value: 'Ativo', status: true },
    { label: 'inativo', value: 'Inativo', status: false }
  ];

  userLogado: any;
  org: any;


  constructor(private orgService: OrganizacaoService, private messageService: MessageService){
    if ((this.userLogado === undefined || this.userLogado === null) && (this.org === null || this.org === undefined)) {

      const userStorage = localStorage.getItem('userLogado');
      const orgStorage = localStorage.getItem('organizacao');

      if (userStorage && orgStorage) {
        this.userLogado = JSON.parse(userStorage);
        this.org = JSON.parse(orgStorage);
      }
    }
  }

  ngOnInit(): void {
    this.orgService.getOrgFuncionarios(this.org.id).then((response)=>{
      if(response?.status === 200){
        this.listaFuncionarios = response.data;
      }

    }).catch((error)=>{
      this.messageService.add({severity: 'error', summary: 'Erro!', detail: 'Houve um erro, na requisicao!'});
    })
  }

  info(id: any){

  }

  cadastroFunc(){
    this.novoFuncionario = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo } from 'src/app/class/Cargo';

@Component({
  selector: 'app-list-cargo',
  templateUrl: './list-cargo.component.html',
  styleUrl: './list-cargo.component.css'
})
export class ListCargoComponent implements OnInit{

  novoCargo: boolean = false;
  selectedStatus: any;
  
  listaCargo: Cargo[];
  statuses: { label: string, value: string, status: boolean }[] = [
    { label: 'ativo', value: 'Ativo', status: true },
    { label: 'inativo', value: 'Inativo', status: false }
  ];

  userLogado: any;
  org: any;


  constructor(private messageService: MessageService, private cargoService: CargoService){
    if ((this.userLogado === undefined || this.userLogado === null) && (this.org === null || this.org === undefined)) {

      const userStorage = localStorage.getItem('userLogado');
      const orgStorage = localStorage.getItem('organizacao');

      if (userStorage && orgStorage) {
        this.userLogado = JSON.parse(userStorage);
        this.org = JSON.parse(orgStorage);
      }
    }

    console.log(this.userLogado)
  }


  ngOnInit(): void {

    this.cargoService.getCargos(this.userLogado.organizacaoId).then((response)=>{
      if(response?.status === 200){
        this.listaCargo = response.data;
      }
    })

  }
  
  info(id: any){

  }


  cadastroCargo(){
    this.novoCargo = true;
  }


  closeModal(close: boolean) {
    this.novoCargo = close;
    this.ngOnInit();
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Novo cargo salvo com sucesso!'
    })
  }

  getSeverity(status: string): 'danger' | 'success' | undefined {
    if (status === 'ativo') {
      return 'success';
    }
    if (status === 'inativo') {
      return 'danger';
    }
    return undefined;
  }
}

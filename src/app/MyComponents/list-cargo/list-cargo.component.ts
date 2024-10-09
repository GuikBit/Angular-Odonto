import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CargoService } from 'src/app/cargo.service';
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


  constructor(private messageService: MessageService, private cargoService: CargoService){}


  ngOnInit(): void {

    this.cargoService.getCargos(1).then((response)=>{
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

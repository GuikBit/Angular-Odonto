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

  listaCargo: Cargo[];
  statuses: { label: string, value: string }[] = [
    { label: 'ativo', value: 'Ativo' },
    { label: 'inativo', value: 'Inativo' }
  ];


  constructor(private messageService: MessageService, private cargoService: CargoService){}


  ngOnInit(): void {

    this.cargoService.getCargos(1).then((response)=>{
      if(response?.status === 200){
        this.listaCargo = response.data;
      }
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


  info(){

  }

}

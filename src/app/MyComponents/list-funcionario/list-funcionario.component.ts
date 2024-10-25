import { Component, OnInit } from '@angular/core';

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


  constructor(){}
  
  ngOnInit(): void {
    
  }

  info(id: any){

  }

  cadastroFunc(){
    this.novoFuncionario = true;
  }
}

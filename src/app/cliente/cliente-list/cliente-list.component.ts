
import { MessageService } from 'primeng/api';
import { Component,AfterViewInit,ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from '../cliente';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Message } from '../cliente-novo/cliente-novo.component';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Injectable({
  providedIn: 'root',
})



@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit{

  clienteSelecionado?: any;
  msgSuccess?: string;
  msgErro?: string;
  searchTerm?: string ;
  //table
  colunas : string []= ['nSerie','nome', 'cpf', 'dataCadastro', 'btns'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort;
  statuses!: any[];

  editar: boolean = false;
  newUser: boolean = false;
  filtroAtivo: string | null = null;
  pacientesFiltrados: Cliente[] = [];

  constructor(private service: ClienteService, private router : Router, private route: ActivatedRoute,  private fb: FormBuilder, private messageService: MessageService) {

   this.criaTabelaPaciente();
  }

  async editPaciente(id: string) {
    if(id != null || id != undefined){
      try{
        const response = await this.service.getPacienteById(id);
        this.clienteSelecionado = response;

      }catch(error){

      }

      this.editar = true;
    }

  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      if (params['salvo']) {
        this.newUser = false;

      }
    })
    this.statuses = [
      { label: 'ativo', value: 'Ativo' },
      { label: 'inativo', value: 'Inativo' }
  ];
  }

   getSeverity(status: string): 'danger' | 'success' | undefined {
    if (status == 'ativo') {
      return 'success';
    }

    if (status == 'inativo') {
      return 'danger';
    }

    return undefined;
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  applyFilter() {
    this.pacientesFiltrados = this.dataSource.data.filter((paciente) => {
      if (this.filtroAtivo === null) {
        return true; // Sem filtro de status, retorna todos os pacientes
      } else {
        return paciente.ativo === (this.filtroAtivo === 'Ativo');
      }
    });
  }

  async criaTabelaPaciente() {
    try {
      const response = await this.service.getPacientes();
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error('Erro ao obter pacientes:', error);
    }
  }

  cadastro(){
     //this.router.navigate(['/clientes/novo'])
    this.newUser = true;
  }
  edit(id: any){
    this.router.navigate([`/clientes/edit/${id}`])
  }
  delet(id: any){
    this.router.navigate([`/clientes/delete/${id}`])
  }
  info(id: any){
    this.router.navigate([`/clientes/info/${id}`])
  }

  // preparaDelecao(cliente: Cliente){
  //   this.clienteSelecionado = cliente;
  // }
//   deletarCliente()
// {
//   this.service.deletarCliente(this.clienteSelecionado??;)
//   .subscribe(response =>{
//     this.msgSuccess= 'Cliente deletado com sucesso!',
//     this.ngOnInit();
//   }, erro=>{
//     this.msgErro= 'Ocorreu um erro ao deletar o cliente!'
//   })
// }
  deletarCliente(){}

  mostraMensagem(msg: Message) {
    this.messageService.add({
      severity: msg.type,
      summary: 'Aviso',
      detail: msg.content
    })
  }

   async closeModal(close: boolean) {
    this.newUser = close;
    this.messageService.add({
      severity: 'success',
      summary: 'Aviso',
      detail:'Paciente salvo com sucesso.'
    })
    const response = await this.service.getPacientes();
    this.dataSource = new MatTableDataSource(response);
  }

  onlyClose(close: boolean){
    this.newUser = close;
  }


}


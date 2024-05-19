import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from '../../class/cliente';
import { Message } from '../cliente-novo/cliente-novo.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clienteSelecionado?: Cliente;
  lista: Cliente[];
  searchTerm: string = '';
  colunas: string[] = ['nSerie', 'nome', 'cpf', 'dataCadastro', 'btns'];

  filtroAtivo: string | null = null;
  pacientesFiltrados: Cliente[] = [];
  editar: boolean = false;
  newUser: boolean = false;
  statuses: { label: string, value: string }[] = [
    { label: 'ativo', value: 'Ativo' },
    { label: 'inativo', value: 'Inativo' }
  ];

  org: any;

  constructor(
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const organizacaoJson = localStorage.getItem('organizacao');

    if (organizacaoJson) {
      this.org = JSON.parse(organizacaoJson);
    }

    this.route.params.subscribe(params => {
      if (params['salvo']) {
        this.newUser = false;
        this.showSuccessMessage('Paciente salvo com sucesso.');
      }
    });

    this.loadPacientes();
  }

  private async loadPacientes(): Promise<void> {
    try {
      const pacientes = await this.service.getPacientes(this.org.id);
      this.lista = pacientes;

    } catch (error) {
      console.error('Erro ao obter pacientes:', error);
    }
  }

  // applyFilter(): void {
  //   const filterValue = this.searchTerm.trim().toLowerCase();
  //   this.dataSource.filter = filterValue;

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }

  //   this.pacientesFiltrados = this.dataSource.data.filter(paciente => {
  //     if (this.filtroAtivo === null) {
  //       return true;
  //     }
  //     return paciente.ativo === (this.filtroAtivo === 'Ativo');
  //   });
  // }

  async editPaciente(id: string): Promise<void> {
    try {
      const response = await this.service.getPacienteById(id);
      this.clienteSelecionado = response;
      this.editar = true;
    } catch (error) {
      console.error('Erro ao editar paciente:', error);
    }
  }

  cadastro(): void {
    this.newUser = true;
  }

  edit(id: string): void {
    this.router.navigate([`/clientes/edit/${id}`]);
  }

  delet(id: string): void {
    this.router.navigate([`/clientes/delete/${id}`]);
  }

  info(id: string): void {
    this.router.navigate([`/clientes/info/${id}`]);
  }

  deletarCliente(): void {
    if (this.clienteSelecionado) {
      this.service.inativarPaciente(this.clienteSelecionado.id).then(
        () => {
          this.showSuccessMessage('Cliente deletado com sucesso!');
          this.loadPacientes();
        },
        () => {
          this.showErrorMessage('Ocorreu um erro ao deletar o cliente!');
        }
      );
    }
  }

  showSuccessMessage(detail: string): void {
    this.messageService.add({ severity: 'success', summary: 'Aviso', detail });
  }

  showErrorMessage(detail: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail });
  }

  async closeModal(close: boolean): Promise<void> {
    this.newUser = close;
    this.showSuccessMessage('Paciente salvo com sucesso.');
    await this.loadPacientes();

  }

  onlyClose(close: boolean): void {
    this.newUser = close;
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

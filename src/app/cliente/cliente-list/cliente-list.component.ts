import { Component,AfterViewInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from '../cliente';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isEmpty } from 'rxjs';
import { CustomSnackbarComponent } from 'src/app/util/custom-snackbar/custom-snackbar.component';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements AfterViewInit{
  
  clienteSelecionado?: Cliente;
  msgSuccess?: string;
  msgErro?: string;
  searchTerm?: string ;
  //table
  colunas : string []= ['nSerie','nome', 'cpf', 'dataCadastro', 'btns'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort;

  msgSalvar: string;
  msgSalvarStyle: string;


  constructor(private service: ClienteService, private router: Router, private route: ActivatedRoute,  private fb: FormBuilder, private _snackBar: MatSnackBar) { 
    
   this.criaTabelaPaciente();
  }

 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['salvo']) {
        this.msgSalvar = "Novo paciente salvo com sucesso!";
        this.msgSalvarStyle = "SuccessSnackbar";
        this.criaTabelaPaciente(); // Chame aqui
        this.openSnackBar();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.router.navigate(['/clientes/novo'])
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

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }
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

  openSnackBar ( ) {
    const snackbarRef = this._snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: this.msgSalvar },
      duration: 3000,
      panelClass: [this.msgSalvarStyle],
      verticalPosition: 'top', 
      horizontalPosition: 'end',
    });
  }
}

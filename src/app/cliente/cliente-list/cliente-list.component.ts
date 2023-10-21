import { Component,AfterViewInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from '../cliente';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  clientes: Cliente[]; 
  
  showFiller = false;
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pagaSizeOptions : number[] = [5, 10, 25, 50];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private service: ClienteService, private router: Router,  private fb: FormBuilder, private _snackBar: MatSnackBar) { 
    
  }


  // ngOnInit(): void {
  //   //this.service.getClientes(this.pagina, this.tamanho).subscribe(response => this.Clientes = response);
  //   this.viewTable(this.pagina, this.tamanho);
  // }
 
  ngOnInit(): void {
    this.viewTable(this.pagina, this.tamanho);
    this.dataSource = new MatTableDataSource<any>(this.clientes);
  }

  filterCountries(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim().toLocaleLowerCase();
    const filterValue = searchTerm;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  viewTable( pagina: any, tamanho: any){
    this.service.getClientesPage(pagina, tamanho).subscribe(response=>{
      this.clientes = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    })
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


paginar(event:PageEvent){
  this.pagina = event.pageIndex;
  this.viewTable(this.pagina, this.tamanho)
}
}

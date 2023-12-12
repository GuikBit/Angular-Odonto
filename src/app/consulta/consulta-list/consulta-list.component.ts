import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/app/consulta.service';
import { Consulta } from './../consulta';

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.css']
})
export class ConsultaListComponent {

  colunas : string [] = ['nome', 'cpf', 'dataCadastro', 'btns'];
  consultas: Consulta[];

  showFiller = false;
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pagaSizeOptions : number[] = [5, 10, 25, 50];

  constructor(private service: ConsultaService, private router: Router){}

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.viewTable(this.pagina, this.tamanho);
    this.dataSource = new MatTableDataSource<any>(this.consultas);
  }

  async viewTable( pagina: any, tamanho: any){
    
    const response = await this.service.getConsultas(pagina, tamanho)    
    this.consultas = response?.data !== null ? response?.data : null;
    this.dataSource = new MatTableDataSource<any>(this.consultas);
    this.totalElementos = await this.service.totalConsultas();
    this.pagina = pagina;

  }

  cadastro(){

  }
  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.viewTable(this.pagina, this.tamanho)
  }

  edit(id: any){
    this.router.navigate([`/dentista/edit/${id}`])
  }
  delet(id: any){
    this.router.navigate([`/dentista/delete/${id}`])
  }
  info(id: any){
    this.router.navigate([`/dentista/info/${id}`])
  }

}

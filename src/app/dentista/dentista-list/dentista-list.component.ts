import { Dentista } from './../dentista';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DentistaService } from 'src/app/dentista.service';

@Component({
  selector: 'app-dentista-list',
  templateUrl: './dentista-list.component.html',
  styleUrls: ['./dentista-list.component.css']
})
export class DentistaListComponent implements AfterViewInit{
 
 
  colunas : string []= ['nome', 'cpf', 'dataCadastro', 'btns'];
  dentistas: Dentista[];

  showFiller = false;
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pagaSizeOptions : number[] = [5, 10, 25, 50];

  constructor(private service: DentistaService, private router: Router){}

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.viewTable(this.pagina, this.tamanho);
    this.dataSource = new MatTableDataSource<any>(this.dentistas);
  }

  viewTable( pagina: any, tamanho: any){
    this.service.getDentistaPage(pagina, tamanho).subscribe(response=>{
      this.dentistas = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    })
  }

  cadastro(){
    this.router.navigate(['/dentistas/novo']);
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

import { Dentista } from './../dentista';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DentistaService } from 'src/app/dentista.service';
import { CustomSnackbarComponent } from 'src/app/util/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-dentista-list',
  templateUrl: './dentista-list.component.html',
  styleUrls: ['./dentista-list.component.css']
})
export class DentistaListComponent implements AfterViewInit{
 
 
  colunas : string []= ['nome', 'cpf', 'dataCadastro', 'btns'];
  dataSource: MatTableDataSource<Dentista>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort;;

  msgSalvar: string;
  msgSalvarStyle: string;

  constructor(private service: DentistaService,  private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar){
    this.criaTabelaDentista();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['salvo']) {
        this.msgSalvar = "Novo dentista salvo com sucesso!";
        this.msgSalvarStyle = "SuccessSnackbar";
        this.criaTabelaDentista(); // Chame aqui
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


  // async viewTable( pagina: any, tamanho: any){
  //   // this.service.getDentistaPage(pagina, tamanho).subscribe(response=>{
  //   //   this.dentistas = response.content;
  //   //   this.totalElementos = response.totalElements;
  //   //   this.pagina = response.number;
  //   // })
  //   const response = await this.service.getDentistas(pagina, tamanho)
  //   this.dentistas = response?.data !== null ? response?.data : null;
  //   this.dataSource = new MatTableDataSource<any>(this.dentistas);
  //   this.totalElementos = await this.service.totalDentistas();
  //   this.pagina = pagina;
  // }

  async criaTabelaDentista() {
    try {
      const response = await this.service.getDentistas();
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    } catch (error) {
      console.error('Erro ao obter pacientes:', error);
    }
  }

  cadastro(){
    this.router.navigate(['/dentistas/novo']);
  }
  // paginar(event: PageEvent){
  //   this.pagina = event.pageIndex;
  //   this.viewTable(this.pagina, this.tamanho)
  // }

  edit(id: any){
    this.router.navigate([`/dentista/edit/${id}`])
  }
  delet(id: any){
    this.router.navigate([`/dentista/delete/${id}`])
  }
  info(id: any){
    this.router.navigate([`/dentista/info/${id}`])
  }

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

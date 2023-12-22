import { Dentista } from './../dentista';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DentistaService } from 'src/app/dentista.service';
import { CustomSnackbarComponent } from 'src/app/util/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-dentista-list',
  templateUrl: './dentista-list.component.html',
  styleUrls: ['./dentista-list.component.css']
})
export class DentistaListComponent implements AfterViewInit{

  dentista: any;
  colunas : string []= ['nome', 'cpf', 'dataCadastro', 'btns'];
  dataSource: MatTableDataSource<Dentista>;

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort;;

  msgSalvar: string;
  msgSalvarStyle: string;

  novo: any = false;
  editar: any = false;
  info: any = false;
  deletar: any = false;

  constructor(private service: DentistaService,  private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private messageService: MessageService){
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

  showDialog() {
    this.novo = true;
  }

  async EditShowDialog(id: string){

     await this.service.getById(id)
     .then((response)=>{

      this.dentista = response;

     }).catch((error)=>{

      this.messageService.add({
        severity: 'error',
        summary: 'Opss!',
        detail: 'Houve algum problema ao buscar o dentista',
        life: 2000
      })
     });

    this.editar = true;
  }

  DeletShowDialog(){
    this.deletar = true;
  }

  infoShow(id: string){
    this.router.navigate([`/dentistas/info/${id}`])
  }


  applyFilter(event: Event) {
    console.log((event.target as HTMLInputElement).value)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;

    } catch (error) {
      console.error('Erro ao obter pacientes:', error);
    }
  }

  // cadastro(){
  //   this.router.navigate(['/dentistas/novo']);
  // }
  // edit(id: any){
  //   this.router.navigate([`/dentista/edit/${id}`])
  // }
  // delet(id: any){
  //   this.router.navigate([`/dentista/delete/${id}`])
  // }
  // info(id: any){
  //   this.router.navigate([`/dentista/info/${id}`])
  // }

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

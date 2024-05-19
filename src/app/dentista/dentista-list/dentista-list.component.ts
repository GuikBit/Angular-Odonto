import { Dentista } from '../../class/dentista';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DentistaService } from 'src/app/dentista.service';

@Component({
  selector: 'app-dentista-list',
  templateUrl: './dentista-list.component.html',
  styleUrls: ['./dentista-list.component.css']
})
export class DentistaListComponent implements OnInit{


  dentista: any;
  dentistas: Dentista[];
  colunas : string []= ['nome', 'cpf', 'dataCadastro', 'btns'];
  dataSource: MatTableDataSource<Dentista>;

  msgSalvar: string;
  msgSalvarStyle: string;

  novo: any = false;
  editar: any = false;
  info: any = false;
  deletar: any = false;

  org: any;

  constructor(private service: DentistaService,  private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private messageService: MessageService){
    const organizacaoJson = localStorage.getItem('organizacao');

    if (organizacaoJson) {
      this.org = JSON.parse(organizacaoJson);
    }

    this.criaTabelaDentista();
  }


  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   if (params['salvo']) {
    //     this.msgSalvar = "Novo dentista salvo com sucesso!";
    //     this.msgSalvarStyle = "SuccessSnackbar";
    //     this.criaTabelaDentista();

    //   }
    // })
  }

  showDialog() {
    this.novo = true;
  }

  async EditShowDialog(id: string){

     await this.service.getByIdDentista(id, this.org.id).then((response)=>{

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
   // console.log((event.target as HTMLInputElement).value)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  async criaTabelaDentista() {
    try {
      const response = await this.service.getDentistas(this.org.id);
      this.dentistas = response;


    } catch (error) {
      console.error('Erro ao obter pacientes:', error);
    }
  }

  closeModal(close: boolean) {
    this.novo = close;
    this.criaTabelaDentista();
    this.messageService.add({
      severity: 'success',
      summary: 'Aviso',
      detail: 'Dentista salvo com sucesso!'
    })
  }

  onlyClose(close: boolean){
    this.novo = close;
  }
}

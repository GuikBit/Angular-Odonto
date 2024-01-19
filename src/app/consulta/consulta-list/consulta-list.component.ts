import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, ViewChild } from '@angular/core';



import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from 'src/app/consulta.service';
import { Consulta } from './../consulta';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageService } from 'primeng/api';

export interface Message {
  type: 'success' | 'error';
  content: string;
}

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.css']
})

export class ConsultaListComponent{

  consultaSelecionada: Consulta;
  colunas : string [] = ['nome', 'cpf', 'dataCadastro', 'btns'];
  dataSource: MatTableDataSource<Consulta>;

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort;

  msgSalvar: string;
  msgSalvarStyle: string;
  filtro: any;
  visible: boolean = false;
  infoConsulta: boolean = false;
  close: boolean;

  paymentOptions: any[] = [
    { name: 'Dia', icon: 'pi pi-calendar', value: 1, styleClass: "selectButton" },
    { name: 'Semana', icon: 'pi pi-calendar',  value: 2, styleClass: "selectButton"},
    { name: 'Mês', icon: 'pi pi-calendar', value: 3, styleClass: "selectButton" }
  ];

  constructor(private service: ConsultaService, private router: Router, private route: ActivatedRoute, private messageService: MessageService){
    this.criaTabelaConsulta();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['salvo']) {
        this.msgSalvar = "Nova consulta salva com sucesso!";
        this.msgSalvarStyle = "SuccessSnackbar";
        this.criaTabelaConsulta(); // Chame aqui

      }
    })
  }

  filtrarTabela(event: any){
    console.log(event.value)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultaInfo(){
    this.router.navigate([`/consultas/info/1`])
  }

  async criaTabelaConsulta() {
    try {
      const response = await this.service.getConsultas();
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    } catch (error) {
      console.error('Erro ao obter pacientes:', error);
    }
  }

 cadastro(){
  //  this.router.navigate([`/consultas/nova`])
  this.visible = true;
 }

  // edit(id: any){
  //   this.router.navigate([`/dentista/edit/${id}`])
  // }
  // delet(id: any){
  //   this.router.navigate([`/dentista/delete/${id}`])
  // }
  // info(id: any){
  //   this.router.navigate([`/dentista/info/${id}`])
  // }

  consultaSelecionadaInfo(id: any){
  if(id != null){
    this.service.getConsultaById(id).then((response)=>{

      this.consultaSelecionada = response;
      this.infoConsulta = true;

    }).catch((error)=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Aviso',
        detail: 'Houve algum problema ao buscar a consulta',
        life: 2000
      })
    })
  }
  }

  closeModal(close: boolean) {
    this.infoConsulta = close;
    
  }

}

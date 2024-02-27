import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, ViewChild } from '@angular/core';



import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from 'src/app/consulta.service';
import { Consulta } from './../consulta';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsultaInfoComponent } from '../consulta-info/consulta-info.component';

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
  consultaSelecionadaPg: Consulta;
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
  inicioConsulta: boolean = false;
  pagamentoInfo: boolean = false;
  ref: DynamicDialogRef ;
  paymentOptions: any[] = [
    { name: 'Dia', icon: 'pi pi-calendar', value: 1, styleClass: "selectButton" },
    { name: 'Semana', icon: 'pi pi-calendar',  value: 2, styleClass: "selectButton"},
    { name: 'Mês', icon: 'pi pi-calendar', value: 3, styleClass: "selectButton" }
  ];


  constructor(private service: ConsultaService, private router: Router, private route: ActivatedRoute, private messageService: MessageService,
    private dialogService: DialogService){
    this.criaTabelaConsulta();
  }


  ngOnInit(): void {

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


    } catch (error) {
      console.error('Erro ao obter pacientes:', error);
    }
  }

 cadastro(){
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

  async consultaSelecionadaInfo(id: any, tipo: number){
  if(id != null){
   await this.service.getConsultaById(id).then((response)=>{
      if(tipo === 1){
        this.consultaSelecionada = response;
        this.infoConsulta = true;
      }else{
        this.consultaSelecionadaPg = response;
        this.pagamentoInfo = true;
      }

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
    this.visible = close;
    this.criaTabelaConsulta();
    this.messageService.add({
      severity: 'success',
      summary: 'Aviso',
      detail: 'Consulta agendada com sucesso!',
      life: 2000
    })
  }
  async closeInfo(close: boolean) {
    this.infoConsulta = close;
    //this.criaTabelaConsulta();
  }

  closeModalPagamento(close: boolean) {
    this.pagamentoInfo = close;
    this.criaTabelaConsulta();
    this.messageService.add({
      severity: 'success',
      summary: 'Aviso',
      detail: 'Consulta agendada com sucesso!',
      life: 2000
    })
  }

  // async pagamentoStatus(id: any){
  //   if(id != null){
  //     await this.service.getConsultaById(id).then((response)=>{



  //     }).catch((error)=>{
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Aviso',
  //         detail: 'Houve algum problema ao buscar a consulta',
  //         life: 2000
  //       })
  //     })
  //   }
  // }
  iniciarConsulta(consulta: any) {
    //this.inicioConsulta = true;
   if(consulta !== null){
    const atual = new Date();
    const dataConsulta = new Date(consulta.dataConsulta) ;
    if(dataConsulta.toLocaleDateString() == atual.toLocaleDateString()){
      setTimeout(()=>{
        this.service.iniciarConsulta(consulta.id).then((response)=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Aviso',
            detail: 'Consulta inicida com sucesso.'
          })
          //this.inicioConsulta = false;
          this.criaTabelaConsulta();
        }).catch((error)=>{
          this.inicioConsulta = false;
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Houve um erro para iniciar a consulta...'
          })
        })
      }, 1500)
    }else{
      this.inicioConsulta = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'A consulta não está agendada para o dia corrente'
      })
    }
    }
  }

  async reloading(reloading: Boolean) {
   if(reloading){
    const consulta = this.consultaSelecionada.id;
    this.criaTabelaConsulta();
    this.consultaSelecionadaInfo(consulta, 1);
   }
  }
}

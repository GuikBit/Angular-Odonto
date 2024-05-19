
import {  Component, ChangeDetectorRef, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from 'src/app/consulta.service';
import { Consulta } from '../../class/consulta';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { Dentista } from 'src/app/class/dentista';
import { DentistaService } from 'src/app/dentista.service';

export interface Status{
  label: string,
  cor: string,
}
@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.css']
})

export class ConsultaListComponent implements OnInit{

  @Input() fimSemana: EventEmitter<boolean> = new EventEmitter<boolean>();

  consultaSelecionada: Consulta;
  consultaSelecionadaPg: Consulta;
  colunas : string [] = ['nome', 'cpf', 'dataCadastro', 'btns'];
  lista: Consulta[];
  listaFiltro: Consulta[] = [];

  dentistas: Dentista[];
  filtroDentista: Dentista;
  rangeDates: Date[];
  status: Status;


  filtro: SelectButtonChangeEvent = {
    value: null
  };

  filtroListaCalendar: SelectButtonChangeEvent = {
    value: null
  }
  ehCalendario: boolean = true;

  visible: boolean = false;
  infoConsulta: boolean = false;
  close: boolean;
  inicioConsulta: boolean = false;
  pagamentoInfo: boolean = false;
  ref: DynamicDialogRef ;

  novaConsultaCalendar: Date | null;

  filtroDiaSemanaMes: any[] = [
    { name: 'Dia', icon: 'pi pi-calendar', value: 1, styleClass: "selectButton" },
    { name: 'Semana', icon: 'pi pi-calendar',  value: 2, styleClass: "selectButton"},
    { name: 'Mês', icon: 'pi pi-calendar', value: 3, styleClass: "selectButton" }
  ];
  listaOuCalendar: any[] =[
    { name: 'Listagem', icon: 'pi pi-list', value: 1, styleClass: "selectButton" },
    { name: 'Calendário', icon: 'pi pi-calendar',  value: 2, styleClass: "selectButton"},
  ]

  org: any;

  constructor(private service: ConsultaService, private servideDentista: DentistaService , private router: Router, private route: ActivatedRoute, private messageService: MessageService,
    private dialogService: DialogService, private cdRef: ChangeDetectorRef){

      const organizacaoJson = localStorage.getItem('organizacao');

    if (organizacaoJson) {
      this.org = JSON.parse(organizacaoJson);
    }
      this.criaTabelaConsulta();
    this.filtroListaCalendar = this.listaOuCalendar[1].value;
    this.filtro = this.filtroDiaSemanaMes[2].value;
  }

  ngOnInit(){

  }

  filtrarTabela(filtro: SelectButtonChangeEvent) {
      switch (filtro.value){
        case 1: {
          const dataAtual = new Date();
          dataAtual.setHours(0, 0, 0, 0);
          this.listaFiltro = this.lista.filter(item => {
            const dataConsulta = new Date(item.dataConsulta);
            dataConsulta.setHours(0, 0, 0, 0);
            return dataConsulta.getTime() === dataAtual.getTime();
          });
          break;
        }
        case 2: {
          const intervalo = this.calcularIntervaloSemana();

          this.listaFiltro = this.lista.filter(item => {
            const dataConsulta = new Date(item.dataConsulta);
            dataConsulta.setHours(0, 0, 0, 0);

            return dataConsulta.getTime() >=  intervalo.inicio.getTime() && dataConsulta.getTime() <= intervalo.fim.getTime();
          });
          break;
        }
        case 3: {
          const intervalo = this.calcularIntervaloMes();

          this.listaFiltro = this.lista.filter(item => {
            const dataConsulta = new Date(item.dataConsulta);
            dataConsulta.setHours(0, 0, 0, 0);

            return dataConsulta.getTime() >=  intervalo.inicio.getTime() && dataConsulta.getTime() <= intervalo.fim.getTime();
          });
          break;
        }
        default: {
          this.listaFiltro = this.lista;
          break;
        }
      }
  }

  trocaFiltroCalendario(filtro: SelectButtonChangeEvent){
    switch(filtro.value){
      case 1: {
        this.ehCalendario = true;
        break;
      }
      case 2:{
        this.ehCalendario = false;
        break;
      }
    }
  }

  calcularIntervaloSemana(): {inicio: Date, fim: Date} {
    const hoje = new Date();
    const primeiroDiaSemana = new Date(hoje);
    const ultimoDiaSemana = new Date(hoje);

    primeiroDiaSemana.setDate(hoje.getDate() - hoje.getDay());
    primeiroDiaSemana.setHours(0,0,0,0)

    ultimoDiaSemana.setDate(primeiroDiaSemana.getDate() + 6);
    ultimoDiaSemana.setHours(0,0,0,0)

    return { inicio: primeiroDiaSemana, fim: ultimoDiaSemana };
  }

  calcularIntervaloMes(): {inicio: Date, fim: Date} {
    const hoje = new Date();

    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    primeiroDiaMes.setHours(0,0,0,0)

    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    ultimoDiaMes.setHours(0,0,0,0)

    return { inicio: primeiroDiaMes, fim: ultimoDiaMes };
}




  consultaInfo(){
    this.router.navigate([`/consultas/info/1`])
  }

  criaTabelaConsulta() {
    try {
     this.service.getConsultas().then((response)=>{
        this.lista = response;
        this.ehCalendario = false;
        this.filtrarTabela(this.filtro)

      })

      this.servideDentista.getDentistas(this.org.id).then((response)=>{
        this.dentistas = response;
      })
      // this.lista = new MatTablelista(response);

    } catch (error) {
      console.error('Erro ao obter pacientes:', error);
    }

  }

 cadastro(){
  this.visible = true;
 }

  async consultaSelecionadaInfo(id: any, tipo: number){
  if(id != null){
   await this.service.getConsultaById(id).then((response)=>{
      if(tipo === 1){
        this.consultaSelecionada = response;
        this.infoConsulta = true;
      }else{
        this.consultaSelecionadaPg = response;
        this.pagamentoInfo = true;
       // console.log("Entrei aqui pra abrir o modal")
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
    this.ehCalendario = true;
    this.criaTabelaConsulta();
    this.messageService.add({
      severity: 'success',
      summary: 'Aviso',
      detail: 'Consulta agendada com sucesso!',
      life: 2000
    })
  }

  onlyClose(close: boolean){
    this.visible = close;
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

  async reloadingPagamento(reloading: boolean) {
    if(reloading){
      const consulta = this.consultaSelecionadaPg.id;
      this.consultaSelecionadaInfo(consulta, 2);
    }
  }

  abrirConsultaSelecionada(idConsulta: any){
    this.consultaSelecionadaInfo(parseInt(idConsulta), 1);
  }

  novaConsultaDiaClicado(date: any) {
    this.novaConsultaCalendar = new Date(date);
    this.novaConsultaCalendar.setHours(0,0,0,0);
    this.visible = true;
    setTimeout(() => {
      this.novaConsultaCalendar = null;

    }, 1000);
  }
  filtraListaDentista(){
    return this.filtroDentista;
  }

  redirecionarDentista(id: any){
    this.router.navigate([`/dentistas/info/${id}`])
  }
}

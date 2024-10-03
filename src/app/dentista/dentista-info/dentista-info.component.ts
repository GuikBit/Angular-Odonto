import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Dentista } from '../../class/dentista';
import { ActivatedRoute, Router } from '@angular/router';
import { DentistaService } from 'src/app/dentista.service';
import { MessageService } from 'primeng/api';
import { ConsultaService } from 'src/app/consulta.service';
import { Consulta } from 'src/app/class/consulta';
import { PlatformLocation } from '@angular/common';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-dentista-info',
  templateUrl: './dentista-info.component.html',
  styleUrls: ['./dentista-info.component.css']
})
export class DentistaInfoComponent implements OnInit {


  consultaSelecionada: Consulta;

  data: any;
  dataGrafic1: any;
  dataGrafic2: any;

  options1:any;
  options2: any;

  infoConsulta: boolean = false;

  inicioConsulta: any;

  ehCalendario: boolean = false;
  ehListagem: boolean = false;
  ehOrcamento: boolean = false;
  ehIndicadores: boolean = false;
  ehInfo: boolean = true;

  editavel: boolean = true;

  visible: boolean;
  novaConsultaCalendar: Date | null;

  org: any;



  constructor(private route: ActivatedRoute, private service: DentistaService, private router: Router, public messageService: MessageService,
    private serviceConsulta: ConsultaService){
      const organizacaoJson = localStorage.getItem('organizacao');

      if (organizacaoJson) {
        this.org = JSON.parse(organizacaoJson);
      }
  }


  ngOnInit(){
    let id: string = '';
    this.route.params.subscribe(params => {
      id = params['id'];
    })
    if(id !== ''){
     this.service.getDentistaFull(id, this.org.id).then((response)=>{
      if(response != null){
        this.data = response;
        console.log(this.data)
      }else{
        this.router.navigate(['/dentistas']);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao carregar o dentista, esse dentista nao existe',
          life: 2000
        })
      }

     }).catch(()=>{
      this.router.navigate(['/dentistas']);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar o dentista',
        life: 2000
      })
     })
    }else{
      this.router.navigate(['/dentistas']);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar o dentista',
        life: 2000
      })
    }
    //grafico 1
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

      this.options1 = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
      }
    //grafico 2
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.dataGrafic2 =

        this.options2 = {

            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        }
  }

  viewTable(index: any){
    switch(index){
      case 1 : {
        this.ehCalendario = false;
        this.ehListagem = false;
        this.ehOrcamento = true;
        this.ehIndicadores = false;
        this.ehInfo = false;
        break;
      }
      case 2 : {
        this.ehCalendario = true;
        this.ehListagem = false;
        this.ehOrcamento = false;
        this.ehIndicadores = false;
        this.ehInfo = false;
        break;
      }
      case 3 : {
        this.ehCalendario = false;
        this.ehListagem = true;
        this.ehOrcamento = false;
        this.ehIndicadores = false;
        this.ehInfo = false;
        break;
      }
      case 4 : {
        this.ehCalendario = false;
        this.ehListagem = false;
        this.ehOrcamento = false;
        this.ehIndicadores = true;
        this.ehInfo = false;
        break;
      }
      case 5 : {
        this.ehCalendario = false;
        this.ehListagem = false;
        this.ehOrcamento = false;
        this.ehIndicadores = false;
        this.ehInfo = true;
        break;
      }
      default: {
        this.ehCalendario = true;
        this.ehListagem = false;
        this.ehOrcamento = false;
        this.ehIndicadores = false;
        break;
      }
    }
  }

  calculaPorcentagem(mesAnterior: number, mesAtual: number) {
    if(mesAnterior === 0){
      return ((mesAtual - mesAnterior ) / 1 );
    }
    if(mesAtual === 0){
      return ((mesAnterior - mesAtual ) / 1 );
    }
    return ((mesAtual - mesAnterior ) / mesAnterior );

  }

  consultaSelecionadaInfo(id: any, tipo: any){
    if(id != null){

      this.serviceConsulta.getConsultaById(id).then((response)=>{
        this.consultaSelecionada = response;
        //this.consultaSelecionada = response;
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

  newConsulta(){
    this.visible = true;
  }

  newOrcamentoByDentista(id: string){

    sessionStorage.setItem('dentista', id);
    this.router.navigate(['/dentistas/novoOrcamento'])
  }

  onlyClose(close: boolean) {
    this.visible = close;
  }

  closeModal(close: boolean) {
    this.visible = close;
    let id: string = '';
    this.route.params.subscribe(params => {
      id = params['id'];
    })
    this.service.getDentistaFull(id, this.org.id).then((response)=>{

      this.data = response;
      this.messageService.add({
        severity: 'success',
        summary: 'Aviso',
        detail: 'Consulta agendada com sucesso!',
        life: 2000
      })
     }).catch(()=>{
      this.router.navigate(['/dentistas']);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar o dentista',
        life: 2000
      })
     })

  }

  reloading($event: Boolean){

  }

  closeInfo($event: boolean){

  }

  abrirConsultaSelecionada(idConsulta: any){
    this.consultaSelecionadaInfo(parseInt(idConsulta), 1);
  }

 async novaConsultaDiaClicado(date: any) {
    this.visible = true;
    this.novaConsultaCalendar = date;
    setTimeout(() => {
      this.novaConsultaCalendar = null;

    }, 1000);
  }

  dentistaInfoCor(){
    return true;
  }


  editarDentista(){
    this.editavel = false;
  }

  onReactivate(){

  }
  
  onInactivate(){

  }
}

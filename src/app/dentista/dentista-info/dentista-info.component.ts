import { Component, OnInit } from '@angular/core';
import { Dentista } from '../dentista';
import { ActivatedRoute, Router } from '@angular/router';
import { DentistaService } from 'src/app/dentista.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dentista-info',
  templateUrl: './dentista-info.component.html',
  styleUrls: ['./dentista-info.component.css']
})
export class DentistaInfoComponent implements OnInit {
iniciarConsulta(_t159: any) {
throw new Error('Method not implemented.');
}
inicioConsulta: any;

consultaSelecionadaInfo(arg0: any) {
throw new Error('Method not implemented.');
}

  data: any;
  dataGrafic1: any;
  dataGrafic2: any;

  options1:any;
  options2: any;

  constructor(private route: ActivatedRoute, private service: DentistaService, private router: Router, public messageService: MessageService){}


  ngOnInit(){
    let id: string = '';
    this.route.params.subscribe(params => {
      id = params['id'];
    })
    if(id !== ''){
     const response = this.service.getDentistaFull(id).then((response)=>{

      this.data = response;
      // console.log(this.data);

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
    //grafico 1
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.dataGrafic1 = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    //backgroundColor: ['#516EBB', '#7769BC','#9963B7'], //azul com roxo
                    //hoverBackgroundColor: ['#6789ca', '#8d86ce','#b081cb']

                    backgroundColor: ['#7692BC', '#72AEF8','#ABE3FF'],    // azul com azul
                    hoverBackgroundColor: ['#8aa8ca', '#95c5fb','#dff2ff']
                }
            ],

        };


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

        this.dataGrafic2 = {
            labels: ['Agosto','Setembro', 'Outobro', 'Novembro', 'Dezembro'],
            datasets: [
                // {
                //     label: 'First Dataset',
                //     data: [ 81, 56, 55, 40],
                //     fill: false,
                //     tension: 0.4,
                //     borderColor: documentStyle.getPropertyValue('--blue-500')
                // },
                // {
                //     label: 'Second Dataset',
                //     data: [ 19, 86, 27, 90],
                //     fill: false,
                //     borderDash: [5, 5],
                //     tension: 0.4,
                //     borderColor: documentStyle.getPropertyValue('--teal-500')
                // },
                {
                    label: 'Third Dataset',
                    data: [50, 33, 42, 62, 45],
                    fill: true,
                    // borderColor: '#7692BC',
                    // backgroundColor: 'rgba(118, 146, 188, 0.2)'
                    borderColor: '#516EBB',
                    backgroundColor: 'rgba(81, 110, 187, 0.2)',
                    tension: 0.4,
                }
            ]
          }

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
  infoShow(arg0: any) {
    throw new Error('Method not implemented.');
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

}

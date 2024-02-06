import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  dentistas: any;
  procedimentos: any;
  especialidades: any;

  erro: boolean = false;
  data: any;
  dataDoughnut: any;
  dataLine: any;
  dataLineDent: any;
  dataPie: any;


  basicOptions: any;
  basicOptionsDent: any;
  basicOptionsPie: any;

  constructor(private service: DashboardService, private messageService: MessageService) { }

  async ngOnInit() {
    this.dentistas = [
      { nome: 'Dr Gabriel Afreu'},
      { nome: 'Dr Mariza Matos' },
      { nome: 'Dr Júnior Campos' }
  ];
  this.procedimentos = [
    { nome: 'Avaliacao' },
    { nome: 'Manutencao' },
    { nome: 'Cirurgia' },
    { nome: 'Geral' }
  ];
  this.especialidades = [
    { nome: 'Geral'},
    { nome: 'Ortodontia' },
    { nome: 'Cirurgião' },
    { nome: 'Periodontia' },
  ];
    this.erro = false;
    await this.service.getDashBoard().then((response)=>{
      if((response?.status === 200 || response?.status === 201)){
        this.data = response.data;
        this.erro = false;
        console.log(this.data.qtdPorMes[0])

      }else{
        this.messageService.add({severity:'error', summary:'Erro', detail:'Houve um erro ao buscar as informações do dashboard. Entre em contato com o suporte.'});

      }
    }).catch(()=>{
      this.messageService.add({severity:'error', summary:'Erro', detail:'Houve um erro ao buscar as informações do dashboard. Entre em contato com o suporte.'});

    })
    this.configuraGrafico();
  }

  configuraGrafico(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.dataLineDent={
      labels: [this.data.meses[5], this.data.meses[4], this.data.meses[3], this.data.meses[2], this.data.meses[1], this.data.meses[0]],
      datasets: [
        {
            label: this.data.dentistas[0],
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            backgroundColor: 'transparent'
        },
        {
            label: this.data.dentistas[1],
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--teal-500'),
            backgroundColor: 'transparent'
        },
        {
            label: this.data.dentistas[2],
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: documentStyle.getPropertyValue('--orange-500'),
            tension: 0.4,
            backgroundColor: 'transparent'
        }
      ],

    }

    this.dataDoughnut = {
      labels: ['Avaliacao', 'Manutencao', 'Cirurgia'],
      datasets:[
      {
        data: this.data.qtdPorEspec,
        backgroundColor: ['#7692BC', '#72AEF8','#ABE3FF'],
        hoverBackgroundColor: ['#8aa8ca', '#95c5fb','#dff2ff']
      }
      ]
    }

    this.dataLine = {
      labels: [this.data.meses[5],this.data.meses[4], this.data.meses[3], this.data.meses[2], this.data.meses[1], this.data.meses[0] ],
      datasets: [
          {
              label: "Consultas",
              data: [this.data.qtdPorMes[5],this.data.qtdPorMes[4], this.data.qtdPorMes[3], this.data.qtdPorMes[2], this.data.qtdPorMes[1], this.data.qtdPorMes[0] ],
              fill: true,
              borderColor: '#2070B4',
              tension: 0.4,
              backgroundColor: 'rgba(32, 112, 180, 0.2)'
          }
      ]
    };

    this.dataPie = {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [540, 325, 702],
              backgroundColor: ['#7692BC', '#72AEF8','#ABE3FF'],
              hoverBackgroundColor: ['#8aa8ca', '#95c5fb','#dff2ff']

          }
      ]
    };

    this.basicOptionsDent = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor
              },

          }
      },
      scales: {
        x: {
          display: true,
          ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: '#F3F4F6',
              drawBorder: false
            }
        },
        y: {
          display: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: '#F3F4F6',
                drawBorder: false
            }
        }
      },
    };

    this.basicOptions = {
      aspectRatio: 2.5,
      name: false,
      plugins: {
        legend: {
          display: false,
          labels: {
            usePointStyle: true,
            color: textColor
        },
        }
      },
      scales: {
          x: {
            display: true,
            ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: '#F3F4F6',
                drawBorder: false
              }
          },
          y: {
            display: true,
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: '#F3F4F6',
                  drawBorder: false
              }
          }
      },
      layout: {
        padding: 0
      }
    }

    this.basicOptionsPie = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
  }
}

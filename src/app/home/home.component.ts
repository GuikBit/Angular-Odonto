import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MessageService } from 'primeng/api';
import { Dentista } from '../class/dentista';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

// interface FiltroDash{
//   dataInicio?: Date | null;
//   dataFim?: Date | null;
//   dentista?: Dentista | null;
//   procedimentos: any;
//   especialidade: any;
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
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

  formulario: FormGroup;

  basicOptions: any;
  basicOptionsDent: any;
  basicOptionsPie: any;

  sidebarState = 'in';
  sidebarVisible: boolean = true;
  constructor(private service: DashboardService, private messageService: MessageService, private formBuilder: FormBuilder) {

   }

  async ngOnInit() {
    this.erro = false;

    this.criaFormulario();

    await this.service.getDashBoard()
    .then((response)=>{
      if((response?.status === 200 || response?.status === 201)){

        this.data = response.data;
        this.erro = false;

       console.log(this.data)
      }else{
        this.messageService.add({severity:'error', summary:'Erro', detail:'Houve um erro ao buscar as informações do dashboard. Entre em contato com o suporte.'});

      }
    }).catch(()=>{
      this.messageService.add({severity:'error', summary:'Erro', detail:'Houve um erro ao buscar as informações do dashboard. Entre em contato com o suporte.'});

    })

    await this.configuraGrafico();



  }

  // async configuraGrafico(){
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  //   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  //   this.dataLineDent={
  //     labels: [this.data.meses[5], this.data.meses[4], this.data.meses[3], this.data.meses[2], this.data.meses[1], this.data.meses[0]],
  //     datasets: [
  //       {
  //           label: this.data.dentistasList[1].nome,
  //           data: [this.data.qtdConsultasDentistaMes[5][1], this.data.qtdConsultasDentistaMes[4][1], this.data.qtdConsultasDentistaMes[3][1], this.data.qtdConsultasDentistaMes[2][1], this.data.qtdConsultasDentistaMes[1][1], this.data.qtdConsultasDentistaMes[0][1]],
  //           fill: false,
  //           tension: 0.4,
  //           borderColor: documentStyle.getPropertyValue('--blue-500'),
  //           backgroundColor: 'transparent'
  //       },
  //       {
  //           label: this.data.dentistasList[0].nome,
  //           data: [this.data.qtdConsultasDentistaMes[5][0], this.data.qtdConsultasDentistaMes[4][0], this.data.qtdConsultasDentistaMes[3][0], this.data.qtdConsultasDentistaMes[2][0], this.data.qtdConsultasDentistaMes[1][0], this.data.qtdConsultasDentistaMes[0][0]],
  //           fill: false,
  //           tension: 0.4,
  //           borderColor: documentStyle.getPropertyValue('--teal-500'),
  //           backgroundColor: 'transparent'
  //       },
  //       {
  //           label: this.data.dentistasList[2].nome,
  //           data: [this.data.qtdConsultasDentistaMes[5][2],this.data.qtdConsultasDentistaMes[4][2], this.data.qtdConsultasDentistaMes[3][2], this.data.qtdConsultasDentistaMes[2][2], this.data.qtdConsultasDentistaMes[1][2], this.data.qtdConsultasDentistaMes[0][2]],
  //           fill: true,
  //           borderColor: documentStyle.getPropertyValue('--orange-500'),
  //           tension: 0.4,
  //           backgroundColor: 'transparent'
  //       }
  //     ],

  //   }

  //   this.dataDoughnut = {
  //     labels: [this.data.qtdProcedimentos[0].nome, this.data.qtdProcedimentos[1].nome, this.data.qtdProcedimentos[2].nome, this.data.qtdProcedimentos[3].nome, this.data.qtdProcedimentos[4].nome, this.data.qtdProcedimentos[5].nome],
  //     datasets:[
  //     {
  //       data: [this.data.qtdProcedimentos[0].quantidadeConsultas, this.data.qtdProcedimentos[1].quantidadeConsultas, this.data.qtdProcedimentos[2].quantidadeConsultas,
  //       this.data.qtdProcedimentos[3].quantidadeConsultas, this.data.qtdProcedimentos[4].quantidadeConsultas, this.data.qtdProcedimentos[5].quantidadeConsultas],
  //       backgroundColor: ['#7692bc', '#769cd2','#74a7e9', '#78b5f5', '#83c6fc', '#9cdafe'],
  //       hoverBackgroundColor: ['#a1bfd8', '#cedcef','#c6dbf7', '#c2ddfb', '#dbedfe', '#f0f9ff']
  //     }
  //     ]
  //   }

  //   this.dataLine = {
  //     labels: [this.data.meses[5],this.data.meses[4], this.data.meses[3], this.data.meses[2], this.data.meses[1], this.data.meses[0] ],
  //     datasets: [
  //         {
  //             label: "Consultas",
  //             data: [this.data.qtdMes[5],this.data.qtdMes[4], this.data.qtdMes[3], this.data.qtdMes[2], this.data.qtdMes[1], this.data.qtdMes[0] ],
  //             fill: true,
  //             borderColor: '#2070B4',
  //             tension: 0.4,
  //             backgroundColor: 'rgba(32, 112, 180, 0.2)'
  //         }
  //     ]
  //   };

  //   this.dataPie = {
  //     labels: [this.data.especialidades[0].tipo, this.data.especialidades[1].tipo, this.data.especialidades[2].tipo],
  //     datasets: [
  //         {
  //             data: [this.data.qtdEspecialidade[0], this.data.qtdEspecialidade[1], this.data.qtdEspecialidade[2]],
  //             backgroundColor: ['#7692bc', '#769cd2','#74a7e9'],
  //             hoverBackgroundColor: ['#a1bfd8', '#cedcef','#c6dbf7']

  //         }
  //     ]
  //   };

  //   this.basicOptionsDent = {
  //     plugins: {
  //         legend: {
  //             labels: {
  //                 usePointStyle: true,
  //                 color: textColor
  //             },

  //         }
  //     },
  //     scales: {
  //       x: {
  //         display: true,
  //         ticks: {
  //             color: textColorSecondary,
  //           },
  //           grid: {
  //             color: '#F3F4F6',
  //             drawBorder: false
  //           }
  //       },
  //       y: {
  //         display: true,
  //           ticks: {
  //             color: textColorSecondary,
  //           },
  //           grid: {
  //             color: '#F3F4F6',
  //               drawBorder: false
  //           }
  //       }
  //     },
  //   };

  //   this.basicOptions = {
  //     aspectRatio: 2.5,
  //     name: false,
  //     plugins: {
  //       legend: {
  //         display: false,
  //         labels: {
  //           usePointStyle: true,
  //           color: textColor
  //       },
  //       }
  //     },
  //     scales: {
  //         x: {
  //           display: true,
  //           ticks: {
  //               color: textColorSecondary,
  //             },
  //             grid: {
  //               color: '#F3F4F6',
  //               drawBorder: false
  //             }
  //         },
  //         y: {
  //           display: true,
  //             ticks: {
  //               color: textColorSecondary,
  //             },
  //             grid: {
  //               color: '#F3F4F6',
  //                 drawBorder: false
  //             }
  //         }
  //     },
  //     layout: {
  //       padding: 0
  //     }
  //   }

  //   this.basicOptionsPie = {
  //       plugins: {
  //             legend: {
  //               display: false
  //             },
  //               // labels: {
  //               //     usePointStyle: true,
  //               //     color: textColor
  //               // }

  //       }
  //   };
  // }

  async configuraGrafico(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const meses = this.data?.meses ?? [];
    const dentistasList = this.data?.dentistasList ?? [];
    const qtdConsultasDentistaMes = this.data?.qtdConsultasDentistaMes ?? [];
    const qtdProcedimentos = this.data?.qtdProcedimentos ?? [];
    const qtdEspecialidade = this.data?.qtdEspecialidade ?? [];
    const especialidades = this.data?.especialidades ?? [];

    this.dataLineDent = {
      labels: meses.reverse(), // Inverte a ordem dos meses
      datasets: dentistasList.map((dentista: any, index: any) => ({
        label: dentista.nome,
        data: qtdConsultasDentistaMes.map((mes: any )=> mes[index]),
        fill: false,
        tension: 0.4,
        borderColor: dentista.corDentista, // Você pode definir diferentes cores para cada dentista
        backgroundColor: 'transparent'
      }))
    };

    this.dataDoughnut = {
      labels: qtdProcedimentos.map((proc: any) => proc.nome),
      datasets: [{
        data: qtdProcedimentos.map((proc: any) => proc.quantidadeConsultas),
        backgroundColor: ['#7692bc', '#769cd2','#74a7e9', '#78b5f5', '#83c6fc', '#9cdafe'],
        hoverBackgroundColor: ['#a1bfd8', '#cedcef','#c6dbf7', '#c2ddfb', '#dbedfe', '#f0f9ff']
      }]
    };

    this.dataLine = {
      labels: meses,
      datasets: [
        {
          label: "Consultas",
          data: this.data.qtdMes,
          fill: true,
          borderColor: '#2070B4',
          tension: 0.4,
          backgroundColor: 'rgba(32, 112, 180, 0.2)'
        }
      ]
    };

    this.dataPie = {
      labels: especialidades.slice(0, 3).map((esp: any) => esp.tipo),
      datasets: [{
        data: qtdEspecialidade.slice(0, 3),
        backgroundColor: ['#7692bc', '#769cd2','#74a7e9'],
        hoverBackgroundColor: ['#a1bfd8', '#cedcef','#c6dbf7']
      }]
    };

    this.basicOptionsDent = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
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
      }
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
    };

    this.basicOptionsPie = {
      plugins: {
        legend: {
          display: false
        },
        // labels: {
        //     usePointStyle: true,
        //     color: textColor
        // }
      }
    };
  }


  criaFormulario(){
    this.formulario = this.formBuilder.group({

      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      dentista: ['', Validators.required],
      procedimento: ['', Validators.required],
      especialidade: ['', Validators.required]

    })
  }

  async filtrarDashboard(){
    console.log(this.formulario.value)
  }

  calculaPorcentagem(mesAnterior: number, mesAtual: number) {
    if(mesAnterior === 0){
      return ((mesAtual - mesAnterior ) / 1 ) * -1;
    }
    if(mesAtual === 0){
      return ((mesAnterior - mesAtual ) / 1 ) * -1;
    }
    return ((mesAtual - mesAnterior ) / mesAnterior ) * -1;

  }

  limparFiltros(): any {

  }

  toggleSidebar() {
    this.sidebarState = this.sidebarState === 'in' ? 'out' : 'in';
    this.sidebarVisible = !this.sidebarVisible;
  }


}

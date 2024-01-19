import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Consulta } from '../consulta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta-info',
  templateUrl: './consulta-info.component.html',
  styleUrls: ['./consulta-info.component.css']
})
export class ConsultaInfoComponent implements OnInit {


  @Input() consultaSelecionada: Consulta;
  @Output() closeModal = new EventEmitter<boolean>();

  items: MenuItem[] ;
  editar: boolean = false;
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService){

  }

  ngOnInit() {

    this.items = [{
          icon:'pi pi-fw pi-briefcase',
          label:"Consulta",
          items: [
            {
              label: 'Iniciar',
              icon: 'pi pi-fw pi-play',
              command: () => {
                this.messageService.add({ severity: 'info', summary: 'Consulta Iniciada', detail: 'A consulta do paciente foi iniciada!' });
                this.closeModal.emit(false)

              },
            },
            {
              label: 'Finalizar',
              icon: 'pi pi-fw pi-lock',
              command: () => {
                this.messageService.add({ severity: 'info', summary: 'Consulta Encerrada', detail: 'A consulta do paciente foi encerrada!' });
                this.closeModal.emit(false)
              },

            },
            {
                label: this.editar? 'Salvar': 'Editar',
                icon: 'pi pi-fw pi-pencil',
                command: () => {
                  this.editar = !this.editar;
                },
            },
            {
              label: 'Ausentar',
              icon: 'pi pi-fw pi-user-minus'
            },
            {
              separator: true
            },
            {
                label: 'Deletar',
                icon: 'pi pi-fw pi-trash'
            }
        ],
      },
      // {
      //     label:"Pagamentos",
      //     icon: 'pi pi-fw pi-dollar',
      //     items:[
      //       {
      //         label: 'Pagar',
      //         icon:'pi pi-fw pi-dollar',
      //       },
      //       {
      //         label: 'Novo',
      //         icon: 'pi pi-pw pi-plus',

      //       },
      //       {
      //         separator: true
      //       },
      //       {
      //         label: 'Export',
      //         icon: 'pi pi-fw pi-external-link'
      //       }
      //     ],
      // }
      ]

    this.criaFormulario(this.consultaSelecionada);
  }

  criaFormulario(consulta: Consulta) {
    this.formulario = this.formBuilder.group({
      id: [consulta.id],
      dataConsulta: [consulta.dataConsulta, Validators.required],
      dataConsultaReserva: [consulta.dataConsultaReserva, Validators.required],
      dataHoraInicioAtendimento: [consulta.dataHoraInicioAtendimento, Validators.required],
      dataHoraFimAtendimento: [consulta.dataHoraFimAtendimento, Validators.required],
      tempoPrevisto: [consulta.tempoPrevisto, Validators.required],
      dentista: [consulta.dentista, Validators.required],
      paciente: [consulta.paciente, Validators.required],
      observacao: [consulta.observacao, Validators.required]
    })
  }

  onSubmit() {

  }

}

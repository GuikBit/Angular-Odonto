import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/cliente/cliente';
import { Consulta } from '../consulta';
import { Dentista } from 'src/app/dentista/dentista';
import { ClienteService } from 'src/app/cliente.service';
import { DentistaService } from 'src/app/dentista.service';
import { ConsultaService } from 'src/app/consulta.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta-nova',
  templateUrl: './consulta-nova.component.html',
  styleUrls: ['./consulta-nova.component.css']
})
export class ConsultaNovaComponent implements OnInit {
  @Input() pacienteSelecionado: any;
  @Input() dentistaSelecionado: any;
  @Output() closeModal = new EventEmitter<boolean>();

  dentista: Dentista | undefined;
  paciente: Cliente | undefined;
  consulta: Consulta;

  dataConsultaOK: boolean;
  formulario: FormGroup;

  listaPaciente: any[];
  listaDentista: any[];
  listaEspecConsulta: any[];

  constructor(private formBuilder: FormBuilder, private servicePaciente: ClienteService, private serviceDentista: DentistaService,
    private serviceConsulta: ConsultaService, private messageService: MessageService){


    }


  async ngOnInit() {
      this.criaFormulario();
      if(this.pacienteSelecionado != null && this.pacienteSelecionado !=  undefined){
        this.formulario.get('paciente')?.setValue(this.pacienteSelecionado)
        this.serviceDentista.getDentistas().then((response)=>{
          this.listaDentista = response
        }).catch((erro)=>{
          this.formulario.get('dentista')?.setErrors({erro: true})
        })

      }
      if(this.dentistaSelecionado != null && this.dentistaSelecionado != undefined){
        this.consulta.dentista = this.dentistaSelecionado;
        this.servicePaciente.getPacientes().then((response) => {
          this.listaPaciente = response;
        }).catch((erro)=>{
          this.formulario.get('paciente')?.setErrors({erro: true})
        })

      }

      if(this.pacienteSelecionado == null && this.dentistaSelecionado == null){

        this.serviceDentista.getDentistas().then((response) => {
          this.listaDentista = response
        }).catch((erro)=>{
          this.formulario.get('dentista')?.setErrors({erro: true})
        })
        this.servicePaciente.getPacientes().then((response) => {
          this.listaPaciente = response;
        }).catch((erro)=>{
          this.formulario.get('paciente')?.setErrors({erro: true})
        })

      }
      this.serviceConsulta.getEspecConsulta().then((response)=>{
        this.listaEspecConsulta = response;
      }).catch((erro)=>{
        console.log("Erro", erro)
      })

    }
  limpaInformacoes() {
    if(this.pacienteSelecionado){
      this.pacienteSelecionado.consultas = [];
      this.pacienteSelecionado.responsavel = null;
      this.pacienteSelecionado.endereco = null;
      this.pacienteSelecionado.anamnese = null;
    }
    if(this.dentistaSelecionado){
      this.dentistaSelecionado.consultas = null;

    }

  }

  criaFormulario() {
    this.formulario = this.formBuilder.group({
      dataConsulta: ['', Validators.required],
      horaConsulta: ['', Validators.required],
      tempoPrevisto: ['', Validators.required],
      dentista: ['', Validators.required],
      paciente: ['', Validators.required],
      consultaEspecialidade: ['', Validators.required],
      observacao: ['']
    })
  }
  onSubmit(){
      this.limpaInformacoes();

      if(this.formulario.valid){
        this.novaConsulta()
        const jsonString = JSON.stringify(this.formulario.value, function (key, value) {
          if (value instanceof Date) {
            // Formata a data para uma string que inclui o fuso horário
            return value.toISOString();
          }
          return value;
        });
        console.log(jsonString);
        this.serviceConsulta.postConsulta(jsonString).then((response)=>{
          if(response.status === 200){
            this.closeModal.emit(false)
          }
        }).catch(()=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Aviso',
            detail: 'Houve erro na requisição para salvar a consulta.'
          })
        })

      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Aviso',
          detail: 'Houve erro nas informações digitadas, confira os campos obrigatórios!'
        })
      }
    }

    async novaConsulta() {
      if (this.formulario.valid) {
        const dataConsulta = new Date(this.formulario.get('dataConsulta')?.value);
        const horaConsulta = this.formulario.get('horaConsulta')?.value;
        const [hr, min] = horaConsulta.split(':');
        dataConsulta.setHours(parseInt(hr, 10), parseInt(min, 10));

        const dataAtual = new Date();
        const dataHoraConsulta = new Date(dataConsulta);
        dataHoraConsulta.setSeconds(0, 0);

        if (dataHoraConsulta > dataAtual) {
          console.log("Data ajustada: ",dataHoraConsulta)
          console.log("Formulario: ", this.formulario.get('dataConsulta')?.value)
          this.formulario.get('dataConsulta')?.setValue(dataHoraConsulta);
          console.log("Formulario Ajustada: ", this.formulario.get('dataConsulta')?.value)

        } else {
          this.formulario.get('dataConsulta')?.setValue('');
          this.formulario.get('horaConsulta')?.setValue('');
          this.messageService.add({
            severity: 'error',
            summary: 'Aviso',
            detail: 'A data e hora precisa ser posterior a atual.'
          })
        }
      }
    }
}

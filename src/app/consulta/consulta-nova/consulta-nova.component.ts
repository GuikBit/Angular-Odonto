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
  @Input() novaConsulta: Date;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() onlyClose = new EventEmitter<boolean>();

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
        this.serviceDentista.getDentistas().then((response) => {
          if(response != null){
            response.forEach((x: any) => {
              if (x.id === this.dentistaSelecionado) {
                this.dentistaSelecionado = x;
                this.formulario.get('dentista')?.setValue(this.dentistaSelecionado)
                return
              }
            });
          }
        })

        this.servicePaciente.getPacientes().then((response) => {
          this.listaPaciente = response;
        }).catch((erro)=>{
          this.formulario.get('paciente')?.setErrors({erro: true})
        })

      }
      if(this.novaConsulta != null && this.novaConsulta != undefined){
        this.formulario.get('dataConsulta')?.setValue(this.novaConsulta)
        console.log(this.formulario.get('dataConsulta')?.value)
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
        if(this.dataConsulta() && this.horaConsulta() ){
        this.serviceConsulta.postConsulta(this.formulario.value)
        .then(response =>{
          if(response?.status === 201 || response?.status === 200 ){
            this.closeModal.emit(false)
            this.limpaInformacoes();
          }
        }).catch(()=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Aviso',
            detail: 'Houve erro na requisição para salvar a consulta.'
          })
        })
        console.log(this.formulario.value)
        }
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Aviso',
          detail: 'Houve erro ao marcar a consulta, confira os campos obrigatórios!'
        })
      }
    }

    // validaConsulta(){
    //   if (this.dataConsulta()) {
    //     return true;
    //   }
    //   else{
    //     this.formulario.get('dataConsulta')?.setValue('');
    //     this.formulario.get('horaConsulta')?.setValue('');
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Aviso',
    //       detail: 'Houve um erro de digitação da Data e Hora, digite novamente.'
    //     })
    //     return false;
    //   }

    // }

    dataConsulta() {

        const dataConsulta = new Date(this.formulario.get('dataConsulta')?.value);
        const horaConsulta = this.formulario.get('horaConsulta')?.value;
        const [hr, min] = horaConsulta.split(':');
        dataConsulta.setHours(hr,min,0,0);
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);


        if (dataConsulta >= dataAtual) {
          return true;
        }else{
          this.formulario.get('dataConsulta')?.setValue('');
          this.formulario.get('horaConsulta')?.setValue('');
          this.messageService.add({
            severity: 'error',
            summary: 'Aviso',
            detail: 'Houve um erro de digitação da Data, digite novamente.'
          })
          return false;

        }
    }

    horaConsulta(){
      const horaConsulta = this.formulario.get('horaConsulta')?.value;
      const [hr, min] = horaConsulta.split(':');
      const hora = new Date().setHours(hr,min,0,0);
      const horaAtual = new Date().setSeconds(0,0);
      if((hr >= 0 && hr <= 23 && min >= 0 && min <= 59)){
        return true;
      }else{
        this.formulario.get('horaConsulta')?.setValue('');
          this.messageService.add({
            severity: 'error',
            summary: 'Aviso',
            detail: 'Houve um erro de digitação da Hora, digite novamente.'
          })
          return false;
      }

    }

    fecharModal(){
      this.onlyClose.emit(false);
    }
}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/class/cliente';
import { Consulta } from '../../class/consulta';
import { Dentista } from 'src/app/class/dentista';
import { ClienteService } from 'src/app/services/cliente.service';
import { DentistaService } from 'src/app/services/dentista.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MessageService } from 'primeng/api';

interface ConsultaDTO {
  observacao: string;
  procedimentos: string;
  dataConsulta: Date;
  horaConsulta: string;
  tempoPrevisto: number;
  pacienteId: number;
  dentistaId: number;
  pagamentoId: number;
  consultaEspecialidadeId: number;
  organizacaoId: number;
  nomePaciente: string | null;
  telefone: string | null;
}


@Component({
  selector: 'app-consulta-nova',
  templateUrl: './consulta-nova.component.html',
  styleUrls: ['./consulta-nova.component.css']
})
export class ConsultaNovaComponent implements OnInit{
  @Input() pacienteSelecionado: any;
  @Input() dentistaSelecionado: any;
  @Input() novaConsulta: Date | null;
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

  org: any;

  newConsulta: ConsultaDTO;

  consultaRapida: boolean = false;

  constructor(private formBuilder: FormBuilder, private servicePaciente: ClienteService, private serviceDentista: DentistaService,
    private serviceConsulta: ConsultaService, private messageService: MessageService){
      const organizacaoJson = localStorage.getItem('organizacao');

      if (organizacaoJson) {
        this.org = JSON.parse(organizacaoJson);
      }
    }


  async ngOnInit() {
      this.criaFormulario();

      if(this.pacienteSelecionado != null && this.pacienteSelecionado !=  undefined){
        this.formulario.get('paciente')?.setValue(this.pacienteSelecionado)
        this.serviceDentista.getDentistas(this.org.id).then((response)=>{
          this.listaDentista = response
        }).catch((erro)=>{
          this.formulario.get('dentista')?.setErrors({erro: true})
        })

      }

      if(this.dentistaSelecionado != null && this.dentistaSelecionado != undefined){
        this.serviceDentista.getDentistas(this.org.id).then((response) => {
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

        this.servicePaciente.getPacientes(this.org.id).then((response) => {
          this.listaPaciente = response;
        }).catch((erro)=>{
          this.formulario.get('paciente')?.setErrors({erro: true})
        })

      }

      if(this.novaConsulta != null && this.novaConsulta != undefined){
        //console.log(this.novaConsulta);
        this.formulario.get('dataConsulta')?.setValue(this.novaConsulta);
      }

      if(this.pacienteSelecionado == null && this.dentistaSelecionado == null){
        this.serviceDentista.getDentistas(this.org.id).then((response) => {
          this.listaDentista = response
        }).catch((erro)=>{
          this.formulario.get('dentista')?.setErrors({erro: true})
        })
        this.servicePaciente.getPacientes(this.org.id).then((response) => {
          this.listaPaciente = response;
        }).catch((erro)=>{
          this.formulario.get('paciente')?.setErrors({erro: true})
        })

      }
      this.serviceConsulta.getEspecConsulta().then((response)=>{
        this.listaEspecConsulta = response;
      }).catch((erro)=>{
       // console.log("Erro", erro)
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

    this.formulario.get('pacienteId')?.setValue(this.paciente?.id);
    this.formulario.get('dentistaId')?.setValue(this.dentista?.id);
  }

  criaFormulario() {
    this.formulario = this.formBuilder.group({

      dentista: ['', Validators.required],
      paciente: ['', Validators.required],
      dataConsulta: ['', Validators.required],
      horaConsulta: ['', Validators.required],
      tempoPrevisto: ['', Validators.required],
      consultaEspecialidade: ['', Validators.required],
      observacao: [''],
      organizacaoId: [this.org.id, Validators.required],
      nomePaciente: [],
      telefone: []
    })
  }
  onSubmit(){
      this.limpaInformacoes();
      if(this.consultaRapida){
        this.formulario.get('paciente')?.setValue(new Cliente());
      }
      console.log(this.formulario)

      if(this.formulario.valid){
        if(this.dataConsulta() && this.horaConsulta() ){
          const obj = this.formulario.get('paciente')?.value;
          this.newConsulta = {

            observacao: this.formulario.get('observacao')?.value,
            procedimentos: this.formulario.get('procedimentos')?.value,
            dataConsulta: this.formulario.get('dataConsulta')?.value,
            horaConsulta: this.formulario.get('horaConsulta')?.value,
            tempoPrevisto: this.formulario.get('tempoPrevisto')?.value,

            pacienteId: this.consultaRapida? null : obj.id,
            nomePaciente: this.consultaRapida? this.formulario.get('nomePaciente')?.value : null,
            telefone: this.consultaRapida? this.formulario.get('telefone')?.value : null,
            dentistaId: this.formulario.get('dentista')?.value.id,
            pagamentoId: this.formulario.get('pagamentoId')?.value,
            consultaEspecialidadeId: this.formulario.get('consultaEspecialidade')?.value.id,
            organizacaoId: this.formulario.get('organizacaoId')?.value

          };

          console.log(JSON.stringify(this.newConsulta))

          this.serviceConsulta.postConsulta(this.newConsulta)
          .then(response =>{
            if(response?.status === 201 || response?.status === 200 ){
              this.closeModal.emit(false)
              this.limpaInformacoes();
              this.formulario.reset();
            }
          }).catch(()=>{
            this.messageService.add({
              severity: 'error',
              summary: 'Aviso',
              detail: 'Houve erro na requisição para salvar a consulta.'
            })
          })

        }
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Aviso',
          detail: 'Houve erro ao marcar a consulta, confira os campos obrigatórios!'
        })
      }
    }
    ajustaEnvio(){
      this.formulario.get('pacienteId')?.setValue(this.formulario.get('pacienteId')?.value.id);
      this.formulario.get('dentistaId')?.setValue(this.formulario.get('dentistaId')?.value.id);
    }

    replaceTelefone(): void {
      const telefoneControl = this.formulario.get('telefone') ;
      if (telefoneControl) {
        let telefoneValue = telefoneControl.value.replace(/\D/g, '').substring(0, 11);
        const formattedTelefone = telefoneValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        telefoneControl.setValue(formattedTelefone);
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
      this.novaConsulta = null;
      this.formulario.get('dataConsulta')?.setValue('');
      this.onlyClose.emit(false);
    }
}

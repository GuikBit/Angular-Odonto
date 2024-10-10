
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Consulta } from '../../class/consulta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ConsultaService } from 'src/app/services/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  DialogService } from 'primeng/dynamicdialog';


interface Loading {
  iniciar: boolean;
  finalizar: boolean;
  editar: boolean;
  ausentar: boolean;
}

@Component({
  selector: 'app-consulta-info',
  templateUrl: './consulta-info.component.html',
  styleUrls: ['./consulta-info.component.css']
})

export class ConsultaInfoComponent implements OnInit, OnDestroy, OnChanges {



  @Input() consultaSelecionada: Consulta;
  @Output() reloading = new EventEmitter<Boolean>();
  @Output() closeModal = new EventEmitter<boolean>();

  loading: Loading = {
    iniciar: false,
    finalizar: false,
    editar: false,
    ausentar: false
  };

  formularioEditar: FormGroup;
  formularioProcedimentos: FormGroup;
  separatorExp: RegExp = /,| /;
  dataConsulta: any;
  horaConsulta: any;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: ConsultaService,
     private route: ActivatedRoute, private router: Router,public dialogService: DialogService, private cdr: ChangeDetectorRef){

  }

  ngOnDestroy() {
   // console.log("Cheguei aqui dentro do consulta info")
    if (this.formularioEditar) {
      this.formularioEditar.reset(); // Limpe os valores dos controles do formulário
      this.formularioEditar.disable(); // Desative o formulário para evitar interações
      //this.formularioEditar = null; // Atribua null ao formulário para destruí-lo

    }

  }

  async ngOnInit() {
    this.criaFormularioEditar();
    this.criaFormularioProcedimentos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['consultaSelecionada'] && !changes['consultaSelecionada'].firstChange) {
      this.criaFormularioEditar();
      this.criaFormularioProcedimentos();
    }
    this.loading.ausentar = false;
    this.loading.editar = false;
    this.loading.finalizar = false;
    this.loading.iniciar = false;
    this.dataConsulta = null;
    this.horaConsulta = null;

  }

  async criaFormularioEditar() {
    if(this.consultaSelecionada){
      const dataConsultaString = this.consultaSelecionada.dataConsulta.toString();
      let [data, hora] = dataConsultaString.split('T');
      this.dataConsulta = data;
      this.horaConsulta = hora;
      this.formularioEditar = this.formBuilder.group({
        dataConsulta: [data, Validators.required],
        horaConsulta: [hora, Validators.required],
      })

    }

  }

 async criaFormularioProcedimentos(){

    this.formularioProcedimentos = this.formBuilder.group({
      procedimentos: [this.consultaSelecionada.procedimentos !== ''? JSON.parse(this.consultaSelecionada.procedimentos): [] ,Validators.required]
    })
  }

  async salvarProcedimentos(){

      const procedimentos = JSON.stringify(this.formularioProcedimentos.get('procedimentos')?.value)

      if(procedimentos){

        this.consultaSelecionada.procedimentos = procedimentos;
        console.log(JSON.stringify(this.consultaSelecionada))
        await this.service.postProcedimentoConsulta(this.consultaSelecionada).then((response)=>{
          if(response == 200 || response == 201){
            this.messageService.add({
              severity: 'success',
              summary: 'Aviso',
              detail: 'Procedimentos salvo e finalizada'
            });
            this.reloading.emit(true);
          }

        }).catch((error)=>{
          console.log(error)
        })
      }

  }

  async buscarConsulta(id: any){
    if(id != null){
      await this.service.getConsultaById(id).then((response)=>{

        this.consultaSelecionada = response;
        console.log(this.consultaSelecionada)
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

  calcularIdade(dataNascimento: any) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const diffMeses = (hoje.getFullYear() - nascimento.getFullYear()) * 12 +
      hoje.getMonth() - nascimento.getMonth();

    const anos = Math.floor(diffMeses / 12);
    const meses = diffMeses % 12;

    if(anos <= 1 && meses <= 1 ){
      return `${anos} ano e ${meses} mês`;
    }
    else if(anos !== 1 && meses === 1 ){
      return `${anos} anos e ${meses} mês`;
    }
    else{
      return `${anos} anos e ${meses} meses`;
    }

  }

  deletarConsulta() {
  }

  presencaPaciente() {

    this.service.presencaPaciente(this.consultaSelecionada?.id).then(()=>{
      this.messageService.clear();
      this.messageService.add({
        severity: 'success',
        summary: 'Aviso',
        detail: 'Presença do paciente alterada...'
      })
    })
    this.reloading.emit(true);

  }

  ausentarPaciente() {
     this.loading.ausentar = true;
    if(this.verificaDataConsulta()){
    setTimeout(async () => {
      if(this.consultaSelecionada !== null){

        this.service.ausentarPaciente(this.consultaSelecionada?.id).then(()=>{
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Aviso',
            detail: 'Paciente ausentado com sucesso...'
          })
          this.loading.ausentar = false;
          this.reloading.emit(true);

        }).catch(()=>{
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Houve um erro ao encontrar a consulta, entre em contato com o suporte'
          })
          this.loading.finalizar = false;
        })
      }else{
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Houve um erro interno, entre em contato com o suporte'
        })
        this.loading.finalizar = false;
      }
    }, 500)
    }else{
      this.loading.ausentar = false;
    }
  }

  async salvarEdicao() {
    if(this.dataConsulta !== this.formularioEditar.get("dataConsulta")?.value || this.horaConsulta !== this.formularioEditar.get("horaConsulta")?.value){
      if(this.validaReagendamento()){

        const response = await this.service.putConsulta(this.consultaSelecionada.id, JSON.stringify(this.formularioEditar.value));

        if( response?.status == 200 || response?.status == 201){
          this.loading.editar = false;
          this.reloading.emit(true);
        }else{
          this.messageService.add({
            severity: 'danger',
            summary: 'Aviso',
            detail: "Houve um erro ao reagendar a consulta."
          })
        }
      }

    }else{
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: "Para reagendar uma consulta, altere a data e hora."
      })
    }

  }

   validaReagendamento(){
      const dataConsulta = new Date(this.dataConsulta);
      dataConsulta.setHours(0,0,0,0);
      const dataAtual = new Date();
      dataAtual.setHours(0, 0, 0, 0);

      if( this.dataValida(dataAtual) &&  this.horaValida()){
        return true;
      }
      else{
        return false;
      }
  }

  horaValida(){
    const horaConsulta = this.formularioEditar.get('horaConsulta')?.value;
    const [hr, min] = horaConsulta.split(':');
    if((hr >= 0 && hr <= 23 && min >= 0 && min <= 59)){
      return true;
    }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Aviso',
          detail: 'Houve um erro de digitação da Hora, digite novamente.'
        })
        return false;
    }

  }

 dataValida(dataAtual: Date) {
    const novaData = new Date(this.formularioEditar.get("dataConsulta")?.value);
    //console.log(novaData)
    novaData.setDate(novaData.getDate())
    novaData.setHours(0,0,0,0);

    if(novaData >= dataAtual){
      return true;
    }
    else{
      this.messageService.add({
        severity: 'error',
        summary: 'Aviso',
        detail: "A nova data nao pode ser anterior ao dia corrente"
      })
      return false;
    }

  }

  async regraReagendamento5dias() {
    const dataAtual = new Date();
    dataAtual.setDate(dataAtual.getDate() - 5);
    const dataConsulta = new Date(this.consultaSelecionada.dataConsulta);

    if (dataConsulta >= dataAtual) {
      return true;

    }else{
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'A consulta esta fora do periodo de 5 dias para reagendamento'
      })
      return false;
    }
  }

  finalizarConsulta(){

      this.loading.finalizar = true;
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Finalizando consulta...'
      })
      setTimeout(async () => {
        if(this.consultaSelecionada !== null){

          this.service.finalizarConsulta(this.consultaSelecionada?.id).then(()=>{
            this.messageService.clear();
            this.messageService.add({
              severity: 'success',
              summary: 'Aviso',
              detail: 'Consulta finalizada com sucesso...'
            })
            this.loading.finalizar = false;

            this.reloading.emit(true);

          }).catch(()=>{
            this.messageService.add({
              severity: 'warn',
              summary: 'Aviso',
              detail: 'Houve um erro ao encontrar a consulta, entre em contato com o suporte'
            })
            this.loading.finalizar = false;
          })
        }else{
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Houve um erro interno, entre em contato com o suporte'
          })
          this.loading.finalizar = false;
        }
      }, 1500)

  }

  iniciarConsulta() {
    this.loading.iniciar = true;
    if(this.verificaDataConsulta()){
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Iniciando consulta...'
    })
    setTimeout(async () => {
      if(this.consultaSelecionada !== null){

        this.service.iniciarConsulta(this.consultaSelecionada?.id).then((response)=>{
          this.messageService.clear();

          this.consultaSelecionada = response;

          this.messageService.add({
            severity: 'success',
            summary: 'Aviso',
            detail: 'Consulta iniciada com sucesso...'
          })
          this.loading.iniciar = false;
          this.reloading.emit(true);

        }).catch(()=>{
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Houve um erro ao encontrar a consulta, entre em contato com o suporte'
          })
          this.loading.iniciar = false;
        })
      }else{
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Houve um erro interno, entre em contato com o suporte'
        })
        this.loading.iniciar = false;
      }
    }, 1500);

  }else{
    this.loading.iniciar = false;
  }


  }

  verificaDataConsulta(){
    if(this.consultaSelecionada){
      const atual = new Date();
      const dataConsulta = new Date(this.consultaSelecionada.dataConsulta)
      if(dataConsulta.toLocaleDateString() == atual.toLocaleDateString()){
        return true;
      }else{
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'A consulta não está agendada para o dia corrente'
        })
        return false;
      }
    }else{
      return false;
    }

  }

  async preparaEdicao() {
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    if(await this.regraReagendamento5dias()){
      this.loading.editar = true;
    }

  }

  async fecharJanela() {
    this.closeModal.emit(false);
  }

}

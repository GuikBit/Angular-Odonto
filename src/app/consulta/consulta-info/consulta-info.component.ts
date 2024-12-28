
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Consulta } from '../../class/consulta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ConsultaService } from 'src/app/services/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  DialogService } from 'primeng/dynamicdialog';


interface Loading {
  procedimento: boolean;
  editar: boolean;
  ausentar: boolean;
  status: boolean;
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
    procedimento: false,
    editar: false,
    ausentar: false,
    status: false
  };

  pagamentoInfo: boolean = false;

  formularioEditar: FormGroup;
  formularioProcedimentos: FormGroup;
  separatorExp: RegExp = /,| /;
  dataConsulta: any;
  horaConsulta: any;
  desableProcd: boolean;

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
    this.loading.procedimento = false;
    this.dataConsulta = null;
    this.horaConsulta = null;

  }

  criaFormularioEditar() {
    if (this.consultaSelecionada) {
      const dataConsultaString = this.consultaSelecionada.dataConsulta.toString();
      const dataConsulta = new Date(dataConsultaString);

      this.formularioEditar = this.formBuilder.group({
        dataConsulta: [dataConsulta, Validators.required],
        horaConsulta: [dataConsulta, Validators.required],
      });
    }
  }
  aplicarMascaraHora(event: any): void {
    // let valor = event.target.value;
    // console.log()
    // // Remove caracteres não numéricos
    // valor = valor.replace(/\D/g, '');

    // if (valor.length > 2) {
    //   valor = valor.replace(/(\d{2})(\d)/, '$1:$2');
    // }

    // // Limita o valor em 5 caracteres para o formato HH:mm
    // valor = valor.substring(0, 5);

    // // Atualiza o campo com o valor formatado
    // this.formularioEditar.get('horaConsulta')?.setValue(valor);
  }

  combinarDataHora(): Date | null {
    const dataConsulta = this.formularioEditar.get('dataConsulta')?.value;
    const horaConsulta = this.formularioEditar.get('horaConsulta')?.value;

    if (!dataConsulta || !horaConsulta) {
      return null; // Retorna null se algum campo estiver vazio
    }

    // Extrai a data (dia, mês, ano) e hora (hora, minuto) dos controles
    const data = new Date(dataConsulta);
    const hora = new Date(horaConsulta);

    // Define a hora e minuto na data principal
    data.setHours(hora.getHours());
    data.setMinutes(hora.getMinutes());

    return data;
  }

  async criaFormularioProcedimentos() {
    this.desableProcd = this.consultaSelecionada.status === 4 ? false : true;

    const procedimentos = this.consultaSelecionada.procedimentos
      ? JSON.parse(this.consultaSelecionada.procedimentos)
      : [];

    this.formularioProcedimentos = this.formBuilder.group({
      procedimentos: [{ value: procedimentos, disabled: this.desableProcd }, Validators.required]
    });
  }

  async salvarProcedimentos(){
      this.desableProcd = !this.desableProcd;
      const procedimentos = JSON.stringify(this.formularioProcedimentos.get('procedimentos')?.value);

      console.log(procedimentos);
      if(procedimentos){
        //console.log(JSON.stringify(this.consultaSelecionada))
        // await this.service.pacthProcedimentoConsulta(this.consultaSelecionada.id, procedimentos).then((response)=>{
        //   if(response == 200 || response == 201){
        //     this.messageService.add({
        //       severity: 'success',
        //       summary: 'Aviso',
        //       detail: 'Procedimentos salvo e finalizada'
        //     });
        //     this.reloading.emit(true);
        //   }

        // }).catch((error)=>{
        //   console.log(error)
        // })
      }

  }

  async buscarConsulta(id: any){
    if(id != null){
      await this.service.getConsultaById(id).then((response)=>{
        if(response?.status === 200 || response?.status === 201){
          this.consultaSelecionada = response.data;
          console.log(this.consultaSelecionada)        }

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

  abrirPagamentoConsultaSelecionada(){

    this.pagamentoInfo = true;

  }

  presencaPaciente() {
    //verificar o reload da tela
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

        })
      }else{
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Houve um erro interno, entre em contato com o suporte'
        })

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

      this.loading.status = true;
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
            this.loading.status = false;

            this.reloading.emit(true);

          }).catch(()=>{
            this.messageService.add({
              severity: 'warn',
              summary: 'Aviso',
              detail: 'Houve um erro ao encontrar a consulta, entre em contato com o suporte'
            })
            this.loading.status = false;
          })
        }else{
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Houve um erro interno, entre em contato com o suporte'
          })
          this.loading.status = false;
        }
      }, 1500)

  }

  iniciarConsulta() {
    this.loading.status = true;
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
          this.loading.status = false;
          this.reloading.emit(true);

        }).catch(()=>{
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Houve um erro ao encontrar a consulta, entre em contato com o suporte'
          })
          this.loading.status = false;
        })
      }else{
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Houve um erro interno, entre em contato com o suporte'
        })
        this.loading.status = false;
      }
    }, 1500);

  }else{
    this.loading.status = false;
  }


  }

  alteraStatusConsulta(status: number){
    this.loading.status = true;
    let msg;
    if(status == 1){
      msg = 'Status da consulta alterado com sucesso!'
    }else if(status == 2){

    }else if(status == 3){

    }else if(status == 4){

    }else if(status == 5){

    }else{

    }
    setTimeout(async () => {
      if(this.consultaSelecionada !== null){

        this.service.statusConsulta(this.consultaSelecionada?.id, status).then((response)=>{
          if(response?.status === 200 || response?.status === 201){
            this.consultaSelecionada = response.data;
            this.messageService.clear();

            //this.loading.iniciar = false;
            this.loading.status = false;
            this.reloading.emit(true);

          }





        }).catch(()=>{
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Houve um erro ao encontrar a consulta, entre em contato com o suporte'
          })
          this.loading.status = false;
        })
      }else{
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Houve um erro interno, entre em contato com o suporte'
        })
        this.loading.status = false;
      }
    }, 1500);
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

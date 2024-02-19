import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Consulta } from '../consulta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ConsultaService } from 'src/app/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';


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

export class ConsultaInfoComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  consultaSelecionada: Consulta ;
  formaCalculo: any[] | undefined;
  formaPagamento: any[] | undefined;
  parcelas: any[] | undefined;

  loading: Loading = {
    iniciar: false,
    finalizar: false,
    editar: false,
    ausentar: false
  };
  valor: number = 0.0;
  formulario: FormGroup;
  pagamentoInfo: boolean = true;
  values: string[] | undefined;
  separatorExp: RegExp = /,| /;
  exame: string[] = [];

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: ConsultaService,
     private route: ActivatedRoute, private router: Router){

  }

  async ngOnInit() {

    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    })
    this.formaPagamento = [
      { label: 'Pix', value: '1', icon: 'pi pi-arrow-right-arrow-left' },
      { label: 'Dinheiro', value: '2', icon: 'pi pi-money-bill' },
      { label: 'Cartão', value: '3', icon: 'pi pi-credit-card' },
      { label: 'Outro', value: '4', icon: 'pi pi-book' }
    ]
    this.parcelas = [
      { label: 'À vista', value: '1', },
      { label: 'Parcelado 2x', value: '2',  },
      { label: 'Parcelado 3x', value: '3',  },
      { label: 'Parcelado 4x', value: '4',  },
      { label: 'Parcelado 5x', value: '5', },
      { label: 'Parcelado 6x', value: '6', },
    ]

    this.formaCalculo = [
      { label: 'Dinheiro', value: '1', icon: 'pi pi-money-bill' },
      { label: 'Porcentagem', value: '2', icon: 'pi pi-percentage' }

    ];

    if(id != undefined && id != null){
      await this.buscarConsulta(id);

      await this.criaFormulario(this.consultaSelecionada);
      await this.calculoValorConsulta();

    }else{

    }


  }

  criaFormulario(consulta: Consulta) {
    this.formulario = this.formBuilder.group({

      dataConsulta: ['', Validators.required],
      dataConsultaReserva: ['', Validators.required],
      dataHoraInicioAtendimento: ['', Validators.required],
      dataHoraFimAtendimento: ['', Validators.required],
      tempoPrevisto: ['', Validators.required],
      dentista: ['', Validators.required],
      paciente: ['', Validators.required],
      observacao: ['', Validators.required],
      procedimentos: ['', Validators.required],
      formaPagamento: ['', Validators.required],
      parcelas: ['', Validators.required],
      formaCalculo: [1, Validators.required],
      desconto: ['', Validators.required],
      acrescimo: ['', Validators.required],
      total: ['', Validators.required]
    })


  }

  onSubmit() {

  }

  pagamento() {
    this.pagamentoInfo = !this.pagamentoInfo;
  }

  async buscarConsulta(id: any){
    if(id != null){
      await this.service.getConsultaById(id).then((response)=>{
        this.consultaSelecionada = response;

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
      return `${anos} anos e ${meses} mêses`;
    }

  }
  abrirwhatsapp() {
    console.log(this.consultaSelecionada.paciente.telefone)
    if(this.consultaSelecionada.paciente.telefone !== null && this.consultaSelecionada.paciente.telefone !== undefined){
      const tel = this.consultaSelecionada.paciente.telefone;
      const num = tel.replace(/[^\d]/g, "");
      window.open(`https://wa.me/${num}`, '_blank')
    }

  }
  deletarConsulta() {


  }
  presencaPaciente() {
    this.service.presencaPaciente(this.consultaSelecionada.id).then(()=>{
      this.messageService.clear();
      this.messageService.add({
        severity: 'success',
        summary: 'Aviso',
        detail: 'Presença do paciente alterada...'
      })
      this.ngOnInit();
    })
  }
  ausentarPaciente() {
    this.loading.ausentar = true;
    if(this.verificaDataConsulta()){
    setTimeout(async () => {
      if(this.consultaSelecionada !== null){

        this.service.ausentarPaciente(this.consultaSelecionada.id).then(()=>{
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Aviso',
            detail: 'Paciente ausentado com sucesso...'
          })
          this.loading.finalizar = false;

          this.router.navigate(['/consultas']);

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
    }else{
      this.loading.ausentar = false;
    }
  }

  salvarEdicao() {
    this.loading.editar = false;

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

        this.service.finalizarConsulta(this.consultaSelecionada.id).then(()=>{
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Aviso',
            detail: 'Consulta finalizada com sucesso...'
          })
          this.loading.finalizar = false;

          this.ngOnInit();

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

        this.service.iniciarConsulta(this.consultaSelecionada.id).then(()=>{
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Aviso',
            detail: 'Consulta iniciada com sucesso...'
          })
          this.loading.iniciar = false;

          this.ngOnInit();

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
  }

  async calculoValorConsulta() {
    if(this.consultaSelecionada !== null){
      const precoBase = this.consultaSelecionada.consultaEspecialidade.valorBase;
      const acrecimo = this.formulario.get('acrescimo')?.value === null || undefined? 0 : this.formulario.get('acrescimo')?.value;
      const desconto = this.formulario.get('desconto')?.value === null || undefined? 0 : this.formulario.get('desconto')?.value;

      const precoCalculado = precoBase + acrecimo - desconto;

      if(this.formulario.get('formaCalculo')?.value == 2){
        this.valor = precoCalculado;
      }else{
        this.valor = (this.consultaSelecionada.consultaEspecialidade.valorBase) - (this.formulario.get('desconto')?.value)
        + (this.formulario.get('acrescimo')?.value);
      }
    }

  }

}

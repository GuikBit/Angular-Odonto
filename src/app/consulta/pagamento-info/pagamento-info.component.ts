
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef, NgZone, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { Consulta } from '../consulta';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConsultaService } from 'src/app/consulta.service';
import { FileUploadEvent } from 'primeng/fileupload';
import { Parcela } from '../parcela';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-pagamento-info',
  standalone: false,
  templateUrl: './pagamento-info.component.html',
  styleUrl: './pagamento-info.component.css'
})
export class PagamentoInfoComponent implements OnInit {

  @Input() consultaSelecionadaPg: Consulta;
  @Output() reloading = new EventEmitter<boolean>();

  formaCalculo: any[] ;
  formaPagamento: any[] ;
  valor: any | undefined;
  parcelas: any[] ;
  formulario: FormGroup;

  addEntrada: boolean = false;
  entrada: Parcela | null = null;
  index: any;


  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: ConsultaService, private cdRef: ChangeDetectorRef, private ngZone: NgZone) { }


  // async ngOnChanges(changes: SimpleChanges) {
  //    if (changes['consultaSelecionadaPg'] && !changes['consultaSelecionadaPg'].firstChange) {
  //      //this.calculoValorConsulta();
  //       this.formulario.get('parcelas')?.setValue(1)
  //       this.index = this.consultaSelecionadaPg.pagamento.qtdParcela !== null &&  this.consultaSelecionadaPg.pagamento.parcelas.length > 1  ? this.consultaSelecionadaPg.pagamento.qtdParcela - 2 : 0 ;

  //     }

  // //   console.log(this.consultaSelecionadaPg.pagamento.qtdParcela !== null &&  this.consultaSelecionadaPg.pagamento.parcelas.length > 1)
  //  }

  async ngOnInit() {
    this.formaPagamento = [
      { label: 'Pix',      value: 1, icon: 'pi pi-arrow-right-arrow-left' },
      { label: 'Dinheiro', value: 2, icon: 'pi pi-money-bill' },
      { label: 'Cartão',   value: 3, icon: 'pi pi-credit-card' },
      { label: 'Outro',    value: 4, icon: 'pi pi-book' }
    ];
    this.parcelas = [
      { label: 'À vista',         value: 1, },
      { label: 'Parcelado em 2x', value: 2, },
      { label: 'Parcelado em 3x', value: 3, },
      { label: 'Parcelado em 4x', value: 4, },
      { label: 'Parcelado em 5x', value: 5, },
      { label: 'Parcelado em 6x', value: 6, },
    ];
    this.formaCalculo = [
      { label: 'Dinheiro',    value: '1', icon: 'pi pi-money-bill' },
      { label: 'Porcentagem', value: '2', icon: 'pi pi-percentage' }

    ];

    this.criarFormulario();

    if(!this.consultaSelecionadaPg.pagamento.fatFechado){
      this.calculoValorConsulta();
    }
    //this.valor = this.consultaSelecionadaPg.consultaEspecialidade.valorBase;

    this.index = this.consultaSelecionadaPg.pagamento.parcelas.length > 1  ? this.consultaSelecionadaPg.pagamento.parcelas.length - 1 : 0 ;

  }

  async calculoValorConsulta() {
    if(this.consultaSelecionadaPg !== null && this.validaEntradas()){
      const precoBase = this.consultaSelecionadaPg.consultaEspecialidade.valorBase;
      const acrecimo = this.formulario?.get('acrescimo')?.value === null || undefined || '' ? 0 : this.formulario.get('acrescimo')?.value;
      const desconto = this.formulario?.get('desconto')?.value === null || undefined || '' ? 0 : this.formulario.get('desconto')?.value;
      const entrada = this.formulario?.get('entrada')?.value === null || undefined || '' ? 0 : this.formulario.get('entrada')?.value;

      const precoCalculado = (precoBase + acrecimo - desconto) - entrada;

      this.valor = precoCalculado;

      this.ajustaParcelas();

    }
  }

  validaEntradas(){

    const acrecimo = this.formulario?.get('acrescimo')?.value;
    const desconto = this.formulario?.get('desconto')?.value;
    const entrada = this.formulario?.get('entrada')?.value;
    const valorConsulta = this.consultaSelecionadaPg.consultaEspecialidade.valorBase + acrecimo;

    console.log("Desconto: ", desconto)
    console.log("Valor consulta: ", valorConsulta)

    if(desconto > valorConsulta){

      this.messageService.add({
        severity: 'error',
        summary: 'Atenção',
        detail: 'O valor do desconto não pode ser maior que o valor da consulta.'
      })

      this.formulario?.get('desconto')?.setValue('');
      this.formulario?.get('acrecimo')?.setValue('');
      this.formulario?.get('entrada')?.setValue('');
      this.valor = 0;
      this.reloading.emit(true);

      return false;
    }
    if(entrada > valorConsulta){

      this.messageService.add({
        severity: 'error',
        summary: 'Atenção',
        detail: 'O valor da entrada não pode ser maior que o valor da consulta.'
      })

      this.formulario?.get('entrada')?.setValue('');
      this.formulario?.get('desconto')?.setValue('');
      this.formulario?.get('acrecimo')?.setValue('');
      this.valor = 0;
      this.reloading.emit(true);

      return false;
    }

    return true;
  }

  async onSubmit(){
    //console.log(this.consultaSelecionadaPg.pagamento)
    if(this.entrada !== null){
      this.entrada.valorParcela = this.formulario.get('entrada')?.value
      this.consultaSelecionadaPg.pagamento.parcelas.push(this.entrada)
    }

    //console.log(this.consultaSelecionadaPg.pagamento)

    this.service.salvarPagamento(this.consultaSelecionadaPg).then((response) => {
      if(response){
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Situacao financeira da consulta, salva com sucesso.'
        })
        this.reloading.emit(true);
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Aviso',
          detail: 'Houve um erro ao salvar o financeiro da consulta.'
        })
      }
    }).catch((error)=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Aviso',
        detail: 'Houve um erro interno ao salvar o financeiro da consulta.'
      })
    })

  }

  async criarFormulario(){

    this.formulario = this.formBuilder.group({
      formaPagamento: ['', Validators.required],
      parcelas: [this.parcelas[0].value,Validators.required],
      formaCalculo: ['', Validators.required],
      desconto: ['', Validators.required],
      acrescimo: ['', Validators.required],
      entrada: ['']
    })

  }

  onUpload($event: FileUploadEvent) {

  }

  async ajustaParcelas() {

    if(this.formulario.get('parcelas')?.value === 1){

      if(this.consultaSelecionadaPg.pagamento.parcelas.length > 1 && !this.addEntrada){
        while(this.consultaSelecionadaPg.pagamento.parcelas.length > 1){
          this.consultaSelecionadaPg.pagamento.parcelas.pop();
        }
      }
      this.ajustaValorParcelas(1);

    }else if(this.formulario.get('parcelas')?.value === 2){
      //console.log(this.formulario.get('parcelas')?.value)
      this.newParcela(2);

    }else if(this.formulario.get('parcelas')?.value === 3){

      this.newParcela(3);
      this.newParcela(3);

    }else if(this.formulario.get('parcelas')?.value === 4){

      this.newParcela(4);
      this.newParcela(4);
      this.newParcela(4);

    }else if(this.formulario.get('parcelas')?.value === 5){

      this.newParcela(5);
      this.newParcela(5);
      this.newParcela(5);
      this.newParcela(5);


    }else if(this.formulario.get('parcelas')?.value === 6){

      this.newParcela(6);
      this.newParcela(6);
      this.newParcela(6);
      this.newParcela(6);
      this.newParcela(6);

    }

  }

  async newParcela(qtdP: any){

    if(this.consultaSelecionadaPg.pagamento.parcelas.length >= qtdP){

      while(this.consultaSelecionadaPg.pagamento.parcelas.length > qtdP){
        this.consultaSelecionadaPg.pagamento.parcelas.pop();
      }

    }else{

      const ultimaParcela = this.consultaSelecionadaPg.pagamento.parcelas[this.consultaSelecionadaPg.pagamento.parcelas.length - 1]

      const data = new Date(ultimaParcela.dataVencimento);
      data.setMonth(data.getMonth() + 1);

      let novaParcela = new Parcela();
      novaParcela.dataVencimento = data;
      novaParcela.pago = false;

      this.consultaSelecionadaPg.pagamento.parcelas.push(novaParcela);
    }

    this.ajustaValorParcelas(qtdP);

    //this.cdRef.detectChanges();
  }

  async criaEntrada(){
    if(!this.addEntrada){
      this.addEntrada = true;
      const pParcela = this.consultaSelecionadaPg.pagamento.parcelas[0];
      const data = new Date(pParcela.dataVencimento);
      data.setMonth(data.getMonth() + 1);
      this.consultaSelecionadaPg.pagamento.parcelas[0].dataVencimento = data;

      this.entrada = new Parcela();
      this.entrada.dataVencimento = pParcela.dataVencimento;
      this.entrada.ehEntrada = true;
    }


  }

  async ajustaValorParcelas(qtd: any){

    this.consultaSelecionadaPg.pagamento.parcelas.forEach( item => {
      item.valorParcela = this.calcularValorParcela(qtd);

    });


    //console.log(this.consultaSelecionadaPg.pagamento)
  }

  calcularValorParcela(qtdP: any) {
    return this.valor / qtdP ;
  }

  async excluirEntrada(){
     this.addEntrada = false;
     this.entrada = null;
     this.formulario.get('entrada')?.setValue('');
     this.calculoValorConsulta();
  }

  async salvarPagamentoParcela(id: any){
    console.log(this.formulario.value)
  }

  habilitaBotao(parcela: Parcela){
    const dataAtual = new Date();
    const dataConsulta = new Date(parcela.dataVencimento);
    console.log("Data do vencimento da parcela: ", dataConsulta)
    console.log(dataAtual.getMonth() + 1,dataConsulta.getMonth() + 1, dataAtual.getMonth() + 1 === dataConsulta.getMonth() + 1)

    if(dataAtual.getMonth() + 1 === dataConsulta.getMonth() + 1){
      return false;
    }else{
      return true;
    }
  }
}

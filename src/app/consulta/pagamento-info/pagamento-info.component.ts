
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef, NgZone  } from '@angular/core';
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
export class PagamentoInfoComponent implements OnInit, OnChanges {

  @Input() consultaSelecionadaPg: Consulta;

  formaCalculo: any[] | undefined;
  formaPagamento: any[] | undefined;
  valor: any | undefined;
  parcelas: any[] ;
  formulario: FormGroup;

  addEntrada: boolean = false;
  entrada: Parcela;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: ConsultaService, private cdRef: ChangeDetectorRef, private ngZone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['consultaSelecionadaPg'] && !changes['consultaSelecionadaPg'].firstChange) {
      this.calculoValorConsulta();
    }
  }

  async ngOnInit() {

    this.formaPagamento = [
      { label: 'Pix', value: '1', icon: 'pi pi-arrow-right-arrow-left' },
      { label: 'Dinheiro', value: '2', icon: 'pi pi-money-bill' },
      { label: 'Cartão', value: '3', icon: 'pi pi-credit-card' },
      { label: 'Outro', value: '4', icon: 'pi pi-book' }
    ]
    this.parcelas = [
      { label: 'À vista', value: '1', },
      { label: 'Parcelado em 2x', value: '2',  },
      { label: 'Parcelado em 3x', value: '3',  },
      { label: 'Parcelado em 4x', value: '4',  },
      { label: 'Parcelado em 5x', value: '5', },
      { label: 'Parcelado em 6x', value: '6', },
    ]

    this.formaCalculo = [
      { label: 'Dinheiro', value: '1', icon: 'pi pi-money-bill' },
      { label: 'Porcentagem', value: '2', icon: 'pi pi-percentage' }

    ];

    this.criarFormulario();
    this.calculoValorConsulta();
  }

  async calculoValorConsulta() {
    if(this.consultaSelecionadaPg !== null){
      const precoBase = this.consultaSelecionadaPg.consultaEspecialidade.valorBase;
      const acrecimo = this.formulario.get('acrescimo')?.value === null || undefined || ''? 0 : this.formulario.get('acrescimo')?.value;
      const desconto = this.formulario.get('desconto')?.value === null || undefined || ''? 0 : this.formulario.get('desconto')?.value;
      const entrada = this.formulario.get('entrada')?.value === null || undefined || ''? 0 : this.formulario.get('entrada')?.value;

      const precoCalculado = (precoBase + acrecimo - desconto) - entrada;

      this.valor = precoCalculado;
      this.ajustaParcelas();
    }
  }

  onSubmit(){
    if(this.entrada !== null){
      this.entrada.valorParcela = this.formulario.get('entrada')?.value
      this.consultaSelecionadaPg.pagamento.parcelas.push(this.entrada)
    }

    console.log(this.consultaSelecionadaPg.pagamento)

  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      formaPagamento: ['', Validators.required],
      parcelas: [this.parcelas[0].value, Validators.required],
      formaCalculo: ['', Validators.required],
      desconto: ['', Validators.required],
      acrescimo: ['', Validators.required],
      entrada: ['']
    })
  }

  onUpload($event: FileUploadEvent) {

  }

  async ajustaParcelas() {

    if(this.formulario.get('parcelas')?.value === '1'){

      if(this.consultaSelecionadaPg.pagamento.parcelas.length > 1 && !this.addEntrada){
        while(this.consultaSelecionadaPg.pagamento.parcelas.length > 1){
          this.consultaSelecionadaPg.pagamento.parcelas.pop();
        }
      }
      this.ajustaValorParcelas(1);

    }else if(this.formulario.get('parcelas')?.value === '2'){

      this.newParcela(2);

    }else if(this.formulario.get('parcelas')?.value === '3'){

      this.newParcela(3);
      this.newParcela(3);

    }else if(this.formulario.get('parcelas')?.value === '4'){

      this.newParcela(4);
      this.newParcela(4);
      this.newParcela(4);

    }else if(this.formulario.get('parcelas')?.value === '5'){

      this.newParcela(5);
      this.newParcela(5);
      this.newParcela(5);
      this.newParcela(5);


    }else if(this.formulario.get('parcelas')?.value === '6'){

      this.newParcela(6);
      this.newParcela(6);
      this.newParcela(6);
      this.newParcela(6);
      this.newParcela(6);

    }

  }

  newParcela(qtdP: any){

    if(this.consultaSelecionadaPg.pagamento.parcelas.length >= qtdP){

      while(this.consultaSelecionadaPg.pagamento.parcelas.length > qtdP){
        this.consultaSelecionadaPg.pagamento.parcelas.pop();
      }

    }else{

      const ultimaParcela = this.consultaSelecionadaPg.pagamento.parcelas[0]

      const data = new Date(ultimaParcela.dataVencimento);
      data.setMonth(data.getMonth() + 1);

      let novaParcela = new Parcela();
      novaParcela.dataVencimento = data;

      this.consultaSelecionadaPg.pagamento.parcelas.push(novaParcela);
    }

    this.ajustaValorParcelas(qtdP);

    this.cdRef.detectChanges();
  }

  // criaEntrada(){
  //   this.consultaSelecionadaPg.pagamento.parcelas.forEach(item => {
  //     if(item.ehEntrada === true){
  //       return;
  //     }
  //   });
  //   const pParcela = this.consultaSelecionadaPg.pagamento.parcelas[0]
  //   const data = new Date(pParcela.dataVencimento);
  //   data.setMonth(data.getMonth() + 1);
  //   this.consultaSelecionadaPg.pagamento.parcelas[0].dataVencimento = data;

  //   let novaParcela = new Parcela();
  //   novaParcela.dataVencimento = pParcela.dataVencimento;
  //   novaParcela.valorParcela = this.formulario.get('entrada')?.value
  //   novaParcela.ehEntrada = true;

  //   this.consultaSelecionadaPg.pagamento.parcelas.push(novaParcela);
  // }

  criaEntrada(){
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

  ajustaValorParcelas(qtd: any){
    this.consultaSelecionadaPg.pagamento.parcelas.forEach( item => {
      item.valorParcela = this.calcularValorParcela(qtd)
    });
    this.cdRef.detectChanges();
  }

  calcularValorParcela(qtdP: any) {
    return this.valor / qtdP ;
  }

  calculaValorTotalParcelas() {
    if(this.consultaSelecionadaPg.pagamento.parcelas){
      let valor: number;
      this.consultaSelecionadaPg.pagamento.parcelas.forEach( item => {
        valor += item.valorParcela;
      });
    }
   return this.valor;
  }
  excluirEntrada(){
    // this.entrada = new Parcela();
    // this.formulario.get('entrada')?.setValue('');
    // this.consultaSelecionadaPg.pagamento.parcelas.pop();
    // this.ajustaValorParcelas(this.consultaSelecionadaPg.pagamento.parcelas.length);
    // this.addEntrada = false;
  }

}

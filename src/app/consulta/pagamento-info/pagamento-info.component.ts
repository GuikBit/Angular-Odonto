import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { Consulta } from '../consulta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConsultaService } from 'src/app/consulta.service';

@Component({
  selector: 'app-pagamento-info',
  standalone: false,
  templateUrl: './pagamento-info.component.html',
  styleUrl: './pagamento-info.component.css'
})
export class PagamentoInfoComponent implements OnInit {

  @Input() consultaSelecionadaPg: Consulta;

  formaCalculo: any[] | undefined;
  formaPagamento: any[] | undefined;
  valor: any | undefined;
  parcelas: any[] | undefined;
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: ConsultaService,) { }

  async ngOnInit() {
    console.log("Passei por aqui")
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

      const precoCalculado = precoBase + acrecimo - desconto;

      if(this.formulario.get('formaCalculo')?.value == 2){
        this.valor = precoCalculado;
      }else{
        this.valor = (this.consultaSelecionadaPg.consultaEspecialidade.valorBase) - (desconto)
        + (acrecimo);
      }
    }

  }

  onSubmit(){

  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      formaPagamento: ['', Validators.required],
      parcelas: ['', Validators.required],
      formaCalculo: ['', Validators.required],
      desconto: ['', Validators.required],
      acrescimo: ['', Validators.required],
    })
  }

}

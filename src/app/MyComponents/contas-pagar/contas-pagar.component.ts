import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ConstaReceber } from 'src/app/admin/classes';

@Component({
  selector: 'app-contas-pagar',
  templateUrl: './contas-pagar.component.html',
  styleUrl: './contas-pagar.component.css'
})
export class ContasPagarComponent implements OnInit {

  contasPagar: ConstaReceber[];
  visible: boolean = false;

  formulario: FormGroup;

  products: any[] = [
    {
      id: 1,
      categoria: 'Luz',
      descricao: '',
      valor: 145.89,
      qtd: 1,
      dataVencimento: '12/04/2024',
      dataPagamento: '10/04/2024'
    },
    {
      id: 2,
      categoria: 'Agua',
      descricao: '',
      valor: 45.89,
      qtd: 1,
      dataVencimento: '16/04/2024',
      dataPagamento: '15/04/2024'
    }
  ];

  statuses!: SelectItem[];

  clonedProducts: { [s: string]: any } = {};

  constructor(private formBuilder: FormBuilder, private messageService: MessageService){}
  ngOnInit(){
    this.criaFormulario();

    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' }
  ];
  }
  onRowEditInit(product: any) {
    this.clonedProducts[product.id as string] = { ...product };
}

onRowEditSave(product: any) {
    if (product.valor > 0) {
        delete this.clonedProducts[product.id as string];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
}

onRowEditCancel(product: any, index: number) {
    this.products[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
}

  showDialog() {
      this.visible = true;
  }

  criaFormulario() {
    this.formulario = this.formBuilder.group({
      dataPagamento: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      valor: ['', Validators.required],
      qtd: ['', Validators.required],
      observacao: ['']
    })
  }
  fecharModal() {

    }
    onSubmit() {

    }


}

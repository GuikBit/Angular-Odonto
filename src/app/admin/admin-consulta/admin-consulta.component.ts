import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MessageService, ConfirmEventType, SelectItem, ConfirmationService } from 'primeng/api';
import { isEmpty } from 'rxjs';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-admin-consulta',
  templateUrl: './admin-consulta.component.html',
  styleUrl: './admin-consulta.component.css',
  providers: [ConfirmationService]
})
export class AdminConsultaComponent  implements OnInit{

  listaEspecConsulta: any[];

  novoProcedimento: boolean = false;

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

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private serviceConsulta: ConsultaService, private confirmationService: ConfirmationService){}

  ngOnInit(){
    this.criaFormulario();
    this.buscaEspecialidade();

    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];



  }
  onRowEditInit(item: any) {
    this.clonedProducts[item.id as string] = { ...item };
  }

  onRowEditSave(item: any) {
    //console.log("Item", item, item.valor !== null)
      if(item.tipo !== null && item.descricao !== null && item.valor !== null ){
        this.serviceConsulta.putEspecConsulta(item).then((response)=>{
          if(response == 200 || response == 201)
          this.buscaEspecialidade();
          this.fecharModal();
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Especialidade atualizada com sucesso' });
        }).catch((error)=>{
          this.fecharModal();
          this.messageService.add({ severity: 'danger', summary: 'warning', detail: 'Houve um erro na requisicao para atualizar a especialidade: ' + error });
        })
      }
  }

onRowEditCancel(product: any, index: number) {
    this.products[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
}

  showDialog() {
      this.novoProcedimento = true;
  }

  criaFormulario() {
    this.formulario = this.formBuilder.group({
      tipo: ['', Validators.required],
      valorBase: [0, Validators.required],
      descricao: ['', Validators.required],
      multiplicativo: [false],
      orcamento: [false]
    })
  }

  buscaEspecialidade(){
    this.serviceConsulta.getEspecConsulta().then((response)=>{
      this.listaEspecConsulta = response;
    }).catch((erro)=>{
      //console.log("Erro", erro)
    })
  }

  fecharModal() {
    this.novoProcedimento = false;
    this.formulario.reset();
  }

  onSubmit() {
    console.log(this.formulario.value)
    // if(this.formulario.valid){
    //   this.serviceConsulta.postEspecConsulta(this.formulario.value).then((response)=>{
    //     if(response == 200 || response == 201){
    //       this.fecharModal();
    //       this.buscaEspecialidade();
    //       this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Especialidade adicionada com sucesso!' });
    //     }else{
    //       this.fecharModal();
    //       this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocurreu um erro ao salvar a especialidade.' });
    //     }
    //   }).catch((error)=>{
    //     this.fecharModal();
    //     this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocurreu um erro na requisicao para salvar a especialidade.' });
    //   })
    // }else{
    //   this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'O formulario nao fui preenchido corretamente.' });
    // }
  }

  onDelete(id: any){
    this.serviceConsulta.deleteEspecConsulta(id).then((response)=>{
      if(response == 200 ){
        this.buscaEspecialidade();
        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Especialidade deletada com sucesso!' });

      }else{
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Houve um erro ao deletar a especialidade' });
      }
    }).catch((error)=>{
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Houve um erro ao deletar a especialidade' });
    })
  }

  confirmaDeletar(event: Event, item: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Deseja realmente deletar a especialidade <br><strong>'+ item.tipo + '</strong>?' ,
        header: 'Confirmar Deleção',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.onDelete(item.id);
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
  }

  onKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d]/g, ''); // Remove qualquer caractere não numérico

    if (event.key >= '0' && event.key <= '9') {
      value += event.key; // Adiciona o novo dígito no final
    } else if (event.key === 'Backspace') {
      value = value.slice(0, -1); // Remove o último dígito
    } else {
      event.preventDefault();
      return;
    }


    this.formulario.get('valorBase')?.setValue((Number(value) / 100));
    event.preventDefault();
  }
}

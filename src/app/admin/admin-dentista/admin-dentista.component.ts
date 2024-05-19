import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DentistaService } from 'src/app/dentista.service';

@Component({
  selector: 'app-admin-dentista',
  templateUrl: './admin-dentista.component.html',
  styleUrl: './admin-dentista.component.css',
  providers: [ConfirmationService]
})
export class AdminDentistaComponent implements OnInit{


  listaEspec: any[];
  visivel: boolean = false;
  formulario: FormGroup;

  clonedProducts: { [s: string]: any } = {};

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private serviceDentista: DentistaService, private confirmationService: ConfirmationService){
    this.criarFormulario();
    this.buscarEspecialidade();
  }

  async ngOnInit() {

  }
  async buscarEspecialidade(){
    await this.serviceDentista.getByEspecialidades().then((response)=>{
      if(response){
        this.listaEspec = response;
      }
    }).catch((error)=>{
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Houve um erro ao buscar as especialidades' });
    });
  }

  onSubmit() {
    console.log("Entrei aqui");
    this.serviceDentista.postEspecialidade(this.formulario.value).then((response) => {
      if (response && (response.status === 200 || response.status === 201)) {
        this.visivel = false;
        this.buscarEspecialidade();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Especialidade salva com sucesso!' });
        this.formulario.reset();
      } else {
        this.messageService.add({ severity: 'erro', summary: 'Erro', detail: 'Houve um erro ao salvar a especialidade' });
      }
    }).catch((error) => {
      this.messageService.add({ severity: 'erro', summary: 'Erro', detail: 'Houve um erro ao salvar a especialidade' });
    });
  }
  showDialog() {
    this.visivel = true;
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      tipo: ['', Validators.required],
      descricao: ['', Validators.required]
    })
  }

  onRowEditInit(item: any) {
    this.clonedProducts[item.id as string] = { ...item };
  }

  onRowEditSave(item: any) {
      if(item.tipo !== null && item.descricao !== null && item.valor !== null ){
        this.serviceDentista.putEspecialidade(item.id, item).then((response)=>{
          if(response)

          this.buscarEspecialidade();
          this.fecharModal();

          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Especialidade atualizada com sucesso' });
        }).catch((error)=>{
          this.fecharModal();
          this.messageService.add({ severity: 'danger', summary: 'warning', detail: 'Houve um erro na requisicao para atualizar a especialidade: ' + error });
        })
      }
  }

  onDelete(id: any){
    if(id !== null){
      this.serviceDentista.deleteEspecialidade(id).then((response)=>{
        if(response.status == 200 || response.status == 201){
          this.buscarEspecialidade();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Especialidade deletada com sucesso' });
        }
      }).catch((error)=>{
        this.messageService.add({ severity: 'error', summary: 'Eroo', detail: 'Houve um erro ao deletar a especialidade' });
      })
    }
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

  onRowEditCancel(product: any, index: number) {
    this.listaEspec[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

  fecharModal(){
    this.visivel = false;
  }

}

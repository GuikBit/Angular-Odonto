import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AssyncServiceService } from 'src/app/assync-service.service';
import { ClienteService } from 'src/app/cliente.service';
import { Formatters } from 'src/app/utils/formatters';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrl: './novo-funcionario.component.css'
})
export class NovoFuncionarioComponent  implements OnInit{

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('numeroInput') numeroInput!: ElementRef;

  formInform: FormGroup;
  formEndereco: FormGroup;
  formContrato: FormGroup;
  formAnexo: FormGroup;
  formConfig: FormGroup;

  nivelAcesso: number;
  items: MenuItem[] | undefined;
  validacaoCPF: boolean | null = null;
  existeCPF: boolean | null = null;
  loading: boolean = false;
  uploadedFiles: any[] = [];

  active: number = 0;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: ClienteService, private assync: AssyncServiceService){}

  ngOnInit(){
    this.criaFormulario();
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home' },
      { label: 'Transactions', icon: 'pi pi-chart-line' },
      { label: 'Products', icon: 'pi pi-list' },
      { label: 'Messages', icon: 'pi pi-inbox' }
  ]
  }


  criaFormulario() {
    this.formInform = this.formBuilder.group({

      nome: ['Guilherme',[Validators.required]],
      dataNascimento: ['05/10/2024', Validators.required],
      telefone: ['(32) 99822-0082', Validators.required],
      email: ['guilhermeoliveira1998@gmail.com', Validators.required],
      cpf: ['12098133600', Validators.required],
      rg: ['MG17979660', Validators.required],
      uf: ['MG', Validators.required],

      orgEmissor: ['SSP', Validators.required],
      pisPasep: ['Sei la', Validators.required],
      ctpsN: ['tbm nao sei', Validators.required],
      ctpsS: ['Nao sei', Validators.required],
      ctpsUF: ['MG', Validators.required],

      fotoPerfil: [],

    })

    this.formEndereco = this.formBuilder.group({
      cidade: ['Juiz de Fora', Validators.required],
      bairro: ['Grama', Validators.required],
      logradouro: ['Diomar Monteiro', Validators.required],
      numero: ['1509', Validators.required],
      cep: ['36048-310', Validators.required],
      complemento: ['Casa', Validators.required],
      referencia: [],
    })

    this.formContrato = this.formBuilder.group({
      empreasa: ['', Validators.required],
      cargo: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      registroN: ['', Validators.required],
      remuneracao: ['', Validators.required],
      jornadaTrabalho: ['', Validators.required],
      valeTrans: [false],
      valeAR: [false],
      planoSaude: [false],
      plr: [false],
      premiacao: [false],
      gymPass: [false],
    })

    this.formConfig = this.formBuilder.group({
      nivelAcesso: ['',Validators.required]
    })
  }

  abrirExplorerFoto(){
    this.fileInput.nativeElement.click();
  }

  validaCPF(): void {
    let cpf = this.formInform.get('cpf');
    if (cpf) {
      const cpfValue = cpf.value.replace(/\D/g, '');
      this.formInform.get('cpf')?.setValue(cpfValue);
      if (cpfValue.length >= 11) {
        this.formInform.get('cpf')?.setErrors({ tam: false });
        const formattedCPF = Formatters.formatCPF(cpfValue);
        this.formInform.get('cpf')?.setValue(formattedCPF);
        this.validadorCpf(cpfValue, 1);
      } else {
        this.formInform.get('cpf')?.setErrors({ tam: true });
      }
    }
  }

  async validadorCpf(cpf: string, tipo: number): Promise<void> {
    if (this.isValidCPF(cpf)) {
      const buscaCPF = await this.service.buscaCPF(cpf);
      this.existeCPF = !buscaCPF;
      this.validacaoCPF = buscaCPF;
    } else {
      this.validacaoCPF = false;
    }
  }

  isValidCPF(cpf: string): boolean {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[\s.-]*/igm, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  }

  replaceTelefone(tipo: number): void {
    const telefoneControl = tipo === 1 ? this.formInform.get('telefone') : this.formInform.get('responsavel.telefone');
    if (telefoneControl) {
      let telefoneValue = telefoneControl.value.replace(/\D/g, '').substring(0, 11);
      const formattedTelefone = telefoneValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      telefoneControl.setValue(formattedTelefone);
    }
  }

  buscaCEP(): void {
    let cep = this.formEndereco.get('cep');
    if (cep) {
      const cepValue = cep.value.replace(/\D/g, '').substring(0, 8);
      this.formEndereco.get('cep')?.setValue(this.formatCEP(cepValue));

      if (cepValue.length === 8) {
        this.loading = true;

        setTimeout(() => {
          this.assync.buscaCEP2(cepValue).then((response) => {
            if (response?.status === 200) {
              this.formEndereco.get('bairro')?.setValue(response.data.bairro);
              this.formEndereco.get('complemento')?.setValue(response.data.complemento);
              this.formEndereco.get('cidade')?.setValue(response.data.localidade);
              this.formEndereco.get('logradouro')?.setValue(response.data.logradouro);

              this.numeroInput.nativeElement.focus();
            }

            console.log(response);
          }).catch((error) => {
            console.error('Erro ao buscar o CEP:', error);
          }).finally(() => {
            this.loading = false;
          });
        }, 1000);
      }
    }
  }

  formatCEP(cep: string): string {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  salvarFuncionario(){

  }

  validaFormulario(form: any){

    if(form === 1){
      if(this.formInform.valid){
        this.active ++;
      }else{
        this.messageService.add({severity: 'error', summary: 'Houve um erro', detail: 'Verifique os campos obrigatórios do formulário.'});
      }
    }else if( form === 2 ){
      if(this.formEndereco.valid){
        this.active ++;
      }else{
        this.messageService.add({severity: 'error', summary: 'Houve um erro', detail: 'Verifique os campos obrigatórios do formulário.'});
      }
    }
   else{

    }
  }

}

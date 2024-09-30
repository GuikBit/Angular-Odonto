import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
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
  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: ClienteService){}

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
      numPasta: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      uf: ['', Validators.required],
      ctpsUF: ['', Validators.required],
      ctpsS: ['', Validators.required],
      ctpsN: ['', Validators.required],
      pisPasep: ['', Validators.required],
      orgEmissor: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      fotoPerfil: [],
      // organizacaoId: [this.org.id, Validators.required],
      // idOrganizacao: [this.org],
    })

    this.formEndereco = this.formBuilder.group({
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      complemento: ['', Validators.required],
      referencia: [],
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
    this.loading = true;
    let cep = this.formEndereco.get('cep');
    if (cep) {
      const cepValue = cep.value.replace(/\D/g, '').substring(0, 8);
      this.formEndereco.get('cep')?.setValue(this.formatCEP(cepValue));

      // setTimeout(() => {
      //   this.assync.buscaCEP(cepValue).subscribe(
      //     response => this.setEndereco(response),
      //     () => this.handleCepError()
      //   );
      // }, 1000);
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
}

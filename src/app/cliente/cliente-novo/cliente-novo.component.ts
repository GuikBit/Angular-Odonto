import { GlobalService } from 'src/app/global.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Injectable, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../../class/cliente';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AssyncServiceService } from 'src/app/services/assync-service.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Formatters } from '../../utils/formatters';
import { Organizacao } from 'src/app/class/Organizacao';

export interface Message {
  type: 'success' | 'error';
  content: string;
}

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.css'],
  providers: [GlobalService]
})
export class ClienteNovoComponent implements OnInit, OnDestroy {

  @ViewChild('enderecoNumero') enderecoNumero!: ElementRef;
  @ViewChild('enderecoCEP') enderecoCEP!: ElementRef;

  @Output() msgReturn = new EventEmitter<Message>();
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() onlyClose = new EventEmitter<boolean>();

  cliente: Cliente;
  success: boolean = false;
  hide = true;
  loading: boolean = false;
  uploadedFiles: any[] = [];

  formulario: FormGroup;
  formResp: FormGroup;
  formEnd: FormGroup;
  formAnamnese: FormGroup;

  items: MenuItem[] | undefined;
  activeIndex: number = 0;
  fileToUpload: File | null = null;
  validacaoLogin: boolean | null = null;
  validacaoCPF: boolean | null = null;
  RespValidacaoCPF: boolean | null = null;
  existeCPF: boolean | null = null;
  buscouCEP: boolean | null = null;
  indiceStep = 1;
  org: any;

  active: number = 0;

  constructor(
    private service: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private assync: AssyncServiceService,
    private messageService: MessageService,
    private globalService: GlobalService
  ) {


  }

  ngOnInit(): void {
    this.items = [
      { id: '1', label: 'Informações Pessoais', icon: 'pi pi-pw pi-user' },
      { id: '2', label: 'Responsável', icon: 'pi pi-pw pi-users' },
      { id: '3', label: 'Endereço', icon: 'pi pi-map-marker' },
      { id: '4', label: 'Anamnese', icon: 'pi pi-pw pi-file' },
    ];

    const organizacaoJson = localStorage.getItem('organizacao');

    if (organizacaoJson) {
      this.org = JSON.parse(organizacaoJson);
    }

    this.criaFormulario();
  }

  ngOnDestroy(): void {
    this.indiceStep = 1;
    this.activeIndex = 0;
  }

  criaFormulario(): void {
    console.log(this.org)
    if(this.org){
    console.log(this.org.id)

    }

    this.formulario = this.formBuilder.group({
      numPasta: ['1548', Validators.required],
      login: ['Gui', Validators.required],
      senha: ['123', Validators.required],
      email: ['teste@teste.com', [Validators.required, Validators.email]],
      nome: ['Guilherme Oliveira', Validators.required],
      cpf: ['120.981.336-00', Validators.required],
      dataNascimento: ['18/11/1998', Validators.required],
      telefone: ['(32) 99822-0082', Validators.required],
      fotoPerfil: [],
      organizacaoId: [this.org.id, Validators.required],
      //idOrganizacao: [this.org],
    });

    this.formResp = this.formBuilder.group({
      nome: [],
      telefone: [],
      cpf: [],
    });

    this.formEnd = this.formBuilder.group({
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      complemento: ['', Validators.required],
      referencia: [],
    });

    this.formAnamnese = this.formBuilder.group({
      problemaSaude: ['', Validators.required],
      tratamento: ['', Validators.required],
      remedio: ['', Validators.required],
      alergia: ['', Validators.required],
      sangramentoExcessivo: [false],
      hipertenso: [false],
      gravida: [false],
      traumatismoFace: [false],
    })
  }

  onSubmit(): void {

    const paciente = this.montaDadosPaciente();
    if (true) {
      this.service.postPaciente(JSON.stringify(paciente))
        .then(response => {
          if (response?.status === 201 || response?.status === 200) {
            this.closeModal.emit(false);
          } else {
            this.handleError('Houve um erro na requisição para salvar o paciente.');
          }
        })
        .catch(() => {
          this.handleError('Houve um erro interno ao salvar o paciente.');
        });
    } else {
      this.handleValidationError();
    }
  }

  handleError(detail: string): void {
    this.success = false;
    this.messageService.add({ severity: 'error', summary: 'Erro', detail });
  }

  handleValidationError(): void {
    this.success = false;
    const mensagem: Message = { type: 'error', content: 'Houve erro nas informações digitadas, confira os campos obrigatórios!' };
    this.msgReturn.emit(mensagem);
  }

  onActiveIndexChange(event: number): void {
    this.activeIndex = event;
  }

  buscaCEP(): void {
    let cep = this.formEnd.get('cep');
    if (cep) {
      const cepValue = cep.value.replace(/\D/g, '').substring(0, 8);
      this.formEnd.get('cep')?.setValue(this.formatCEP(cepValue));

      if (cepValue.length === 8) {
        this.loading = true;

        setTimeout(() => {
          this.assync.buscaCEP2(cepValue).then((response) => {
              if (response?.status === 200) {
                const data = response.data;
                if (data?.erro === 'true' || data?.erro === true) {

                  this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao Buscar CEP',
                    detail:
                      'CEP não encontrado. Por favor, verifique o número e tente novamente.',
                  });

                  this.enderecoCEP.nativeElement.blur();
                  this.formEnd.get('cep')?.setErrors({'invalido': true});

                  this.formEnd.get('bairro')?.setValue(data.bairro || '');
                  this.formEnd.get('complemento')?.setValue(data.complemento || '');
                  this.formEnd.get('cidade')?.setValue(data.localidade || '');
                  this.formEnd.get('logradouro')?.setValue(data.logradouro || '');
                  this.formEnd.get('numero')?.setValue(data.logradouro || '');
                  this.formEnd.get('complemento')?.setValue(data.logradouro || '');
                  this.formEnd.get('referencia')?.setValue(data.logradouro || '');

                } else {

                  this.formEnd.get('bairro')?.setValue(data.bairro || '');
                  this.formEnd.get('complemento')?.setValue(data.complemento || '');
                  this.formEnd.get('cidade')?.setValue(data.localidade || '');
                  this.formEnd.get('logradouro')?.setValue(data.logradouro || '');

                  this.enderecoNumero.nativeElement.focus();
                }
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erro na Resposta',
                  detail:
                    'Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.',
                });
              }
            })
            .catch((error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao Buscar CEP',
                detail:
                  'Ocorreu um erro ao se conectar ao serviço. Verifique sua conexão e tente novamente.',
              });
              console.error('Erro ao buscar o CEP:', error);
            })
            .finally(() => {
              this.loading = false;
            });
        }, 1000);
      }
    }
  }


  montaDadosPaciente(){

    if(this.formulario.valid && this.formResp.valid && this.formEnd.valid && this.formAnamnese.valid){
      this.cliente = new Cliente();

      this.cliente.nome = this.formulario.get('nome')?.value;
      this.cliente.cpf = this.formulario.get('cpf')?.value;
      this.cliente.dataNascimento = this.formulario.get('dataNascimento')?.value;
      this.cliente.telefone = this.formulario.get('telefone')?.value;
      this.cliente.email = this.formulario.get('email')?.value;
      this.cliente.login = this.formulario.get('login')?.value;
      this.cliente.senha = this.formulario.get('senha')?.value;
      this.cliente.numPasta = this.formulario.get('numPasta')?.value;
      this.cliente.fotoPerfil = this.formulario.get('fotoPerfil')?.value;
      this.cliente.OrganizacaoId = this.formulario.get('organizacaoId')?.value;

      this.cliente.responsavel.nome = this.formResp.get('nome')?.value;
      this.cliente.responsavel.cpf = this.formResp.get('cpf')?.value;
      this.cliente.responsavel.telefone = this.formResp.get('telefone')?.value;

      this.cliente.endereco.cep = this.formEnd.get('cep')?.value;
      this.cliente.endereco.cidade = this.formEnd.get('cidade')?.value;
      this.cliente.endereco.bairro = this.formEnd.get('bairro')?.value;
      this.cliente.endereco.logradouro = this.formEnd.get('logradouro')?.value;
      this.cliente.endereco.numero = this.formEnd.get('numero')?.value;
      this.cliente.endereco.complemento = this.formEnd.get('complemento')?.value;
      this.cliente.endereco.referencia = this.formEnd.get('referencia')?.value;

      this.cliente.anamnese.problemaSaude = this.formAnamnese.get('problemaSaude')?.value;
      this.cliente.anamnese.tratamento = this.formAnamnese.get('tratamento')?.value;
      this.cliente.anamnese.remedio = this.formAnamnese.get('remedio')?.value;
      this.cliente.anamnese.alergia = this.formAnamnese.get('alergia')?.value;
      this.cliente.anamnese.sangramentoExcessivo = this.formAnamnese.get('sangramentoExcessivo')?.value;
      this.cliente.anamnese.hipertenso = this.formAnamnese.get('hipertenso')?.value;
      this.cliente.anamnese.gravida = this.formAnamnese.get('gravida')?.value;
      this.cliente.anamnese.traumatismoFace = this.formAnamnese.get('traumatismoFace')?.value;
    }

    return this.cliente;
  }


  handleCepError(): void {
    this.buscouCEP = null;
    this.loading = false;
  }

  formatCEP(cep: string): string {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  buscaLogin(): void {
    this.loading = true;
    let login = this.formulario.get('login');
    if (login && login.value.length >= 3) {
      this.service.buscaLogin(login.value).then(response => {
        this.validacaoLogin = response;
        this.loading = false;
        if (!response) {
          login?.setErrors({ loginEmUso: true });
        }
      });
    } else {
      this.validacaoLogin = false;
      this.loading = false;
    }
  }

  RespValidaCPF(): void {
    let cpf = this.formResp.get('cpf');
    if (cpf) {
      const cpfValue = cpf.value.replace(/\D/g, '');
      this.formResp.get('cpf')?.setValue(cpfValue);
      if (cpfValue.length >= 11) {
        this.formResp.get('cpf')?.setErrors({ tam: false });
        const formattedCPF = Formatters.formatCPF(cpfValue);
        this.formResp.get('cpf')?.setValue(formattedCPF);
        this.RespValidacaoCPF = this.isValidCPF(cpfValue);
      } else {
        this.formResp.get('cpf')?.setErrors({ tam: true });
      }
    }
  }

  validaCPF(): void {
    let cpf = this.formulario.get('cpf');
    if (cpf) {
      const cpfValue = cpf.value.replace(/\D/g, '');
      this.formulario.get('cpf')?.setValue(cpfValue);
      if (cpfValue.length >= 11) {
        this.formulario.get('cpf')?.setErrors({ tam: false });
        const formattedCPF = Formatters.formatCPF(cpfValue);
        this.formulario.get('cpf')?.setValue(formattedCPF);
        this.validadorCpf(cpfValue, 1);
      } else {
        this.formulario.get('cpf')?.setErrors({ tam: true });
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
    const telefoneControl = tipo === 1 ? this.formulario.get('telefone') : this.formResp.get('telefone');
    if (telefoneControl) {
      let telefoneValue = telefoneControl.value.replace(/\D/g, '').substring(0, 11);
      const formattedTelefone = telefoneValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      telefoneControl.setValue(formattedTelefone);
    }
  }

  validaFormulario(form: number) {
    if (form === 1 && this.formulario.valid) {
      this.active = 1;
    } else if (form === 2 && this.formResp.valid) {
      this.active = 2;
    } else if (form === 3 && this.formEnd.valid) {
      this.active = 3;
    }else if(form === 4 && this.formAnamnese.valid){
      this.onSubmit();
    }
  }

  nextStep(): void {
    this.indiceStep++;
    this.activeIndex++;
  }

  prevStep(): void {
    this.indiceStep--;
    this.activeIndex--;
  }

  fecharModal(): void {
    this.onlyClose.emit(false);
  }
}

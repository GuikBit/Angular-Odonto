
import { Dentista } from '../../class/dentista';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DentistaService } from 'src/app/services/dentista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { isEmpty } from 'rxjs';
import { AssyncServiceService } from 'src/app/services/assync-service.service';
import { CargoService } from 'src/app/services/cargo.service';

@Component({
  selector: 'app-dentista-novo',
  templateUrl: './dentista-novo.component.html',
  styleUrls: ['./dentista-novo.component.css']
})
export class DentistaNovoComponent implements OnInit{

  @Output() onlyClose = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter<boolean>();
  @ViewChild('numeroInput') numeroInput!: ElementRef;
  @ViewChild('cepInput') cepInput!: ElementRef;


  especialidades: any[] | undefined;
  dentista: Dentista;

  formulario: FormGroup;
  formEndereco: FormGroup;
  formContrato: FormGroup;
  formCustomizacao: FormGroup;

  validacaoLogin: boolean | null = null;
  validacaoCPF: boolean | null = null;
  existeCPF: boolean | null = null;
  hide: boolean = false;
  loading: boolean | null = false;
  cargosList: any[] = [];
  org: any;

  active: number = 0;

  constructor( private service : DentistaService, private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, public messageService: MessageService, private assync: AssyncServiceService, private cargoService: CargoService) {


    const organizacaoJson = localStorage.getItem('organizacao');

    if (organizacaoJson) {
      this.org = JSON.parse(organizacaoJson);
    }

    this.criaFormulario(this.dentista);

  }
  ngOnInit() {
    this.service.getByEspecialidades().then((response)=>{
      if(response){
        this.especialidades = response;
      }
    })

    this.cargoService.getCargos(this.org.id).then((response)=>{
      if(response?.status === 200){
        this.cargosList = response.data;
      }
    }).catch((error=>{

    }))

  }

  criaFormulario(dentista: Dentista) {
    this.formulario = this.formBuilder.group({
      login: ['teste', Validators.required],
      senha: ['123214', Validators.required],
      email: ['teste@teste.com', Validators.required],
      nome: ['Teste', Validators.required],
      cpf: ['120.981.336-00', Validators.required],
      dataNascimento: ['18/11/1998', Validators.required],
      telefone: ['(32) 99822-0082', Validators.required],
      cro: ['23314', Validators.required],
      especialidade: ['', Validators.required],
      OrganizacaoId: [this.org.id, Validators.required],
      //idOrganizacao: [this.org],
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
      empresa: [{value: this.org.nome, disabled: true}, Validators.required],
      empresaCNPJ: [{value: this.org.cnpj, disabled: true}, Validators.required],
      cargo: [null, Validators.required],
      dataAdmissao: [new Date(), Validators.required],
      registroN: ['325478-96', Validators.required],
      remuneracao: [null, Validators.required],
      valorPremiacao: [null],
      valeTrans: [false],
      valeAR: [false],
      planoSaude: [false],
      plr: [false],
      premiacao: [false],
      gymPass: [false],
    })

    this.formCustomizacao = this.formBuilder.group({
      corDentista: [this.generateRandomColor(), Validators.required],
    })


  }

  buscaLogin() {
    this.loading = true;
    let login = this.formulario.get('login');
    if (login?.value != null && login?.value !== undefined && login?.value !== '' && login?.value.length >= 3) {
        this.service.buscaLogin(login?.value).then((response) => {
         // console.log(response)
            if (response === true) {

                this.validacaoLogin = true;
                this.loading = false;
            } else {
                login?.setErrors({ loginEmUso: true });
                this.validacaoLogin = false;
                this.loading = false;
            }
        });
    }else{
      this.validacaoLogin = false;
      this.loading = false;
    }
    }

  validaCPF(){
    let cpf = this.formulario.get('cpf');
    const cpfLimpo = cpf?.value.replace(/\D/g, '');
    this.formulario.get('cpf')?.setValue(cpfLimpo);
    if (cpf && cpf?.value.length >= 11) {

      this.formulario.get('cpf')?.setErrors({tam: false})
      const limite = cpfLimpo.substring(0, 11);
      const cpfFormatado = limite.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.formulario.get('cpf')?.setValue(cpfFormatado);
      this.validadorCpf(this.formulario.get('cpf')?.value);

    }else{
      this.formulario.get('cpf')?.setErrors({tam: true})
      this.validacaoCPF = false;
    }

   }

  async validadorCpf(cpf: any){

    if (this.isValidCPF(cpf)) {
      const buscaCPF = await this.service.buscaCPF(cpf)
     // console.log(buscaCPF)
      if(buscaCPF){
        this.existeCPF = false;
        this.validacaoCPF = true;
      }else{
        this.existeCPF = true;
      }
      // this.validacaoCPF = true;
    }else{
    //  console.log("nao valido")
      this.validacaoCPF = false;

    }

  }

  isValidCPF(cpf: string) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
  }

  replaceTelefone(tipo: number){
    let num;
    tipo === 1? num = this.formulario.get('telefone')?.value : num = this.formulario.get('responsavel.telefone')?.value ;

    const textoLimpo = num?.replace(/\D/g, '');
    const limite = textoLimpo.substring(0, 11);
    const telFormatado = limite.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    tipo === 1 ? this.formulario.get('telefone')?.setValue(telFormatado) : this.formulario.get('responsavel.telefone')?.setValue(telFormatado) ;

  }

  onSubmit() {
    console.log(JSON.stringify(this.formulario.value))

    if(this.formulario.valid){
      this.service.postDentita(JSON.stringify(this.formulario.value)).then((response)=>{
        if(response?.status == 200 || response?.status === 201){
          this.closeModal.emit(false);
        }
      }).catch((error)=>{
        this.messageService.add({
          summary: 'warn',
          severity: 'Aviso',
          detail: 'Houve um erro ao salvar o dentista.'
        })
      })
    }
  }


  fecharModal(){
    this.onlyClose.emit(false);
  }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getCorDentista(){
    return this.formCustomizacao.get('corDentista')?.value;
  }

  getCorDentistaOpacidade(){
    return this.formCustomizacao.get('corDentista')?.value + '26';
  }

  validaFormulario(form: any){

    if(form === 1 && this.formulario.valid){

      this.active ++;

    }else if(form === 2 && this.formEndereco.valid){
      this.active ++;

    }else if(form === 3 && this.formCustomizacao.valid){
      this.active ++;

    }else if(form === 4 && this.formContrato.valid){
      this.onSubmit();

    }else{
      this.messageService.add({severity: 'error', summary: 'Houve um erro', detail: 'Verifique os campos obrigatórios do formulário.'});
    }

  }
  formatCEP(cep: string): string {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
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
                const data = response.data;
                if (data?.erro === 'true' || data?.erro === true) {

                  this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao Buscar CEP',
                    detail:
                      'CEP não encontrado. Por favor, verifique o número e tente novamente.',
                  });

                  this.cepInput.nativeElement.blur();
                  this.formEndereco.get('cep')?.setErrors({'invalido': true});

                  this.formEndereco.get('bairro')?.setValue(data.bairro || '');
                  this.formEndereco.get('complemento')?.setValue(data.complemento || '');
                  this.formEndereco.get('cidade')?.setValue(data.localidade || '');
                  this.formEndereco.get('logradouro')?.setValue(data.logradouro || '');
                  this.formEndereco.get('numero')?.setValue(data.logradouro || '');
                  this.formEndereco.get('complemento')?.setValue(data.logradouro || '');
                  this.formEndereco.get('referencia')?.setValue(data.logradouro || '');

                } else {

                  this.formEndereco.get('bairro')?.setValue(data.bairro || '');
                  this.formEndereco.get('complemento')?.setValue(data.complemento || '');
                  this.formEndereco.get('cidade')?.setValue(data.localidade || '');
                  this.formEndereco.get('logradouro')?.setValue(data.logradouro || '');

                  this.numeroInput.nativeElement.focus();
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

  preencheuCargo(){
    if(this.formContrato.get('cargo')?.value){
      this.formContrato.get('remuneracao')?.setValue(this.formContrato.get('cargo')?.value.salarioBase)
      // valeTrans: [false],
      // valeAR: [false],
      // planoSaude: [false],
      // plr: [false],
      // premiacao: [false],
      // gymPass: [false],
      this.formContrato.get('valeTrans')?.setValue(this.formContrato.get('cargo')?.value.valeTrans);
      this.formContrato.get('valeAR')?.setValue(this.formContrato.get('cargo')?.value.valeAR)
      this.formContrato.get('planoSaude')?.setValue(this.formContrato.get('cargo')?.value.planoSaude)
      this.formContrato.get('plr')?.setValue(this.formContrato.get('cargo')?.value.plr)
      this.formContrato.get('premiacao')?.setValue(this.formContrato.get('cargo')?.value.premiacao)
      this.formContrato.get('gymPass')?.setValue(this.formContrato.get('cargo')?.value.gymPass)

    }else{
      this.formContrato.get('remuneracao')?.setValue(null);

      this.formContrato.get('valeTrans')?.setValue(null);
      this.formContrato.get('valeAR')?.setValue(null)
      this.formContrato.get('planoSaude')?.setValue(null)
      this.formContrato.get('plr')?.setValue(null)
      this.formContrato.get('premiacao')?.setValue(null)
      this.formContrato.get('gymPass')?.setValue(null)
    }
  }
}

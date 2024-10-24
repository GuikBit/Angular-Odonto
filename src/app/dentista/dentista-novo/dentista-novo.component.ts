import { Dentista } from '../../class/dentista';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DentistaService } from 'src/app/services/dentista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-dentista-novo',
  templateUrl: './dentista-novo.component.html',
  styleUrls: ['./dentista-novo.component.css']
})
export class DentistaNovoComponent implements OnInit{

  @Output() onlyClose = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter<boolean>();

  especialidades: any[] | undefined;
  dentista: Dentista;

  formulario: FormGroup;

  validacaoLogin: boolean | null = null;
  validacaoCPF: boolean | null = null;
  existeCPF: boolean | null = null;
  hide: boolean = false;
  loading: boolean | null = false;

  org: any;

  constructor( private service : DentistaService, private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, public messageService: MessageService) {


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

  }

  criaFormulario(dentista: Dentista) {
    this.formulario = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      cro: ['', Validators.required],
      especialidade: ['', Validators.required],
      corDentista: [this.generateRandomColor(), Validators.required],
      organizacaoId: [this.org.id, Validators.required],
      idOrganizacao: [this.org],
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
      this.validadorCpf(this.formulario.get('cpf')?.value.replace(/\D/g, ''));

    }else{
      this.formulario.get('cpf')?.setErrors({tam: true})
      //this.validacaoCPF = false;
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
    // console.log("Form novo dentista valido: ",this.formulario.valid)
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
    return this.formulario.get('corDentista')?.value;
  }

  getCorDentistaOpacidade(){
    return this.formulario.get('corDentista')?.value + '26';
  }
}




import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from '../cliente'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AssyncServiceService } from 'src/app/assync-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/util/custom-snackbar/custom-snackbar.component';


@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.css']
})
export class ClienteNovoComponent {
  // Dados do Cliente
cliente: Cliente;
//id: number;

// Controle de Estado
success: boolean = false;
hide = true;
isLoodingCEP: boolean = false;

// Formulário
formulario: FormGroup;

// Upload de Arquivo
fileToUpload: File | null = null;

// Endereço (se faz sentido agrupar)


// Mensagens
msgSalvar: string;
msgSalvarStyle: string;
errors: string | null;

// Validações
validacaoLogin: boolean | null = null;
validacaoCPF: boolean | null = null;
RespValidacaoCPF: boolean | null = null;
existeCPF: boolean | null = null;
buscouCEP: boolean | null = null ;

  constructor( private service : ClienteService, private router: Router, private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, private assync: AssyncServiceService, private _snackBar: MatSnackBar) { 
    this.cliente = new Cliente();
    this.criaFormulario(new Cliente());
  }


  ngOnInit(): void {    
    
  }

  onSubmit(){
    
      // console.log(this.formulario.value)
    const paciente = this.formulario.value;
    const pacienteJson = JSON.stringify(paciente);
    console.log(paciente)
      if(this.formulario.valid){
      this.service.salvarPaciente(pacienteJson)
      .then(response =>{
        console.log(response)
        if(response?.status === 201 || response?.status === 200 ){
          this.router.navigate(['/clientes', {salvo: true}])
        }
        else{
          this.success = false;
          this.msgSalvar = "Houve um erro na requisicao";
          this.msgSalvarStyle = "WarningSnackbar";
          //this.errors = errorResponse.error.erros;
        }

      }).catch(errorResponse => {
          this.success = false;
          this.msgSalvar = "Houve um erro ao salvar o paciente!";
          this.msgSalvarStyle = "DangerSnackbar";
          this.errors = errorResponse.error.erros;
      })

      
    }else{
      this.success = false;
      this.msgSalvar = "Houve erro no formulário, confira os campos obrigatórios!";
      this.msgSalvarStyle = "WarningSnackbar";
      this.openSnackBar();
    }

  }


  openSnackBar ( ) {
    const snackbarRef = this._snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: this.msgSalvar },
      duration: 3000,
      panelClass: [this.msgSalvarStyle],
      verticalPosition: 'top', 
      horizontalPosition: 'end',
    });
    


  }
  uploadFoto(): void {  }

  buscaCEP(){

    this.isLoodingCEP = true;  
    let cep = this.formulario.get('endereco.cep')
    const cpfLimpo = cep?.value.replace(/\D/g, '').substring(0, 8);
    const cepFormatado = cpfLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
    this.formulario.get('endereco.cep')?.setValue(cepFormatado);

    setTimeout(() => {
      if ( cep?.value != null ) {
        this.assync.buscaCEP(cpfLimpo).subscribe(
          (response) => {
            this.formulario.get('endereco.cidade')?.setValue(response.localidade);
            this.formulario.get('endereco.bairro')?.setValue(response.bairro);
            this.formulario.get('endereco.logradouro')?.setValue(response.logradouro);
            this.formulario.get('endereco.complemento')?.setValue(response.complemento);
      
            this.formulario.updateValueAndValidity();
            this.buscouCEP = true;

        },(errorResponse) => {
            this.isLoodingCEP = false;
            this.buscouCEP = null;
          }
        );
    
        this.isLoodingCEP = false;
      }
    }, 1000);
    
    
        
  }


  buscaLogin() {
    let login = this.formulario.get('login');
    console.log(login?.value)
    if (login?.value != null && login?.value !== undefined && login?.value !== '' && login?.value.length >= 3) {
        this.service.buscaLogin(login?.value).then((response) => {
          console.log(response)
            if (response === true) {
                this.validacaoLogin = true;              
            } else {              
                login?.setErrors({ loginEmUso: true });
                this.validacaoLogin = false;
            }
        });
    }else{
      this.validacaoLogin = false;
    }   
  }

  RespValidaCPF(){
    let cpf = this.formulario.get('responsavel.cpf');
    const cpfLimpo = cpf?.value.replace(/\D/g, '');
    this.formulario.get('responsavel.cpf')?.setValue(cpfLimpo);
    if (cpf && cpf?.value.length >= 11) {

      this.formulario.get('responsavel.cpf')?.setErrors({tam: false})
      const limite = cpfLimpo.substring(0, 11);
      const cpfFormatado = limite.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.formulario.get('responsavel.cpf')?.setValue(cpfFormatado);
      if(this.isValidCPF(cpfFormatado)){
        this.RespValidacaoCPF = true;
      }else{
        this.RespValidacaoCPF = false;
      }   
      
    }else{
      this.formulario.get('responsavel.cpf')?.setErrors({tam: true})
      //this.validacaoCPF = false;
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
      this.validadorCpf(this.formulario.get('cpf')?.value.replace(/\D/g, ''), 1);      
      
    }else{
      this.formulario.get('cpf')?.setErrors({tam: true})
      //this.validacaoCPF = false;
    }

   }

  async validadorCpf(cpf: any, tipo: number){

    if (this.isValidCPF(cpf)) {  
      const buscaCPF = await this.service.buscaCPF(cpf)      
      if(buscaCPF){
        this.existeCPF = false;
        this.validacaoCPF = true;
      }else{
        this.existeCPF = true;
      }     
    }else{
      console.log("nao valido")
      this.validacaoCPF = false;      
      this.formulario.get('cpf')?.setErrors({tam: true})
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
  async criaFormulario(cliente: Cliente) {
    const endereco = cliente.endereco || {};
    const responsavel = cliente.responsavel || {};
    const anamnese = cliente.anamnese || {};

    console.log(endereco)

    this.formulario = this.formBuilder.group({
      id: [cliente.id],
      numPasta: [cliente.numPasta, Validators.required],
      login: [cliente.login,Validators.required],
      senha: [cliente.senha, Validators.required],
      email: [cliente.email, Validators.required],
      nome: [cliente.nome, Validators.required],
      cpf: [cliente.cpf, Validators.required],
      dataCadastro: [''],
      dataNascimento: [cliente.dataNascimento, Validators.required],
      telefone: [cliente.telefone, Validators.required],
  
      // Endereço
      endereco: this.formBuilder.group({
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        cep: ['36048502', Validators.required],
        complemento: ['', Validators.required],
        referencia: [''],
      }),
  
      // Responsável
      responsavel: this.formBuilder.group({
        nome: [''],
        telefone: [''],
        cpf: [''],
      }),
  
      // Anamnese
      anamnese: this.formBuilder.group({
        problemaSaude: ['', Validators.required],
        tratamento: ['', Validators.required],
        remedio: ['', Validators.required],
        alergia: ['', Validators.required],
        sangramentoExcessivo: [false],
        hipertenso: [false],
        gravida: [false],
        traumatismoFace: [false],
      }),
    });
  }

  replaceTelefone(tipo: number){
    let num;
    tipo === 1? num = this.formulario.get('telefone')?.value : num = this.formulario.get('responsavel.telefone')?.value ;
    
    const textoLimpo = num?.replace(/\D/g, '');
    const limite = textoLimpo.substring(0, 11);
    const telFormatado = limite.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    tipo === 1 ? this.formulario.get('telefone')?.setValue(telFormatado) : this.formulario.get('responsavel.telefone')?.setValue(telFormatado) ; 
    
  }
 
}

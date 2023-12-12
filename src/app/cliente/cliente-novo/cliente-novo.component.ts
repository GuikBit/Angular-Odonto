


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from '../cliente'
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AssyncServiceService } from 'src/app/assync-service.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Endereco } from '../cadastro/endereco';
import { MatIconButton } from '@angular/material/button';
import { CustomSnackbarComponent } from 'src/app/util/custom-snackbar/custom-snackbar.component';


@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.css']
})
export class ClienteNovoComponent {
  cliente: Cliente;
  success: boolean = false;
  errors: string | null;
  id: number;
  hide = true;
  formulario: FormGroup;
  fileToUpload: File | null = null;
  cep: string;
  msgCep: string = "Campo obrigatório";
  msgSalvar: string;
  msgSalvarStyle: string;
  msgLogin: string | null = null;
  
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

    this.msgSalvar = "Buscando informacoes do CEP informado...";
    this.msgSalvarStyle = "WarningSnackbar";
    this.openSnackBar();    

      if(this.formulario.get('endereco.cep')?.value != null ){
        this.assync.buscaCEP(this.formulario.get('endereco.cep')?.value).subscribe((response) => {
          
          this.formulario.get('endereco.cidade')?.setValue(response.localidade);
          this.formulario.get('endereco.bairro')?.setValue(response.bairro);
          this.formulario.get('endereco.logradouro')?.setValue(response.logradouro);
          this.formulario.get('endereco.complemento')?.setValue(response.complemento);

          this.formulario.updateValueAndValidity();
          this.msgSalvar = "Informações do CEP informado, foram salva!";
          this.msgSalvarStyle = "SuccessSnackbar";
          this.openSnackBar(); 
        }, errorResponse=>{
          this.msgSalvar = "Houve erro ao buscar o CEP, digite um CEP valido!";
          this.msgSalvarStyle = "DangerSnackbar";
          this.openSnackBar();
        })
      }
        
  }

  buscaLogin() {
    const loginControl = this.formulario.get('login');
    console.log(loginControl?.value)
    if (loginControl?.value != null) {
        this.service.buscaLogin(loginControl?.value).then((response) => {
            if (response === true) {
                // O login é válido
                
                this.msgSalvar = "O login digitado é válido!";
                this.msgSalvarStyle = "SuccessSnackbar";
                this.openSnackBar();
                this.limparMensagem();
            } else {
                // O login já está em uso, adicione um erro ao controle
                loginControl?.setErrors({ loginEmUso: true });
                this.msgLogin = "O login digitado já está em uso...";
                this.msgSalvar = this.msgLogin;
                this.msgSalvarStyle = "DangerSnackbar";
                this.openSnackBar();

            }
        });
    }
}

limparMensagem() {
  this.msgSalvar = '';
  this.msgSalvarStyle = '';
  this.formulario.get('login')?.setErrors(null);
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
  

    
    
}

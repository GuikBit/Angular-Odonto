


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from '../cliente'
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AssyncServiceService } from 'src/app/assync-service.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';


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
  
  constructor( private service : ClienteService, private router: Router, private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, private assync: AssyncServiceService, private _snackBar: MatSnackBar) { 
    this.cliente = new Cliente();
    this.criaFormulario(new Cliente());
  }


  ngOnInit(): void {    
    
  }

  onSubmit(){
    
    if(this.formulario.valid){
       this.service.salvarCliente(this.formulario.value)
      .subscribe(response => { 
        this.success = true; 
        this.msgSalvar = "Paciente salvo com sucesso!";
        this.msgSalvarStyle = "SuccessSnackbar";
        this.errors = null; 
        
        this.openSnackBar ( )
      }, errorResponse =>{

        this.success = false;
        this.msgSalvar = "Houve um erro ao salvar o paciente!";
        this.msgSalvarStyle = "DangerSnackbar";
        this.errors = errorResponse.error.erros;
        this.openSnackBar ( )
     })
    }
    this.success = false;
    this.msgSalvar = "Houve erro no formulario, confira os campos!";
    this.msgSalvarStyle = "WarningSnackbar";
    this.openSnackBar();
  }


  openSnackBar ( ) {
      this._snackBar.open(this.msgSalvar, "",{
        verticalPosition: "top",
        duration: 3 * 1000,
        panelClass: [this.msgSalvarStyle ]
      });
  }
  uploadFoto(): void {  }

  buscaCEP(){
      if(this.formulario.get('cep')?.value != null ){
        this.assync.buscaCEP(this.formulario.get('cep')?.value).subscribe((response) => {
          
          this.formulario.patchValue({
            cidade: response.localidade,
            bairro: response.bairro,
            logradouro: response.logradouro            
          })
          this.formulario.updateValueAndValidity();
        }, errorResponse=>{
          this.msgCep = "Ocorreu um erro, tente novamente.";
        })
      }
        
  }
     

  criaFormulario(cliente : Cliente){
      this.formulario = this.formBuilder.group({
        id: [cliente.id],
        nSerie: [cliente.nSerie, Validators.required],
        login: [cliente.login, Validators.required],
        senha: [cliente.senha, Validators.required],
        email: [cliente.email, Validators.required],
        nome: [cliente.nome, Validators.required],
        cpf: [cliente.cpf, Validators.required],
        dataCadastro: [cliente.dataCadastro],
        dataNascimento: [cliente.dataNascimento , Validators.required],
        telefone: [cliente.telefone , Validators.required],        
    
        //end
        cidade: [cliente.cidade, Validators.required],
        bairro: [cliente.bairro, Validators.required],
        logradouro: [cliente.logradouro, Validators.required],
        numero: [cliente.numero, Validators.required],
        cep: [cliente.cep, Validators.required],
        complemento: [cliente.complemento, Validators.required],
        referencia: [cliente.referencia], 
    
        //pais
        nomeResp: [cliente.nomeResp],
        telResp: [cliente.telResp],
        cpfResp: [cliente.cpfResp],
        
    
        //Anamnese
        porDoenca: [cliente.porDoenca, Validators.required],
        tratMedico: [cliente.tratMedico, Validators.required],
        nomeTrat: [cliente.nomeTrat, Validators.required],
        usaMedic: [cliente.usaMedic, Validators.required],
        alergicoMedic: [cliente.alergicoMedic, Validators.required],
        sangramentoExcessivo: [cliente.sangramentoExcessivo],
        hipertenso: [cliente.hipertenso],
        gravida: [cliente.gravida],
        traumatismoFace: [cliente.traumatismoFace]
      })
  }

    
    
}

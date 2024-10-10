import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../class/usuario';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  cadastrando?: boolean;
  msgSuccess?: string;
  errors?: string[];


  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private messageService: MessageService,
    private globalService: GlobalService ) { }

  ngOnInit(): void {

  }

  async onSubmitLogin(){
    try{
      if(this.loginForm.valid){
        const response = await this.authService.login(this.loginForm.get('userName')?.value || '', this.loginForm.get('password')?.value || '')
        if(response.status === 200){

          localStorage.setItem('access_token', JSON.stringify(response.data.result));
          localStorage.setItem('userLogado', JSON.stringify(response.data.usuario));
          localStorage.setItem('organizacao', JSON.stringify(response.data.usuario.idOrganizacao));
        // console.log(response.data.usuario)
          // this.globalService.setGlobalUser(response.data.usuario);
          // this.globalService.setGlobalOrganizacao(response.data.usuario.idOrganizacao);
          // this.globalService.setGlobalToken(response.data.result);

        //  console.log(this.globalService.getGlobalOrgnizacao());

          this.loginForm.reset();

          this.router.navigate(['/dashboard']);

          this.messageService.add({
            severity: 'success',
            summary: `Olá ${response.data.usuario.nome}`,
            detail: 'Bem vindo de volta...',
            life: 2000
          })

        }
      }
      else{
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Usuário e/ou senha não preenchidos',
          life: 2000
        })
      }

    }catch(error){
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuário e/ou senha incorretos!',
        life: 2500
      })
    }
  }


  cadastro (){}

/*cadastro(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.userName;
    usuario.password = this.password;
    this.authService.salvar(usuario).subscribe(
      response =>{

        this.msgSuccess = "Cadastro realizado com sucesso! Efetue o login!";
        this.cadastrando = false;
        this.userName = '';
        this.password = '';
        this.errors = null;
      }, errorResponse=>{

        this.errors = errorResponse.error.erros;
        this.msgSuccess = null;
        this.cadastrando = true;
      })
  }*/
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName?: string;
  password?: string;
  cadastrando?: boolean;
  msgSuccess?: string;
  errors?: string[];
  

  

  constructor(private router: Router,private fb: FormBuilder, private authService: AuthService) { }

  onSubmit(){    

    this.authService.login(this.userName || '', this.password || '').subscribe((response) =>{      
      console.log( this.authService.login)
      const access_token = JSON.stringify(response);
      localStorage.setItem('access_token', access_token);     
      console.log(localStorage.getItem) 
      this.router.navigate(['/home']);
    }, errorResponse=>{
      console.log(errorResponse)
      this.errors = ['Usúario e/ou senha incorretos!'];
    })    
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

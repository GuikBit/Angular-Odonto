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

  async onSubmit(){    

    // this.authService.login(this.userName || '', this.password || '').subscribe((response) =>{      
    //   //console.log( this.authService.login)
    //   const access_token = JSON.stringify(response);
    //   localStorage.setItem('access_token', access_token);     
    //   console.log(localStorage.getItem) 
    //   this.router.navigate(['/home']);
    // }, errorResponse=>{
    //   console.log(errorResponse)
    //   this.errors = ['Usúario e/ou senha incorretos!'];
    // }) 

    //     localStorage.setItem('access_token', response.data.result);
    //     localStorage.setItem('userLogado', response.data.usuario);

    //     this.router.navigate(['/home'])        
    //     return 0;
    //   }else{
    //     return response.status
    //   }
      
    // }).catch(error => {
    //   return 'Ocorreu um erro ao fazer o login: ' + error;
    // });
    try{
      const response = await this.authService.login(this.userName || '', this.password || '')
      if(response.status === 200){ 
        
        localStorage.setItem('access_token', JSON.stringify(response.data.result));
        localStorage.setItem('userLogado', JSON.stringify(response.data.usuario));
        this.router.navigate(['/home']);
         

      }
    }catch(error){
      this.errors = ['Usuário e/ou senha incorretos!'];
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

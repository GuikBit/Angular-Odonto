import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
//import { Usuario } from './login/usuario';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { JwtHelperService } from '@auth0/angular-jwt';
import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiURLBase + "/api/usuarios";
  tokenUrl: string = environment.apiURLBase + environment.obertTokenUrl;
  clientId: string = environment.clientId;
  clientSecret:string = environment.clienteSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { 
   
  }

  obterToken(){
    const tokenStr = localStorage.getItem('access_token')  
    
    if(tokenStr){
      const token = JSON.parse(tokenStr)
      return token;
    }
    return null;
  }

  encerraSessao(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('userLogado')
  }
  getUsuarioAutenticado(){
    const token = this.obterToken()
    
    if(token){
      const user= this.jwtHelper.decodeToken(token).user_name
      return user;
    }
    return null;
  }

  async isAuthenticated(): Promise<boolean>{
    const token = await this.obterToken();
    
    if(token)
    {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  /*salvar(usuario : Usuario): Observable<any> {
   
    return this.http.post<any>(this.apiUrl, usuario);
  }*/

  // login(username: string, password: string ) : Observable<any>{
  //   const params = new HttpParams().set('username', username).set('password', password).set('grant_type', 'password');
  //   const headers = {      
  //     'Authorization': 'Basic '+ btoa(`${this.clientId}:${this.clientSecret}`),
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  //   console.log(this.tokenUrl)
  //   return this.http.post(this.tokenUrl, params.toString(), {headers})
  // }
  async login(username: string, password: string ): Promise<any>{

    const obj = {
      "login": username,
      "password": password
    }
    return axios.post(this.tokenUrl, obj)
   
  }
}

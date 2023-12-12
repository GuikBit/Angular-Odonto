import { Injectable } from '@angular/core';
import { Cliente } from './cliente/cliente';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ClientePagina } from './cliente/clientePagina';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL : String = environment.apiURLBase + '/v1/paciente';

  constructor( private http: HttpClient) {

  }
    // salvarCliente(cliente : Cliente) : Observable<Cliente>
    // {
    //   return this.http.post<Cliente>(`${this.apiURL}/novoPaciente`, cliente);
    // }

    atualizarCliente(cliente : Cliente) : Observable<any>
    {
      return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
    }

    getClientes(): Observable<Cliente[]>{      
      return this.http.get<Cliente[]>(`${this.apiURL}`);
    }
    getClientesPage(page:any, size:any): Observable<ClientePagina>{       
      const params = new HttpParams().set('page', page).set('size', size);     
      return this.http.get<ClientePagina>(`${this.apiURL}/web?${params.toString()}`);
    }

    getClienteId(id : number) : Observable<Cliente>{      
      return this.http.get<any>(`${this.apiURL}/${id}`);
    }
    
    deletarCliente(cliente : Cliente) : Observable<any>
    {
      return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
    }

    //Novo com axios

    async salvarPaciente(paciente : any){
      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()), 
        'Content-Type': 'application/json' },
      });
      try { 
        console.log(paciente)
        const response = await instance.post(`${this.apiURL}`, paciente);    
        console.log("Teste")    
        return response;
        // return null;

      } catch (error) {
        console.log("Deu erro na requisição")
        console.error(error);
        return null
      }
    }

    async getPacientes(page:number, size:number){
      
      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()) },
      });
          
      try { 
        const response = await instance.get(`${this.apiURL}s?page=${page}&size=${size}`);        
        return response;

      } catch (error) {
        console.error(error);
        return null
      }
    }
    
    async getToken(){
      return (localStorage.getItem('access_token')?.replace(/"/g, '')) || ''
    }

    async totalPacientes(){
      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()) },
      });
      try { 
        const response = await instance.get(`${this.apiURL}/total`);      
        return response.data;
      } catch (error) {
        console.error(error);
        return <any> 0;
      }
    }

    async buscaLogin(login: string){
      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken())},
      });

      try { 
        const response = await instance.get(`${this.apiURL}/validaLogin`);      
        if(response.status === 200 || response.status === 201){
          return true;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return <any> error;
      }
    }
    
}

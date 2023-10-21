import { Injectable } from '@angular/core';
import { Cliente } from './cliente/cliente';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ClientePagina } from './cliente/clientePagina';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL : String = environment.apiURLBase + '/api/clientes';

  constructor( private http: HttpClient) {

  }
    salvarCliente(cliente : Cliente) : Observable<Cliente>
    {
      return this.http.post<Cliente>(`${this.apiURL}/novoPaciente`, cliente);
    }

    atualizarCliente(cliente : Cliente) : Observable<any>
    {
      return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
    }

    getClientes(): Observable<Cliente[]>{      
      return this.http.get<Cliente[]>(`${this.apiURL}`);
    }
    getClientesPage(page:any, size:any): Observable<ClientePagina>{ 
      const params = new HttpParams().set('page', page).set('size', size);     
      return this.http.get<ClientePagina>(`${this.apiURL}/buscaAll?${params.toString()}`);
    }

    getClienteId(id : number) : Observable<Cliente>{      
      return this.http.get<any>(`${this.apiURL}/${id}`);
    }
    
    deletarCliente(cliente : Cliente) : Observable<any>
    {
      return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
    }
}

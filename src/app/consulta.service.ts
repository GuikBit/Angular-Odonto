import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from 'src/environments/environments';
import { DentistaPagina } from './dentista/dentistaPagina';
//import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  apiURL : String = environment.apiURLBase+'/api/consulta'
  constructor(private http: HttpClient) { }

  /*salvar(servicoPrestado : ServicoPrestado) : Observable<ServicoPrestado>{
    return this.http.post<ServicoPrestado>(`${this.apiURL}`, servicoPrestado);
  }

  busca(nome: string, mes: number):Observable<ServicoPrestadoBusca>{
    const httpParans = new HttpParams().set("nome", nome?nome:"").set("mes", mes? mes.toString():"");
    const url = this.apiURL + "?"+httpParans.toString(); 
 
    return this.http.get<any>(url);
  }*/

  getDentistaPage(page:any, size:any): Observable<DentistaPagina>{ 
    const params = new HttpParams().set('page', page).set('size', size);     
    return this.http.get<DentistaPagina>(`${this.apiURL}/buscaAll?${params.toString()}`);
  }
}

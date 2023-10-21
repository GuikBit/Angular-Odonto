
import { Injectable } from '@angular/core';
import { Dentista } from './dentista/dentista';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ClientePagina } from './cliente/clientePagina';
import { DentistaPagina } from './dentista/dentistaPagina';

@Injectable({
  providedIn: 'root'
})
export class DentistaService {

  apiURL : String = environment.apiURLBase + '/api/dentista';

  constructor(  private http: HttpClient ) { }

  salvarDentista(dentista : Dentista) : Observable<Dentista>
  {
    return this.http.post<Dentista>(`${this.apiURL}/novoPaciente`, dentista);
  }
  
  getDentistaPage(page:any, size:any): Observable<DentistaPagina>{ 
    const params = new HttpParams().set('page', page).set('size', size);     
    return this.http.get<DentistaPagina>(`${this.apiURL}/buscaAll?${params.toString()}`);
  }

  getDentistaId(id : number) : Observable<Dentista>{      
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
  
  deletarDentista(dentista : Dentista) : Observable<any>
  {
    return this.http.delete<any>(`${this.apiURL}/${dentista.id}`);
  }
}

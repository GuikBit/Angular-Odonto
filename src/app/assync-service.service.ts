import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssyncServiceService {

  constructor(private http: HttpClient) { }

  buscaCEP(cep: string){
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }


}

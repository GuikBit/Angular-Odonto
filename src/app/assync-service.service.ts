import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class AssyncServiceService {

  constructor(private http: HttpClient) { }

  buscaCEP(cep: string){
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  async buscaCEP2(cep: any){

    try{
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      return response;
    }catch (error) {
      console.error(error);
      return null
    }
  }


}

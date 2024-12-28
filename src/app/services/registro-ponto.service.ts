import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RegistroPontoService {

  apiURL : String = environment.apiURLBase + '/v1/pontoeletronico';

  constructor() { }

  async getToken(){
    return (localStorage.getItem('access_token')?.replace(/"/g, '')) || '';
  }

  async getPontoEletronico(idOrg: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}?idOrg=${idOrg}`)
      return response;
    }catch(error){
      return null;
    }
  }

  async getPontoEletronicoById(id: any, idOrg: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/${id}?idOrg=${idOrg}`)
      return response;
    }catch(error){
      return null;
    }
  }


}

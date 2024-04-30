import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  apiURL : String = environment.apiURLBase + '/v1/financeiro';

  constructor() { }

  async getToken(){
    return (localStorage.getItem('access_token')?.replace(/"/g, '')) || ''
  }

  async getConsultasPagar() {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/contasPagar`)
      return response;
    }catch(error){
      return null;
    }
  }

  async getConsultasReceber() {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/contasReceber`)
      return response;
    }catch(error){
      return null;
    }
  }
}

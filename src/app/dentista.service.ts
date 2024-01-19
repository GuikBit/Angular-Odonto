
import { Injectable } from '@angular/core';
import { Dentista } from './dentista/dentista';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DentistaService {

  apiURL : String = environment.apiURLBase + '/v1/dentista';

  constructor() { }

  async getToken(){
    return (localStorage.getItem('access_token')?.replace(/"/g, '')) || ''
  }

  async getDentistaFull(id: string) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/${id}`)
      return response.data;
    }catch(error){
      console.error(error);
      return null
    }
  }

  async getDentistas(){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}`)
      return response.data;
    }catch(error){
      console.error(error);
      return null
    }
  }

  async getById(id: string){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/${id}`)
      return response.data;
    }catch(error){
      console.error(error);
      return null
    }
  }

  async buscaLogin(login: string) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken())},
    });

    try {
      const response = await instance.get(`${this.apiURL}/validaLogin?login=${login}`);

      if(response.data === true){
        return true;
      }else {
        return false;
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  async buscaCPF(cpf: any) {
    const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken())},
      });
      try {
        const response = await instance.get(`${this.apiURL}/validaCPF?cpf=${cpf}`);

        if(response.data === true){
          return true;
        }else {
          return false;
        }
      } catch (error) {
        console.log(error)
        return false;
      }
    }

}

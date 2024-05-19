
import { Injectable } from '@angular/core';
import { Dentista } from './class/dentista';
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

  async getDentistaFull(id: any, idOrg: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 2000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/${id}?idOrg=${idOrg}`)
      return response.data;
    }catch(error){
      console.error(error);
      return null
    }
  }

  async getDentistas(idOrg: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 2000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`?idOrg=${idOrg}`)
      return response.data;
    }catch(error){
      console.error(error);
      return null
    }
  }

  async getByIdDentista(id: any, idOrg: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 2000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`/${id}?idOrg=${idOrg}`)
      return response.data;
    }catch(error){

      return null
    }
  }
  async postDentita(dentista: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 2000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()),
      'Content-Type': 'application/json' },
    });
    try{
      const response = await instance.post( dentista )
      return response;

    }catch(error){
      return null
    }
  }
  async buscaLogin(login: string) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 2000,
      headers: { Authorization: 'Bearer ' + (await this.getToken())},
    });

    try {
      const response = await instance.get(`/validaLogin?login=${login}`);

      if(response.data === true){
        return true;
      }else {
        return false;
      }
    } catch (error) {
      //console.log(error)
      return false;
    }
  }

  async getByEspecialidades() {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 2000,
      headers: { Authorization: 'Bearer ' + (await this.getToken())},
    });

    try {
      const response = await instance.get(`/especialidade`);
      if (response.data) {
        return response.data;
      } else {
        return 0;
      }
    } catch (error) {
      return false;
    }
  }
  async postEspecialidade(espec: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 2000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try {
      const response = await instance.post('/especialidade', espec);

      return response;
    } catch (error) {
      console.error('Error posting especialidade:', error);
      return false;
    }
  }
  async putEspecialidade(id: any, espec: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken())},
    });

    try {
      const response = await instance.put(`${this.apiURL}/especialidade`,id, espec);

      if(response){
        return response;
      }else {
        return 0;
      }
    } catch (error) {

      return false;
    }
  }
  async deleteEspecialidade(id: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken())},
    });

    try {
      const response = await instance.delete(`${this.apiURL}/especialidade/${id}`);

      if(response){
        return response.data;
      }else {
        return 0;
      }
    } catch (error) {

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
        //console.log(error)
        return false;
      }
    }

}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OrganizacaoService {

  apiURL : String = environment.apiURLBase + '/v1/organizacao';

  constructor() { }

  async getToken(){
    return (localStorage.getItem('access_token')?.replace(/"/g, '')) || ''
  }

  async getOrganizacaoById(id:any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/${id}`);

      return response.data;

    }catch(error){
      return null;
    }
  }

  async getOrganizacao(){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}`);
      return response;

    }catch (error) {
      console.error(error);
      return null
    }
  }

  async buscaLogin(login: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/funcionario/login?login=${login}`);

      return response;

    }catch(error){
      return null;
    }
  }


  async postOrgFuncionario( func: any ) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()),
        'Content-Type': 'application/json'
      },
    });

    try{

      const response = await instance.post(`${this.apiURL}/funcionario`, func);

      return response;

    }catch(error){
      return null;
    }
  }

  async getOrgFuncionarios(orgId: any ) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{

      const response = await instance.get(`/funcionarios?idOrg=${orgId}`);

      return response;

    }catch(error){
      return null;
    }
  }
}

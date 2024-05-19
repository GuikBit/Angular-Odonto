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
}

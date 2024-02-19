import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiURL : String = environment.apiURLBase+'/v1/dashBord'

  constructor() { }

  async getToken(){
    return (localStorage.getItem('access_token')?.replace(/"/g, '')) || ''
  }

  async getDashBoard(){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}`)
      return response;

    }catch (error) {
      console.error(error);
      return null
    }
  }
  async getListInfo() {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/listaInfos`)
      return response;

    }catch (error) {
      console.error(error);
      return null
    }
  }
}

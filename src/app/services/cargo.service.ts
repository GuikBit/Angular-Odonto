import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class CargoService {

  apiURL : String = environment.apiURLBase + '/v1/cargo';


  constructor() { }

  async getToken(){
    return (localStorage.getItem('access_token')?.replace(/"/g, '')) || ''
  }

  async getCargos(idOrg: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}/?idOrg=${idOrg}`)
      return response;

    }catch (error) {
      console.error(error);
      return null
    }
  }

  async postCargo(idOrg: any, cargo: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()),
      'Content-Type': 'application/json' },
    });
    try {
      //console.log(paciente)
      const response = await instance.post(`${this.apiURL}/?idOrg=${idOrg}`, cargo);
      return response;

    } catch (error) {
      console.log("Deu erro na requisição")
      console.error(error);
      return null
    }
  }

  async putCargo(id: any, cargo: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()),
      'Content-Type': 'application/json' },
    });
    try {
      //console.log(paciente)
      const response = await instance.put(`${this.apiURL}/${id}`, cargo);
      return response;


    } catch (error) {
      console.log("Deu erro na requisição")
      console.error(error);
      return null
    }
  }

  async getCargoById(id: any, idOrg: any){

    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try {
      const response = await instance.get(`${this.apiURL}/${id}?idOrg=${idOrg}`);
      return response.data;

    } catch (error) {
      console.error(error);
      return null
    }
  }

}

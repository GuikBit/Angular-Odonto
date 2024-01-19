import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from 'src/environments/environments';
//import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import axios from 'axios';
import { Consulta } from './consulta/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  apiURL : String = environment.apiURLBase+'/v1/consulta'
  constructor(private http: HttpClient) { }

  async getToken(){
    return (localStorage.getItem('access_token')?.replace(/"/g, '')) || ''
  }

  async getConsultas(){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });

    try{
      const response = await instance.get(`${this.apiURL}`)
      return response.data;

    }catch (error) {
      console.error(error);
      return null
    }
  }
  async getConsultaById(id: any): Promise<Consulta> {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken())},
    });

    try{
      const response = await instance.get(`${this.apiURL}/${id}`)
      return response.data;

    }catch (error) {
      console.error(error);
      return new Consulta();
    }
  }
  async postConsulta(consulta: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()),
      'Content-Type': 'application/json'},
    });
    try{
      console.log(consulta);
      const response = await instance.post(`${this.apiURL}`, consulta)
      return response.data;

    }catch (error) {
      console.error(error);
      return error;
    }
  }
  async getEspecConsulta() {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.get(`${this.apiURL}s/novaespec`)
      return response.data;

    }catch (error) {
      console.error(error);
      return error;
    }
  }


  // async totalConsultas(){
  //   const instance = axios.create({
  //     baseURL: `${this.apiURL}`,
  //     timeout: 1000,
  //     headers: { Authorization: 'Bearer ' + (await this.getToken()) },
  //   });
  //   try {
  //     console.log(`${this.apiURL}s/total`)
  //     const response = await instance.get(`${this.apiURL}s/total`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     return <any> 0;
  //   }
  // }
}

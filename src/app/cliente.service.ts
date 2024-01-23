import { Injectable } from '@angular/core';
import { Cliente } from './cliente/cliente';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL : String = environment.apiURLBase + '/v1/paciente';

  constructor( private http: HttpClient) {

  }
    //Novo com axios

    async postPaciente(paciente : any){
      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()),
        'Content-Type': 'application/json' },
      });
      try {

        const response = await instance.post(`${this.apiURL}`, paciente);
        return response;

      } catch (error) {
        console.log("Deu erro na requisição")
        console.error(error);
        return null
      }
    }

    async putPaciente(id: any, paciente: any) {
      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()),
        'Content-Type': 'application/json' },
      });
      try {
        //console.log(paciente)
        const response = await instance.put(`${this.apiURL}/${id}`, paciente);
        return response;


      } catch (error) {
        console.log("Deu erro na requisição")
        console.error(error);
        return null
      }
    }


    async getPacienteById(id: any){

      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()) },
      });

      try {
        const response = await instance.get(`${this.apiURL}/${id}`);
        return response.data;

      } catch (error) {
        console.error(error);
        return null
      }
    }
    async getPacientes(){

      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()) },
      });

      try {
        const response = await instance.get(`${this.apiURL}`);
        return response.data;

      } catch (error) {
        console.error(error);
        return null
      }
    }
    async reativarPaciente(id: any) {
      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()) },
      });
      try {
        const response = await instance.delete(`${this.apiURL}/reativar/${id}`);
        return response;

      } catch (error) {
        console.error(error);
        return null
      }

    }
    async inativarPaciente(id: any) {
      const instance = axios.create({
        baseURL: `${this.apiURL}`,
        timeout: 1000,
        headers: { Authorization: 'Bearer ' + (await this.getToken()) },
      });
      try {
        const response = await instance.delete(`${this.apiURL}/inativar/${id}`);
        return response;

      } catch (error) {
        console.error(error);
        return null
      }
    }

    async getToken(){
      return (localStorage.getItem('access_token')?.replace(/"/g, '')) || ''
    }


    async buscaLogin(login: string){
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

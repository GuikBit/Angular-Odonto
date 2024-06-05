import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from 'src/environments/environments';
//import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import axios from 'axios';
import { Consulta } from './class/consulta';

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
  }});
    try{
      const response = await instance.post(`${this.apiURL}`, consulta);
      return response;

    }catch (error) {
      console.error(error);
      return null;
    }
  }

  async putConsulta(id: any, novo: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()),
      'Content-Type': 'application/json'},
    });
    try{
      const response = await instance.put(`${this.apiURL}/${id}`, novo);
      return response;

    }catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteConsulta(id: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()),
      'Content-Type': 'application/json'},
    });
    try{
      const response = await instance.delete(`${this.apiURL}`, id );
      return response;

    }catch (error) {
      console.error(error);
      return null;
    }
  }

  async getEspecConsulta() {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.get(`${this.apiURL}/especialidade`)
      return response.data;

    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async postEspecConsulta(espec: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.post(`${this.apiURL}/especialidade`, espec)
      return response.status;

    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async putEspecConsulta(espec: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.put(`${this.apiURL}/especialidade`, espec)
      return response.status;

    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async deleteEspecConsulta(id: any){
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.delete(`${this.apiURL}/especialidade/${id}`)
      return response.status;

    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async iniciarConsulta(id: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.get(`${this.apiURL}/iniciar/${id}`)
      return response.data;

    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async finalizarConsulta(id: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.get(`${this.apiURL}/finalizar/${id}`)
      return response;

    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async ausentarPaciente(id: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.get(`${this.apiURL}/ausentar/${id}`)
      return response;

    }catch (error) {
      console.error(error);
      return error;
    }
  }
  async presencaPaciente(id: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.get(`${this.apiURL}/presenca/${id}`)
      return response;

    }catch (error) {
      console.error(error);
      return error;
    }
  }
  async postProcedimentoConsulta(consulta: Consulta) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.post(`${this.apiURL}/procedimento`, consulta)
      return response.status;

    }catch (error) {
      console.error(error);
      return error;
    }
  }

  async salvarPagamento(consulta: any) {
    const instance = axios.create({
      baseURL: `${this.apiURL}`,
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + (await this.getToken()) },
    });
    try{
      const response = await instance.post(`${this.apiURL}/salvarPagamento`, consulta)
      return response;

    }catch (error) {
      console.error(error);
      return error;
    }
  }

}

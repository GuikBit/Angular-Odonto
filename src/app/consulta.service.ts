import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from 'src/environments/environments';
//import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  apiURL : String = environment.apiURLBase+'/v1/consulta'
  constructor(private http: HttpClient) { }

  /*salvar(servicoPrestado : ServicoPrestado) : Observable<ServicoPrestado>{
    return this.http.post<ServicoPrestado>(`${this.apiURL}`, servicoPrestado);
  }

  busca(nome: string, mes: number):Observable<ServicoPrestadoBusca>{
    const httpParans = new HttpParams().set("nome", nome?nome:"").set("mes", mes? mes.toString():"");
    const url = this.apiURL + "?"+httpParans.toString();

    return this.http.get<any>(url);
  }*/

  // getDentistaPage(page:any, size:any): Observable<DentistaPagina>{
  //   const params = new HttpParams().set('page', page).set('size', size);
  //   return this.http.get<DentistaPagina>(`${this.apiURL}s?${params.toString()}`);
  // }
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

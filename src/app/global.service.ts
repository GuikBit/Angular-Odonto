import { Injectable } from '@angular/core';
import { User } from './admin/user';
import { Organizacao } from './class/Organizacao';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private globalUser: User ;
  private globalOrganizacao: Organizacao;
  private globalToken: string ;

  constructor() { }

  setGlobalToken(token: string): void {
    this.globalToken = token;
  }

  getGlobalToken(): string  {
    return this.globalToken;
  }

  setGlobalOrganizacao(organizacao: Organizacao): void {
    this.globalOrganizacao = organizacao;
  }

  getGlobalOrganizacao(): Organizacao {
    return this.globalOrganizacao;
  }

  setGlobalUser(user: User): void {
    this.globalUser = user;
  }

  getGlobalUser(): User  {
    return this.globalUser;
  }
}

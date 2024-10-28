import { Cargo } from "../class/Cargo";
import { Dentista } from "../class/dentista";
import { User } from "./user";

export class Funcionario extends User {

  RG: string;
  RgUf: string;
  OrgEmissor: string;
  PisPasep: string;
  CTPSN: string;
  CTPSSerie: string;
  CTPSUF: string;
  DataAdmissao: string;
  DataRescisao: string;
  RegistroN: string;
  IdEndereco: string;
  Endereco: any;
  IdCargo: string;
  Cargo: Cargo;


}

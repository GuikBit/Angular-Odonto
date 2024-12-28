import { Funcionario } from "../admin/Funcionarios";
import { Organizacao } from "./Organizacao";


type Time = string;

export enum Status {
  Aprovado = 1,
  Pendente = 2,
  Rejeitado = 3,
}

export enum TipoRegistro
{
    InicioExpediente = 1,
    FimExpediente = 2,
    InicioAlmoco = 3,
    FimAlmoco = 4,
    InicioPausa = 5,
    FimPausa = 6,
}

export class RegistroPonto {
  Id: number;
  OrganizacaoId: number;
  Organizacao: Organizacao;
  FuncionarioId: number;
  Funcionario: Funcionario;
  DataCriacao: Date;
  DataRegistro: Date;
  HoraRegistro: Time;
  Status: Status;
  Registro: TipoRegistro;
  Controle: string;
  Observacao: string;
}

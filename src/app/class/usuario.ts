import { Organizacao } from "./Organizacao";

export class Usuario{
    username? : string;
    password?: string;
    id?: number;
    nSerie?: number;
    email?: string;
    nome?: string;
    cpf?: string;
    dataCadastro?: string;
    dataNascimento?: string;
    telefone?: string;

    OrganizacaoId?: number;
    IdOrganizacao?: Organizacao;
}


export class User {
  id: number;
  login: string = '';
  senha: string = '';
  email: string = '';
  nome: string = '';
  cpf: string = '';
  dataCadastro: string;
  dataNascimento: string = '';
  telefone: string = '';
  ativo: boolean;
  role: string;
  nivelAcesso: number;
}

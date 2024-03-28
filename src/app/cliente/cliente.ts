import { Anamnese } from './cadastro/anamnese';
import { Endereco } from './cadastro/endereco';
import { Responsavel } from './cadastro/responsavel';

export class Cliente {

    id?: number;
    numPasta?: string = '';
    login?: string = '';
    senha?: string = '';
    email?: string = '';
    nome?: string = '';
    cpf?: string = '';
    dataCadastro?: string;
    dataNascimento?: string = '';
    telefone?: string = '';
    ativo?: boolean;
    role?: string;

    fotoPerfil?: File;

    endereco: Endereco;
    anamnese: Anamnese;
    responsavel: Responsavel;


    //outros

    // queixaPrincipal?: string;

    // dataUltimoExame?:string;

    // frequenciaDentista?: string;

    // higieneBucal?: string;

    // frequenciaEscovacao?: string;

    // habitos?: string;

    // observacao?: string;


}

import { Anamnese } from './cadastro/anamnese';
import { Endereco } from './cadastro/endereco';
import { Responsavel } from './cadastro/responsavel';

export class Cliente {
    
    id?: number;
    numPasta?: string = '1234';
    login?: string = 'gui';
    senha?: string = '123';
    email?: string = 'gui@gmail.com';
    nome?: string = 'Guilherme Pinto de Oliveira';
    cpf?: string = '12098133600';
    dataCadastro?: string;
    dataNascimento?: string = '18/11/1998';
    telefone?: string = '(32) 99822-0082'; 
    ativo?: boolean;
    role?: string;

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
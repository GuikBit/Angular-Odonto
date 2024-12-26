import { User } from '../admin/user';
import { Anamnese } from './anamnese';
import { Endereco } from './endereco';
import { Responsavel } from './responsavel';

export class Cliente extends User {


    numPasta?: string = '';
    fotoPerfil?: File;

    endereco: Endereco = new Endereco();
    anamnese: Anamnese = new Anamnese();
    responsavel: Responsavel = new Responsavel();

    //outros

    // queixaPrincipal?: string;

    // dataUltimoExame?:string;

    // frequenciaDentista?: string;

    // higieneBucal?: string;

    // frequenciaEscovacao?: string;

    // habitos?: string;

    // observacao?: string;


}

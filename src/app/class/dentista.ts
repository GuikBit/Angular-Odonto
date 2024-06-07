import { User } from "../admin/user";

export class Dentista extends User{


    cro?: string;
    corDentista: string;
    especialidade?: {tipo: string, descricao: string, id: string};
    consultas?: {}



}

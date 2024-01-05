import { Time } from "@angular/common";
import { Cliente } from "../cliente/cliente";
import { Dentista } from "../dentista/dentista";

export class Consulta{
    id?: number;
    // pacienteId: number;
    // dentistaId: number;
    dataConsulta: Date;
    horaConsulta: Time;
    dataHoraAtendimento: Date;
    procedimento: string;
    tempoPrevisto: string;

    // EspecConsulta: EspecConsulta;
    paciente: Cliente;
    dentista: Dentista;
    
}

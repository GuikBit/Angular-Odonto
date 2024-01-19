import { Time } from "@angular/common";
import { Cliente } from "../cliente/cliente";
import { Dentista } from "../dentista/dentista";
import { ConsultaEspecialidade } from "./consultaEspecialidade";

export class Consulta{
    id?: number;
    dataConsulta: Date;
    dataConsultaReserva: Date;
    dataHoraInicioAtendimento: Date;
    dataHoraFimAtendimento: Date;
    tempoPrevisto: number;
    paciente: Cliente;
    dentista: Dentista;
    // pagamento: Pagamento;
    consultaEspecialidade: ConsultaEspecialidade;
    observacao: string;
    ausente: boolean;

}

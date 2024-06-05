import { Time } from "@angular/common";
import { Cliente } from "./cliente";
import { Dentista } from "./dentista";
import { ConsultaEspecialidade } from "./consultaEspecialidade";
import { Pagamento } from "./pagamento";

export class Consulta{
    id: number;
    dataConsulta: Date;
    dataConsultaReserva: Date;
    dataHoraInicioAtendimento: Date;
    dataHoraFimAtendimento: Date;
    tempoPrevisto: number;
    paciente: Cliente;
    dentista: Dentista;
    pagamento: Pagamento;
    consultaEspecialidade: ConsultaEspecialidade;
    observacao: string;
    procedimentos: string;
    ausente: boolean;
    corDentista: string;
    nomePaciente: string;
    telefone: string;
}

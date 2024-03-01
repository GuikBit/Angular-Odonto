import { Parcela } from "./parcela";

export class Pagamento{
  id: number;
  valorTotal: number;
  formaDePagamento: string;
  pago: boolean
  desconto: number;
  acrecimo: number;
  dataDoPagamento: Date;

  parcelas: Parcela[];

}

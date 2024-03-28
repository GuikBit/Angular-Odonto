import { Parcela } from "./parcela";

export class Pagamento{
  id: number;
  valorTotal: number;
  pago: boolean
  desconto: number;
  acrecimo: number;
  fatFechado: boolean;
  qtdParcela: number;
  parcelas: Parcela[];

}

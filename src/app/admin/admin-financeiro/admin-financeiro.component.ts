
import { Component, OnInit } from '@angular/core';
import { FinanceiroService } from 'src/app/financeiro.service';
import { ConstaPagar, ConstaReceber } from '../classes';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-financeiro',
  templateUrl: './admin-financeiro.component.html',
  styleUrl: './admin-financeiro.component.css'
})
export class AdminFinanceiroComponent implements OnInit {

  contasReceber: ConstaReceber[];
  contasPagar: ConstaReceber[];

  constructor(private financeiroService: FinanceiroService, private messageService: MessageService) {}

  ngOnInit() {
    this.financeiroService.getConsultasReceber().then((response)=>{
      if(response?.status == 200 ){
        this.contasReceber = response.data;
      }
      else{
        this.messageService.add({
          severity: 'error',
          summary: 'Aviso',
          detail: 'Houve erro na requisicao das contas a receber'
        })
      }
    })

    this.financeiroService.getConsultasPagar().then((response)=>{
      if(response?.status == 200 || response?.status == 201){
        this.contasPagar = response.data;
      }
      else{
        this.messageService.add({
          severity: 'error',
          summary: 'Aviso',
          detail: 'Houve erro na requisicao das contas a pagar'
        })
      }
    })
  }

}

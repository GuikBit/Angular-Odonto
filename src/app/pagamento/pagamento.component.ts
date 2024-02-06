import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Consulta } from '../consulta/consulta';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  @Input() consultaSelecionadaPg: Consulta;
  @Output() closeModal = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
     console.log("Pagamento: ", this.consultaSelecionadaPg)
  }

  closeModalPagamento(){
    this.closeModal.emit(false);
  }
}

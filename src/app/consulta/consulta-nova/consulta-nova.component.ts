import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/cliente/cliente';

@Component({
  selector: 'app-consulta-nova',
  templateUrl: './consulta-nova.component.html',
  styleUrls: ['./consulta-nova.component.css']
})
export class ConsultaNovaComponent implements OnInit {
  @Input() pacienteSelecionado: any;
  @Input() dentistaSelecionado: any;

  
  constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

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

  dentistas: any[] | undefined;
  pacientes: any[] | undefined;
  ingredient: any;
  selectedCountry: any | undefined;

    ngOnInit() {
        this.dentistas = [

            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
        this.pacientes = [
          {name: 'Selecione um Paciente', code: ''},
          { name: 'Australia', code: 'AU' },
          { name: 'Brazil', code: 'BR' },
          { name: 'China', code: 'CN' },
          { name: 'Egypt', code: 'EG' },
          { name: 'France', code: 'FR' },
          { name: 'Germany', code: 'DE' },
          { name: 'India', code: 'IN' },
          { name: 'Japan', code: 'JP' },
          { name: 'Spain', code: 'ES' },
          { name: 'United States', code: 'US' }
      ];
    }

}

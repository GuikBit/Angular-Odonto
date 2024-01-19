import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cliente';

  constructor(private config: PrimeNGConfig){}

  ngOnInit(): void {

    this.config.setTranslation({
      accept: 'Aceitar',
      reject: 'Cancelar',
      clear: 'Limpar',
      apply: 'Aplicar',
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não contém',
      endsWith: 'Termina com',
      equals: 'É igual a',
      notEquals: 'Não é igual',
      lt: 'Menor que',
      lte: 'Menor que ou igual a',
      gt: 'Maior que',
      gte: 'Maior que ou igual a',
      dateIs: 'Data igual',
      dateIsNot: 'Data não igual',
      dateBefore: 'Data posterior a',
      dateAfter: 'Data anterior a',
      matchAll: 'Filtrar todos',
      matchAny: 'Filtrar com qualquer',
      today: 'Hoje'
      
      // matchAll: 'Marcar todos'
      //date

    //   primengConfig.filterMatchModeOptions = {
    //     text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    //     numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    //     date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    // };
  });

  }
}

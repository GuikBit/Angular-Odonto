import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Translation } from 'primeng/api';
// import { TranslateService } from '@ngx-translate/core';

interface CustomTranslation extends Translation {
  days: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
  months: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cliente';

  constructor(private config: PrimeNGConfig,
    // private translateService: TranslateService
  ){}

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
      equals: 'Igual',
      notEquals: 'Diferente',
      noFilter: 'Sem filtro',
      lt: 'Menor que',
      lte: 'Menor ou igual a',
      gt: 'Maior que',
      gte: 'Maior ou igual a',
      is: 'É',
      isNot: 'Não é',
      before: 'Antes',
      after: 'Depois',
      dateIs: 'Data é',
      dateIsNot: 'Data não é',
      dateBefore: 'Data antes de',
      dateAfter: 'Data após',
      matchAll: 'Corresponde a todos',
      matchAny: 'Corresponde a qualquer',
      addRule: 'Adicionar regra',
      removeRule: 'Remover regra',
      choose: 'Escolher',
      upload: 'Enviar',
      cancel: 'Cancelar',
      fileSizeTypes: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      dateFormat: 'dd/mm/yy',
      firstDayOfWeek: 0,
      today: 'Hoje',
      weekHeader: 'Sm',
      weak: 'Fraco',
      medium: 'Médio',
      strong: 'Forte',
      passwordPrompt: 'Informe a senha',
      emptyMessage: 'Nenhum resultado encontrado',
      emptyFilterMessage: 'Nenhum resultado encontrado',
      pending: 'Pendente',
      chooseYear: 'Escolher ano',
      chooseMonth: 'Escolher mês',
      chooseDate: 'Escolher data',
      prevDecade: 'Década anterior',
      nextDecade: 'Próxima década',
      prevYear: 'Ano anterior',
      nextYear: 'Próximo ano',
      prevMonth: 'Mês anterior',
      nextMonth: 'Próximo mês',
      prevHour: 'Hora anterior',
      nextHour: 'Próxima hora',
      prevMinute: 'Minuto anterior',
      nextMinute: 'Próximo minuto',
      prevSecond: 'Segundo anterior',
      nextSecond: 'Próximo segundo',
      am: 'AM',
      pm: 'PM',
      searchMessage: 'Procurar',
      selectionMessage: 'Selecionar',
      emptySelectionMessage: 'Nenhum item selecionado',
      emptySearchMessage: 'Nenhum resultado encontrado',
    });

  }
}

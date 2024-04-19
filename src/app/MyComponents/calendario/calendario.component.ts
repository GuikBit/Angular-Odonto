import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import { Consulta } from 'src/app/consulta/consulta';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Dentista } from 'src/app/dentista/dentista';

export interface Filtro {
  dentista: Dentista,
  dataInicio: Date,
  dataFim: Date
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit{


  @Input() listaConsultas: Consulta[];
  @Input() filtroCalendar: Filtro | null;
  @Input() ocultarFimSemana: boolean;
  @Output() abrirConsulta: EventEmitter<string> = new EventEmitter<string>();
  @Output() novaConsulta: EventEmitter<Date> = new EventEmitter<Date>();
  eventos: EventInput[];
  corDinamica: string ;

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin
    ],
    buttonIcons: {
      today: 'fa fa-calendar-day'

    },
    headerToolbar: {
      left: 'prev,next today btnFDS',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      list: 'Lista',
      allday: 'O dia todo'
    },
    titleFormat: {month: 'long', year: 'numeric'},
    
    customButtons:{
      btnFDS:{        
        text: 'Mostrar/Ocultar FDS',
        click: ()=>{this.OcultarFimSemana()},
        
      }
    },
    nowIndicator:true ,
    dayHeaderFormat: { weekday: 'long' },
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    slotMinTime: '08:00:00',
    slotMaxTime: '20:00:00',
    slotDuration: '00:15:00',
    weekends: true,
    weekNumbers: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.ClickNoEvento.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventBorderColor: '#FFF',
    eventBackgroundColor: '#FFF',
  });

  constructor( private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.transformaConsultaEmEvento(this.listaConsultas);

      this.OcultarFimSemana();
      const element = document.querySelector('.fc-button-primary') as HTMLElement;
      if (element) {
        console.log('entrei aqui')
        element.style.backgroundColor = this.listaConsultas[0].corDentista;
      }
  }


  OcultaCalendario() {
    this.calendarVisible.update((bool) => !bool);
  }

  OcultarFimSemana() {
      this.calendarOptions.update((options) => ({
        ...options,
        weekends: !options.weekends,
      }));
  }

  handleDateSelect(diaClicado: DateSelectArg) {
    const date = new Date(diaClicado.startStr);
    date.setHours(0,0,0,0);
    this.novaConsulta.emit(date);
  }

  ClickNoEvento(click: EventClickArg) {
    this.abrirConsulta.emit(click.event.id);
  }

  handleEvents(events: EventApi[]) {
  }

  transformaConsultaEmEvento(consultas: any) {
    this.corDinamica = consultas.corDentista;
    this.eventos = consultas.map((item: any) => this.converterConsultaParaEvento(item));

  }

  converterConsultaParaEvento(consulta: Consulta) {
    return{
      id: consulta.id.toString(),
      title: consulta.paciente.nome,
      start: consulta.dataConsulta,
      end: consulta.dataConsultaReserva,
      textColor:this.retornaStatus(consulta),
      startStr: consulta.dataConsulta.toString(),
      endStr: consulta.dataConsultaReserva.toString(),
      groupId: consulta.dentista?.id?.toString() ?? '',
      allDay: false,
      display: consulta.dentista != null ? consulta.dentista.corDentista : consulta.corDentista,
      startEditable: false,
      durationEditable: false,
      constraint: false,
      overlap: false,
      classNames: [],
    };
  }

  retornaStatus(consulta: Consulta){
    if(!consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento && !consulta.ausente){
      return "#F97316";
    }
    else if (consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento) {
      return "#3B82F6";
    }
    else if (consulta.dataHoraInicioAtendimento && consulta.dataHoraFimAtendimento)
    {
      return "#22C55E";
    }
    else if (!consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento && consulta.ausente)
    {
      return "#FF3D32";
    }else{
      return "#FFF";
    }
  }

  retornaCorDentista(consulta: Consulta){
    return consulta.dentista.corDentista;
  }

}

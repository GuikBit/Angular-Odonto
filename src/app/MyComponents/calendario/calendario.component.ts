import { ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';
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
  @Input() filtro: Filtro;

  eventos: EventInput[];

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.ClickNoEvento.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventBorderColor: '#FFF',
    eventBackgroundColor: '#FFF'
  });

  constructor( private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.transformaConsultaEmEvento(this.listaConsultas);
  }

  OcultaCalendario() {
    this.calendarVisible.update((bool) => !bool);
  }

  TiraFimSemana() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    console.log(calendarApi)

    //calendarApi.unselect(); // clear date selection



  }

  ClickNoEvento(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  transformaConsultaEmEvento(consultas: any) {
    this.eventos = consultas.map((item: any) => this.converterConsultaParaEvento(item));
  }

  converterConsultaParaEvento(consulta: Consulta) {
    return{
      id: consulta.id.toString(),
      title: consulta.paciente.nome?.substring(0, 16),
      start: consulta.dataConsulta,
      end: consulta.dataConsultaReserva,
      source: this.retornaStatus(consulta),
      startStr: consulta.dataConsulta.toString(),
      endStr: consulta.dataConsultaReserva.toString(),
      groupId: consulta.dentista?.id?.toString() ?? '',
      allDay: false,
      url: consulta.dentista.corDentista + '26',
      display: consulta.dentista.corDentista ,
      startEditable: false,
      durationEditable: false,
      constraint: false,
      overlap: false,
      classNames: [],
    };
  }

  retornaStatus(consulta: Consulta){
    if(!consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento && !consulta.ausente){
      return 'agen'
    }
    else if (consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento) {
      return 'atdm'
    }
    else if (consulta.dataHoraInicioAtendimento && consulta.dataHoraFimAtendimento)
    {
      return 'atd'
    }
    else (!consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento && consulta.ausente)
    {
      return 'ast'
    }
  }
}

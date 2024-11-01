import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import { Consulta } from 'src/app/class/consulta';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Dentista } from 'src/app/class/dentista';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit{

  @Input() listaConsultas: Consulta[];
  @Input() corDentista: string;
  @Input() dentistaInfo: boolean;
  @Input() filtroDentista: Dentista ;
  @Input() ocultarFimSemana: boolean;
  @Output() abrirConsulta: EventEmitter<string> = new EventEmitter<string>();
  @Output() novaConsulta: EventEmitter<Date> = new EventEmitter<Date>();

  eventos: EventInput[] = [];
  corDinamica: string ;

  cores = {
    corFundo: '#228DCB',
    corFundoHover: '#146899',
    corFundoHover2: '#146899'
  };
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
    // eventContent: this.eventContent.bind(this), // Adicione isso
    eventBorderColor: '#FFF',
    eventBackgroundColor: '#FFF',
    //eventDidMount: this.eventDidMount.bind(this), // Adicione isso
  });

  constructor() {  }

  async ngOnInit() {
    this.transformaConsultaEmEvento(this.listaConsultas);
    this.OcultarFimSemana();
    if(this.dentistaInfo == true){
      this.cores.corFundo = this.corDentista;
      this.cores.corFundoHover = this.corDentista + 'B3';
      this.cores.corFundoHover2 = this.corDentista + 'B2';
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
    date.setDate(date.getDate() + 1)
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
      title: consulta.paciente == undefined || null? consulta.nomePaciente : consulta.paciente.nome,
      start: consulta.dataConsulta,
      end: consulta.dataConsultaReserva,
      // textColor:this.retornaStatus(consulta),
      textColor: consulta.status,
      startStr: consulta.dataConsulta.toString(),
      endStr: consulta.dataConsultaReserva.toString(),
      groupId: consulta.dentista?.id?.toString() ?? '',
      allDay: false,
      display: consulta.dentista != null ? consulta.dentista.corDentista : consulta.corDentista,
      startEditable: false,
      durationEditable: consulta.paciente == undefined || null? true: false,
      constraint: false,
      overlap: false,
      classNames: [],
    };
  }

  retornaStatus(consulta: Consulta){
    // if(!consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento && !consulta.ausente){
    //   return "#F97316";
    // }
    // else if (consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento) {
    //   return "#3B82F6";
    // }
    // else if (consulta.dataHoraInicioAtendimento && consulta.dataHoraFimAtendimento)
    // {
    //   return "#22C55E";
    // }
    // else if (!consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento && consulta.ausente)
    // {
    //   return "#FF3D32";
    // }else{
    //   return "#FFF";
    // }
    
  }

  retornaCorDentista(consulta: Consulta){
    return consulta.dentista.corDentista;
  }

  heightRetorno(item: any){
    console.log(item)
  }



  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  eventDidMount(arg: any) {
    const eventElement = arg.el;
    const { event } = arg;

    const customContent = document.createElement('div');
    customContent.classList.add('custom-event', 'p-component', 'flex', 'justify-content-between', 'shadow-2', 'align-items-center', 'border-1', 'border-solid', 'border-round-sm', 'p-1', 'px-2', 'cursor-pointer', 'hover:bg-white');
    customContent.style.background = `${event.extendedProps.display}25`; // Ajustando opacidade
    customContent.style.borderColor = event.extendedProps.display;
    customContent.style.transition = 'background-color 0.2s';
    customContent.style.height = eventElement.clientHeight + 'px';
    customContent.innerHTML = `
      <div class="overflow-hidden text-overflow-ellipsis" style="width:53%">
        <span class="text-xs text-900 font-medium white-space-nowrap">
          <i class="pi pi-bolt text-xs azul mr-1" style="display: ${event.durationEditable ? 'inline' : 'none'};"></i>
          <i class="pi pi-user text-xs" style="color: ${event.extendedProps.display}"></i>
          ${event.title}
        </span>
      </div>
      <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis" style="width:34%">
        <span class="text-xs text-900 font-medium white-space-nowrap">
          <i class="pi pi-clock text-xs ml-1" style="color: ${event.extendedProps.display}"></i>
          ${this.formatTime(event.start)} - ${this.formatTime(event.end)}
        </span>
      </div>
      <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis" style="width:10%">
        <i class="pi pi-circle-fill text-xs ml-1" style="color: ${event.extendedProps.textColor}"></i>
      </div>
    `;

    eventElement.innerHTML = '';
    eventElement.appendChild(customContent);
  }







}

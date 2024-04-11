// import { CalendarOptions } from '@fullcalendar/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { ActivatedRoute } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput, Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';

import '@fullcalendar/core/locales/pt-br.js'
import { ConsultaService } from 'src/app/consulta.service';
import { Consulta } from 'src/app/consulta/consulta';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    DividerModule,
    BadgeModule,
    MenubarModule,
    InputNumberModule,
    ButtonModule,
    FullCalendarModule
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit {

  items: MenuItem[] | undefined;

  consultas: Consulta [] = [];
  eventos: EventInput [] = [];
  fullCalendar: Calendar;

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
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.ClickNoEvento.bind(this),
    eventsSet: this.handleEvents.bind(this),

  });


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private changeDetector: ChangeDetectorRef, private service: ConsultaService){
    this.service.getConsultas().then((response)=>{
      if(response){
        this.transformaConsultaEmEvento(response)
      }

    }).catch(()=>{})


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

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  ClickNoEvento(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  ngOnInit(): void {
    this.items = [
      {
          icon:'pi pi-fw pi-user',
          label:"Informações",
          items: [
            {
              label: 'Consultar',
              icon: 'pi pi-fw pi-list',
              command: () => {

              },
              routerLink: '/areaAdmin/paciente'
            },
            {
              label: 'Ações',
              icon:'pi pi-fw pi-wrench',
              items: [
                {
                  label: 'Editar',
                  icon: 'pi pi-fw pi-user-edit',
                  command: () => {


                  },
                },
                {
                  label: 'Salvar',
                  icon: 'pi pi-fw pi-save',
                  command: () => {


                  }
                },
                {
                  separator: true
                },
                {
                  label: 'Reativar Paciente',
                  icon: 'pi pi-fw pi-user-plus',
                  command: () => {


                  }
              },
                {
                    label: 'Inativar Paciente',
                    icon: 'pi pi-fw pi-user-minus',




                },
              ]
            },

            {
                separator: true
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-external-link'
            }
        ],
      },
      {
        label: 'Consultas',
        icon: 'pi pi-fw pi-briefcase',
        items:[
          {
            label: 'Consultar',
            icon: 'pi pi-pw pi-list',
            command: ()=>{

            }
          },
          {
            label: 'Nova',
            icon: 'pi pi-pw pi-plus',
            command: ()=>{

            }
          },

          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }

        ]
      },
      {
          label:"Pagamentos",
          icon: 'pi pi-fw pi-dollar',
          items:[
            {
              label: 'Consultar',
              icon: 'pi pi-pw pi-list',
              command: ()=>{

              }
            },
            {
              label: 'Novo',
              icon:'pi pi-fw pi-plus',
            },
            {
              separator: true
            },
            {
              label: 'Export',
              icon: 'pi pi-fw pi-external-link'
            }
          ],
      },
      {
        icon: 'pi pi-fw pi-file-export',
        label:"Relatorios",
        items: [
          {
            label: 'Atestado',
            icon: 'pi pi-fw pi-file-word'
          },
          {
            label: 'Pedido exame',
            icon: 'pi pi-fw pi-file-word'
          },
          {
            separator: true
          },
          {
            label: 'Outros',
            icon: 'pi pi-fw pi-file-pdf'
          }
        ],
    },
      {
          icon: 'pi pi-wrench',
          //label:"Inativar Paciente",

      },

  ];

  }

  transformaConsultaEmEvento(consultas: any) {
    this.eventos = consultas.map((item: any) => this.converterConsultaParaEvento(item));
  }

  converterConsultaParaEvento(consulta: Consulta) {
    return{
      id: consulta.id.toString(),
      title: consulta.paciente.nome,
      start: consulta.dataConsulta,
      end: consulta.dataConsultaReserva,
      source: null,
      startStr: consulta.dataConsulta.toString(),
      endStr: consulta.dataConsultaReserva.toString(),
      groupId: consulta.dentista?.id?.toString() ?? '',
      allDay: false,
      url:'',
      display: '',
      startEditable: false,
      durationEditable: false,
      constraint: false,
      overlap: false,
      classNames: [],
    };
  }
}

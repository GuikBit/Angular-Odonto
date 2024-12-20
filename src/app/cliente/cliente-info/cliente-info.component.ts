import { MessageService, MenuItem } from 'primeng/api';

import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from '../../class/cliente';

import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PrimeIcons } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AssyncServiceService } from 'src/app/services/assync-service.service';
import { Consulta } from 'src/app/class/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

interface EventItem {
  procedimentos?: string;
  dataConsulta?: string;
  dentista?: string;

}

@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.css'],
  providers: [DatePipe]
})
export class ClienteInfoComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  iniciarConsulta: any;
  paciente: any;
  disable: boolean = true;

  dataSource: MatTableDataSource<Cliente>;
  formulario: FormGroup;
  activeIndex: number = 1;

  items: MenuItem[];
  idade: string;
  loading: boolean = false;
  buscouCEP: boolean | null = null ;
  RespValidacaoCPF: boolean | null;
  validacaoCPF: boolean | null = null;
  novaConsulta: boolean = false;

  infoConsulta: boolean = false;
  consultaSelecionada: Consulta;
  @Output() reloading = new EventEmitter<Boolean>();
  @Output() closeModal = new EventEmitter<boolean>();
  pagamentoInfo: boolean = false;
  consultaSelecionadaPg: any;

  alterarFoto: boolean = false;
  imagemSelecionada: string | ArrayBuffer | null = '';
  events: EventItem[] = [];
  list: Consulta[];
  separatorExp: RegExp = /,| /;

  orcamento: boolean = true;
  // stateOptions: any[] = [{ label: 'Consulta', value: 'consulta' },{ label: 'Pagamento', value: 'pagamento' }, { label: 'Orçamento', value: 'orcamento' }];

  // value: string = 'off';

  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router,private serviceConsulta: ConsultaService,
    private messageService: MessageService, private formBuilder: FormBuilder, private assync: AssyncServiceService) {


  }

 async ngOnInit(){
    this.loading = false;
    this.buscouCEP = null ;
    this.RespValidacaoCPF = null;
    this.validacaoCPF= null;

    let id: string = '';
    this.route.params.subscribe(params => {
      id = params['id'];
    })

    if(id !== ''){
      await this.service.getPacienteById(id).then((response)=>{
       this.paciente = response;
       //console.log(this.paciente)
      }).catch(()=>{
       this.router.navigate(['/clientes']);
       this.messageService.add({
         severity: 'error',
         summary: 'Erro',
         detail: 'Ocorreu um erro ao carregar o paciente'
       })
      })
    }

    this.criaFormulario()
    this.items = [
      {
          icon:'pi pi-fw pi-user',
          label:"Informações",
          items: [
            {
              label: 'Consultar',
              icon: 'pi pi-fw pi-list',
              command: () => {
                this.activeIndex = 0;
              },
            },
            {
              label: 'Ações',
              icon:'pi pi-fw pi-wrench',
              items: [
                {
                  label: 'Editar',
                  icon: 'pi pi-fw pi-user-edit',
                  command: () => {
                    if(this.disable == false){
                      this.messageService.clear();
                      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'A edição do paciente já está habilitada.' });

                    }else{
                      this.messageService.clear();
                      this.messageService.add({ severity: 'warn', summary: 'Editando', detail: 'A edição do paciente está habilitada.' });
                      this.activeIndex = 0;
                      this.disable = false;
                      this.formulario.patchValue(this.paciente)
                    }

                  },
                },
                {
                  label: 'Salvar',
                  icon: 'pi pi-fw pi-save',
                  command: () => {
                    if(this.disable == false){
                      this.onUpdate();
                      this.disable = true;
                    }else{
                      this.messageService.clear();
                      this.messageService.add({
                        severity: 'warn',
                        summary: 'Aviso',
                        detail: 'A edição do paciente não está habilitada.'
                      })
                    }

                  }
                },
                {
                  separator: true
                },
                {
                  label: 'Reativar Paciente',
                  icon: 'pi pi-fw pi-user-plus',
                  command: () => {
                    if(this.paciente.ativo){
                      this.messageService.clear();
                      this.messageService.add({
                        severity: 'warn',
                        summary: 'Aviso',
                        detail: 'O paciente já se encontra ativo.'
                      })
                    }else{
                      this.onReactivate();
                    }

                  }
              },
                {
                    label: 'Inativar Paciente',
                    icon: 'pi pi-fw pi-user-minus',
                    command: () => {
                      if(!this.paciente.ativo){
                        this.messageService.clear();
                        this.messageService.add({
                          severity: 'warn',
                          summary: 'Aviso',
                          detail: 'O paciente já se encontra inativo.'
                        })
                      }else{
                        this.onInactivate();
                      }

                    }
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
              this.activeIndex = 1;
            }
          },
          {
            label: 'Nova',
            icon: 'pi pi-pw pi-plus',
            command: ()=>{
              this.novaConsultaPaciente()
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
                this.activeIndex = 2;
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
        label:"Orçamentos",
        icon: 'pi pi-fw pi-clipboard',
        items:[
          {
            label: 'Consultar',
            icon: 'pi pi-pw pi-list',
            command: ()=>{
              this.activeIndex = 4;
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
          command: () => {
            this.messageService.clear();
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },

    ];

    this.montaTimeline();
  }

  abrirwhatsapp(){
    if(this.paciente.telefone !== null){
      const tel = this.paciente.telefone
      const num = tel.replace(/[^\d]/g, "");
      window.open(`https://wa.me/${num}`, '_blank')
    }
  }

  onUpdate(){
    if(this.formulario.valid && this.RespValidacaoCPF){
      const novo = JSON.stringify(this.formulario.value);
      //console.log("id: ", this.paciente.id)
     // console.log(novo)
      this.service.putPaciente(this.paciente.id, novo).then((response)=>{
        if(response?.status === 204){
          this.messageService.add({
            severity: 'success',
            summary: 'Aviso',
            detail: 'Informações do paciente atualizadas!'
          })
          this.disable = true;
          this.activeIndex = 0;
          this.ngOnInit();
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Aviso',
            detail: 'Houve um erro na requisição!'
          })
        }
      })
    }
    else{
      this.messageService.add({
        severity: 'error',
        summary: 'Aviso',
        detail: 'Houve erro nas informações digitadas, confira os campos obrigatórios!'
      })
    }

  }

  activeIndexChange(index : any){
    this.activeIndex = index
  }

  async criaFormulario(){
    this.formulario = this.formBuilder.group({
      id: [''],
      numPasta: ['', Validators.required],
      login: ['',Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataCadastro: [''],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],

      // Endereço
      endereco: this.formBuilder.group({
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        cep: ['', Validators.required],
        complemento: ['', Validators.required],
        referencia: [''],
      }),

      // Responsável
      responsavel: this.formBuilder.group({
        nome: [''],
        telefone: [''],
        cpf: [''],
      }),

      // Anamnese
      anamnese: this.formBuilder.group({
        problemaSaude: ['', Validators.required],
        tratamento: ['', Validators.required],
        remedio: ['', Validators.required],
        alergia: ['', Validators.required],
        sangramentoExcessivo: [''],
        hipertenso: [''],
        gravida: [''],
        traumatismoFace: [''],
      }),
    });


  }

  calcularIdade(dataNascimento: string){
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const diffMeses = (hoje.getFullYear() - nascimento.getFullYear()) * 12 +
      hoje.getMonth() - nascimento.getMonth();

    const anos = Math.floor(diffMeses / 12);
    const meses = diffMeses % 12;

    if(anos <= 1 && meses <= 1 ){
      return `${anos} ano e ${meses} mês`;
    }
    else if(anos !== 1 && meses === 1 ){
      return `${anos} anos e ${meses} mês`;
    }
    else{
      return `${anos} anos e ${meses} mêses`;
    }

  }

  replaceTelefone(tipo: number){
    let num;
    tipo === 1? num = this.formulario.get('telefone')?.value : num = this.formulario.get('responsavel.telefone')?.value ;

    const textoLimpo = num?.replace(/\D/g, '');
    const limite = textoLimpo.substring(0, 11);
    const telFormatado = limite.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    tipo === 1 ? this.formulario.get('telefone')?.setValue(telFormatado) : this.formulario.get('responsavel.telefone')?.setValue(telFormatado) ;

  }

  buscaCEP(){
    this.loading = true;
    let cep = this.formulario.get('endereco.cep')
    const cpfLimpo = cep?.value.replace(/\D/g, '').substring(0, 8);
    const cepFormatado = cpfLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
    this.formulario.get('endereco.cep')?.setValue(cepFormatado);

    setTimeout(() => {
      if ( cep?.value != null ) {
        this.assync.buscaCEP(cpfLimpo).subscribe(
          (response) => {
            this.formulario.get('endereco.cidade')?.setValue(response.localidade);
            this.formulario.get('endereco.bairro')?.setValue(response.bairro);
            this.formulario.get('endereco.logradouro')?.setValue(response.logradouro);
            this.formulario.get('endereco.complemento')?.setValue(response.complemento);
            this.formulario.get('endereco.numero')?.setValue('');
            this.formulario.updateValueAndValidity();
            this.buscouCEP = true;
            this.loading = false;
        },(errorResponse) => {
            this.buscouCEP = null;
            this.loading = false;
          }
        );

        this.loading = false;
      }
    }, 1000);
  }

  RespValidaCPF(){
    this.RespValidacaoCPF = null;
    let cpf = this.formulario.get('responsavel.cpf');
    const cpfLimpo = cpf?.value.replace(/\D/g, '');
    this.formulario.get('responsavel.cpf')?.setValue(cpfLimpo);
    if (cpf && cpf?.value.length >= 11) {

      this.formulario.get('responsavel.cpf')?.setErrors({tam: false})
      const limite = cpfLimpo.substring(0, 11);
      const cpfFormatado = limite.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.formulario.get('responsavel.cpf')?.setValue(cpfFormatado);
      if(this.isValidCPF(cpfFormatado)){
        this.RespValidacaoCPF = true;
      }else{
        this.RespValidacaoCPF = false;
      }

    }else{
      //this.formulario.get('responsavel.cpf')?.setErrors({tam: true})
      this.validacaoCPF = false;
    }
  }

  isValidCPF(cpf: string){
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
     return false;

    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
  }

  async onInactivate(){
    await this.service.inativarPaciente(this.paciente.id).then((response)=>{
      if(response?.status == 204){
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Paciente inativado com sucesso.'
        })
      }
    })
    this.ngOnInit()
  }
  async onReactivate(){
    await this.service.reativarPaciente(this.paciente.id).then((response)=>{
      if(response?.status == 204){
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Paciente reativado com sucesso.'
        })
      }
    })
    this.ngOnInit();
  }

  novaConsultaPaciente(){
    if(this.paciente.ativo){
      this.novaConsulta = true;
    }else{
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Não é possivel agendar consultas para pacientes inativos.'
      })
      this.novaConsulta = false;
    }
  }

  async closeModalInfo(close: boolean){
    this.novaConsulta = close;

    await this.service.getPacienteById(this.paciente.id).then((response)=>{
      this.paciente = response;
      // console.log(this.data);
      this.messageService.add({
        severity: 'success',
        summary: 'Aviso',
        detail:'Consulta agendada com sucesso!'
      })
     }).catch(()=>{
      this.router.navigate(['/clientes']);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar o paciente',
        life: 2000
      })
     })

  }

  onlyClose(close: boolean){
    this.novaConsulta = close;
  }

  async consultaSelecionadaInfo(id: any, tipo: any){
    if(id != null){
      await this.serviceConsulta.getConsultaById(id).then((response)=>{
        if(tipo === 1 && (response?.status === 200 || response?.status === 201)){
          this.consultaSelecionada = response.data;
          this.infoConsulta = true;
        }else{
          this.consultaSelecionadaPg = response;
          this.pagamentoInfo = true;
        }
      }).catch((error)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Aviso',
          detail: 'Houve algum problema ao buscar a consulta',
          life: 2000
        })
      })
    }

  }

  async closeInfo(close: boolean){
    this.infoConsulta = close;
  }

  async reloadingTela(reloading: Boolean){
    const consulta = this.consultaSelecionada.id;
    this.service.getPacienteById(this.paciente.id).then((response)=>{
      this.paciente = response;

    }).catch(()=>{
      this.router.navigate(['/clientes']);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar o paciente',
        life: 2000
      })
    })
    this.consultaSelecionadaInfo(consulta, 1);
  }

  async fecharJanela(){
    this.closeModal.emit(false);
  }

  abrirModalFoto() {
    this.alterarFoto = true;
  }

  fecharModalFoto(){
    this.alterarFoto = false;
    this.fileInput.nativeElement.value = '';
    this.imagemSelecionada = '';
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagemSelecionada = reader.result;
      };
    }
  }

  montaTimeline(){
    // this.list = [];
    //  console.log(this.paciente)
    if(this.paciente.consultas){
      this.paciente.consultas.sort((a: any, b:any) => new Date(a.dataConsulta).getTime() - new Date(b.dataConsulta).getTime());
      let i = 1;
      this.paciente.consultas.forEach((item: any)=> {

        var x ={
          procedimentos: item.procedimentos ? JSON.parse(item.procedimentos) : [] ,
          dataConsulta: this.formatarDataBR(item.dataConsulta),
          horaInicio: this.formatarHoraBR(item.dataConsulta),
          horaFim: this.formatarHoraBR(item.dataConsultaReserva),
          dentista: item.dentista.nome,
          idConsulta: item.id,
          consultaStatus: this.retornaStatusConsulta(item),
          idItem: i
        }
        i++;
        this.events.push(x);
      });
      //console.log(this.events)
    }
  }
  retornaStatusConsulta(consulta: Consulta){
    console.log(consulta)
    if(!consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento &&  !consulta.ausente){
      return 1;
    }
    else if (consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento) {
      return 2;
    }
    else if (consulta.dataHoraInicioAtendimento && consulta.dataHoraFimAtendimento)
    {
      return 3;
    }
    else if (!consulta.dataHoraInicioAtendimento && !consulta.dataHoraFimAtendimento && consulta.ausente)
    {
      return 4;
    }
    else{
      return 5;
    }
  }
  // procedimentos?: string;
  // dataConsulta?: Date;
  // dentista?: string;

  formatarDataBR(dataISO: string): string {
    const date = new Date(dataISO);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  formatarHoraBR(dataISO: string): string{
    const date = new Date(dataISO);
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;

  }

  novoOrcamento(){
    this.orcamento = true;
  }


  editarPaciente(){
    this.disable = false;
    this.formulario.patchValue(this.paciente)
  }
}



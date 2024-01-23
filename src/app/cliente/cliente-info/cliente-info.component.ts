import { MessageService } from 'primeng/api';

import { Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from '../cliente';

import { ClienteService } from 'src/app/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PrimeIcons, MenuItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AssyncServiceService } from 'src/app/assync-service.service';

@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.css'],
  providers: [DatePipe]
})
export class ClienteInfoComponent implements OnInit {
  
consultaSelecionadaInfo(arg0: any) {
throw new Error('Method not implemented.');
}

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
  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router,
    private messageService: MessageService, private formBuilder: FormBuilder, private datePipe: DatePipe, private assync: AssyncServiceService) {
      this.paciente = new Cliente();

  }

  ngOnInit() {

    this.loading = false;
    this.buscouCEP = null ;
    this.RespValidacaoCPF = null;
    this. validacaoCPF= null;

    let id: string = '';
    this.route.params.subscribe(params => {
      id = params['id'];
    })
    if(id !== ''){
      const response = this.service.getPacienteById(id).then((response)=>{
       this.paciente = response;
       // console.log(this.data);

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
  }


  abrirwhatsapp() {
    console.log(this.paciente.telefone)
    if(this.paciente.telefone !== null){
      const tel = this.paciente.telefone
      const num = tel.replace(/[^\d]/g, "");
      window.open(`https://wa.me/${num}`, '_blank')
    }

  }


  onUpdate() {
    if(this.formulario.valid && this.RespValidacaoCPF){
      // let novo = this.formulario.value;
      // novo = novo + this.paciente.consultas;

      const novo = JSON.stringify(this.formulario.value);
      console.log("id: ", this.paciente.id)
      console.log(novo)
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

  async criaFormulario() {
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

  calcularIdade(dataNascimento: string) {
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
  isValidCPF(cpf: string) {
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
  async onInactivate() {
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
  async onReactivate() {
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

  novaConsultaPaciente() {
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
  async closeModal(close: boolean) {

    console.log("Cheguei aqui, ação: ", close);
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
  // async closeModal(close: boolean) {

  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Aviso',
  //     detail:'Paciente salvo com sucesso.'
  //   })
  //   const response = await this.service.getPacientes();
  //   this.dataSource = new MatTableDataSource(response);
  // }

}



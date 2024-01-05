import { MessageService } from 'primeng/api';

import { Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from '../cliente';

import { ClienteService } from 'src/app/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.css']
})
export class ClienteInfoComponent implements OnInit {



  paciente: any;

  // infPes: boolean = true;
  // cons: boolean = false;
  // pag: boolean = false;
  // util: boolean = false;

  disable: boolean = true;

  dataSource: MatTableDataSource<Cliente>;
  formulario: FormGroup;
  activeIndex: number = 1;

  items: MenuItem[];
  idade: string;

  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router,
    private messageService: MessageService, private formBuilder: FormBuilder) {
      this.paciente = new Cliente();

  }

  ngOnInit() {
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
          // tooltipOptions: {
          //   tooltipLabel: 'Editar Informações',
          //   tooltipPosition: 'top'
          // },
          icon:'pi pi-fw pi-user',
          label:"Paciente",
          items: [
            {
              label: 'Editar',
              icon: 'pi pi-fw pi-user-edit',
              command: () => {
                this.messageService.add({ severity: 'info', summary: 'Editando', detail: 'Habilitado para editar o paciente' });
                this.activeIndex = 0;
                this.disable = false;
              },
            },
            {
              label: 'Salvar',
              icon: 'pi pi-fw pi-save',
              command: () => {
                this.disable = true;
              }
            },
            {
                label: 'Inativar',
                icon: 'pi pi-fw pi-user-minus'
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
            label: 'Novo',
            icon: 'pi pi-pw pi-plus'
          },
          {
            label: 'Consultar',
            icon: 'pi pi-pw pi-list',
            command: ()=>{
              this.activeIndex = 1;
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
              label: 'Novo',
              icon:'pi pi-fw pi-plus',
            },
            {
              label: 'Consultar',
              icon: 'pi pi-pw pi-list',
              command: ()=>{
                this.activeIndex = 2;
              }
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
        // command: () => {
        //     this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        // }
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
          // label:"Inativar Paciente",
          command: () => {
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },

  ];
    const dataAtual = new Date();
    const dataNascimento = new Date(this.paciente.dataNascimento)
    console.log(dataAtual, dataNascimento)
  }

  // trocaMenu(menu: number) {
  //   switch (menu) {
  //     case 1: {
  //       this.infPes = true;
  //       this.cons = false;
  //       this.pag = false;
  //       this.util = false;
  //       break;
  //     }
  //     case 2: {
  //       this.infPes = false;
  //       this.cons = true;
  //       this.pag = false;
  //       this.util = false;
  //       break;
  //     }
  //     case 3: {
  //       this.infPes = false;
  //       this.cons = false;
  //       this.pag = true;
  //       this.util = false;
  //       break;
  //     }
  //     case 4: {
  //       this.infPes = false;
  //       this.cons = false;
  //       this.pag = false;
  //       this.util = true;
  //       break;
  //     }
  //     default: {
  //       this.infPes = false;
  //       this.cons = true;
  //       this.pag = false;
  //       this.util = false;
  //       break;
  //     }
  //   }
  // }
  abrirwhatsapp() {
    console.log(this.paciente.telefone)
    if(this.paciente.telefone !== null){
      const tel = this.paciente.telefone
      const num = tel.replace(/[^\d]/g, "");
      window.open(`https://wa.me/${num}`, '_blank')
    }

  }

  onUpdate() {

  }
  activeIndexChange(index : any){
    this.activeIndex = index
  }

  async criaFormulario() {
    this.formulario = this.formBuilder.group({
      id: [this.paciente.id],
      numPasta: [this.paciente.numPasta, Validators.required],
      login: [this.paciente.login,Validators.required],
      senha: [this.paciente.senha, Validators.required],
      email: [this.paciente.email, Validators.required],
      nome: [this.paciente.nome, Validators.required],
      cpf: [this.paciente.cpf, Validators.required],
      dataCadastro: [this.paciente.dataCadastro],
      dataNascimento: [this.paciente.dataNascimento, Validators.required],
      telefone: [this.paciente.telefone, Validators.required],

      // Endereço
      endereco: this.formBuilder.group({
        cidade: [this.paciente.endereco.cidade, Validators.required],
        bairro: [this.paciente.endereco.bairro, Validators.required],
        logradouro: [this.paciente.endereco.logradouro, Validators.required],
        numero: [this.paciente.endereco.numero, Validators.required],
        cep: [this.paciente.endereco.cep, Validators.required],
        complemento: [this.paciente.endereco.complemento, Validators.required],
        referencia: [this.paciente.endereco.referencia],
      }),

      // Responsável
      responsavel: this.formBuilder.group({
        nome: [this.paciente.responsavel.nome],
        telefone: [this.paciente.responsavel.telefone],
        cpf: [this.paciente.responsavel.cpf],
      }),

      // Anamnese
      anamnese: this.formBuilder.group({
        problemaSaude: [this.paciente.anamnese.problemaSaude, Validators.required],
        tratamento: [this.paciente.anamneset.tratamento, Validators.required],
        remedio: [this.paciente.anamnese.remedio, Validators.required],
        alergia: [this.paciente.anamnese.alergia, Validators.required],
        sangramentoExcessivo: [this.paciente.anamnese.sangramentoExcessivo],
        hipertenso: [this.paciente.anamnese.hipertenso],
        gravida: [this.paciente.anamnese.gravida],
        traumatismoFace: [this.paciente.anamnese.traumatismoFace],
      }),
    });
  }
}

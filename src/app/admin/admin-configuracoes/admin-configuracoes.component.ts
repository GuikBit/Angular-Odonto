import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';
import { OrganizacaoService } from 'src/app/services/organizacao.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';

@Component({
  selector: 'app-admin-configuracoes',
  templateUrl: './admin-configuracoes.component.html',
  styleUrl: './admin-configuracoes.component.css',
  providers:[GlobalService]
})
export class AdminConfiguracoesComponent implements OnInit {

  active: number = 0;

  userLogado: any ;
  org: any;

  loading: boolean = false;
  formulario: FormGroup;

  cadastroOrg: boolean = false;
  novoFuncionario: boolean = false;
  novoCargo: boolean = false;

  cogSistema: boolean = true;
  cogCargo: boolean = false;
  cogAcesso: boolean = false;

  items: MenuItem[];
  activeIndex: number = 2;

  filtro: number =  1 ;

  filtroDiaSemanaMes: any[] = [
    { name: 'Sistema', icon: 'pi pi-cog', value: 1, styleClass: "selectButton" },
    { name: 'Cargo', icon: 'pi pi-briefcase', value: 2, styleClass: "selectButton" },
    { name: 'Acesso', icon: 'pi pi-shield',  value: 3, styleClass: "selectButton"},
    
  ];

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private orgService: OrganizacaoService, 
    private globalService: GlobalService, private router: Router){

    if ((this.userLogado === undefined || this.userLogado === null) && (this.org === null || this.org === undefined)) {

      const userStorage = localStorage.getItem('userLogado');
      const orgStorage = localStorage.getItem('organizacao');

      if (userStorage && orgStorage) {
        this.userLogado = JSON.parse(userStorage);
        this.org = JSON.parse(orgStorage);
      }
    }
  }

  ngOnInit() {
    this.criaFormulario();

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
            },
            {
              label: 'Ações',
              icon:'pi pi-fw pi-wrench',
              items: [
                {
                  label: 'Editar',
                  icon: 'pi pi-fw pi-user-edit',
                  command: () => {
                    if(true){
                      this.messageService.clear();
                      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'A edição do paciente já está habilitada.' });

                    }else{
                      this.messageService.clear();
                      this.messageService.add({ severity: 'warn', summary: 'Editando', detail: 'A edição do paciente está habilitada.' });

                    }

                  },
                },
                {
                  label: 'Salvar',
                  icon: 'pi pi-fw pi-save',
                  command: () => {
                    if(false){
                      // this.onUpdate();
                      // this.disable = true;
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
                    if(true){
                      this.messageService.clear();
                      this.messageService.add({
                        severity: 'warn',
                        summary: 'Aviso',
                        detail: 'O paciente já se encontra ativo.'
                      })
                    }else{
                      //this.onReactivate();
                    }

                  }
              },
                {
                    label: 'Inativar Paciente',
                    icon: 'pi pi-fw pi-user-minus',
                    command: () => {
                      if(false){
                        this.messageService.clear();
                        this.messageService.add({
                          severity: 'warn',
                          summary: 'Aviso',
                          detail: 'O paciente já se encontra inativo.'
                        })
                      }else{
                        //this.onInactivate();
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
              //this.activeIndex = 1;
            }
          },
          {
            label: 'Nova',
            icon: 'pi pi-pw pi-plus',
            command: ()=>{
              //this.novaConsultaPaciente()
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
                //this.activeIndex = 2;
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

    //this.filtrarTabela(this.filtro)
  }

  mudarSelect(event: any){
    console.log("Click: ", event)
  }

  filtrarTabela(filtro: any) {

    const novoValor = filtro.value;
    console.log(novoValor, filtro.value, this.filtro, novoValor !== this.filtro && filtro.value !== null)

  if (novoValor !== this.filtro && novoValor !== null) {
    this.filtro = novoValor;  
  }


    switch (filtro.value){
      case 1: {
          this.cogSistema = true;
          this.cogCargo = false;
          this.cogAcesso = false;
        break;
      }
      case 2: {
        this.cogSistema = false;
        this.cogCargo = true;
        this.cogAcesso = false;
        break;
      }
      case 3: {
        this.cogSistema = false;
        this.cogCargo = false;
        this.cogAcesso = true;
        break;
      }
      default: {
        this.cogSistema = true;
        this.cogCargo = false;
        this.cogAcesso = false;
        break;
      }
    }
}

  criaFormulario(){
    this.formulario = this.formBuilder.group({
        nome: ['', Validators.required],
        cnpj: ['', Validators.required],
        telefone: ['', Validators.required],
        whasapp: ['', Validators.required],
        email: ['', Validators.required],
        cep: ['', Validators.required],
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['', Validators.required],
        referencia: ['', Validators.required],
        banco: ['', Validators.required],
        agencia: ['', Validators.required],
        conta: ['', Validators.required],
    });
  }

  buscaCEP() {

  }

  showDialog() {
    this.cadastroOrg = true;
  }

  onSubmit(){
    console.log(this.formulario.value)
  }

  cadastro(){
    this.novoFuncionario = true;
  }

  cadastroCargo(){
    this.novoCargo = true;
  }

  closeModal(close: boolean) {
    this.novoCargo = close;
    //this.criaTabelaDentista();
    this.messageService.add({
      severity: 'success',
      summary: 'Aviso',
      detail: 'Dentista salvo com sucesso!'
    })
  }

  navegacaoRotas(rota: string){
    if(rota == ''){
      this.router.navigate(['/admin'])
    }else{
      this.router.navigate(['/admin/' + rota])
    }

  }


}

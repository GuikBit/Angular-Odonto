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
  novoDentista: boolean = false;
  novoCargo: boolean = false;

  cogSistema: boolean = true;
  cogCargo: boolean = false;
  cogAcesso: boolean = false;
  cogConsulta: boolean = false;
  cogDentista: boolean = false;
  cogPaciente: boolean = false;

  funcDentista: boolean = false;
  funcFuncionario: boolean = true;


  items: MenuItem[];
  activeIndex: number = 1;

  filtro: number =  1 ;

  filtroFunc : any[] = [
    { name: 'Funcionário', icon: 'pi pi-users', value: 1, styleClass: "selectButton" },
    { name: 'Dentista', icon: 'pi pi-users', value: 2, styleClass: "selectButton" }
  ];

  filtroCog: any[] = [
    { name: 'Sistema', icon: 'pi pi-cog', value: 1, styleClass: "selectButton" },
    { name: 'Cargo', icon: 'pi pi-briefcase', value: 2, styleClass: "selectButton" },
    { name: 'Acesso', icon: 'pi pi-shield',  value: 3, styleClass: "selectButton"},
    { name: 'Consulta', icon: 'pi pi-briefcase',  value: 4, styleClass: "selectButton"},
    { name: 'Dentista', icon: 'pi pi-id-card',  value: 5, styleClass: "selectButton"},
    { name: 'Paciente', icon: 'pi pi-user',  value: 6, styleClass: "selectButton"},
  ];

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private orgService: OrganizacaoService,
    private globalService: GlobalService, private router: Router){

    if ((this.userLogado === undefined || this.userLogado === null) && (this.org === null || this.org === undefined)) {

      const userStorage = localStorage.getItem('userLogado');
      const orgStorage = localStorage.getItem('organizacao');

      if (userStorage && orgStorage) {
        this.userLogado = JSON.parse(userStorage);
        this.org = JSON.parse(orgStorage);

        console.log(this.org)
      }
    }
  }

  ngOnInit() {
    this.criaFormulario();

    //this.filtrarTabela(this.filtro)
  }

  mudarSelect(event: any){
    console.log("Click: ", event)
  }

  filtrarFuncOption(filtro: any){

    const novoValor = filtro.value;
    if (novoValor !== this.filtro && novoValor !== null) {
      this.filtro = novoValor;
    }

    switch (filtro.value){
      case 1: {
          this.funcFuncionario = true;
          this.funcDentista = false;
        break;
      }
      case 2: {
          this.funcFuncionario = false;
          this.funcDentista = true;
        break;
      }
      default:
        this.funcFuncionario = true;
        this.funcDentista = false;
      break;
    }
  }

  filtrarCogOption(filtro: any) {

    const novoValor = filtro.value;
    if (novoValor !== this.filtro && novoValor !== null) {
      this.filtro = novoValor;
    }

    switch (filtro.value){
      case 1: {
          this.cogSistema = true;
          this.cogCargo = false;
          this.cogAcesso = false;
          this.cogConsulta = false;
          this.cogDentista = false;
          this.cogPaciente = false;
        break;
      }
      case 2: {
        this.cogSistema = false;
        this.cogCargo = true;
        this.cogAcesso = false;
        this.cogConsulta = false;
        this.cogDentista = false;
        this.cogPaciente = false;
        break;
      }
      case 3: {
        this.cogSistema = false;
        this.cogCargo = false;
        this.cogAcesso = true;
        this.cogConsulta = false;
        this.cogDentista = false;
        this.cogPaciente = false;
        break;
      }
      case 4: {
        this.cogSistema = false;
        this.cogCargo = false;
        this.cogAcesso = false;
        this.cogConsulta = true;
        this.cogDentista = false;
        this.cogPaciente = false;
        break;
      }
      case 5: {
        this.cogSistema = false;
        this.cogCargo = false;
        this.cogAcesso = false;
        this.cogConsulta = false;
        this.cogDentista = true;
        this.cogPaciente = false;
        break;
      }
      case 6: {
        this.cogSistema = false;
        this.cogCargo = false;
        this.cogAcesso = false;
        this.cogConsulta = false;
        this.cogDentista = false;
        this.cogPaciente = true;
        break;
      }
      default: {
        this.cogSistema = true;
        this.cogCargo = false;
        this.cogAcesso = false;
        this.cogConsulta = false;
        this.cogDentista = false;
        this.cogPaciente = false;
        break;
      }
    }
}

  criaFormulario(){
    this.formulario = this.formBuilder.group({
        nome: [{ value: this.org.nome, disabled: true }, Validators.required],
        cnpj: [{ value: this.org.cnpj, disabled: true }, Validators.required],
        telefone: [{ value: this.org.telefone1, disabled: false}, Validators.required],
        whasapp: [{ value: this.org.whastapp, disabled: false}, Validators.required],
        email: [{ value: this.org.email, disabled: false}, Validators.required],
        cep: [{ value: this.org.email, disabled: false}, Validators.required],
        cidade: [{ value: this.org.endereco.cidade, disabled: false}, Validators.required],
        bairro: [{ value: this.org.endereco.bairro, disabled: false}, Validators.required],
        logradouro: [{ value: this.org.endereco.logradouro, disabled: false}, Validators.required],
        numero: [{ value: this.org.endereco.numero, disabled: false}, Validators.required],
        complemento: [{ value: this.org.endereco.complemento, disabled: false}, Validators.required],
        referencia: [{ value: this.org.endereco.referencia, disabled: false}, Validators.required],
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
  showDialogDentista(){
    this.novoDentista = true;
  }

  onSubmit(){
    console.log(this.formulario.value)
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


  closeModalDentista(close: any) {
    this.novoDentista = close;
    //this.criaTabelaDentista();
    this.messageService.add({
      severity: 'success',
      summary: 'Aviso',
      detail: 'Dentista salvo com sucesso!'
    })
  }

  onlyClose(close: any){
    this.novoDentista = close;
  }


}

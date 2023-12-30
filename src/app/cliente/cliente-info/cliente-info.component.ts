import { MessageService } from 'primeng/api';

import { Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from '../cliente';

import { ClienteService } from 'src/app/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.css']
})
export class ClienteInfoComponent implements OnInit {


  paciente: any;

  infPes: boolean = true;
  cons: boolean = false;
  pag: boolean = false;
  util: boolean = false;

  dataSource: MatTableDataSource<Cliente>;
  formulario: FormGroup;



  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router, private messageService: MessageService,
    private formBuilder: FormBuilder) {
      this.paciente = new Cliente();
      this.criaFormulario(new Cliente())
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

     this.criaFormulario(this.paciente)
  }

  trocaMenu(menu: number) {
    switch (menu) {
      case 1: {
        this.infPes = true;
        this.cons = false;
        this.pag = false;
        this.util = false;
        break;
      }
      case 2: {
        this.infPes = false;
        this.cons = true;
        this.pag = false;
        this.util = false;
        break;
      }
      case 3: {
        this.infPes = false;
        this.cons = false;
        this.pag = true;
        this.util = false;
        break;
      }
      case 4: {
        this.infPes = false;
        this.cons = false;
        this.pag = false;
        this.util = true;
        break;
      }
      default: {
        this.infPes = false;
        this.cons = true;
        this.pag = false;
        this.util = false;
        break;
      }
    }
  }

  onUpdate() {

  }

  async criaFormulario(cliente: Cliente) {
    this.formulario = this.formBuilder.group({
      id: [cliente.id],
      numPasta: [cliente.numPasta, Validators.required],
      login: [cliente.login,Validators.required],
      senha: [cliente.senha, Validators.required],
      email: [cliente.email, Validators.required],
      nome: [cliente.nome, Validators.required],
      cpf: [cliente.cpf, Validators.required],
      dataCadastro: [''],
      dataNascimento: [cliente.dataNascimento, Validators.required],
      telefone: [cliente.telefone, Validators.required],

      // Endereço
      endereco: this.formBuilder.group({
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        cep: ['36048502', Validators.required],
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
        sangramentoExcessivo: [false],
        hipertenso: [false],
        gravida: [false],
        traumatismoFace: [false],
      }),
    });
  }
}

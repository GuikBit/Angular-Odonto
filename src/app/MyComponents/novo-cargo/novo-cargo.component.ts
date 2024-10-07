import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/cliente.service';

@Component({
  selector: 'app-novo-cargo',
  templateUrl: './novo-cargo.component.html',
  styleUrl: './novo-cargo.component.css'
})
export class NovoCargoComponent implements OnInit{

  formCargo: FormGroup;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: ClienteService){}

  ngOnInit(): void {
    this.criaFormulario();
  }


  criaFormulario(){
    this.formCargo = this.formBuilder.group({

      nome: ['',[Validators.required]],
      descricao: ['', Validators.required],
      departamento: ['', Validators.required],
      nivelHierarquico: [null, Validators.required],
      salarioBase: ['', Validators.required],
      requisitos: [null, Validators.required],
      dataCadastro: ['', Validators.required],
      dataUpdate: ['', Validators.required],
      userAlteracao: ['', Validators.required],
      cargaHoraria: [null, Validators.required],
      status: ['', Validators.required],
      orgId: ['', Validators.required],
      valeTrans: [false],
      valeAR: [false],
      planoSaude: [false],
      premiacao: [false],
      gymPass: [false],
      plr: [false]

    })
  }

}

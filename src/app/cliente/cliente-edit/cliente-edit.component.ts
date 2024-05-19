import { Component } from '@angular/core';
import { Cliente } from '../../class/cliente';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent {
  cliente: Cliente = new Cliente();
  indiceStep = 1;


  constructor(private _formBuilder: FormBuilder) {}


  InfoPessoaisFormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    dataCadastro: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    telefone: ['', Validators.required],
    naturalidade: ['', Validators.required],
    escolaridade: ['', Validators.required],
    ocupacao: ['', Validators.required],
  });
 EnderecoFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  PaisFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  AnamneseFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
 OutrosFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

}


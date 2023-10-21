import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent {
  cliente: Cliente = new Cliente();
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
export class StepperErrorsExample {
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
secondFormGroup = this._formBuilder.group({
  secondCtrl: ['', Validators.required],
});

constructor(private _formBuilder: FormBuilder) {}
}

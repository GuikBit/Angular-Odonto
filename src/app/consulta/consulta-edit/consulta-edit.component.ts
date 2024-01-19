import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consulta-edit',
  templateUrl: './consulta-edit.component.html',
  styleUrls: ['./consulta-edit.component.css']
})
export class ConsultaEditComponent {
formulario: FormGroup<any>;
listaPaciente: any[]|undefined;
listaDentista: any[]|undefined;

  constructor(){

  }

  onSubmit() {

  }

}

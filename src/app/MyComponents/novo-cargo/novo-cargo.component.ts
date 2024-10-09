import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CargoService } from 'src/app/cargo.service';
import { ClienteService } from 'src/app/cliente.service';


@Component({
  selector: 'app-novo-cargo',
  templateUrl: './novo-cargo.component.html',
  styleUrl: './novo-cargo.component.css'
})
export class NovoCargoComponent implements OnInit{

  @Output() closeModal = new EventEmitter<boolean>() ;

  formCargo: FormGroup;

  senioridade: any = null;
  qualificacao: any = null;
  horario: any = null;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: CargoService){}

  ngOnInit(): void {
    this.criaFormulario();
  }


  criaFormulario(){
    this.formCargo = this.formBuilder.group({

      nome: ['',[Validators.required]],
      descricao: ['', Validators.required],
      departamento: ['', Validators.required],
      nivelHierarquico: [null, Validators.required],
      salarioBase: [null, Validators.required],
      requisitos: [null, Validators.required],
      dataCadastro: [new Date(), Validators.required],
      dataUpdate: [],
      IdUserUpdade: [],
      idUsercriacao: [1, Validators.required],
      cargaHoraria: [null, Validators.required],
      status: [true, Validators.required],
      organizacaoId: [1, Validators.required],
      valeTrans: [false],
      valeAR: [false],
      planoSaude: [false],
      premiacao: [false],
      gymPass: [false],
      plr: [false]

    })
  }

  onSubmit(){
    console.log(this.formCargo.valid)
    console.log(this.formCargo)
    console.log(JSON.stringify(this.formCargo.value))

    if(this.formCargo.valid){

      this.formCargo.get('nivelHierarquico')?.setValue(this.formCargo.get('nivelHierarquico')?.value.name)
      this.formCargo.get('requisitos')?.setValue(this.formCargo.get('requisitos')?.value.name)
      this.formCargo.get('cargaHoraria')?.setValue(this.formCargo.get('cargaHoraria')?.value.name)

      this.service.postCargo(1,this.formCargo.value).then((response)=>{
        if(response?.status === 200 || response?.status === 201){
          
          this.closeModal.emit(false);

        }else{

        }
      }).catch((error)=>{

      })
    }
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CargoService } from 'src/app/services/cargo.service';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-novo-cargo',
  templateUrl: './novo-cargo.component.html',
  styleUrl: './novo-cargo.component.css'
})
export class NovoCargoComponent implements OnInit{

  @Output() closeModal = new EventEmitter<boolean>() ;

  userLogado: any;
  org: any;


  formCargo: FormGroup;

  senioridade: any = null;
  qualificacao: any = null;
  horario: any = null;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private service: CargoService){

    if ((this.userLogado === undefined || this.userLogado === null) && (this.org === null || this.org === undefined)) {

      const userStorage = localStorage.getItem('userLogado');
      const orgStorage = localStorage.getItem('organizacao');

      if (userStorage && orgStorage) {
        this.userLogado = JSON.parse(userStorage);
        this.org = JSON.parse(orgStorage);
      }
    }
  }

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
      idUsercriacao: [this.userLogado.id, Validators.required],
      cargaHoraria: [null, Validators.required],
      status: [true, Validators.required],
      organizacaoId: [this.org.id, Validators.required],
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

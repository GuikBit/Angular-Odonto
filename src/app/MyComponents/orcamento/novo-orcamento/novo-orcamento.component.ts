import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EspecConsulta } from 'src/app/class/EspecConsulta';
import { ConsultaService } from 'src/app/consulta.service';
import { DentistaService } from 'src/app/dentista.service';
import { Dentista } from 'src/app/class/dentista';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/class/cliente';

@Component({
  selector: 'app-novo-orcamento',
  templateUrl: './novo-orcamento.component.html',
  styleUrl: './novo-orcamento.component.css'
})
export class NovoOrcamentoComponent implements OnInit {

  listEspecConsulta: EspecConsulta[];
  listaDentista: Dentista[];

  formulario: FormGroup;
  org: any;

  dentista: Dentista;
  paciente: Cliente;


  buscarPaciente: boolean = false;

  searchQuery: string = '';

  pacientes: any[] = [
    { id: 1, nome: 'Guilherme Pinto de Oliveira' },
    { id: 2, nome: 'Bianca Cristina Machado' },
    { id: 3, nome: 'Elaini de Fatima Pinto Oliveira' },
    { id: 1, nome: 'Guilherme Pinto de Oliveira' },
    { id: 2, nome: 'Bianca Cristina Machado' },
    { id: 3, nome: 'Elaini de Fatima Pinto Oliveira' },
    { id: 1, nome: 'Guilherme Pinto de Oliveira' },
    { id: 2, nome: 'Bianca Cristina Machado' },
    { id: 3, nome: 'Elaini de Fatima Pinto Oliveira Perreira Gomes' },
    { id: 1, nome: 'Guilherme Pinto de Oliveira' },
    { id: 2, nome: 'Bianca Cristina Machado' },
    { id: 3, nome: 'Elaini de Fatima Pinto Oliveira' },
    { id: 1, nome: 'Guilherme Pinto de Oliveira' },
    { id: 2, nome: 'Bianca Cristina Machado' },
    { id: 3, nome: 'Elaini de Fatima Pinto Oliveira' },
    { id: 1, nome: 'Guilherme Pinto de Oliveira' },
    { id: 2, nome: 'Bianca Cristina Machado' },
    { id: 3, nome: 'Elaini de Fatima Pinto Oliveira' },
  ];
  selectedPaciente: any = null;

  constructor(private consultaService: ConsultaService, private formBuilder: FormBuilder, private dentistaService: DentistaService, private router: Router, private activatedRoute : ActivatedRoute) {}

  ngOnInit() {
    const organizacaoJson = localStorage.getItem('organizacao');
    if (organizacaoJson) {
      this.org = JSON.parse(organizacaoJson);
    }

    if(sessionStorage.getItem('idDentista')){
      this.dentistaService.getByIdDentista(sessionStorage.getItem('idDentista'), this.org.id).then((response)=>{
        console.log(response)
        if(response){
          this.dentista = response;
        }
      })
    }
    console.log(this.dentista)



    this.consultaService.getEspecConsulta().then((response) => {
      this.listEspecConsulta = response;
    });

    this.dentistaService.getDentistas(this.org.id).then((response)=>{
      this.listaDentista = response;
    })


    this.criaFormulario();


  }

  criaFormulario(){
    this.formulario = this.formBuilder.group({
      nomePaciente: [''],
      emailPaciente: [''],
      dataNascPaciente: [''],
      telefonePaciente: [''],
      cpfPaciente: [''],
      paciente: [this.paciente],
      dentista: ['', Validators.required],
      data: ['', Validators.required],
      validadeOrcamento: ['', Validators.required],
      procedimentos: [[], Validators.required],
      organizacaoId: [this.org.id, Validators.required],
      idOrganizacao: [this.org],
    })
  }

  onSubmit(){

  }

  selecionados($event: Event) {

    }
  get filteredPacientes() {
    return this.pacientes.filter(p => p.nome.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  selectPaciente(paciente: any) {
  this.selectedPaciente = paciente;
  }

  confirmSelection() {
    console.log('Paciente selecionado:', this.paciente);
    this.paciente = this.selectedPaciente;
    this.buscarPaciente = false;
  }
}


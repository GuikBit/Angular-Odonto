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
  totalSomado: number;
  parcelas: any[] ;
  formaPagamento: any[];

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

    this.consultaService.getEspecConsulta().then((response) => {
      this.listEspecConsulta = response;
    });

    this.dentistaService.getDentistas(this.org.id).then((response)=>{
      this.listaDentista = response;
    })
    this.criaFormulario();

    this.formaPagamento = [
      { label: 'Pix',      value: 1, icon: 'pi pi-arrow-right-arrow-left' },
      { label: 'Dinheiro', value: 2, icon: 'pi pi-money-bill' },
      { label: 'Cartão',   value: 3, icon: 'pi pi-credit-card' },
      { label: 'Outro',    value: 4, icon: 'pi pi-book' }
    ];
    this.parcelas = [
      { label: 'À vista',         value: 1, },
      { label: 'Parcelado em 2x', value: 2, },
      { label: 'Parcelado em 3x', value: 3, },
      { label: 'Parcelado em 4x', value: 4, },
      { label: 'Parcelado em 5x', value: 5, },
      { label: 'Parcelado em 6x', value: 6, },
    ];

  }

  criaFormulario(){
    this.formulario = this.formBuilder.group({
      nomePaciente: [''],
      emailPaciente: [''],
      dataNascPaciente: [''],
      telefonePaciente: [''],
      cpfPaciente: [''],
      paciente: [this.paciente],
      desconto: [0],
      acrecimo: [0],
      formaPagamento: ['', Validators.required],
      parcelas: ['',Validators.required],
      dentista: ['', Validators.required],
      data: ['', Validators.required],
      validadeOrcamento: ['', Validators.required],
      procedimentos: [[], Validators.required],
      organizacaoId: [this.org.id, Validators.required],
      idOrganizacao: [this.org],
    })
  }
  setDentista():void{
    this.dentista = this.formulario.get('dentista')?.value
  }

  onSubmit(){

  }

  selecionados(total: any) {
    console.log("total somado: ", total)
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

  async reloadingPagamento(reloading: boolean) {
    if(reloading){
      // const consulta = this.consultaSelecionadaPg.id;
      // this.consultaSelecionadaInfo(consulta, 2);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d]/g, ''); // Remove qualquer caractere não numérico

    if (event.key >= '0' && event.key <= '9') {
      value += event.key; // Adiciona o novo dígito no final
    } else if (event.key === 'Backspace') {
      value = value.slice(0, -1); // Remove o último dígito
    } else {
      event.preventDefault();
      return;
    }


    this.formulario.get('valorBase')?.setValue((Number(value) / 100));
    event.preventDefault();
  }
}


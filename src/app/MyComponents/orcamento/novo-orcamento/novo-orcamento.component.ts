import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EspecConsulta } from 'src/app/class/EspecConsulta';
import { ConsultaService } from 'src/app/services/consulta.service';
import { DentistaService } from 'src/app/services/dentista.service';
import { Dentista } from 'src/app/class/dentista';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/class/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

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
  totalSomado: number = 0;
  parcelas: any[] ;
  formaPagamento: any[];

  entrada: boolean = false;

  buscarPaciente: boolean = false;

  searchQuery: string = '';

  selectedFileName: string = 'Buscar';
  dataAtual: Date;
  parcelamento: any[];
  pacientes: any[];
  selectedPaciente: any = null;

  constructor(private consultaService: ConsultaService, private pacienteService: ClienteService, private formBuilder: FormBuilder, private dentistaService: DentistaService, private router: Router, private activatedRoute : ActivatedRoute) {}

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

    this.pacienteService.getPacientes(this.org.id).then((response)=>{
      this.pacientes = response;
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
      { label: 'Parcelado em 14x', value: 14, },
      { label: 'Parcelado em 26x', value: 26, },
      { label: 'Parcelado em 32x', value: 32, },
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
      entrada: [0],
      dataEntrada: [new Date()],
      formaPagamento: ['', Validators.required],
      nomeCartao: [],
      nCartao: [],
      validadeCartao: [],
      cvcCartao: [],
      tipoPagamento: [],
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

  totalEmProcedimentos(total: number) {
    console.log(total);
    if(total > 0){
      this.totalSomado = total;
      this.ajustaParcelas();
    }

  }

  get filteredPacientes() {
    return this.pacientes.filter(p => p.nome.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  selectPaciente(paciente: any) {
  this.selectedPaciente = paciente;
  }

  confirmSelection() {

    this.paciente = this.selectedPaciente;
    this.buscarPaciente = false;
    console.log('Paciente selecionado:', this.paciente);
  }

  async reloadingPagamento(reloading: boolean) {
    if(reloading){
      // const consulta = this.consultaSelecionadaPg.id;
      // this.consultaSelecionadaInfo(consulta, 2);
    }
  }

  onKeydown(event: KeyboardEvent, campo: any) {
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

    if(campo === 1){
      this.formulario.get('desconto')?.setValue((Number(value) / 100));
    }else if( campo === 2 ){
      this.formulario.get('acrecimo')?.setValue((Number(value) / 100));
    }else if( campo === 3){
      this.formulario.get('entrada')?.setValue((Number(value) / 100));
    }
    event.preventDefault();

    this.valorCadaParcela();
  }

  ajustaParcelas() {
    const parcelas = this.formulario.get('parcelas')?.value;
    const valorTotal = this.totalSomado;



  }
  procedimentosSelecionados(list: any){
    if(list.length === 0 ){
      this.totalSomado = 0;
    }
    console.log(list)
  }

  criaEntrada(){
    this.entrada = true;
    this.dataAtual = new Date();
  }

  calculaTotal(){
    return this.totalSomado + this.formulario.get('acrecimo')?.value - this.formulario.get('desconto')?.value;
  }

  calculoValorConsulta(){

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileName = file ? this.formatFileName(file.name) : 'Buscar';
  }

  formatFileName(fileName: string): string {
    if (fileName.length > 10) {
      return fileName.substr(0, 4) + '...' + fileName.substr(fileName.length - 3)
    }
    return fileName;
  }

  async excluirEntrada(){

    this.entrada = false;

    this.formulario.get('entrada')?.setValue('');
    this.valorCadaParcela();
  }

  buscarParcelas(){
    switch(this.formulario.get('parcelas')?.value){
      case 1 : return "1x";
      case 2 : return "2x";
      case 3 : return "3x";
      case 4 : return "4x";
      case 5 : return "5x";
      case 6 : return "6x";
      case 14 : return "14x";
      case 26 : return "26x";
      case 32 : return "32x";
      default:
          return "--";
    }
  }

  valorCadaParcela(){
    const parcelas = this.formulario.get('parcelas')?.value !== '' ? this.formulario.get('parcelas')?.value : 1 ;
    const somatorio = this.calculaTotal() - this.formulario.get('entrada')?.value;
    const total = somatorio / parcelas;

    if(total && total > 0){
      return total;
    }
    return 0;
  }

  ehCartao(){
    console.log(this.formulario.get('formaPagamento')?.value.value === 3)
    // if(list.length === 0 ){
    //   this.totalSomado = 0;
    // }
    if(this.formulario.get('formaPagamento')?.value.value === 3){
      return true;
    }
    return false;

  }
}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EspecConsulta } from 'src/app/class/EspecConsulta';
import { ConsultaService } from 'src/app/consulta.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css'
})
export class DragDropComponent implements OnInit{

  @Input() listaEspecConsultas: EspecConsulta[];
  @Output() selecao: EventEmitter<EspecConsulta[]> = new EventEmitter<EspecConsulta[]>();
  @Output() totalSomado: EventEmitter<number> = new EventEmitter<number>();

  selecionado: EspecConsulta[] = [];
  draggedProduct: EspecConsulta | null;

  constructor(private consultaService: ConsultaService) {}


  ngOnInit() {

  }

  dragStart(product: EspecConsulta) {
    this.draggedProduct = product;
  }

  drop() {
    if (this.draggedProduct !== null) {
      this.selecionado = [...this.selecionado, this.draggedProduct];
      this.listaEspecConsultas = this.listaEspecConsultas?.filter((val) => val.id !== this.draggedProduct?.id);
      this.draggedProduct = null;
    }
  }

  dragEnd() {
    this.draggedProduct = null;
  }

  onRemove(id: any) {
    const index = this.selecionado.findIndex(x => x.id === id);
    if (index !== -1) {
      const [removedProduct] = this.selecionado.splice(index, 1);
      this.insertInOrder(removedProduct);
    }
  }

  insertInOrder(product: EspecConsulta) {
    if (!this.listaEspecConsultas) {
      this.listaEspecConsultas = [product];
      return;
    }

    // Encontrar a posição correta para inserir o item de volta na lista ordenada por id
    const index = this.listaEspecConsultas.findIndex((p) => p.id > product.id);
    if (index === -1) {
      // Se não encontrar um item com id maior, insere no final da lista
      this.listaEspecConsultas.push(product);
    } else {
      // Insere o item na posição correta para manter a ordem
      this.listaEspecConsultas.splice(index, 0, product);
    }
  }

  somaTotalOrcamento(): number {
    let soma: number = 0;
    if (this.selecionado.length > 0) {
      this.selecionado.forEach(item => {
        soma += item.valorBase;
      });
    }
    this.totalSomado.emit(soma);
    this.selecao.emit(this.selecionado);
    return soma;
  }
}

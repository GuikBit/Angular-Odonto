

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from '../cliente';

import { ClienteService } from 'src/app/cliente.service';

@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.css']
})
export class ClienteInfoComponent implements AfterViewInit {


  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  clientes2: Cliente[]; //= [{id: 1,nome: 'Guilherme', cpf:'120981336000', dataCadastro:'15/03/2023'},{id: 2,nome: 'Pedro', cpf:'120981336000', dataCadastro:'15/03/2023'},{ id: 3,nome: 'Guilherme', cpf:'120981336000', dataCadastro:'15/03/2023'},{id: 1,nome: 'Guilherme', cpf:'120981336000', dataCadastro:'15/03/2023'},{id: 2,nome: 'Pedro', cpf:'120981336000', dataCadastro:'15/03/2023'},{ id: 3,nome: 'Guilherme', cpf:'120981336000', dataCadastro:'15/03/2023'}];  
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ClienteService) {
    this.service.getClientes().subscribe(response=>{
      this.clientes2 = response;
      
    })
    this.dataSource = new MatTableDataSource(this.clientes2);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
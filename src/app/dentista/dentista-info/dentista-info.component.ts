import { Component, OnInit } from '@angular/core';
import { Dentista } from '../dentista';
import { ActivatedRoute } from '@angular/router';
import { DentistaService } from 'src/app/dentista.service';

@Component({
  selector: 'app-dentista-info',
  templateUrl: './dentista-info.component.html',
  styleUrls: ['./dentista-info.component.css']
})
export class DentistaInfoComponent implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private service: DentistaService){}


  ngOnInit(){
    let id: string = '';
    this.route.params.subscribe(params => {
      id = params['id'];
    })
    if(id !== ''){
     const response = this.service.getDentistaFull(id);
    }

  }

}

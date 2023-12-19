import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cliente';

  constructor(private primeNgConfig: PrimeNGConfig){}

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }
}

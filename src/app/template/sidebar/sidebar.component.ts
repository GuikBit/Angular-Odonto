import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {FormControl} from '@angular/forms';
import {MatDrawerMode} from '@angular/material/sidenav';
import { Sidebar } from 'primeng/sidebar';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuarioLogado?: string;

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;



  sidebarVisible: boolean = false;

  position: string = 'top';
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();

  }

  logout()
  {
    this.authService.encerraSessao();
    this.router.navigate(['/login']);
  }

  mostrarElementoNaRota(rotaEspecifica: string): boolean {
    console.log(this.route.snapshot.routeConfig?.canActivate)
    return this.route.snapshot.routeConfig?.path === rotaEspecifica;
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }
}

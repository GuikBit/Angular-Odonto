import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  
  constructor(private authService: AuthService, private router: Router){

  }
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
    
      const logado = this.authService.isAuthenticated();
    
      if(await logado){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }

    
  }
  
}

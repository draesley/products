import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private router:Router){

  }

  canActivate(){

      this.router.navigate(['/pages']);
      return true;
    }
}

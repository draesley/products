import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../pages/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private userService:UserService,
              private router:Router){

  }

  canActivate(){

    if(this.userService.loginOk()){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    };
  }
}

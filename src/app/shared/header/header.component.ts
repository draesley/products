import { Component, OnInit } from '@angular/core';
import { UserService } from '../../pages/services/user.service';
import { User } from '../../config/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:User;

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }
}
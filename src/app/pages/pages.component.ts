import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private menuService:MenuService) { }

  ngOnInit() {
    this.menuService;
  }

}

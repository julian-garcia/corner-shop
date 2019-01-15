import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDropDownMenu: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onDropDownClick() {
    this.showDropDownMenu = !this.showDropDownMenu;
  }
}

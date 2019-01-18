import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showDropDownMenu: boolean = false;
  constructor(public authService: AuthService) { 
  }

  onDropDownClick() {
    this.showDropDownMenu = !this.showDropDownMenu;
  }

  logout() {
    this.authService.logout();
  }
}

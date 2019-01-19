import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDropDownMenu: boolean = false;
  showAdmin: boolean = false;

  constructor(public authService: AuthService, private userService: UserService) { 
  }

  ngOnInit() {
    this.authService.user$
      .pipe(switchMap(user => this.userService.get(user.uid)))
      .pipe(map(appUser => appUser['isAdmin'])).subscribe(isAdmin => {
        this.showAdmin = isAdmin;
      });
  }

  onDropDownClick() {
    this.showDropDownMenu = !this.showDropDownMenu;
  }

  logout() {
    this.authService.logout();
  }
}

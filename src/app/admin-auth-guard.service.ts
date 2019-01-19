import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private db: AngularFireDatabase,
              private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .pipe(switchMap(user => this.userService.get(user.uid)))
      .pipe(map(appUser => appUser['isAdmin']));
  }
}

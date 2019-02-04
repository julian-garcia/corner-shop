import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PositiveNumber } from 'app/positive-number.directive';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    PositiveNumber
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
  ],
  exports: [
    PositiveNumber
  ]
})
export class SharedModule { }

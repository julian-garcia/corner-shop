import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PositiveNumber } from 'app/shared/directives/positive-number.directive';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    PositiveNumber
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
  ],
  exports: [
    CommonModule,
    PositiveNumber,
    FormsModule,
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ]
})
export class SharedModule { }

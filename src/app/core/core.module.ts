import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }

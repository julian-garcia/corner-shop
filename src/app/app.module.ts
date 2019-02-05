import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'environments/environment';
import { SharedModule } from 'shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';

let routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AdminModule,
    ShoppingModule,
    SharedModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

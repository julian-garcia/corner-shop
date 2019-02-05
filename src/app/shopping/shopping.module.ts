import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderOutcomeComponent } from './order-outcome/order-outcome.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

let routes: Routes = [
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-details',
    component: OrderOutcomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    ShoppingCartComponent,
    CheckOutComponent,
    OrderOutcomeComponent,
    MyOrdersComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ]
})
export class ShoppingModule { }

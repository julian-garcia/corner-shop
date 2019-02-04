import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminAuthGuardService as AdminAuthGuard } from 'shared/services/admin-auth-guard.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { UpdateProductComponent } from './update-product/update-product.component';

let routes: Routes = [
  {
    path: 'admin/products/:key',
    component: UpdateProductComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  }
];

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AdminAuthGuard,
  ]
})
export class AdminModule { }

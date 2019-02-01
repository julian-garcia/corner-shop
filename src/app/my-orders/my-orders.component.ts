import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  userOrders: {}[];

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private productService: ProductService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.orderService.getUserOrders(user.uid).subscribe(
        orders => {
          this.userOrders = orders;
          this.userOrders.forEach(order => {
            let products = [];
            order['productsOrdered'].forEach(product => {
              this.productService.retrieveProduct(product.productId).subscribe(
                productDetails => {
                  if (product.productCount>0) products.push({'details': productDetails, 'count': product.productCount});
                  order['productsOrdered'] = products;
                });
            });
          });
        });
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  userOrders: {}[] = [];

  constructor(private orderService: OrderService,
              private userService: UserService,
              private productService: ProductService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      users => {
        Object.keys(users).forEach(userkey => {
          this.orderService.getUserOrders(userkey).subscribe( 
            orders => {
              let userOrders: {}[] = orders;
              userOrders.forEach(order => {
                order =  {...order['payload'].toJSON(), ...{'key': order['key']}, ...{'user': userkey}};
                let products = [];
                for (let prop in order['productsOrdered']) {
                  let product = order['productsOrdered'][prop];
                  this.productService.retrieveProduct(product.productId).subscribe(
                    productDetails => {
                      if (product.productCount>0) products.push({'details': productDetails, 'count': product.productCount});
                      order['productsOrdered'] = products;
                    });
                }
                this.userOrders.push(order);
              });
            });
        });
      });
  }

}

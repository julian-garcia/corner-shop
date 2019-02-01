import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { ProductService } from 'src/app/product.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  selectedOrder;
  allOrders: {}[] = [];

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
                this.allOrders.push(order);
              });
            });
        });
      });
  }

  adjustOrder(orderkey:string, userkey:string) {
    this.orderService.retrieveOrder(orderkey, userkey).subscribe(
      order => console.log(order)
    );
  }
}

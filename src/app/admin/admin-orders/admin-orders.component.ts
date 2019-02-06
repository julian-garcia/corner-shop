import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'app/shared/services/order.service';
import { ProductService } from 'app/shared/services/product.service';
import { UserService } from 'app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  allOrders: {}[] = [];
  showAdjustForm: boolean;
  subscription: Subscription;
  selectedOrder;
  selectedOrderIndex;

  constructor(private orderService: OrderService,
              private userService: UserService,
              private productService: ProductService) {}

  ngOnInit() {
    this.showAdjustForm = false;
    this.subscription = this.userService.getAll().subscribe(
      users => {
        Object.keys(users).forEach(userkey => {
          this.orderService.getUserOrders(userkey).subscribe(
            orders => {
              let userOrders: {}[] = orders;
              this.allOrders = [];
              // Extract user and order IDs so that we can update the relevant order
              // if a product amount is adjusted. Also extracting product details as the
              // product list within an order is just the product id alonside a count
              userOrders.forEach(order => {
                order =  {...order['payload'].toJSON(), ...{'key': order['key']}, ...{'user': userkey}};
                let products = [];
                for (let prop in order['productsOrdered']) {
                  if (order['productsOrdered'].hasOwnProperty(prop)) {
                    let product = order['productsOrdered'][prop];
                    this.productService.retrieveProduct(product.productId).subscribe(
                    productDetails => {
                      products.push({'details': productDetails, 'count': product.productCount});
                      order['productsOrdered'] = products;
                    });
                  }
                }
                this.allOrders.push(order);
              });
            });
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cancelAdjustment(formUntouched) {
    this.showAdjustForm = !this.showAdjustForm;
    if (!formUntouched) window.location.reload();
  }

  adjustOrderForm(order, orderIndex) {
    this.showAdjustForm = true;
    this.selectedOrder = order;
    this.selectedOrderIndex = orderIndex;
  }

  adjustOrder(formValue, order) {
    let index = 0;
    let adjustedTotal = 0;

    for (let prop in formValue) {
      if (formValue.hasOwnProperty(prop)) {
        let price = order.productsOrdered[index].details.price;
        adjustedTotal += price * formValue[prop];
        this.orderService.updateCount(order.key, order.user, index, formValue[prop]);
        index++;
      }
    }

    this.orderService.updateTotal(order.key, order.user, Math.round(adjustedTotal * 100) / 100);
    this.allOrders[this.selectedOrderIndex]['orderTotal'] = adjustedTotal;
    this.showAdjustForm = false;
  }
}

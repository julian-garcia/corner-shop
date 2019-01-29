import { Injectable } from '@angular/core';
import { Order } from './models/order';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  add(shippingFormValues, orderTotal, orderSummary, user) {
    let productsOrdered: {'productId': string, 'productCount': number}[] = [];

    orderSummary.filter(product => {
      if (product.count) productsOrdered.push({'productId': product.key, 'productCount': product.count})
    });

    let order = new Order(shippingFormValues.name, 
                          shippingFormValues.addressLine1 + ',' + shippingFormValues.addressLine2,
                          shippingFormValues.city,
                          productsOrdered, orderTotal);
    this.db.list('/orders/' + user.uid).push(order);
  }

  getUserOrders(userId) {
    return this.db.list('/orders/' + userId).valueChanges();
  }
}

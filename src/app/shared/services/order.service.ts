import { Injectable } from '@angular/core';
import { Order } from 'shared/models/order';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  add(shippingFormValues, orderTotal, orderSummary, user) {
    let orderDate = new Date().toDateString();
    let productsOrdered: {'productId': string, 'productCount': number}[] = [];

    orderSummary.filter(product => {
      if (product.count) productsOrdered.push({'productId': product.key, 'productCount': product.count})
    });

    let order = new Order(shippingFormValues.name, 
                          shippingFormValues.addressLine1 + ',' + shippingFormValues.addressLine2,
                          shippingFormValues.city,
                          productsOrdered, orderTotal, orderDate);

    this.db.list('/orders/' + user.uid).push(order);
  }

  getAllOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getUserOrders(userId) {
    return this.db.list('/orders/' + userId).snapshotChanges();
  }

  updateCount(orderId:string, userId:string, productIndex, productCount) {
    return this.db.object('/orders/' + userId + '/' + orderId + '/productsOrdered/' + productIndex).update({'productCount': productCount});
  }

  updateTotal(orderId:string, userId:string, productTotal) {
    return this.db.object('/orders/' + userId + '/' + orderId).update({'orderTotal': productTotal});
  }
}
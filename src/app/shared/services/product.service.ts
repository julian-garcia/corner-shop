import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  add(product: Product) {
    this.db.list('/products').push(product);
  }

  update(product, productId) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

  getCategories() {
    return this.db.list('categories').valueChanges();
  }

  getProducts() {
    return this.db.list('products').snapshotChanges();
  }

  retrieveProduct(productId) {
    return this.db.object('products/' + productId).valueChanges();
  }
}

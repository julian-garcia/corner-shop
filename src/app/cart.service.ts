import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts: {'key': string, 'count': number}[] = [];
  totalCount: EventEmitter<number> = new EventEmitter();

  constructor() { }

  addToCart(key: string) {
    let count = 1;

    // If the cart exists in local storage, either increment the count if the relevant
    // product is already in the cart. Otherwise, define the cart in local storage
    // with the relevant product and initial count 1
    if (localStorage.getItem('cartProducts')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      let productInCart = this.cartProducts.filter(
        cartItem => cartItem.key === key
      );
      // If product is already in cart, increment the corresponding count,
      // otherwise, add the new product to the cart with a count of one
      if (productInCart[0]) {
        count = productInCart[0].count + 1 ;
        let index = this.cartProducts.indexOf(productInCart[0]);
        this.cartProducts[index].count = count;
      } else {
        this.cartProducts.push({'key': key, 'count': count});
      }
    } else {
      this.cartProducts.push({'key': key, 'count': count});
    }
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  removeFromCart(key: string) {
    if (localStorage.getItem('cartProducts')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      let productInCart = this.cartProducts.filter(
        cartItem => cartItem.key === key
      );
      if (productInCart[0]) {
        let count = (productInCart[0].count > 0) ? productInCart[0].count - 1 : 0;
        let index = this.cartProducts.indexOf(productInCart[0]);
        if (count == 0) {
          this.cartProducts.splice(index, 1);
        } else { 
          this.cartProducts[index].count = count;
        }
      }
      if (this.cartProducts.length == 0) {
        localStorage.removeItem('cartProducts');
      } else {
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
      }
    }
  }

  emitTotalCount() {
    if (localStorage.getItem('cartProducts')) {
      let totalCount = 0;
      JSON.parse(localStorage.getItem('cartProducts')).filter(
        cartItem => totalCount += cartItem.count
      );
      this.totalCount.emit(totalCount);
    } else {
      this.totalCount.emit(null);
    }
  }

  productCount(key: string) {
    if (localStorage.getItem('cartProducts')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      let productInCart = this.cartProducts.filter(
        cartItem => cartItem.key === key
      );
      return (productInCart[0]) ? productInCart[0].count : null;
    } else {
      return null;
    }
  }

  appendCounts(products: any[], key: string) {
    products.filter(
      item => {
        if (item.key === key) {
          item.count = this.productCount(key);
        }
      });
  }

  calcTotalCost(products) {
    let totalCost = 0;
    products.filter(
      product => {
        totalCost += (product.count * product.payload.toJSON().price);
      }
    );
    return totalCost;
  }

  filterProductsInCart(products) {
    products.filter(
      product => {
        this.appendCounts(products, product.key);
        if (product.count == null) {
          products.splice(products.indexOf(product),1);
        }
      }
    );
  }
}

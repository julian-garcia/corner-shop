import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { CartService } from 'shared/services/cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartProducts: any[];
  totalCost: number;

  constructor(private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.cartProducts = this.cartService.filterProductsInCart(products);
        this.totalCost = this.cartService.calcTotalCost(this.cartProducts);
      });
  }

  addToCart(key: string) {
    this.cartService.addToCart(key);
    this.cartService.appendCounts(this.cartProducts, key);
    this.cartService.emitTotalCount();
    this.cartProducts = this.cartService.filterProductsInCart(this.cartProducts);
    this.totalCost = this.cartService.calcTotalCost(this.cartProducts);
  }

  removeFromCart(key: string) {
    this.cartService.removeFromCart(key);
    this.cartService.appendCounts(this.cartProducts, key);
    this.cartService.emitTotalCount();
    this.cartProducts = this.cartService.filterProductsInCart(this.cartProducts);
    this.totalCost = this.cartService.calcTotalCost(this.cartProducts);
  }
}

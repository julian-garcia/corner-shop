import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { CartService } from 'shared/services/cart.service';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  orderSummary: any[];
  orderTotal: number;
  user: firebase.User;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.orderSummary = this.cartService.filterProductsInCart(products);
        this.orderTotal = this.cartService.calcTotalCost(this.orderSummary);
      });
    this.authService.user$.subscribe(user => this.user = user);
  }

  submitOrder(shippingFormValues) {
    this.orderService.add(shippingFormValues, this.orderTotal, this.orderSummary, this.user);
    this.router.navigate(['/order-details']);
    localStorage.removeItem('cartProducts');
    this.cartService.emitTotalCount();
  }
}

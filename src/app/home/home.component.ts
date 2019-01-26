import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any[];
  products: any[];
  categoryProducts: any[];
  selectedCategory;
  productCounts: {'key':string, 'count':number}[];

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit() {
    this.selectedCategory = '';

    this.productService.getCategories().subscribe(
      categories => this.categories = categories.sort());

    this.productService.getProducts().subscribe(
      products => {
        this.products = this.categoryProducts = products;

        // Append cart based product counts in local storage
        // to each product in the home page listing
        this.categoryProducts.filter(
          product => this.cartService.appendCounts(this.categoryProducts, product.key)
        );

        this.route.queryParams.subscribe(
          category => {
            if (typeof category.category !== "undefined") {
              this.filterCategory(category.category);
              this.selectedCategory = category.category;
            } else {
              this.selectedCategory = '';
              this.filterCategory(this.selectedCategory);
            }
          });
      });
  }

  filterCategory(category: string) {
    this.categoryProducts = (category && category.length > 0) ? this.products.filter(
      p => p.payload.toJSON().category.toLowerCase().includes(category.toLowerCase())
    ) : this.products;
  }

  addToCart(key: string) {
    this.cartService.addToCart(key);
    this.cartService.appendCounts(this.categoryProducts, key);
    this.cartService.emitTotalCount();
  }

  removeFromCart(key: string) {
    this.cartService.removeFromCart(key);
    this.cartService.appendCounts(this.categoryProducts, key);
    this.cartService.emitTotalCount();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  categories;
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  showAddProductForm = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getCategories()
      .subscribe(categories => this.categories = categories.sort());
    this.subscription = this.productService.getProducts()
      .subscribe(products => this.filteredProducts = this.products = products.sort());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addProduct(newProduct:Product) {
    this.productService.add(newProduct);
    this.showAddProductForm = false;
  }

  addProductForm() {
    this.showAddProductForm = true;
  }

  deleteProduct(prooductId, productTitle) {
    if (confirm('Delete product ' + productTitle + '?')) this.productService.delete(prooductId);
  }

  filter(query) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.payload.toJSON().title.includes(query)) : this.products;
    console.log(query, this.filteredProducts);
    this.products = this.filteredProducts;
  }
}

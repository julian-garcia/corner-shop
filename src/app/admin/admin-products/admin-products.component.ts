import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Product } from 'shared/models/product';
import { ProductService } from 'app/shared/services/product.service';
import { Subscription } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  rows = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCategories()
      .subscribe(categories => this.categories = categories.sort());
    this.subscription = this.productService.getProducts()
      .subscribe(products => {
        this.filteredProducts = this.products = products.sort();
        let rows = [];
        this.products.filter(p => {
          let product = p.payload.toJSON(); 
          rows.push({'title':product.title, 
                     'price':product.price, 
                     'edit':[p.key, product.title]}); 
          });
          this.rows = rows;
          this.table.offset = 0;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addProduct(newProduct:Product) {
    this.productService.add(newProduct);
    this.showAddProductForm = false;
  }

  addProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
  }

  deleteProduct(prooductId, productTitle) {
    if (confirm('Delete ' + productTitle + '?')) this.productService.delete(prooductId);
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(
        p => p.payload.toJSON().title.toLowerCase().includes(query.toLowerCase())
      ) : this.products;

    let rows = [];
    this.filteredProducts.filter(p => {
      let product = p.payload.toJSON(); 
      rows.push({'title':product.title, 
                 'price':product.price, 
                 'edit':[p.key, product.title]}); 
                
      });
    this.rows = rows;
    this.table.offset = 0;
  }
}

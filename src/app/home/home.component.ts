import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private productService: ProductService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedCategory = '';
    this.productService.getCategories().subscribe(
      categories => this.categories = categories.sort());

    this.productService.getProducts().subscribe(
      products => {
        this.products = this.categoryProducts = products;
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
}

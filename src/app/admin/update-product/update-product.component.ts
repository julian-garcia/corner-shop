import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  product = {};
  categories;
  id;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute, 
              private router: Router) { 
    this.productService.getCategories().subscribe(c => this.categories = c);
    this.id = this.route.snapshot.paramMap.get('key');
    if (this.id) {this.productService.retrieveProduct(this.id).subscribe(p => this.product = p)};
  }

  ngOnInit() {
  }

  updateProduct(product: Product) {
    this.productService.update(product, this.id);
    this.router.navigate(['admin/products']);
  }
}

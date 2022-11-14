import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product, Products } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getProductByCategory(0);
  }
  categories: Category[] = [];
  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(response => {
      this.categories = response.categories;
    });
  }
  products: Product[] = []
  selectedCategoryId: number = 0;
  getProductByCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    if (categoryId == 0) {
      this.productService.getAllProduct().subscribe(response => {
        this.products = response.products;
      });
    }
    else {
      this.productService.getByCategoryId(categoryId).subscribe((response) => {
        this.products = response.products;
      })
    }
  }
}

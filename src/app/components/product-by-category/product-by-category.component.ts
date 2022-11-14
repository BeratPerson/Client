import { Component, Input, OnInit } from '@angular/core';
import { Product, Products } from 'src/app/models/Product';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css']
})
export class ProductByCategoryComponent implements OnInit {
  @Input()
  products: Product[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

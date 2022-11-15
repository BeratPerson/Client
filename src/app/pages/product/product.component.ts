import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

declare var window: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private notificationService: NotificationService) { }

  formModal: any;

  ngOnInit(): void {
    this.getAllProduct();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('updateproduct')
    );
    this.getAllCategories();
  }

  products: Product[] = [];
  getAllProduct() {
    this.productService.getAllProduct().subscribe(response => {
      this.products = response.products;
    });
  }

  categories: Category[] = [];
  getAllCategories() {
    this.productService.getAllCategory().subscribe(response => {
      this.categories = response.categories;
    });
  }

  form = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    stock: new FormControl(0, Validators.required),
    price: new FormControl(0, Validators.required),
    categoryId: new FormControl(0, Validators.required),
  });

  openSaveProductModal(product: Product) {
    if (this.categories.length == 0) {
      this.notificationService.showInfo("Please First Add a Category", "İnfo")
    }
    else {
      if (product?.id) {
        this.form.patchValue({
          id: product.id, name: product.productName, price: product.price, stock: product.stock, categoryId: product.categoryId
        })
      }
      else {
        this.form.patchValue({
          id: 0, name: "", price: 0, stock: 0, categoryId: this.categories.length < 1 ? 0 : this.categories[0].id
        })
      }
      this.formModal.show()
    }

  }

  productModel: Product | any;
  product: Product | any;
  saveProduct() {
    this.product = this.form.value
    if (this.product.id == 0) {
      this.productService.addProduct(this.product).subscribe(response => {
        this.notificationService.showSuccess(response.message, "Success")
        this.getAllProduct();
      })
    }
    else {
      this.productService.updateProduct(this.product).subscribe(response => {
        this.notificationService.showSuccess(response.message, "Success")
        this.getAllProduct();
      })
    }
    this.formModal.hide()
  }
  deleteProduct(id: Number) {
    this.product = this.form.value
    this.productService.deleteProduct(id).subscribe(response => {
      this.notificationService.showSuccess(response.message, "Success")
      this.getAllProduct();
    })
  }
}

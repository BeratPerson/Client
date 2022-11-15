import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
declare var window: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private notificationService: NotificationService) { }

  formModal: any;


  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('updatecategory')
    );
    this.getAllCategories();
  }

  categories: Category[] = [];
  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(response => {
      this.categories = response.categories;
    });
  }

  form = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
  });

  openUpdateModal(category: Category) {
    if (category?.id) {
      this.form.patchValue({
        id: category.id, name: category.categoryName,
      })
    }
    else {
      this.form.patchValue({
        id: 0, name: "",
      })
    }
    this.formModal.show()
  }

  categoryModel: Category | any;
  category: Category | any;
  saveCategory() {
    this.category = this.form.value
    if (this.category.id == 0) {
      this.categoryService.addCategory(this.category).subscribe(response => {
        this.notificationService.showSuccess(response.message, "Success")
        this.getAllCategories();
      })
    }
    else {
      this.categoryService.updateCategory(this.category).subscribe(response => {
        this.notificationService.showSuccess(response.message, "Success")
        this.getAllCategories();
      })
    }
    this.formModal.hide()
  }
  deleteCategory(id: Number) {
    this.category = this.form.value
    this.categoryService.deleteCategory(id).subscribe(response => {
      this.notificationService.showSuccess(response.message, "Success")
      this.getAllCategories();
    })
  }
}

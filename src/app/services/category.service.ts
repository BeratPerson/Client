import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories, Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<Categories> {
    return this.http.get<Categories>("/api/Category/GetAll",)
  }
  addCategory(category: Category): Observable<any> {
    return this.http.post<any>("/api/Category", {
      name: category.name
    })
  }
  updateCategory(category: Category): Observable<any> {
    return this.http.put<any>("/api/Category", { id: category.id, name: category.name })
  }

  deleteCategory(id: Number): Observable<any> {
    return this.http.delete<any>("/api/Category", {
      body: {
        id: id,
      },
    })
  }
}

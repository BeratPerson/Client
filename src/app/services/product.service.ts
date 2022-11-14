import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Products } from '../models/Product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getAllProduct(): Observable<Products> {
    return this.http.get<Products>("/api/Product/GetAll")
  }
  getByCategoryId(categoryId: number): Observable<Products> {
    return this.http.get<Products>("/api/Product/GetByCategoryId?CategoryId=" + categoryId)
  }
  getAllCategory(): Observable<any> {
    return this.http.get<any>("/api/Category/GetAll")
  }
  addProduct(product: Product): Observable<any> {
    return this.http.post<any>("/api/Product", { name: product.name, price: product.price, stock: product.stock, categoryId: product.categoryId })
  }
  updateProduct(product: Product): Observable<any> {
    return this.http.put<any>("/api/Product", { id: product.id, name: product.name, price: product.price, stock: product.stock, categoryId: product.categoryId })
  }

  deleteProduct(id: Number): Observable<any> {
    return this.http.delete<any>("/api/Product/", {
      body: {
        id: id,
      },
    })
  }

}

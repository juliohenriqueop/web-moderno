import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsEndPoint: string = `${environment.backendURL}/products`

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient) {
  }

  notify(message: string, success: boolean): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: success ? ['notification-success'] : ['notification-failure']
    })
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.productsEndPoint, product)
  }

  list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsEndPoint)
  }

  getById(productId: number): Observable<Product> {
    const productURL = `${this.productsEndPoint}/${productId}`
    return this.httpClient.get<Product>(productURL)
  }

  update(product: Product): Observable<Product> {
    const productURL = `${this.productsEndPoint}/${product.id}`
    return this.httpClient.put<Product>(productURL, product)
  }

  delete(productId: number): Observable<Product> {
    const productURL = `${this.productsEndPoint}/${productId}`
    return this.httpClient.delete<Product>(productURL)
  }
}

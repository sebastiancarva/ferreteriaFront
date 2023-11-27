import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allproducts`);
  }

  buyProduct(productId: number, quantity: number): Observable<any> {
    const url = `${this.baseUrl}/${productId}/buy?quantity=${quantity}`;
    return this.http.post<any>(url, null);
  }


}

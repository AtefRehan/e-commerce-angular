import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  apiUrl = environment.apiUrl;
  addToCart(product:Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl +'/cart' , product);
  }

  getCartItems(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl + '/cart');
  
  }
  clearCart(): Observable<void>{
    return this.http.delete<void>(this.apiUrl+'/cart');
  }
  checkOut(products:Product[]): Observable<void>{
    return this.http.post<void>(this.apiUrl+'/checkout',products);
  }

}
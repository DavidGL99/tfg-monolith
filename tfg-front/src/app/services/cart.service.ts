import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GATEWAY_URL } from '../env';
import { OrderService } from './order.service';

@Injectable({
   providedIn: 'root',
})
export class CartService {
   constructor(private http: HttpClient, private orderService: OrderService) {}

   private backendURL = GATEWAY_URL + '/cart';

   addToCart(userId: String, productId: Number, cantidad: Number, auth: String): Observable<any> {
      return this.http.post(
         `${this.backendURL}/save`,
         { userId: userId, productId: productId, cantidad: cantidad },
         { headers: { Authorization: 'Bearer ' + auth } }
      );
   }

   getById(id: String, auth: String): Observable<any> {
      return this.http.get(`${this.backendURL}/id/${id}`, { headers: { Authorization: 'Bearer ' + auth } });
   }

   buy(id: String, products: any[], auth: String): Observable<any> {
      this.orderService.addOrder(id, products, auth).subscribe();
      return this.http.delete(`${this.backendURL}/remove/user/${id}`, { headers: { Authorization: 'Bearer ' + auth } });
   }

   delete(id:String, auth:String) : Observable<any> {
    return this.http.delete(`${this.backendURL}/remove/product/${id}`, { headers: { Authorization: 'Bearer ' + auth } });
 }
}

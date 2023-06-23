import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GATEWAY_URL } from '../env';

@Injectable({
   providedIn: 'root',
})
export class OrderService {
   constructor(private http: HttpClient) {}

   private backendURL = GATEWAY_URL + '/order';

   addOrder(id: any, products: any[], auth: String): Observable<any> {
      return this.http.post(`${this.backendURL}/save`, { userId: id, productId: products }, { headers: { Authorization: 'Bearer ' + auth } });
   }

   getById(id: String, auth: String): Observable<any> {
      return this.http.get(`${this.backendURL}/id/${id}`, { headers: { Authorization: 'Bearer ' + auth } });
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GATEWAY_URL } from '../env';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class PaypalService {
   constructor(private http: HttpClient) {}

   private backendURL = GATEWAY_URL + '/order/checkout';

   pay(price: any, auth: String) : Observable<any> {
      var body = {
         intent: 'CAPTURE',
         purchase_units: [
            {
               reference_id: Math.floor(Math.random() * 100000000),
               amount: {
                  currency_code: 'USD',
                  value: `${price}`,
               },
            },
         ],
      };

      return this.http.post(`${this.backendURL}`, body, { headers: { Authorization: 'Bearer ' + auth } })
   }
}

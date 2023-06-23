import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GATEWAY_URL } from '../env';

@Injectable({
   providedIn: 'root',
})
export class ProductService {
   httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };
   constructor(private http: HttpClient) {}

   private backendURL = GATEWAY_URL + '/product';

   getAllByCategory(category: String): Observable<any> {
      return this.http.get(`${this.backendURL}/category/${category}`);
   }

   getAll(): Observable<any> {
      return this.http.get(`${this.backendURL}/all`);
   }

   getById(id: String): Observable<any> {
      return this.http.get(`${this.backendURL}?id=${id}`);
   }
   search(name: String): Observable<any> {
      return this.http.get(`${this.backendURL}/search?name=${name}`);
   }
}

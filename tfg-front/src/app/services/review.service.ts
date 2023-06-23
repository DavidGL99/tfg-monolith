import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GATEWAY_URL } from '../env';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {}

   private backendURL = GATEWAY_URL + '/review';

   addReview(review : Review, auth: String):  Observable<any> {
     console.log(review)
    return this.http.post(`${this.backendURL}/save`,  review , { headers: { Authorization: 'Bearer ' + auth } });
   }

   getById(id: String): Observable<any> {
      return this.http.get(`${this.backendURL}/id/${id}`);
   }

   getMostReviewed(): Observable<any> {
    return this.http.get(`${this.backendURL}/best`);
 }
}

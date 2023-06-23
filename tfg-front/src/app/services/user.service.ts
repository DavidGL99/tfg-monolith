import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GATEWAY_URL } from '../env';

@Injectable({
   providedIn: 'root',
})
export class UserService {
   httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
   };
   constructor(private http: HttpClient) {}

   private authURL = GATEWAY_URL + '/auth';

   login(email: String, password: String): Observable<any> {
      return this.http.post(`${this.authURL}/login`, { email: email, password: password });
   }

   register(email: String, password: String, name: String, lastnames: String): Observable<any> {
      return this.http.post(`${this.authURL}/create`, { email: email, password: password, name: name, lastnames: lastnames });
   }

   validate(token: String): any {
    return this.http.post(`${this.authURL}/validate`, { token: token });

 }

}

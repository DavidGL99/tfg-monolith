import { Component } from '@angular/core';
import { Categories } from '../interfaces/categories';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Component({
   selector: 'app-catalog',
   templateUrl: './search.component.html',
   styleUrls: ['./search.component.css'],
})
export class SearchComponent {
   products = [];
   query:any;
   name: any = '';
   token: any = '';
   constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private userService: UserService) {}

   ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
         this.setQuery(params['name']);
        this.search(this.query);
      });

      this.name = localStorage.getItem('name');
      this.token = localStorage.getItem('jwt');
      console.log(this.token);
      if (this.name) {
         this.userService.validate(this.token).pipe(
            catchError(error => {

               if (error.status === 401) {
                  this.logout();
               }

               return throwError(error);

            })
         ).subscribe((response: { token: any; }) => {
          // This is where you can handle the successful response
         this.token = response.token
        });
      }
   }

  setQuery(name : String){
this.query = name;
  }

   search(name : String): void {
      this.productService.search(name).subscribe((res) => {
         res.forEach((a: any) => {
            a.price += '€';
         });
         this.products = res;
      });
   }

   logout(): void {
      localStorage.clear();
      window.location.reload();
      this.router.navigate(['/']);
   }
}

import { Component } from '@angular/core';
import { Categories } from '../interfaces/categories';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Component({
   selector: 'app-catalog',
   templateUrl: './catalogue.component.html',
   styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent {
   categories = [Categories[0], Categories[1], Categories[2], Categories[3], Categories[4], Categories[5], Categories[6], Categories[7], Categories[8]];
   currentCategory: String = '';
   products = [];
   name: any = '';
   token: any = '';
   constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private userService: UserService) {}

   ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
         this.setCategory(params['category']);
         if (!params['category']) {
            this.getAll();
         } else {
            this.getAllByCategory();
         }
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

   setCategory(category: any): void {
      this.currentCategory = this.categories[category];
   }

   getAllByCategory(): void {
      this.productService.getAllByCategory(this.currentCategory.toLowerCase()).subscribe((res) => {
         res.forEach((a: any) => {
            a.price += '€';
         });
         this.products = res;
      });
   }

   getAll(): void {
      this.productService.getAll().subscribe((res) => {
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

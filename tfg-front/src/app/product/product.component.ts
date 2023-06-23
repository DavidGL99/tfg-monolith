import { ProductService } from '../services/product.service';
import { Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ReviewService } from '../services/review.service';
@Component({
   selector: 'app-product',
   templateUrl: './product.component.html',
   styleUrls: ['./product.component.css'],
})
export class ProductComponent {
   constructor(private route: ActivatedRoute, private router: Router,
    private cartService : CartService, private productService: ProductService,
    private reviewService : ReviewService) {}

   name: String = '';

   price: String = '';

   url: String = '';

   id: String = '';

   email : any;

   jwt : any;

   reviews :any[]= []

   ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
         if (params['id']) {
            this.getProductById(params['id']);
            this.getReviewsById(params['id']);
         }
      });
   }
   getProductById(id: String) {
      this.productService.getById(id).subscribe((res) => {
         res.price = res.price += '€';

         this.price = res.price;
         this.name = res.name;
         this.url = res.url;
      });
   }

   getReviewsById(id: String) {
    this.reviewService.getById(id).subscribe((res) => {
       this.reviews = res;
    });
 }

   addToCart(): void {
      if (localStorage.getItem('email')) {
         this.email = localStorage.getItem('email');
         this.jwt = localStorage.getItem('jwt');

         this.cartService.addToCart(this.email, Number(this.id), 1, this.jwt).subscribe();
         this.router.navigateByUrl(`/cart`);
      } else {
         this.router.navigateByUrl(`/login`);
      }
   }


}

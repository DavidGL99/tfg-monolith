import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
   selector: 'app-catalogue-item',
   templateUrl: './catalogue-item.component.html',
   styleUrls: ['./catalogue-item.component.css'],
})
export class CatalogueItemComponent {
   constructor(private route: Router, private cartService: CartService) {}

   email: any;
   jwt: any;

   @Input() name: any;

   @Input() price: any;

   @Input() url: any;

   @Input() id: any;

   addToCart(): void {
      if (localStorage.getItem('email')) {
         this.email = localStorage.getItem('email');
         this.jwt = localStorage.getItem('jwt');
         this.cartService.addToCart(this.email, this.id, 1, this.jwt).subscribe();
         this.route.navigateByUrl(`/cart`);
      } else {
         this.route.navigateByUrl(`/login`);
      }
   }
}

import { Component } from '@angular/core';
import { isFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
   selector: 'app-cart',
   templateUrl: './cart.component.html',
   styleUrls: ['./cart.component.css'],
})
export class CartComponent {
   constructor(private cartService: CartService, private userService: UserService, private router: Router) {}

   name: any;
   email: any;
   price = 0;
   jwt: any;
   cartItems: any = [];
   provincia: any;
   codigo: any;
   direccion: any;
   tarjeta: any;
   cvv: any;
   fechaCad: any;

   ngOnInit(): void {
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
      this.jwt = localStorage.getItem('jwt');
      this.getCart();

      if (this.name) {
         this.userService
            .validate(this.jwt)
            .pipe(
               catchError((error) => {
                  if (error.status === 401) {
                     this.logout();
                  }

                  return throwError(error);
               })
            )
            .subscribe();
      }
   }

   logout(): void {
      localStorage.clear();
      this.router.navigate(['/login']).then(() => {
         window.location.reload();
      });
   }

   getCart() {
      this.cartService.getById(this.email, this.jwt).subscribe((res) => {
         res.forEach((e: any) => {
            this.cartItems.push({
               producto: e.product,
               cantidad: e.cantidad,
            });
            this.price += Number(e.product.price);
         });
      });
   }

   buy(): void {
      var productIdList : any[] =[];
      this.cartItems.forEach((e: any) => {
        console.log(e)
         productIdList.push(e.producto.id);
      });
      this.cartService.buy(this.email, productIdList, this.jwt).subscribe();
      window.location.reload();

   }

   delete(productId : any){
    this.cartService.delete(productId, this.jwt).subscribe();
    window.location.reload();
   }
}

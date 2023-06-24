import { Component } from '@angular/core';
import { isFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { PaypalService } from '../services/paypal.service';
import { ToastrService } from 'ngx-toastr';
@Component({
   selector: 'app-cart',
   templateUrl: './cart.component.html',
   styleUrls: ['./cart.component.css'],
})
export class CartComponent {
   constructor(private toastr : ToastrService, private route: ActivatedRoute, private cartService: CartService,private paypalService: PaypalService, private userService: UserService, private router: Router) {}

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
      this.route.queryParams.subscribe((params) => {
        if (params['success'] == 'true') {
          this.toastr.success('Compra realizada con exito');        }
     });
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

    console.log( this.cartItems);
    var orderPrice = 0;
      var productIdList : any[] =[];
      this.cartItems.forEach((e: any) => {
        console.log(e)
         productIdList.push(e.producto.id);
         orderPrice += Number(e.producto.price);

      });
      this.cartService.buy(this.email, productIdList, this.jwt).subscribe();
      var checkout = this.paypalService.pay(orderPrice, this.jwt).subscribe(
        (res) => {
          console.log( res.links[1].href );
          window.location.href = res.links[1].href
        }
      );

    }

   delete(productId : any){
    this.cartService.delete(productId, this.jwt).subscribe();
    window.location.reload();
   }


}

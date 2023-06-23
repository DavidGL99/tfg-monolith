import { Component, Inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Review } from '../interfaces/review';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { ThisReceiver } from '@angular/compiler';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
   selector: 'app-product-bought',
   templateUrl: './product-bought.component.html',
   styleUrls: ['./product-bought.component.css'],
})
export class ProductBoughtComponent {
   id: any;
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private orderService: OrderService,
      public dialog: MatDialog
   ) {}

   name: any;
   email: any;
   jwt: any;
   products: any = [];

   ngOnInit(): void {
      this.name = localStorage.getItem('name');
      this.jwt = localStorage.getItem('jwt');
      this.email = localStorage.getItem('email');

      this.getOrder();
      this.route.queryParams.subscribe((params) => {
         this.setId(params['id']);
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

   setId(id: any): void {
      console.log(id);
      this.id = id;
   }
   logout(): void {
      localStorage.clear();
      this.router.navigate(['/login']).then(() => {
         window.location.reload();
      });
   }

   getProducts(email: any): void {}

   getOrder() {
      this.orderService.getById(this.email, this.jwt).subscribe((res) => {
         res.forEach((e: any) => {
            this.products.push({
               producto: e.product,
            });
         });
      });
   }
   openDialog(productId: any): void {
      console.log(productId);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
         id: productId,
         email: this.email,
         jwt: this.jwt,
         width: '800px',
         height: '600px',
      };
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, dialogConfig);

      dialogRef.afterClosed().subscribe(() => {
         console.log('The dialog was closed');
      });
   }
}

@Component({
   selector: 'dialog-overview-example-dialog',
   templateUrl: '../reviewForm.html',
})
export class DialogOverviewExampleDialog {
   form: FormGroup;
   bodyReview = '';
   headline = '';
   id: any;
   email: any;
   jwt: any;
   review: Review = {
      descripcion: undefined,
      userId: undefined,
      nota: undefined,
      titulo: undefined,
      productId: undefined,
   };

   constructor(
      private route: ActivatedRoute,
      private reviewService: ReviewService,
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
   ) {
      this.id = data.id;
      this.email = data.email;
      this.jwt = data.jwt;
      this.form = this.fb.group({
         rating: ['', Validators.required],
      });
   }

   onNoClick(): void {
      this.dialogRef.close();
   }

   submitReview(): void {
      if (this.bodyReview != '') {
         if (!this.form.value.rating) {
            this.review.nota = 0;
         } else {
            this.review.nota = this.form.value.rating;
         }

         this.review.descripcion = this.bodyReview;
         this.review.titulo = this.headline;
         this.review.userId = this.email;
         this.review.productId = this.id;

         this.reviewService.addReview(this.review, this.jwt).subscribe();
      }

      this.onNoClick();
   }
}

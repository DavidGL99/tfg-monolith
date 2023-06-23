import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopCategoriesComponent } from './top-categories/top-categories.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CatalogueItemComponent } from './catalogue-item/catalogue-item.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { DialogOverviewExampleDialog, ProductBoughtComponent } from './product-bought/product-bought.component';
import { MostReviewedComponent } from './most-reviewed/most-reviewed.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopCategoriesComponent,
    CatalogueComponent,
    CatalogueItemComponent,
    ProductComponent,
    LoginComponent,
    SignupComponent,
    DialogOverviewExampleDialog,
    CartComponent,
    SearchComponent,
    ProductBoughtComponent,
    MostReviewedComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

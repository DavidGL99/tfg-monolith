import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductBoughtComponent } from './product-bought/product-bought.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { TopCategoriesComponent } from './top-categories/top-categories.component';

const routes: Routes = [
  { path: 'catalogue', component: CatalogueComponent },
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchComponent },
  { path: 'bought', component: ProductBoughtComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/User';
import { UserService } from '../services/user.service';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
   constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}
   search: any;
   category: any = 'Categorias';
   categories = [
      { name: 'Todas las categorias' },
      { name: 'eBooks', id: 0 },
      { name: 'Portatiles', id: 1 },
      { name: 'Ordenadores', id: 2 },
      { name: 'Smartphones', id: 3 },
      { name: 'Televisores', id: 4 },
      { name: 'Electrodomesticos', id: 5 },
      { name: 'Smartwatchs', id: 6 },
      { name: 'Perifericos', id: 7 },
      { name: 'Consolas', id: 8 },
   ];

   name: any = '';
   token: any = '';

   doSearch(): void {
      this.router.navigateByUrl('/search?name='+this.search);
   }

   setCategory(categoria: String): any {
      this.category = categoria;
   }

   ngOnInit(): void {
      this.name = localStorage.getItem('name');
      this.token = localStorage.getItem('jwt');
      console.log(this.token);
      if (this.name) {
         this.userService.validate(this.token).subscribe((error: { status: number }) => {
            if (error.status === 401) {
               this.logout();
            }
         });
      }
   }

   logout(): void {
      localStorage.clear();
      window.location.reload();
      this.router.navigate(['/']);
   }

   goToCart() {
      if (localStorage.getItem('name')) {
         this.router.navigate(['/cart']);
      } else {
         this.router.navigateByUrl(`/login`);
      }
   }
}

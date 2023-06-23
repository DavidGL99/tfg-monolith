import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Categories } from '../interfaces/categories';
import { UserService } from '../services/user.service';
@Component({
   selector: 'app-top-categories',
   templateUrl: './top-categories.component.html',
   styleUrls: ['./top-categories.component.css'],
})
export class TopCategoriesComponent {

  constructor(private userService : UserService, private router : Router){}

  jwt : any;
   categories = [
      { name: Categories[Categories.eBooks], path: '../../assets/componente.PNG', index: 0 },
      { name: Categories[Categories.Portatiles], path: '../../assets/portatil.jpg', index: 1 },
      { name: Categories[Categories.Smartphones], path: '../../assets/smartphone.PNG', index: 3 },
      { name: Categories[Categories.Ordenadores], path: '../../assets/pc.PNG', index: 2 },
      { name: Categories[Categories.Consolas], path: '../../assets/consola.PNG', index: 8 },
   ];


   ngOnInit(): void {


    this.userService.validate(this.jwt).pipe(
      catchError(error => {

         if (error.status === 401) {
            this.logout();
         }

        return throwError(() => new Error('test'))

      })
   )
 }

 logout(): void {
  localStorage.clear();
  window.location.reload();
}

}

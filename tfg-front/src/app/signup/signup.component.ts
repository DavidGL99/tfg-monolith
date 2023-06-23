import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
   email: String = '';
   password: String = '';
   name : String = '';
   lastnames : String ='';
   failed: any = '';
   constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

   doRegister(): void {
      this.userService.register(this.email, this.password, this.name, this.lastnames).subscribe(
         (res) => {
            localStorage.setItem('jwt', res.token);
            localStorage.setItem('email', res.email);
            localStorage.setItem('name', res.name);
            localStorage.setItem('lastnames', res.lastnames);
            this.router.navigate(['/']).then(() => {
               window.location.reload();
            });
         },
         (error: HttpErrorResponse) => {
            this.submitError();
         }
      );
   }
   submitError(): void {
      this.failed = 'true';
   }
}

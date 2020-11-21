import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name;
  email;
  password;
  error = '';

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.auth
      .emailSignup(this.name, this.email, this.password)
      .then((user) => {
        this.router.navigate(['home']);
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}

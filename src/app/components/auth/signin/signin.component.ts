import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  email;
  password;
  error = '';

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.auth
      .emailSignin(this.email, this.password)
      .then((user) => {
        this.router.navigate(['home']);
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}

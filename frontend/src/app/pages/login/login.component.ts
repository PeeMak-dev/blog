import { FormGroup } from '@angular/forms';
import { FormService } from './../../shared/services/form/form.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router
  ) {
    this.loginForm = this.formService.loginForm();
  }

  ngOnInit(): void {}

  async login(credential: any) {
    console.log(credential.value);
    const { result, error } = await this.authService.login(
      'peemak@gmail.com',
      'pass'
    );

    if (!error) {
      console.log(result);
      localStorage.setItem('blog-token', result.access_token);
      this.router.navigate(['main', 'home']);
    } else {
      console.error(error);
    }
  }
}

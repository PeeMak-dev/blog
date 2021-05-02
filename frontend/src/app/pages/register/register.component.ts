import { FormService } from './../../shared/services/form/form.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router
  ) {
    this.registerForm = this.formService.registerForm();
  }

  ngOnInit(): void {}

  async register(user: any) {
    if (!user.invalid) {
      const { result, error } = await this.authService.registerUser({
        ...user.value,
      });

      if (!error) {
        console.log('registration successful: ', result);
        this.router.navigate(['login']);
      } else {
        console.error('Registration failed: ', error);
      }
    }
  }
}

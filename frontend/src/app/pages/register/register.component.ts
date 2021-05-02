import { FormService } from './../../shared/services/form/form.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {
    this.registerForm = this.formService.registerForm();
  }

  ngOnInit(): void {}

  async register(user: any) {
    console.log(user);

    const { result, error } = await this.authService.registerUser({ ...user });

    console.log(result);
    console.error('eerorsafsdafdasfsdf: ', error);
  }
}

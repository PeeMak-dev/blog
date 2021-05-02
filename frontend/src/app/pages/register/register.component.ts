import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async register() {
    const user = {
      name: 'mark',
      email: 'mark@gmail.com',
      password: 'password',
      username: 'makmak',
    };
    const { result, error } = await this.authService.registerUser({ ...user });

    console.log(result);
    console.error('eerorsafsdafdasfsdf: ', error);
  }
}

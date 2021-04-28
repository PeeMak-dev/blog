import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async login() {
    const { result, error } = await this.authService.login(
      'peemak@gmail.com',
      'pass'
    );

    if (!error) {
      console.log(result);
    } else {
      console.error(error);
    }
  }
}

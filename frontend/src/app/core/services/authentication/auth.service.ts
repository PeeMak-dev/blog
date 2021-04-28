import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async login(email: string, password: string) {
    try {
      return {
        result: await this.http
          .post<any>('/api/auth/login', {
            email,
            password,
          })
          .toPromise(),
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/interfaces/users/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = new BehaviorSubject(null);

  route: string = 'api/users';

  constructor(private http: HttpClient) {
    this.findAll({ page: 1, size: 10, route: this.route });
  }

  async findAll({
    page,
    size,
    route,
  }: {
    page: number;
    size: number;
    route: string;
  }) {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    try {
      const result: User = (await this.http
        .get(`${route}`, { params })
        .toPromise()) as User;

      this.users.next(result);
    } catch (error) {}
  }

  get _allUsers(): Observable<any> {
    return this.users.asObservable();
  }
}

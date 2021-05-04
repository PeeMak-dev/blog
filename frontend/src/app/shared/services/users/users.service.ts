import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = new BehaviorSubject({});

  route: string = 'localhost:3000/api/users';

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
      const result = await this.http.get(`${route}`, { params }).toPromise();

      this.users.next(result);
      console.log(result);
    } catch (error) {}
  }

  get _allUsers(): Observable<any> {
    return this.users.asObservable();
  }
}

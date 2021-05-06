import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/shared/models/interfaces/users/users.interface';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'username', 'email'];
  pageSizeOptions: number[] = [10, 25, 50];
  pageEvent: PageEvent;
  dataSource: Users | null;

  private userDataSubscription: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userDataSubscription = this.usersService._allUsers.subscribe(
      (data: Users) => {
        if (data) {
          this.dataSource = data;
        }
      }
    );
  }

  async paginate(event: PageEvent) {
    let page = event.pageIndex;
    const size = event.pageSize;

    page = page + 1;
    await this.usersService.findAll({
      page: page,
      size: size,
      route: 'api/users',
    });
  }
}

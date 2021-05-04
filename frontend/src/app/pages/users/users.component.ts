import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/interfaces/users/user.interface';
import { Users } from 'src/app/shared/models/interfaces/users/users.interface';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'username', 'email'];
  dataSource: MatTableDataSource<User>;

  private userDataSubscription: Subscription;

  constructor(private usersService: UsersService) {}
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userDataSubscription = this.usersService._allUsers.subscribe(
      (data: Users) => {
        console.log(data);
        if (data) {
          this.dataSource = new MatTableDataSource(data.docs);
        }
      }
    );
  }
}

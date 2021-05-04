import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/shared/models/interfaces/users/users.interface';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private userDataSubscription: Subscription;

  constructor(private usersService: UsersService) {}
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userDataSubscription = this.usersService._allUsers.subscribe(
      (data: Users) => console.log(data)
    );
  }
}

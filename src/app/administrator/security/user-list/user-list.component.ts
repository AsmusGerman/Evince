import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'evince-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }

  private iUserList: Array<User>;

  ngOnInit() {
  }

}

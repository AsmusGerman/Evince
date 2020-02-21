import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model/usuario';

@Component({
  selector: 'evince-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }

  private iUserList: Array<Usuario>;

  ngOnInit() {
  }

}

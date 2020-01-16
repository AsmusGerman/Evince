import { Component, OnInit, Injector } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'evince-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private users : User[] = [];
  private user;
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.get_users().subscribe((res : User[])=>{
      this.users = res.filter((fUser)=> {
        if(fUser.id==2){
          this.user=fUser;
          return fUser
        }
      });
    });
  }

  
}
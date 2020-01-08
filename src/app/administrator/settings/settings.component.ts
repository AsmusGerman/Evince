import { Component, OnInit, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'evince-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  texto: string = "hola";
  private users : User[] = [];
  private user;
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.get_user().subscribe((res : User[])=>{
      this.users = res.filter((fUser)=> {
        if(fUser.id==2){
          console.log(fUser.animales["catto"]);
          this.user=fUser;
          return fUser
        }
      });
    });
  }

  
}
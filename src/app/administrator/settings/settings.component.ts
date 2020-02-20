import { Component, OnInit, Injector } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Usuario } from 'src/app/core/model/usuario';

@Component({
  selector: 'evince-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private users : Usuario[] = [];
  private user;
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    /* this.userService.get_users().subscribe((res : Usuario[])=>{
      this.users = res.filter( u => {
        if(u.rol = rol.){
          this.user=fUser;
          return fUser
        }
      });
    }); */
  }

  
}